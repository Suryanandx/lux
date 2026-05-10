function animate(el) {
  const target = parseFloat(el.dataset.counter);
  const dur    = parseInt(el.dataset.duration || '1400', 10);
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  const decimals = parseInt(el.dataset.decimals || '0', 10);
  const start  = performance.now();

  const tick = (now) => {
    const t = Math.min(1, (now - start) / dur);
    const eased = 1 - Math.pow(1 - t, 3);
    const value = target * eased;
    el.textContent = prefix + (decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString()) + suffix;
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animate(e.target);
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

function scan() {
  document.querySelectorAll('[data-counter]:not([data-counted])').forEach(el => {
    el.dataset.counted = '1';
    obs.observe(el);
  });
}

if (document.readyState !== 'loading') scan();
else document.addEventListener('DOMContentLoaded', scan);

new MutationObserver(scan).observe(document.documentElement, { childList: true, subtree: true });
