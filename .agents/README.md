# Local Agent Skills Registry (`Architecture-showcase`)

This repository packages its UI/UX intelligence and Atomic Design methodology locally under `.agents/skills/` so design system generation, component architecture, and accessibility checks remain deterministic and reproducible across machines and agent sessions.

## Installed Skills

| Local Path | Upstream Source | Role in Project |
| :--- | :--- | :--- |
| [`.agents/skills/ui-ux-pro-max`](skills/ui-ux-pro-max/SKILL.md) | [`nextlevelbuilder/ui-ux-pro-max-skill`](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | Visual direction, typography (`JetBrains Mono` / `IBM Plex Sans`), dark-mode palettes, chart accessibility rules, Next.js guidelines, and `design-system/architecture-showcase/MASTER.md` generation |
| [`.agents/skills/atomic-design-fundamentals`](skills/atomic-design-fundamentals/SKILL.md) | [`TheBushidoCollective/han` (`atomic-design`)](https://github.com/TheBushidoCollective/han/tree/main/plugins/patterns/atomic-design/skills) | 6-stage component hierarchy (`Quarks -> Atoms -> Molecules -> Organisms -> Templates -> Pages`) and strict upward-only import rules |
| [`.agents/skills/atomic-design-quarks`](skills/atomic-design-quarks/SKILL.md) | [`TheBushidoCollective/han` (`atomic-design`)](https://github.com/TheBushidoCollective/han/tree/main/plugins/patterns/atomic-design/skills) | Sub-atomic non-visual tokens (`colors`, `typography`, `spacing`, `radii`, `shadows`, `motion`, `z-index`, `breakpoints`) mapped to Tailwind CSS v4 `@theme` |
| [`.agents/skills/atomic-design-atoms`](skills/atomic-design-atoms/SKILL.md) | [`TheBushidoCollective/han` (`atomic-design`)](https://github.com/TheBushidoCollective/han/tree/main/plugins/patterns/atomic-design/skills) | Stateless indivisible primitives (`Button`, `Badge`, `StatusPill`, `TechTag`, `Icon`, `SurfaceCard`, `CodeToken`, `MetricNumber`) |
| [`.agents/skills/atomic-design-molecules`](skills/atomic-design-molecules/SKILL.md) | [`TheBushidoCollective/han` (`atomic-design`)](https://github.com/TheBushidoCollective/han/tree/main/plugins/patterns/atomic-design/skills) | Single-purpose functional atom groups (`MetricStatCard`, `TechFilterGroup`, `SubsystemTabStrip`, `DagStageNode`, `EpistemicTierRow`, `FoldSplitBar`, `ContextLayerRow`) |
| [`.agents/skills/atomic-design-organisms`](skills/atomic-design-organisms/SKILL.md) | [`TheBushidoCollective/han` (`atomic-design`)](https://github.com/TheBushidoCollective/han/tree/main/plugins/patterns/atomic-design/skills) | Context-aware interactive sections (`ShowcaseHeader`, `HeroArchitectureSplit`, `InteractiveTechExplorer`, `PropertyIntelligenceSection`, `OracleWaveYSection`, `GuelgaSection`, `ContractInspectorDrawer`) |
| [`.agents/skills/atomic-design-templates`](skills/atomic-design-templates/SKILL.md) | [`TheBushidoCollective/han` (`atomic-design`)](https://github.com/TheBushidoCollective/han/tree/main/plugins/patterns/atomic-design/skills) | Content-agnostic page layouts accepting Zod-validated `next-intl` payloads (`ShowcaseLandingTemplate`, `SystemDeepDiveTemplate`, `ContractExplorerTemplate`) |
| [`.agents/skills/atomic-design-integration`](skills/atomic-design-integration/SKILL.md) | [`TheBushidoCollective/han` (`atomic-design`)](https://github.com/TheBushidoCollective/han/tree/main/plugins/patterns/atomic-design/skills) | Next.js App Router + React 19 + TypeScript folder structure, barrel exports, custom hooks, and `forwardRef` component patterns |

## Operating Workflow

1. **Design Intelligence & Tokens:** Consult [`design-system/architecture-showcase/MASTER.md`](../design-system/architecture-showcase/MASTER.md) or query `.agents/skills/ui-ux-pro-max/scripts/search.py` before making visual, chart, or Next.js implementation decisions.
2. **Component Architecture:** Follow [`docs/atomic-design-system.md`](../docs/atomic-design-system.md) strictly. Never skip layers or hardcode hex values/copy strings inside Atoms, Molecules, Organisms, or Templates.
3. **Content Separation:** All English copy, chart data series, and labels live inside `src/content/locales/en/*.json` validated by `Zod` (`src/content/schema.ts`), loaded via `next-intl` at the **Page** layer.
