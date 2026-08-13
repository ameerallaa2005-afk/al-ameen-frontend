/* ============================================================
   app.js — App bootstrap + per-screen behaviour.
   ============================================================ */

/* ---------------- Register routes ---------------- */
Router.register('splash', renderSplash);
Router.register('onboarding', renderOnboarding);
Router.register('login', renderLogin);
Router.register('register', renderRegister);
Router.register('forgot-password', renderForgotPassword);
Router.register('reset-password', renderResetPassword);
Router.register('otp', renderOtp);
Router.register('success', renderSuccess);
Router.register('home', renderHome);
Router.register('orders', renderOrders);
Router.register('order-details', renderOrderDetails);
Router.register('create-shipment', renderCreateShipment);
Router.register('shipment-details', renderShipmentDetails);
Router.register('shipment-history', renderShipmentHistory);
Router.register('track', renderTrack);
Router.register('live-tracking', renderLiveTracking);
Router.register('notifications', renderNotifications);
Router.register('wallet', renderWallet);
Router.register('profile', renderProfile);
Router.register('settings', renderSettings);
Router.register('driver-home', renderDriverHome);
Router.register('driver-new-orders', renderDriverNewOrders);
Router.register('driver-active-orders', renderDriverActiveOrders);
Router.register('driver-completed-orders', renderDriverCompletedOrders);
Router.register('driver-earnings', renderDriverEarnings);
Router.register('driver-wallet', renderDriverWallet);
Router.register('driver-ratings', renderDriverRatings);
Router.register('driver-profile', renderDriverProfile);
Router.register('driver-settings', renderDriverSettings);
Router.register('admin-home', renderAdminHome);
Router.register('admin-orders', renderAdminOrders);
Router.register('admin-order-details', renderAdminOrderDetails);
Router.register('admin-drivers', renderAdminDrivers);
Router.register('admin-driver-details', renderAdminDriverDetails);
Router.register('admin-customers', renderAdminCustomers);
Router.register('admin-customer-details', renderAdminCustomerDetails);
Router.register('admin-reports', renderAdminReports);
Router.register('admin-settings', renderAdminSettings);

/* ---------------- Timers kept at module scope so they can be cleared ---------------- */
let otpInterval = null;
let otpSecondsLeft = 60;

/* ---------------- Master mount dispatcher ---------------- */
window.onScreenMounted = function onScreenMounted(path) {
  switch (path) {
    case 'splash': return initSplash();
    case 'onboarding': return initOnboarding();
    case 'login': return initLogin();
    case 'register': return initRegister();
    case 'forgot-password': return initForgotPassword();
    case 'reset-password': return initResetPassword();
    case 'otp': return initOtp();
    case 'success': return initSuccess();
    case 'home': return initHome();
    case 'orders': return initOrders();
    case 'order-details': return initOrderDetails();
    case 'create-shipment': return initCreateShipment();
    case 'shipment-details': return initShipmentDetails();
    case 'shipment-history': return initShipmentHistory();
    case 'track': return initTrack();
    case 'live-tracking': return initLiveTracking();
    case 'notifications': return initNotifications();
    case 'wallet': return initWallet();
    case 'profile': return initProfile();
    case 'settings': return initSettings();
    case 'driver-home': return initDriverHome();
    case 'driver-new-orders': return initDriverNewOrders();
    case 'driver-active-orders': return initDriverActiveOrders();
    case 'driver-completed-orders': return initDriverCompletedOrders();
    case 'driver-earnings': return initDriverEarnings();
    case 'driver-wallet': return initDriverWallet();
    case 'driver-ratings': return initDriverRatings();
    case 'driver-profile': return initDriverProfile();
    case 'driver-settings': return initDriverSettings();
    case 'admin-home': return initAdminHome();
    case 'admin-orders': return initAdminOrders();
    case 'admin-order-details': return initAdminOrderDetails();
    case 'admin-drivers': return initAdminDrivers();
    case 'admin-driver-details': return initAdminDriverDetails();
    case 'admin-customers': return initAdminCustomers();
    case 'admin-customer-details': return initAdminCustomerDetails();
    case 'admin-reports': return initAdminReports();
    case 'admin-settings': return initAdminSettings();
    default: return;
  }
};

/* ============================================================
   Splash
   ============================================================ */
function initSplash() {
  setTimeout(() => {
    Router.navigate('onboarding', { direction: 'forward' });
  }, 2400);
}

/* ============================================================
   Onboarding
   ============================================================ */
function initOnboarding() {
  const track = document.getElementById('ob-track');
  const nextBtn = document.getElementById('ob-next');
  const skipBtn = document.getElementById('ob-skip');
  const dotsRow = document.querySelector('.dots-row');
  const total = ONBOARDING_SLIDES.length;
  let index = 0;
  let startX = 0;
  let currentX = 0;
  let dragging = false;

  function goTo(i, animate = true) {
    index = Math.max(0, Math.min(total - 1, i));
    track.style.transition = animate ? '' : 'none';
    track.style.transform = `translateX(${-index * 100}%)`;
    updateDots();
    updateNextLabel();
  }

  function updateDots() {
    if (!dotsRow) return;
    [...dotsRow.children].forEach((d, i) => d.classList.toggle('dot-active', i === index));
  }

  function updateNextLabel() {
    const label = nextBtn.querySelector('.btn-label');
    label.textContent = index === total - 1 ? 'ابدأ الآن' : 'التالي';
  }

  // RTL note: track built left-to-right in DOM order, but the page is RTL.
  // We translate using logical direction so slide 0 shows first regardless.
  track.style.direction = 'ltr';

  nextBtn.addEventListener('click', () => {
    if (index === total - 1) {
      Router.navigate('login', { direction: 'forward' });
    } else {
      goTo(index + 1);
    }
  });

  skipBtn.addEventListener('click', () => {
    Router.navigate('login', { direction: 'forward' });
  });

  // Touch swipe
  track.addEventListener('touchstart', (e) => {
    dragging = true;
    startX = e.touches[0].clientX;
    track.style.transition = 'none';
  }, { passive: true });

  track.addEventListener('touchmove', (e) => {
    if (!dragging) return;
    currentX = e.touches[0].clientX - startX;
    track.style.transform = `translateX(calc(${-index * 100}% + ${currentX}px))`;
  }, { passive: true });

  track.addEventListener('touchend', () => {
    dragging = false;
    track.style.transition = '';
    if (currentX < -60 && index < total - 1) {
      goTo(index + 1);
    } else if (currentX > 60 && index > 0) {
      goTo(index - 1);
    } else {
      goTo(index);
    }
    currentX = 0;
  });

  goTo(0, false);
}

/* ============================================================
   Login
   ============================================================ */
function initLogin() {
  wirePasswordToggle('login-password', 'login-password-toggle');

  const form = document.getElementById('login-form');
  const phoneInput = document.getElementById('login-phone');
  const passInput = document.getElementById('login-password');

  phoneInput.addEventListener('input', () => {
    phoneInput.value = phoneInput.value.replace(/[^\d]/g, '').slice(0, 11);
    clearFieldError('login-phone');
  });
  passInput.addEventListener('input', () => clearFieldError('login-password'));

  document.getElementById('forgot-password').addEventListener('click', () => {
    Router.navigate('forgot-password', { direction: 'forward' });
  });

  form.addEventListener('submit', (e) => e.preventDefault());

  document.getElementById('login-submit').addEventListener('click', async () => {
    clearAllErrors(form);
    let valid = true;

    if (!isValidIraqiPhone(phoneInput.value)) {
      setFieldError('login-phone', 'أدخل رقم هاتف عراقي صحيح (07XXXXXXXXX)');
      valid = false;
    }
    if (!passInput.value || passInput.value.length < 4) {
      setFieldError('login-password', 'كلمة المرور مطلوبة');
      valid = false;
    }
    if (!valid) return;

    setButtonLoading('login-submit', true);

    const result = await Api.auth.login(phoneInput.value, passInput.value);

    if (!result.ok) {
      setButtonLoading('login-submit', false);
      if (result.offline) {
        // السيرفر غير متاح — رجوع مؤقت لبيانات العرض التجريبية حتى ما يتوقف العرض بالكامل
        const user = findUserByPhone(phoneInput.value);
        if (user && user.password === passInput.value && user.status === 'active') {
          AppState.currentUser = user;
          AppState.pendingAuth = { mode: 'login', phone: user.phone, name: user.name, city: user.city };
          showToast('تم تسجيل الدخول بنجاح (وضع عدم الاتصال)', 'success');
          Router.navigate('success', { direction: 'forward' });
          return;
        }
      }
      if (result.status === 'pending') {
        setFieldError('login-password', 'طلبك قيد المراجعة');
        showToast('طلبك قيد المراجعة، سيتم التواصل معك قريباً.', 'info', 4000);
        return;
      }
      if (result.status === 'rejected') {
        setFieldError('login-password', 'تم رفض طلب التسجيل');
        showToast(result.error, 'error', 6000);
        return;
      }
      setFieldError('login-password', 'رقم الهاتف أو كلمة المرور غير صحيحة');
      showToast(result.error || 'تعذر تسجيل الدخول، تحقق من البيانات', 'error');
      return;
    }

    Api.setToken(result.token);
    AppState.currentUser = result.user;
    AppState.pendingAuth = { mode: 'login', phone: result.user.phone, name: result.user.name, city: result.user.city };

    await syncAllFromServer().catch(() => {});

    setButtonLoading('login-submit', false);
    showToast('تم تسجيل الدخول بنجاح', 'success');
    Router.navigate('success', { direction: 'forward' });
  });
}

/* ============================================================
   Register
   ============================================================ */
function initRegister() {
  wirePasswordToggle('reg-password', 'reg-password-toggle');
  wirePasswordToggle('reg-password-confirm', 'reg-password-confirm-toggle');

  const form = document.getElementById('register-form');
  const nameInput = document.getElementById('reg-name');
  const phoneInput = document.getElementById('reg-phone');
  const cityInput = document.getElementById('reg-city');
  const passInput = document.getElementById('reg-password');
  const confirmInput = document.getElementById('reg-password-confirm');
  const termsInput = document.getElementById('reg-terms');

  phoneInput.addEventListener('input', () => {
    phoneInput.value = phoneInput.value.replace(/[^\d]/g, '').slice(0, 11);
    clearFieldError('reg-phone');
  });
  [nameInput, cityInput, passInput, confirmInput].forEach((el) => {
    el.addEventListener('input', () => clearFieldError(el.id));
    el.addEventListener('change', () => clearFieldError(el.id));
  });

  form.addEventListener('submit', (e) => e.preventDefault());

  document.getElementById('register-submit').addEventListener('click', async () => {
    clearAllErrors(form);
    let valid = true;

    if (nameInput.value.trim().length < 3) {
      setFieldError('reg-name', 'أدخل الاسم الكامل (3 أحرف على الأقل)');
      valid = false;
    }
    if (!isValidIraqiPhone(phoneInput.value)) {
      setFieldError('reg-phone', 'أدخل رقم هاتف عراقي صحيح (07XXXXXXXXX)');
      valid = false;
    } else if (findUserByPhone(phoneInput.value)) {
      setFieldError('reg-phone', 'هذا الرقم مسجل مسبقاً، جرّب تسجيل الدخول');
      valid = false;
    }
    if (!cityInput.value) {
      setFieldError('reg-city', 'اختر محافظتك');
      valid = false;
    }
    if (passInput.value.length < 6) {
      setFieldError('reg-password', 'كلمة المرور 6 أحرف على الأقل');
      valid = false;
    }
    if (confirmInput.value !== passInput.value || !confirmInput.value) {
      setFieldError('reg-password-confirm', 'كلمتا المرور غير متطابقتين');
      valid = false;
    }
    if (!termsInput.checked) {
      showToast('يجب الموافقة على الشروط والأحكام للمتابعة', 'error');
      valid = false;
    }
    if (!valid) return;

    setButtonLoading('register-submit', true);

    const result = await sendOtpRequest(phoneInput.value, nameInput.value.trim());

    setButtonLoading('register-submit', false);

    if (!result.ok) {
      showToast(result.error || 'تعذر إرسال رمز التحقق', 'error');
      return;
    }

    AppState.pendingAuth = {
      mode: 'register',
      name: nameInput.value.trim(),
      phone: phoneInput.value,
      city: cityInput.value,
      password: passInput.value,
    };

    showToast('تم إرسال رمز التحقق عبر واتساب', 'success');
    Router.navigate('otp', { direction: 'forward' });
  });
}

/* ============================================================
   Forgot Password — step 1: enter phone, request WhatsApp OTP
   ============================================================ */
function initForgotPassword() {
  const form = document.getElementById('forgot-password-form');
  const phoneInput = document.getElementById('forgot-phone');

  phoneInput.addEventListener('input', () => {
    phoneInput.value = phoneInput.value.replace(/[^\d]/g, '').slice(0, 11);
    clearFieldError('forgot-phone');
  });

  form.addEventListener('submit', (e) => e.preventDefault());

  document.getElementById('forgot-password-submit').addEventListener('click', async () => {
    clearAllErrors(form);

    if (!isValidIraqiPhone(phoneInput.value)) {
      setFieldError('forgot-phone', 'أدخل رقم هاتف عراقي صحيح (07XXXXXXXXX)');
      return;
    }

    setButtonLoading('forgot-password-submit', true);

    const checkResult = await Api.auth.checkPhoneForReset(phoneInput.value);
    if (!checkResult.ok) {
      setButtonLoading('forgot-password-submit', false);
      setFieldError('forgot-phone', checkResult.error || 'لا يوجد حساب مسجّل بهذا الرقم');
      return;
    }

    const otpResult = await sendOtpRequest(phoneInput.value, '');
    setButtonLoading('forgot-password-submit', false);

    if (!otpResult.ok) {
      showToast(otpResult.error || 'تعذر إرسال رمز التحقق', 'error');
      return;
    }

    AppState.pendingAuth = { mode: 'reset', phone: phoneInput.value };
    showToast('تم إرسال رمز التحقق عبر واتساب', 'success');
    Router.navigate('otp', { direction: 'forward' });
  });
}

/* ============================================================
   Reset Password — step 3: set a new password after OTP verified
   ============================================================ */
function initResetPassword() {
  wirePasswordToggle('reset-password-new', 'reset-password-new-toggle');
  wirePasswordToggle('reset-password-confirm', 'reset-password-confirm-toggle');

  const form = document.getElementById('reset-password-form');
  const newInput = document.getElementById('reset-password-new');
  const confirmInput = document.getElementById('reset-password-confirm');

  [newInput, confirmInput].forEach((el) => el.addEventListener('input', () => clearFieldError(el.id)));

  form.addEventListener('submit', (e) => e.preventDefault());

  document.getElementById('reset-password-submit').addEventListener('click', async () => {
    clearAllErrors(form);
    const ctx = AppState.pendingAuth || {};

    if (!ctx.phone || !ctx.resetToken) {
      showToast('انتهت صلاحية الجلسة، ابدأ من جديد', 'error');
      Router.navigate('forgot-password', { direction: 'back' });
      return;
    }

    let valid = true;
    if (newInput.value.length < 6) {
      setFieldError('reset-password-new', 'يجب أن تتكون من 6 أحرف على الأقل');
      valid = false;
    }
    if (confirmInput.value !== newInput.value || !confirmInput.value) {
      setFieldError('reset-password-confirm', 'كلمتا المرور غير متطابقتين');
      valid = false;
    }
    if (!valid) return;

    setButtonLoading('reset-password-submit', true);
    const result = await Api.auth.resetPassword(ctx.phone, newInput.value, ctx.resetToken);
    setButtonLoading('reset-password-submit', false);

    if (!result.ok) {
      showToast(result.error || 'تعذر تحديث كلمة المرور، حاول مرة أخرى', 'error');
      return;
    }

    AppState.pendingAuth = null;
    showToast('تم تحديث كلمة المرور بنجاح، سجّل الدخول بكلمة المرور الجديدة', 'success', 4000);
    Router.navigate('login', { direction: 'back' });
  });
}

/* ============================================================
   OTP API helpers — تتواصل مع backend/server.js
   ============================================================ */
async function sendOtpRequest(phone, name) {
  try {
    const res = await fetch(`${APP.otpApiBase}/api/otp/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, name }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.ok) {
      return { ok: false, error: data.error || 'تعذر إرسال رمز التحقق' };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: 'تعذر الاتصال بخدمة إرسال الرمز، تحقق من الشبكة' };
  }
}

async function verifyOtpRequest(phone, code) {
  try {
    const res = await fetch(`${APP.otpApiBase}/api/otp/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, code }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.ok) {
      return { ok: false, error: data.error || 'رمز التحقق غير صحيح' };
    }
    return { ok: true, verifyToken: data.verifyToken };
  } catch (err) {
    return { ok: false, error: 'تعذر الاتصال بخدمة التحقق، تحقق من الشبكة' };
  }
}

/* ============================================================
   OTP
   ============================================================ */
function initOtp() {
  const boxes = [...document.querySelectorAll('.otp-box')];
  const submitBtn = document.getElementById('otp-submit');
  const resendBtn = document.getElementById('otp-resend');
  const timerWrap = document.getElementById('otp-timer');
  const secondsEl = document.getElementById('otp-seconds');

  boxes[0] && boxes[0].focus();

  boxes.forEach((box, i) => {
    box.addEventListener('input', () => {
      box.value = box.value.replace(/[^\d]/g, '').slice(0, 1);
      clearFieldError('otp');
      document.getElementById('otp-error').textContent = '';
      if (box.value && i < boxes.length - 1) {
        boxes[i + 1].focus();
      }
      if (boxes.every((b) => b.value)) {
        submitBtn.click();
      }
    });
    box.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !box.value && i > 0) {
        boxes[i - 1].focus();
      }
    });
  });

  function startTimer() {
    otpSecondsLeft = 60;
    secondsEl.textContent = otpSecondsLeft;
    timerWrap.classList.remove('hidden');
    resendBtn.classList.add('hidden');
    clearInterval(otpInterval);
    otpInterval = setInterval(() => {
      otpSecondsLeft -= 1;
      secondsEl.textContent = otpSecondsLeft;
      if (otpSecondsLeft <= 0) {
        clearInterval(otpInterval);
        timerWrap.classList.add('hidden');
        resendBtn.classList.remove('hidden');
      }
    }, 1000);
  }

  resendBtn.addEventListener('click', async () => {
    const ctx = AppState.pendingAuth || {};
    resendBtn.disabled = true;

    const result = await sendOtpRequest(ctx.phone, ctx.name);

    resendBtn.disabled = false;
    boxes.forEach((b) => (b.value = ''));
    boxes[0].focus();

    if (!result.ok) {
      showToast(result.error || 'تعذر إرسال رمز جديد', 'error');
      return;
    }

    showToast('تم إرسال رمز تحقق جديد عبر واتساب', 'success');
    startTimer();
  });

  submitBtn.addEventListener('click', async () => {
    const code = boxes.map((b) => b.value).join('');
    const errorEl = document.getElementById('otp-error');
    errorEl.textContent = '';

    if (code.length < 4) {
      errorEl.textContent = 'أدخل الرمز المكوّن من 4 أرقام';
      return;
    }

    const ctx = AppState.pendingAuth || {};

    setButtonLoading('otp-submit', true);
    const result = await verifyOtpRequest(ctx.phone, code);
    setButtonLoading('otp-submit', false);

    if (result.ok) {
      if (ctx.mode === 'register') {
        const regResult = await Api.auth.register({
          name: ctx.name, phone: ctx.phone, city: ctx.city, password: ctx.password,
          otpToken: result.verifyToken,
        });

        if (!regResult.ok && !regResult.offline) {
          errorEl.textContent = '';
          showToast(regResult.error || 'تعذر إنشاء الحساب، حاول مرة أخرى', 'error');
          return;
        }

        if (regResult.offline) {
          // السيرفر غير متاح — نخزن الحساب محلياً مؤقتاً حتى لا يفقد المستخدم بياناته
          FAKE_USERS.push({
            id: 'u' + (FAKE_USERS.length + 1), phone: ctx.phone, password: ctx.password,
            name: ctx.name, city: ctx.city, status: 'pending', verifiedBy: null, verifiedAt: null, rejectionReason: null,
          });
        }

        // الحساب بانتظار موافقة الإدارة — ما نسجّل دخول الزبون تلقائياً.
        AppState.currentUser = null;
        AppState.pendingAuth = null;

        showToast('تم استلام طلبك بنجاح وسيتم مراجعته من قبل الإدارة.', 'success', 4000);
        Router.navigate('login', { direction: 'back' });
        return;
      }
      if (ctx.mode === 'reset') {
        // نخزن بصمة التحقق حتى نستخدمها بالخطوة الجاية (تعيين كلمة مرور جديدة)
        AppState.pendingAuth = { mode: 'reset', phone: ctx.phone, resetToken: result.verifyToken };
        showToast('تم التحقق من رقمك بنجاح', 'success');
        Router.navigate('reset-password', { direction: 'forward' });
        return;
      }
      showToast('تم التحقق من رقمك بنجاح', 'success');
      Router.navigate('success', { direction: 'forward' });
    } else {
      errorEl.textContent = result.error || 'الرمز غير صحيح، حاول مرة أخرى';
      const row = document.querySelector('.otp-row');
      row.classList.remove('shake');
      void row.offsetWidth;
      row.classList.add('shake');
      boxes.forEach((b) => (b.value = ''));
      boxes[0].focus();
      showToast('رمز التحقق غير صحيح', 'error');
    }
  });

  startTimer();
}

/* ============================================================
   Success
   ============================================================ */
function initSuccess() {
  document.getElementById('enter-app-btn').addEventListener('click', () => {
    // نطلب إذن الإشعارات هسه أول ما يدخل المستخدم للتطبيق — بشكل غير معطّل للتنقل
    subscribeToPush().catch(() => {});
    Router.navigate('home', { direction: 'forward' });
  });
  document.getElementById('back-to-login-btn').addEventListener('click', () => {
    AppState.currentUser = null;
    AppState.pendingAuth = null;
    showToast('تم تسجيل الخروج', 'info');
    Router.navigate('login', { direction: 'back' });
  });
}

/* ============================================================
   Home
   ============================================================ */
function initHome() {
  initHomeTopBar();
  initHomeSideMenu();
  initHomeNotifications();
  initHomeTracking();
  initHomeServices();
  initHomeOffer();
  initHomeStats();
  initHomeBottomNav();
  initHomeMisc();
}

function initHomeTopBar() {
  // no standalone logic needed beyond menu/notif wiring below,
  // kept for readability / future extension
}

function initHomeSideMenu() {
  const overlay = document.getElementById('side-menu-overlay');
  const panel = document.getElementById('side-menu');
  const openBtn = document.getElementById('home-menu-btn');
  const closeBtn = document.getElementById('side-menu-close');

  function openMenu() {
    overlay.classList.add('is-open');
    requestAnimationFrame(() => panel.classList.add('is-open'));
  }
  function closeMenu() {
    panel.classList.remove('is-open');
    setTimeout(() => overlay.classList.remove('is-open'), 260);
  }

  openBtn.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeMenu();
  });

  overlay.querySelectorAll('[data-menu-link]').forEach((link) => {
    link.addEventListener('click', () => {
      const id = link.getAttribute('data-menu-link');
      closeMenu();
      if (id === 'home') return;
      if (id === 'orders') {
        setTimeout(() => Router.navigate('orders', { direction: 'forward' }), 260);
        return;
      }
      if (id === 'shipment-history') {
        setTimeout(() => Router.navigate('shipment-history', { direction: 'forward' }), 260);
        return;
      }
      if (id === 'track') {
        setTimeout(() => Router.navigate('track', { direction: 'forward' }), 260);
        return;
      }
      if (id === 'wallet') {
        setTimeout(() => Router.navigate('wallet', { direction: 'forward' }), 260);
        return;
      }
      if (id === 'notifications') {
        setTimeout(() => Router.navigate('notifications', { direction: 'forward' }), 260);
        return;
      }
      if (id === 'profile') {
        setTimeout(() => Router.navigate('profile', { direction: 'forward' }), 260);
        return;
      }
      if (id === 'settings') {
        setTimeout(() => Router.navigate('settings', { direction: 'forward' }), 260);
        return;
      }
      if (id === 'driver-home') {
        setTimeout(() => Router.navigate('driver-home', { direction: 'forward' }), 260);
        return;
      }
      if (id === 'admin-home') {
        setTimeout(() => Router.navigate('admin-home', { direction: 'forward' }), 260);
        return;
      }
      setTimeout(() => showToast('هذا القسم قيد التجهيز 🚀', 'info'), 260);
    });
  });

  document.getElementById('side-menu-logout').addEventListener('click', () => {
    closeMenu();
    AppState.currentUser = null;
    AppState.pendingAuth = null;
    setTimeout(() => {
      showToast('تم تسجيل الخروج', 'info');
      Router.navigate('login', { direction: 'back' });
    }, 260);
  });
}

function initHomeNotifications() {
  const panel = document.getElementById('notif-panel');
  const bellBtn = document.getElementById('home-notif-btn');
  const countBadge = document.getElementById('home-notif-count');
  const bnBadge = document.getElementById('bn-notif-badge');
  const markAllBtn = document.getElementById('notif-mark-all');

  let unread = HOME_NOTIFICATIONS.filter((n) => n.unread).length;

  function syncBadges() {
    [countBadge, bnBadge].forEach((el) => {
      if (!el) return;
      if (unread > 0) {
        el.textContent = unread;
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    });
  }

  function togglePanel(force) {
    const willOpen = force !== undefined ? force : !panel.classList.contains('is-open');
    panel.classList.toggle('is-open', willOpen);
  }

  bellBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    togglePanel();
  });

  document.addEventListener('click', (e) => {
    if (!panel.classList.contains('is-open')) return;
    if (!panel.contains(e.target) && e.target !== bellBtn && !bellBtn.contains(e.target)) {
      togglePanel(false);
    }
  });

  panel.querySelectorAll('[data-notif]').forEach((item) => {
    item.addEventListener('click', () => {
      if (item.classList.contains('notif-unread')) {
        item.classList.remove('notif-unread');
        unread = Math.max(0, unread - 1);
        syncBadges();
      }
    });
  });

  markAllBtn.addEventListener('click', () => {
    panel.querySelectorAll('.notif-unread').forEach((item) => item.classList.remove('notif-unread'));
    unread = 0;
    syncBadges();
    showToast('تم تعليم كل الإشعارات كمقروءة', 'success');
  });

  syncBadges();
}

function initHomeTracking() {
  const input = document.getElementById('home-track-input');
  const btn = document.getElementById('home-track-btn');
  const resultBox = document.getElementById('home-track-result');

  function runTrack() {
    const raw = input.value.trim().toUpperCase();
    if (!raw) {
      showToast('أدخل رقم الشحنة أولاً', 'error');
      input.focus();
      const shell = input.closest('.field-shell');
      shell.classList.remove('shake');
      void shell.offsetWidth;
      shell.classList.add('shake');
      return;
    }

    const shipment = FAKE_SHIPMENTS[raw];
    resultBox.classList.remove('hidden');

    if (!shipment) {
      resultBox.innerHTML = `
        <div class="track-not-found">
          ${Icon.alert}
          <span>لم يتم العثور على شحنة بهذا الرقم. جرّب: AM-2291 / AM-2178 / AM-1042</span>
        </div>
      `;
      return;
    }

    const steps = ['تم الاستلام', 'في مركز الفرز', 'خرجت للتوصيل', 'تم التسليم'];
    const stepsHtml = steps.map((label, i) => {
      const stepNum = i + 1;
      const state = stepNum < shipment.step ? 'done' : stepNum === shipment.step ? 'active' : '';
      return `
        <div class="track-step ${state}">
          <span class="track-step-dot">${stepNum < shipment.step ? Icon.check : ''}</span>
          <span class="track-step-label">${label}</span>
        </div>
      `;
    }).join('');

    resultBox.innerHTML = `
      <div class="track-found">
        <div class="track-found-head">
          <span class="track-found-code" dir="ltr">#${raw}</span>
          <span class="track-found-status">${shipment.status}</span>
        </div>
        <div class="track-steps">${stepsHtml}</div>
        <div class="track-found-city">${Icon.mapPinLine}<span>الوجهة: ${shipment.city}</span></div>
        <button class="btn-primary w-full lt-live-btn" id="home-track-live-btn">
          <span class="btn-label">متابعة التتبع المباشر</span>
          <span class="btn-icon">${Icon.chevronLeft}</span>
        </button>
      </div>
    `;

    const liveBtn = document.getElementById('home-track-live-btn');
    if (liveBtn) {
      liveBtn.addEventListener('click', () => {
        Router.navigate('live-tracking', { direction: 'forward', params: { id: raw, back: 'home' } });
      });
    }
  }

  btn.addEventListener('click', runTrack);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') runTrack();
  });
  input.addEventListener('input', () => resultBox.classList.add('hidden'));
}

function initHomeServices() {
  document.querySelectorAll('.service-card').forEach((card) => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-service');
      const service = HOME_SERVICES.find((s) => s.id === id);
      card.classList.remove('service-pulse');
      void card.offsetWidth;
      card.classList.add('service-pulse');
      showToast(`${service.title} — التفاصيل قيد التجهيز 🚀`, 'info');
    });
  });

  document.getElementById('home-order-btn').addEventListener('click', () => {
    Router.navigate('create-shipment', { direction: 'forward' });
  });
}

function initHomeOffer() {
  const btn = document.getElementById('offer-code-btn');
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(HOME_OFFER.code);
    } catch (err) {
      /* clipboard may be unavailable in this environment — fail silently */
    }
    btn.classList.remove('offer-code-copied');
    void btn.offsetWidth;
    btn.classList.add('offer-code-copied');
    showToast('تم نسخ كود الخصم', 'success');
  });
}

function initHomeStats() {
  const grid = document.getElementById('stats-grid');
  if (!grid) return;
  let animated = false;

  function animateCounters() {
    if (animated) return;
    animated = true;
    grid.querySelectorAll('.stat-value').forEach((el) => {
      const target = parseInt(el.getAttribute('data-target'), 10) || 0;
      const suffix = el.getAttribute('data-suffix') || '';
      const duration = 1400;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(target * eased);
        el.textContent = current.toLocaleString('en-US') + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.disconnect();
        }
      });
    }, { threshold: 0.4 });
    observer.observe(grid);
  } else {
    animateCounters();
  }
}

function initHomeBottomNav() {
  const nav = document.getElementById('bottom-nav');
  nav.querySelectorAll('[data-bn]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-bn');
      if (id === 'notifications') {
        Router.navigate('notifications', { direction: 'forward' });
        return;
      }
      if (id === 'home') return;
      if (id === 'orders') {
        Router.navigate('orders', { direction: 'forward' });
        return;
      }
      if (id === 'track') {
        Router.navigate('track', { direction: 'forward' });
        return;
      }
      if (id === 'account') {
        Router.navigate('profile', { direction: 'forward' });
        return;
      }
      nav.querySelectorAll('[data-bn]').forEach((b) => b.classList.remove('bn-item-active'));
      btn.classList.add('bn-item-active');
      showToast('هذا القسم قيد التجهيز 🚀', 'info');
      setTimeout(() => {
        btn.classList.remove('bn-item-active');
        nav.querySelector('[data-bn="home"]').classList.add('bn-item-active');
      }, 900);
    });
  });
}

function initHomeMisc() {
  // Subtle parallax tilt on hero truck while scrolling for a livelier feel
  const truck = document.querySelector('.home-hero-truck');
  const heroSection = document.querySelector('.home-hero');
  if (!truck || !heroSection) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < 240) {
      truck.style.transform = `translateY(${y * 0.12}px)`;
    }
  }, { passive: true });
}

/* ============================================================
   My Orders
   ============================================================ */
function initOrders() {
  const listEl = document.getElementById('orders-list');
  const emptyEl = document.getElementById('orders-empty');
  const searchInput = document.getElementById('orders-search-input');
  let activeFilter = 'all';

  function applyFilters() {
    const q = searchInput.value;
    let visibleCount = 0;
    listEl.querySelectorAll('.order-card').forEach((card) => {
      const s = getShipmentById(card.getAttribute('data-order-id'));
      const visible = s && matchesStatusFilter(s, activeFilter) && matchesSearch(s, q);
      card.classList.toggle('hidden', !visible);
      if (visible) visibleCount++;
    });
    emptyEl.classList.toggle('hidden', visibleCount !== 0);
  }

  searchInput.addEventListener('input', applyFilters);

  document.querySelectorAll('.orders-filters [data-filter]').forEach((chip) => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.orders-filters [data-filter]').forEach((c) => c.classList.remove('filter-chip-active'));
      chip.classList.add('filter-chip-active');
      activeFilter = chip.getAttribute('data-filter');
      applyFilters();
    });
  });

  listEl.querySelectorAll('.order-card').forEach((card) => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-order-id');
      Router.navigate('order-details', { direction: 'forward', params: { id } });
    });
  });

  const createBtn = document.getElementById('orders-create-btn');
  if (createBtn) {
    createBtn.addEventListener('click', () => {
      Router.navigate('create-shipment', { direction: 'forward' });
    });
  }

  wireBottomNav('orders');
}

/* ============================================================
   Shipment History
   ============================================================ */
function initShipmentHistory() {
  const listEl = document.getElementById('history-list');
  const emptyEl = document.getElementById('history-empty');
  const searchInput = document.getElementById('history-search-input');
  let activeFilter = 'all';

  function applyFilters() {
    const q = searchInput.value;
    let visibleCount = 0;
    listEl.querySelectorAll('.history-group').forEach((group) => {
      let groupVisible = 0;
      group.querySelectorAll('.history-row').forEach((row) => {
        const s = getShipmentById(row.getAttribute('data-order-id'));
        const visible = s && matchesStatusFilter(s, activeFilter) && matchesSearch(s, q);
        row.classList.toggle('hidden', !visible);
        if (visible) groupVisible++;
      });
      group.classList.toggle('hidden', groupVisible === 0);
      visibleCount += groupVisible;
    });
    emptyEl.classList.toggle('hidden', visibleCount !== 0);
  }

  searchInput.addEventListener('input', applyFilters);

  document.querySelectorAll('.orders-filters [data-filter]').forEach((chip) => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.orders-filters [data-filter]').forEach((c) => c.classList.remove('filter-chip-active'));
      chip.classList.add('filter-chip-active');
      activeFilter = chip.getAttribute('data-filter');
      applyFilters();
    });
  });

  listEl.querySelectorAll('.history-row').forEach((row) => {
    row.addEventListener('click', () => {
      const id = row.getAttribute('data-order-id');
      Router.navigate('shipment-details', { direction: 'forward', params: { id, back: 'shipment-history' } });
    });
  });

  wireBottomNav('history');
}

/* ============================================================
   Track Shipment (search screen)
   ============================================================ */
function initTrack() {
  const input = document.getElementById('track-page-input');
  const btn = document.getElementById('track-page-btn');
  const resultBox = document.getElementById('track-page-result');

  function runSearch(prefill) {
    const raw = (prefill !== undefined ? prefill : input.value).trim().toUpperCase();
    if (!raw) {
      showToast('أدخل رقم الشحنة أولاً', 'error');
      input.focus();
      const shell = input.closest('.field-shell');
      shell.classList.remove('shake');
      void shell.offsetWidth;
      shell.classList.add('shake');
      return;
    }
    input.value = raw;

    const shipment = findTrackableShipment(raw);
    resultBox.classList.remove('hidden');

    if (!shipment) {
      resultBox.innerHTML = `
        <div class="track-not-found">
          ${Icon.alert}
          <span>لم يتم العثور على شحنة بهذا الرقم. تأكد من الرقم وحاول مرة أخرى</span>
        </div>
      `;
      return;
    }

    resultBox.innerHTML = `
      <div class="track-found">
        <div class="track-found-head">
          <span class="track-found-code" dir="ltr">#${shipment.trackingNumber}</span>
          ${StatusBadge(shipment.status, 'sm')}
        </div>
        <div class="track-found-city">${Icon.mapPinLine}<span>الوجهة: ${shipment.receiver.city}</span></div>
        ${shipment.status !== 'cancelled' ? `
          <button class="btn-primary w-full lt-live-btn" id="track-page-live-btn">
            <span class="btn-label">متابعة التتبع المباشر</span>
            <span class="btn-icon">${Icon.chevronLeft}</span>
          </button>
        ` : ''}
      </div>
    `;

    const liveBtn = document.getElementById('track-page-live-btn');
    if (liveBtn) {
      liveBtn.addEventListener('click', () => {
        Router.navigate('live-tracking', { direction: 'forward', params: { id: shipment.id, back: 'track' } });
      });
    }
  }

  btn.addEventListener('click', () => runSearch());
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') runSearch();
  });
  input.addEventListener('input', () => resultBox.classList.add('hidden'));

  document.querySelectorAll('[data-example]').forEach((chip) => {
    chip.addEventListener('click', () => runSearch(chip.getAttribute('data-example')));
  });

  wireBottomNav('track');
}

/* ============================================================
   Live Tracking (fake map, driver, timeline, animated progress)
   ============================================================ */
function initLiveTracking() {
  const content = document.getElementById('lt-content');
  const id = content.getAttribute('data-order-id');

  const fill = document.getElementById('lt-progress-fill');
  if (fill) {
    const target = fill.getAttribute('data-target');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        fill.style.width = target + '%';
      });
    });
  }

  const copyBtn = document.getElementById('lt-copy-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(id);
      } catch (err) {
        /* clipboard may be unavailable in this environment — fail silently */
      }
      showToast('تم نسخ رقم الشحنة', 'success');
    });
  }

  const supportBtn = document.getElementById('lt-support-btn');
  if (supportBtn) {
    supportBtn.addEventListener('click', () => {
      showToast(`للتواصل مع الدعم الفني: ${APP.supportPhone}`, 'info', 4000);
    });
  }

  const msgBtn = document.getElementById('lt-driver-msg-btn');
  if (msgBtn) {
    msgBtn.addEventListener('click', () => {
      showToast('ميزة المراسلة المباشرة قيد التجهيز 🚀', 'info');
    });
  }
}

/* ============================================================
   Notifications (standalone page)
   ============================================================ */
function initNotifications() {
  const list = document.getElementById('notif-page-list');
  const emptyEl = document.getElementById('notif-page-empty');
  const countEl = document.getElementById('notif-page-count');
  const markAllBtn = document.getElementById('notif-page-mark-all');
  const searchInput = document.getElementById('notif-page-search-input');
  let activeFilter = 'all';

  function unreadCount() {
    return NOTIFICATIONS_FULL.filter((n) => n.unread).length;
  }

  function syncCount() {
    const n = unreadCount();
    countEl.textContent = n > 0 ? `لديك ${n} إشعارات غير مقروءة` : 'لا توجد إشعارات جديدة';
  }

  function matchesNotifSearch(n, query) {
    const q = (query || '').trim().toLowerCase();
    if (!q) return true;
    return n.title.toLowerCase().includes(q) || n.desc.toLowerCase().includes(q);
  }

  function applyFilter() {
    const q = searchInput.value;
    let visibleCount = 0;
    list.querySelectorAll('.notif-card-row').forEach((row) => {
      const id = row.getAttribute('data-notif-row');
      const n = NOTIFICATIONS_FULL.find((x) => x.id === id);
      const visible = !!n && (activeFilter === 'all' || (activeFilter === 'unread' && n.unread)) && matchesNotifSearch(n, q);
      row.classList.toggle('hidden', !visible);
      if (visible) visibleCount++;
    });
    emptyEl.classList.toggle('hidden', visibleCount !== 0);
  }

  document.querySelectorAll('.orders-filters [data-filter]').forEach((chip) => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.orders-filters [data-filter]').forEach((c) => c.classList.remove('filter-chip-active'));
      chip.classList.add('filter-chip-active');
      activeFilter = chip.getAttribute('data-filter');
      applyFilter();
    });
  });

  searchInput.addEventListener('input', applyFilter);

  function markRead(n, row, silent = true) {
    if (!n.unread) return;
    n.unread = false;
    Api.notifications.markRead(n.id).catch(() => {});
    const cardBtn = row.querySelector('.notif-card');
    if (cardBtn) cardBtn.classList.remove('notif-card-unread');
    const dot = row.querySelector('.notif-card-dot');
    if (dot) dot.remove();
    const readBtn = row.querySelector('[data-notif-read]');
    if (readBtn) readBtn.remove();
    syncCount();
    if (activeFilter === 'unread') applyFilter();
    if (!silent) showToast('تم تعليم الإشعار كمقروء', 'success');
  }

  function openNotification(n, row) {
    markRead(n, row);

    const action = n.action || { type: 'none' };
    if (action.type === 'track') {
      Router.navigate('live-tracking', { direction: 'forward', params: { id: action.id, back: 'notifications' } });
    } else if (action.type === 'wallet') {
      Router.navigate('wallet', { direction: 'forward' });
    } else if (action.type === 'offer') {
      navigator.clipboard?.writeText(action.code).catch(() => {});
      showToast(`تم نسخ كود الخصم ${action.code}`, 'success');
    } else {
      showToast('تم فتح الإشعار', 'info');
    }
  }

  function deleteNotification(id, row) {
    const idx = NOTIFICATIONS_FULL.findIndex((x) => x.id === id);
    if (idx === -1) return;
    NOTIFICATIONS_FULL.splice(idx, 1);
    row.classList.add('notif-card-row-removing');
    setTimeout(() => {
      row.remove();
      syncCount();
      applyFilter();
    }, 180);
    showToast('تم حذف الإشعار', 'info');
  }

  list.addEventListener('click', (e) => {
    const deleteBtn = e.target.closest('[data-notif-delete]');
    if (deleteBtn) {
      e.stopPropagation();
      const row = deleteBtn.closest('.notif-card-row');
      deleteNotification(deleteBtn.getAttribute('data-notif-delete'), row);
      return;
    }
    const readBtn = e.target.closest('[data-notif-read]');
    if (readBtn) {
      e.stopPropagation();
      const row = readBtn.closest('.notif-card-row');
      const id = readBtn.getAttribute('data-notif-read');
      const n = NOTIFICATIONS_FULL.find((x) => x.id === id);
      if (n) markRead(n, row, false);
      return;
    }
    const card = e.target.closest('.notif-card');
    if (card) {
      const id = card.getAttribute('data-notif-card');
      const row = card.closest('.notif-card-row');
      const n = NOTIFICATIONS_FULL.find((x) => x.id === id);
      if (n) openNotification(n, row);
    }
  });

  markAllBtn.addEventListener('click', () => {
    if (unreadCount() === 0) { showToast('لا توجد إشعارات غير مقروءة', 'info'); return; }
    Api.notifications.markAllRead().catch(() => {});
    NOTIFICATIONS_FULL.forEach((n) => (n.unread = false));
    list.querySelectorAll('.notif-card-unread').forEach((c) => c.classList.remove('notif-card-unread'));
    list.querySelectorAll('.notif-card-dot').forEach((d) => d.remove());
    list.querySelectorAll('[data-notif-read]').forEach((b) => b.remove());
    syncCount();
    showToast('تم تعليم كل الإشعارات كمقروءة', 'success');
  });

  wireBottomNav('notifications');
}

/* ============================================================
   Wallet (standalone page)
   ============================================================ */
function initWallet() {
  const balanceValueEl = document.getElementById('wallet-balance-value');
  const eyeBtn = document.getElementById('wallet-eye-btn');
  const copyBtn = document.getElementById('wallet-copy-btn');
  const txList = document.getElementById('wallet-tx-list');

  let balanceHidden = false;
  eyeBtn.addEventListener('click', () => {
    balanceHidden = !balanceHidden;
    balanceValueEl.textContent = balanceHidden ? '••••••' : formatPrice(WalletAccount.balance);
    eyeBtn.innerHTML = balanceHidden ? Icon.eyeOff : Icon.eye;
  });

  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(WalletAccount.number);
    } catch (err) {
      /* clipboard may be unavailable in this environment — fail silently */
    }
    showToast('تم نسخ رقم المحفظة', 'success');
  });

  function refreshBalance() {
    if (!balanceHidden) balanceValueEl.textContent = formatPrice(WalletAccount.balance);
  }

  function prependTransaction(tx) {
    txList.insertAdjacentHTML('afterbegin', TransactionRow(tx));
    const row = txList.firstElementChild;
    row.classList.add('wallet-tx-row-new');
    row.addEventListener('click', () => {
      showToast(`${tx.title} — ${formatPrice(Math.abs(tx.amount))}`, 'info');
    });
  }

  txList.querySelectorAll('.wallet-tx-row').forEach((row) => {
    row.addEventListener('click', () => {
      const id = row.getAttribute('data-tx-id');
      const tx = WALLET_TRANSACTIONS.find((t) => t.id === id);
      if (tx) showToast(`${tx.title} — ${formatPrice(Math.abs(tx.amount))}`, 'info');
    });
  });

  /* ---------------- Action sheet (Deposit / Withdraw / Transfer) ---------------- */
  const overlay = document.getElementById('wallet-sheet-overlay');
  const sheet = document.getElementById('wallet-sheet');
  const sheetTitle = document.getElementById('wallet-sheet-title');
  const sheetClose = document.getElementById('wallet-sheet-close');
  const sheetConfirm = document.getElementById('wallet-sheet-confirm');
  const sheetConfirmLabel = document.getElementById('wallet-sheet-confirm-label');
  const amountInput = document.getElementById('wallet-amount');
  const transferField = document.getElementById('wallet-transfer-field');
  const transferInput = document.getElementById('wallet-transfer-target');
  const quickChips = document.getElementById('wallet-sheet-quick');
  let currentAction = null;

  const ACTION_META = {
    deposit: { title: 'إيداع رصيد', confirmLabel: 'تأكيد الإيداع' },
    withdraw: { title: 'سحب رصيد', confirmLabel: 'تأكيد السحب' },
    transfer: { title: 'تحويل رصيد', confirmLabel: 'تأكيد التحويل' },
  };

  function openSheet(action) {
    currentAction = action;
    const meta = ACTION_META[action];
    sheetTitle.textContent = meta.title;
    sheetConfirmLabel.textContent = meta.confirmLabel;
    transferField.classList.toggle('hidden', action !== 'transfer');
    amountInput.value = '';
    transferInput.value = '';
    clearFieldError('wallet-amount');
    clearFieldError('wallet-transfer-target');
    overlay.classList.add('is-open');
    requestAnimationFrame(() => sheet.classList.add('is-open'));
    setTimeout(() => amountInput.focus(), 300);
  }

  function closeSheet() {
    sheet.classList.remove('is-open');
    setTimeout(() => overlay.classList.remove('is-open'), 260);
  }

  document.querySelectorAll('[data-wallet-action]').forEach((btn) => {
    btn.addEventListener('click', () => openSheet(btn.getAttribute('data-wallet-action')));
  });

  sheetClose.addEventListener('click', closeSheet);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeSheet();
  });

  quickChips.querySelectorAll('[data-quick-amount]').forEach((chip) => {
    chip.addEventListener('click', () => {
      amountInput.value = chip.getAttribute('data-quick-amount');
      clearFieldError('wallet-amount');
    });
  });

  amountInput.addEventListener('input', () => clearFieldError('wallet-amount'));
  transferInput.addEventListener('input', () => clearFieldError('wallet-transfer-target'));

  sheetConfirm.addEventListener('click', async () => {
    clearFieldError('wallet-amount');
    clearFieldError('wallet-transfer-target');
    let valid = true;

    const amount = parseFloat(amountInput.value);
    if (!amount || amount <= 0) {
      setFieldError('wallet-amount', 'أدخل مبلغاً صحيحاً');
      valid = false;
    }
    if (currentAction === 'withdraw' && amount > WalletAccount.balance) {
      setFieldError('wallet-amount', 'الرصيد غير كافٍ لإتمام عملية السحب');
      valid = false;
    }
    if (currentAction === 'transfer' && amount > WalletAccount.balance) {
      setFieldError('wallet-amount', 'الرصيد غير كافٍ لإتمام عملية التحويل');
      valid = false;
    }
    let transferTarget = '';
    if (currentAction === 'transfer') {
      transferTarget = transferInput.value.trim();
      if (transferTarget.length < 4) {
        setFieldError('wallet-transfer-target', 'أدخل رقم محفظة صحيح للمستلم');
        valid = false;
      }
    }
    if (!valid) return;

    setButtonLoading('wallet-sheet-confirm', true);
    await fakeDelay(1100);
    setButtonLoading('wallet-sheet-confirm', false);

    let txPayload;
    if (currentAction === 'deposit') {
      txPayload = { type: 'deposit', title: 'إيداع رصيد', desc: 'إيداع عبر بطاقة إلكترونية', amount };
    } else if (currentAction === 'withdraw') {
      txPayload = { type: 'withdraw', title: 'سحب إلى حساب بنكي', desc: 'مصرف الرافدين •• 4821', amount: -amount };
    } else {
      txPayload = { type: 'transfer_out', title: `تحويل إلى ${transferTarget}`, desc: 'تحويل بين المحافظ', amount: -amount };
    }

    // تحديث فوري بالواجهة، ثم حفظ حقيقي بالسيرفر بالخلفية (يرجع محلياً إذا السيرفر غير متاح)
    const tx = addWalletTransaction(txPayload);
    Api.wallet.addTransaction(txPayload).catch(() => {});

    const successMsgs = { deposit: 'تم إيداع الرصيد بنجاح', withdraw: 'تم إرسال طلب السحب بنجاح', transfer_out: 'تم تحويل الرصيد بنجاح' };
    showToast(successMsgs[txPayload.type], 'success');

    prependTransaction(tx);
    refreshBalance();
    closeSheet();
  });
}

/* ============================================================
   Profile
   ============================================================ */
function initProfile() {
  const user = AppState.currentUser || FAKE_USERS[0];
  AppState.currentUser = user;

  const avatarBox = document.getElementById('profile-avatar');
  const heroName = document.getElementById('profile-hero-name');
  const heroPhone = document.getElementById('profile-hero-phone');
  const photoInput = document.getElementById('profile-photo-input');

  const nameSubEl = document.querySelector('#profile-edit-name-btn .menu-row-sub');
  const phoneSubEl = document.querySelector('#profile-edit-phone-btn .menu-row-sub');

  /* ---------------- Logout (shared with side menu) ---------------- */
  function doLogout() {
    AppState.currentUser = null;
    AppState.pendingAuth = null;
    showToast('تم تسجيل الخروج', 'info');
    Router.navigate('login', { direction: 'back' });
  }
  document.getElementById('profile-logout-btn').addEventListener('click', doLogout);

  /* ---------------- Navigate to Settings ---------------- */
  document.getElementById('profile-settings-btn').addEventListener('click', () => {
    Router.navigate('settings', { direction: 'forward' });
  });
  document.getElementById('profile-settings-link-btn').addEventListener('click', () => {
    Router.navigate('settings', { direction: 'forward' });
  });

  /* ---------------- Change photo ---------------- */
  function triggerPhotoPicker() { photoInput.click(); }
  document.getElementById('profile-avatar-edit-btn').addEventListener('click', triggerPhotoPicker);
  document.getElementById('profile-edit-photo-btn').addEventListener('click', triggerPhotoPicker);

  photoInput.addEventListener('change', () => {
    const file = photoInput.files && photoInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      user.avatar = reader.result;
      avatarBox.innerHTML = ProfileAvatar(user);
      showToast('تم تحديث الصورة الشخصية بنجاح', 'success');
    };
    reader.readAsDataURL(file);
    photoInput.value = '';
  });

  /* ---------------- Edit sheet: name / phone / password ---------------- */
  const overlay = document.getElementById('profile-sheet-overlay');
  const sheet = document.getElementById('profile-sheet');
  const sheetTitle = document.getElementById('profile-sheet-title');
  const sheetClose = document.getElementById('profile-sheet-close');
  const sheetConfirm = document.getElementById('profile-sheet-confirm');
  const sheetConfirmLabel = document.getElementById('profile-sheet-confirm-label');

  const nameField = document.querySelector('[data-field="profile-name-input"]');
  const phoneField = document.querySelector('[data-field="profile-phone-input"]');
  const passCurrentField = document.querySelector('[data-field="profile-pass-current"]');
  const passNewField = document.querySelector('[data-field="profile-pass-new"]');
  const passConfirmField = document.querySelector('[data-field="profile-pass-confirm"]');

  const nameInput = document.getElementById('profile-name-input');
  const phoneInput = document.getElementById('profile-phone-input');
  const passCurrentInput = document.getElementById('profile-pass-current');
  const passNewInput = document.getElementById('profile-pass-new');
  const passConfirmInput = document.getElementById('profile-pass-confirm');

  wirePasswordToggle('profile-pass-current', 'profile-pass-current-toggle');
  wirePasswordToggle('profile-pass-new', 'profile-pass-new-toggle');
  wirePasswordToggle('profile-pass-confirm', 'profile-pass-confirm-toggle');

  [nameInput, phoneInput, passCurrentInput, passNewInput, passConfirmInput].forEach((input) => {
    input.addEventListener('input', () => clearFieldError(input.id));
  });
  phoneInput.addEventListener('input', () => {
    phoneInput.value = phoneInput.value.replace(/[^\d]/g, '').slice(0, 11);
  });

  const SHEET_META = {
    name: { title: 'تغيير الاسم', confirmLabel: 'حفظ الاسم' },
    phone: { title: 'تغيير رقم الهاتف', confirmLabel: 'حفظ الرقم' },
    password: { title: 'تغيير كلمة المرور', confirmLabel: 'حفظ كلمة المرور' },
  };
  let currentAction = null;

  function openSheet(action) {
    currentAction = action;
    const meta = SHEET_META[action];
    sheetTitle.textContent = meta.title;
    sheetConfirmLabel.textContent = meta.confirmLabel;

    nameField.classList.toggle('hidden', action !== 'name');
    phoneField.classList.toggle('hidden', action !== 'phone');
    passCurrentField.classList.toggle('hidden', action !== 'password');
    passNewField.classList.toggle('hidden', action !== 'password');
    passConfirmField.classList.toggle('hidden', action !== 'password');

    clearAllErrors(sheet);
    if (action === 'name') nameInput.value = user.name;
    if (action === 'phone') phoneInput.value = user.phone;
    if (action === 'password') { passCurrentInput.value = ''; passNewInput.value = ''; passConfirmInput.value = ''; }

    overlay.classList.add('is-open');
    requestAnimationFrame(() => sheet.classList.add('is-open'));
  }

  function closeSheet() {
    sheet.classList.remove('is-open');
    setTimeout(() => overlay.classList.remove('is-open'), 260);
  }

  document.getElementById('profile-edit-name-btn').addEventListener('click', () => openSheet('name'));
  document.getElementById('profile-edit-phone-btn').addEventListener('click', () => openSheet('phone'));
  document.getElementById('profile-edit-password-btn').addEventListener('click', () => openSheet('password'));

  sheetClose.addEventListener('click', closeSheet);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeSheet(); });

  sheetConfirm.addEventListener('click', async () => {
    clearAllErrors(sheet);
    let valid = true;

    if (currentAction === 'name') {
      const name = nameInput.value.trim();
      if (name.length < 3) { setFieldError('profile-name-input', 'أدخل اسماً صحيحاً (3 أحرف على الأقل)'); valid = false; }
      if (!valid) return;

      setButtonLoading('profile-sheet-confirm', true);
      await fakeDelay(900);
      setButtonLoading('profile-sheet-confirm', false);

      user.name = name;
      heroName.textContent = name;
      if (nameSubEl) nameSubEl.textContent = name;
      showToast('تم تحديث الاسم بنجاح', 'success');
      closeSheet();
    } else if (currentAction === 'phone') {
      const phone = phoneInput.value.trim();
      if (!isValidIraqiPhone(phone)) { setFieldError('profile-phone-input', 'أدخل رقم هاتف عراقي صحيح (07XXXXXXXXX)'); valid = false; }
      if (!valid) return;

      setButtonLoading('profile-sheet-confirm', true);
      await fakeDelay(900);
      setButtonLoading('profile-sheet-confirm', false);

      user.phone = phone;
      heroPhone.textContent = phone;
      if (phoneSubEl) phoneSubEl.textContent = phone;
      showToast('تم تحديث رقم الهاتف بنجاح', 'success');
      closeSheet();
    } else if (currentAction === 'password') {
      const current = passCurrentInput.value;
      const next = passNewInput.value;
      const confirm = passConfirmInput.value;

      if (current !== user.password) { setFieldError('profile-pass-current', 'كلمة المرور الحالية غير صحيحة'); valid = false; }
      if (!next || next.length < 6) { setFieldError('profile-pass-new', 'يجب أن تتكون من 6 أحرف على الأقل'); valid = false; }
      if (confirm !== next) { setFieldError('profile-pass-confirm', 'كلمتا المرور غير متطابقتين'); valid = false; }
      if (!valid) return;

      setButtonLoading('profile-sheet-confirm', true);
      await fakeDelay(900);
      setButtonLoading('profile-sheet-confirm', false);

      user.password = next;
      showToast('تم تغيير كلمة المرور بنجاح', 'success');
      closeSheet();
    }
  });

  wireBottomNav('account');
}

/* ============================================================
   Settings
   ============================================================ */
function initSettings() {
  const overlay = document.getElementById('settings-sheet-overlay');
  const sheet = document.getElementById('settings-sheet');
  const sheetTitle = document.getElementById('settings-sheet-title');
  const sheetClose = document.getElementById('settings-sheet-close');
  const sheetBody = document.getElementById('settings-sheet-body');

  function openSheet() {
    overlay.classList.add('is-open');
    requestAnimationFrame(() => sheet.classList.add('is-open'));
  }
  function closeSheet() {
    sheet.classList.remove('is-open');
    setTimeout(() => overlay.classList.remove('is-open'), 260);
  }
  sheetClose.addEventListener('click', closeSheet);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeSheet(); });

  /* ---------------- Language ---------------- */
  const languageValueEl = document.querySelector('#settings-language-btn .menu-row-value');

  function renderLanguageSheet() {
    sheetTitle.textContent = 'اختر اللغة';
    sheetBody.innerHTML = LANGUAGE_OPTIONS.map((l) => `
      <button class="lang-option-row ${l.id === AppState.settings.language ? 'is-active' : ''}" data-lang="${l.id}">
        <span>${l.label}</span>
        <span class="lang-option-row-check">${l.id === AppState.settings.language ? Icon.check : ''}</span>
      </button>
    `).join('');
    sheetBody.querySelectorAll('[data-lang]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const langId = btn.getAttribute('data-lang');
        AppState.settings.language = langId;
        const meta = LANGUAGE_OPTIONS.find((l) => l.id === langId);
        if (languageValueEl) languageValueEl.textContent = meta.label;
        showToast(`تم تعيين لغة التطبيق: ${meta.label}`, 'success');
        closeSheet();
      });
    });
  }

  document.getElementById('settings-language-btn').addEventListener('click', () => {
    renderLanguageSheet();
    openSheet();
  });

  /* ---------------- Dark mode ---------------- */
  const darkToggle = document.getElementById('settings-darkmode-toggle');
  darkToggle.addEventListener('change', () => {
    setDarkMode(darkToggle.checked);
    showToast(AppState.settings.darkMode ? 'تم تفعيل الوضع الليلي' : 'تم إيقاف الوضع الليلي', 'info');
  });

  /* ---------------- Push Notifications ---------------- */
  const pushToggle = document.getElementById('settings-push-toggle');
  if (pushToggle) {
    // نحدد الحالة الفعلية للاشتراك عند فتح الصفحة
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready
        .then((reg) => reg.pushManager.getSubscription())
        .then((sub) => { pushToggle.checked = !!sub; })
        .catch(() => {});
    }
    pushToggle.addEventListener('change', async () => {
      if (pushToggle.checked) {
        const result = await subscribeToPush();
        if (!result.ok) {
          pushToggle.checked = false;
          showToast(result.error || 'تعذر تفعيل الإشعارات', 'error');
          return;
        }
        showToast('تم تفعيل إشعارات Push بنجاح', 'success');
      } else {
        await unsubscribeFromPush().catch(() => {});
        showToast('تم إيقاف إشعارات Push', 'info');
      }
    });
  }

  /* ---------------- Privacy Policy ---------------- */
  document.getElementById('settings-privacy-btn').addEventListener('click', () => {
    sheetTitle.textContent = 'سياسة الخصوصية';
    sheetBody.innerHTML = `<div class="info-sheet-text">${PRIVACY_POLICY_TEXT.map((p) => `<p>${p}</p>`).join('')}</div>`;
    openSheet();
  });

  /* ---------------- Terms & Conditions ---------------- */
  document.getElementById('settings-terms-btn').addEventListener('click', () => {
    sheetTitle.textContent = 'الشروط والأحكام';
    sheetBody.innerHTML = `<div class="info-sheet-text">${TERMS_CONDITIONS_TEXT.map((p) => `<p>${p}</p>`).join('')}</div>`;
    openSheet();
  });

  /* ---------------- Contact Support ---------------- */
  document.getElementById('settings-support-btn').addEventListener('click', () => {
    showToast(`للتواصل مع الدعم الفني: ${APP.supportPhone}`, 'info', 4000);
    window.location.href = `tel:${APP.supportPhone}`;
  });

  /* ---------------- Logout (shared with side menu) ---------------- */
  document.getElementById('settings-logout-btn').addEventListener('click', () => {
    AppState.currentUser = null;
    AppState.pendingAuth = null;
    showToast('تم تسجيل الخروج', 'info');
    Router.navigate('login', { direction: 'back' });
  });

  wireBottomNav('account');
}

/* ============================================================
   Order Details / Shipment Details (shared behaviour)
   ============================================================ */
function initShipmentDetailPage() {
  const content = document.getElementById('detail-content');
  const id = content.getAttribute('data-order-id');

  function wireActions() {
    const liveTrackBtn = document.getElementById('detail-live-track-btn');
    if (liveTrackBtn) {
      liveTrackBtn.addEventListener('click', () => {
        Router.navigate('live-tracking', { direction: 'forward', params: { id, back: Router.current } });
      });
    }

    const copyBtn = document.getElementById('detail-copy-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(id);
        } catch (err) {
          /* clipboard may be unavailable in this environment — fail silently */
        }
        showToast('تم نسخ رقم الشحنة', 'success');
      });
    }

    const cancelBtn = document.getElementById('detail-cancel-btn');
    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => {
        const confirmed = window.confirm('هل أنت متأكد من إلغاء هذه الشحنة؟');
        if (!confirmed) return;
        const s = getShipmentById(id);
        if (!s) return;
        s.status = 'cancelled';
        showToast('تم إلغاء الشحنة بنجاح', 'info');
        content.innerHTML = ShipmentDetailBody(s);
        wireActions();
      });
    }

    const reorderBtn = document.getElementById('detail-reorder-btn');
    if (reorderBtn) {
      reorderBtn.addEventListener('click', () => {
        Router.navigate('create-shipment', { direction: 'forward' });
      });
    }

    const supportBtn = document.getElementById('detail-support-btn');
    if (supportBtn) {
      supportBtn.addEventListener('click', () => {
        showToast(`للتواصل مع الدعم الفني: ${APP.supportPhone}`, 'info', 4000);
      });
    }
  }

  wireActions();
}

function initOrderDetails() { initShipmentDetailPage(); }
function initShipmentDetails() { initShipmentDetailPage(); }

/* ============================================================
   Create Shipment
   ============================================================ */
function initCreateShipment() {
  const form = document.getElementById('create-shipment-form');
  const weightInput = document.getElementById('cs-weight');
  const priceEl = document.getElementById('cs-price-estimate');

  const fieldIds = ['cs-sender-name', 'cs-sender-phone', 'cs-receiver-name', 'cs-receiver-phone', 'cs-pickup-city', 'cs-pickup-address', 'cs-delivery-city', 'cs-delivery-address', 'cs-weight', 'cs-payment'];
  fieldIds.forEach((id) => {
    const el = document.getElementById(id);
    el.addEventListener('input', () => clearFieldError(id));
    el.addEventListener('change', () => clearFieldError(id));
  });

  document.getElementById('cs-sender-phone').addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^\d]/g, '').slice(0, 11);
  });
  document.getElementById('cs-receiver-phone').addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^\d]/g, '').slice(0, 11);
  });

  function estimatePrice() {
    const w = parseFloat(weightInput.value) || 0;
    return Math.max(Math.round((10000 + w * 3000) / 500) * 500, 10000);
  }

  function updateEstimate() {
    priceEl.textContent = formatPrice(estimatePrice());
  }
  weightInput.addEventListener('input', updateEstimate);
  updateEstimate();

  form.addEventListener('submit', (e) => e.preventDefault());

  document.getElementById('create-shipment-submit').addEventListener('click', async () => {
    clearAllErrors(form);
    let valid = true;

    const senderName = document.getElementById('cs-sender-name').value.trim();
    const senderPhone = document.getElementById('cs-sender-phone').value.trim();
    const receiverName = document.getElementById('cs-receiver-name').value.trim();
    const receiverPhone = document.getElementById('cs-receiver-phone').value.trim();
    const pickupCity = document.getElementById('cs-pickup-city').value;
    const pickupAddress = document.getElementById('cs-pickup-address').value.trim();
    const deliveryCity = document.getElementById('cs-delivery-city').value;
    const deliveryAddress = document.getElementById('cs-delivery-address').value.trim();
    const weight = parseFloat(document.getElementById('cs-weight').value);
    const payment = document.getElementById('cs-payment').value;

    if (senderName.length < 3) { setFieldError('cs-sender-name', 'أدخل اسم المرسل كاملاً'); valid = false; }
    if (!isValidIraqiPhone(senderPhone)) { setFieldError('cs-sender-phone', 'أدخل رقم هاتف عراقي صحيح'); valid = false; }
    if (receiverName.length < 3) { setFieldError('cs-receiver-name', 'أدخل اسم المستلم كاملاً'); valid = false; }
    if (!isValidIraqiPhone(receiverPhone)) { setFieldError('cs-receiver-phone', 'أدخل رقم هاتف عراقي صحيح'); valid = false; }
    if (!pickupCity) { setFieldError('cs-pickup-city', 'اختر محافظة الاستلام'); valid = false; }
    if (!pickupAddress) { setFieldError('cs-pickup-address', 'أدخل عنوان الاستلام'); valid = false; }
    if (!deliveryCity) { setFieldError('cs-delivery-city', 'اختر محافظة التسليم'); valid = false; }
    if (!deliveryAddress) { setFieldError('cs-delivery-address', 'أدخل عنوان التسليم'); valid = false; }
    if (!weight || weight <= 0) { setFieldError('cs-weight', 'أدخل وزناً صحيحاً'); valid = false; }
    if (!payment) { setFieldError('cs-payment', 'اختر طريقة الدفع'); valid = false; }

    if (!valid) {
      showToast('يرجى تصحيح الحقول المطلوبة', 'error');
      return;
    }

    setButtonLoading('create-shipment-submit', true);

    const payload = {
      sender: { name: senderName, phone: senderPhone, city: pickupCity },
      receiver: { name: receiverName, phone: receiverPhone, city: deliveryCity },
      pickupAddress: `${pickupAddress}, ${pickupCity}`,
      deliveryAddress: `${deliveryAddress}, ${deliveryCity}`,
      weight: weight,
      price: estimatePrice(),
      paymentMethod: payment,
    };

    let record;
    const apiResult = await Api.shipments.create(payload);
    if (apiResult.ok) {
      record = apiResult.shipment;
      SHIPMENTS.unshift(record);
    } else {
      // السيرفر غير متاح — ننشئ الشحنة محلياً حتى لا يفشل العرض بالكامل
      record = createShipmentRecord(payload);
    }

    setButtonLoading('create-shipment-submit', false);
    showToast('تم إنشاء الشحنة بنجاح', 'success');
    Router.navigate('shipment-details', { direction: 'forward', params: { id: record.id, back: 'orders' } });
  });
}

/* ============================================================
   Shared helpers
   ============================================================ */
function wireBottomNav(activeId) {
  const nav = document.getElementById('bottom-nav');
  if (!nav) return;
  nav.querySelectorAll('[data-bn]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-bn');
      if (id === activeId) return;
      if (id === 'home') { Router.navigate('home', { direction: 'back' }); return; }
      if (id === 'orders') { Router.navigate('orders', { direction: activeId === 'history' ? 'back' : 'forward' }); return; }
      if (id === 'track') { Router.navigate('track', { direction: 'forward' }); return; }
      if (id === 'notifications') { Router.navigate('notifications', { direction: activeId === 'notifications' ? 'back' : 'forward' }); return; }
      if (id === 'account') { Router.navigate('profile', { direction: 'forward' }); return; }
      showToast('هذا القسم قيد التجهيز 🚀', 'info');
    });
  });
}

function wirePasswordToggle(inputId, toggleSlotId) {
  const input = document.getElementById(inputId);
  const slot = document.getElementById(toggleSlotId);
  if (!input || !slot) return;
  let visible = false;
  slot.innerHTML = Icon.eyeOff;
  slot.classList.add('field-toggle');
  slot.addEventListener('click', () => {
    visible = !visible;
    input.type = visible ? 'text' : 'password';
    slot.innerHTML = visible ? Icon.eye : Icon.eyeOff;
  });
}

/* ============================================================
   Driver module — Home, New / Active / Completed Orders
   ============================================================ */

/* Wires Accept / Reject / Start / Complete buttons inside a list
   container. `rerender` redraws just that list after each action
   so the card moves to (or drops from) the right screen instantly. */
function wireDriverOrderActions(container, rerender) {
  if (!container) return;

  container.querySelectorAll('[data-accept-id]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-accept-id');
      acceptDriverOrder(id);
      showToast('تم قبول الطلب، تحقق من الطلبات قيد التنفيذ', 'success');
      rerender();
    });
  });

  container.querySelectorAll('[data-reject-id]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-reject-id');
      const confirmed = window.confirm('هل أنت متأكد من رفض هذا الطلب؟');
      if (!confirmed) return;
      rejectDriverOrder(id);
      showToast('تم رفض الطلب', 'info');
      rerender();
    });
  });

  container.querySelectorAll('[data-start-id]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-start-id');
      startDriverDelivery(id);
      showToast('تم بدء التوصيل، بالتوفيق 🚚', 'success');
      rerender();
    });
  });

  container.querySelectorAll('[data-complete-id]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-complete-id');
      completeDriverDelivery(id);
      showToast('تم تسليم الطلب بنجاح 🎉', 'success');
      rerender();
    });
  });
}

/* Refreshes the "new orders" badge shown on the driver bottom nav,
   whichever driver screen is currently mounted. */
function refreshDriverNewBadge() {
  const badge = document.getElementById('bn-driver-new-badge');
  if (badge) badge.textContent = getDriverOrdersByStatus('new').length;
}

function initDriverHome() {
  const dynamicContainer = document.getElementById('driver-home-dynamic');

  function wireInner() {
    const viewNewBtn = document.getElementById('driver-home-view-new');
    if (viewNewBtn) {
      viewNewBtn.addEventListener('click', () => {
        Router.navigate('driver-new-orders', { direction: 'forward' });
      });
    }
    const previewList = dynamicContainer.querySelector('.driver-home-preview-list');
    wireDriverOrderActions(previewList, render);
  }

  function render() {
    dynamicContainer.innerHTML = renderDriverHomeDynamic();
    wireInner();
    refreshDriverNewBadge();
  }

  wireInner();
}

function initDriverNewOrders() {
  const list = document.getElementById('driver-new-list');
  const empty = document.getElementById('driver-new-empty');

  function render() {
    const orders = getDriverOrdersByStatus('new');
    list.innerHTML = orders.map((o) => DriverOrderCard(o)).join('');
    empty.classList.toggle('hidden', orders.length > 0);
    wireDriverOrderActions(list, render);
    refreshDriverNewBadge();
  }

  render();
}

function initDriverActiveOrders() {
  const list = document.getElementById('driver-active-list');
  const empty = document.getElementById('driver-active-empty');

  function render() {
    const orders = getDriverOrdersByStatus('active');
    list.innerHTML = orders.map((o) => DriverOrderCard(o)).join('');
    empty.classList.toggle('hidden', orders.length > 0);
    wireDriverOrderActions(list, render);
    refreshDriverNewBadge();
  }

  render();
}

function initDriverCompletedOrders() {
  // Completed cards carry no action buttons — nothing to wire.
  refreshDriverNewBadge();
}

/* ============================================================
   Driver — Earnings
   ============================================================ */
function initDriverEarnings() {
  const heroWrap = document.getElementById('earnings-hero-wrap');
  const chartWrap = document.getElementById('earnings-chart-wrap');
  const tripsStat = document.getElementById('earnings-stat-trips');
  const bestStat = document.getElementById('earnings-stat-best');
  const toggle = document.querySelector('.earnings-period-toggle');
  let period = 'weekly';

  function render() {
    const summary = getDriverEarningsSummary(period);
    heroWrap.innerHTML = EarningsHeroCard(summary, period);
    chartWrap.innerHTML = EarningsBarChart(summary.rows);
    tripsStat.textContent = summary.trips;
    bestStat.textContent = formatPrice(summary.best.value);
  }

  toggle.querySelectorAll('[data-earnings-period]').forEach((btn) => {
    btn.addEventListener('click', () => {
      period = btn.getAttribute('data-earnings-period');
      toggle.querySelectorAll('[data-earnings-period]').forEach((b) => b.classList.remove('filter-chip-active'));
      btn.classList.add('filter-chip-active');
      render();
    });
  });

  document.getElementById('earnings-recent-list').querySelectorAll('.earnings-row').forEach((row) => {
    row.addEventListener('click', () => showToast('تفاصيل الرحلة قيد التطوير', 'info'));
  });

}

/* ============================================================
   Driver — Wallet
   ============================================================ */
function initDriverWallet() {
  const balanceValueEl = document.getElementById('driver-wallet-balance-value');
  const eyeBtn = document.getElementById('driver-wallet-eye-btn');
  const copyBtn = document.getElementById('driver-wallet-copy-btn');
  const txList = document.getElementById('driver-wallet-tx-list');

  let balanceHidden = false;
  eyeBtn.addEventListener('click', () => {
    balanceHidden = !balanceHidden;
    balanceValueEl.textContent = balanceHidden ? '••••••' : formatPrice(DRIVER_WALLET.balance);
    eyeBtn.innerHTML = balanceHidden ? Icon.eyeOff : Icon.eye;
  });

  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(DRIVER_WALLET.number);
    } catch (err) {
      /* clipboard may be unavailable in this environment — fail silently */
    }
    showToast('تم نسخ رقم المحفظة', 'success');
  });

  function refreshBalance() {
    if (!balanceHidden) balanceValueEl.textContent = formatPrice(DRIVER_WALLET.balance);
  }

  function prependTransaction(tx) {
    txList.insertAdjacentHTML('afterbegin', DriverTransactionRow(tx));
    const row = txList.firstElementChild;
    row.classList.add('wallet-tx-row-new');
    row.addEventListener('click', () => {
      showToast(`${tx.title} — ${formatPrice(Math.abs(tx.amount))}`, 'info');
    });
  }

  txList.querySelectorAll('.wallet-tx-row').forEach((row) => {
    row.addEventListener('click', () => {
      const id = row.getAttribute('data-tx-id');
      const tx = DRIVER_WALLET_TRANSACTIONS.find((t) => t.id === id);
      if (tx) showToast(`${tx.title} — ${formatPrice(Math.abs(tx.amount))}`, 'info');
    });
  });

  /* ---------------- Action sheet (سحب / تحويل) ---------------- */
  const overlay = document.getElementById('driver-wallet-sheet-overlay');
  const sheet = document.getElementById('driver-wallet-sheet');
  const sheetTitle = document.getElementById('driver-wallet-sheet-title');
  const sheetClose = document.getElementById('driver-wallet-sheet-close');
  const sheetConfirm = document.getElementById('driver-wallet-sheet-confirm');
  const sheetConfirmLabel = document.getElementById('driver-wallet-sheet-confirm-label');
  const amountInput = document.getElementById('driver-wallet-amount');
  const transferField = document.getElementById('driver-wallet-transfer-field');
  const transferInput = document.getElementById('driver-wallet-transfer-target');
  const quickChips = document.getElementById('driver-wallet-sheet-quick');
  let currentAction = null;

  const ACTION_META = {
    withdraw: { title: 'سحب رصيد', confirmLabel: 'تأكيد السحب' },
    transfer: { title: 'تحويل رصيد', confirmLabel: 'تأكيد التحويل' },
  };

  function openSheet(action) {
    currentAction = action;
    const meta = ACTION_META[action];
    sheetTitle.textContent = meta.title;
    sheetConfirmLabel.textContent = meta.confirmLabel;
    transferField.classList.toggle('hidden', action !== 'transfer');
    amountInput.value = '';
    transferInput.value = '';
    clearFieldError('driver-wallet-amount');
    clearFieldError('driver-wallet-transfer-target');
    overlay.classList.add('is-open');
    requestAnimationFrame(() => sheet.classList.add('is-open'));
    setTimeout(() => amountInput.focus(), 300);
  }

  function closeSheet() {
    sheet.classList.remove('is-open');
    setTimeout(() => overlay.classList.remove('is-open'), 260);
  }

  document.querySelectorAll('[data-driver-wallet-action]').forEach((btn) => {
    btn.addEventListener('click', () => openSheet(btn.getAttribute('data-driver-wallet-action')));
  });

  sheetClose.addEventListener('click', closeSheet);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeSheet();
  });

  quickChips.querySelectorAll('[data-driver-quick-amount]').forEach((chip) => {
    chip.addEventListener('click', () => {
      amountInput.value = chip.getAttribute('data-driver-quick-amount');
      clearFieldError('driver-wallet-amount');
    });
  });

  amountInput.addEventListener('input', () => clearFieldError('driver-wallet-amount'));
  transferInput.addEventListener('input', () => clearFieldError('driver-wallet-transfer-target'));

  sheetConfirm.addEventListener('click', async () => {
    clearFieldError('driver-wallet-amount');
    clearFieldError('driver-wallet-transfer-target');
    let valid = true;

    const amount = parseFloat(amountInput.value);
    if (!amount || amount <= 0) {
      setFieldError('driver-wallet-amount', 'أدخل مبلغاً صحيحاً');
      valid = false;
    }
    if ((currentAction === 'withdraw' || currentAction === 'transfer') && amount > DRIVER_WALLET.balance) {
      setFieldError('driver-wallet-amount', 'الرصيد غير كافٍ لإتمام العملية');
      valid = false;
    }
    let transferTarget = '';
    if (currentAction === 'transfer') {
      transferTarget = transferInput.value.trim();
      if (transferTarget.length < 4) {
        setFieldError('driver-wallet-transfer-target', 'أدخل رقم محفظة صحيح للمستلم');
        valid = false;
      }
    }
    if (!valid) return;

    setButtonLoading('driver-wallet-sheet-confirm', true);
    await fakeDelay(1100);
    setButtonLoading('driver-wallet-sheet-confirm', false);

    let tx;
    if (currentAction === 'withdraw') {
      tx = addDriverWalletTransaction({ type: 'withdraw', title: 'سحب إلى حساب بنكي', desc: 'مصرف الرافدين •• 7742', amount: -amount });
      showToast('تم إرسال طلب السحب بنجاح', 'success');
    } else {
      tx = addDriverWalletTransaction({ type: 'transfer_out', title: `تحويل إلى ${transferTarget}`, desc: 'تحويل بين المحافظ', amount: -amount });
      showToast('تم تحويل الرصيد بنجاح', 'success');
    }

    prependTransaction(tx);
    refreshBalance();
    closeSheet();
  });

}

/* ============================================================
   Driver — Ratings
   ============================================================ */
function initDriverRatings() {
  document.getElementById('driver-reviews-list').querySelectorAll('.review-row').forEach((row) => {
    row.addEventListener('click', () => showToast('شكراً لاطلاعك على آراء العملاء', 'info'));
  });
}

/* ============================================================
   Driver — Profile
   ============================================================ */
function initDriverProfile() {
  const d = DRIVER_INFO;

  const avatarBox = document.getElementById('driver-profile-avatar');
  const heroName = document.getElementById('driver-profile-hero-name');
  const heroPhone = document.getElementById('driver-profile-hero-phone');
  const photoInput = document.getElementById('driver-profile-photo-input');

  const nameSubEl = document.querySelector('#driver-profile-edit-name-btn .menu-row-sub');
  const phoneSubEl = document.querySelector('#driver-profile-edit-phone-btn .menu-row-sub');
  const vehicleSubEl = document.querySelector('#driver-profile-edit-vehicle-btn .menu-row-sub');

  /* ---------------- Logout ---------------- */
  function doLogout() {
    AppState.currentUser = null;
    AppState.pendingAuth = null;
    showToast('تم تسجيل الخروج', 'info');
    Router.navigate('login', { direction: 'back' });
  }
  document.getElementById('driver-profile-logout-btn').addEventListener('click', doLogout);

  /* ---------------- Navigation to Earnings / Wallet / Ratings / Settings ---------------- */
  document.getElementById('driver-profile-earnings-btn').addEventListener('click', () => {
    Router.navigate('driver-earnings', { direction: 'forward' });
  });
  document.getElementById('driver-profile-wallet-btn').addEventListener('click', () => {
    Router.navigate('driver-wallet', { direction: 'forward' });
  });
  document.getElementById('driver-profile-ratings-btn').addEventListener('click', () => {
    Router.navigate('driver-ratings', { direction: 'forward' });
  });
  document.getElementById('driver-profile-settings-btn').addEventListener('click', () => {
    Router.navigate('driver-settings', { direction: 'forward' });
  });
  document.getElementById('driver-profile-settings-link-btn').addEventListener('click', () => {
    Router.navigate('driver-settings', { direction: 'forward' });
  });

  /* ---------------- Change photo ---------------- */
  function triggerPhotoPicker() { photoInput.click(); }
  document.getElementById('driver-profile-avatar-edit-btn').addEventListener('click', triggerPhotoPicker);
  document.getElementById('driver-profile-edit-photo-btn').addEventListener('click', triggerPhotoPicker);

  photoInput.addEventListener('change', () => {
    const file = photoInput.files && photoInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      d.avatar = reader.result;
      avatarBox.innerHTML = ProfileAvatar(d);
      showToast('تم تحديث الصورة الشخصية بنجاح', 'success');
    };
    reader.readAsDataURL(file);
    photoInput.value = '';
  });

  /* ---------------- Edit sheet: name / phone / vehicle / password ---------------- */
  const overlay = document.getElementById('driver-profile-sheet-overlay');
  const sheet = document.getElementById('driver-profile-sheet');
  const sheetTitle = document.getElementById('driver-profile-sheet-title');
  const sheetClose = document.getElementById('driver-profile-sheet-close');
  const sheetConfirm = document.getElementById('driver-profile-sheet-confirm');
  const sheetConfirmLabel = document.getElementById('driver-profile-sheet-confirm-label');

  const nameField = document.querySelector('[data-field="driver-profile-name-input"]');
  const phoneField = document.querySelector('[data-field="driver-profile-phone-input"]');
  const vehicleField = document.querySelector('[data-field="driver-profile-vehicle-input"]');
  const plateField = document.querySelector('[data-field="driver-profile-plate-input"]');
  const passCurrentField = document.querySelector('[data-field="driver-profile-pass-current"]');
  const passNewField = document.querySelector('[data-field="driver-profile-pass-new"]');
  const passConfirmField = document.querySelector('[data-field="driver-profile-pass-confirm"]');

  const nameInput = document.getElementById('driver-profile-name-input');
  const phoneInput = document.getElementById('driver-profile-phone-input');
  const vehicleInput = document.getElementById('driver-profile-vehicle-input');
  const plateInput = document.getElementById('driver-profile-plate-input');
  const passCurrentInput = document.getElementById('driver-profile-pass-current');
  const passNewInput = document.getElementById('driver-profile-pass-new');
  const passConfirmInput = document.getElementById('driver-profile-pass-confirm');

  wirePasswordToggle('driver-profile-pass-current', 'driver-profile-pass-current-toggle');
  wirePasswordToggle('driver-profile-pass-new', 'driver-profile-pass-new-toggle');
  wirePasswordToggle('driver-profile-pass-confirm', 'driver-profile-pass-confirm-toggle');

  [nameInput, phoneInput, vehicleInput, plateInput, passCurrentInput, passNewInput, passConfirmInput].forEach((input) => {
    input.addEventListener('input', () => clearFieldError(input.id));
  });
  phoneInput.addEventListener('input', () => {
    phoneInput.value = phoneInput.value.replace(/[^\d]/g, '').slice(0, 11);
  });

  const SHEET_META = {
    name: { title: 'تغيير الاسم', confirmLabel: 'حفظ الاسم' },
    phone: { title: 'تغيير رقم الهاتف', confirmLabel: 'حفظ الرقم' },
    vehicle: { title: 'بيانات المركبة', confirmLabel: 'حفظ البيانات' },
    password: { title: 'تغيير كلمة المرور', confirmLabel: 'حفظ كلمة المرور' },
  };
  let currentAction = null;

  function openSheet(action) {
    currentAction = action;
    const meta = SHEET_META[action];
    sheetTitle.textContent = meta.title;
    sheetConfirmLabel.textContent = meta.confirmLabel;

    nameField.classList.toggle('hidden', action !== 'name');
    phoneField.classList.toggle('hidden', action !== 'phone');
    vehicleField.classList.toggle('hidden', action !== 'vehicle');
    plateField.classList.toggle('hidden', action !== 'vehicle');
    passCurrentField.classList.toggle('hidden', action !== 'password');
    passNewField.classList.toggle('hidden', action !== 'password');
    passConfirmField.classList.toggle('hidden', action !== 'password');

    clearAllErrors(sheet);
    if (action === 'name') nameInput.value = d.name;
    if (action === 'phone') phoneInput.value = d.phone;
    if (action === 'vehicle') { vehicleInput.value = d.vehicle; plateInput.value = d.plate; }
    if (action === 'password') { passCurrentInput.value = ''; passNewInput.value = ''; passConfirmInput.value = ''; }

    overlay.classList.add('is-open');
    requestAnimationFrame(() => sheet.classList.add('is-open'));
  }

  function closeSheet() {
    sheet.classList.remove('is-open');
    setTimeout(() => overlay.classList.remove('is-open'), 260);
  }

  document.getElementById('driver-profile-edit-name-btn').addEventListener('click', () => openSheet('name'));
  document.getElementById('driver-profile-edit-phone-btn').addEventListener('click', () => openSheet('phone'));
  document.getElementById('driver-profile-edit-vehicle-btn').addEventListener('click', () => openSheet('vehicle'));
  document.getElementById('driver-profile-edit-password-btn').addEventListener('click', () => openSheet('password'));

  sheetClose.addEventListener('click', closeSheet);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeSheet(); });

  sheetConfirm.addEventListener('click', async () => {
    clearAllErrors(sheet);
    let valid = true;

    if (currentAction === 'name') {
      const name = nameInput.value.trim();
      if (name.length < 3) { setFieldError('driver-profile-name-input', 'أدخل اسماً صحيحاً (3 أحرف على الأقل)'); valid = false; }
      if (!valid) return;

      setButtonLoading('driver-profile-sheet-confirm', true);
      await fakeDelay(900);
      setButtonLoading('driver-profile-sheet-confirm', false);

      d.name = name;
      heroName.textContent = name;
      if (nameSubEl) nameSubEl.textContent = name;
      showToast('تم تحديث الاسم بنجاح', 'success');
      closeSheet();
    } else if (currentAction === 'phone') {
      const phone = phoneInput.value.trim();
      if (!isValidIraqiPhone(phone)) { setFieldError('driver-profile-phone-input', 'أدخل رقم هاتف عراقي صحيح (07XXXXXXXXX)'); valid = false; }
      if (!valid) return;

      setButtonLoading('driver-profile-sheet-confirm', true);
      await fakeDelay(900);
      setButtonLoading('driver-profile-sheet-confirm', false);

      d.phone = phone;
      heroPhone.textContent = phone;
      if (phoneSubEl) phoneSubEl.textContent = phone;
      showToast('تم تحديث رقم الهاتف بنجاح', 'success');
      closeSheet();
    } else if (currentAction === 'vehicle') {
      const vehicle = vehicleInput.value.trim();
      const plate = plateInput.value.trim();
      if (vehicle.length < 3) { setFieldError('driver-profile-vehicle-input', 'أدخل نوع مركبة صحيح'); valid = false; }
      if (plate.length < 3) { setFieldError('driver-profile-plate-input', 'أدخل رقم لوحة صحيح'); valid = false; }
      if (!valid) return;

      setButtonLoading('driver-profile-sheet-confirm', true);
      await fakeDelay(900);
      setButtonLoading('driver-profile-sheet-confirm', false);

      d.vehicle = vehicle;
      d.plate = plate;
      if (vehicleSubEl) vehicleSubEl.textContent = `${vehicle} • ${plate}`;
      showToast('تم تحديث بيانات المركبة بنجاح', 'success');
      closeSheet();
    } else if (currentAction === 'password') {
      const current = passCurrentInput.value;
      const next = passNewInput.value;
      const confirm = passConfirmInput.value;

      if (current !== d.password) { setFieldError('driver-profile-pass-current', 'كلمة المرور الحالية غير صحيحة'); valid = false; }
      if (!next || next.length < 6) { setFieldError('driver-profile-pass-new', 'يجب أن تتكون من 6 أحرف على الأقل'); valid = false; }
      if (confirm !== next) { setFieldError('driver-profile-pass-confirm', 'كلمتا المرور غير متطابقتين'); valid = false; }
      if (!valid) return;

      setButtonLoading('driver-profile-sheet-confirm', true);
      await fakeDelay(900);
      setButtonLoading('driver-profile-sheet-confirm', false);

      d.password = next;
      showToast('تم تغيير كلمة المرور بنجاح', 'success');
      closeSheet();
    }
  });

}

/* ============================================================
   Driver — Settings
   ============================================================ */
function initDriverSettings() {
  const overlay = document.getElementById('settings-sheet-overlay');
  const sheet = document.getElementById('settings-sheet');
  const sheetTitle = document.getElementById('settings-sheet-title');
  const sheetClose = document.getElementById('settings-sheet-close');
  const sheetBody = document.getElementById('settings-sheet-body');

  function openSheet() {
    overlay.classList.add('is-open');
    requestAnimationFrame(() => sheet.classList.add('is-open'));
  }
  function closeSheet() {
    sheet.classList.remove('is-open');
    setTimeout(() => overlay.classList.remove('is-open'), 260);
  }
  sheetClose.addEventListener('click', closeSheet);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeSheet(); });

  /* ---------------- Language ---------------- */
  const languageValueEl = document.querySelector('#driver-settings-language-btn .menu-row-value');

  function renderLanguageSheet() {
    sheetTitle.textContent = 'اختر اللغة';
    sheetBody.innerHTML = LANGUAGE_OPTIONS.map((l) => `
      <button class="lang-option-row ${l.id === AppState.settings.language ? 'is-active' : ''}" data-lang="${l.id}">
        <span>${l.label}</span>
        <span class="lang-option-row-check">${l.id === AppState.settings.language ? Icon.check : ''}</span>
      </button>
    `).join('');
    sheetBody.querySelectorAll('[data-lang]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const langId = btn.getAttribute('data-lang');
        AppState.settings.language = langId;
        const meta = LANGUAGE_OPTIONS.find((l) => l.id === langId);
        if (languageValueEl) languageValueEl.textContent = meta.label;
        showToast(`تم تعيين لغة التطبيق: ${meta.label}`, 'success');
        closeSheet();
      });
    });
  }

  document.getElementById('driver-settings-language-btn').addEventListener('click', () => {
    renderLanguageSheet();
    openSheet();
  });

  /* ---------------- Dark mode ---------------- */
  const darkToggle = document.getElementById('driver-settings-darkmode-toggle');
  darkToggle.addEventListener('change', () => {
    setDarkMode(darkToggle.checked);
    showToast(AppState.settings.darkMode ? 'تم تفعيل الوضع الليلي' : 'تم إيقاف الوضع الليلي', 'info');
  });

  /* ---------------- Privacy Policy ---------------- */
  document.getElementById('driver-settings-privacy-btn').addEventListener('click', () => {
    sheetTitle.textContent = 'سياسة الخصوصية';
    sheetBody.innerHTML = `<div class="info-sheet-text">${PRIVACY_POLICY_TEXT.map((p) => `<p>${p}</p>`).join('')}</div>`;
    openSheet();
  });

  /* ---------------- Terms & Conditions ---------------- */
  document.getElementById('driver-settings-terms-btn').addEventListener('click', () => {
    sheetTitle.textContent = 'الشروط والأحكام';
    sheetBody.innerHTML = `<div class="info-sheet-text">${TERMS_CONDITIONS_TEXT.map((p) => `<p>${p}</p>`).join('')}</div>`;
    openSheet();
  });

  /* ---------------- Contact Support ---------------- */
  document.getElementById('driver-settings-support-btn').addEventListener('click', () => {
    showToast(`للتواصل مع الدعم الفني: ${APP.supportPhone}`, 'info', 4000);
    window.location.href = `tel:${APP.supportPhone}`;
  });

  /* ---------------- Logout ---------------- */
  document.getElementById('driver-settings-logout-btn').addEventListener('click', () => {
    AppState.currentUser = null;
    AppState.pendingAuth = null;
    showToast('تم تسجيل الخروج', 'info');
    Router.navigate('login', { direction: 'back' });
  });

}

/* ============================================================
   Admin module — Dashboard Home, Orders Management, Drivers Management
   ============================================================ */
function wireAdminBottomNav(activeId) {
  const nav = document.getElementById('admin-bottom-nav');
  if (!nav) return;
  nav.querySelectorAll('[data-abn]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-abn');
      if (id === activeId) return;
      Router.navigate(id, { direction: id === 'admin-home' ? 'back' : 'forward' });
    });
  });
}

function initAdminHome() {
  document.querySelectorAll('#app .admin-mini-row').forEach((row) => {
    row.addEventListener('click', () => {
      const id = row.getAttribute('data-admin-order-id');
      Router.navigate('admin-order-details', { direction: 'forward', params: { id } });
    });
  });
  document.getElementById('admin-home-settings-btn').addEventListener('click', () => {
    Router.navigate('admin-settings', { direction: 'forward' });
  });
  wireAdminBottomNav('admin-home');
}

function initAdminOrders() {
  const listEl = document.getElementById('admin-orders-list');
  const emptyEl = document.getElementById('admin-orders-empty');
  const searchInput = document.getElementById('admin-orders-search-input');
  let activeFilter = 'all';

  function applyFilters() {
    const q = searchInput.value;
    let visibleCount = 0;
    listEl.querySelectorAll('[data-admin-order-id]').forEach((row) => {
      const s = getShipmentById(row.getAttribute('data-admin-order-id'));
      const visible = s && matchesStatusFilter(s, activeFilter) && matchesSearch(s, q);
      row.classList.toggle('hidden', !visible);
      if (visible) visibleCount++;
    });
    emptyEl.classList.toggle('hidden', visibleCount !== 0);
  }

  searchInput.addEventListener('input', applyFilters);

  document.querySelectorAll('.orders-filters [data-filter]').forEach((chip) => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.orders-filters [data-filter]').forEach((c) => c.classList.remove('filter-chip-active'));
      chip.classList.add('filter-chip-active');
      activeFilter = chip.getAttribute('data-filter');
      applyFilters();
    });
  });

  listEl.querySelectorAll('[data-admin-order-id]').forEach((row) => {
    row.addEventListener('click', () => {
      const id = row.getAttribute('data-admin-order-id');
      Router.navigate('admin-order-details', { direction: 'forward', params: { id } });
    });
  });

  wireAdminBottomNav('admin-orders');
}

function initAdminOrderDetails() {
  const content = document.getElementById('admin-order-detail-content');
  const id = content.getAttribute('data-order-id');

  function renderBody() {
    const s = getShipmentById(id);
    const driver = getAdminDriverForOrder(s);
    content.innerHTML = `
      ${ShipmentDetailBody(s)}
      <div class="detail-card lt-driver-card">
        ${SectionHeading('السائق المكلّف')}
        <div class="lt-driver-row">
          <span class="lt-driver-avatar">${driver.name.split(' ').slice(0, 2).map((w) => w[0]).join('')}</span>
          <div class="lt-driver-info">
            <span class="lt-driver-name">${driver.name}</span>
            <span class="lt-driver-rating">${Icon.star}<b>${driver.rating}</b><small>(${driver.completedOrders} طلب مكتمل)</small></span>
            <span class="lt-driver-vehicle">${Icon.localTruck}<span>${driver.vehicle} • <span dir="ltr">${driver.plate}</span></span></span>
          </div>
        </div>
      </div>
    `;
    wireActions();
  }

  function wireActions() {
    const copyBtn = document.getElementById('detail-copy-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', async () => {
        try { await navigator.clipboard.writeText(id); } catch (err) { /* clipboard may be unavailable */ }
        showToast('تم نسخ رقم الشحنة', 'success');
      });
    }

    const liveTrackBtn = document.getElementById('detail-live-track-btn');
    if (liveTrackBtn) {
      liveTrackBtn.addEventListener('click', () => {
        Router.navigate('live-tracking', { direction: 'forward', params: { id, back: Router.current } });
      });
    }

    const cancelBtn = document.getElementById('detail-cancel-btn');
    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => {
        const confirmed = window.confirm('هل أنت متأكد من إلغاء هذه الشحنة؟');
        if (!confirmed) return;
        const s = getShipmentById(id);
        if (!s) return;
        s.status = 'cancelled';
        showToast('تم إلغاء الشحنة بنجاح', 'info');
        renderBody();
      });
    }

    const supportBtn = document.getElementById('detail-support-btn');
    if (supportBtn) {
      supportBtn.addEventListener('click', () => {
        showToast(`للتواصل مع الدعم الفني: ${APP.supportPhone}`, 'info', 4000);
      });
    }

    const reorderBtn = document.getElementById('detail-reorder-btn');
    if (reorderBtn) {
      reorderBtn.addEventListener('click', () => {
        Router.navigate('create-shipment', { direction: 'forward' });
      });
    }
  }

  wireActions();
}

function initAdminDrivers() {
  const listEl = document.getElementById('admin-drivers-list');
  const emptyEl = document.getElementById('admin-drivers-empty');
  const searchInput = document.getElementById('admin-drivers-search-input');
  let activeFilter = 'all';

  function applyFilters() {
    const q = searchInput.value;
    let visibleCount = 0;
    listEl.querySelectorAll('[data-admin-driver-id]').forEach((row) => {
      const d = getAdminDriverById(row.getAttribute('data-admin-driver-id'));
      const visible = d && matchesDriverStatusFilter(d, activeFilter) && matchesDriverSearch(d, q);
      row.classList.toggle('hidden', !visible);
      if (visible) visibleCount++;
    });
    emptyEl.classList.toggle('hidden', visibleCount !== 0);
  }

  searchInput.addEventListener('input', applyFilters);

  document.querySelectorAll('.orders-filters [data-filter]').forEach((chip) => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.orders-filters [data-filter]').forEach((c) => c.classList.remove('filter-chip-active'));
      chip.classList.add('filter-chip-active');
      activeFilter = chip.getAttribute('data-filter');
      applyFilters();
    });
  });

  listEl.querySelectorAll('[data-admin-driver-id]').forEach((row) => {
    row.addEventListener('click', () => {
      const id = row.getAttribute('data-admin-driver-id');
      Router.navigate('admin-driver-details', { direction: 'forward', params: { id } });
    });
  });

  wireAdminBottomNav('admin-drivers');
}

function initAdminDriverDetails() {
  const content = document.getElementById('admin-driver-detail-content');
  const id = content.getAttribute('data-driver-id');

  const msgBtn = document.getElementById('admin-driver-msg-btn');
  if (msgBtn) {
    msgBtn.addEventListener('click', () => {
      showToast('لأغراض العرض التجريبي، لا يمكن إرسال رسائل فعلية', 'info');
    });
  }

  content.querySelectorAll('[data-set-driver-status]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const newStatus = btn.getAttribute('data-set-driver-status');
      const driver = getAdminDriverById(id);
      if (!driver) return;
      driver.status = newStatus;
      if (newStatus !== 'busy') driver.activeOrders = 0;

      content.querySelectorAll('[data-set-driver-status]').forEach((c) => c.classList.remove('filter-chip-active'));
      btn.classList.add('filter-chip-active');

      const statusRow = document.getElementById('admin-driver-status-row');
      if (statusRow) {
        statusRow.setAttribute('data-current-status', newStatus);
        statusRow.innerHTML = AdminDriverStatusBadge(newStatus);
      }

      showToast('تم تحديث حالة السائق بنجاح', 'success');
    });
  });
}

/* ============================================================
   Admin module — Customers Management
   ============================================================ */
function initAdminCustomers() {
  const listEl = document.getElementById('admin-customers-list');
  const emptyEl = document.getElementById('admin-customers-empty');
  const searchInput = document.getElementById('admin-customers-search-input');
  let activeFilter = 'all';

  function applyFilters() {
    const q = searchInput.value;
    let visibleCount = 0;
    listEl.querySelectorAll('[data-admin-customer-id]').forEach((row) => {
      const c = getAdminCustomerById(row.getAttribute('data-admin-customer-id'));
      const visible = c && matchesCustomerStatusFilter(c, activeFilter) && matchesCustomerSearch(c, q);
      row.classList.toggle('hidden', !visible);
      if (visible) visibleCount++;
    });
    emptyEl.classList.toggle('hidden', visibleCount !== 0);
  }

  searchInput.addEventListener('input', applyFilters);

  document.querySelectorAll('.orders-filters [data-filter]').forEach((chip) => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.orders-filters [data-filter]').forEach((c) => c.classList.remove('filter-chip-active'));
      chip.classList.add('filter-chip-active');
      activeFilter = chip.getAttribute('data-filter');
      applyFilters();
    });
  });

  listEl.querySelectorAll('[data-admin-customer-id]').forEach((row) => {
    row.addEventListener('click', () => {
      const id = row.getAttribute('data-admin-customer-id');
      Router.navigate('admin-customer-details', { direction: 'forward', params: { id } });
    });
  });

  wireAdminBottomNav('admin-customers');
}

/* ============================================================
   Admin module — Customer Details
   ============================================================ */
function initAdminCustomerDetails() {
  const content = document.getElementById('admin-customer-detail-content');
  const id = content.getAttribute('data-customer-id');

  const msgBtn = document.getElementById('admin-customer-msg-btn');
  if (msgBtn) {
    msgBtn.addEventListener('click', () => {
      showToast('لأغراض العرض التجريبي، لا يمكن إرسال رسائل فعلية', 'info');
    });
  }

  const ordersList = document.getElementById('admin-customer-orders-list');
  if (ordersList) {
    ordersList.querySelectorAll('[data-admin-order-id]').forEach((row) => {
      row.addEventListener('click', () => {
        const orderId = row.getAttribute('data-admin-order-id');
        Router.navigate('admin-order-details', { direction: 'forward', params: { id: orderId } });
      });
    });
  }

  content.querySelectorAll('[data-set-customer-status]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const newStatus = btn.getAttribute('data-set-customer-status');
      const customer = getAdminCustomerById(id);
      if (!customer) return;
      customer.status = newStatus;

      content.querySelectorAll('[data-set-customer-status]').forEach((c) => c.classList.remove('filter-chip-active'));
      btn.classList.add('filter-chip-active');

      const statusRow = document.getElementById('admin-customer-status-row');
      if (statusRow) {
        statusRow.setAttribute('data-current-status', newStatus);
        statusRow.innerHTML = CustomerStatusBadge(newStatus);
      }

      showToast('تم تحديث حالة العميل بنجاح', 'success');
    });
  });
}

/* ============================================================
   Admin module — Reports
   ============================================================ */
function initAdminReports() {
  const exportBtn = document.getElementById('admin-reports-export-btn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      showToast('لأغراض العرض التجريبي، لا يمكن تصدير التقرير فعليًا', 'info', 3500);
    });
  }

  document.querySelectorAll('#app [data-admin-driver-id]').forEach((row) => {
    row.addEventListener('click', () => {
      const id = row.getAttribute('data-admin-driver-id');
      Router.navigate('admin-driver-details', { direction: 'forward', params: { id } });
    });
  });

  document.querySelectorAll('#app [data-admin-customer-id]').forEach((row) => {
    row.addEventListener('click', () => {
      const id = row.getAttribute('data-admin-customer-id');
      Router.navigate('admin-customer-details', { direction: 'forward', params: { id } });
    });
  });

  wireAdminBottomNav('admin-reports');
}

/* ============================================================
   Admin — Settings
   (Company Settings, Admin Profile, Security, Change Password, Logout)
   ============================================================ */
function initAdminSettings() {
  const admin = ADMIN_INFO;
  const company = COMPANY_SETTINGS;

  const avatarBox = document.getElementById('admin-settings-avatar');
  const heroName = document.getElementById('admin-settings-hero-name');
  const heroPhone = document.getElementById('admin-settings-hero-phone');
  const photoInput = document.getElementById('admin-settings-photo-input');

  const companyNameSub = document.querySelector('#admin-settings-company-name-btn .menu-row-sub');
  const companyPhoneSub = document.querySelector('#admin-settings-company-phone-btn .menu-row-sub');
  const companyEmailSub = document.querySelector('#admin-settings-company-email-btn .menu-row-sub');
  const companyAddressSub = document.querySelector('#admin-settings-company-address-btn .menu-row-sub');
  const adminNameSub = document.querySelector('#admin-settings-edit-name-btn .menu-row-sub');
  const adminPhoneSub = document.querySelector('#admin-settings-edit-phone-btn .menu-row-sub');
  const adminEmailSub = document.querySelector('#admin-settings-edit-email-btn .menu-row-sub');

  /* ---------------- Logout (shared pattern with customer/driver) ---------------- */
  document.getElementById('admin-settings-logout-btn').addEventListener('click', () => {
    AppState.currentUser = null;
    AppState.pendingAuth = null;
    showToast('تم تسجيل الخروج', 'info');
    Router.navigate('login', { direction: 'back' });
  });

  /* ---------------- Change admin photo ---------------- */
  function triggerPhotoPicker() { photoInput.click(); }
  document.getElementById('admin-settings-avatar-edit-btn').addEventListener('click', triggerPhotoPicker);
  document.getElementById('admin-settings-edit-photo-btn').addEventListener('click', triggerPhotoPicker);

  photoInput.addEventListener('change', () => {
    const file = photoInput.files && photoInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      admin.avatar = reader.result;
      avatarBox.innerHTML = ProfileAvatar(admin);
      showToast('تم تحديث الصورة الشخصية بنجاح', 'success');
    };
    reader.readAsDataURL(file);
    photoInput.value = '';
  });

  /* ---------------- Security toggles ---------------- */
  document.getElementById('admin-settings-2fa-toggle').addEventListener('change', (e) => {
    ADMIN_SECURITY.twoFactor = e.target.checked;
    showToast(ADMIN_SECURITY.twoFactor ? 'تم تفعيل التحقق بخطوتين' : 'تم إيقاف التحقق بخطوتين', ADMIN_SECURITY.twoFactor ? 'success' : 'info');
  });
  document.getElementById('admin-settings-login-alerts-toggle').addEventListener('change', (e) => {
    ADMIN_SECURITY.loginAlerts = e.target.checked;
    showToast(ADMIN_SECURITY.loginAlerts ? 'تم تفعيل تنبيهات تسجيل الدخول' : 'تم إيقاف تنبيهات تسجيل الدخول', 'info');
  });

  /* ---------------- Edit sheet: company fields / admin profile / password ---------------- */
  const overlay = document.getElementById('admin-settings-sheet-overlay');
  const sheet = document.getElementById('admin-settings-sheet');
  const sheetTitle = document.getElementById('admin-settings-sheet-title');
  const sheetClose = document.getElementById('admin-settings-sheet-close');
  const sheetConfirm = document.getElementById('admin-settings-sheet-confirm');
  const sheetConfirmLabel = document.getElementById('admin-settings-sheet-confirm-label');

  const FIELD_IDS = {
    companyName: 'admin-company-name-input',
    companyPhone: 'admin-company-phone-input',
    companyEmail: 'admin-company-email-input',
    companyAddress: 'admin-company-address-input',
    name: 'admin-name-input',
    phone: 'admin-phone-input',
    email: 'admin-email-input',
    passCurrent: 'admin-pass-current',
    passNew: 'admin-pass-new',
    passConfirm: 'admin-pass-confirm',
  };

  wirePasswordToggle('admin-pass-current', 'admin-pass-current-toggle');
  wirePasswordToggle('admin-pass-new', 'admin-pass-new-toggle');
  wirePasswordToggle('admin-pass-confirm', 'admin-pass-confirm-toggle');

  Object.values(FIELD_IDS).forEach((id) => {
    const input = document.getElementById(id);
    if (input) input.addEventListener('input', () => clearFieldError(id));
  });
  document.getElementById(FIELD_IDS.companyPhone).addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^\d]/g, '').slice(0, 11);
  });
  document.getElementById(FIELD_IDS.phone).addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^\d]/g, '').slice(0, 11);
  });

  function isValidEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  const SHEET_META = {
    'company-name': { title: 'اسم الشركة', confirmLabel: 'حفظ', fields: ['companyName'] },
    'company-phone': { title: 'رقم هاتف الشركة', confirmLabel: 'حفظ', fields: ['companyPhone'] },
    'company-email': { title: 'البريد الإلكتروني للشركة', confirmLabel: 'حفظ', fields: ['companyEmail'] },
    'company-address': { title: 'عنوان الشركة', confirmLabel: 'حفظ', fields: ['companyAddress'] },
    name: { title: 'تغيير الاسم', confirmLabel: 'حفظ الاسم', fields: ['name'] },
    phone: { title: 'تغيير رقم الهاتف', confirmLabel: 'حفظ الرقم', fields: ['phone'] },
    email: { title: 'تغيير البريد الإلكتروني', confirmLabel: 'حفظ', fields: ['email'] },
    password: { title: 'تغيير كلمة المرور', confirmLabel: 'حفظ كلمة المرور', fields: ['passCurrent', 'passNew', 'passConfirm'] },
  };

  let currentAction = null;

  function openSheet(action) {
    currentAction = action;
    const meta = SHEET_META[action];
    sheetTitle.textContent = meta.title;
    sheetConfirmLabel.textContent = meta.confirmLabel;

    Object.keys(FIELD_IDS).forEach((key) => {
      const wrap = document.querySelector(`[data-field="${FIELD_IDS[key]}"]`);
      if (wrap) wrap.classList.toggle('hidden', !meta.fields.includes(key));
    });

    clearAllErrors(sheet);
    if (action === 'company-name') document.getElementById(FIELD_IDS.companyName).value = company.name;
    if (action === 'company-phone') document.getElementById(FIELD_IDS.companyPhone).value = company.phone;
    if (action === 'company-email') document.getElementById(FIELD_IDS.companyEmail).value = company.email;
    if (action === 'company-address') document.getElementById(FIELD_IDS.companyAddress).value = company.address;
    if (action === 'name') document.getElementById(FIELD_IDS.name).value = admin.name;
    if (action === 'phone') document.getElementById(FIELD_IDS.phone).value = admin.phone;
    if (action === 'email') document.getElementById(FIELD_IDS.email).value = admin.email;
    if (action === 'password') {
      document.getElementById(FIELD_IDS.passCurrent).value = '';
      document.getElementById(FIELD_IDS.passNew).value = '';
      document.getElementById(FIELD_IDS.passConfirm).value = '';
    }

    overlay.classList.add('is-open');
    requestAnimationFrame(() => sheet.classList.add('is-open'));
  }

  function closeSheet() {
    sheet.classList.remove('is-open');
    setTimeout(() => overlay.classList.remove('is-open'), 260);
  }

  document.getElementById('admin-settings-company-name-btn').addEventListener('click', () => openSheet('company-name'));
  document.getElementById('admin-settings-company-phone-btn').addEventListener('click', () => openSheet('company-phone'));
  document.getElementById('admin-settings-company-email-btn').addEventListener('click', () => openSheet('company-email'));
  document.getElementById('admin-settings-company-address-btn').addEventListener('click', () => openSheet('company-address'));
  document.getElementById('admin-settings-edit-name-btn').addEventListener('click', () => openSheet('name'));
  document.getElementById('admin-settings-edit-phone-btn').addEventListener('click', () => openSheet('phone'));
  document.getElementById('admin-settings-edit-email-btn').addEventListener('click', () => openSheet('email'));
  document.getElementById('admin-settings-change-password-btn').addEventListener('click', () => openSheet('password'));

  sheetClose.addEventListener('click', closeSheet);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeSheet(); });

  sheetConfirm.addEventListener('click', async () => {
    clearAllErrors(sheet);
    let valid = true;

    if (currentAction === 'company-name') {
      const v = document.getElementById(FIELD_IDS.companyName).value.trim();
      if (v.length < 2) { setFieldError(FIELD_IDS.companyName, 'أدخل اسم شركة صحيح'); valid = false; }
      if (!valid) return;

      setButtonLoading('admin-settings-sheet-confirm', true);
      await fakeDelay(700);
      setButtonLoading('admin-settings-sheet-confirm', false);

      company.name = v;
      if (companyNameSub) companyNameSub.textContent = v;
      showToast('تم تحديث اسم الشركة بنجاح', 'success');
      closeSheet();
    } else if (currentAction === 'company-phone') {
      const v = document.getElementById(FIELD_IDS.companyPhone).value.trim();
      if (!isValidIraqiPhone(v)) { setFieldError(FIELD_IDS.companyPhone, 'أدخل رقم هاتف عراقي صحيح (07XXXXXXXXX)'); valid = false; }
      if (!valid) return;

      setButtonLoading('admin-settings-sheet-confirm', true);
      await fakeDelay(700);
      setButtonLoading('admin-settings-sheet-confirm', false);

      company.phone = v;
      if (companyPhoneSub) companyPhoneSub.textContent = v;
      showToast('تم تحديث رقم هاتف الشركة بنجاح', 'success');
      closeSheet();
    } else if (currentAction === 'company-email') {
      const v = document.getElementById(FIELD_IDS.companyEmail).value.trim();
      if (!isValidEmail(v)) { setFieldError(FIELD_IDS.companyEmail, 'أدخل بريداً إلكترونياً صحيحاً'); valid = false; }
      if (!valid) return;

      setButtonLoading('admin-settings-sheet-confirm', true);
      await fakeDelay(700);
      setButtonLoading('admin-settings-sheet-confirm', false);

      company.email = v;
      if (companyEmailSub) companyEmailSub.textContent = v;
      showToast('تم تحديث البريد الإلكتروني للشركة بنجاح', 'success');
      closeSheet();
    } else if (currentAction === 'company-address') {
      const v = document.getElementById(FIELD_IDS.companyAddress).value.trim();
      if (v.length < 4) { setFieldError(FIELD_IDS.companyAddress, 'أدخل عنواناً صحيحاً'); valid = false; }
      if (!valid) return;

      setButtonLoading('admin-settings-sheet-confirm', true);
      await fakeDelay(700);
      setButtonLoading('admin-settings-sheet-confirm', false);

      company.address = v;
      if (companyAddressSub) companyAddressSub.textContent = v;
      showToast('تم تحديث عنوان الشركة بنجاح', 'success');
      closeSheet();
    } else if (currentAction === 'name') {
      const v = document.getElementById(FIELD_IDS.name).value.trim();
      if (v.length < 3) { setFieldError(FIELD_IDS.name, 'أدخل اسماً صحيحاً (3 أحرف على الأقل)'); valid = false; }
      if (!valid) return;

      setButtonLoading('admin-settings-sheet-confirm', true);
      await fakeDelay(700);
      setButtonLoading('admin-settings-sheet-confirm', false);

      admin.name = v;
      heroName.textContent = v;
      if (adminNameSub) adminNameSub.textContent = v;
      showToast('تم تحديث الاسم بنجاح', 'success');
      closeSheet();
    } else if (currentAction === 'phone') {
      const v = document.getElementById(FIELD_IDS.phone).value.trim();
      if (!isValidIraqiPhone(v)) { setFieldError(FIELD_IDS.phone, 'أدخل رقم هاتف عراقي صحيح (07XXXXXXXXX)'); valid = false; }
      if (!valid) return;

      setButtonLoading('admin-settings-sheet-confirm', true);
      await fakeDelay(700);
      setButtonLoading('admin-settings-sheet-confirm', false);

      admin.phone = v;
      heroPhone.textContent = v;
      if (adminPhoneSub) adminPhoneSub.textContent = v;
      showToast('تم تحديث رقم الهاتف بنجاح', 'success');
      closeSheet();
    } else if (currentAction === 'email') {
      const v = document.getElementById(FIELD_IDS.email).value.trim();
      if (!isValidEmail(v)) { setFieldError(FIELD_IDS.email, 'أدخل بريداً إلكترونياً صحيحاً'); valid = false; }
      if (!valid) return;

      setButtonLoading('admin-settings-sheet-confirm', true);
      await fakeDelay(700);
      setButtonLoading('admin-settings-sheet-confirm', false);

      admin.email = v;
      if (adminEmailSub) adminEmailSub.textContent = v;
      showToast('تم تحديث البريد الإلكتروني بنجاح', 'success');
      closeSheet();
    } else if (currentAction === 'password') {
      const current = document.getElementById(FIELD_IDS.passCurrent).value;
      const next = document.getElementById(FIELD_IDS.passNew).value;
      const confirm = document.getElementById(FIELD_IDS.passConfirm).value;

      if (current !== admin.password) { setFieldError(FIELD_IDS.passCurrent, 'كلمة المرور الحالية غير صحيحة'); valid = false; }
      if (!next || next.length < 6) { setFieldError(FIELD_IDS.passNew, 'يجب أن تتكون من 6 أحرف على الأقل'); valid = false; }
      if (confirm !== next) { setFieldError(FIELD_IDS.passConfirm, 'كلمتا المرور غير متطابقتين'); valid = false; }
      if (!valid) return;

      setButtonLoading('admin-settings-sheet-confirm', true);
      await fakeDelay(900);
      setButtonLoading('admin-settings-sheet-confirm', false);

      admin.password = next;
      showToast('تم تغيير كلمة المرور بنجاح', 'success');
      closeSheet();
    }
  });

  wireAdminBottomNav('admin-settings');
}

/* ---------------- Dark mode (persisted via localStorage) ---------------- */
function setDarkMode(enabled) {
  AppState.settings.darkMode = enabled;
  document.documentElement.setAttribute('data-theme', enabled ? 'dark' : 'light');
  try {
    localStorage.setItem('alameen-dark-mode', enabled ? '1' : '0');
  } catch (e) {
    /* localStorage غير متاح — الإعداد يبقى فعّال لهذه الجلسة فقط */
  }
}

function initDarkModeFromStorage() {
  let saved = null;
  try {
    saved = localStorage.getItem('alameen-dark-mode');
  } catch (e) {
    saved = null;
  }
  const enabled = saved === '1';
  setDarkMode(enabled);
}

/* ---------------- Boot ---------------- */
initDarkModeFromStorage();
document.addEventListener('DOMContentLoaded', () => {
  const token = Api.getToken();

  // ما فيه توكن محفوظ (أول مرة يفتح الزبون التطبيق) → المسار العادي: splash
  if (!token) {
    Router.init('splash');
    return;
  }

  // فيه توكن محفوظ → نتحقق منه بالسيرفر قبل ما نقرر أي شاشة نفتح،
  // حتى ما يضطر الزبون يسجل دخول من جديد كل مرة يفتح التطبيق.
  Api.auth.me().then((res) => {
    if (res.ok) {
      // التوكن صحيح ولسا فعّال → ندخله على طول للصفحة الرئيسية
      AppState.currentUser = res.user;
      syncAllFromServer().catch(() => {});
      Router.init('home');
    } else if (res.offline) {
      // تعذر الوصول للسيرفر (لا يوجد إنترنت) → نخليه يدخل بنفس الجلسة المحفوظة بدل ما نرجعه لتسجيل الدخول
      Router.init('home');
    } else {
      // التوكن منتهي أو غير صالح فعلاً → نمسحه ونرجعه لتسجيل الدخول
      Api.setToken(null);
      Router.init('splash');
    }
  }).catch(() => {
    Router.init('home');
  });
});
