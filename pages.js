/* ============================================================
   pages.js — Screen templates (return HTML strings).
   Logic / event wiring lives in app.js (onScreenMounted).
   ============================================================ */

/* ---------------- Splash ---------------- */
function renderSplash() {
  return `
    <div class="splash-screen">
      <div class="splash-glow"></div>
      <div class="splash-content">
        <div class="splash-logo-wrap">
          <img src="assets/logo.png" class="splash-logo" alt="${APP.name}" />
          <svg class="splash-route" viewBox="0 0 220 90" fill="none">
            <path d="M6 70 C 50 10, 110 90, 214 20" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="6 8" />
            <circle cx="214" cy="20" r="5" fill="white" />
          </svg>
        </div>
        <h1 class="splash-title">${APP.name}</h1>
        <p class="splash-tagline">${APP.tagline}</p>
      </div>
      <div class="splash-footer">
        <div class="splash-progress"><div class="splash-progress-bar"></div></div>
        <p class="splash-footer-text">جاري تجهيز تجربتك...</p>
      </div>
    </div>
  `;
}

/* ---------------- Onboarding art (per-slide illustration) ---------------- */
function onboardingArt(kind) {
  if (kind === 'truck') {
    return `
      <div class="ob-art ob-art-truck">
        <div class="ob-art-bg"></div>
        <svg class="ob-dotted" viewBox="0 0 300 60" fill="none">
          <path d="M4 45 C 80 -5, 160 65, 296 15" stroke="#F1580C" stroke-width="2" stroke-linecap="round" stroke-dasharray="5 7"/>
        </svg>
        <span class="ob-pin">${Icon.pin}</span>
        <img src="assets/truck.png" alt="شاحنة التوصيل" class="ob-truck-img" />
      </div>
    `;
  }
  if (kind === 'tracking') {
    return `
      <div class="ob-art ob-art-map">
        <div class="ob-art-bg ob-art-bg-alt"></div>
        <div class="ob-map-card">
          <div class="ob-map-grid"></div>
          <svg class="ob-map-path" viewBox="0 0 240 160" fill="none">
            <path d="M20 140 C 70 60, 110 140, 160 70 S 210 30, 224 20" stroke="#F1580C" stroke-width="3" stroke-linecap="round" stroke-dasharray="1 10"/>
          </svg>
          <span class="ob-map-dot ob-map-dot-start"></span>
          <span class="ob-map-dot ob-map-dot-end">${Icon.pin}</span>
          <div class="ob-map-badge">
            <span class="pulse-dot"></span>
            الشحنة #AM-2291 في الطريق
          </div>
        </div>
      </div>
    `;
  }
  return `
    <div class="ob-art ob-art-secure">
      <div class="ob-art-bg ob-art-bg-alt2"></div>
      <div class="ob-secure-card">
        <span class="ob-secure-shield">${Icon.shield}</span>
        <div class="ob-secure-row">${Icon.card}<span>دفع نقدي أو إلكتروني</span></div>
        <div class="ob-secure-row">${Icon.checkCircle}<span>تأمين كامل للشحنة</span></div>
        <div class="ob-secure-row">${Icon.info}<span>دعم فني 24/7</span></div>
      </div>
    </div>
  `;
}

function renderOnboarding() {
  const slidesHtml = ONBOARDING_SLIDES.map((s, i) => `
    <div class="ob-slide" data-slide="${i}">
      ${onboardingArt(s.art)}
      <div class="ob-text">
        <span class="ob-eyebrow">${s.eyebrow}</span>
        <h2 class="ob-title">${s.title}</h2>
        <p class="ob-desc">${s.desc}</p>
      </div>
    </div>
  `).join('');

  return `
    <div class="onboarding-screen">
      <div class="ob-topbar">
        ${BrandMark({ size: 'sm' })}
        <button class="ob-skip" id="ob-skip">تخطي</button>
      </div>

      <div class="ob-track-wrap">
        <div class="ob-track" id="ob-track">${slidesHtml}</div>
      </div>

      <div class="ob-bottom">
        ${ProgressDots(ONBOARDING_SLIDES.length, 0)}
        <div class="ob-actions">
          <button class="btn-primary w-full" id="ob-next">
            <span class="btn-label">التالي</span>
            <span class="btn-icon">${Icon.chevronLeft}</span>
          </button>
        </div>
      </div>
    </div>
  `;
}

/* ---------------- Login ---------------- */
function renderLogin() {
  return `
    <div class="auth-screen">
      ${AuthTopBar({ backTarget: 'onboarding', title: '' })}

      <div class="auth-hero">
        ${BrandMark({ size: 'lg', withName: false })}
        <h1 class="auth-title">أهلاً بعودتك</h1>
        <p class="auth-subtitle">سجّل الدخول لمتابعة شحناتك وطلباتك</p>
      </div>

      <form id="login-form" class="auth-form" novalidate>
        ${InputField({
          id: 'login-phone',
          type: 'tel',
          label: 'رقم الهاتف',
          placeholder: '07XXXXXXXXX',
          icon: Icon.phone,
          inputmode: 'numeric',
          maxlength: 11,
        })}
        ${InputField({
          id: 'login-password',
          type: 'password',
          label: 'كلمة المرور',
          placeholder: '••••••••',
          icon: Icon.lock,
          rightSlotId: 'login-password-toggle',
        })}

        <div class="auth-row-between">
          ${CheckboxRow({ id: 'login-remember', label: 'تذكرني' })}
          <button type="button" class="link-btn" id="forgot-password">نسيت كلمة المرور؟</button>
        </div>

        ${PrimaryButton({ id: 'login-submit', label: 'تسجيل الدخول' })}

        <p class="auth-demo-hint">للتجربة: 07701234567 / 123456</p>
      </form>

      <div class="auth-divider"><span>أو</span></div>

      <p class="auth-switch">
        ليس لديك حساب؟
        <button class="link-btn link-btn-strong" data-nav="register" data-direction="forward">إنشاء حساب جديد</button>
      </p>
    </div>
  `;
}

/* ---------------- Register ---------------- */
function renderRegister() {
  return `
    <div class="auth-screen">
      ${AuthTopBar({ backTarget: 'login', title: 'إنشاء حساب' })}

      <div class="auth-hero auth-hero-compact">
        <h1 class="auth-title">أنشئ حسابك الآن</h1>
        <p class="auth-subtitle">انضم إلينا وابدأ بإرسال واستلام شحناتك بسهولة</p>
      </div>

      <form id="register-form" class="auth-form" novalidate>
        ${InputField({
          id: 'reg-name',
          type: 'text',
          label: 'الاسم الكامل',
          placeholder: 'مثال: علي حسين محمد',
          icon: Icon.user,
        })}
        ${InputField({
          id: 'reg-phone',
          type: 'tel',
          label: 'رقم الهاتف',
          placeholder: '07XXXXXXXXX',
          icon: Icon.phone,
          inputmode: 'numeric',
          maxlength: 11,
        })}
        ${SelectField({
          id: 'reg-city',
          label: 'المحافظة',
          icon: Icon.city,
          placeholder: 'اختر محافظتك',
          options: IRAQI_CITIES,
        })}
        ${InputField({
          id: 'reg-password',
          type: 'password',
          label: 'كلمة المرور',
          placeholder: '6 أحرف على الأقل',
          icon: Icon.lock,
          rightSlotId: 'reg-password-toggle',
        })}
        ${InputField({
          id: 'reg-password-confirm',
          type: 'password',
          label: 'تأكيد كلمة المرور',
          placeholder: '••••••••',
          icon: Icon.lock,
          rightSlotId: 'reg-password-confirm-toggle',
        })}

        ${CheckboxRow({ id: 'reg-terms', label: 'أوافق على الشروط والأحكام وسياسة الخصوصية' })}

        ${PrimaryButton({ id: 'register-submit', label: 'إنشاء الحساب' })}
      </form>

      <p class="auth-switch">
        لديك حساب بالفعل؟
        <button class="link-btn link-btn-strong" data-nav="login">تسجيل الدخول</button>
      </p>
    </div>
  `;
}

/* ---------------- Forgot Password (step 1: enter phone) ---------------- */
function renderForgotPassword() {
  return `
    <div class="auth-screen">
      ${AuthTopBar({ backTarget: 'login', title: 'استرجاع كلمة المرور' })}

      <div class="auth-hero">
        ${BrandMark({ size: 'lg', withName: false })}
        <h1 class="auth-title">نسيت كلمة المرور؟</h1>
        <p class="auth-subtitle">أدخل رقم هاتفك المسجّل وراح نرسلك رمز تحقق عبر واتساب</p>
      </div>

      <form id="forgot-password-form" class="auth-form" novalidate>
        ${InputField({
          id: 'forgot-phone',
          type: 'tel',
          label: 'رقم الهاتف',
          placeholder: '07XXXXXXXXX',
          icon: Icon.phone,
          inputmode: 'numeric',
          maxlength: 11,
        })}

        ${PrimaryButton({ id: 'forgot-password-submit', label: 'إرسال رمز التحقق' })}
      </form>

      <p class="auth-switch">
        تذكرت كلمة المرور؟
        <button class="link-btn link-btn-strong" data-nav="login">تسجيل الدخول</button>
      </p>
    </div>
  `;
}

/* ---------------- Reset Password (step 3: after OTP verified) ---------------- */
function renderResetPassword() {
  return `
    <div class="auth-screen">
      ${AuthTopBar({ backTarget: null, title: 'كلمة مرور جديدة' })}

      <div class="auth-hero">
        <span class="otp-badge">${Icon.lock}</span>
        <h1 class="auth-title">عيّن كلمة مرور جديدة</h1>
        <p class="auth-subtitle">اختر كلمة مرور قوية لحسابك</p>
      </div>

      <form id="reset-password-form" class="auth-form" novalidate>
        ${InputField({
          id: 'reset-password-new',
          type: 'password',
          label: 'كلمة المرور الجديدة',
          placeholder: '6 أحرف على الأقل',
          icon: Icon.lock,
          rightSlotId: 'reset-password-new-toggle',
        })}
        ${InputField({
          id: 'reset-password-confirm',
          type: 'password',
          label: 'تأكيد كلمة المرور',
          placeholder: '••••••••',
          icon: Icon.lock,
          rightSlotId: 'reset-password-confirm-toggle',
        })}

        ${PrimaryButton({ id: 'reset-password-submit', label: 'حفظ كلمة المرور' })}
      </form>
    </div>
  `;
}

/* ---------------- OTP ---------------- */
function renderOtp() {
  const ctx = AppState.pendingAuth || { mode: 'register', phone: '07XXXXXXXXX', name: '' };
  const masked = ctx.phone ? ctx.phone.replace(/^(\d{5})\d{4}(\d{2})$/, '$1••••$2') : '';
  const backTarget = ctx.mode === 'reset' ? 'forgot-password' : ctx.mode === 'login' ? 'login' : 'register';
  return `
    <div class="auth-screen">
      ${AuthTopBar({ backTarget, title: 'رمز التحقق' })}

      <div class="auth-hero">
        <span class="otp-badge">${Icon.shield}</span>
        <h1 class="auth-title">تحقق من رقمك</h1>
        <p class="auth-subtitle">أرسلنا رمز تحقق مكوّن من 4 أرقام إلى<br><span class="otp-phone" dir="ltr">${masked}</span></p>
      </div>

      <div class="otp-wrap">
        ${OtpBoxes(4)}
        <p class="field-error" id="otp-error"></p>

        ${PrimaryButton({ id: 'otp-submit', label: 'تأكيد الرمز' })}

        <div class="otp-resend-row">
          <span id="otp-timer">إعادة الإرسال خلال <b id="otp-seconds">60</b> ثانية</span>
          <button class="link-btn link-btn-strong hidden" id="otp-resend">إعادة إرسال الرمز</button>
        </div>

        <p class="auth-demo-hint">لم يصلك الرمز؟ تحقق من واتساب أو اطلب إعادة الإرسال</p>
      </div>
    </div>
  `;
}

/* ---------------- Success (post auth) ---------------- */
function renderSuccess() {
  const ctx = AppState.pendingAuth || {};
  const name = ctx.name || (AppState.currentUser && AppState.currentUser.name) || 'صديقنا';
  const isLogin = ctx.mode === 'login';
  return `
    <div class="success-screen">
      <div class="success-glow"></div>
      <div class="success-badge">
        <span class="success-check">${Icon.check}</span>
      </div>
      <h1 class="success-title">${isLogin ? 'تم تسجيل الدخول بنجاح' : 'تم إنشاء حسابك بنجاح'}</h1>
      <p class="success-subtitle">أهلاً بك ${name} 👋<br>حسابك جاهز الآن مع ${APP.name}</p>

      <div class="success-card">
        ${BrandMark({ size: 'sm' })}
        <div class="success-divider"></div>
        <div class="success-row"><span>${Icon.phone}</span><span>${ctx.phone || '—'}</span></div>
        <div class="success-row"><span>${Icon.city}</span><span>${ctx.city || 'العراق'}</span></div>
      </div>

      <button class="btn-primary w-full" id="enter-app-btn">
        <span class="btn-label">الدخول إلى التطبيق</span>
        <span class="btn-icon">${Icon.chevronLeft}</span>
      </button>
      <button class="btn-ghost w-full" id="back-to-login-btn">تسجيل الخروج</button>
    </div>
  `;
}

/* ---------------- Home ---------------- */
function renderHome() {
  const user = AppState.currentUser;
  const firstName = user ? user.name.split(' ')[0] : 'زائرنا';

  return `
    <div class="home-screen">

      <!-- ===== Hero ===== -->
      <section class="home-hero home-hero--cinematic">
        <div class="hero-skyline" aria-hidden="true">
          <svg viewBox="0 0 480 160" preserveAspectRatio="none">
            <g class="hero-skyline-back" fill="#2A150A">
              <rect x="0" y="70" width="26" height="90"/>
              <rect x="30" y="46" width="20" height="114"/>
              <rect x="54" y="86" width="30" height="74"/>
              <rect x="90" y="30" width="22" height="130"/>
              <rect x="118" y="60" width="26" height="100"/>
              <rect x="150" y="20" width="18" height="140"/>
              <rect x="174" y="72" width="28" height="88"/>
              <rect x="380" y="40" width="24" height="120"/>
              <rect x="408" y="76" width="20" height="84"/>
              <rect x="432" y="24" width="26" height="136"/>
              <rect x="462" y="64" width="18" height="96"/>
            </g>
            <g class="hero-skyline-front" fill="#421C0B">
              <rect x="200" y="98" width="24" height="62"/>
              <rect x="228" y="66" width="30" height="94"/>
              <rect x="262" y="108" width="20" height="52"/>
              <rect x="286" y="50" width="26" height="110"/>
              <rect x="316" y="88" width="22" height="72"/>
              <rect x="342" y="34" width="20" height="126"/>
              <rect x="366" y="94" width="18" height="66"/>
            </g>
            <g class="hero-skyline-windows">
              <circle cx="98" cy="58" r="1.4"/><circle cx="98" cy="72" r="1.4"/><circle cx="106" cy="58" r="1.4"/>
              <circle cx="234" cy="86" r="1.4"/><circle cx="234" cy="100" r="1.4"/><circle cx="244" cy="92" r="1.4"/>
              <circle cx="292" cy="70" r="1.4"/><circle cx="300" cy="84" r="1.4"/><circle cx="292" cy="98" r="1.4"/>
              <circle cx="348" cy="54" r="1.4"/><circle cx="356" cy="68" r="1.4"/><circle cx="348" cy="82" r="1.4"/>
              <circle cx="438" cy="44" r="1.4"/><circle cx="446" cy="58" r="1.4"/><circle cx="438" cy="72" r="1.4"/>
            </g>
          </svg>
        </div>
        <span class="hero-glow hero-glow-1"></span>
        <span class="hero-glow hero-glow-2"></span>

        <div class="home-topbar">
          <button class="round-icon-btn" id="home-notif-btn" aria-label="الإشعارات">
            ${Icon.bell}
            <span class="round-icon-badge" id="home-notif-count">3</span>
          </button>
          ${BrandMark({ size: 'sm' })}
          <button class="round-icon-btn" id="home-menu-btn" aria-label="القائمة">${Icon.menu}</button>
        </div>

        <div class="home-hero-body">
          <div class="home-hero-text">
            <h1 class="home-hero-title">نوصل طلبك<br><span class="hero-title-accent">بأمان وسرعة</span></h1>
            <p class="home-hero-sub">خدمات شحن وتوصيل موثوقة داخل العراق وخارجه</p>

            <div class="hero-badges-row">
              <span class="hero-badge">${Icon.shieldCheck}<span>أمان كامل</span></span>
              <span class="hero-badge">${Icon.bolt}<span>توصيل سريع</span></span>
              <span class="hero-badge">${Icon.clock}<span>خدمة 24/7</span></span>
            </div>

            <button class="home-hero-cta" id="home-order-btn">
              <span>اطلب شحنة الآن</span>
              ${Icon.chevronRight}
            </button>
          </div>
          <div class="home-hero-art">
            <span class="home-hero-pin hero-pin-1">${Icon.mapPinLine}</span>
            <span class="home-hero-pin hero-pin-2">${Icon.mapPinLine}</span>
            <span class="home-hero-pin hero-pin-3">${Icon.mapPinLine}</span>
            <div class="home-hero-truck">
              <span class="hero-truck-glow"></span>
              <img src="assets/truck.png" alt="شاحنة التوصيل" class="home-hero-truck-img" />
              <svg class="truck-spark-trail" viewBox="0 0 300 200" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id="heroSparkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.95"/>
                    <stop offset="45%" stop-color="#FFC98A" stop-opacity="0.75"/>
                    <stop offset="100%" stop-color="#FF7A2E" stop-opacity="0"/>
                  </linearGradient>
                  <radialGradient id="heroSparkGlow">
                    <stop offset="0%" stop-color="#FFFFFF" stop-opacity="1"/>
                    <stop offset="55%" stop-color="#FFC98A" stop-opacity="0.9"/>
                    <stop offset="100%" stop-color="#FF7A2E" stop-opacity="0"/>
                  </radialGradient>
                </defs>
                <path id="heroTrailPath" class="truck-spark-path"
                      d="M 202 96 C 232 84, 248 118, 278 100 S 300 78, 300 96" />
                <path class="truck-route-dotted"
                      d="M 202 96 C 150 70, 90 84, 20 40" />
                <circle r="3.2" fill="url(#heroSparkGlow)" class="spark-particle">
                  <animateMotion dur="1.6s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                    <mpath href="#heroTrailPath"/>
                  </animateMotion>
                  <animate attributeName="opacity" values="1;0.9;0" dur="1.6s" repeatCount="indefinite"/>
                </circle>
                <circle r="2.2" fill="url(#heroSparkGlow)" class="spark-particle">
                  <animateMotion dur="1.6s" begin="0.5s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                    <mpath href="#heroTrailPath"/>
                  </animateMotion>
                  <animate attributeName="opacity" values="1;0.9;0" dur="1.6s" begin="0.5s" repeatCount="indefinite"/>
                </circle>
                <circle r="2.6" fill="url(#heroSparkGlow)" class="spark-particle">
                  <animateMotion dur="1.6s" begin="1.05s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                    <mpath href="#heroTrailPath"/>
                  </animateMotion>
                  <animate attributeName="opacity" values="1;0.9;0" dur="1.6s" begin="1.05s" repeatCount="indefinite"/>
                </circle>
              </svg>
            </div>
          </div>
        </div>
      </section>

      <!-- ===== Tracking card ===== -->
      <section class="home-section home-track-section">
        <div class="track-card track-card--split">
          <div class="track-card-content">
            <div class="track-card-head">
              <div class="track-card-icon">${Icon.packageSearch}</div>
              <div class="track-card-text">
                <span class="track-card-title">تتبع شحنتك</span>
                <span class="track-card-desc">ادخل رقم الشحنة لتتبع حالتها</span>
              </div>
            </div>
            <div class="track-input-row">
              <div class="field-shell track-field-shell">
                <input id="home-track-input" type="text" class="field-input" placeholder="مثال: AM-2291" dir="ltr" />
              </div>
              <button class="track-search-btn" id="home-track-btn">${Icon.search}</button>
            </div>
          </div>
          <div class="track-card-art" aria-hidden="true">
            <span class="track-art-glow"></span>
            <img src="assets/track-boxes.png" alt="" class="track-boxes-photo" loading="lazy" decoding="async" width="96" height="96" />
          </div>
        </div>
        <div class="track-result hidden" id="home-track-result"></div>
      </section>

      <!-- ===== Services ===== -->
      <section class="home-section">
        ${SectionHeading('خدماتنا')}
        <div class="services-grid">
          ${HOME_SERVICES.map((s) => ServiceCard(s)).join('')}
        </div>
      </section>

      <!-- ===== Why choose us ===== -->
      <section class="home-section">
        <div class="why-choose-card">
          <span class="why-choose-glow"></span>
          <h2 class="why-choose-title">لماذا تختار الأمين للتوصيل؟</h2>
          <div class="advantages-band">
            ${HOME_ADVANTAGES.map((a) => AdvantageTile(a)).join('')}
          </div>
        </div>
      </section>

      <!-- ===== Offers ===== -->
      <section class="home-section">
        <div class="offer-banner">
          <span class="offer-icon">${Icon.gift}</span>
          <div class="offer-text">
            <span class="offer-title">${HOME_OFFER.title}</span>
            <div class="offer-code-row">
              <span class="offer-code-label">استخدم الكود:</span>
              <button class="offer-code" id="offer-code-btn" dir="ltr">
                ${HOME_OFFER.code} ${Icon.copy}
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- ===== Statistics ===== -->
      <section class="home-section">
        ${SectionHeading('أرقامنا تتحدث')}
        <div class="stats-grid" id="stats-grid">
          ${HOME_STATS.map((s) => StatBlock(s)).join('')}
        </div>
      </section>

      <!-- ===== Partners ===== -->
      <section class="home-section home-partners-section">
        ${SectionHeading('شركاء النجاح')}
        <div class="partners-marquee">
          <div class="partners-track">
            ${[...HOME_PARTNERS, ...HOME_PARTNERS].map((p) => `<span class="partner-chip">${p}</span>`).join('')}
          </div>
        </div>
      </section>

      <!-- ===== Download app ===== -->
      <section class="home-section">
        <div class="app-download-card">
          <span class="app-download-glow"></span>
          <div class="app-download-text">
            <h3 class="app-download-title">حمّل تطبيق الأمين الآن</h3>
            <p class="app-download-sub">وتابع شحناتك بكل سهولة</p>
            <div class="app-download-buttons">
              <span class="store-btn">
                <span class="store-btn-icon">${Icon.checkCircle}</span>
                <span class="store-btn-text"><small>GET IT ON</small>Google Play</span>
              </span>
              <span class="store-btn">
                <span class="store-btn-icon">${Icon.checkCircle}</span>
                <span class="store-btn-text"><small>Download on the</small>App Store</span>
              </span>
            </div>
          </div>
          <div class="app-download-art">
            <span class="app-ring app-ring-1"></span>
            <span class="app-ring app-ring-2"></span>
            <img src="assets/app-phone.jpg" alt="تطبيق الأمين للتوصيل" class="app-phone-photo" loading="lazy" decoding="async" width="520" height="520" />
          </div>
        </div>
      </section>

      <div class="home-bottom-spacer"></div>

      ${BottomNav('home')}
      ${NotificationsPanel()}
      ${SideMenu()}
    </div>
  `;
}

function SectionHeading(title) {
  return `
    <div class="section-heading">
      <span class="section-heading-dot"></span>
      <h2 class="section-heading-title">${title}</h2>
      <span class="section-heading-dot"></span>
    </div>
  `;
}

/* ============================================================
   My Orders
   ============================================================ */
function renderOrders() {
  return `
    <div class="orders-screen">
      ${AuthTopBar({ backTarget: 'home', title: 'طلباتي', actionIcon: Icon.plus, actionId: 'orders-create-btn' })}

      <div class="orders-search-wrap">
        <div class="field-shell orders-search-shell">
          <span class="field-icon">${Icon.search}</span>
          <input id="orders-search-input" type="text" class="field-input" placeholder="ابحث برقم الشحنة أو الاسم" />
        </div>
      </div>

      <div class="orders-filters">
        ${FilterChips(ORDER_FILTERS, 'all')}
      </div>

      <div class="orders-list" id="orders-list">
        ${SHIPMENTS.map((s) => OrderCard(s)).join('')}
      </div>

      <div class="orders-empty hidden" id="orders-empty">
        <span>${Icon.packageSearch}</span>
        <p>لا توجد طلبات مطابقة لبحثك</p>
      </div>

      <div class="orders-bottom-spacer"></div>
      ${BottomNav('orders')}
    </div>
  `;
}

/* ============================================================
   Shared shipment detail body (used by Order Details & Shipment Details)
   ============================================================ */
function ShipmentDetailBody(s) {
  const isCancelled = s.status === 'cancelled';
  const timelineIdx = SHIPMENT_TIMELINE_ORDER.indexOf(s.status);

  const timelineHtml = SHIPMENT_TIMELINE_ORDER.map((id, i) => {
    const stepMeta = getStatusMeta(id);
    let state = '';
    if (!isCancelled) {
      if (i < timelineIdx) state = 'done';
      else if (i === timelineIdx) state = 'active';
    }
    return `
      <div class="track-step ${state}">
        <span class="track-step-dot">${state === 'done' ? Icon.check : ''}</span>
        <span class="track-step-label">${stepMeta.label}</span>
      </div>
    `;
  }).join('');

  return `
    <div class="detail-card detail-card-status">
      <div class="detail-status-row">
        <span class="order-card-code" dir="ltr">#${s.trackingNumber}</span>
        ${StatusBadge(s.status)}
      </div>
      ${isCancelled
        ? `<div class="cancelled-banner">${Icon.xCircle}<span>تم إلغاء هذه الشحنة</span></div>`
        : `<div class="detail-timeline-wrap"><div class="track-steps">${timelineHtml}</div></div>`
      }
    </div>

    <div class="detail-card">
      ${SectionHeading('معلومات الشحنة')}
      <div class="detail-people">
        <div class="detail-person">
          <span class="detail-person-icon">${Icon.user}</span>
          <div class="detail-person-text">
            <span class="detail-person-label">المرسل</span>
            <span class="detail-person-name">${s.sender.name}</span>
            <span class="detail-person-phone" dir="ltr">${s.sender.phone}</span>
          </div>
          <a class="detail-call-btn" href="tel:${s.sender.phone}" aria-label="اتصال بالمرسل">${Icon.phone}</a>
        </div>
        <span class="detail-person-divider">${Icon.route}</span>
        <div class="detail-person">
          <span class="detail-person-icon">${Icon.mapPinLine}</span>
          <div class="detail-person-text">
            <span class="detail-person-label">المستلم</span>
            <span class="detail-person-name">${s.receiver.name}</span>
            <span class="detail-person-phone" dir="ltr">${s.receiver.phone}</span>
          </div>
          <a class="detail-call-btn" href="tel:${s.receiver.phone}" aria-label="اتصال بالمستلم">${Icon.phone}</a>
        </div>
      </div>
      <div class="detail-address-row">
        <span class="detail-address-icon">${Icon.pin}</span>
        <div class="detail-address-text">
          <span class="detail-address-label">عنوان الاستلام</span>
          <span>${s.pickupAddress}</span>
        </div>
      </div>
      <div class="detail-address-row">
        <span class="detail-address-icon">${Icon.mapPinLine}</span>
        <div class="detail-address-text">
          <span class="detail-address-label">عنوان التسليم</span>
          <span>${s.deliveryAddress}</span>
        </div>
      </div>
    </div>

    <div class="detail-card">
      ${SectionHeading('التفاصيل والدفع')}
      <div class="detail-info-grid">
        <div class="detail-info-tile"><span>${Icon.calendar}</span><b>${formatLongDate(s.date)}</b><small>التاريخ</small></div>
        <div class="detail-info-tile"><span>${Icon.scale}</span><b dir="ltr">${formatWeight(s.weight)}</b><small>الوزن</small></div>
        <div class="detail-info-tile"><span>${Icon.wallet}</span><b>${s.paymentMethod}</b><small>طريقة الدفع</small></div>
        <div class="detail-info-tile"><span>${Icon.tag}</span><b dir="ltr">${formatPrice(s.price)}</b><small>السعر</small></div>
      </div>
    </div>

    <div class="detail-actions">
      ${s.status !== 'cancelled' ? IconGhostButton({ id: 'detail-live-track-btn', label: 'تتبع مباشر', icon: Icon.mapPinLine }) : ''}
      ${IconGhostButton({ id: 'detail-copy-btn', label: 'نسخ رقم الشحنة', icon: Icon.copy })}
      ${(s.status === 'pending' || s.status === 'confirmed') ? IconGhostButton({ id: 'detail-cancel-btn', label: 'إلغاء الشحنة', icon: Icon.xCircle, danger: true }) : ''}
      ${(s.status === 'delivered' || s.status === 'cancelled') ? PrimaryButton({ id: 'detail-reorder-btn', label: 'إعادة الطلب', icon: Icon.chevronLeft }) : ''}
      ${IconGhostButton({ id: 'detail-support-btn', label: 'تواصل مع الدعم الفني', icon: Icon.headset })}
    </div>
  `;
}

/* ============================================================
   Order Details (reached from My Orders)
   ============================================================ */
function renderOrderDetails(params = {}) {
  const shipment = getShipmentById(params.id) || SHIPMENTS[0];
  return `
    <div class="detail-screen">
      ${AuthTopBar({ backTarget: 'orders', title: 'تفاصيل الطلب' })}
      <div class="detail-content" id="detail-content" data-order-id="${shipment.id}">
        ${ShipmentDetailBody(shipment)}
      </div>
    </div>
  `;
}

/* ============================================================
   Shipment Details (reached after creating a shipment, or from history)
   ============================================================ */
function renderShipmentDetails(params = {}) {
  const shipment = getShipmentById(params.id) || SHIPMENTS[0];
  const backTarget = params.back || 'shipment-history';
  return `
    <div class="detail-screen" data-back-target="${backTarget}">
      ${AuthTopBar({ backTarget, title: 'تفاصيل الشحنة' })}
      <div class="detail-content" id="detail-content" data-order-id="${shipment.id}">
        ${ShipmentDetailBody(shipment)}
      </div>
    </div>
  `;
}

/* ============================================================
   Create Shipment
   ============================================================ */
function renderCreateShipment() {
  const user = AppState.currentUser;
  return `
    <div class="auth-screen">
      ${AuthTopBar({ backTarget: 'orders', title: 'شحنة جديدة' })}

      <div class="auth-hero auth-hero-compact">
        <h1 class="auth-title">أرسل شحنة جديدة</h1>
        <p class="auth-subtitle">املأ بيانات المرسل والمستلم لإنشاء طلب الشحن</p>
      </div>

      <form id="create-shipment-form" class="auth-form" novalidate>
        ${InputField({ id: 'cs-sender-name', type: 'text', label: 'اسم المرسل', placeholder: 'مثال: أحمد الكناني', icon: Icon.user, value: user ? user.name : '' })}
        ${InputField({ id: 'cs-sender-phone', type: 'tel', label: 'هاتف المرسل', placeholder: '07XXXXXXXXX', icon: Icon.phone, inputmode: 'numeric', maxlength: 11, value: user ? user.phone : '' })}

        ${InputField({ id: 'cs-receiver-name', type: 'text', label: 'اسم المستلم', placeholder: 'مثال: زينب العزاوي', icon: Icon.user })}
        ${InputField({ id: 'cs-receiver-phone', type: 'tel', label: 'هاتف المستلم', placeholder: '07XXXXXXXXX', icon: Icon.phone, inputmode: 'numeric', maxlength: 11 })}

        ${SelectField({ id: 'cs-pickup-city', label: 'محافظة الاستلام', icon: Icon.city, placeholder: 'اختر المحافظة', options: IRAQI_CITIES })}
        ${InputField({ id: 'cs-pickup-address', type: 'text', label: 'عنوان الاستلام', placeholder: 'مثال: حي المنصور، قرب...', icon: Icon.pin })}

        ${SelectField({ id: 'cs-delivery-city', label: 'محافظة التسليم', icon: Icon.city, placeholder: 'اختر المحافظة', options: IRAQI_CITIES })}
        ${InputField({ id: 'cs-delivery-address', type: 'text', label: 'عنوان التسليم', placeholder: 'مثال: حي الكرادة، قرب...', icon: Icon.mapPinLine })}

        ${InputField({ id: 'cs-weight', type: 'number', label: 'الوزن (كغم)', placeholder: 'مثال: 5', icon: Icon.scale, dir: 'ltr' })}
        ${SelectField({ id: 'cs-payment', label: 'طريقة الدفع', icon: Icon.wallet, placeholder: 'اختر طريقة الدفع', options: PAYMENT_METHODS })}

        <div class="price-estimate-card">
          <span class="price-estimate-label">السعر التقديري</span>
          <span class="price-estimate-value" id="cs-price-estimate" dir="ltr">10,000 د.ع</span>
        </div>

        ${PrimaryButton({ id: 'create-shipment-submit', label: 'تأكيد الطلب' })}
      </form>
    </div>
  `;
}

/* ============================================================
   Shipment History
   ============================================================ */
function renderShipmentHistory() {
  const groups = groupShipmentsByMonth(SHIPMENTS);
  const groupsHtml = Object.keys(groups).map((key) => `
    <div class="history-group">
      <span class="history-group-title">${key}</span>
      <div class="history-group-list">${groups[key].map((s) => HistoryRow(s)).join('')}</div>
    </div>
  `).join('');

  return `
    <div class="orders-screen">
      ${AuthTopBar({ backTarget: 'orders', title: 'سجل الشحنات' })}

      <div class="orders-search-wrap">
        <div class="field-shell orders-search-shell">
          <span class="field-icon">${Icon.search}</span>
          <input id="history-search-input" type="text" class="field-input" placeholder="ابحث برقم الشحنة أو الاسم" />
        </div>
      </div>

      <div class="orders-filters">
        ${FilterChips(ORDER_FILTERS, 'all')}
      </div>

      <div class="history-list" id="history-list">${groupsHtml}</div>

      <div class="orders-empty hidden" id="history-empty">
        <span>${Icon.packageSearch}</span>
        <p>لا توجد نتائج مطابقة لبحثك</p>
      </div>

      <div class="orders-bottom-spacer"></div>
      ${BottomNav('orders')}
    </div>
  `;
}

/* ============================================================
   Track Shipment (search screen — reached via bottom nav / side menu)
   ============================================================ */
function renderTrack() {
  return `
    <div class="orders-screen lt-track-screen">
      ${AuthTopBar({ backTarget: 'home', title: 'تتبع شحنة' })}

      <div class="lt-track-hero">
        <span class="lt-track-hero-icon">${Icon.packageSearch}</span>
        <h1 class="lt-track-hero-title">تتبع شحنتك لحظة بلحظة</h1>
        <p class="lt-track-hero-sub">أدخل رقم الشحنة لعرض حالتها ومكانها الحالي على الخريطة</p>
      </div>

      <div class="lt-track-search-wrap">
        <div class="field-shell track-field-shell">
          <span class="field-icon">${Icon.search}</span>
          <input id="track-page-input" type="text" class="field-input" placeholder="مثال: AM-2291" dir="ltr" />
        </div>
        <button class="track-search-btn" id="track-page-btn">${Icon.search}</button>
      </div>

      <p class="lt-track-examples">
        <span>جرّب:</span>
        <button class="lt-track-chip" data-example="AM-2291">AM-2291</button>
        <button class="lt-track-chip" data-example="AM-2178">AM-2178</button>
        <button class="lt-track-chip" data-example="AM-1042">AM-1042</button>
      </p>

      <div class="lt-track-result hidden" id="track-page-result"></div>

      <div class="orders-bottom-spacer"></div>
      ${BottomNav('track')}
    </div>
  `;
}

/* ============================================================
   Live Tracking (fake map, driver details, timeline, progress)
   ============================================================ */
function renderLiveTracking(params = {}) {
  const shipment = findTrackableShipment(params.id) || getShipmentById(params.id) || SHIPMENTS[0];
  const backTarget = params.back || 'track';
  return `
    <div class="detail-screen" data-back-target="${backTarget}">
      ${AuthTopBar({ backTarget, title: 'التتبع المباشر' })}
      <div class="detail-content" id="lt-content" data-order-id="${shipment.id}">
        ${DeliveryStatusCard(shipment)}
        ${LiveMapCard(shipment)}
        ${AnimatedProgressBar(shipment)}
        ${DriverDetailsCard(shipment)}
        ${TrackingTimelineVertical(shipment)}

        <div class="detail-actions">
          ${IconGhostButton({ id: 'lt-copy-btn', label: 'نسخ رقم الشحنة', icon: Icon.copy })}
          ${IconGhostButton({ id: 'lt-support-btn', label: 'تواصل مع الدعم الفني', icon: Icon.headset })}
        </div>
      </div>
    </div>
  `;
}

/* ============================================================
   Notifications (standalone page)
   ============================================================ */
function renderNotifications() {
  const unreadCount = NOTIFICATIONS_FULL.filter((n) => n.unread).length;
  return `
    <div class="orders-screen notif-page">
      ${AuthTopBar({ backTarget: 'home', title: 'الإشعارات' })}

      <div class="notif-page-head">
        <span class="notif-page-count" id="notif-page-count">${unreadCount > 0 ? `لديك ${unreadCount} إشعارات غير مقروءة` : 'لا توجد إشعارات جديدة'}</span>
        <button class="link-btn link-btn-strong" id="notif-page-mark-all">تعليم الكل كمقروء</button>
      </div>

      <div class="orders-search-wrap">
        <div class="field-shell orders-search-shell">
          <span class="field-icon">${Icon.search}</span>
          <input id="notif-page-search-input" type="text" class="field-input" placeholder="ابحث في الإشعارات" />
        </div>
      </div>

      <div class="orders-filters">
        ${FilterChips([{ id: 'all', label: 'الكل' }, { id: 'unread', label: 'غير مقروءة' }], 'all')}
      </div>

      <div class="notif-page-list" id="notif-page-list">
        ${NOTIFICATIONS_FULL.map((n) => NotificationCard(n)).join('')}
      </div>

      <div class="orders-empty hidden" id="notif-page-empty">
        <span>${Icon.bell}</span>
        <p>لا توجد إشعارات لعرضها</p>
      </div>

      <div class="orders-bottom-spacer"></div>
      ${BottomNav('notifications')}
    </div>
  `;
}

/* ============================================================
   Wallet (standalone page)
   ============================================================ */
function renderWallet() {
  return `
    <div class="detail-screen wallet-screen">
      ${AuthTopBar({ backTarget: 'home', title: 'المحفظة' })}
      <div class="detail-content" id="wallet-content">
        ${WalletBalanceCard()}
        ${WalletQuickActions()}

        <div class="detail-card">
          ${SectionHeading('سجل العمليات')}
          <div class="wallet-tx-list" id="wallet-tx-list">
            ${WALLET_TRANSACTIONS.map((tx) => TransactionRow(tx)).join('')}
          </div>
        </div>
      </div>
      ${WalletActionSheet()}
    </div>
  `;
}

/* ============================================================
   Profile (standalone page)
   ============================================================ */
function renderProfile() {
  const user = AppState.currentUser || FAKE_USERS[0];
  return `
    <div class="profile-screen">
      ${AuthTopBar({ backTarget: 'home', title: 'حسابي', actionIcon: Icon.settings, actionId: 'profile-settings-btn' })}

      <div class="profile-hero-card">
        <div class="profile-avatar-wrap">
          <div class="profile-avatar" id="profile-avatar">${ProfileAvatar(user)}</div>
          <button class="profile-avatar-edit-btn" id="profile-avatar-edit-btn" aria-label="تغيير الصورة الشخصية">${Icon.camera}</button>
        </div>
        <span class="profile-hero-name" id="profile-hero-name">${user.name}</span>
        <span class="profile-hero-phone" dir="ltr" id="profile-hero-phone">${user.phone}</span>
        <span class="profile-hero-city-badge">${Icon.mapPinLine}<span>${user.city}</span></span>
      </div>

      <div class="detail-content">
        <div class="detail-card">
          <span class="profile-section-label">تعديل الملف الشخصي</span>
          <div class="menu-list">
            ${MenuRow({ id: 'profile-edit-photo-btn', icon: 'camera', label: 'تغيير الصورة الشخصية' })}
            ${MenuRow({ id: 'profile-edit-name-btn', icon: 'edit', label: 'تغيير الاسم', sub: user.name })}
            ${MenuRow({ id: 'profile-edit-phone-btn', icon: 'phone', label: 'تغيير رقم الهاتف', sub: user.phone })}
            ${MenuRow({ id: 'profile-edit-password-btn', icon: 'lock', label: 'تغيير كلمة المرور' })}
          </div>
        </div>

        <div class="detail-card">
          <div class="menu-list">
            ${MenuRow({ id: 'profile-settings-link-btn', icon: 'settings', label: 'الإعدادات', sub: 'اللغة، الوضع الليلي، الدعم الفني' })}
          </div>
        </div>

        <div class="detail-actions">
          ${IconGhostButton({ id: 'profile-logout-btn', label: 'تسجيل الخروج', icon: Icon.logout, danger: true })}
        </div>
      </div>

      <div class="home-bottom-spacer"></div>
      ${BottomNav('account')}
      ${ProfileActionSheet()}
    </div>
  `;
}

/* ============================================================
   Settings (standalone page)
   ============================================================ */
function renderSettings() {
  return `
    <div class="profile-screen">
      ${AuthTopBar({ backTarget: 'profile', title: 'الإعدادات' })}

      <div class="detail-content">
        <div class="detail-card">
          <span class="profile-section-label">التطبيق</span>
          <div class="menu-list">
            ${MenuRow({ id: 'settings-language-btn', icon: 'globe', label: 'اللغة', value: AppState.settings.language === 'ar' ? 'العربية' : 'English' })}
            <div class="menu-row">
              <span class="menu-row-icon">${Icon.moon}</span>
              <span class="menu-row-body">
                <span class="menu-row-label">الوضع الليلي</span>
                <span class="menu-row-sub">تجريبي</span>
              </span>
              ${ToggleSwitch({ id: 'settings-darkmode-toggle', checked: AppState.settings.darkMode })}
            </div>
            <div class="menu-row">
              <span class="menu-row-icon">${Icon.bell || Icon.info}</span>
              <span class="menu-row-body">
                <span class="menu-row-label">إشعارات Push</span>
                <span class="menu-row-sub">تنبيهات فورية بتحديثات شحناتك</span>
              </span>
              ${ToggleSwitch({ id: 'settings-push-toggle', checked: false })}
            </div>
          </div>
        </div>

        <div class="detail-card">
          <span class="profile-section-label">عن التطبيق</span>
          <div class="menu-list">
            <div class="menu-row app-version-row">
              <span class="menu-row-icon">${Icon.info}</span>
              <span class="menu-row-body"><span class="menu-row-label">إصدار التطبيق</span></span>
              <span class="menu-row-value" dir="ltr">${APP.version}</span>
            </div>
            ${MenuRow({ id: 'settings-privacy-btn', icon: 'fileText', label: 'سياسة الخصوصية' })}
            ${MenuRow({ id: 'settings-terms-btn', icon: 'fileText', label: 'الشروط والأحكام' })}
            ${MenuRow({ id: 'settings-support-btn', icon: 'headset', label: 'تواصل مع الدعم الفني', sub: APP.supportPhone })}
          </div>
        </div>

        <div class="detail-actions">
          ${IconGhostButton({ id: 'settings-logout-btn', label: 'تسجيل الخروج', icon: Icon.logout, danger: true })}
        </div>
      </div>

      <div class="home-bottom-spacer"></div>
      ${BottomNav('account')}
      ${SettingsInfoSheet()}
    </div>
  `;
}

/* ============================================================
   Driver Home
   ============================================================ */

/* Dynamic portion (stats + new-orders preview) so it can be
   redrawn in place after Accept/Reject without a full screen
   transition — mirrors how the shipment detail screen updates. */
function renderDriverHomeDynamic() {
  const newOrders = getDriverOrdersByStatus('new');
  const activeOrders = getDriverOrdersByStatus('active');
  const completedOrders = getDriverOrdersByStatus('completed');
  const todayEarnings = completedOrders.reduce((sum, o) => sum + o.fee, 0);

  const previewOrders = newOrders.slice(0, 3);
  const previewHtml = previewOrders.length
    ? previewOrders.map((o) => DriverOrderCard(o)).join('')
    : `<div class="orders-empty"><span>${Icon.packageSearch}</span><p>لا توجد طلبات جديدة حالياً</p></div>`;

  return `
    <section class="home-section">
      <div class="stats-grid">
        <div class="stat-block"><span class="stat-value" dir="ltr">${newOrders.length}</span><span class="stat-label">طلبات جديدة</span></div>
        <div class="stat-block"><span class="stat-value" dir="ltr">${activeOrders.length}</span><span class="stat-label">قيد التنفيذ</span></div>
        <div class="stat-block"><span class="stat-value" dir="ltr">${completedOrders.length}</span><span class="stat-label">طلبات مكتملة</span></div>
        <div class="stat-block"><span class="stat-value" dir="ltr">${formatPrice(todayEarnings)}</span><span class="stat-label">أرباح اليوم</span></div>
      </div>
    </section>

    <section class="home-section">
      ${SectionHeading('أحدث الطلبات الجديدة')}
      <div class="orders-list driver-home-preview-list">${previewHtml}</div>
      ${newOrders.length > 0 ? `<button class="btn-ghost btn-ghost-icon w-full" id="driver-home-view-new"><span>عرض كل الطلبات الجديدة (${newOrders.length})</span><span class="btn-ghost-icon-slot">${Icon.chevronLeft}</span></button>` : ''}
    </section>
  `;
}

function renderDriverHome() {
  const firstName = DRIVER_INFO.name.split(' ')[0];

  return `
    <div class="home-screen driver-home-screen">
      <section class="home-hero">
        <div class="home-topbar">
          <button class="round-icon-btn" data-nav="home" aria-label="العودة للتطبيق">${Icon.chevronRight}</button>
          ${BrandMark({ size: 'sm' })}
          <button class="round-icon-btn" data-nav="driver-profile" aria-label="حسابي">${Icon.user}</button>
        </div>
        <div class="driver-hero-body">
          <h1 class="home-hero-title">أهلاً، ${firstName} 👋</h1>
          <p class="home-hero-sub">${DRIVER_INFO.vehicle} • <span dir="ltr">${DRIVER_INFO.plate}</span></p>
        </div>
      </section>

      <div id="driver-home-dynamic">${renderDriverHomeDynamic()}</div>

      <div class="home-bottom-spacer"></div>
      ${DriverBottomNav('driver-home')}
    </div>
  `;
}

/* ============================================================
   Driver — New Orders
   ============================================================ */
function renderDriverNewOrders() {
  const orders = getDriverOrdersByStatus('new');
  return `
    <div class="orders-screen">
      ${AuthTopBar({ backTarget: 'driver-home', title: 'طلبات جديدة' })}

      <div class="orders-list" id="driver-new-list">
        ${orders.map((o) => DriverOrderCard(o)).join('')}
      </div>

      <div class="orders-empty ${orders.length ? 'hidden' : ''}" id="driver-new-empty">
        <span>${Icon.packageSearch}</span>
        <p>لا توجد طلبات جديدة حالياً</p>
      </div>

      <div class="orders-bottom-spacer"></div>
      ${DriverBottomNav('driver-new-orders')}
    </div>
  `;
}

/* ============================================================
   Driver — Active Orders
   ============================================================ */
function renderDriverActiveOrders() {
  const orders = getDriverOrdersByStatus('active');
  return `
    <div class="orders-screen">
      ${AuthTopBar({ backTarget: 'driver-home', title: 'الطلبات قيد التنفيذ' })}

      <div class="orders-list" id="driver-active-list">
        ${orders.map((o) => DriverOrderCard(o)).join('')}
      </div>

      <div class="orders-empty ${orders.length ? 'hidden' : ''}" id="driver-active-empty">
        <span>${Icon.packageSearch}</span>
        <p>لا توجد طلبات قيد التنفيذ حالياً</p>
      </div>

      <div class="orders-bottom-spacer"></div>
      ${DriverBottomNav('driver-active-orders')}
    </div>
  `;
}

/* ============================================================
   Driver — Completed Orders
   ============================================================ */
function renderDriverCompletedOrders() {
  const orders = getDriverOrdersByStatus('completed');
  return `
    <div class="orders-screen">
      ${AuthTopBar({ backTarget: 'driver-home', title: 'الطلبات المكتملة' })}

      <div class="orders-list" id="driver-completed-list">
        ${orders.map((o) => DriverOrderCard(o)).join('')}
      </div>

      <div class="orders-empty ${orders.length ? 'hidden' : ''}" id="driver-completed-empty">
        <span>${Icon.packageSearch}</span>
        <p>لا توجد طلبات مكتملة بعد</p>
      </div>

      <div class="orders-bottom-spacer"></div>
      ${DriverBottomNav('driver-completed-orders')}
    </div>
  `;
}

/* ============================================================
   Driver — Earnings
   ============================================================ */
function renderDriverEarnings(params = {}) {
  const period = params.period || 'weekly';
  const summary = getDriverEarningsSummary(period);
  return `
    <div class="detail-screen earnings-screen">
      ${AuthTopBar({ backTarget: 'driver-profile', title: 'الأرباح' })}
      <div class="detail-content" id="earnings-content">
        ${EarningsPeriodToggle(period)}
        <div id="earnings-hero-wrap">${EarningsHeroCard(summary, period)}</div>

        <div class="detail-card">
          ${SectionHeading(period === 'monthly' ? 'الأرباح خلال 6 أشهر' : 'الأرباح خلال الأسبوع')}
          <div id="earnings-chart-wrap">${EarningsBarChart(summary.rows)}</div>
        </div>

        <div class="stats-grid">
          <div class="stat-block"><span class="stat-value" dir="ltr" id="earnings-stat-trips">${summary.trips}</span><span class="stat-label">رحلات مكتملة</span></div>
          <div class="stat-block"><span class="stat-value" dir="ltr" id="earnings-stat-best">${formatPrice(summary.best.value)}</span><span class="stat-label">أفضل ${period === 'monthly' ? 'شهر' : 'يوم'} (${summary.best.label})</span></div>
        </div>

        <div class="detail-card">
          ${SectionHeading('أحدث الأرباح')}
          <div class="wallet-tx-list" id="earnings-recent-list">
            ${DRIVER_EARNINGS_HISTORY.map((e) => EarningsRow(e)).join('')}
          </div>
        </div>
      </div>
      ${DriverBottomNav('driver-profile')}
    </div>
  `;
}

/* ============================================================
   Driver — Wallet
   ============================================================ */
function renderDriverWallet() {
  return `
    <div class="detail-screen wallet-screen">
      ${AuthTopBar({ backTarget: 'driver-profile', title: 'محفظتي' })}
      <div class="detail-content" id="driver-wallet-content">
        ${DriverWalletBalanceCard()}
        ${DriverWalletQuickActions()}

        <div class="detail-card">
          ${SectionHeading('سجل العمليات')}
          <div class="wallet-tx-list" id="driver-wallet-tx-list">
            ${DRIVER_WALLET_TRANSACTIONS.map((tx) => DriverTransactionRow(tx)).join('')}
          </div>
        </div>
      </div>
      ${DriverWalletActionSheet()}
      ${DriverBottomNav('driver-profile')}
    </div>
  `;
}

/* ============================================================
   Driver — Ratings
   ============================================================ */
function renderDriverRatings() {
  const total = getDriverReviewCount();
  const breakdownHtml = [5, 4, 3, 2, 1].map((star) => RatingBreakdownRow(star, DRIVER_RATING_BREAKDOWN[star], total)).join('');
  return `
    <div class="detail-screen ratings-screen">
      ${AuthTopBar({ backTarget: 'driver-profile', title: 'التقييمات' })}
      <div class="detail-content">
        ${DriverRatingHeroCard()}

        <div class="detail-card">
          ${SectionHeading('توزيع التقييمات')}
          <div class="rating-breakdown-list">${breakdownHtml}</div>
        </div>

        <div class="detail-card">
          ${SectionHeading('آراء العملاء')}
          <div class="review-list" id="driver-reviews-list">
            ${DRIVER_REVIEWS.map((r) => ReviewRow(r)).join('')}
          </div>
        </div>
      </div>
      ${DriverBottomNav('driver-profile')}
    </div>
  `;
}

/* ============================================================
   Driver — Profile (standalone page)
   ============================================================ */
function renderDriverProfile() {
  const d = DRIVER_INFO;
  return `
    <div class="profile-screen">
      ${AuthTopBar({ backTarget: 'driver-home', title: 'حسابي', actionIcon: Icon.settings, actionId: 'driver-profile-settings-btn' })}

      <div class="profile-hero-card">
        <div class="profile-avatar-wrap">
          <div class="profile-avatar" id="driver-profile-avatar">${ProfileAvatar(d)}</div>
          <button class="profile-avatar-edit-btn" id="driver-profile-avatar-edit-btn" aria-label="تغيير الصورة الشخصية">${Icon.camera}</button>
        </div>
        <span class="profile-hero-name" id="driver-profile-hero-name">${d.name}</span>
        <span class="profile-hero-phone" dir="ltr" id="driver-profile-hero-phone">${d.phone}</span>
        <span class="profile-hero-city-badge">${Icon.localTruck}<span>${d.vehicle} • <span dir="ltr">${d.plate}</span></span></span>
      </div>

      <div class="detail-content">
        <div class="stats-grid">
          <div class="stat-block"><span class="stat-value" dir="ltr">${d.rating.toFixed(1)}</span><span class="stat-label">التقييم العام</span></div>
          <div class="stat-block"><span class="stat-value" dir="ltr">${d.trips.toLocaleString('en-US')}</span><span class="stat-label">رحلة منجزة</span></div>
        </div>

        <div class="detail-card">
          <div class="menu-list">
            ${MenuRow({ id: 'driver-profile-earnings-btn', icon: 'wallet', label: 'الأرباح', sub: 'إحصائيات أسبوعية وشهرية' })}
            ${MenuRow({ id: 'driver-profile-wallet-btn', icon: 'card', label: 'محفظتي', sub: formatPrice(DRIVER_WALLET.balance) })}
            ${MenuRow({ id: 'driver-profile-ratings-btn', icon: 'star', label: 'التقييمات', sub: `${d.rating.toFixed(1)} من 5 (${getDriverReviewCount().toLocaleString('en-US')} تقييم)` })}
          </div>
        </div>

        <div class="detail-card">
          <span class="profile-section-label">تعديل الملف الشخصي</span>
          <div class="menu-list">
            ${MenuRow({ id: 'driver-profile-edit-photo-btn', icon: 'camera', label: 'تغيير الصورة الشخصية' })}
            ${MenuRow({ id: 'driver-profile-edit-name-btn', icon: 'edit', label: 'تغيير الاسم', sub: d.name })}
            ${MenuRow({ id: 'driver-profile-edit-phone-btn', icon: 'phone', label: 'تغيير رقم الهاتف', sub: d.phone })}
            ${MenuRow({ id: 'driver-profile-edit-vehicle-btn', icon: 'localTruck', label: 'بيانات المركبة', sub: `${d.vehicle} • ${d.plate}` })}
            ${MenuRow({ id: 'driver-profile-edit-password-btn', icon: 'lock', label: 'تغيير كلمة المرور' })}
          </div>
        </div>

        <div class="detail-card">
          <div class="menu-list">
            ${MenuRow({ id: 'driver-profile-settings-link-btn', icon: 'settings', label: 'الإعدادات', sub: 'اللغة، الوضع الليلي، الدعم الفني' })}
          </div>
        </div>

        <div class="detail-actions">
          ${IconGhostButton({ id: 'driver-profile-logout-btn', label: 'تسجيل الخروج', icon: Icon.logout, danger: true })}
        </div>
      </div>

      <div class="home-bottom-spacer"></div>
      ${DriverBottomNav('driver-profile')}
      ${DriverProfileActionSheet()}
    </div>
  `;
}

/* ============================================================
   Driver — Settings (standalone page)
   ============================================================ */
function renderDriverSettings() {
  return `
    <div class="profile-screen">
      ${AuthTopBar({ backTarget: 'driver-profile', title: 'الإعدادات' })}

      <div class="detail-content">
        <div class="detail-card">
          <span class="profile-section-label">التطبيق</span>
          <div class="menu-list">
            ${MenuRow({ id: 'driver-settings-language-btn', icon: 'globe', label: 'اللغة', value: AppState.settings.language === 'ar' ? 'العربية' : 'English' })}
            <div class="menu-row">
              <span class="menu-row-icon">${Icon.moon}</span>
              <span class="menu-row-body">
                <span class="menu-row-label">الوضع الليلي</span>
                <span class="menu-row-sub">تجريبي</span>
              </span>
              ${ToggleSwitch({ id: 'driver-settings-darkmode-toggle', checked: AppState.settings.darkMode })}
            </div>
          </div>
        </div>

        <div class="detail-card">
          <span class="profile-section-label">عن التطبيق</span>
          <div class="menu-list">
            <div class="menu-row app-version-row">
              <span class="menu-row-icon">${Icon.info}</span>
              <span class="menu-row-body"><span class="menu-row-label">إصدار التطبيق</span></span>
              <span class="menu-row-value" dir="ltr">${APP.version}</span>
            </div>
            ${MenuRow({ id: 'driver-settings-privacy-btn', icon: 'fileText', label: 'سياسة الخصوصية' })}
            ${MenuRow({ id: 'driver-settings-terms-btn', icon: 'fileText', label: 'الشروط والأحكام' })}
            ${MenuRow({ id: 'driver-settings-support-btn', icon: 'headset', label: 'تواصل مع الدعم الفني', sub: APP.supportPhone })}
          </div>
        </div>

        <div class="detail-actions">
          ${IconGhostButton({ id: 'driver-settings-logout-btn', label: 'تسجيل الخروج', icon: Icon.logout, danger: true })}
        </div>
      </div>

      <div class="home-bottom-spacer"></div>
      ${DriverBottomNav('driver-profile')}
      ${SettingsInfoSheet()}
    </div>
  `;
}

/* ============================================================
   Admin — Dashboard Home
   ============================================================ */
function renderAdminHome() {
  const stats = ADMIN_STATS;
  const recentOrders = SHIPMENTS.slice(0, 5);

  return `
    <div class="orders-screen admin-screen">
      ${AuthTopBar({ backTarget: 'home', title: 'لوحة تحكم الإدارة', actionIcon: Icon.settings, actionId: 'admin-home-settings-btn' })}

      <div class="detail-content">
        <div class="admin-stats-grid">
          ${AdminStatCard({ icon: 'clipboardList', value: stats.totalOrders, label: 'إجمالي الطلبات', tone: 'primary' })}
          ${AdminStatCard({ icon: 'localTruck', value: stats.activeOrders, label: 'الطلبات النشطة', tone: 'warning' })}
          ${AdminStatCard({ icon: 'checkCircle', value: stats.completedOrders, label: 'الطلبات المكتملة', tone: 'success' })}
          ${AdminStatCard({ icon: 'user', value: stats.totalDrivers, label: 'إجمالي السائقين', tone: 'gray' })}
          ${AdminStatCard({ icon: 'wallet', value: formatPrice(stats.todayRevenue), label: 'إيرادات اليوم', tone: 'primary' })}
        </div>

        <div class="admin-quicklinks">
          <button class="admin-quicklink" data-nav="admin-orders" data-direction="forward">
            <span class="admin-quicklink-icon">${Icon.clipboardList}</span>
            <span class="admin-quicklink-text">
              <span class="admin-quicklink-title">إدارة الطلبات</span>
              <span class="admin-quicklink-sub">عرض وبحث وتصفية كل الطلبات</span>
            </span>
            <span class="admin-row-chevron">${Icon.chevronLeft}</span>
          </button>
          <button class="admin-quicklink" data-nav="admin-drivers" data-direction="forward">
            <span class="admin-quicklink-icon">${Icon.localTruck}</span>
            <span class="admin-quicklink-text">
              <span class="admin-quicklink-title">إدارة السائقين</span>
              <span class="admin-quicklink-sub">متابعة حالة السائقين وأدائهم</span>
            </span>
            <span class="admin-row-chevron">${Icon.chevronLeft}</span>
          </button>
          <button class="admin-quicklink" data-nav="admin-customers" data-direction="forward">
            <span class="admin-quicklink-icon">${Icon.user}</span>
            <span class="admin-quicklink-text">
              <span class="admin-quicklink-title">إدارة العملاء</span>
              <span class="admin-quicklink-sub">عرض وبحث وتصفية بيانات العملاء</span>
            </span>
            <span class="admin-row-chevron">${Icon.chevronLeft}</span>
          </button>
          <button class="admin-quicklink" data-nav="admin-reports" data-direction="forward">
            <span class="admin-quicklink-icon">${Icon.fileText}</span>
            <span class="admin-quicklink-text">
              <span class="admin-quicklink-title">التقارير</span>
              <span class="admin-quicklink-sub">الإيرادات وإحصائيات الشحنات والأداء</span>
            </span>
            <span class="admin-row-chevron">${Icon.chevronLeft}</span>
          </button>
        </div>

        <div class="detail-card">
          ${SectionHeading('أحدث الطلبات')}
          <div class="admin-mini-list">
            ${recentOrders.map((s) => `
              <button class="admin-mini-row" data-admin-order-id="${s.id}">
                <span class="order-card-code" dir="ltr">#${s.trackingNumber}</span>
                <span class="admin-mini-row-sub">${s.sender.city} ← ${s.receiver.city}</span>
                ${StatusBadge(s.status, 'sm')}
              </button>
            `).join('')}
          </div>
        </div>
      </div>

      <div class="orders-bottom-spacer"></div>
      ${AdminBottomNav('admin-home')}
    </div>
  `;
}

/* ============================================================
   Admin — Orders Management
   ============================================================ */
function renderAdminOrders() {
  return `
    <div class="orders-screen admin-screen">
      ${AuthTopBar({ backTarget: 'admin-home', title: 'إدارة الطلبات' })}

      <div class="orders-search-wrap">
        <div class="field-shell orders-search-shell">
          <span class="field-icon">${Icon.search}</span>
          <input id="admin-orders-search-input" type="text" class="field-input" placeholder="ابحث برقم الشحنة أو اسم العميل" />
        </div>
      </div>

      <div class="orders-filters">
        ${FilterChips(ORDER_FILTERS, 'all')}
      </div>

      <div class="admin-list" id="admin-orders-list">
        ${SHIPMENTS.map((s) => AdminOrderRow(s)).join('')}
      </div>

      <div class="orders-empty hidden" id="admin-orders-empty">
        <span>${Icon.packageSearch}</span>
        <p>لا توجد طلبات مطابقة لبحثك</p>
      </div>

      <div class="orders-bottom-spacer"></div>
      ${AdminBottomNav('admin-orders')}
    </div>
  `;
}

/* ============================================================
   Admin — Order Details
   ============================================================ */
function renderAdminOrderDetails(params = {}) {
  const shipment = getShipmentById(params.id) || SHIPMENTS[0];
  const driver = getAdminDriverForOrder(shipment);
  return `
    <div class="detail-screen admin-screen">
      ${AuthTopBar({ backTarget: 'admin-orders', title: 'تفاصيل الطلب' })}
      <div class="detail-content" id="admin-order-detail-content" data-order-id="${shipment.id}">
        ${ShipmentDetailBody(shipment)}
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
      </div>
    </div>
  `;
}

/* ============================================================
   Admin — Drivers Management
   ============================================================ */
function renderAdminDrivers() {
  return `
    <div class="orders-screen admin-screen">
      ${AuthTopBar({ backTarget: 'admin-home', title: 'إدارة السائقين' })}

      <div class="orders-search-wrap">
        <div class="field-shell orders-search-shell">
          <span class="field-icon">${Icon.search}</span>
          <input id="admin-drivers-search-input" type="text" class="field-input" placeholder="ابحث بالاسم أو الهاتف أو رقم اللوحة" />
        </div>
      </div>

      <div class="orders-filters">
        ${FilterChips(ADMIN_DRIVER_FILTERS, 'all')}
      </div>

      <div class="admin-list" id="admin-drivers-list">
        ${ADMIN_DRIVERS.map((d) => AdminDriverRow(d)).join('')}
      </div>

      <div class="orders-empty hidden" id="admin-drivers-empty">
        <span>${Icon.packageSearch}</span>
        <p>لا يوجد سائقين مطابقين لبحثك</p>
      </div>

      <div class="orders-bottom-spacer"></div>
      ${AdminBottomNav('admin-drivers')}
    </div>
  `;
}

/* ============================================================
   Admin — Driver Details
   ============================================================ */
function renderAdminDriverDetails(params = {}) {
  const driver = getAdminDriverById(params.id) || ADMIN_DRIVERS[0];
  const initials = driver.name.split(' ').slice(0, 2).map((w) => w[0]).join('');
  return `
    <div class="detail-screen admin-screen">
      ${AuthTopBar({ backTarget: 'admin-drivers', title: 'تفاصيل السائق' })}
      <div class="detail-content" id="admin-driver-detail-content" data-driver-id="${driver.id}">

        <div class="detail-card">
          <div class="lt-driver-row">
            <span class="lt-driver-avatar admin-driver-avatar-lg">${initials}</span>
            <div class="lt-driver-info">
              <span class="lt-driver-name">${driver.name}</span>
              <span class="lt-driver-rating">${Icon.star}<b>${driver.rating}</b><small>تقييم السائق</small></span>
              <span class="lt-driver-vehicle">${Icon.localTruck}<span>${driver.vehicle} • <span dir="ltr">${driver.plate}</span></span></span>
            </div>
          </div>
          <div class="admin-driver-status-row" id="admin-driver-status-row" data-current-status="${driver.status}">
            ${AdminDriverStatusBadge(driver.status)}
          </div>
          <div class="lt-driver-actions">
            <a class="detail-call-btn" href="tel:${driver.phone}" aria-label="اتصال بالسائق">${Icon.phone}</a>
            <button class="detail-call-btn" id="admin-driver-msg-btn" aria-label="مراسلة السائق">${Icon.message}</button>
          </div>
        </div>

        <div class="detail-card">
          ${SectionHeading('معلومات السائق')}
          <div class="detail-info-grid">
            <div class="detail-info-tile"><span>${Icon.phone}</span><b dir="ltr">${driver.phone}</b><small>رقم الهاتف</small></div>
            <div class="detail-info-tile"><span>${Icon.mapPinLine}</span><b>${driver.city}</b><small>المحافظة</small></div>
            <div class="detail-info-tile"><span>${Icon.checkCircle}</span><b dir="ltr">${driver.completedOrders}</b><small>طلبات مكتملة</small></div>
            <div class="detail-info-tile"><span>${Icon.localTruck}</span><b dir="ltr">${driver.activeOrders}</b><small>طلبات نشطة</small></div>
            <div class="detail-info-tile"><span>${Icon.calendar}</span><b>${formatLongDate(driver.joinDate)}</b><small>تاريخ الانضمام</small></div>
            <div class="detail-info-tile"><span>${Icon.star}</span><b dir="ltr">${driver.rating}</b><small>التقييم</small></div>
          </div>
        </div>

        <div class="detail-card">
          ${SectionHeading('تحديث الحالة')}
          <div class="admin-status-actions">
            ${ADMIN_DRIVER_STATUSES.map((s) => `
              <button class="filter-chip ${s.id === driver.status ? 'filter-chip-active' : ''}" data-set-driver-status="${s.id}">${s.label}</button>
            `).join('')}
          </div>
        </div>

      </div>
    </div>
  `;
}

/* ============================================================
   Admin — Customers Management
   ============================================================ */
function renderAdminCustomers() {
  return `
    <div class="orders-screen admin-screen">
      ${AuthTopBar({ backTarget: 'admin-home', title: 'إدارة العملاء' })}

      <div class="orders-search-wrap">
        <div class="field-shell orders-search-shell">
          <span class="field-icon">${Icon.search}</span>
          <input id="admin-customers-search-input" type="text" class="field-input" placeholder="ابحث بالاسم أو الهاتف أو المدينة" />
        </div>
      </div>

      <div class="orders-filters">
        ${FilterChips(CUSTOMER_FILTERS, 'all')}
      </div>

      <div class="admin-list" id="admin-customers-list">
        ${ADMIN_CUSTOMERS.map((c) => AdminCustomerRow(c)).join('')}
      </div>

      <div class="orders-empty hidden" id="admin-customers-empty">
        <span>${Icon.packageSearch}</span>
        <p>لا يوجد عملاء مطابقين لبحثك</p>
      </div>

      <div class="orders-bottom-spacer"></div>
      ${AdminBottomNav('admin-customers')}
    </div>
  `;
}

/* ============================================================
   Admin — Customer Details
   ============================================================ */
function renderAdminCustomerDetails(params = {}) {
  const customer = getAdminCustomerById(params.id) || ADMIN_CUSTOMERS[0];
  const initials = customer.name.split(' ').slice(0, 2).map((w) => w[0]).join('');
  const orders = getCustomerOrders(customer);
  return `
    <div class="detail-screen admin-screen">
      ${AuthTopBar({ backTarget: 'admin-customers', title: 'تفاصيل العميل' })}
      <div class="detail-content" id="admin-customer-detail-content" data-customer-id="${customer.id}">

        <div class="detail-card">
          <div class="lt-driver-row">
            <span class="lt-driver-avatar admin-driver-avatar-lg">${initials}</span>
            <div class="lt-driver-info">
              <span class="lt-driver-name">${customer.name}</span>
              <span class="lt-driver-rating">${Icon.star}<b>${customer.rating}</b><small>تقييم العميل</small></span>
              <span class="lt-driver-vehicle">${Icon.mapPinLine}<span>${customer.city}</span></span>
            </div>
          </div>
          <div class="admin-driver-status-row" id="admin-customer-status-row" data-current-status="${customer.status}">
            ${CustomerStatusBadge(customer.status)}
          </div>
          <div class="lt-driver-actions">
            <a class="detail-call-btn" href="tel:${customer.phone}" aria-label="اتصال بالعميل">${Icon.phone}</a>
            <button class="detail-call-btn" id="admin-customer-msg-btn" aria-label="مراسلة العميل">${Icon.message}</button>
          </div>
        </div>

        <div class="detail-card">
          ${SectionHeading('معلومات العميل')}
          <div class="detail-info-grid">
            <div class="detail-info-tile"><span>${Icon.phone}</span><b dir="ltr">${customer.phone}</b><small>رقم الهاتف</small></div>
            <div class="detail-info-tile"><span>${Icon.mapPinLine}</span><b>${customer.city}</b><small>المدينة</small></div>
            <div class="detail-info-tile"><span>${Icon.box}</span><b dir="ltr">${customer.totalOrders}</b><small>إجمالي الطلبات</small></div>
            <div class="detail-info-tile"><span>${Icon.wallet}</span><b dir="ltr">${formatPrice(customer.totalSpent)}</b><small>إجمالي الإنفاق</small></div>
            <div class="detail-info-tile"><span>${Icon.calendar}</span><b>${formatLongDate(customer.joinDate)}</b><small>تاريخ الانضمام</small></div>
            <div class="detail-info-tile"><span>${Icon.star}</span><b dir="ltr">${customer.rating}</b><small>التقييم</small></div>
          </div>
        </div>

        <div class="detail-card">
          ${SectionHeading('سجل الطلبات')}
          <div class="admin-mini-list" id="admin-customer-orders-list">
            ${orders.length ? orders.map((s) => `
              <button class="admin-mini-row" data-admin-order-id="${s.id}">
                <span class="order-card-code" dir="ltr">#${s.trackingNumber}</span>
                <span class="admin-mini-row-sub">${s.sender.city} ← ${s.receiver.city}</span>
                ${StatusBadge(s.status, 'sm')}
              </button>
            `).join('') : `<p class="admin-row-sub">لا توجد طلبات سابقة لهذا العميل</p>`}
          </div>
        </div>

        <div class="detail-card">
          ${SectionHeading('تحديث الحالة')}
          <div class="admin-status-actions">
            ${CUSTOMER_STATUSES.map((s) => `
              <button class="filter-chip ${s.id === customer.status ? 'filter-chip-active' : ''}" data-set-customer-status="${s.id}">${s.label}</button>
            `).join('')}
          </div>
        </div>

      </div>
    </div>
  `;
}

/* ============================================================
   Admin — Reports
   ============================================================ */
function renderAdminReports() {
  return `
    <div class="orders-screen admin-screen">
      ${AuthTopBar({ backTarget: 'admin-home', title: 'التقارير', actionIcon: Icon.fileText, actionId: 'admin-reports-export-btn' })}

      <div class="detail-content">

        ${RevenueCardsGrid()}

        <div class="detail-card">
          ${SectionHeading('الإيرادات الشهرية')}
          ${EarningsBarChart(MONTHLY_REVENUE)}
        </div>

        <div class="detail-card">
          ${SectionHeading('إحصائيات الشحنات')}
          <div class="stat-bar-list">
            ${SHIPMENT_STATS.map((s) => ShipmentStatRow(s)).join('')}
          </div>
        </div>

        <div class="detail-card">
          ${SectionHeading('أفضل السائقين')}
          <div class="admin-mini-list">
            ${TOP_DRIVERS.map((d, i) => TopDriverRow(d, i + 1)).join('')}
          </div>
        </div>

        <div class="detail-card">
          ${SectionHeading('أفضل العملاء')}
          <div class="admin-mini-list">
            ${TOP_CUSTOMERS.map((c, i) => TopCustomerRow(c, i + 1)).join('')}
          </div>
        </div>

      </div>

      <div class="orders-bottom-spacer"></div>
      ${AdminBottomNav('admin-reports')}
    </div>
  `;
}

/* ============================================================
   Admin — Settings
   (Company Settings, Admin Profile, Security, Change Password, Logout)
   ============================================================ */
function renderAdminSettings() {
  const admin = ADMIN_INFO;
  const company = COMPANY_SETTINGS;
  return `
    <div class="profile-screen">
      ${AuthTopBar({ backTarget: 'admin-home', title: 'إعدادات الإدارة' })}

      <div class="profile-hero-card">
        <div class="profile-avatar-wrap">
          <div class="profile-avatar" id="admin-settings-avatar">${ProfileAvatar(admin)}</div>
          <button class="profile-avatar-edit-btn" id="admin-settings-avatar-edit-btn" aria-label="تغيير الصورة الشخصية">${Icon.camera}</button>
        </div>
        <span class="profile-hero-name" id="admin-settings-hero-name">${admin.name}</span>
        <span class="profile-hero-phone" dir="ltr" id="admin-settings-hero-phone">${admin.phone}</span>
        <span class="profile-hero-city-badge">${Icon.shieldCheck}<span>${admin.role}</span></span>
      </div>

      <div class="detail-content">
        <div class="detail-card">
          <span class="profile-section-label">إعدادات الشركة</span>
          <div class="menu-list">
            ${MenuRow({ id: 'admin-settings-company-name-btn', icon: 'building', label: 'اسم الشركة', sub: company.name })}
            ${MenuRow({ id: 'admin-settings-company-phone-btn', icon: 'phone', label: 'رقم هاتف الشركة', sub: company.phone })}
            ${MenuRow({ id: 'admin-settings-company-email-btn', icon: 'mail', label: 'البريد الإلكتروني للشركة', sub: company.email })}
            ${MenuRow({ id: 'admin-settings-company-address-btn', icon: 'mapPinLine', label: 'عنوان الشركة', sub: company.address })}
          </div>
        </div>

        <div class="detail-card">
          <span class="profile-section-label">الملف الشخصي للمدير</span>
          <div class="menu-list">
            ${MenuRow({ id: 'admin-settings-edit-photo-btn', icon: 'camera', label: 'تغيير الصورة الشخصية' })}
            ${MenuRow({ id: 'admin-settings-edit-name-btn', icon: 'edit', label: 'تغيير الاسم', sub: admin.name })}
            ${MenuRow({ id: 'admin-settings-edit-phone-btn', icon: 'phone', label: 'تغيير رقم الهاتف', sub: admin.phone })}
            ${MenuRow({ id: 'admin-settings-edit-email-btn', icon: 'mail', label: 'تغيير البريد الإلكتروني', sub: admin.email })}
          </div>
        </div>

        <div class="detail-card">
          <span class="profile-section-label">الأمان</span>
          <div class="menu-list">
            <div class="menu-row">
              <span class="menu-row-icon">${Icon.shieldCheck}</span>
              <span class="menu-row-body">
                <span class="menu-row-label">التحقق بخطوتين</span>
                <span class="menu-row-sub">حماية إضافية عند تسجيل الدخول</span>
              </span>
              ${ToggleSwitch({ id: 'admin-settings-2fa-toggle', checked: ADMIN_SECURITY.twoFactor })}
            </div>
            <div class="menu-row">
              <span class="menu-row-icon">${Icon.bell}</span>
              <span class="menu-row-body">
                <span class="menu-row-label">تنبيهات تسجيل الدخول</span>
                <span class="menu-row-sub">إشعار عند دخول جديد إلى الحساب</span>
              </span>
              ${ToggleSwitch({ id: 'admin-settings-login-alerts-toggle', checked: ADMIN_SECURITY.loginAlerts })}
            </div>
            <div class="menu-row app-version-row">
              <span class="menu-row-icon">${Icon.clock}</span>
              <span class="menu-row-body"><span class="menu-row-label">آخر تسجيل دخول</span></span>
              <span class="menu-row-value">${ADMIN_SECURITY.lastLogin}</span>
            </div>
            ${MenuRow({ id: 'admin-settings-change-password-btn', icon: 'lock', label: 'تغيير كلمة المرور' })}
          </div>
        </div>

        <div class="detail-actions">
          ${IconGhostButton({ id: 'admin-settings-logout-btn', label: 'تسجيل الخروج', icon: Icon.logout, danger: true })}
        </div>
      </div>

      <div class="home-bottom-spacer"></div>
      ${AdminBottomNav('admin-home')}
      ${AdminSettingsActionSheet()}
    </div>
  `;
}
