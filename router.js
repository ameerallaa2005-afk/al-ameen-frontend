/* ============================================================
   router.js — Minimal hash router with slide transitions.
   Routes map to render functions exported from pages.js
   ============================================================ */

const Router = (() => {
  const routes = {};
  let current = null;
  const root = () => document.getElementById('app');

  function register(path, renderFn) {
    routes[path] = renderFn;
  }

  function navigate(path, opts = {}) {
    if (!routes[path]) {
      console.warn('Route not found:', path);
      return;
    }
    window.location.hash = path;
    // If hash didn't actually change (same route requested twice), render manually
    if (current === path) {
      render(path, opts);
    }
  }

  function render(path, opts = {}) {
    const fn = routes[path];
    if (!fn) return;
    const container = root();
    const direction = opts.direction || 'forward';

    const outgoing = container.firstElementChild;
    const mount = () => {
      container.innerHTML = '';
      const wrapper = document.createElement('div');
      wrapper.className = `screen screen-enter-${direction}`;
      wrapper.innerHTML = fn(opts.params || {});
      container.appendChild(wrapper);
      requestAnimationFrame(() => {
        wrapper.classList.add('screen-active');
      });
      if (typeof window.onScreenMounted === 'function') {
        window.onScreenMounted(path, opts.params || {});
      }
      window.scrollTo(0, 0);
    };

    if (outgoing) {
      outgoing.classList.add(`screen-exit-${direction}`);
      setTimeout(mount, 180);
    } else {
      mount();
    }
    current = path;
  }

  function handleHashChange() {
    const path = window.location.hash.replace('#', '') || 'splash';
    render(path);
  }

  function init(defaultPath = 'splash') {
    window.addEventListener('hashchange', handleHashChange);
    if (!window.location.hash) {
      window.location.hash = defaultPath;
    } else {
      handleHashChange();
    }
  }

  function replace(path, opts = {}) {
    // Navigate without adding perceptible back-stack semantics issue (hash still changes)
    navigate(path, opts);
  }

  return { register, navigate, replace, init, get current() { return current; } };
})();

/* Global click delegation for [data-nav] elements */
document.addEventListener('click', (e) => {
  const trigger = e.target.closest('[data-nav]');
  if (trigger) {
    const target = trigger.getAttribute('data-nav');
    const direction = trigger.getAttribute('data-direction') || 'back';
    Router.navigate(target, { direction });
  }
});
