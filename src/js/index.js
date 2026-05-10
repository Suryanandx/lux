import './tabs.js';
import './dropdown.js';
import { toast } from './toast.js';

// Dialog helpers
document.addEventListener('click', e => {
  const trigger = e.target.closest('[data-dialog]');
  if (trigger) {
    const dialog = document.getElementById(trigger.dataset.dialog);
    dialog?.showModal();
  }
  const close = e.target.closest('[data-dialog-close]');
  if (close) {
    close.closest('dialog')?.close();
  }
  // Close dialog on backdrop click
  if (e.target.tagName === 'DIALOG') {
    const rect = e.target.getBoundingClientRect();
    const inDialog = rect.top <= e.clientY && e.clientY <= rect.bottom &&
                     rect.left <= e.clientX && e.clientX <= rect.right;
    if (!inDialog) e.target.close();
  }
});

// Escape closes dialogs (native handles it, but make sure)
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    const open = document.querySelector('dialog[open]');
    open?.close();
  }
});

window.lux = { toast };
