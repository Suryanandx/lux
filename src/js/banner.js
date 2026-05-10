document.addEventListener('click', e => {
  const btn = e.target.closest('.banner-close');
  if (btn) btn.closest('.banner')?.remove();
});
