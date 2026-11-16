# Case Study 03: GÜELGA — AI-Governed Design System Monorepo & Progressive Context Architecture

**Role:** Design System & AI Governance Architect  
**Codebase Scale (Private R&D Repo `guelga`):** `6` NPM Workspace packages (`@guelga/*`) · `3` React 19 applications (including interactive Widgetbook & Journey State Graph prototype) · `11` formal Approval Gates · `70` tracked engineering tickets (`DS-R01`..`DS-R56`, `T28-CR01`..`T28-CR14`) · Automated `Playwright` + `Axe-core` + `SHA-256` release verification

---

## 1. The Engineering Problem

When using AI coding agents to build a multi-application design system and digital brand platform, teams quickly hit two failure modes:
1. **Context Window Pollution ("Context Rot"):** Giving an agent unrestricted access to an entire repository of historical audits, superseded prototypes, and generic UI skills causes the model to average out contradictory drafts and collapse into generic AI SaaS templates.
2. **Governance & Parity Drift:** Components documented in static HTML or Figma diverge from live React implementations, accessibility regresses silently, and generated assets overwrite verified vector geometry.

**Architectural Solution:** Pair a strictly typed **NPM Workspaces React 19 Design System Monorepo (`@guelga/*`)** with a formal **`L0–L5` Progressive Context Retrieval Policy** and a deterministic **Release QA Pipeline**.

---

## 2. Diagram 1: NPM Workspaces Design System Monorepo (`@guelga/*`)

```mermaid
flowchart TB
    subgraph Packages["Exportable Libraries (design-system/packages/)"]
        TOK["@guelga/tokens\n(Primitive & Semantic Design Tokens)"]
        STY["@guelga/styles\n(Base CSS, Typography & Cascade Reset)"]
        ICO["@guelga/icons\n(Accessible SVG Icon Sprite)"]
        LOC["@guelga/locales\n(Tri-Lingual i18n: EN / ES / AST)"]
        MOT["@guelga/motion-react\n(Spring Physics & Motion Contracts)"]
        RCT["@guelga/react\n(Atoms, Molecules, Organisms, Hooks)"]

        TOK --> STY & RCT
        STY & ICO & LOC & MOT --> RCT
    end

    subgraph Apps["Consumer Applications (design-system/apps/)"]
        DOCS["@guelga/docs\n(Interactive Widgetbook & Parity Inspector)"]
        WEB["apps/web\n(Production Web Surface)"]
        FLUX["apps/fluxu-journey-prototype\n(Journey State Graph & Continuity Prototype)"]
    end

    RCT --> DOCS & WEB & FLUX
    TOK & MOT --> FLUX
```

---

## 3. Diagram 2: `L0–L5` Progressive AI Context Retrieval Gate & Role Routing

Before any design or implementation task executes, `GUELGA_DESIGN_RETRIEVAL_POLICY_v1.json` restricts which repository layers the AI agent is permitted to load, enforcing strict separation between brand judgment (`L1–L2`), human approval gates, and code implementation (`L3`).

```mermaid
flowchart TD
    L0["L0: Always Active Minimum Context\n(AGENTS.md, Retrieval Policy, Authority Manifest, Ticket_CURRENT_DECISION.md)"]
    L1["L1: Semantic Design Principles\n(Retrieve only relevant Principle routes — never all 22 routes)"]
    L2["L2: Canonical Demonstrations\n(Proves stated layout relationship only; never blanket permission)"]
    GATE{"Human Visual Gate\n(11 Approval Gates in Register)\nor Frozen Visual Contract?"}
    L3["L3: Implementation Mapping\n(@guelga/tokens, @guelga/react APIs, Widgetbook Specimens)"]
    L4["L4: Specialist & QA Invocation\n(Accessibility, Contrast, Render Checks — zero art direction authority)"]
    L5["L5: Forensic Summons Only\n(Historical Ticket 28, Legacy HTML — requires explicit nonauthoritative declaration)"]
    L6["L6: Permanently Excluded Noise\n(dist/, node_modules/, unapproved exploration artifacts)"]

    L0 --> L1 --> L2 --> GATE
    GATE -- "Approved / Frozen" --> L3 --> L4
    GATE -- "Unapproved" --> STOP["Label Output EXPLORATION Only\n(Blocked from Production Tokens)"]
    L5 -. "Explicit Forensic Summons Only" .-> L1
    L6 -. "Blocked from Reasoning" .-> L0
```

**5-Persona Role Routing (`process/agents/`):**
* `brand-strategist` (positioning, voice, brand architecture)
* `art-director` (visual territories, materiality, imagery direction)
* `ui-ux-designer` (information architecture, interaction, WCAG accessibility)
* `design-system-engineer` (tokens, React packages, Widgetbook parity)
* `qa-editor` (evidence, typography, render parity, release sign-off)

One role leads each ticket while downstream roles act as reviewers, preventing simulated self-approval within a single agent turn.

---

## 4. Diagram 3: Journey Continuity State Graph & Release QA Pipeline

In `apps/fluxu-journey-prototype` (Tickets `T28-CR01`..`T28-CR14`) and the release verification script (`verify_exploration.sh`), state transitions and release artifacts undergo deterministic automated verification:

```mermaid
flowchart LR
    subgraph Continuity["Journey Continuity State Graph (React 19 + Motion)"]
        S_HERO["Hero & Photo Selection\n(T28-CR10)"] --> S_FIT["Amenity Evidence Transfer\n(T28-CR04)"]
        S_FIT --> S_MKT["Content-to-Market Shared Layout\n(T28-CR05)"]
        S_MKT --> S_DISC["Market Search Discovery\n(T28-CR06)"]
    end

    subgraph QA["Deterministic Release Verifier (verify_exploration.sh)"]
        PW["Playwright Multi-Viewport Renders\n(Desktop + Mobile Screenshots)"]
        AXE["Axe-core Automated Audit\n(WCAG Contrast, Landmarks, ARIA)"]
        HASH["SHA-256 Asset & Font Verification\n(Newsreader / IBM Plex Sans Hashes)"]
        SVG["Byte-Identical SVG Check\n(cmp -s Source vs. Released Logo Marks)"]
        PDF["PDF Contact Sheet & Render Audit"]
    end

    Continuity --> QA
```

**Key Engineering Outcomes:**
* **Zero Silent Regressions:** Any accidental modification to licensed typography binaries, logo mark Bézier geometry, or ARIA attributes fails the release gate immediately (`FAIL` exit status).
* **Skill Isolation:** Generic external design/frontend skills are explicitly scoped as `implementation_or_mapping_only` or `qa_only`, ensuring they can accelerate React/CSS execution without overriding brand constitution or token contracts.
