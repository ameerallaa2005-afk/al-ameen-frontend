/* ============================================================
   data.js — Fake local "database" and static content.
   No network calls. Everything lives in memory / localStorage.
   ============================================================ */

const APP = {
  name: 'الأمين للتوصيل',
  tagline: 'نوصل طلبك بأمان وسرعة',
  // رابط الباك-إند الذي يرسل ويتحقق من رمز OTP عبر واتساب (server.js)
  otpApiBase: 'https://al-ameen-otp.bonto.run',
  supportPhone: '07801234567',
  version: '1.4.0',
};

/* Pre-seeded "existing" accounts so the login demo can succeed
   or fail realistically.
   status: 'pending' | 'active' | 'rejected' — new registrations start
   as 'pending' and require admin approval before they can log in. */
const FAKE_USERS = [
  { id: 'u1', phone: '07701234567', password: '123456', name: 'أحمد الكناني', city: 'بغداد', avatar: null, status: 'active', verifiedBy: 'admin', verifiedAt: '2026-06-01T09:00:00', rejectionReason: null },
  { id: 'u2', phone: '07901112233', password: 'ameen123', name: 'زينب العزاوي', city: 'البصرة', avatar: null, status: 'active', verifiedBy: 'admin', verifiedAt: '2026-06-02T10:00:00', rejectionReason: null },
  { id: 'u3', phone: '07501239876', password: 'password', name: 'مصطفى الجبوري', city: 'أربيل', avatar: null, status: 'active', verifiedBy: 'admin', verifiedAt: '2026-06-03T11:00:00', rejectionReason: null },
];

/* Utility: set a customer account's review status (used by the admin
   approval workflow — no UI wired to this yet, kept for future use). */
function setCustomerAccountStatus(phone, status, { verifiedBy = null, rejectionReason = null } = {}) {
  const user = findUserByPhone(phone);
  if (!user) return null;
  user.status = status;
  user.verifiedBy = status === 'pending' ? null : verifiedBy;
  user.verifiedAt = status === 'pending' ? null : new Date().toISOString();
  user.rejectionReason = status === 'rejected' ? rejectionReason : null;
  return user;
}

/* Language options for the Settings screen (display only — demo app stays in Arabic) */
const LANGUAGE_OPTIONS = [
  { id: 'ar', label: 'العربية' },
  { id: 'en', label: 'English' },
];

const IRAQI_CITIES = [
  'بغداد', 'البصرة', 'الموصل', 'أربيل', 'النجف', 'كربلاء',
  'السليمانية', 'الأنبار', 'ديالى', 'كركوك', 'ذي قار',
  'بابل', 'واسط', 'ميسان', 'دهوك', 'صلاح الدين', 'القادسية', 'المثنى',
];

const ONBOARDING_SLIDES = [
  {
    id: 1,
    eyebrow: 'توصيل سريع',
    title: 'شحناتك توصل بأمان لأي مكان',
    desc: 'نغطي جميع محافظات العراق بأسطول شاحنات حديث وسائقين موثوقين لضمان وصول طلبك بالوقت المحدد.',
    art: 'truck',
  },
  {
    id: 2,
    eyebrow: 'تتبع لحظي',
    title: 'تابع شحنتك خطوة بخطوة',
    desc: 'اعرف مكان شحنتك بالضبط من لحظة الاستلام حتى التسليم، مع إشعارات فورية عند كل تحديث.',
    art: 'tracking',
  },
  {
    id: 3,
    eyebrow: 'دفع وأمان',
    title: 'ادفع بسهولة واستلم بثقة',
    desc: 'طرق دفع متعددة وحماية كاملة لشحناتك حتى لحظة التسليم، مع دعم فني متوفر على مدار الساعة.',
    art: 'secure',
  },
];

/* Simple in-memory "session" for the demo — resets on reload. */
const AppState = {
  onboardingSeen: false,
  pendingAuth: null, // { mode: 'login'|'register', phone, name, ... }
  currentUser: null,
  settings: { language: 'ar', darkMode: false },
};

/* Utility: fake network delay */
function fakeDelay(ms = 1100) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/* Utility: normalize + validate an Iraqi mobile number
   Accepts 07XXXXXXXXX (11 digits, starts with 07) */
function isValidIraqiPhone(phone) {
  const cleaned = phone.replace(/[^\d]/g, '');
  return /^07\d{9}$/.test(cleaned);
}

function findUserByPhone(phone) {
  const cleaned = phone.replace(/[^\d]/g, '');
  return FAKE_USERS.find((u) => u.phone === cleaned);
}

/* ============================================================
   Home page content
   ============================================================ */
const HOME_SERVICES = [
  { id: 'intl', title: 'الشحن الدولي', desc: 'شحن إلى جميع دول العالم بأفضل الأسعار', icon: 'globe' },
  { id: 'air', title: 'الشحن الجوي', desc: 'شحن سريع وآمن للبضائع والطرود', icon: 'plane' },
  { id: 'sea', title: 'الشحن البحري', desc: 'شحن بحري اقتصادي للبضائع الكبيرة', icon: 'ship' },
  { id: 'local', title: 'الشحن المحلي', desc: 'توصيل سريع داخل جميع محافظات العراق', icon: 'localTruck' },
  { id: 'storage', title: 'التخزين والتغليف', desc: 'خدمات تخزين وتغليف آمنة بأعلى معايير الجودة', icon: 'box' },
];

/* Premium photography for service cards (falls back to icon tile when absent) */
const SERVICE_IMAGES = {
  local: 'assets/services/local.jpg',
  air: 'assets/services/air.jpg',
  sea: 'assets/services/sea.jpg',
  storage: 'assets/services/storage.jpg',
};

const HOME_ADVANTAGES = [
  { id: 'support', title: 'دعم 24/7', desc: 'خدمة عملاء على مدار الساعة', icon: 'headset' },
  { id: 'secure', title: 'أمان كامل', desc: 'حماية شحناتك حتى التسليم', icon: 'shieldCheck' },
  { id: 'fast', title: 'توصيل سريع', desc: 'التزام بالمواعيد في كل الأوقات', icon: 'bolt' },
  { id: 'price', title: 'أسعار تنافسية', desc: 'أفضل الأسعار بأفضل جودة', icon: 'tag' },
];

const HOME_STATS = [
  { id: 'shipments', value: 52000, suffix: '+', label: 'شحنة تم توصيلها' },
  { id: 'clients', value: 15400, suffix: '+', label: 'عميل راضٍ' },
  { id: 'cities', value: 18, suffix: '', label: 'محافظة مغطاة' },
  { id: 'drivers', value: 340, suffix: '+', label: 'سائق وموزع' },
];

const HOME_PARTNERS = [
  'مجموعة الفرات التجارية',
  'شركة دجلة للصناعات',
  'مصفى بغداد',
  'أسواق النخيل',
  'شركة الرافدين للنقل',
  'مجموعة سومر التجارية',
];

const HOME_OFFER = {
  title: 'خصم 20% على أول شحنة',
  code: 'AMEEN20',
};

const HOME_NOTIFICATIONS = [
  { id: 'n1', title: 'تم استلام شحنتك', desc: 'الشحنة #AM-2291 وصلت مركز الفرز في بغداد', time: 'قبل 10 دقائق', unread: true },
  { id: 'n2', title: 'خصم خاص لك', desc: 'استخدم كود AMEEN20 واحصل على خصم 20%', time: 'قبل ساعتين', unread: true },
  { id: 'n3', title: 'الشحنة في الطريق', desc: 'الشحنة #AM-2178 خرجت للتوصيل', time: 'أمس', unread: true },
];

/* ============================================================
   Notifications page — full notification center
   (HOME_NOTIFICATIONS above stays as-is for the small bell dropdown;
   this is the larger dataset for the standalone Notifications page)
   ============================================================ */
const NOTIFICATIONS_FULL = [
  { id: 'nf1', category: 'shipment', icon: 'box', title: 'تم استلام شحنتك', desc: 'الشحنة #AM-2291 وصلت مركز الفرز في بغداد وجارٍ تجهيزها للشحن', time: 'قبل 6 دقائق', unread: true, action: { type: 'track', id: 'AM-2291' } },
  { id: 'nf2', category: 'wallet', icon: 'wallet', title: 'إيداع ناجح في محفظتك', desc: 'تم إيداع 50,000 د.ع في محفظتك بنجاح', time: 'قبل 22 دقيقة', unread: true, action: { type: 'wallet' } },
  { id: 'nf3', category: 'delivery', icon: 'localTruck', title: 'الشحنة في الطريق', desc: 'الشحنة #AM-2178 خرجت للتوصيل، الوصول المتوقع خلال 30-45 دقيقة', time: 'قبل ساعة', unread: true, action: { type: 'track', id: 'AM-2178' } },
  { id: 'nf4', category: 'offer', icon: 'gift', title: 'خصم خاص لك 🎉', desc: 'استخدم كود AMEEN20 واحصل على خصم 20% على شحنتك القادمة', time: 'قبل ساعتين', unread: true, action: { type: 'offer', code: 'AMEEN20' } },
  { id: 'nf5', category: 'delivered', icon: 'checkCircle', title: 'تم تسليم شحنتك بنجاح', desc: 'الشحنة #AM-1042 تم تسليمها للمستلم في أربيل', time: 'قبل 3 ساعات', unread: true, action: { type: 'track', id: 'AM-1042' } },
  { id: 'nf6', category: 'system', icon: 'shieldCheck', title: 'تم تحديث سياسة الخصوصية', desc: 'قمنا بتحديث سياسة الخصوصية وشروط الاستخدام الخاصة بالتطبيق', time: 'قبل 5 ساعات', unread: false, action: { type: 'none' } },
  { id: 'nf7', category: 'driver', icon: 'user', title: 'تم تعيين سائق لشحنتك', desc: 'السائق كريم عبد الرزاق في طريقه لاستلام الشحنة #AM-2291', time: 'أمس', unread: false, action: { type: 'track', id: 'AM-2291' } },
  { id: 'nf8', category: 'wallet', icon: 'wallet', title: 'عملية سحب من المحفظة', desc: 'تم سحب 30,000 د.ع من محفظتك إلى حسابك البنكي', time: 'أمس', unread: false, action: { type: 'wallet' } },
  { id: 'nf9', category: 'rating', icon: 'star', title: 'قيّم تجربتك معنا', desc: 'كيف كانت تجربتك مع آخر شحنة؟ رأيك يهمنا لتحسين خدماتنا', time: 'قبل يومين', unread: false, action: { type: 'none' } },
  { id: 'nf10', category: 'shipment', icon: 'box', title: 'تم تأكيد طلب الشحن', desc: 'تم تأكيد طلبك وسيتم تعيين سائق خلال وقت قصير', time: 'قبل يومين', unread: false, action: { type: 'none' } },
  { id: 'nf11', category: 'offer', icon: 'tag', title: 'عروض نهاية الأسبوع', desc: 'خصومات تصل إلى 15% على الشحن الدولي طوال عطلة نهاية الأسبوع', time: 'قبل 3 أيام', unread: false, action: { type: 'none' } },
  { id: 'nf12', category: 'support', icon: 'headset', title: 'تم الرد على تذكرة الدعم', desc: 'قام فريق الدعم الفني بالرد على استفسارك بخصوص شحنة #AM-2178', time: 'قبل 3 أيام', unread: false, action: { type: 'track', id: 'AM-2178' } },
  { id: 'nf13', category: 'delivery', icon: 'localTruck', title: 'تأخر بسيط في التوصيل', desc: 'نعتذر عن تأخر شحنتك #AM-2178 بسبب ازدحام مروري، سيتم التوصيل قريباً', time: 'قبل 4 أيام', unread: false, action: { type: 'track', id: 'AM-2178' } },
  { id: 'nf14', category: 'wallet', icon: 'wallet', title: 'تحويل رصيد ناجح', desc: 'تم تحويل 15,000 د.ع إلى محفظة زينب العزاوي', time: 'قبل 4 أيام', unread: false, action: { type: 'wallet' } },
  { id: 'nf15', category: 'system', icon: 'info', title: 'صيانة مجدولة للتطبيق', desc: 'سيتم إجراء صيانة دورية للتطبيق يوم الجمعة من 2-4 صباحاً', time: 'قبل 5 أيام', unread: false, action: { type: 'none' } },
  { id: 'nf16', category: 'delivered', icon: 'checkCircle', title: 'تم تسليم شحنتك بنجاح', desc: 'الشحنة #AM-1988 تم تسليمها للمستلم في البصرة', time: 'قبل أسبوع', unread: false, action: { type: 'none' } },
  { id: 'nf17', category: 'offer', icon: 'gift', title: 'كود خصم جديد بانتظارك', desc: 'احصل على شحن مجاني لأول طلب هذا الشهر باستخدام كود FREESHIP', time: 'قبل أسبوع', unread: false, action: { type: 'offer', code: 'FREESHIP' } },
  { id: 'nf18', category: 'driver', icon: 'star', title: 'تقييم رائع من السائق', desc: 'شكراً لتعاونك! حصلت شحنتك على تقييم 5 نجوم من السائق', time: 'قبل أسبوع', unread: false, action: { type: 'none' } },
  { id: 'nf19', category: 'shipment', icon: 'alert', title: 'يرجى تأكيد عنوان التسليم', desc: 'تعذر الوصول للعنوان المسجل للشحنة #AM-1042، يرجى مراجعة العنوان', time: 'قبل 9 أيام', unread: false, action: { type: 'track', id: 'AM-1042' } },
  { id: 'nf20', category: 'wallet', icon: 'wallet', title: 'رصيد المحفظة منخفض', desc: 'رصيد محفظتك أقل من 20,000 د.ع، قم بالإيداع لمتابعة الشحن بسهولة', time: 'قبل 10 أيام', unread: false, action: { type: 'wallet' } },
  { id: 'nf21', category: 'system', icon: 'shieldCheck', title: 'تسجيل دخول جديد لحسابك', desc: 'تم تسجيل الدخول إلى حسابك من جهاز جديد، إذا لم يكن أنت تواصل مع الدعم', time: 'قبل 12 يوم', unread: false, action: { type: 'none' } },
  { id: 'nf22', category: 'offer', icon: 'tag', title: 'برنامج الولاء متاح الآن', desc: 'اجمع نقاط مع كل شحنة واستبدلها بخصومات حصرية', time: 'قبل أسبوعين', unread: false, action: { type: 'none' } },
  { id: 'nf23', category: 'support', icon: 'headset', title: 'استطلاع رأي سريع', desc: 'شاركنا رأيك بتجربتك مع تطبيق الأمين للتوصيل خلال دقيقة واحدة', time: 'قبل 3 أسابيع', unread: false, action: { type: 'none' } },
  { id: 'nf24', category: 'delivered', icon: 'checkCircle', title: 'مرحباً بك في الأمين للتوصيل', desc: 'شكراً لانضمامك إلينا! استمتع بخصم 20% على أول شحنة لك', time: 'قبل شهر', unread: false, action: { type: 'offer', code: 'AMEEN20' } },
];

const NOTIF_CATEGORY_TONE = {
  shipment: 'primary', delivery: 'primary', delivered: 'success', wallet: 'primary',
  offer: 'warning', system: 'gray', driver: 'primary', rating: 'warning', support: 'primary',
};
function getNotifTone(category) {
  return NOTIF_CATEGORY_TONE[category] || 'primary';
}

/* ============================================================
   Wallet module
   Fake in-memory wallet balance + transaction history.
   ============================================================ */
const WalletAccount = {
  balance: 245500,
  number: 'AMN-4471-0192',
};

const WALLET_TRANSACTIONS = [
  { id: 'w1', type: 'deposit', title: 'إيداع رصيد', desc: 'إيداع عبر زين كاش', amount: 50000, date: '2026-08-06T09:10:00', status: 'completed' },
  { id: 'w2', type: 'payment', title: 'دفع أجور شحنة', desc: 'شحنة #AM-2291', amount: -12000, date: '2026-08-05T18:32:00', status: 'completed' },
  { id: 'w3', type: 'transfer_out', title: 'تحويل إلى زينب العزاوي', desc: 'تحويل بين المحافظ', amount: -15000, date: '2026-08-05T14:05:00', status: 'completed' },
  { id: 'w4', type: 'withdraw', title: 'سحب إلى حساب بنكي', desc: 'مصرف الرافدين •• 4821', amount: -30000, date: '2026-08-04T11:47:00', status: 'completed' },
  { id: 'w5', type: 'deposit', title: 'إيداع رصيد', desc: 'إيداع عبر ماستركارد', amount: 100000, date: '2026-08-03T20:15:00', status: 'completed' },
  { id: 'w6', type: 'payment', title: 'دفع أجور شحنة', desc: 'شحنة #AM-2178', amount: -18500, date: '2026-08-02T16:40:00', status: 'completed' },
  { id: 'w7', type: 'transfer_in', title: 'تحويل من مصطفى الجبوري', desc: 'تحويل بين المحافظ', amount: 25000, date: '2026-08-01T10:22:00', status: 'completed' },
  { id: 'w8', type: 'withdraw', title: 'سحب إلى حساب بنكي', desc: 'مصرف الرافدين •• 4821', amount: -20000, date: '2026-07-30T13:00:00', status: 'pending' },
  { id: 'w9', type: 'deposit', title: 'إيداع رصيد', desc: 'إيداع عبر آسيا حوالة', amount: 40000, date: '2026-07-28T08:55:00', status: 'completed' },
  { id: 'w10', type: 'payment', title: 'دفع أجور شحنة', desc: 'شحنة #AM-1042', amount: -9000, date: '2026-07-26T15:30:00', status: 'completed' },
  { id: 'w11', type: 'transfer_out', title: 'تحويل إلى حيدر صالح', desc: 'تحويل بين المحافظ', amount: -10000, date: '2026-07-24T12:18:00', status: 'failed' },
  { id: 'w12', type: 'deposit', title: 'إيداع رصيد', desc: 'إيداع عبر زين كاش', amount: 60000, date: '2026-07-20T09:44:00', status: 'completed' },
  { id: 'w13', type: 'payment', title: 'دفع أجور شحنة', desc: 'شحنة #AM-1988', amount: -14200, date: '2026-07-18T17:05:00', status: 'completed' },
  { id: 'w14', type: 'withdraw', title: 'سحب إلى حساب بنكي', desc: 'مصرف بغداد •• 2290', amount: -25000, date: '2026-07-15T11:12:00', status: 'completed' },
  { id: 'w15', type: 'deposit', title: 'مكافأة الإحالة', desc: 'دعوة صديق للتطبيق', amount: 15000, date: '2026-07-10T19:00:00', status: 'completed' },
];
let walletTxSeq = WALLET_TRANSACTIONS.length;

const WALLET_TX_META = {
  deposit: { label: 'إيداع', icon: 'plus', tone: 'success' },
  withdraw: { label: 'سحب', icon: 'wallet', tone: 'danger' },
  transfer_out: { label: 'تحويل صادر', icon: 'route', tone: 'danger' },
  transfer_in: { label: 'تحويل وارد', icon: 'route', tone: 'success' },
  payment: { label: 'دفع شحنة', icon: 'box', tone: 'gray' },
};
function getWalletTxMeta(type) {
  return WALLET_TX_META[type] || WALLET_TX_META.payment;
}

function formatWalletTime(iso) {
  const d = new Date(iso);
  const hh = d.getHours();
  const mm = String(d.getMinutes()).padStart(2, '0');
  const period = hh >= 12 ? 'م' : 'ص';
  const h12 = hh % 12 === 0 ? 12 : hh % 12;
  return `${h12}:${mm} ${period} - ${formatShortDate(d)}`;
}

/* Adds a new transaction to the top of the list and updates the balance. */
function addWalletTransaction({ type, title, desc, amount }) {
  walletTxSeq += 1;
  const record = {
    id: 'w_new_' + walletTxSeq,
    type,
    title,
    desc,
    amount,
    date: new Date().toISOString(),
    status: 'completed',
  };
  WALLET_TRANSACTIONS.unshift(record);
  WalletAccount.balance += amount;
  return record;
}

/* Fake tracking database for the demo */
const FAKE_SHIPMENTS = {
  'AM-2291': { status: 'في مركز الفرز', city: 'بغداد', step: 2 },
  'AM-2178': { status: 'خرجت للتوصيل', city: 'البصرة', step: 3 },
  'AM-1042': { status: 'تم التسليم', city: 'أربيل', step: 4 },
};

/* ============================================================
   Orders / Shipments module
   Fake in-memory "database" of shipments used by My Orders,
   Order Details, Create Shipment, Shipment Details and
   Shipment History screens.
   ============================================================ */

const SHIPMENT_STATUSES = [
  { id: 'pending', label: 'قيد الانتظار', tone: 'gray', icon: 'clock' },
  { id: 'confirmed', label: 'تم التأكيد', tone: 'primary', icon: 'checkCircle' },
  { id: 'assigned', label: 'تعيين السائق', tone: 'primary', icon: 'user' },
  { id: 'picked_up', label: 'تم الاستلام', tone: 'primary', icon: 'box' },
  { id: 'in_transit', label: 'في الطريق', tone: 'primary', icon: 'localTruck' },
  { id: 'out_for_delivery', label: 'خرجت للتوصيل', tone: 'primary', icon: 'mapPinLine' },
  { id: 'delivered', label: 'تم التسليم', tone: 'success', icon: 'checkCircle' },
  { id: 'cancelled', label: 'ملغاة', tone: 'danger', icon: 'close' },
];

/* Ordered sequence used to draw the progress timeline (cancelled is shown separately) */
const SHIPMENT_TIMELINE_ORDER = ['pending', 'confirmed', 'assigned', 'picked_up', 'in_transit', 'out_for_delivery', 'delivered'];

function getStatusMeta(id) {
  return SHIPMENT_STATUSES.find((s) => s.id === id) || SHIPMENT_STATUSES[0];
}

const PAYMENT_METHODS = ['نقدي عند الاستلام', 'دفع إلكتروني', 'تحويل بنكي', 'محفظة إلكترونية'];

const ORDER_FILTERS = [
  { id: 'all', label: 'الكل' },
  { id: 'active', label: 'قيد التنفيذ' },
  { id: 'delivered', label: 'تم التسليم' },
  { id: 'cancelled', label: 'ملغاة' },
];

const SHIPMENT_PEOPLE = [
  'أحمد الكناني', 'زينب العزاوي', 'مصطفى الجبوري', 'نور الدين حسين', 'رقية عبد الله',
  'حيدر صالح', 'مريم كاظم', 'علي حسين محمد', 'فاطمة عادل', 'حسين علاء الدين',
  'سارة قاسم', 'يوسف طارق', 'دعاء ناصر', 'كرار سالم', 'إيمان فاضل',
  'عمر شاكر', 'رغد ماجد', 'باقر جواد', 'هبة سامي', 'وسام رحيم',
  'ياسمين عدنان', 'ثائر خالد', 'شيماء منير', 'أنمار فؤاد',
];

const IRAQI_DISTRICTS = [
  'المنصور', 'الكرادة', 'زيونة', 'الجادرية', 'حي الجامعة', 'باب المعظم',
  'شارع فلسطين', 'الحرية', 'الدورة', 'العامرية', 'اليرموك', 'الشعب',
  'حي الأندلس', 'المثنى', 'المعقل', 'الجزائر',
];

const AR_MONTHS = ['كانون الثاني', 'شباط', 'آذار', 'نيسان', 'أيار', 'حزيران', 'تموز', 'آب', 'أيلول', 'تشرين الأول', 'تشرين الثاني', 'كانون الأول'];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomPhone() {
  const prefixes = ['7701', '7801', '7901', '7501', '7702', '7902'];
  return '0' + randomItem(prefixes) + String(randomInt(0, 999999)).padStart(6, '0');
}
function randomPastDate(daysBack = 70) {
  const d = new Date();
  d.setDate(d.getDate() - randomInt(0, daysBack));
  d.setHours(randomInt(8, 20), randomInt(0, 59), 0, 0);
  return d;
}

/* ---------------- Formatting helpers ---------------- */
function formatPrice(n) {
  return Number(n).toLocaleString('en-US') + ' د.ع';
}
function formatWeight(n) {
  return Number(n).toLocaleString('en-US') + ' كغم';
}
function formatShortDate(iso) {
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  return `${dd}/${mm}/${d.getFullYear()}`;
}
function formatLongDate(iso) {
  const d = new Date(iso);
  return `${d.getDate()} ${AR_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

/* ---------------- Shipment factory ---------------- */
function buildShipment(seq) {
  const trackingNumber = 'AM-' + (4000 + seq);
  const status = SHIPMENT_STATUSES[seq % SHIPMENT_STATUSES.length].id;
  const senderCity = randomItem(IRAQI_CITIES);
  const receiverCity = randomItem(IRAQI_CITIES);
  const sender = { name: randomItem(SHIPMENT_PEOPLE), phone: randomPhone(), city: senderCity };
  const receiver = { name: randomItem(SHIPMENT_PEOPLE), phone: randomPhone(), city: receiverCity };
  const weight = randomInt(5, 400) / 10;
  const price = randomInt(15, 250) * 1000;
  const date = randomPastDate(70);
  return {
    id: trackingNumber,
    trackingNumber,
    sender,
    receiver,
    pickupAddress: `${randomItem(IRAQI_DISTRICTS)}, ${sender.city}`,
    deliveryAddress: `${randomItem(IRAQI_DISTRICTS)}, ${receiver.city}`,
    date: date.toISOString(),
    price,
    weight,
    paymentMethod: randomItem(PAYMENT_METHODS),
    status,
  };
}

const SHIPMENTS = [];
for (let i = 0; i < 34; i++) {
  SHIPMENTS.push(buildShipment(i));
}
SHIPMENTS.sort((a, b) => new Date(b.date) - new Date(a.date));

let shipmentSeqCounter = SHIPMENTS.length;
function generateTrackingNumber() {
  shipmentSeqCounter += 1;
  return 'AM-' + (5000 + shipmentSeqCounter);
}

function getShipmentById(id) {
  return SHIPMENTS.find((s) => s.id === id || s.trackingNumber === id);
}

function createShipmentRecord(data) {
  const trackingNumber = generateTrackingNumber();
  const record = {
    id: trackingNumber,
    trackingNumber,
    sender: data.sender,
    receiver: data.receiver,
    pickupAddress: data.pickupAddress,
    deliveryAddress: data.deliveryAddress,
    date: new Date().toISOString(),
    price: data.price,
    weight: data.weight,
    paymentMethod: data.paymentMethod,
    status: 'pending',
  };
  SHIPMENTS.unshift(record);
  return record;
}

function matchesStatusFilter(shipment, filterId) {
  if (!filterId || filterId === 'all') return true;
  if (filterId === 'delivered') return shipment.status === 'delivered';
  if (filterId === 'cancelled') return shipment.status === 'cancelled';
  if (filterId === 'active') return shipment.status !== 'delivered' && shipment.status !== 'cancelled';
  return true;
}
function matchesSearch(shipment, query) {
  if (!query) return true;
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return (
    shipment.trackingNumber.toLowerCase().includes(q) ||
    shipment.sender.name.toLowerCase().includes(q) ||
    shipment.receiver.name.toLowerCase().includes(q)
  );
}
function groupShipmentsByMonth(list) {
  const groups = {};
  list.forEach((s) => {
    const d = new Date(s.date);
    const key = `${AR_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(s);
  });
  return groups;
}

/* ============================================================
   Live Tracking module
   Fake driver directory + ETA/timeline helpers used by the
   Track and Live Tracking screens.
   ============================================================ */

const DRIVER_NAMES = [
  'كريم عبد الرزاق', 'سلام فاضل', 'عدنان طالب', 'رعد كامل', 'ستار جبار',
  'فراس ماهر', 'ليث عبد الكريم', 'ثامر جميل', 'وليد ناجي', 'عقيل صادق',
];
const DRIVER_VEHICLES = [
  'كيا بونجو أبيض', 'هيونداي بورتر أزرق', 'فوتون أبيض', 'إيسوزو النترا فضي', 'تويوتا هايلوكس أبيض',
];

const driverCache = {};
function getDriverForShipment(shipment) {
  if (!shipment) return null;
  if (driverCache[shipment.id]) return driverCache[shipment.id];
  const gov = randomItem(IRAQI_CITIES);
  const driver = {
    name: randomItem(DRIVER_NAMES),
    phone: randomPhone(),
    vehicle: randomItem(DRIVER_VEHICLES),
    plate: `${gov} ${randomInt(10000, 89999)}`,
    rating: (randomInt(42, 50) / 10).toFixed(1),
    trips: randomInt(180, 2400),
  };
  driverCache[shipment.id] = driver;
  return driver;
}

/* Bridge: the Home tracking widget uses a tiny FAKE_SHIPMENTS map
   (id -> {status, city, step}). Live Tracking needs a full shipment
   record, so this builds (and caches into SHIPMENTS) one on demand,
   without touching any existing records. */
function ensureShipmentRecord(trackingNumber) {
  const code = (trackingNumber || '').trim().toUpperCase();
  if (!code) return null;
  const existing = getShipmentById(code);
  if (existing) return existing;

  const meta = FAKE_SHIPMENTS[code];
  if (!meta) return null;

  const statusIdByStep = ['pending', 'picked_up', 'in_transit', 'out_for_delivery', 'delivered'];
  const status = statusIdByStep[meta.step] || 'in_transit';
  const sender = { name: randomItem(SHIPMENT_PEOPLE), phone: randomPhone(), city: randomItem(IRAQI_CITIES) };
  const receiver = { name: randomItem(SHIPMENT_PEOPLE), phone: randomPhone(), city: meta.city };
  const record = {
    id: code,
    trackingNumber: code,
    sender,
    receiver,
    pickupAddress: `${randomItem(IRAQI_DISTRICTS)}, ${sender.city}`,
    deliveryAddress: `${randomItem(IRAQI_DISTRICTS)}, ${receiver.city}`,
    date: randomPastDate(3).toISOString(),
    price: randomInt(15, 250) * 1000,
    weight: randomInt(5, 400) / 10,
    paymentMethod: randomItem(PAYMENT_METHODS),
    status,
  };
  SHIPMENTS.unshift(record);
  return record;
}

/* Unified lookup used by the Track screen search box: checks the
   real shipment database first, then falls back to the fake demo IDs. */
function findTrackableShipment(query) {
  if (!query) return null;
  const code = query.trim().toUpperCase();
  return getShipmentById(code) || ensureShipmentRecord(code);
}

const ETA_TEXT = {
  pending: 'بانتظار تأكيد الطلب',
  confirmed: 'سيتم تعيين السائق قريباً',
  assigned: 'السائق في طريقه لاستلام الشحنة',
  picked_up: 'تم استلام الشحنة، جارٍ التجهيز للشحن',
  in_transit: 'الوصول المتوقع خلال 3-5 ساعات',
  out_for_delivery: 'الوصول المتوقع خلال 30-45 دقيقة',
  delivered: 'تم تسليم الشحنة بنجاح',
  cancelled: 'تم إلغاء هذه الشحنة',
};
function getEtaText(status) {
  return ETA_TEXT[status] || '';
}

/* Progress percentage across the timeline (0-100) */
function getProgressPercent(status) {
  if (status === 'cancelled') return 0;
  const idx = SHIPMENT_TIMELINE_ORDER.indexOf(status);
  if (idx < 0) return 0;
  return Math.round((idx / (SHIPMENT_TIMELINE_ORDER.length - 1)) * 100);
}

/* Build vertical timeline events with fake timestamps for completed/active steps */
function buildTimelineEvents(shipment) {
  const timelineIdx = SHIPMENT_TIMELINE_ORDER.indexOf(shipment.status);
  const base = new Date(shipment.date);
  return SHIPMENT_TIMELINE_ORDER.map((id, i) => {
    const meta = getStatusMeta(id);
    let state = 'upcoming';
    if (i < timelineIdx) state = 'done';
    else if (i === timelineIdx) state = 'active';
    let time = null;
    if (state !== 'upcoming') {
      time = new Date(base.getTime() + i * 55 * 60000);
    }
    return { id, label: meta.label, icon: meta.icon, state, time };
  });
}
function formatEventTime(d) {
  if (!d) return '';
  const hh = d.getHours();
  const mm = String(d.getMinutes()).padStart(2, '0');
  const period = hh >= 12 ? 'م' : 'ص';
  const h12 = hh % 12 === 0 ? 12 : hh % 12;
  return `${h12}:${mm} ${period} - ${formatShortDate(d)}`;
}

/* ============================================================
   Profile / Settings — static content
   ============================================================ */
const PRIVACY_POLICY_TEXT = [
  `نحن في ${APP.name} نحرص على حماية بياناتك الشخصية ونستخدمها فقط لتقديم وتحسين خدمات الشحن والتوصيل التي نوفرها لك.`,
  'نقوم بجمع بيانات مثل الاسم ورقم الهاتف والعنوان بهدف إتمام عمليات الشحن والتواصل معك بخصوص حالة طلباتك، ولا نشارك هذه البيانات مع أي جهة خارجية دون إذنك.',
  'يتم تخزين بياناتك بطرق آمنة، ويحق لك في أي وقت طلب الاطلاع على بياناتك أو تعديلها أو حذفها من خلال التواصل مع فريق الدعم الفني.',
];

const TERMS_CONDITIONS_TEXT = [
  `باستخدامك لتطبيق ${APP.name} فإنك توافق على الشروط والأحكام الموضحة هنا، والتي تنظم العلاقة بينك وبين الشركة أثناء استخدام خدمات الشحن والتوصيل.`,
  'يلتزم المستخدم بتقديم بيانات صحيحة عند إنشاء الشحنات، ويتحمل مسؤولية دقة عناوين الاستلام والتسليم وأرقام التواصل الخاصة بالمرسل والمستلم.',
  'تحتفظ الشركة بحق تعديل الأسعار وأوقات التوصيل بما يتناسب مع طبيعة كل شحنة، مع إشعار المستخدم بأي تحديثات تخص طلباته الحالية.',
];

/* ============================================================
   Driver module — orders + actions for the driver-facing screens
   (Driver Home, New Orders, Active Orders, Completed Orders).
   Builds on the same fake-data helpers used by the Orders module.
   ============================================================ */

const DRIVER_INFO = {
  name: 'سامر يوسف',
  phone: '07711234567',
  password: '123456',
  city: 'بغداد',
  vehicle: 'كيا بونجو أبيض',
  plate: 'بغداد 33421',
  rating: 4.9,
  trips: 1240,
  avatar: null,
  joinDate: '2023-02-14',
};

const DRIVER_ORDER_ITEMS = [
  'مستندات وأوراق رسمية', 'قطع غيار سيارات', 'ملابس وأحذية', 'أجهزة كهربائية صغيرة',
  'أدوات منزلية', 'مواد غذائية معلبة', 'هدايا ومناسبات', 'قطع إلكترونية',
  'كتب ومطبوعات', 'مستلزمات طبية', 'أدوات مكتبية', 'إكسسوارات موبايل',
];

function buildDriverOrder(seq, statusInfo) {
  const orderNumber = 'DRV-' + (7000 + seq);
  const senderCity = randomItem(IRAQI_CITIES);
  const receiverCity = randomItem(IRAQI_CITIES);
  const sender = { name: randomItem(SHIPMENT_PEOPLE), phone: randomPhone(), city: senderCity };
  const receiver = { name: randomItem(SHIPMENT_PEOPLE), phone: randomPhone(), city: receiverCity };
  const createdAt = randomPastDate(2);
  return {
    id: orderNumber,
    orderNumber,
    sender,
    receiver,
    pickupAddress: `${randomItem(IRAQI_DISTRICTS)}, ${senderCity}`,
    deliveryAddress: `${randomItem(IRAQI_DISTRICTS)}, ${receiverCity}`,
    itemDesc: randomItem(DRIVER_ORDER_ITEMS),
    weight: randomInt(5, 400) / 10,
    distanceKm: randomInt(15, 260) / 10,
    fee: randomInt(5, 45) * 1000,
    paymentMethod: randomItem(PAYMENT_METHODS),
    createdAt: createdAt.toISOString(),
    status: statusInfo.status,   // 'new' | 'active' | 'completed' | 'rejected'
    stage: statusInfo.stage || null, // 'accepted' | 'in_progress' | 'delivered'
  };
}

/* 15 realistic seeded orders: 8 waiting for a response, 3 accepted
   (not started), 2 already in progress, 2 already completed — so all
   four driver screens have believable content right away. */
const DRIVER_ORDER_STATUS_PLAN = [
  { status: 'new' }, { status: 'new' }, { status: 'new' }, { status: 'new' },
  { status: 'new' }, { status: 'new' }, { status: 'new' }, { status: 'new' },
  { status: 'active', stage: 'accepted' }, { status: 'active', stage: 'accepted' }, { status: 'active', stage: 'accepted' },
  { status: 'active', stage: 'in_progress' }, { status: 'active', stage: 'in_progress' },
  { status: 'completed', stage: 'delivered' }, { status: 'completed', stage: 'delivered' },
];

const DRIVER_ORDERS = DRIVER_ORDER_STATUS_PLAN.map((info, i) => buildDriverOrder(i, info));
DRIVER_ORDERS.forEach((o) => {
  if (o.status === 'completed') {
    o.completedAt = new Date(new Date(o.createdAt).getTime() + randomInt(30, 90) * 60000).toISOString();
  }
});

function getDriverOrdersByStatus(status) {
  return DRIVER_ORDERS.filter((o) => o.status === status);
}
function getDriverOrderById(id) {
  return DRIVER_ORDERS.find((o) => o.id === id);
}
function acceptDriverOrder(id) {
  const o = getDriverOrderById(id);
  if (!o) return null;
  o.status = 'active';
  o.stage = 'accepted';
  return o;
}
function rejectDriverOrder(id) {
  const o = getDriverOrderById(id);
  if (!o) return null;
  o.status = 'rejected';
  return o;
}
function startDriverDelivery(id) {
  const o = getDriverOrderById(id);
  if (!o) return null;
  o.stage = 'in_progress';
  return o;
}
function completeDriverDelivery(id) {
  const o = getDriverOrderById(id);
  if (!o) return null;
  o.status = 'completed';
  o.stage = 'delivered';
  o.completedAt = new Date().toISOString();
  return o;
}

/* ============================================================
   Driver module — Earnings
   Fake weekly / monthly earnings history + a standalone list of
   recent paid-out trips (independent from DRIVER_ORDERS so the
   Earnings screen always has rich, believable content).
   ============================================================ */

const WEEKDAY_SHORT = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

/* Build the last 7 days of earnings, ending today. */
function buildDriverWeeklyEarnings() {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push({
      label: WEEKDAY_SHORT[d.getDay()],
      date: d.toISOString(),
      trips: randomInt(2, 11),
      value: randomInt(15, 95) * 1000,
    });
  }
  return days;
}

/* Build the last 6 months of earnings, ending this month. */
function buildDriverMonthlyEarnings() {
  const months = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      label: AR_MONTHS[d.getMonth()],
      date: d.toISOString(),
      trips: randomInt(60, 210),
      value: randomInt(900, 2600) * 1000,
    });
  }
  return months;
}

const DRIVER_EARNINGS_WEEKLY = buildDriverWeeklyEarnings();
const DRIVER_EARNINGS_MONTHLY = buildDriverMonthlyEarnings();

/* A believable list of individually paid-out trips for the
   "أحدث الأرباح" list at the bottom of the Earnings screen. */
function buildDriverEarningEntry(seq) {
  const orderNumber = 'DRV-' + (6000 + seq);
  const d = randomPastDate(13);
  return {
    id: 'e' + seq,
    orderNumber,
    route: `${randomItem(IRAQI_CITIES)} ← ${randomItem(IRAQI_CITIES)}`,
    date: d.toISOString(),
    fee: randomInt(6, 40) * 1000,
  };
}
const DRIVER_EARNINGS_HISTORY = Array.from({ length: 10 }, (_, i) => buildDriverEarningEntry(i + 1))
  .sort((a, b) => new Date(b.date) - new Date(a.date));

function getDriverEarningsSummary(period) {
  const rows = period === 'monthly' ? DRIVER_EARNINGS_MONTHLY : DRIVER_EARNINGS_WEEKLY;
  const total = rows.reduce((sum, r) => sum + r.value, 0);
  const trips = rows.reduce((sum, r) => sum + r.trips, 0);
  const best = rows.reduce((max, r) => (r.value > max.value ? r : max), rows[0]);
  const avgPerTrip = trips ? Math.round(total / trips) : 0;
  return { total, trips, best, avgPerTrip, rows };
}

/* ============================================================
   Driver module — Wallet
   Separate fake wallet for driver earnings/withdrawals, kept
   independent from the customer WalletAccount above.
   ============================================================ */
const DRIVER_WALLET = {
  balance: 386200,
  number: 'AMN-DRV-7734',
};

const DRIVER_WALLET_TRANSACTIONS = [
  { id: 'dw1', type: 'earning', title: 'أرباح توصيل', desc: 'الطلب #DRV-7013', amount: 24000, date: '2026-08-06T10:20:00', status: 'completed' },
  { id: 'dw2', type: 'earning', title: 'أرباح توصيل', desc: 'الطلب #DRV-7011', amount: 18500, date: '2026-08-05T19:05:00', status: 'completed' },
  { id: 'dw3', type: 'withdraw', title: 'سحب إلى حساب بنكي', desc: 'مصرف الرافدين •• 7742', amount: -150000, date: '2026-08-05T09:40:00', status: 'completed' },
  { id: 'dw4', type: 'bonus', title: 'مكافأة أداء الأسبوع', desc: 'إتمام أكثر من 40 طلب هذا الأسبوع', amount: 20000, date: '2026-08-04T21:00:00', status: 'completed' },
  { id: 'dw5', type: 'earning', title: 'أرباح توصيل', desc: 'الطلب #DRV-7005', amount: 31000, date: '2026-08-04T15:12:00', status: 'completed' },
  { id: 'dw6', type: 'transfer_out', title: 'تحويل إلى مصطفى الجبوري', desc: 'تحويل بين المحافظ', amount: -10000, date: '2026-08-03T13:30:00', status: 'completed' },
  { id: 'dw7', type: 'earning', title: 'أرباح توصيل', desc: 'الطلب #DRV-6998', amount: 22500, date: '2026-08-02T17:48:00', status: 'completed' },
  { id: 'dw8', type: 'withdraw', title: 'سحب إلى حساب بنكي', desc: 'مصرف الرافدين •• 7742', amount: -80000, date: '2026-07-30T08:55:00', status: 'pending' },
  { id: 'dw9', type: 'earning', title: 'أرباح توصيل', desc: 'الطلب #DRV-6981', amount: 15500, date: '2026-07-29T12:00:00', status: 'completed' },
  { id: 'dw10', type: 'earning', title: 'أرباح توصيل', desc: 'الطلب #DRV-6970', amount: 27000, date: '2026-07-27T16:22:00', status: 'completed' },
];
let driverWalletTxSeq = DRIVER_WALLET_TRANSACTIONS.length;

const DRIVER_WALLET_TX_META = {
  earning: { label: 'أرباح', icon: 'box', tone: 'success' },
  bonus: { label: 'مكافأة', icon: 'gift', tone: 'success' },
  withdraw: { label: 'سحب', icon: 'wallet', tone: 'danger' },
  transfer_out: { label: 'تحويل صادر', icon: 'route', tone: 'danger' },
  transfer_in: { label: 'تحويل وارد', icon: 'route', tone: 'success' },
};
function getDriverWalletTxMeta(type) {
  return DRIVER_WALLET_TX_META[type] || DRIVER_WALLET_TX_META.earning;
}

/* Adds a new transaction to the top of the driver wallet list and updates the balance. */
function addDriverWalletTransaction({ type, title, desc, amount }) {
  driverWalletTxSeq += 1;
  const record = {
    id: 'dw_new_' + driverWalletTxSeq,
    type,
    title,
    desc,
    amount,
    date: new Date().toISOString(),
    status: 'completed',
  };
  DRIVER_WALLET_TRANSACTIONS.unshift(record);
  DRIVER_WALLET.balance += amount;
  return record;
}

/* ============================================================
   Driver module — Ratings
   ============================================================ */
const DRIVER_RATING_BREAKDOWN = { 5: 912, 4: 231, 3: 68, 2: 19, 1: 10 };

const DRIVER_REVIEW_COMMENTS = {
  5: ['سائق محترم وسريع جداً بالتوصيل', 'تعامل راقي والتزام بالوقت، شكراً لك', 'أفضل تجربة توصيل جربتها، ممتاز', 'وصل الطلب بحالة ممتازة وبسرعة'],
  4: ['توصيل جيد لكن تأخر قليلاً عن الموعد', 'تعامل جيد بشكل عام', 'كل شي تمام فقط العنوان كان صعب إيجاده'],
  3: ['توصيل مقبول، يحتاج تحسين بالتواصل', 'تأخر شوي لكن وصل الطلب سليم'],
  2: ['تأخر كثير عن الموعد المحدد', 'تعامل عادي وما كان في تواصل واضح'],
  1: ['الطلب تأخر كثير ووصل متضرر بسيط'],
};

function buildDriverReview(seq) {
  const stars = randomInt(1, 5) <= 1 ? randomInt(1, 3) : randomInt(4, 5); // skew positive, still varied
  const pool = DRIVER_REVIEW_COMMENTS[stars] || DRIVER_REVIEW_COMMENTS[5];
  return {
    id: 'rv' + seq,
    reviewer: randomItem(SHIPMENT_PEOPLE),
    stars,
    comment: randomItem(pool),
    date: randomPastDate(30).toISOString(),
    orderNumber: 'DRV-' + (6900 + seq),
  };
}
const DRIVER_REVIEWS = Array.from({ length: 12 }, (_, i) => buildDriverReview(i + 1))
  .sort((a, b) => new Date(b.date) - new Date(a.date));

function getDriverReviewCount() {
  return Object.values(DRIVER_RATING_BREAKDOWN).reduce((a, b) => a + b, 0);
}

/* ============================================================
   Admin module
   Fake in-memory "database" of drivers + dashboard stats used by
   the Admin Dashboard Home, Orders Management and Drivers
   Management screens.
   ============================================================ */

const ADMIN_DRIVER_STATUSES = [
  { id: 'active', label: 'نشط', tone: 'success', icon: 'checkCircle' },
  { id: 'busy', label: 'مشغول', tone: 'primary', icon: 'localTruck' },
  { id: 'offline', label: 'غير متصل', tone: 'gray', icon: 'close' },
];

function getAdminDriverStatusMeta(id) {
  return ADMIN_DRIVER_STATUSES.find((s) => s.id === id) || ADMIN_DRIVER_STATUSES[0];
}

const ADMIN_DRIVER_FILTERS = [
  { id: 'all', label: 'الكل' },
  { id: 'active', label: 'نشط' },
  { id: 'busy', label: 'مشغول' },
  { id: 'offline', label: 'غير متصل' },
];

const ADMIN_DRIVER_EXTRA_NAMES = [
  'حسن كاظم علي', 'مهند صبري', 'علاء الدين فوزي', 'سيف عماد', 'باسم نوري',
  'أوس رياض', 'زيد هاشم', 'مرتضى صادق', 'قصي أنور', 'إياد وليد',
  'جاسم محي', 'نبيل عارف', 'أمجد سلمان', 'رافد عدنان',
];
const ADMIN_DRIVER_NAME_POOL = [...DRIVER_NAMES, ...ADMIN_DRIVER_EXTRA_NAMES];

function buildAdminDriver(seq) {
  const name = ADMIN_DRIVER_NAME_POOL[seq % ADMIN_DRIVER_NAME_POOL.length];
  const status = ADMIN_DRIVER_STATUSES[seq % ADMIN_DRIVER_STATUSES.length].id;
  const completedOrders = randomInt(30, 640);
  return {
    id: 'DR-' + (1000 + seq),
    name,
    phone: randomPhone(),
    city: randomItem(IRAQI_CITIES),
    vehicle: randomItem(DRIVER_VEHICLES),
    plate: `${randomItem(IRAQI_CITIES)} ${randomInt(10000, 89999)}`,
    status,
    rating: (randomInt(38, 50) / 10).toFixed(1),
    completedOrders,
    activeOrders: status === 'busy' ? randomInt(1, 4) : 0,
    joinDate: randomPastDate(500).toISOString(),
  };
}

const ADMIN_DRIVERS = Array.from({ length: 22 }, (_, i) => buildAdminDriver(i + 1));

function getAdminDriverById(id) {
  return ADMIN_DRIVERS.find((d) => d.id === id);
}

function matchesDriverStatusFilter(driver, filterId) {
  if (!filterId || filterId === 'all') return true;
  return driver.status === filterId;
}

function matchesDriverSearch(driver, query) {
  if (!query) return true;
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return (
    driver.name.toLowerCase().includes(q) ||
    driver.phone.toLowerCase().includes(q) ||
    driver.plate.toLowerCase().includes(q)
  );
}

/* Deterministically pairs a shipment with one of the admin drivers,
   so the same order always shows the same "assigned driver" in the
   Orders Management table without mutating shipment records. */
function getAdminDriverForOrder(shipment) {
  if (!shipment) return null;
  let hash = 0;
  for (let i = 0; i < shipment.trackingNumber.length; i++) {
    hash = (hash * 31 + shipment.trackingNumber.charCodeAt(i)) >>> 0;
  }
  return ADMIN_DRIVERS[hash % ADMIN_DRIVERS.length];
}

/* Dashboard Home summary numbers. Order counts derive from the real
   SHIPMENTS list so they always stay consistent with Orders
   Management; today's revenue is a realistic simulated figure. */
function computeAdminStats() {
  const totalOrders = SHIPMENTS.length;
  const completedOrders = SHIPMENTS.filter((s) => s.status === 'delivered').length;
  const activeOrders = SHIPMENTS.filter((s) => s.status !== 'delivered' && s.status !== 'cancelled').length;
  const totalDrivers = ADMIN_DRIVERS.length;
  const todayOrdersCount = randomInt(9, 24);
  let todayRevenue = 0;
  for (let i = 0; i < todayOrdersCount; i++) todayRevenue += randomInt(15, 250) * 1000;
  return { totalOrders, activeOrders, completedOrders, totalDrivers, todayRevenue, todayOrdersCount };
}

const ADMIN_STATS = computeAdminStats();

/* ============================================================
   Admin — Settings module
   (Company Settings, Admin Profile, Security)
   ============================================================ */
const ADMIN_INFO = {
  name: 'عمر الطائي',
  role: 'مدير النظام',
  phone: '07709998877',
  email: 'admin@ameen-delivery.iq',
  password: 'admin123',
  avatar: null,
};

const COMPANY_SETTINGS = {
  name: APP.name,
  phone: APP.supportPhone,
  email: 'info@ameen-delivery.iq',
  address: 'بغداد، الكرادة، شارع 52',
};

const ADMIN_SECURITY = {
  twoFactor: false,
  loginAlerts: true,
  lastLogin: 'اليوم 09:20 صباحاً • بغداد، العراق',
};

/* ============================================================
   Admin — Customers Management
   Fake customer directory built from the same name pool used
   for shipments, so a customer's order history can be matched
   deterministically against SHIPMENTS.
   ============================================================ */

const CUSTOMER_STATUSES = [
  { id: 'active', label: 'نشط', tone: 'success', icon: 'checkCircle' },
  { id: 'inactive', label: 'غير نشط', tone: 'gray', icon: 'close' },
];

function getCustomerStatusMeta(id) {
  return CUSTOMER_STATUSES.find((s) => s.id === id) || CUSTOMER_STATUSES[0];
}

const CUSTOMER_FILTERS = [
  { id: 'all', label: 'الكل' },
  { id: 'active', label: 'نشط' },
  { id: 'inactive', label: 'غير نشط' },
];

function buildAdminCustomer(seq) {
  const name = SHIPMENT_PEOPLE[seq % SHIPMENT_PEOPLE.length];
  const city = randomItem(IRAQI_CITIES);
  const totalOrders = randomInt(1, 46);
  const totalSpent = totalOrders * randomInt(18, 220) * 1000;
  const status = totalOrders >= 4 || Math.random() > 0.3 ? 'active' : 'inactive';
  return {
    id: 'CU-' + (3000 + seq),
    name,
    phone: randomPhone(),
    city,
    joinDate: randomPastDate(430).toISOString(),
    totalOrders,
    totalSpent,
    rating: (randomInt(35, 50) / 10).toFixed(1),
    status,
  };
}

const ADMIN_CUSTOMERS = Array.from({ length: 26 }, (_, i) => buildAdminCustomer(i + 1))
  .sort((a, b) => b.totalSpent - a.totalSpent);

function getAdminCustomerById(id) {
  return ADMIN_CUSTOMERS.find((c) => c.id === id);
}

function matchesCustomerStatusFilter(customer, filterId) {
  if (!filterId || filterId === 'all') return true;
  return customer.status === filterId;
}

function matchesCustomerSearch(customer, query) {
  if (!query) return true;
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return (
    customer.name.toLowerCase().includes(q) ||
    customer.phone.toLowerCase().includes(q) ||
    customer.city.toLowerCase().includes(q)
  );
}

/* Matches a customer to shipments sharing the same sender name,
   so Customer Details shows a believable, consistent order history. */
function getCustomerOrders(customer) {
  if (!customer) return [];
  return SHIPMENTS.filter((s) => s.sender.name === customer.name);
}

/* ============================================================
   Admin — Reports
   Realistic simulated figures for the Reports dashboard: revenue
   cards, monthly revenue chart, shipment status breakdown, and
   top drivers / top customers leaderboards.
   ============================================================ */

function computeRevenueCards() {
  const today = ADMIN_STATS.todayRevenue;
  const week = today * randomInt(5, 7) + randomInt(80, 400) * 1000;
  const month = week * randomInt(3, 4) + randomInt(300, 1200) * 1000;
  const year = month * randomInt(10, 12) + randomInt(3000, 12000) * 1000;
  return { today, week, month, year };
}

const REVENUE_CARDS = computeRevenueCards();

/* Build the last 6 months of revenue, ending this month. */
function buildMonthlyRevenue() {
  const months = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({ label: AR_MONTHS[d.getMonth()], value: randomInt(4200, 21500) * 1000 });
  }
  return months;
}

const MONTHLY_REVENUE = buildMonthlyRevenue();

/* Shipment status breakdown, computed from the real SHIPMENTS list
   so the "chart" always matches Orders Management. */
function computeShipmentStats() {
  const total = SHIPMENTS.length;
  return SHIPMENT_STATUSES.map((s) => {
    const count = SHIPMENTS.filter((sh) => sh.status === s.id).length;
    return { id: s.id, label: s.label, tone: s.tone, icon: s.icon, count, pct: total ? Math.round((count / total) * 100) : 0 };
  }).filter((s) => s.count > 0);
}

const SHIPMENT_STATS = computeShipmentStats();

function computeTopDrivers() {
  return [...ADMIN_DRIVERS].sort((a, b) => b.completedOrders - a.completedOrders).slice(0, 5);
}

const TOP_DRIVERS = computeTopDrivers();

function computeTopCustomers() {
  return [...ADMIN_CUSTOMERS].sort((a, b) => b.totalSpent - a.totalSpent).slice(0, 5);
}

const TOP_CUSTOMERS = computeTopCustomers();
