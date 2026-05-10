import './theme.js';
import './tabs.js';
import './dropdown.js';
import './cmdk.js';
import './counter.js';
import './sort-table.js';
import './copy.js';
import './number-input.js';
import './tag-input.js';
import './file-drop.js';
import './banner.js';
import { toast } from './toast.js';
import { theme } from './theme.js';

document.addEventListener('click', e => {
  const trigger = e.target.closest('[data-dialog]');
  if (trigger) {
    const dialog = document.getElementById(trigger.dataset.dialog);
    dialog?.showModal();
  }
  const close = e.target.closest('[data-dialog-close]');
  if (close) close.closest('dialog')?.close();
  if (e.target.tagName === 'DIALOG') {
    const r = e.target.getBoundingClientRect();
    if (e.clientY < r.top || e.clientY > r.bottom || e.clientX < r.left || e.clientX > r.right) {
      e.target.close();
    }
  }
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') document.querySelector('dialog[open]:not([data-cmdk])')?.close();
});

window.lux = { toast, theme };
