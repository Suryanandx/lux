const KEY_MODE  = 'lux:theme-mode';
const KEY_BRAND = 'lux:theme-brand';

function applyMode(mode) {
  const resolved = mode === 'system'
    ? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : mode;
  document.documentElement.dataset.theme = resolved;
  document.documentElement.style.colorScheme = resolved;
  dispatchEvent(new CustomEvent('lux:theme', { detail: { mode, resolved } }));
}

function applyBrand(hex) {
  if (!hex) {
    document.documentElement.style.removeProperty('--brand');
    document.documentElement.style.removeProperty('--brand-hover');
    document.documentElement.style.removeProperty('--brand-muted');
    return;
  }
  document.documentElement.style.setProperty('--brand', hex);
  document.documentElement.style.setProperty('--brand-hover', shade(hex, -14));
  document.documentElement.style.setProperty('--brand-muted', hexAlpha(hex, 0.12));
  dispatchEvent(new CustomEvent('lux:brand', { detail: { brand: hex } }));
}

function shade(hex, percent) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, Math.min(255, (n >> 16) + Math.round(255 * percent / 100)));
  const g = Math.max(0, Math.min(255, ((n >> 8) & 0xff) + Math.round(255 * percent / 100)));
  const b = Math.max(0, Math.min(255, (n & 0xff) + Math.round(255 * percent / 100)));
  return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
}

function hexAlpha(hex, alpha) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}

const theme = {
  get mode()  { return localStorage.getItem(KEY_MODE) || 'system'; },
  get brand() { return localStorage.getItem(KEY_BRAND) || null; },
  setMode(mode) {
    localStorage.setItem(KEY_MODE, mode);
    applyMode(mode);
  },
  setBrand(hex) {
    if (hex) localStorage.setItem(KEY_BRAND, hex);
    else localStorage.removeItem(KEY_BRAND);
    applyBrand(hex);
  },
  reset() {
    localStorage.removeItem(KEY_MODE);
    localStorage.removeItem(KEY_BRAND);
    applyMode('system');
    applyBrand(null);
  },
};

applyMode(theme.mode);
if (theme.brand) applyBrand(theme.brand);

matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  if (theme.mode === 'system') applyMode('system');
});

function syncPressed() {
  document.querySelectorAll('[data-theme-mode]').forEach(b =>
    b.setAttribute('aria-pressed', String(b.dataset.themeMode === theme.mode))
  );
  document.querySelectorAll('[data-theme-brand]').forEach(b =>
    b.setAttribute('aria-pressed', String(b.dataset.themeBrand === theme.brand))
  );
}

document.addEventListener('click', e => {
  const modeBtn = e.target.closest('[data-theme-mode]');
  if (modeBtn) {
    e.preventDefault();
    theme.setMode(modeBtn.dataset.themeMode);
    syncPressed();
  }
  const brandBtn = e.target.closest('[data-theme-brand]');
  if (brandBtn) {
    e.preventDefault();
    theme.setBrand(brandBtn.dataset.themeBrand);
    syncPressed();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-theme-mode]').forEach(b =>
    b.setAttribute('aria-pressed', String(b.dataset.themeMode === theme.mode))
  );
  document.querySelectorAll('[data-theme-brand]').forEach(b =>
    b.setAttribute('aria-pressed', String(b.dataset.themeBrand === theme.brand))
  );
});

export { theme };
