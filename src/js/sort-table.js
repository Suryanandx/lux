function sortTable(th) {
  const table = th.closest('table');
  if (!table) return;
  const tbody = table.tBodies[0];
  const colIdx = [...th.parentElement.children].indexOf(th);
  const current = th.dataset.sort;
  const next = current === 'asc' ? 'desc' : 'asc';

  [...th.parentElement.children].forEach(h => h.removeAttribute('data-sort'));
  th.dataset.sort = next;

  const rows = [...tbody.rows];
  rows.sort((a, b) => {
    const av = a.cells[colIdx]?.textContent.trim() || '';
    const bv = b.cells[colIdx]?.textContent.trim() || '';
    const an = parseFloat(av.replace(/[^0-9.\-]/g, ''));
    const bn = parseFloat(bv.replace(/[^0-9.\-]/g, ''));
    const numeric = !isNaN(an) && !isNaN(bn);
    const cmp = numeric ? (an - bn) : av.localeCompare(bv);
    return next === 'asc' ? cmp : -cmp;
  });
  rows.forEach(r => tbody.appendChild(r));
}

document.addEventListener('click', e => {
  const th = e.target.closest('th[data-sort]');
  if (th) sortTable(th);
});
