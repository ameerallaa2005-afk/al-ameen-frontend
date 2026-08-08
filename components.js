/* ============================================================
   components.js — Reusable UI building blocks.
   Every function returns an HTML string OR mounts a live widget.
   ============================================================ */

/* ---------------- Icon set (inline SVG, stroke-based) ---------------- */
const Icon = {
  phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  lock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  eye: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
  eyeOff: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a20.3 20.3 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a20.3 20.3 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`,
  user: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  city: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 9h1m4 0h1m-6 4h1m4 0h1m-6 4h1m4 0h1"/></svg>`,
  chevronLeft: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`,
  chevronRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  checkCircle: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  alert: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  route: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="19" r="3"/><circle cx="18" cy="5" r="3"/><path d="M9 19h8a3 3 0 0 0 3-3v-1a3 3 0 0 0-3-3H7a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3h1"/></svg>`,
  card: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`,
  arrowLeft: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`,
  bell: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
  menu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
  close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  plane: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3.5 20.5 3 18.5 3.5 17 5l-3.5 3.5L5.3 6.7c-.5-.1-1 0-1.3.4l-.7.7 4 2.3-2 2H2.5l-1 1L4 14.5 5.5 17l1-1v-2.8l2 4 .7-.7c.4-.4.5-.9.4-1.3z"/></svg>`,
  ship: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20a4.7 4.7 0 0 0 4 2 4.7 4.7 0 0 0 4-2 4.7 4.7 0 0 0 4 2 4.7 4.7 0 0 0 4-2 4.7 4.7 0 0 0 4 2"/><path d="M4 18 2.5 12h19L20 18"/><path d="M6 12V7h4l3 5"/><path d="M12 7V3h3l3 4"/></svg>`,
  localTruck: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="6" width="14" height="11" rx="1"/><path d="M15 9h4l3 3v5h-7z"/><circle cx="6" cy="19" r="2"/><circle cx="17.5" cy="19" r="2"/></svg>`,
  box: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8 12 3 3 8l9 5 9-5z"/><path d="M3 8v9l9 5 9-5V8"/><path d="M12 13v9"/></svg>`,
  headset: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 14v-2a9 9 0 0 1 18 0v2"/><rect x="1.5" y="14" width="5" height="7" rx="2"/><rect x="17.5" y="14" width="5" height="7" rx="2"/><path d="M19.5 21a5 5 0 0 1-5 3.2"/></svg>`,
  shieldCheck: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>`,
  bolt: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  tag: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41 11 3.83A2 2 0 0 0 9.5 3H4a1 1 0 0 0-1 1v5.5c0 .53.21 1.04.59 1.41l9.58 9.59a2 2 0 0 0 2.83 0l4.59-4.59a2 2 0 0 0 0-2.83z"/><circle cx="7.5" cy="7.5" r="1.5"/></svg>`,
  packageSearch: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8 12 3 3 8l9 5 9-5z"/><path d="M3 8v9l9 5 9-5V8"/><path d="M12 13v9"/></svg>`,
  gift: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M19 12v9H5v-9"/><path d="M12 8c-1.5-4-6-4-6-1.5S9 8 12 8zM12 8c1.5-4 6-4 6-1.5S15 8 12 8z"/></svg>`,
  copy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`,
  home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/></svg>`,
  clipboardList: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M9 3v3h6V3M8 11h8M8 15h5"/></svg>`,
  mapPinLine: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  logout: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15.5 14"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></svg>`,
  wallet: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a2 2 0 0 1 2-2h13a1 1 0 0 1 1 1v3"/><path d="M3 7v10a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1H5a2 2 0 0 1-2-2z"/><circle cx="16.5" cy="14.5" r="1.2"/></svg>`,
  scale: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="2"/><path d="M12 7v3M5 21l2.5-9h9L19 21"/><path d="M4 21h16"/></svg>`,
  plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  receipt: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9"/><path d="M3 15h18v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M8 10h8M8 13h5"/></svg>`,
  xCircle: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
  star: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  message: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5A8.44 8.44 0 0 1 4 15.5 8.38 8.38 0 0 1 12.5 3a8.5 8.5 0 0 1 8.5 8.5z"/><path d="M8 12h.01M12 12h.01M16 12h.01"/></svg>`,
  settings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  moon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
  camera: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>`,
  edit: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z"/></svg>`,
  fileText: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
  grid: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="3" width="8" height="8" rx="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5"/><rect x="13" y="13" width="8" height="8" rx="1.5"/></svg>`,
  trash: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>`,
  building: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="1"/><line x1="9" y1="6" x2="9" y2="6.01"/><line x1="15" y1="6" x2="15" y2="6.01"/><line x1="9" y1="10" x2="9" y2="10.01"/><line x1="15" y1="10" x2="15" y2="10.01"/><line x1="9" y1="14" x2="9" y2="14.01"/><line x1="15" y1="14" x2="15" y2="14.01"/><path d="M9 22v-4h6v4"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg>`,
};

/* ---------------- Toast notifications ---------------- */
let toastContainer;
function ensureToastContainer() {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-stack';
    toastContainer.className = 'toast-stack';
    document.body.appendChild(toastContainer);
  }
  return toastContainer;
}

function showToast(message, type = 'info', duration = 3000) {
  const stack = ensureToastContainer();
  const palette = {
    success: { bg: 'bg-emerald-600', icon: Icon.checkCircle },
    error: { bg: 'bg-rose-600', icon: Icon.alert },
    info: { bg: 'bg-[#241E33]', icon: Icon.info },
  };
  const p = palette[type] || palette.info;

  const el = document.createElement('div');
  el.className = `toast-item ${p.bg} text-white`;
  el.innerHTML = `
    <span class="toast-icon">${p.icon}</span>
    <span class="toast-msg">${message}</span>
  `;
  stack.appendChild(el);

  requestAnimationFrame(() => el.classList.add('toast-in'));

  setTimeout(() => {
    el.classList.remove('toast-in');
    el.classList.add('toast-out');
    setTimeout(() => el.remove(), 260);
  }, duration);
}

/* ---------------- Text input field ---------------- */
function InputField({ id, type = 'text', label, placeholder, icon, dir = 'rtl', rightSlotId = null, hint = null, inputmode = null, maxlength = null, value = '' }) {
  return `
    <div class="field-group" data-field="${id}">
      <label for="${id}" class="field-label">${label}</label>
      <div class="field-shell">
        ${icon ? `<span class="field-icon">${icon}</span>` : ''}
        <input
          id="${id}"
          type="${type}"
          class="field-input"
          placeholder="${placeholder || ''}"
          dir="${dir}"
          autocomplete="off"
          value="${value || ''}"
          ${inputmode ? `inputmode="${inputmode}"` : ''}
          ${maxlength ? `maxlength="${maxlength}"` : ''}
        />
        ${rightSlotId ? `<span class="field-right" id="${rightSlotId}"></span>` : ''}
      </div>
      <p class="field-error" id="${id}-error"></p>
      ${hint ? `<p class="field-hint">${hint}</p>` : ''}
    </div>
  `;
}

/* ---------------- Select field (native, styled) ---------------- */
function SelectField({ id, label, icon, placeholder, options }) {
  return `
    <div class="field-group" data-field="${id}">
      <label for="${id}" class="field-label">${label}</label>
      <div class="field-shell">
        ${icon ? `<span class="field-icon">${icon}</span>` : ''}
        <select id="${id}" class="field-input field-select">
          <option value="" disabled selected>${placeholder}</option>
          ${options.map((o) => `<option value="${o}">${o}</option>`).join('')}
        </select>
        <span class="field-right select-caret">${Icon.chevronLeft}</span>
      </div>
      <p class="field-error" id="${id}-error"></p>
    </div>
  `;
}

/* ---------------- Primary / secondary buttons ---------------- */
function PrimaryButton({ id, label, icon = null, full = true }) {
  return `
    <button id="${id}" class="btn-primary ${full ? 'w-full' : ''}">
      <span class="btn-label">${label}</span>
      ${icon ? `<span class="btn-icon">${icon}</span>` : ''}
      <span class="btn-spinner hidden"></span>
    </button>
  `;
}

function GhostButton({ id, label }) {
  return `<button id="${id}" class="btn-ghost">${label}</button>`;
}

/* Ghost button with a leading icon (used on order/shipment detail actions) */
function IconGhostButton({ id, label, icon, danger = false, full = true }) {
  return `
    <button id="${id}" class="btn-ghost btn-ghost-icon ${danger ? 'btn-ghost-danger' : ''} ${full ? 'w-full' : ''}">
      <span class="btn-ghost-icon-slot">${icon}</span>
      <span>${label}</span>
    </button>
  `;
}

/* Toggle a button between idle / loading state */
function setButtonLoading(btnId, loading) {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  const label = btn.querySelector('.btn-label');
  const icon = btn.querySelector('.btn-icon');
  const spinner = btn.querySelector('.btn-spinner');
  btn.disabled = loading;
  btn.classList.toggle('is-loading', loading);
  if (label) label.classList.toggle('invisible', loading);
  if (icon) icon.classList.toggle('invisible', loading);
  if (spinner) spinner.classList.toggle('hidden', !loading);
}

/* ---------------- Field error helpers ---------------- */
function setFieldError(id, message) {
  const wrap = document.querySelector(`[data-field="${id}"]`);
  const err = document.getElementById(`${id}-error`);
  if (!wrap || !err) return;
  wrap.classList.add('has-error');
  err.textContent = message;
  const shell = wrap.querySelector('.field-shell');
  shell.classList.remove('shake');
  void shell.offsetWidth;
  shell.classList.add('shake');
}

function clearFieldError(id) {
  const wrap = document.querySelector(`[data-field="${id}"]`);
  const err = document.getElementById(`${id}-error`);
  if (!wrap || !err) return;
  wrap.classList.remove('has-error');
  err.textContent = '';
}

function clearAllErrors(scope = document) {
  scope.querySelectorAll('.field-group').forEach((g) => {
    g.classList.remove('has-error');
    const err = g.querySelector('.field-error');
    if (err) err.textContent = '';
  });
}

/* ---------------- Progress dots (onboarding) ---------------- */
function ProgressDots(total, active) {
  let dots = '';
  for (let i = 0; i < total; i++) {
    dots += `<span class="dot ${i === active ? 'dot-active' : ''}"></span>`;
  }
  return `<div class="dots-row">${dots}</div>`;
}

/* ---------------- Brand header (logo lockup) ---------------- */
function BrandMark({ size = 'md', withName = true } = {}) {
  const dims = { sm: 34, md: 44, lg: 96 }[size];
  return `
    <div class="brand-mark">
      <img src="assets/logo.png" alt="${APP.name}" style="width:${dims}px;height:${dims}px" class="brand-logo-img" />
      ${withName ? `<span class="brand-name">${APP.name}</span>` : ''}
    </div>
  `;
}

/* ---------------- Top bar for auth screens (back + brand) ---------------- */
function AuthTopBar({ backTarget = null, title = '', actionIcon = null, actionId = null } = {}) {
  return `
    <div class="auth-topbar">
      ${backTarget ? `<button class="icon-btn" data-nav="${backTarget}" aria-label="رجوع">${Icon.chevronRight}</button>` : '<span class="icon-btn-spacer"></span>'}
      <span class="auth-topbar-title">${title}</span>
      ${actionIcon ? `<button class="icon-btn" id="${actionId}">${actionIcon}</button>` : '<span class="icon-btn-spacer"></span>'}
    </div>
  `;
}

/* ---------------- OTP boxes ---------------- */
function OtpBoxes(count = 4) {
  let boxes = '';
  for (let i = 0; i < count; i++) {
    boxes += `<input type="tel" inputmode="numeric" maxlength="1" class="otp-box" data-otp-index="${i}" />`;
  }
  return `<div class="otp-row" dir="ltr">${boxes}</div>`;
}

/* ---------------- Checkbox row (terms / remember me) ---------------- */
function CheckboxRow({ id, label }) {
  return `
    <label class="checkbox-row" for="${id}">
      <input type="checkbox" id="${id}" class="checkbox-input" />
      <span class="checkbox-box">${Icon.check}</span>
      <span class="checkbox-label">${label}</span>
    </label>
  `;
}

/* ============================================================
   Home-page specific components
   ============================================================ */

/* ---------------- Bottom navigation bar ---------------- */
const BOTTOM_NAV_ITEMS = [
  { id: 'orders', label: 'طلباتي', icon: 'clipboardList' },
  { id: 'track', label: 'تتبع الشحنة', icon: 'mapPinLine' },
  { id: 'home', label: 'الرئيسية', icon: 'home' },
  { id: 'notifications', label: 'الإشعارات', icon: 'bell', badge: true },
  { id: 'account', label: 'حسابي', icon: 'user' },
];

function BottomNav(active = 'home') {
  const items = BOTTOM_NAV_ITEMS.map((item) => {
    const isActive = item.id === active;
    const isCenter = item.id === 'home';
    return `
      <button class="bn-item ${isActive ? 'bn-item-active' : ''} ${isCenter ? 'bn-item-center' : ''}" data-bn="${item.id}">
        <span class="bn-icon-wrap">
          <span class="bn-icon">${Icon[item.icon]}</span>
          ${item.badge ? `<span class="bn-badge" id="bn-notif-badge">3</span>` : ''}
        </span>
        <span class="bn-label">${item.label}</span>
      </button>
    `;
  }).join('');
  return `<nav class="bottom-nav" id="bottom-nav">${items}</nav>`;
}

/* ---------------- Service card (home) ---------------- */
function ServiceCard({ id, title, desc, icon }) {
  const photo = typeof SERVICE_IMAGES !== 'undefined' ? SERVICE_IMAGES[id] : null;
  return `
    <button class="service-card" data-service="${id}">
      <span class="service-illustration service-illustration-${id} ${photo ? 'service-illustration-photo-wrap' : ''}">
        ${photo
          ? `<img src="${photo}" alt="${title}" class="service-illustration-photo" loading="lazy" decoding="async" width="320" height="213" />
             <span class="service-illustration-shade"></span>
             <span class="service-illustration-glow"></span>`
          : `<span class="service-illustration-blob"></span><span class="service-illustration-icon">${Icon[icon]}</span>`
        }
      </span>
      <span class="service-body">
        <span class="service-title">${title}</span>
        <span class="service-desc">${desc}</span>
      </span>
      <span class="service-arrow">${Icon.chevronLeft}</span>
    </button>
  `;
}

/* ---------------- Advantage tile (home) ---------------- */
function AdvantageTile({ title, desc, icon }) {
  return `
    <div class="adv-tile">
      <span class="adv-icon">${Icon[icon]}</span>
      <span class="adv-title">${title}</span>
      <span class="adv-desc">${desc}</span>
    </div>
  `;
}

/* ---------------- Stat block (home, animated counters) ---------------- */
function StatBlock({ id, value, suffix, label }) {
  return `
    <div class="stat-block">
      <span class="stat-value" id="stat-${id}" data-target="${value}" data-suffix="${suffix}">0</span>
      <span class="stat-label">${label}</span>
    </div>
  `;
}

/* ---------------- Notification bell dropdown panel ---------------- */
function NotificationsPanel() {
  const items = HOME_NOTIFICATIONS.map((n) => `
    <div class="notif-item ${n.unread ? 'notif-unread' : ''}" data-notif="${n.id}">
      <span class="notif-dot"></span>
      <div class="notif-body">
        <span class="notif-title">${n.title}</span>
        <span class="notif-desc">${n.desc}</span>
        <span class="notif-time">${n.time}</span>
      </div>
    </div>
  `).join('');
  return `
    <div class="notif-panel" id="notif-panel">
      <div class="notif-panel-head">
        <span>الإشعارات</span>
        <button class="link-btn link-btn-strong" id="notif-mark-all">تعليم الكل كمقروء</button>
      </div>
      <div class="notif-list">${items}</div>
      <button class="notif-panel-viewall" id="notif-panel-viewall" data-nav="notifications">عرض كل الإشعارات</button>
    </div>
  `;
}

/* ---------------- Side drawer menu ---------------- */
function SideMenu() {
  const links = [
    { id: 'home', label: 'الرئيسية', icon: 'home' },
    { id: 'orders', label: 'طلباتي', icon: 'clipboardList' },
    { id: 'shipment-history', label: 'سجل الشحنات', icon: 'receipt' },
    { id: 'track', label: 'تتبع شحنة', icon: 'mapPinLine' },
    { id: 'wallet', label: 'المحفظة', icon: 'wallet' },
    { id: 'notifications', label: 'الإشعارات', icon: 'bell' },
    { id: 'offers', label: 'العروض والخصومات', icon: 'gift' },
    { id: 'profile', label: 'حسابي', icon: 'user' },
    { id: 'settings', label: 'الإعدادات', icon: 'settings' },
    { id: 'support', label: 'الدعم الفني', icon: 'headset' },
    { id: 'driver-home', label: 'وضع السائق', icon: 'localTruck' },
    { id: 'admin-home', label: 'لوحة تحكم الإدارة', icon: 'grid' },
  ];
  return `
    <div class="side-menu-overlay" id="side-menu-overlay">
      <aside class="side-menu" id="side-menu">
        <div class="side-menu-head">
          ${BrandMark({ size: 'sm' })}
          <button class="icon-btn" id="side-menu-close">${Icon.close}</button>
        </div>
        <nav class="side-menu-links">
          ${links.map((l) => `
            <button class="side-menu-link" data-menu-link="${l.id}">
              <span>${Icon[l.icon]}</span>
              <span>${l.label}</span>
            </button>
          `).join('')}
        </nav>
        <button class="side-menu-logout" id="side-menu-logout">
          <span>${Icon.logout}</span>
          <span>تسجيل الخروج</span>
        </button>
      </aside>
    </div>
  `;
}

/* ============================================================
   Orders / Shipments components
   ============================================================ */

/* ---------------- Status badge (pill) ---------------- */
function StatusBadge(statusId, size = 'md') {
  const meta = getStatusMeta(statusId);
  return `
    <span class="status-badge status-${meta.tone} ${size === 'sm' ? 'status-badge-sm' : ''}">
      <span class="status-badge-icon">${Icon[meta.icon]}</span>
      <span>${meta.label}</span>
    </span>
  `;
}

/* ---------------- Filter chips row ---------------- */
function FilterChips(options, activeId) {
  return `
    <div class="filter-chips-row">
      ${options.map((o) => `<button class="filter-chip ${o.id === activeId ? 'filter-chip-active' : ''}" data-filter="${o.id}">${o.label}</button>`).join('')}
    </div>
  `;
}

/* ---------------- Order card (My Orders grid) ---------------- */
function OrderCard(s) {
  return `
    <button class="order-card" data-order-id="${s.id}">
      <div class="order-card-top">
        <span class="order-card-code" dir="ltr">#${s.trackingNumber}</span>
        ${StatusBadge(s.status, 'sm')}
      </div>
      <div class="order-card-route">
        <span class="order-card-city">${s.sender.city}</span>
        <span class="order-card-route-icon">${Icon.route}</span>
        <span class="order-card-city">${s.receiver.city}</span>
      </div>
      <div class="order-card-bottom">
        <span class="order-card-date">${Icon.calendar}<span>${formatShortDate(s.date)}</span></span>
        <span class="order-card-price" dir="ltr">${formatPrice(s.price)}</span>
      </div>
    </button>
  `;
}

/* ---------------- History row (Shipment History list) ---------------- */
function HistoryRow(s) {
  const meta = getStatusMeta(s.status);
  return `
    <button class="history-row" data-order-id="${s.id}">
      <span class="history-row-dot status-dot-${meta.tone}"></span>
      <div class="history-row-body">
        <div class="history-row-top">
          <span class="history-row-code" dir="ltr">#${s.trackingNumber}</span>
          <span class="history-row-date">${formatShortDate(s.date)}</span>
        </div>
        <span class="history-row-route">${s.sender.city} ← ${s.receiver.city}</span>
        <div class="history-row-bottom">
          ${StatusBadge(s.status, 'sm')}
          <span class="history-row-price" dir="ltr">${formatPrice(s.price)}</span>
        </div>
      </div>
      <span class="history-row-chevron">${Icon.chevronLeft}</span>
    </button>
  `;
}

/* ============================================================
   Driver module components
   (Driver Home, New / Active / Completed Orders)
   ============================================================ */

const DRIVER_BOTTOM_NAV_ITEMS = [
  { id: 'driver-home', label: 'الرئيسية', icon: 'home' },
  { id: 'driver-new-orders', label: 'طلبات جديدة', icon: 'box', badge: true },
  { id: 'driver-active-orders', label: 'قيد التنفيذ', icon: 'localTruck' },
  { id: 'driver-completed-orders', label: 'مكتملة', icon: 'checkCircle' },
  { id: 'driver-profile', label: 'حسابي', icon: 'user' },
];

function DriverBottomNav(active = 'driver-home') {
  const newCount = getDriverOrdersByStatus('new').length;
  const items = DRIVER_BOTTOM_NAV_ITEMS.map((item) => {
    const isActive = item.id === active;
    return `
      <button class="bn-item ${isActive ? 'bn-item-active' : ''}" data-nav="${item.id}">
        <span class="bn-icon-wrap">
          <span class="bn-icon">${Icon[item.icon]}</span>
          ${item.badge ? `<span class="bn-badge" id="bn-driver-new-badge">${newCount}</span>` : ''}
        </span>
        <span class="bn-label">${item.label}</span>
      </button>
    `;
  }).join('');
  return `<nav class="bottom-nav" id="driver-bottom-nav">${items}</nav>`;
}

/* ---------------- Driver order card (New / Active / Completed lists) ---------------- */
function DriverOrderCard(order) {
  let badge = '';
  let actions = '';

  if (order.status === 'new') {
    badge = `<span class="status-badge status-warning">${Icon.alert}<span>طلب جديد</span></span>`;
    actions = `
      <div class="driver-order-actions">
        <button class="btn-primary" data-accept-id="${order.id}"><span class="btn-label">قبول الطلب</span></button>
        <button class="btn-ghost btn-ghost-danger" data-reject-id="${order.id}"><span>رفض الطلب</span></button>
      </div>`;
  } else if (order.status === 'active' && order.stage === 'accepted') {
    badge = `<span class="status-badge status-primary">${Icon.clock}<span>بانتظار البدء</span></span>`;
    actions = `
      <div class="driver-order-actions">
        <button class="btn-primary" data-start-id="${order.id}"><span class="btn-label">بدء التوصيل</span></button>
        <a class="btn-ghost btn-ghost-icon" href="tel:${order.receiver.phone}" aria-label="اتصال بالعميل">${Icon.phone}</a>
      </div>`;
  } else if (order.status === 'active' && order.stage === 'in_progress') {
    badge = `<span class="status-badge status-primary">${Icon.localTruck}<span>قيد التوصيل</span></span>`;
    actions = `
      <div class="driver-order-actions">
        <button class="btn-primary" data-complete-id="${order.id}"><span class="btn-label">إكمال التوصيل</span></button>
        <a class="btn-ghost btn-ghost-icon" href="tel:${order.receiver.phone}" aria-label="اتصال بالعميل">${Icon.phone}</a>
      </div>`;
  } else if (order.status === 'completed') {
    badge = `<span class="status-badge status-success">${Icon.checkCircle}<span>تم التسليم</span></span>`;
  } else if (order.status === 'rejected') {
    badge = `<span class="status-badge status-danger">${Icon.xCircle}<span>مرفوض</span></span>`;
  }

  return `
    <div class="driver-order-card" data-order-id="${order.id}">
      <div class="order-card-top">
        <span class="order-card-code" dir="ltr">#${order.orderNumber}</span>
        ${badge}
      </div>
      <div class="order-card-route">
        <span class="order-card-city">${order.sender.city}</span>
        <span class="order-card-route-icon">${Icon.route}</span>
        <span class="order-card-city">${order.receiver.city}</span>
      </div>
      <div class="driver-order-customer">
        <span class="detail-person-icon">${Icon.user}</span>
        <div class="detail-person-text">
          <span class="detail-person-name">${order.receiver.name}</span>
          <span class="detail-person-phone" dir="ltr">${order.receiver.phone}</span>
        </div>
      </div>
      <div class="order-card-bottom">
        <span class="order-card-date">${Icon.mapPinLine}<span dir="ltr">${order.distanceKm} كم</span> • <span dir="ltr">${formatWeight(order.weight)}</span></span>
        <span class="order-card-price" dir="ltr">${formatPrice(order.fee)}</span>
      </div>
      ${actions}
    </div>
  `;
}

/* ============================================================
   Live Tracking components
   ============================================================ */

/* ---------------- Delivery status header ---------------- */
function DeliveryStatusCard(s) {
  const meta = getStatusMeta(s.status);
  return `
    <div class="lt-status-card">
      <div class="lt-status-top">
        <span class="order-card-code" dir="ltr">#${s.trackingNumber}</span>
        ${StatusBadge(s.status)}
      </div>
      <div class="lt-status-main">
        <span class="lt-status-icon">${Icon[meta.icon]}</span>
        <div class="lt-status-text">
          <span class="lt-status-label">${meta.label}</span>
          <span class="lt-status-eta">${getEtaText(s.status)}</span>
        </div>
      </div>
    </div>
  `;
}

/* ---------------- Fake animated map ---------------- */
function LiveMapCard(s) {
  const isDelivered = s.status === 'delivered';
  const isCancelled = s.status === 'cancelled';
  const isPending = s.status === 'pending' || s.status === 'confirmed';
  const isLive = !isPending && !isDelivered && !isCancelled;
  const liveLabel = isCancelled ? 'الشحنة ملغاة' : isDelivered ? 'تم التسليم' : isPending ? 'بانتظار الانطلاق' : 'تتبع مباشر';

  return `
    <div class="lt-map-wrap">
      <div class="lt-map ${isCancelled ? 'lt-map-muted' : ''}">
        <div class="lt-map-grid"></div>
        <svg class="lt-map-path" viewBox="0 0 320 200" fill="none">
          <path d="M24 168 C 90 60, 170 190, 296 30" stroke="#F1580C" stroke-width="3" stroke-linecap="round" stroke-dasharray="1 12" class="${isLive ? 'lt-path-flow' : ''}"/>
        </svg>
        <span class="lt-map-dot lt-map-dot-start">${Icon.box}</span>
        <span class="lt-map-dot lt-map-dot-end">${Icon.pin}</span>
        ${!isPending && !isCancelled ? `<span class="lt-map-truck ${isDelivered ? 'lt-map-truck-done' : 'lt-map-truck-move'}">${Icon.localTruck}</span>` : ''}
        <div class="lt-map-badge ${isDelivered ? 'lt-map-badge-done' : ''} ${isCancelled ? 'lt-map-badge-off' : ''}">
          ${isLive ? `<span class="pulse-dot"></span>` : ''}
          <span>${liveLabel}</span>
        </div>
      </div>
      <div class="lt-map-cities">
        <span>${Icon.pin}<b>${s.sender.city}</b></span>
        <span class="lt-map-cities-line"></span>
        <span>${Icon.mapPinLine}<b>${s.receiver.city}</b></span>
      </div>
    </div>
  `;
}

/* ---------------- Animated progress bar ---------------- */
function AnimatedProgressBar(s) {
  const percent = getProgressPercent(s.status);
  return `
    <div class="lt-progress-card">
      <div class="lt-progress-head">
        <span>نسبة إنجاز الشحنة</span>
        <span class="lt-progress-percent" id="lt-progress-percent">${percent}%</span>
      </div>
      <div class="lt-progress-track">
        <div class="lt-progress-fill" id="lt-progress-fill" data-target="${percent}" style="width:0%"></div>
      </div>
    </div>
  `;
}

/* ---------------- Driver details ---------------- */
function DriverDetailsCard(s) {
  if (s.status === 'cancelled') return '';

  if (s.status === 'pending' || s.status === 'confirmed') {
    return `
      <div class="detail-card lt-driver-card">
        ${SectionHeading('السائق')}
        <div class="lt-driver-empty-body">
          <span>${Icon.user}</span>
          <p>سيتم تعيين السائق فور تأكيد الشحنة</p>
        </div>
      </div>
    `;
  }

  const driver = getDriverForShipment(s);
  const initials = driver.name.split(' ').slice(0, 2).map((w) => w[0]).join('');

  return `
    <div class="detail-card lt-driver-card">
      ${SectionHeading('معلومات السائق')}
      <div class="lt-driver-row">
        <span class="lt-driver-avatar">${initials}</span>
        <div class="lt-driver-info">
          <span class="lt-driver-name">${driver.name}</span>
          <span class="lt-driver-rating">${Icon.star}<b>${driver.rating}</b><small>(${driver.trips} رحلة)</small></span>
          <span class="lt-driver-vehicle">${Icon.localTruck}<span>${driver.vehicle} • <span dir="ltr">${driver.plate}</span></span></span>
        </div>
      </div>
      <div class="lt-driver-actions">
        <a class="detail-call-btn" href="tel:${driver.phone}" aria-label="اتصال بالسائق">${Icon.phone}</a>
        <button class="detail-call-btn" id="lt-driver-msg-btn" aria-label="مراسلة السائق">${Icon.message}</button>
      </div>
    </div>
  `;
}

/* ---------------- Vertical tracking timeline ---------------- */
function TrackingTimelineVertical(s) {
  if (s.status === 'cancelled') {
    return `
      <div class="detail-card">
        ${SectionHeading('حالة الشحنة')}
        <div class="cancelled-banner">${Icon.xCircle}<span>تم إلغاء هذه الشحنة</span></div>
      </div>
    `;
  }

  const events = buildTimelineEvents(s);
  const itemsHtml = events.map((e, i) => `
    <div class="lt-tl-item lt-tl-${e.state}">
      <div class="lt-tl-marker">
        <span class="lt-tl-dot">${e.state === 'done' ? Icon.check : Icon[e.icon]}</span>
        ${i < events.length - 1 ? `<span class="lt-tl-line"></span>` : ''}
      </div>
      <div class="lt-tl-body">
        <span class="lt-tl-label">${e.label}</span>
        ${e.time ? `<span class="lt-tl-time" dir="ltr">${formatEventTime(e.time)}</span>` : `<span class="lt-tl-time lt-tl-pending">قيد الانتظار</span>`}
      </div>
    </div>
  `).join('');

  return `
    <div class="detail-card">
      ${SectionHeading('مسار الشحنة')}
      <div class="lt-timeline">${itemsHtml}</div>
    </div>
  `;
}

/* ============================================================
   Notifications page components
   ============================================================ */
function NotificationCard(n) {
  const tone = getNotifTone(n.category);
  return `
    <div class="notif-card-row" data-notif-row="${n.id}">
      <button class="notif-card ${n.unread ? 'notif-card-unread' : ''}" data-notif-card="${n.id}">
        <span class="notif-card-icon tone-${tone}">${Icon[n.icon]}</span>
        <div class="notif-card-body">
          <div class="notif-card-top">
            <span class="notif-card-title">${n.title}</span>
            ${n.unread ? `<span class="notif-card-dot"></span>` : ''}
          </div>
          <span class="notif-card-desc">${n.desc}</span>
          <span class="notif-card-time">${n.time}</span>
        </div>
        <span class="notif-card-chevron">${Icon.chevronLeft}</span>
      </button>
      <div class="notif-card-actions">
        ${n.unread ? `<button class="notif-card-mini-btn" data-notif-read="${n.id}" aria-label="تعليم كمقروء">${Icon.check}</button>` : ''}
        <button class="notif-card-mini-btn notif-card-mini-btn-danger" data-notif-delete="${n.id}" aria-label="حذف الإشعار">${Icon.trash}</button>
      </div>
    </div>
  `;
}

/* ============================================================
   Wallet page components
   ============================================================ */
function WalletBalanceCard() {
  return `
    <div class="wallet-balance-card">
      <div class="wallet-balance-top">
        <span class="wallet-balance-label">${Icon.wallet}<span>الرصيد الحالي</span></span>
        <button class="wallet-eye-btn" id="wallet-eye-btn" aria-label="إخفاء/إظهار الرصيد">${Icon.eye}</button>
      </div>
      <span class="wallet-balance-value" id="wallet-balance-value" dir="ltr">${formatPrice(WalletAccount.balance)}</span>
      <div class="wallet-balance-bottom">
        <span class="wallet-account-number" dir="ltr">${Icon.card}<span>${WalletAccount.number}</span></span>
        <button class="wallet-copy-btn" id="wallet-copy-btn" aria-label="نسخ رقم المحفظة">${Icon.copy}</button>
      </div>
    </div>
  `;
}

function WalletQuickActions() {
  const actions = [
    { id: 'deposit', label: 'إيداع', icon: 'plus' },
    { id: 'withdraw', label: 'سحب', icon: 'wallet' },
    { id: 'transfer', label: 'تحويل', icon: 'route' },
  ];
  return `
    <div class="wallet-actions-row">
      ${actions.map((a) => `
        <button class="wallet-action-btn" data-wallet-action="${a.id}">
          <span class="wallet-action-icon">${Icon[a.icon]}</span>
          <span class="wallet-action-label">${a.label}</span>
        </button>
      `).join('')}
    </div>
  `;
}

function TransactionRow(tx) {
  const meta = getWalletTxMeta(tx.type);
  const isPositive = tx.amount > 0;
  const statusLabel = { completed: 'مكتملة', pending: 'قيد المعالجة', failed: 'فشلت' }[tx.status] || '';
  return `
    <button class="wallet-tx-row" data-tx-id="${tx.id}">
      <span class="wallet-tx-icon tone-${meta.tone}">${Icon[meta.icon]}</span>
      <div class="wallet-tx-body">
        <span class="wallet-tx-title">${tx.title}</span>
        <span class="wallet-tx-desc">${tx.desc}</span>
        <span class="wallet-tx-time" dir="ltr">${formatWalletTime(tx.date)}</span>
      </div>
      <div class="wallet-tx-end">
        <span class="wallet-tx-amount ${isPositive ? 'is-positive' : 'is-negative'}" dir="ltr">${isPositive ? '+' : ''}${formatPrice(tx.amount)}</span>
        ${tx.status !== 'completed' ? `<span class="wallet-tx-status status-${tx.status === 'pending' ? 'gray' : 'danger'}">${statusLabel}</span>` : ''}
      </div>
    </button>
  `;
}

/* ============================================================
   Profile / Settings components
   ============================================================ */

/* ---------------- Avatar (photo or initials) ---------------- */
function ProfileAvatar(user) {
  const initials = user && user.name ? user.name.split(' ').slice(0, 2).map((w) => w[0]).join('') : '؟';
  return user && user.avatar
    ? `<img src="${user.avatar}" alt="${user.name}" />`
    : `<span class="profile-avatar-initials">${initials}</span>`;
}

/* ---------------- Generic settings / profile menu row ---------------- */
function MenuRow({ id, icon, label, sub = null, value = null, danger = false, chevron = true }) {
  return `
    <button class="menu-row ${danger ? 'menu-row-danger' : ''}" id="${id}">
      <span class="menu-row-icon">${Icon[icon]}</span>
      <span class="menu-row-body">
        <span class="menu-row-label">${label}</span>
        ${sub ? `<span class="menu-row-sub">${sub}</span>` : ''}
      </span>
      ${value ? `<span class="menu-row-value">${value}</span>` : ''}
      ${chevron ? `<span class="menu-row-chevron">${Icon.chevronLeft}</span>` : ''}
    </button>
  `;
}

/* ---------------- Toggle switch (used for the fake dark-mode setting) ---------------- */
function ToggleSwitch({ id, checked = false }) {
  return `
    <label class="toggle-switch">
      <input type="checkbox" id="${id}" ${checked ? 'checked' : ''} />
      <span class="toggle-track"><span class="toggle-thumb"></span></span>
    </label>
  `;
}

/* ---------------- Edit Profile action sheet: name / phone / password ---------------- */
function ProfileActionSheet() {
  return `
    <div class="wallet-sheet-overlay" id="profile-sheet-overlay">
      <div class="wallet-sheet" id="profile-sheet">
        <div class="wallet-sheet-handle"></div>
        <div class="wallet-sheet-head">
          <span class="wallet-sheet-title" id="profile-sheet-title">تعديل البيانات</span>
          <button class="icon-btn" id="profile-sheet-close">${Icon.close}</button>
        </div>
        <div class="wallet-sheet-body" id="profile-sheet-body">
          ${InputField({ id: 'profile-name-input', label: 'الاسم الكامل', placeholder: 'أدخل اسمك الكامل', icon: Icon.user })}
          ${InputField({ id: 'profile-phone-input', label: 'رقم الهاتف', placeholder: '07XXXXXXXXX', icon: Icon.phone, dir: 'ltr', inputmode: 'numeric', maxlength: 11 })}
          ${InputField({ id: 'profile-pass-current', type: 'password', label: 'كلمة المرور الحالية', placeholder: '••••••', icon: Icon.lock, rightSlotId: 'profile-pass-current-toggle' })}
          ${InputField({ id: 'profile-pass-new', type: 'password', label: 'كلمة المرور الجديدة', placeholder: '••••••', icon: Icon.lock, rightSlotId: 'profile-pass-new-toggle' })}
          ${InputField({ id: 'profile-pass-confirm', type: 'password', label: 'تأكيد كلمة المرور الجديدة', placeholder: '••••••', icon: Icon.lock, rightSlotId: 'profile-pass-confirm-toggle' })}
          <button class="btn-primary w-full" id="profile-sheet-confirm">
            <span class="btn-label" id="profile-sheet-confirm-label">حفظ</span>
            <span class="btn-spinner hidden"></span>
          </button>
        </div>
      </div>
    </div>
    <input type="file" id="profile-photo-input" accept="image/*" class="hidden" />
  `;
}

/* ---------------- Settings info sheet: language / privacy / terms ---------------- */
function SettingsInfoSheet() {
  return `
    <div class="wallet-sheet-overlay" id="settings-sheet-overlay">
      <div class="wallet-sheet" id="settings-sheet">
        <div class="wallet-sheet-handle"></div>
        <div class="wallet-sheet-head">
          <span class="wallet-sheet-title" id="settings-sheet-title">الإعدادات</span>
          <button class="icon-btn" id="settings-sheet-close">${Icon.close}</button>
        </div>
        <div class="wallet-sheet-body settings-sheet-scroll" id="settings-sheet-body"></div>
      </div>
    </div>
  `;
}

/* Bottom sheet used for Deposit / Withdraw / Transfer forms */
function WalletActionSheet() {
  return `
    <div class="wallet-sheet-overlay" id="wallet-sheet-overlay">
      <div class="wallet-sheet" id="wallet-sheet">
        <div class="wallet-sheet-handle"></div>
        <div class="wallet-sheet-head">
          <span class="wallet-sheet-title" id="wallet-sheet-title">إيداع رصيد</span>
          <button class="icon-btn" id="wallet-sheet-close">${Icon.close}</button>
        </div>
        <div class="wallet-sheet-body" id="wallet-sheet-body">
          <div class="field-group" data-field="wallet-amount">
            <label for="wallet-amount" class="field-label">المبلغ (د.ع)</label>
            <div class="field-shell">
              <span class="field-icon">${Icon.wallet}</span>
              <input id="wallet-amount" type="number" class="field-input" placeholder="مثال: 25000" dir="ltr" inputmode="numeric" />
            </div>
            <p class="field-error" id="wallet-amount-error"></p>
          </div>
          <div class="field-group hidden" id="wallet-transfer-field" data-field="wallet-transfer-target">
            <label for="wallet-transfer-target" class="field-label">رقم محفظة المستلم</label>
            <div class="field-shell">
              <span class="field-icon">${Icon.user}</span>
              <input id="wallet-transfer-target" type="text" class="field-input" placeholder="مثال: AMN-1029-5567" dir="ltr" />
            </div>
            <p class="field-error" id="wallet-transfer-target-error"></p>
          </div>
          <div class="wallet-sheet-quick" id="wallet-sheet-quick">
            <button class="wallet-quick-chip" data-quick-amount="10000">10,000</button>
            <button class="wallet-quick-chip" data-quick-amount="25000">25,000</button>
            <button class="wallet-quick-chip" data-quick-amount="50000">50,000</button>
            <button class="wallet-quick-chip" data-quick-amount="100000">100,000</button>
          </div>
          <button class="btn-primary w-full" id="wallet-sheet-confirm">
            <span class="btn-label" id="wallet-sheet-confirm-label">تأكيد الإيداع</span>
            <span class="btn-spinner hidden"></span>
          </button>
        </div>
      </div>
    </div>
  `;
}

/* ============================================================
   Driver — Earnings / Wallet / Ratings / Profile / Settings
   Reuses the exact same cards, sheets and rows as the customer
   Wallet / Profile / Settings screens above; only the data source
   changes (DRIVER_WALLET, DRIVER_EARNINGS_*, DRIVER_REVIEWS, DRIVER_INFO).
   ============================================================ */

/* ---------------- Earnings: period toggle (weekly / monthly) ---------------- */
function EarningsPeriodToggle(active = 'weekly') {
  const options = [
    { id: 'weekly', label: 'أسبوعي' },
    { id: 'monthly', label: 'شهري' },
  ];
  return `
    <div class="filter-chips-row earnings-period-toggle">
      ${options.map((o) => `<button class="filter-chip ${o.id === active ? 'filter-chip-active' : ''}" data-earnings-period="${o.id}">${o.label}</button>`).join('')}
    </div>
  `;
}

/* ---------------- Earnings: hero summary card ---------------- */
function EarningsHeroCard(summary, period) {
  const periodLabel = period === 'monthly' ? 'آخر 6 أشهر' : 'آخر 7 أيام';
  return `
    <div class="wallet-balance-card earnings-hero-card">
      <div class="wallet-balance-top">
        <span class="wallet-balance-label">${Icon.wallet}<span>إجمالي الأرباح — ${periodLabel}</span></span>
      </div>
      <span class="wallet-balance-value" id="earnings-total-value" dir="ltr">${formatPrice(summary.total)}</span>
      <div class="wallet-balance-bottom">
        <span class="wallet-account-number" dir="ltr">${Icon.box}<span>${summary.trips} رحلة مكتملة</span></span>
        <span class="wallet-account-number" dir="ltr">${Icon.tag}<span>${formatPrice(summary.avgPerTrip)}/رحلة</span></span>
      </div>
    </div>
  `;
}

/* ---------------- Earnings: simple CSS bar chart ---------------- */
function EarningsBarChart(rows) {
  const max = Math.max(...rows.map((r) => r.value), 1);
  const bars = rows.map((r) => {
    const pct = Math.max(6, Math.round((r.value / max) * 100));
    return `
      <div class="earnings-bar-col">
        <span class="earnings-bar-amount" dir="ltr">${Math.round(r.value / 1000)}k</span>
        <div class="earnings-bar-track"><div class="earnings-bar-fill" style="height:${pct}%"></div></div>
        <span class="earnings-bar-label">${r.label}</span>
      </div>
    `;
  }).join('');
  return `<div class="earnings-chart">${bars}</div>`;
}

/* ---------------- Earnings: single paid-trip row (list at bottom) ---------------- */
function EarningsRow(entry) {
  return `
    <div class="wallet-tx-row earnings-row">
      <span class="wallet-tx-icon tone-success">${Icon.box}</span>
      <div class="wallet-tx-body">
        <span class="wallet-tx-title" dir="ltr">#${entry.orderNumber}</span>
        <span class="wallet-tx-desc">${entry.route}</span>
        <span class="wallet-tx-time" dir="ltr">${formatWalletTime(entry.date)}</span>
      </div>
      <div class="wallet-tx-end">
        <span class="wallet-tx-amount is-positive" dir="ltr">+${formatPrice(entry.fee)}</span>
      </div>
    </div>
  `;
}

/* ---------------- Driver wallet: balance card ---------------- */
function DriverWalletBalanceCard() {
  return `
    <div class="wallet-balance-card">
      <div class="wallet-balance-top">
        <span class="wallet-balance-label">${Icon.wallet}<span>رصيد محفظتي</span></span>
        <button class="wallet-eye-btn" id="driver-wallet-eye-btn" aria-label="إخفاء/إظهار الرصيد">${Icon.eye}</button>
      </div>
      <span class="wallet-balance-value" id="driver-wallet-balance-value" dir="ltr">${formatPrice(DRIVER_WALLET.balance)}</span>
      <div class="wallet-balance-bottom">
        <span class="wallet-account-number" dir="ltr">${Icon.card}<span>${DRIVER_WALLET.number}</span></span>
        <button class="wallet-copy-btn" id="driver-wallet-copy-btn" aria-label="نسخ رقم المحفظة">${Icon.copy}</button>
      </div>
    </div>
  `;
}

/* ---------------- Driver wallet: quick actions (سحب / تحويل) ---------------- */
function DriverWalletQuickActions() {
  const actions = [
    { id: 'withdraw', label: 'سحب', icon: 'wallet' },
    { id: 'transfer', label: 'تحويل', icon: 'route' },
  ];
  return `
    <div class="wallet-actions-row">
      ${actions.map((a) => `
        <button class="wallet-action-btn" data-driver-wallet-action="${a.id}">
          <span class="wallet-action-icon">${Icon[a.icon]}</span>
          <span class="wallet-action-label">${a.label}</span>
        </button>
      `).join('')}
    </div>
  `;
}

/* ---------------- Driver wallet: transaction row ---------------- */
function DriverTransactionRow(tx) {
  const meta = getDriverWalletTxMeta(tx.type);
  const isPositive = tx.amount > 0;
  const statusLabel = { completed: 'مكتملة', pending: 'قيد المعالجة', failed: 'فشلت' }[tx.status] || '';
  return `
    <button class="wallet-tx-row" data-tx-id="${tx.id}">
      <span class="wallet-tx-icon tone-${meta.tone}">${Icon[meta.icon]}</span>
      <div class="wallet-tx-body">
        <span class="wallet-tx-title">${tx.title}</span>
        <span class="wallet-tx-desc">${tx.desc}</span>
        <span class="wallet-tx-time" dir="ltr">${formatWalletTime(tx.date)}</span>
      </div>
      <div class="wallet-tx-end">
        <span class="wallet-tx-amount ${isPositive ? 'is-positive' : 'is-negative'}" dir="ltr">${isPositive ? '+' : ''}${formatPrice(tx.amount)}</span>
        ${tx.status !== 'completed' ? `<span class="wallet-tx-status status-${tx.status === 'pending' ? 'gray' : 'danger'}">${statusLabel}</span>` : ''}
      </div>
    </button>
  `;
}

/* ---------------- Driver wallet: action sheet (سحب / تحويل) ---------------- */
function DriverWalletActionSheet() {
  return `
    <div class="wallet-sheet-overlay" id="driver-wallet-sheet-overlay">
      <div class="wallet-sheet" id="driver-wallet-sheet">
        <div class="wallet-sheet-handle"></div>
        <div class="wallet-sheet-head">
          <span class="wallet-sheet-title" id="driver-wallet-sheet-title">سحب رصيد</span>
          <button class="icon-btn" id="driver-wallet-sheet-close">${Icon.close}</button>
        </div>
        <div class="wallet-sheet-body" id="driver-wallet-sheet-body">
          <div class="field-group" data-field="driver-wallet-amount">
            <label for="driver-wallet-amount" class="field-label">المبلغ (د.ع)</label>
            <div class="field-shell">
              <span class="field-icon">${Icon.wallet}</span>
              <input id="driver-wallet-amount" type="number" class="field-input" placeholder="مثال: 25000" dir="ltr" inputmode="numeric" />
            </div>
            <p class="field-error" id="driver-wallet-amount-error"></p>
          </div>
          <div class="field-group hidden" id="driver-wallet-transfer-field" data-field="driver-wallet-transfer-target">
            <label for="driver-wallet-transfer-target" class="field-label">رقم محفظة المستلم</label>
            <div class="field-shell">
              <span class="field-icon">${Icon.user}</span>
              <input id="driver-wallet-transfer-target" type="text" class="field-input" placeholder="مثال: AMN-1029-5567" dir="ltr" />
            </div>
            <p class="field-error" id="driver-wallet-transfer-target-error"></p>
          </div>
          <div class="wallet-sheet-quick" id="driver-wallet-sheet-quick">
            <button class="wallet-quick-chip" data-driver-quick-amount="10000">10,000</button>
            <button class="wallet-quick-chip" data-driver-quick-amount="25000">25,000</button>
            <button class="wallet-quick-chip" data-driver-quick-amount="50000">50,000</button>
            <button class="wallet-quick-chip" data-driver-quick-amount="100000">100,000</button>
          </div>
          <button class="btn-primary w-full" id="driver-wallet-sheet-confirm">
            <span class="btn-label" id="driver-wallet-sheet-confirm-label">تأكيد السحب</span>
            <span class="btn-spinner hidden"></span>
          </button>
        </div>
      </div>
    </div>
  `;
}

/* ---------------- Ratings: hero summary card ---------------- */
function DriverRatingHeroCard() {
  const fullStars = Math.round(DRIVER_INFO.rating);
  const starsHtml = Array.from({ length: 5 }, (_, i) => `<span class="rating-star ${i < fullStars ? 'is-filled' : ''}">${Icon.star}</span>`).join('');
  return `
    <div class="wallet-balance-card rating-hero-card">
      <span class="wallet-balance-label">${Icon.star}<span>تقييمي العام</span></span>
      <span class="rating-hero-value" dir="ltr">${DRIVER_INFO.rating.toFixed(1)}</span>
      <div class="rating-hero-stars">${starsHtml}</div>
      <div class="wallet-balance-bottom">
        <span class="wallet-account-number" dir="ltr">${Icon.box}<span>${getDriverReviewCount().toLocaleString('en-US')} تقييم</span></span>
        <span class="wallet-account-number" dir="ltr">${Icon.localTruck}<span>${DRIVER_INFO.trips.toLocaleString('en-US')} رحلة</span></span>
      </div>
    </div>
  `;
}

/* ---------------- Ratings: breakdown bar (5★ ... 1★) ---------------- */
function RatingBreakdownRow(star, count, total) {
  const pct = total ? Math.round((count / total) * 100) : 0;
  return `
    <div class="rating-breakdown-row">
      <span class="rating-breakdown-star" dir="ltr">${star} ${Icon.star}</span>
      <div class="rating-breakdown-track"><div class="rating-breakdown-fill" style="width:${pct}%"></div></div>
      <span class="rating-breakdown-count" dir="ltr">${count.toLocaleString('en-US')}</span>
    </div>
  `;
}

/* ---------------- Ratings: single review row ---------------- */
function ReviewRow(review) {
  const initials = review.reviewer.split(' ').slice(0, 2).map((w) => w[0]).join('');
  const starsHtml = Array.from({ length: 5 }, (_, i) => `<span class="rating-star-sm ${i < review.stars ? 'is-filled' : ''}">${Icon.star}</span>`).join('');
  return `
    <div class="review-row">
      <span class="review-avatar">${initials}</span>
      <div class="review-body">
        <div class="review-top">
          <span class="review-name">${review.reviewer}</span>
          <span class="review-date">${formatShortDate(review.date)}</span>
        </div>
        <div class="review-stars">${starsHtml}</div>
        <p class="review-comment">${review.comment}</p>
        <span class="review-order" dir="ltr">#${review.orderNumber}</span>
      </div>
    </div>
  `;
}

/* ---------------- Driver profile: edit sheet (name / phone / vehicle / plate / password) ---------------- */
function DriverProfileActionSheet() {
  return `
    <div class="wallet-sheet-overlay" id="driver-profile-sheet-overlay">
      <div class="wallet-sheet" id="driver-profile-sheet">
        <div class="wallet-sheet-handle"></div>
        <div class="wallet-sheet-head">
          <span class="wallet-sheet-title" id="driver-profile-sheet-title">تعديل البيانات</span>
          <button class="icon-btn" id="driver-profile-sheet-close">${Icon.close}</button>
        </div>
        <div class="wallet-sheet-body" id="driver-profile-sheet-body">
          ${InputField({ id: 'driver-profile-name-input', label: 'الاسم الكامل', placeholder: 'أدخل اسمك الكامل', icon: Icon.user })}
          ${InputField({ id: 'driver-profile-phone-input', label: 'رقم الهاتف', placeholder: '07XXXXXXXXX', icon: Icon.phone, dir: 'ltr', inputmode: 'numeric', maxlength: 11 })}
          ${InputField({ id: 'driver-profile-vehicle-input', label: 'نوع المركبة', placeholder: 'مثال: كيا بونجو أبيض', icon: Icon.localTruck })}
          ${InputField({ id: 'driver-profile-plate-input', label: 'رقم اللوحة', placeholder: 'مثال: بغداد 33421', icon: Icon.card, dir: 'ltr' })}
          ${InputField({ id: 'driver-profile-pass-current', type: 'password', label: 'كلمة المرور الحالية', placeholder: '••••••', icon: Icon.lock, rightSlotId: 'driver-profile-pass-current-toggle' })}
          ${InputField({ id: 'driver-profile-pass-new', type: 'password', label: 'كلمة المرور الجديدة', placeholder: '••••••', icon: Icon.lock, rightSlotId: 'driver-profile-pass-new-toggle' })}
          ${InputField({ id: 'driver-profile-pass-confirm', type: 'password', label: 'تأكيد كلمة المرور الجديدة', placeholder: '••••••', icon: Icon.lock, rightSlotId: 'driver-profile-pass-confirm-toggle' })}
          <button class="btn-primary w-full" id="driver-profile-sheet-confirm">
            <span class="btn-label" id="driver-profile-sheet-confirm-label">حفظ</span>
            <span class="btn-spinner hidden"></span>
          </button>
        </div>
      </div>
    </div>
    <input type="file" id="driver-profile-photo-input" accept="image/*" class="hidden" />
  `;
}

/* ---------------- Admin Settings edit sheet: company / profile / password ---------------- */
function AdminSettingsActionSheet() {
  return `
    <div class="wallet-sheet-overlay" id="admin-settings-sheet-overlay">
      <div class="wallet-sheet" id="admin-settings-sheet">
        <div class="wallet-sheet-handle"></div>
        <div class="wallet-sheet-head">
          <span class="wallet-sheet-title" id="admin-settings-sheet-title">تعديل البيانات</span>
          <button class="icon-btn" id="admin-settings-sheet-close">${Icon.close}</button>
        </div>
        <div class="wallet-sheet-body" id="admin-settings-sheet-body">
          ${InputField({ id: 'admin-company-name-input', label: 'اسم الشركة', placeholder: 'اسم الشركة', icon: Icon.building })}
          ${InputField({ id: 'admin-company-phone-input', label: 'رقم هاتف الشركة', placeholder: '07XXXXXXXXX', icon: Icon.phone, dir: 'ltr', inputmode: 'numeric', maxlength: 11 })}
          ${InputField({ id: 'admin-company-email-input', label: 'البريد الإلكتروني للشركة', placeholder: 'example@mail.com', icon: Icon.mail, dir: 'ltr' })}
          ${InputField({ id: 'admin-company-address-input', label: 'عنوان الشركة', placeholder: 'المدينة، المنطقة، الشارع', icon: Icon.mapPinLine })}
          ${InputField({ id: 'admin-name-input', label: 'الاسم الكامل', placeholder: 'أدخل اسمك الكامل', icon: Icon.user })}
          ${InputField({ id: 'admin-phone-input', label: 'رقم الهاتف', placeholder: '07XXXXXXXXX', icon: Icon.phone, dir: 'ltr', inputmode: 'numeric', maxlength: 11 })}
          ${InputField({ id: 'admin-email-input', label: 'البريد الإلكتروني', placeholder: 'example@mail.com', icon: Icon.mail, dir: 'ltr' })}
          ${InputField({ id: 'admin-pass-current', type: 'password', label: 'كلمة المرور الحالية', placeholder: '••••••', icon: Icon.lock, rightSlotId: 'admin-pass-current-toggle' })}
          ${InputField({ id: 'admin-pass-new', type: 'password', label: 'كلمة المرور الجديدة', placeholder: '••••••', icon: Icon.lock, rightSlotId: 'admin-pass-new-toggle' })}
          ${InputField({ id: 'admin-pass-confirm', type: 'password', label: 'تأكيد كلمة المرور الجديدة', placeholder: '••••••', icon: Icon.lock, rightSlotId: 'admin-pass-confirm-toggle' })}
          <button class="btn-primary w-full" id="admin-settings-sheet-confirm">
            <span class="btn-label" id="admin-settings-sheet-confirm-label">حفظ</span>
            <span class="btn-spinner hidden"></span>
          </button>
        </div>
      </div>
    </div>
    <input type="file" id="admin-settings-photo-input" accept="image/*" class="hidden" />
  `;
}

/* ============================================================
   Admin module components
   (Dashboard Home, Orders Management, Drivers Management)
   ============================================================ */

const ADMIN_BOTTOM_NAV_ITEMS = [
  { id: 'admin-home', label: 'الرئيسية', icon: 'grid' },
  { id: 'admin-orders', label: 'الطلبات', icon: 'clipboardList' },
  { id: 'admin-drivers', label: 'السائقين', icon: 'localTruck' },
  { id: 'admin-customers', label: 'العملاء', icon: 'user' },
  { id: 'admin-reports', label: 'التقارير', icon: 'fileText' },
];

function AdminBottomNav(active = 'admin-home') {
  const items = ADMIN_BOTTOM_NAV_ITEMS.map((item) => {
    const isActive = item.id === active;
    return `
      <button class="bn-item ${isActive ? 'bn-item-active' : ''}" data-abn="${item.id}">
        <span class="bn-icon-wrap"><span class="bn-icon">${Icon[item.icon]}</span></span>
        <span class="bn-label">${item.label}</span>
      </button>
    `;
  }).join('');
  return `<nav class="bottom-nav" id="admin-bottom-nav">${items}</nav>`;
}

/* ---------------- Dashboard stat card ---------------- */
function AdminStatCard({ icon, value, label, tone = 'primary' }) {
  return `
    <div class="admin-stat-card admin-stat-${tone}">
      <span class="admin-stat-icon">${Icon[icon]}</span>
      <div class="admin-stat-text">
        <span class="admin-stat-value" dir="ltr">${value}</span>
        <span class="admin-stat-label">${label}</span>
      </div>
    </div>
  `;
}

/* ---------------- Admin driver status badge ---------------- */
function AdminDriverStatusBadge(statusId, size = 'md') {
  const meta = getAdminDriverStatusMeta(statusId);
  return `
    <span class="status-badge status-${meta.tone} ${size === 'sm' ? 'status-badge-sm' : ''}">
      <span class="status-badge-icon">${Icon[meta.icon]}</span>
      <span>${meta.label}</span>
    </span>
  `;
}

/* ---------------- Orders Management: table row ---------------- */
function AdminOrderRow(s) {
  const driver = getAdminDriverForOrder(s);
  return `
    <button class="admin-row" data-admin-order-id="${s.id}">
      <div class="admin-row-main">
        <div class="admin-row-top">
          <span class="order-card-code" dir="ltr">#${s.trackingNumber}</span>
          ${StatusBadge(s.status, 'sm')}
        </div>
        <span class="admin-row-sub">${s.sender.name} ← ${s.receiver.name}</span>
        <span class="admin-row-meta">${Icon.localTruck}<span>${driver.name}</span></span>
      </div>
      <div class="admin-row-side">
        <span class="admin-row-price" dir="ltr">${formatPrice(s.price)}</span>
        <span class="admin-row-date">${formatShortDate(s.date)}</span>
      </div>
      <span class="admin-row-chevron">${Icon.chevronLeft}</span>
    </button>
  `;
}

/* ---------------- Drivers Management: table row ---------------- */
function AdminDriverRow(d) {
  const initials = d.name.split(' ').slice(0, 2).map((w) => w[0]).join('');
  return `
    <button class="admin-row" data-admin-driver-id="${d.id}">
      <span class="lt-driver-avatar admin-row-avatar">${initials}</span>
      <div class="admin-row-main">
        <div class="admin-row-top">
          <span class="admin-row-name">${d.name}</span>
          ${AdminDriverStatusBadge(d.status, 'sm')}
        </div>
        <span class="admin-row-sub" dir="ltr">${d.phone}</span>
        <span class="admin-row-meta">${Icon.star}<span>${d.rating}</span><span class="admin-row-dot">•</span><span>${d.completedOrders} طلب مكتمل</span></span>
      </div>
      <span class="admin-row-chevron">${Icon.chevronLeft}</span>
    </button>
  `;
}

/* ============================================================
   Admin module components — Customers Management
   ============================================================ */

/* ---------------- Customer status badge ---------------- */
function CustomerStatusBadge(statusId, size = 'md') {
  const meta = getCustomerStatusMeta(statusId);
  return `
    <span class="status-badge status-${meta.tone} ${size === 'sm' ? 'status-badge-sm' : ''}">
      <span class="status-badge-icon">${Icon[meta.icon]}</span>
      <span>${meta.label}</span>
    </span>
  `;
}

/* ---------------- Customers Management: table row ---------------- */
function AdminCustomerRow(c) {
  const initials = c.name.split(' ').slice(0, 2).map((w) => w[0]).join('');
  return `
    <button class="admin-row" data-admin-customer-id="${c.id}">
      <span class="lt-driver-avatar admin-row-avatar">${initials}</span>
      <div class="admin-row-main">
        <div class="admin-row-top">
          <span class="admin-row-name">${c.name}</span>
          ${CustomerStatusBadge(c.status, 'sm')}
        </div>
        <span class="admin-row-sub" dir="ltr">${c.phone}</span>
        <span class="admin-row-meta">${Icon.box}<span>${c.totalOrders} طلب</span><span class="admin-row-dot">•</span><span>${c.city}</span></span>
      </div>
      <div class="admin-row-side">
        <span class="admin-row-price" dir="ltr">${formatPrice(c.totalSpent)}</span>
      </div>
      <span class="admin-row-chevron">${Icon.chevronLeft}</span>
    </button>
  `;
}

/* ============================================================
   Admin module components — Reports
   Reuses .admin-stats-grid / .admin-stat-card, .earnings-chart,
   .detail-card and .filter-chip tokens from above; the rules in
   style.css cover only the new leaderboard + stat-bar pieces.
   ============================================================ */

/* ---------------- Revenue cards grid (4 cards) ---------------- */
function RevenueCardsGrid() {
  return `
    <div class="admin-stats-grid">
      ${AdminStatCard({ icon: 'wallet', value: formatPrice(REVENUE_CARDS.today), label: 'إيرادات اليوم', tone: 'primary' })}
      ${AdminStatCard({ icon: 'clipboardList', value: formatPrice(REVENUE_CARDS.week), label: 'إيرادات الأسبوع', tone: 'success' })}
      ${AdminStatCard({ icon: 'calendar', value: formatPrice(REVENUE_CARDS.month), label: 'إيرادات الشهر', tone: 'warning' })}
      ${AdminStatCard({ icon: 'grid', value: formatPrice(REVENUE_CARDS.year), label: 'إيرادات السنة', tone: 'gray' })}
    </div>
  `;
}

/* ---------------- Shipment statistics: tone-colored stat bar row ---------------- */
function ShipmentStatRow(stat) {
  return `
    <div class="stat-bar-row">
      <span class="stat-bar-label">
        <span class="stat-bar-icon tone-${stat.tone}">${Icon[stat.icon]}</span>
        <span>${stat.label}</span>
      </span>
      <div class="stat-bar-track"><div class="stat-bar-fill tone-${stat.tone}" style="width:${Math.max(4, stat.pct)}%"></div></div>
      <span class="stat-bar-count" dir="ltr">${stat.count} <small>(${stat.pct}%)</small></span>
    </div>
  `;
}

/* ---------------- Top Drivers / Top Customers: ranked leaderboard row ---------------- */
function TopDriverRow(d, rank) {
  const initials = d.name.split(' ').slice(0, 2).map((w) => w[0]).join('');
  return `
    <button class="rank-row" data-admin-driver-id="${d.id}">
      <span class="rank-badge rank-${rank <= 3 ? rank : 'default'}">${rank}</span>
      <span class="lt-driver-avatar admin-row-avatar">${initials}</span>
      <div class="rank-row-main">
        <span class="rank-row-name">${d.name}</span>
        <span class="rank-row-sub">${Icon.star}<span>${d.rating}</span><span class="admin-row-dot">•</span><span>${d.completedOrders} طلب مكتمل</span></span>
      </div>
      <span class="admin-row-chevron">${Icon.chevronLeft}</span>
    </button>
  `;
}

function TopCustomerRow(c, rank) {
  const initials = c.name.split(' ').slice(0, 2).map((w) => w[0]).join('');
  return `
    <button class="rank-row" data-admin-customer-id="${c.id}">
      <span class="rank-badge rank-${rank <= 3 ? rank : 'default'}">${rank}</span>
      <span class="lt-driver-avatar admin-row-avatar">${initials}</span>
      <div class="rank-row-main">
        <span class="rank-row-name">${c.name}</span>
        <span class="rank-row-sub">${Icon.box}<span>${c.totalOrders} طلب</span><span class="admin-row-dot">•</span><span dir="ltr">${formatPrice(c.totalSpent)}</span></span>
      </div>
      <span class="admin-row-chevron">${Icon.chevronLeft}</span>
    </button>
  `;
}
