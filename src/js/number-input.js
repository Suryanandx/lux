document.addEventListener('click', e => {
  const btn = e.target.closest('.number-input [data-step]');
  if (!btn) return;
  const wrap  = btn.closest('.number-input');
  const input = wrap.querySelector('input[type="number"]');
  if (!input) return;
  const step = parseFloat(btn.dataset.step) || 1;
  const min  = input.min !== '' ? parseFloat(input.min) : -Infinity;
  const max  = input.max !== '' ? parseFloat(input.max) :  Infinity;
  const next = Math.min(max, Math.max(min, (parseFloat(input.value) || 0) + step));
  input.value = String(next);
  input.dispatchEvent(new Event('input', { bubbles: true }));
  input.dispatchEvent(new Event('change', { bubbles: true }));
});
