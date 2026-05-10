let _id = 0;
const uid = () => `lux-${++_id}`;

class LuxBase extends HTMLElement {
  #ready = false;
  connectedCallback() { if (!this.#ready) { this.#ready = true; this.#setup(); } }
  disconnectedCallback() { this.cleanup?.(); }
  #setup() {
    this.removeAttribute('hidden');
    this.init();
  }
  init() {}
  $(q, el = this)   { return el.querySelector(q); }
  $$(q, el = this)  { return [...el.querySelectorAll(q)]; }
  emit(name, detail = {}) {
    this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
  }
  handleEvent(e) { this[`on${e.type}`]?.(e); }
}

export { LuxBase, uid };
