import { LuxBase } from './base.js';

class LuxCmdk extends LuxBase {
  init() {
    this.dialog = this.$('dialog');
    this.input  = this.$('input');
    this.list   = this.$('[role="listbox"]');
    if (!this.dialog || !this.input || !this.list) return;

    this.items = this.$$('[role="option"]', this.list);
    this.activeIndex = 0;

    this.input.addEventListener('input', this);
    this.dialog.addEventListener('click', this);
    document.addEventListener('keydown', this);
    this.list.addEventListener('mousemove', e => {
      const opt = e.target.closest('[role="option"]');
      if (opt) this.#setActive(this.items.indexOf(opt));
    });
    this.list.addEventListener('click', e => {
      const opt = e.target.closest('[role="option"]');
      if (opt) this.#select(opt);
    });
  }

  oninput() {
    const q = this.input.value.toLowerCase().trim();
    let firstVisible = -1;
    this.items.forEach((item, i) => {
      const text = (item.dataset.value || item.textContent).toLowerCase();
      const hit  = !q || text.includes(q);
      item.hidden = !hit;
      if (hit && firstVisible === -1) firstVisible = i;
    });
    this.$$('[data-cmdk-group]').forEach(g => {
      const hasVisible = [...g.querySelectorAll('[role="option"]')].some(o => !o.hidden);
      g.hidden = !hasVisible;
    });
    if (firstVisible >= 0) this.#setActive(firstVisible);
  }

  onclick(e) {
    if (e.target === this.dialog) this.close();
  }

  onkeydown(e) {
    if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      this.open();
      return;
    }
    if (!this.dialog.open) return;

    if (e.key === 'Escape') { this.close(); return; }
    const visible = this.items.filter(i => !i.hidden);
    const currentVisibleIdx = visible.indexOf(this.items[this.activeIndex]);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = visible[(currentVisibleIdx + 1) % visible.length];
      if (next) this.#setActive(this.items.indexOf(next));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = visible[(currentVisibleIdx - 1 + visible.length) % visible.length];
      if (next) this.#setActive(this.items.indexOf(next));
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      const active = this.items[this.activeIndex];
      if (active && !active.hidden) this.#select(active);
    }
  }

  open() {
    this.dialog.showModal();
    this.input.value = '';
    this.input.focus();
    this.oninput();
  }
  close() {
    this.dialog.close();
  }

  #setActive(i) {
    this.activeIndex = i;
    this.items.forEach((item, idx) => {
      item.setAttribute('aria-selected', String(idx === i));
    });
    const active = this.items[i];
    if (active) active.scrollIntoView({ block: 'nearest' });
  }

  #select(item) {
    const href = item.dataset.href || item.getAttribute('href');
    this.emit('lux:cmdk:select', { item, value: item.dataset.value });
    if (href) {
      if (item.dataset.themeMode) {
        document.querySelectorAll('[data-theme-mode]').forEach(b => {
          if (b.dataset.themeMode === item.dataset.themeMode) b.click();
        });
      } else {
        location.href = href;
      }
    }
    this.close();
  }

  cleanup() {
    document.removeEventListener('keydown', this);
  }
}

customElements.define('lux-cmdk', LuxCmdk);
