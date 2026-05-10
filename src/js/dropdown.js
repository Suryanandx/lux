import { LuxBase, uid } from './base.js';

class LuxDropdown extends LuxBase {
  init() {
    this.trigger = this.$('[data-trigger]') || this.$('button');
    this.menu    = this.$('.dropdown-menu');
    if (!this.menu || !this.trigger) return;

    if (!this.menu.id) this.menu.id = uid();
    this.trigger.setAttribute('aria-haspopup', 'menu');
    this.trigger.setAttribute('aria-expanded', 'false');
    this.trigger.setAttribute('aria-controls', this.menu.id);
    this.menu.setAttribute('tabindex', '-1');

    this.trigger.addEventListener('click', this);
    document.addEventListener('click', this);
    document.addEventListener('keydown', this);
  }
  onclick(e) {
    if (this.trigger.contains(e.target)) { this.#toggle(); return; }
    if (!this.contains(e.target)) this.#close();
  }
  onkeydown(e) {
    if (!this.#open) return;
    const items = this.$$('[role="menuitem"]:not(:disabled)');
    const idx   = items.indexOf(document.activeElement);
    if (e.key === 'Escape') { this.#close(); this.trigger.focus(); }
    if (e.key === 'ArrowDown') { e.preventDefault(); items[(idx + 1) % items.length]?.focus(); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); items[(idx - 1 + items.length) % items.length]?.focus(); }
    if (e.key === 'Home') items[0]?.focus();
    if (e.key === 'End')  items[items.length - 1]?.focus();
  }
  get #open() { return !this.menu.hidden; }
  #toggle() { this.#open ? this.#close() : this.#show(); }
  #show() {
    this.menu.hidden = false;
    this.trigger.setAttribute('aria-expanded', 'true');
    this.menu.focus();
    this.emit('lux:open');
  }
  #close() {
    this.menu.hidden = true;
    this.trigger.setAttribute('aria-expanded', 'false');
    this.emit('lux:close');
  }
  cleanup() {
    document.removeEventListener('click', this);
    document.removeEventListener('keydown', this);
  }
}

customElements.define('lux-dropdown', LuxDropdown);
