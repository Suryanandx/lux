document.addEventListener('click', async e => {
  const btn = e.target.closest('[data-copy]');
  if (!btn) return;
  e.preventDefault();
  const targetSel = btn.dataset.copy;
  let text = '';
  if (targetSel.startsWith('#') || targetSel.startsWith('.')) {
    const el = document.querySelector(targetSel);
    text = el ? (el.value ?? el.textContent ?? '') : '';
  } else {
    text = targetSel;
  }
  try {
    await navigator.clipboard.writeText(text.trim());
    const original = btn.dataset.copyLabel || btn.textContent;
    btn.dataset.copyLabel = original;
    btn.textContent = btn.dataset.copyDone || 'Copied!';
    btn.classList.add('is-copied');
    setTimeout(() => {
      btn.textContent = original;
      btn.classList.remove('is-copied');
    }, 1600);
  } catch {}
});
