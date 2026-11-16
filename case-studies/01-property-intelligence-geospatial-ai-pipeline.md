# Case Study 01: Property Intelligence — Geospatial, Multimodal Vision & Hybrid Retrieval AI Pipeline

**Role:** Systems & AI Architect  
**Codebase Scale (Private R&D Repo):** `255` Python scripts · `130+` orchestration modules · `66` interior-retrieval & layout modules · `200` JSON Schema contracts · `563` automated test files (`pytest`/`unittest`) · `28` Architecture Decision Records (ADRs) · Decoupled `React 19 + TypeScript` UI

---

## 1. The Engineering Problem

Real-estate intelligence and automated listing enrichment combine three failure-prone domains:
1. **Unstructured visual & portal evidence:** wide-angle distortion on listing photos, redundant/missing rooms, watermarks, and mismatched attributes between broker prose and actual pixels.
2. **Heterogeneous geospatial OSINT:** reconciling official government endpoints (Cadastre, census income, flood/noise rasters) with crowd/open maps (`Overture Maps`, `Google Places`) where missing data (`NoData`) must never be hallucinated as "safe" or "quiet."
3. **LLM hallucination & schema drift:** asking an end-to-end LLM agent to inspect photos, read neighborhood metrics, and produce an audit leads to silent fact mutation (e.g., flipping Energy Certificate `G` to `UNKNOWN`, inventing CTR lift percentages, or fabricating square footage).

**Architectural Solution:** Decouple deterministic acquisition, geospatial math, local hybrid search, and semantic verification from bounded multimodal LLM calls inside an **18-stage DAG orchestrator** governed by **200 JSON Schema contracts**.

---

## 2. Diagram 1: 18-Stage Deterministic DAG Orchestrator (`S01`–`S18`)

All execution is modeled around explicit stage contracts (`SingleActionStage` and `ItemSequenceStage`), fine-grained checkpointing (`CheckpointManager`), span-level observability (`StageLogger`), and typed recovery paths.

```mermaid
flowchart LR
    subgraph Control["Orchestrator Core (Python)"]
        CFG["StageContract Registry\n(S01-S18 + Dependency Frontier)"]
        LED["job_ledger & CheckpointManager\n(Idempotent Resume / Force Flags)"]
        LOG["StageLogger\n(Structured Span Tracing)"]
    end

    subgraph Exec["Stage Execution Modes"]
        SAS["SingleActionStage\n(Atomic Acquisition / Schema Synthesis)"]
        ISS["ItemSequenceStage\n(Per-Photo / Per-Candidate Loop)"]
    end

    subgraph Res["Resilience & Contract Guard"]
        PRV["Provider Adapters\n(Gemini Vision / OpenAI / Playwright CDP)"]
        REC["provider_recovery & agent_recovery\n(Transient Retry + Cost Gates)"]
        REP["contract_repairs\n(JSON Schema Validation & Repair Loop)"]
    end

    CFG --> SAS & ISS
    SAS & ISS <--> LED
    SAS & ISS --> LOG
    SAS & ISS --> PRV
    PRV -- "Transient Failure / Rate Limit" --> REC --> PRV
    PRV -- "Structured Payload" --> REP
    REP -- "0 Schema Errors" --> LED
```

---

## 3. Diagram 2: 6-Tier Epistemic Hierarchy & Semantic Conservation Gate

To eliminate silent hallucinations, every downstream claim must declare an explicit `epistemic_class`, `status`, and cryptographic `SHA-256` provenance pointer. Any model output that contradicts an upstream observed fact or asserts an unbacked numeric lift fails deterministically before reaching the UI.

```mermaid
flowchart TD
    T1["1. CANONICAL_FACT\n(SHA-256 Binary Image Manifest, Portal Snapshot, Catastro / INE)"]
    T2["2. DETERMINISTIC_DERIVATION\n(Haversine Distances, IDW Grid, Market Percentiles)"]
    T3["3. MODEL_OBSERVATION\n(Pixel Detections: Room Type, Fixtures, Physical Traits)"]
    T4["4. MODEL_ASSESSMENT\n(Probabilistic Grading, Staging Quality, Hero Suitability)"]
    T5["5. RISK_HYPOTHESIS\n(Contextual Externalities: School Drop-off Peaks, Noise Exposure)"]
    T6["6. RECOMMENDED_ACTION\n(DATA_VERIFICATION if UNKNOWN, Media Upgrade Directives)"]

    T1 --> T2 --> T3 --> T4 --> T5 --> T6

    VAL{"Semantic Conservation\nValidator"}
    T1 -. "Immutable Ground Truth" .-> VAL
    T6 --> VAL
    VAL -- "Observed Fact Preserved &\nEntailment Verified" --> PASS["Approved JSON View-Model\n(Forensic Run Artifact)"]
    VAL -- "Fact Mutated / NoData Inverted /\nUnbacked % Lift" --> FAIL["FAIL-CLOSED REJECT\n(Block Presentation Render)"]
```

**Enforced Epistemic Invariants:**
* **Zero-Web-Access Inference:** During Layer-2 synthesis, `model_metadata.web_access` is locked to `false`; the model only reasons over the pinned snapshot bundle.
* **Negative-Evidence Preservation:** Raster `NoData` (e.g., flood `GRAY_INDEX: 999`) or offline public APIs remain `UNKNOWN` / `UNAVAILABLE` and can never be inverted into "no flood risk" or "quiet street."
* **Temporal Provenance:** Socioeconomic statistics must retain dataset reference period metadata (e.g., `INE ADRH 2023`).

---

## 4. Diagram 3: Zero-Network Local Hybrid Retrieval & Ensemble Optimizer

For product/furniture matching and staging workflows, calling hosted vector databases or external embedding APIs introduced latency, cost, and non-determinism. Instead, a **source-bound local hybrid retrieval bundle** executes completely offline inside Python.

```mermaid
flowchart LR
    Q["Typed Retrieval Query\n(object_identity, material_cues, facets\n— never raw room prose)"] --> B1["Lexical Query Serializer\n(Parser-Safe Normalized Terms)"]
    Q --> B2["Dense Query Serializer\n('query: ...' Prefix)"]

    subgraph BM25["Lane 1: Lexical Retrieval"]
        TV["Tantivy 0.26.2 Index\n(BM25 Top-100 Candidates)"]
    end

    subgraph VEC["Lane 2: Local ONNX Vector Retrieval"]
        TOK["HuggingFace tokenizers 0.23.3\n(Max 512 Tokens)"]
        ORT["ONNX Runtime 1.31.0\n(intfloat/multilingual-e5-small, CPU Sequential)"]
        POOL["Attention-Mask Mean Pooling\n+ L2 Normalization (384-d)"]
        COS["Cosine Top-100 Candidates"]
        TOK --> ORT --> POOL --> COS
    end

    B1 --> TV
    B2 --> TOK

    TV & COS --> RRF["Reciprocal Rank Fusion (k=60)\nDeterministic Tie-Break Ordering"]
    RRF --> OPT["Beam Search & Ensemble Optimizer\n(Spatial Fit, Palette Continuity, Clearance)"]
    OPT --> OUT["Shortlisted Design Ensemble"]
```

**Production Hardening Details:**
* **Immutable Model Cache Verification:** Before loading `onnx/model.onnx`, the index builder resolves Hugging Face's content-addressed `blobs/` cache and asserts exact `SHA-256` equality for `model.onnx`, `tokenizer.json`, `config.json`, and `tokenizer_config.json`, as well as pinned versions of `tantivy`, `onnxruntime`, and `tokenizers`.
* **Fail-Closed Hybrid Policy:** `lexical_only_fallback` and `model_provider_fallback` are both hardcoded to `false` (`contracts/hybrid-retrieval-bundle.schema.json`). If either lane is unavailable, the retrieval stage fails closed rather than silently degrading search quality.
* **Ablation-Driven Tuning:** Offline benchmarks (`benchmark_catalogue_retrieval_engine.py`, `benchmark_catalogue_typed_facet_ablation.py`) measure each facet's marginal recall contribution against frozen human judgments.

---

## 5. Diagram 4: Geospatial OSINT, Computer Vision & Decoupled React 19 UI

```mermaid
flowchart TB
    subgraph GEO["Geospatial & OSINT Acquisition"]
        OV["Overture Maps\n(DuckDB 1.1+ httpfs + spatial)"]
        GPOI["Google Places / POI API\n(Explicit Cost-Gate Plan)"]
        GOV["Official Spanish Sources\n(Catastro, INE, IGN/MITECO)"]
        SHP["Shapely 2.0 Geometry\n(Haversine & Property-Centered Buffers)"]
        OV & GPOI & GOV --> SHP
    end

    subgraph CV["Computer Vision & 2D Spatial Projection"]
        CDP["Persistent Chrome CDP\n(Playwright Acquisition + SHA-256)"]
        CAM["Manhattan-World Camera Calibration\n& Wide-Angle Normalization"]
        LINT["2D Spatial Clearance Linter\n& Floorplan SVG Composer"]
        CDP --> CAM --> LINT
    end

    subgraph UI["Isolated Presentation Layer (frontend/)"]
        SYNC["Build Bridge (sync-listing-data.mjs)\nValidates & Stages View-Model JSON"]
        REACT["React 19 + TypeScript + Vite\nTailwind CSS v4 + Motion"]
        SYNC --> REACT
    end

    SHP & LINT --> SYNC
```

**Decoupled UI Boundary:** The `frontend/` React 19 application has zero runtime access to scrapers, LLM SDKs, or collector internals. It is strictly a pure renderer over validated view-model JSON artifacts, verified by automated token and diagnosis profile tests.
