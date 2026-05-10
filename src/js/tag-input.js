import { LuxBase } from './base.js';

class LuxTagInput extends LuxBase {
  init() {
    this.input  = this.$('input');
    this.hidden = this.$('input[type="hidden"]') || null;
    this.tags   = (this.dataset.value || '').split(',').filter(Boolean);
    this.addEventListener('click', () => this.input?.focus());
    this.input?.addEventListener('keydown', e => {
      if ((e.key === 'Enter' || e.key === ',') && this.input.value.trim()) {
        e.preventDefault();
        this.add(this.input.value.trim());
        this.input.value = '';
      }
      if (e.key === 'Backspace' && !this.input.value && this.tags.length) {
        this.remove(this.tags.length - 1);
      }
    });
    this.addEventListener('click', e => {
      const rm = e.target.closest('.tag-remove');
      if (rm) this.remove(parseInt(rm.dataset.index, 10));
    });
    this.render();
  }
  add(value) {
    if (this.tags.includes(value)) return;
    this.tags.push(value);
    this.render();
    this.emit('lux:tag', { tags: this.tags });
  }
  remove(idx) {
    this.tags.splice(idx, 1);
    this.render();
    this.emit('lux:tag', { tags: this.tags });
  }
  render() {
    this.$$('.tag').forEach(t => t.remove());
    this.tags.forEach((tag, i) => {
      const el = document.createElement('span');
      el.className = 'tag';
      el.innerHTML = `${tag}<button type="button" class="tag-remove" data-index="${i}" aria-label="Remove">×</button>`;
      this.insertBefore(el, this.input);
    });
    if (this.hidden) this.hidden.value = this.tags.join(',');
  }
}

customElements.define('lux-tag-input', LuxTagInput);
