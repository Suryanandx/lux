import { LuxBase } from './base.js';

function fmtSize(n) {
  if (n < 1024) return n + ' B';
  if (n < 1024 * 1024) return (n / 1024).toFixed(1) + ' KB';
  return (n / 1024 / 1024).toFixed(1) + ' MB';
}

class LuxFileDrop extends LuxBase {
  init() {
    this.drop  = this.$('.file-drop');
    this.input = this.$('input[type="file"]');
    this.list  = this.$('.file-list');
    if (!this.drop || !this.input) return;

    this.drop.addEventListener('click', () => this.input.click());
    this.input.addEventListener('change', () => this.#add([...this.input.files]));
    ['dragenter', 'dragover'].forEach(ev =>
      this.drop.addEventListener(ev, e => { e.preventDefault(); this.drop.classList.add('is-drag'); })
    );
    ['dragleave', 'drop'].forEach(ev =>
      this.drop.addEventListener(ev, e => { e.preventDefault(); this.drop.classList.remove('is-drag'); })
    );
    this.drop.addEventListener('drop', e => {
      this.#add([...e.dataTransfer.files]);
    });
    this.addEventListener('click', e => {
      const rm = e.target.closest('[data-remove]');
      if (rm) { rm.closest('.file-item').remove(); this.emit('lux:files'); }
    });
  }
  #add(files) {
    if (!this.list) return;
    files.forEach(f => {
      const li = document.createElement('li');
      li.className = 'file-item';
      li.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--text-subtle)"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        <span class="file-item-name">${f.name}</span>
        <span class="file-item-size">${fmtSize(f.size)}</span>
        <button type="button" data-remove aria-label="Remove" style="background:transparent;border:none;color:var(--text-subtle);cursor:pointer;padding:4px">×</button>`;
      this.list.appendChild(li);
    });
    this.emit('lux:files', { files });
  }
}

customElements.define('lux-file-drop', LuxFileDrop);
