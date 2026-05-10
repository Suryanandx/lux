# Changelog

All notable changes to Lux UI are documented here.

## [0.2.0] — 2026-05-11

### Added — Components
- **Command palette** (`<lux-cmdk>`) — fuzzy search, arrow keys, group headers, ⌘K binding
- **Segmented control** (`.segmented`) — modern alternative to radio groups
- **Stepper** (`.stepper`) — progress steps with active/complete states
- **Banner** (`.banner`) — top-of-page announcement bar, dismissible
- **Hover card** (`.hover-card`) — pure CSS popover-on-hover
- **Code block** (`.code`) — terminal-style code with header + copy button
- **Number input** (`.number-input`) — input with +/− steppers
- **Tag input** (`<lux-tag-input>`) — chip-based multi-value input
- **Rating** (`.rating`) — star rating, keyboard-accessible
- **File drop** (`<lux-file-drop>`) — drag-and-drop upload zone with file list
- **Timeline** (`.timeline`) — vertical event timeline with state markers
- **Marquee** (`.marquee`) — infinite logo strip with hover-pause
- **Sparkline** (`.sparkline`) — pure-CSS micro chart
- **Pricing card** (`.pricing-card`) — tier card with Popular badge
- **Status dot** (`.status-dot`) — live status indicator with ping animation
- **Card variants** — glass, gradient-border, elevated

### Added — Theming
- **Theme manager** (`lux.theme`) — light/dark/system mode with localStorage persistence
- **Brand color override** — `lux.theme.setBrand("#hex")` recolors entire system
- **Theme toggle** (`.theme-toggle`) — segmented 3-mode switcher
- **Brand picker** (`.brand-picker`) — color swatches with active state

### Added — Behaviors
- **Animated counters** — `data-counter` attribute counts up on scroll
- **Sortable tables** — `<th data-sort>` becomes clickable asc/desc
- **Copy buttons** — `data-copy` attribute copies text or element content
- **Spring easings** — added `--s-14`, `--s-20`, `--s-24` to spacing scale

### Added — Docs
- New `/examples` page — 12 production SaaS recipes
- New `/showcase` page — 4 full mini-dashboards (Analytics, AI Studio, Team, Logs)
- New `/compare` page — feature matrix vs shadcn, HeroUI, MUI, Bootstrap
- New `/theming` playground — live preset picker + custom hex with persistence

### Fixed
- Missing `--s-14`, `--s-20`, `--s-24` spacing tokens caused zero-padding sections on landing page
- CSS `@layer` cascade now correctly applies after `:root` token additions
- All landing-page demos now functional (tabs switch, toasts fire, palette opens, counters animate)

### Changed
- Bundle: 12.0KB gz (8.2 CSS + 3.8 JS) — up from 9.3KB but with 16 new components
- JS modular per-component — tree-shakable when bundling

## [0.1.0] — 2026-05-10
Initial release: 30 base components, semantic-first CSS, `light-dark()` dark mode, zero dependencies.
