# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Architecture Showcase
**Generated:** 2026-11-16 12:53:27
**Category:** API Developer Portal
**Design Dials:** Variance 6/10 (Balanced / Modern) | Motion 6/10 (Standard) | Density 6/10 (Standard)

---

## Global Rules

### Color Palette

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Primary | `#0F172A` | `--color-primary` |
| On Primary | `#FFFFFF` | `--color-on-primary` |
| Secondary | `#1E293B` | `--color-secondary` |
| On Secondary | `#FFFFFF` | `--color-on-secondary` |
| Accent/CTA | `#22C55E` | `--color-accent` |
| On Accent/CTA | `#0F172A` | `--color-on-accent` |
| Background | `#020617` | `--color-background` |
| Foreground | `#F8FAFC` | `--color-foreground` |
| Card | `#0E1223` | `--color-card` |
| Card Foreground | `#F8FAFC` | `--color-card-foreground` |
| Muted | `#1A1E2F` | `--color-muted` |
| Muted Foreground | `#94A3B8` | `--color-muted-foreground` |
| Border | `#334155` | `--color-border` |
| Destructive | `#EF4444` | `--color-destructive` |
| On Destructive | `#000000` | `--color-on-destructive` |
| Ring | `#38BDF8` | `--color-ring` |
| System 01 Accent (Property Intelligence) | `#6366F1` | `--color-system-pi` |
| System 02 Accent (Oracle & Wave Y) | `#06B6D4` | `--color-system-oracle` |
| System 03 Accent (GÜELGA) | `#F59E0B` | `--color-system-guelga` |
| Warning / Gated | `#F59E0B` | `--color-warning` |

**Color Notes:** Code dark (`#020617` / `#0F172A`) + endpoint verification green (`#22C55E`) + system identity hues (`#6366F1` Indigo, `#06B6D4` Cyan, `#F59E0B` Amber) for cross-system diagrams, always paired with shape/pattern/direct labels for WCAG compliance.

### Typography

- **Heading Font:** JetBrains Mono
- **Body Font:** IBM Plex Sans
- **Mood:** code, developer, technical, precise, functional, hacker
- **Google Fonts:** [JetBrains Mono + IBM Plex Sans](https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap)

**CSS Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
```

### Spacing Variables

*Density: 6/10 — Standard*

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` / `0.25rem` | Tight gaps |
| `--space-sm` | `8px` / `0.5rem` | Icon gaps, inline spacing |
| `--space-md` | `16px` / `1rem` | Standard padding |
| `--space-lg` | `24px` / `1.5rem` | Section padding |
| `--space-xl` | `32px` / `2rem` | Large gaps |
| `--space-2xl` | `48px` / `3rem` | Section margins |
| `--space-3xl` | `64px` / `4rem` | Hero padding |

### Shadow Depths

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle lift |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` | Cards, buttons |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Modals, dropdowns |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.15)` | Hero images, featured cards |

---

## Component Specs

### Buttons

```css
/* Primary Button — WCAG AAA high-contrast dark text on verification green */
.btn-primary {
  background: #22C55E;
  color: #0F172A;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}

.btn-primary:hover {
  opacity: 0.92;
  transform: translateY(-1px);
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: #F8FAFC;
  border: 1px solid #334155;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}

.btn-secondary:hover {
  border-color: #94A3B8;
  background: #0F172A;
}
```

### Cards

```css
.card {
  background: #0E1223;
  border: 1px solid #334155;
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--shadow-md);
  transition: all 200ms ease;
}

.card:hover {
  border-color: #475569;
  box-shadow: var(--shadow-lg);
}
```

### Inputs

```css
.input {
  background: #0F172A;
  color: #F8FAFC;
  padding: 12px 16px;
  border: 1px solid #334155;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 200ms ease;
}

.input:focus {
  border-color: #38BDF8;
  outline: none;
  box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.25);
}
```

### Modals

```css
.modal-overlay {
  background: rgba(2, 6, 23, 0.75);
  backdrop-filter: blur(4px);
}

.modal {
  background: #0E1223;
  color: #F8FAFC;
  border: 1px solid #334155;
  border-radius: 16px;
  padding: 32px;
  box-shadow: var(--shadow-xl);
  max-width: 720px;
  width: 92%;
}
```

### Chart & Data Visualization Accessibility Rules (from `ui-ux-pro-max` `chart` domain)

- **Never rely on color alone:** Every bar group, scatter cluster (`UMAP + HDBSCAN`), and CV fold interval (`Train`, `PURGE_4H_MS`, `Test`) pairs color with direct labels, distinct point shapes (`circle`, `triangle`, `diamond`, `cross`), or SVG hatch/stripe patterns.
- **Accessible fallback:** Every interactive chart provides a keyboard-focusable series toggle and an expandable raw summary table.
- **SVG vs. Canvas threshold:** Use SVG for `< 500` data points (`UMAP` illustrative regime clusters, `RRF` bars, `Purged CV` timeline) for crisp scaling and ARIA attributes.

---

## Style Guidelines

**Style:** Minimalism & Swiss Style

**Keywords:** Clean, simple, spacious, functional, white space, high contrast, geometric, sans-serif, grid-based, essential

**Best For:** Enterprise apps, dashboards, documentation sites, SaaS platforms, professional tools

**Key Effects:** Subtle hover (200-250ms), smooth transitions, sharp shadows if any, clear type hierarchy, fast loading

### Page Pattern

**Pattern Name:** FAQ/Documentation Landing

- **Conversion Strategy:** Reduce support tickets. Track search analytics. Show related articles. Contact escalation path.
- **CTA Placement:** Search bar prominent + Contact CTA for unresolved questions
- **Section Order:** Hero with search bar > Popular categories > FAQ accordion > Contact/support CTA

---

## Motion

**Stagger List** (Standard) — Trigger: load or scroll | Duration: 300-450ms | Easing: `back.out(1.4)`

```js
gsap.from('.grid-item', { opacity: 0, scale: 0.92, y: 16, duration: 0.4, stagger: { each: 0.06, from: 'start', grid: 'auto' }, ease: 'back.out(1.4)' });
```

**Framework notes:** grid: 'auto' lets GSAP infer rows/columns from a CSS grid layout for a natural wave stagger; Use matchMedia('(prefers-reduced-motion: reduce)') to skip non-essential motion and render the final state immediately

- ✅ Combine with from: 'center' for a bento-grid layout to draw the eye inward first
- ❌ Don't use back.out on dense data tables; the overshoot reads as sloppy on informational UI
- ⚡ Group DOM writes; avoid interleaving layout reads (getBoundingClientRect) between staggered tweens

---

## Anti-Patterns (Do NOT Use)

- ❌ Buried endpoints
- ❌ Broken version switching
- ❌ missing rate-limit state

### Additional Forbidden Patterns

- ❌ **Emojis as icons** — Use SVG icons (Heroicons, Lucide, Simple Icons)
- ❌ **Missing cursor:pointer** — All clickable elements must have cursor:pointer
- ❌ **Layout-shifting hovers** — Avoid scale transforms that shift layout
- ❌ **Low contrast text** — Maintain 4.5:1 minimum contrast ratio
- ❌ **Instant state changes** — Always use transitions (150-300ms)
- ❌ **Invisible focus states** — Focus states must be visible for a11y

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

- [ ] No emojis used as icons (use SVG instead)
- [ ] All icons from consistent icon set (Heroicons/Lucide)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No content hidden behind fixed navbars
- [ ] No horizontal scroll on mobile
