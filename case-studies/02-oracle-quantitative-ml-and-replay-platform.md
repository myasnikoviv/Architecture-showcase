# Case Study 02: Oracle & Wave Y — Quantitative ML Research, Visual DAG Compiler & Deterministic Replay Platform

**Role:** Principal Systems & ML Infrastructure Engineer  
**Codebase Scale (Private R&D Repo `trade_bot`):** `24` TypeScript domain modules (`src/`) · `100+` Python ML & research tools (`src/tools/`) · `React 18 + React Flow v12` visual strategy cockpit · CI hardening & replay parity harnesses

> **Scope & Accuracy Note:** This case study documents the **ML methodology, leakage prevention controls, data engineering stack, visual DAG compiler, and deterministic execution parity** built in the platform. Proprietary alpha configurations remain private, and no live financial return claims are made.

---

## 1. The Engineering Problem

Most algorithmic research codebases collapse under four structural failure modes:
1. **Lookahead & Episode Leakage:** Standard k-fold cross-validation leaks overlapping forward outcome windows across train/test splits, inflating backtest metrics that immediately fail out-of-sample.
2. **Backtest-to-Live Execution Drift:** Writing strategy research in notebooks (`Python`) and rewriting execution logic separately (`TypeScript`/`Node.js`) creates subtle indicator, rounding, and order-lifecycle divergences.
3. **Opaque "Black-Box" ML Without Economic Baselines:** Deploying gradient-boosted trees without calibrated linear benchmarks, feature ablation, or fee/slippage/funding simulation masks whether non-linear complexity adds real signal.
4. **Regime Non-Stationarity:** Treating heterogeneous market structures (trend persistence vs. structural churn vs. volatility compression) with a single static threshold degrades signal quality across cycles.

---

## 2. Diagram 1: End-to-End Hybrid Platform Architecture

The platform bridges a **TypeScript/Node.js execution & compilation plane** with a **Python columnar ML plane** over a unified source-verified data lakehouse.

```mermaid
flowchart TB
    subgraph Ingest["1. Venue & Lineage Boundary"]
        MG["Market Gateway & Backfill\n(Binance USD-M Futures API / Vision Archives)"]
        SHA["SHA-256 Digest Pinning\n(Fail-Closed Venue Isolation)"]
        MG --> SHA
    end

    subgraph Storage["2. Columnar & Relational Lakehouse"]
        PQ["Parquet Archives\n(PyArrow 16.1 + DuckDB 1.5.5)"]
        PG["PostgreSQL\n(discovery_dataset_rows, Lifecycle & Ledger)"]
        RD["Redis (ioredis) + SQLite\n(Optimizer Queues, State Cache)"]
        SHA --> PQ & PG
    end

    subgraph Research["3. Python Quantitative ML Plane"]
        OR["Oracle Supervised ML\n(LightGBM 4.6 + Scikit-Learn 1.9)"]
        WY["Wave Y Unsupervised Mining\n(UMAP + HDBSCAN 0.8.33 + SciPy)"]
        PQ & PG --> OR & WY
    end

    subgraph Cockpit["4. Visual Strategy Cockpit & Compiler"]
        RF["React 18 + @xyflow/react v12\n(Dagre Layout, Zustand, Lightweight Charts)"]
        CMP["TypeScript AST Compiler\n(AJV JSON Schema + BlockLogicManifest)"]
        RF --> CMP
    end

    subgraph Runtime["5. Deterministic Kernel (1:1 Parity)"]
        KER["Shared Decision Engine\n(Backtest / Replay proc204-206 / Paper / Live)"]
        EXE["Express 5 + WebSockets (ws) + CCXT\n(Idempotent Execution Dispatcher)"]
        CMP --> KER --> EXE
        PG & RD <--> KER
    end
```

---

## 3. Diagram 2: `Oracle` Purged Walk-Forward & Episode-Grouped Validation Pipeline

To guarantee zero temporal or episode leakage when training `LightGBM` (`LGBMClassifier`, `LGBMRegressor`) and `Scikit-Learn` models (`LogisticRegression`, `StandardScaler`, `SimpleImputer`), every feature row carries explicit causality timestamps (`capturedAt`, `outcomeAvailableAt`) and an episode identifier (`symbol|episodeId`).

```mermaid
flowchart TD
    RAW["Parquet + Relational Corpus\n(Point-in-Time Features Only)"] --> GUARD{"Feature Leakage Guard\nAssert no 'outcome', 'label', or 'forward_*'"}
    GUARD --> SPLIT["Expanding / Walk-Forward Quantile Folds\n(Temporal Cutoffs + PURGE_4H_MS Buffer)"]

    SPLIT --> TR["Train Set:\noutcomeAvailableAt < fold_start"]
    SPLIT --> TE["Test Set:\ncapturedAt >= fold_start AND outcomeAvailableAt <= fold_end"]

    TR & TE --> CHK{"Episode Overlap Assert\nset(train.group) ∩ set(test.group) == ∅"}
    CHK -- "Leak Detected" --> ABORT["Raise RuntimeError('episode leakage')"]
    CHK -- "Clean" --> MODELS

    subgraph MODELS["Challenger vs. Baseline Suite"]
        M1["Prior / Historical Rate Baseline"]
        M2["Direction-Only Linear\n(SimpleImputer + StandardScaler + LogisticRegression)"]
        M3["Full-Surface Linear Baseline"]
        M4["Challenger: LightGBM\n(full_lightgbm / side_specific_lightgbm)"]
    end

    MODELS --> EVAL["Out-of-Sample Evaluation\n(Per-Class ROC-AUC, Log-Loss, Calibration)"]
    EVAL --> PF["Economic Replay Simulation\n(Net Fees, Slippage, Funding, Drawdown, PF)"]
```

**Why This Pattern Matters:**
* **Strict Causality Boundary:** No training observation whose outcome becomes known after `fold_start` can enter a fold's training set, and `set(train.group) & set(test.group)` is checked programmatically before fitting.
* **Challenger Accountability:** `LightGBM` (`max_depth=3, num_leaves=8` constrained complexity to prevent overfitting) must prove statistically meaningful lift over regularized `LogisticRegression` on both probability calibration (`log_loss`) and net-of-cost replay before any promotion decision.

---

## 4. Diagram 3: `Wave Y` Unsupervised Market Regime Discovery

Rather than hand-coding arbitrary regime rules, `Wave Y` projects 30+ engineered microstructural and cross-asset features into a density-clustered manifold and tests whether discovered clusters persist out-of-sample.

```mermaid
flowchart LR
    subgraph Feat["30+ Point-in-Time Features (PostgreSQL / Parquet)"]
        F1["Microstructure & Orderflow\n(Taker Buy/Sell Ratio, Global/Top Account Ratios)"]
        F2["Price Geometry & Structure\n(Trend Persistence, Structural Churn, Effort Follow-Through)"]
        F3["Cross-Asset Leadership\n(BTC/ETH Leadership, Sector Proxy, Market Breadth)"]
    end

    Feat --> SCL["StandardScaler\n(Fitted Strictly on In-Sample Cutoff)"]
    SCL --> UMAP["UMAP Manifold Projection\n(Non-Linear Dimensionality Reduction)"]
    UMAP --> HDB["HDBSCAN Clustering\n(Density-Based Regime Discovery + Noise Handling)"]

    HDB --> VAL1["Feature Ablation (hl02)\n& Radius Sensitivity (hl01)"]
    HDB --> VAL2["Counterfactual Attribution\n& Morphology Profiling"]
    HDB --> VAL3["Out-of-Sample Portability Validator\n(Temporal Holdout Stability)"]
```

---

## 5. Diagram 4: Visual DAG Compiler, Execution Parity & Multi-Agent Governance

```mermaid
flowchart LR
    UI["Visual Node-Graph Editor\n(@xyflow/react + Dagre + Zustand)"] --> MAN["Block Logic Manifest\n(updateBlockLogicManifest.ts --check)"]
    MAN --> AJV["AJV JSON Schema Contract Check"]
    AJV --> AST["Deterministic Strategy AST"]

    AST --> BT["Backtest Mode"]
    AST --> REP["Historical Replay Harness\n(proc204 / proc206 Parity Tests)"]
    AST --> PAP["Paper / Testnet Mode"]
    AST --> LIV["Live Runtime (Express 5 + CCXT)"]

    CI["CI Hardening Gates\n(hardening_gates.sh + Jest + Pytest)"] --> MAN & REP
```

**Core Operational Invariants:**
1. **Single Decision Kernel:** Mode differences live exclusively in clock, broker, and diagnostics adapters—never in strategy decision math.
2. **Contract-Driven Promotion Ladder:** `hypothesis -> historical evidence -> replay parity -> paper/sandbox -> limited live`.
3. **Structured AI Research Governance (`Luna` / `Sol`):** Bounded coding/verification tickets enforce editable-path allowlists, frozen evaluation contracts, and `SHA-256` cold-archive verification (`report_archive.py`) for generated Parquet/JSON evidence.
