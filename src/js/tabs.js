import { LuxBase } from './base.js';

class LuxTabs extends LuxBase {
  init() {
    this.tabs   = this.$$('[role="tab"]');
    this.panels = this.$$('[role="tabpanel"]');
    this.tabs.forEach(t => t.addEventListener('click', this));
    this.addEventListener('keydown', this);
    const active = this.$('[role="tab"][aria-selected="true"]') || this.tabs[0];
    if (active) this.#activate(active, false);
  }
  onclick(e) {
    const tab = e.target.closest('[role="tab"]');
    if (tab) this.#activate(tab);
  }
  onkeydown(e) {
    const tabs = this.tabs.filter(t => !t.disabled);
    const idx  = tabs.indexOf(document.activeElement);
    if (idx === -1) return;
    const map = { ArrowRight: 1, ArrowLeft: -1, Home: -idx, End: tabs.length - 1 - idx };
    const d = map[e.key];
    if (d === undefined) return;
    e.preventDefault();
    const next = tabs[(idx + d + tabs.length) % tabs.length];
    this.#activate(next);
    next.focus();
  }
  #activate(tab, emit = true) {
    const targetId = tab.getAttribute('aria-controls');
    this.tabs.forEach(t => t.setAttribute('aria-selected', String(t === tab)));
    this.panels.forEach(p => { p.hidden = p.id !== targetId; });
    if (emit) this.emit('lux:tab', { tab, panelId: targetId });
  }
}

customElements.define('lux-tabs', LuxTabs);
