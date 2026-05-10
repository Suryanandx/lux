const ICONS = {
  success: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`,
  error:   `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6M9 9l6 6"/></svg>`,
  warning: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4M12 17h.01"/></svg>`,
  info:    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>`,
};

function getRegion() {
  let el = document.getElementById('lux-toast-region');
  if (!el) {
    el = document.createElement('div');
    el.id = 'lux-toast-region';
    el.setAttribute('aria-live', 'polite');
    el.setAttribute('aria-atomic', 'false');
    document.body.appendChild(el);
  }
  return el;
}

function toast({ title = '', message = '', variant = 'info', duration = 4000 } = {}) {
  const region = getRegion();
  const el = document.createElement('div');
  el.className = 'lux-toast';
  el.setAttribute('role', 'status');
  el.setAttribute('data-variant', variant);
  el.innerHTML = `
    <span class="lux-toast-icon">${ICONS[variant] || ICONS.info}</span>
    <div class="lux-toast-body">
      ${title ? `<div class="lux-toast-title">${title}</div>` : ''}
      ${message ? `<div class="lux-toast-desc">${message}</div>` : ''}
    </div>
    <button class="lux-toast-close" aria-label="Dismiss">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
    </button>`;

  const dismiss = () => {
    el.classList.add('out');
    el.addEventListener('animationend', () => el.remove(), { once: true });
  };
  el.querySelector('.lux-toast-close').addEventListener('click', dismiss);

  region.appendChild(el);
  if (duration > 0) setTimeout(dismiss, duration);
  return { dismiss };
}

['success', 'error', 'warning', 'info'].forEach(v => {
  toast[v] = (opts = {}) => typeof opts === 'string'
    ? toast({ message: opts, variant: v })
    : toast({ ...opts, variant: v });
});

export { toast };
