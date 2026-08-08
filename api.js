/* ============================================================
   api.js — الجسر بين التطبيق وباك-إند amin-backend الحقيقي.
   يتكفّل بـ: تخزين توكن الدخول، طلبات fetch الموحّدة،
   ومزامنة البيانات الحقيقية (شحنات/محفظة/إشعارات) داخل نفس
   المصفوفات المستخدمة أصلاً بـ data.js حتى ما نغيّر واجهات العرض.
   ============================================================ */

const Api = (() => {
  const TOKEN_KEY = 'amin_token';

  function getToken() {
    try { return localStorage.getItem(TOKEN_KEY); } catch (err) { return null; }
  }
  function setToken(token) {
    try {
      if (token) localStorage.setItem(TOKEN_KEY, token);
      else localStorage.removeItem(TOKEN_KEY);
    } catch (err) { /* localStorage قد يكون غير متاح — تجاهل بصمت */ }
  }

  async function request(path, { method = 'GET', body, auth = true } = {}) {
    const headers = { 'Content-Type': 'application/json' };
    if (auth) {
      const token = getToken();
      if (token) headers.Authorization = `Bearer ${token}`;
    }
    try {
      const res = await fetch(`${APP.apiBase}${path}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) return { ok: false, status: res.status, error: data.error || 'حدث خطأ غير متوقع', ...data };
      return data;
    } catch (err) {
      return { ok: false, offline: true, error: 'تعذر الاتصال بالسيرفر، تحقق من الإنترنت' };
    }
  }

  const auth = {
    register: (payload) => request('/api/auth/register', { method: 'POST', body: payload, auth: false }),
    login: (phone, password) => request('/api/auth/login', { method: 'POST', body: { phone, password }, auth: false }),
    me: () => request('/api/auth/me'),
  };

  const shipments = {
    create: (payload) => request('/api/shipments', { method: 'POST', body: payload }),
    list: (params = {}) => {
      const qs = new URLSearchParams(params).toString();
      return request(`/api/shipments${qs ? '?' + qs : ''}`);
    },
    get: (trackingNumber) => request(`/api/shipments/${encodeURIComponent(trackingNumber)}`, { auth: false }),
    updateStatus: (trackingNumber, status) =>
      request(`/api/shipments/${encodeURIComponent(trackingNumber)}/status`, { method: 'PATCH', body: { status } }),
  };

  const wallet = {
    get: () => request('/api/wallet'),
    addTransaction: (payload) => request('/api/wallet/transactions', { method: 'POST', body: payload }),
  };

  const notifications = {
    list: () => request('/api/notifications'),
    markRead: (id) => request(`/api/notifications/${encodeURIComponent(id)}/read`, { method: 'POST' }),
    markAllRead: () => request('/api/notifications/read-all', { method: 'POST' }),
  };

  const push = {
    getPublicKey: () => request('/api/push/vapid-public-key', { auth: false }),
    subscribe: (subscription) => request('/api/push/subscribe', { method: 'POST', body: { subscription } }),
    unsubscribe: (endpoint) => request('/api/push/unsubscribe', { method: 'POST', body: { endpoint } }),
    test: () => request('/api/push/test', { method: 'POST' }),
  };

  return { getToken, setToken, request, auth, shipments, wallet, notifications, push };
})();

/* ============================================================
   مزامنة كل بيانات الزبون الحقيقية من السيرفر داخل نفس المصفوفات
   القديمة (SHIPMENTS / WALLET_TRANSACTIONS / WalletAccount / NOTIFICATIONS_FULL)
   حتى تشتغل كل صفحات العرض الموجودة بدون أي تعديل عليها.
   ============================================================ */
async function syncAllFromServer() {
  if (!Api.getToken()) return;

  const [shipRes, walletRes, notifRes] = await Promise.all([
    Api.shipments.list(),
    Api.wallet.get(),
    Api.notifications.list(),
  ]);

  if (shipRes.ok && Array.isArray(shipRes.shipments)) {
    SHIPMENTS.length = 0;
    SHIPMENTS.push(...shipRes.shipments);
  }

  if (walletRes.ok) {
    WalletAccount.balance = walletRes.balance;
    WalletAccount.number = walletRes.number;
    WALLET_TRANSACTIONS.length = 0;
    WALLET_TRANSACTIONS.push(...walletRes.transactions.map((t) => ({
      id: t.id, type: t.type, title: t.title, desc: t.desc, amount: t.amount, date: t.date, status: t.status,
    })));
  }

  if (notifRes.ok && Array.isArray(notifRes.notifications)) {
    NOTIFICATIONS_FULL.length = 0;
    NOTIFICATIONS_FULL.push(...notifRes.notifications.map((n) => ({
      id: n.id, category: n.category, icon: n.icon, title: n.title, desc: n.desc,
      time: formatShortDate(n.createdAt), unread: n.unread, action: n.action,
    })));
  }
}

/* ============================================================
   Push Notifications الحقيقية — اشتراك المتصفح بالإشعارات عبر
   Service Worker + VAPID، وربطه بحساب المستخدم على السيرفر.
   ============================================================ */
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; i++) outputArray[i] = rawData.charCodeAt(i);
  return outputArray;
}

async function subscribeToPush() {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) return { ok: false, error: 'المتصفح لا يدعم الإشعارات' };
  if (!Api.getToken()) return { ok: false, error: 'يجب تسجيل الدخول أولاً' };

  const permission = await Notification.requestPermission();
  if (permission !== 'granted') return { ok: false, error: 'تم رفض إذن الإشعارات' };

  const keyRes = await Api.push.getPublicKey();
  if (!keyRes.ok || !keyRes.publicKey) return { ok: false, error: 'خدمة الإشعارات غير مفعّلة حالياً' };

  const registration = await navigator.serviceWorker.ready;
  let subscription = await registration.pushManager.getSubscription();
  if (!subscription) {
    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(keyRes.publicKey),
    });
  }

  const result = await Api.push.subscribe(subscription.toJSON());
  return result.ok ? { ok: true } : { ok: false, error: result.error };
}

async function unsubscribeFromPush() {
  if (!('serviceWorker' in navigator)) return;
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.getSubscription();
  if (subscription) {
    await Api.push.unsubscribe(subscription.endpoint);
    await subscription.unsubscribe();
  }
                                                                              }
