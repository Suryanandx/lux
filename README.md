# Lux UI

Zero-weight UI kit for modern SaaS. ~9KB total (gzipped). No dependencies.

**[Docs →](https://lux.valthrax.com)** · **[Components →](https://lux.valthrax.com/components)**

## What it is

Lux is a semantic, classless-first CSS + Web Component library built for SaaS dashboards, admin panels, and AI products. It styles native HTML elements directly — `<button>`, `<input>`, `<dialog>` — with zero class overhead.

## Size

| File | Raw | Gzipped |
|------|-----|---------|
| `lux.min.css` | ~35KB | ~7.3KB |
| `lux.min.js`  | ~5KB  | ~2.0KB |
| **Total**     |       | **~9.3KB** |

## Install

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@suryanandx/lux/dist/lux.min.css">
<script src="https://cdn.jsdelivr.net/npm/@suryanandx/lux/dist/lux.min.js"></script>
```

```bash
npm install @suryanandx/lux
```

## Usage

```html
<!-- Buttons -->
<button>Default</button>
<button data-variant="brand">Deploy</button>
<button data-variant="outline">Cancel</button>
<button data-variant="brand" aria-busy="true">Loading…</button>

<!-- Forms -->
<div class="field">
  <label>API Key</label>
  <input type="text" placeholder="sk-proj-…" />
  <span class="field-hint">Keep this secret.</span>
</div>

<!-- Toast (JS) -->
lux.toast.success({ title: 'Deployed!', message: 'v2.4.1 is live.' });
```

## Theming

Override one variable, the entire system reacts:

```css
:root {
  --brand: #6366f1; /* your brand color */
}
```

## Components

Buttons · Dropdown · Inputs · Checkbox · Radio · Switch · Range · Card · Stat Card · Table · Alert · Badge · Toast · Progress · Spinner · Skeleton · Tabs · Accordion · Dialog · Sheet · Avatar · Avatar Group · Tooltip · Nav · Breadcrumb · Pagination · Typography · Empty State

## Build

```bash
npm install
node build.js
```

## License

MIT · Built by [Suryanand](https://suryanand.com)
