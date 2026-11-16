---
name: motion-design
description: Frame-accurate, non-overflowing Motion Design choreography for interactive architecture explainers using motion/react (Framer Motion) and Tailwind v4 Daylight tokens.
---

# Motion Design Skill (Architecture Showcase)

## Core Principles
1. **Explain an idea visually, never decorate aimlessly:** Every animation must answer *"how does this system work and why?"* (e.g., data flowing from APIs into a schema gate, a look-ahead leakage shield blocking future timestamps, or hybrid search fusing keyword + vector scores).
2. **Code-driven choreography:** Animations are written as deterministic React + `motion/react` recipes with explicit beats (`0..3`), interactive play/pause, and clickable beat selectors so recruiters can watch the loop or inspect any stage at their own pace.
3. **Zero text overflow & legible type:**
   - Every animated card or node must use `min-w-0` and `overflow-hidden` or wrapping flex containers.
   - Status pills inside constrained grid columns must wrap or truncate cleanly (`max-w-full truncate`) and never bleed outside card borders.
   - Minimum caption/badge size: `11px` (`text-[11px]`) or `12px` (`text-xs`).
4. **No raw hex colors:** Use Tailwind v4 `@theme` tokens (`bg-system-pi`, `text-system-oracle`, `border-border-strong`, `bg-surface-1`) in all components.
5. **Respect reduced motion:** Keep transitions crisp (`0.28s–0.45s` cubic/spring) and allow pausing auto-advance at any time.
