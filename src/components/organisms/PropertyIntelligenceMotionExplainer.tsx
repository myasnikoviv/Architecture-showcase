"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { clsx } from "clsx";
import { Icon, StatusPill, Text } from "@/components/atoms";

const BEATS = [
  {
    id: "collect",
    step: "01",
    label: "Collect Sources",
    title: "Gather Photos, Maps & Official Registries",
    caption:
      "Pulls listing photos, Overture Maps buildings, Google Places POIs, and Spanish Catastro records into one DuckDB geospatial hub.",
  },
  {
    id: "vision",
    step: "02",
    label: "Vision & Rooms",
    title: "Scan Room Photos & Camera Geometry",
    caption:
      "Gemini Vision tags room types, estimates camera angle and natural light, and drops blurry or duplicate frames before indexing.",
  },
  {
    id: "hybrid-rag",
    step: "03",
    label: "Hybrid RAG",
    title: "Fuse Keyword + Vector Interior Search",
    caption:
      "Splits a query into exact Tantivy BM25 keyword tokens and local 384-d ONNX vector embeddings, then merges scores with RRF.",
  },
  {
    id: "guard",
    step: "04",
    label: "Hallucination Gate",
    title: "Block Unsupported Claims Before Output",
    caption:
      "Every statement must cite a photo or registry ID. Unsupported claims are rejected by the schema gate before reaching the UI.",
  },
] as const;

export function PropertyIntelligenceMotionExplainer() {
  const [beat, setBeat] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => {
      setBeat((prev) => (prev + 1) % BEATS.length);
    }, 3600);
    return () => window.clearInterval(timer);
  }, [isPlaying]);

  const current = BEATS[beat];

  return (
    <div className="rounded-2xl border border-system-pi/25 bg-surface-1 p-4 sm:p-6 flex flex-col gap-4 overflow-hidden">
      {/* Storyboard Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 min-w-0">
          <StatusPill label="HOW IT WORKS · ANIMATED WALKTHROUGH" tone="pi" />
          <span className="font-mono text-xs text-fg-muted">
            Beat {current.step} / 04
          </span>
        </div>

        <button
          type="button"
          onClick={() => setIsPlaying((p) => !p)}
          className="min-h-9 inline-flex items-center gap-1.5 rounded-lg border border-border-strong bg-card px-3 py-1.5 font-sans text-xs font-semibold text-fg hover:bg-surface-2 transition-colors cursor-pointer"
        >
          <Icon name={isPlaying ? "pause" : "play"} size={13} />
          <span>{isPlaying ? "Pause" : "Play"}</span>
        </button>
      </div>

      {/* Beat Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {BEATS.map((item, idx) => {
          const active = idx === beat;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setBeat(idx);
                setIsPlaying(false);
              }}
              className={clsx(
                "min-w-0 rounded-xl border px-3 py-2 text-left transition-all cursor-pointer flex items-center gap-2",
                active
                  ? "border-system-pi bg-card shadow-xs ring-1 ring-system-pi/30"
                  : "border-border-subtle bg-card/60 hover:bg-card"
              )}
            >
              <span
                className={clsx(
                  "font-mono text-[11px] font-bold px-1.5 py-0.5 rounded shrink-0",
                  active
                    ? "bg-system-pi text-on-accent"
                    : "bg-surface-2 text-fg-muted"
                )}
              >
                {item.step}
              </span>
              <span className="font-sans text-xs font-semibold text-fg truncate">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Animated Stage Canvas */}
      <div className="rounded-xl border border-border-subtle bg-card p-4 sm:p-5 min-h-[230px] flex flex-col justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="font-display text-base sm:text-lg font-bold text-fg">
            {current.title}
          </h3>
          <Text variant="muted" className="text-xs sm:text-sm max-w-3xl">
            {current.caption}
          </Text>
        </div>

        <AnimatePresence mode="wait">
          {beat === 0 && (
            <motion.div
              key="beat-collect"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center"
            >
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Listing Photos", tag: "Playwright", icon: "eye" as const },
                  { label: "Overture Maps", tag: "Footprints", icon: "layers" as const },
                  { label: "Google Places", tag: "Transit & POI", icon: "search" as const },
                  { label: "Catastro API", tag: "Parcel Data", icon: "database" as const },
                ].map((src, i) => (
                  <motion.div
                    key={src.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.25 }}
                    className="rounded-lg border border-border-subtle bg-surface-1 p-2.5 flex items-center gap-2 min-w-0"
                  >
                    <span className="h-7 w-7 rounded-md bg-system-pi/10 text-system-pi flex items-center justify-center shrink-0">
                      <Icon name={src.icon} size={14} />
                    </span>
                    <div className="flex flex-col min-w-0">
                      <span className="font-sans text-xs font-semibold text-fg truncate">
                        {src.label}
                      </span>
                      <span className="font-mono text-[10px] text-fg-muted truncate">
                        {src.tag}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex items-center justify-center">
                <motion.div
                  animate={{ x: [0, 6, 0] }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                  className="h-9 w-9 rounded-full bg-system-pi/10 text-system-pi flex items-center justify-center"
                >
                  <Icon name="arrowRight" size={18} />
                </motion.div>
              </div>

              <motion.div
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="rounded-xl border border-system-pi/30 bg-system-pi/5 p-4 flex flex-col gap-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-display text-sm font-bold text-fg">
                    DuckDB Spatial Hub
                  </span>
                  <StatusPill label="SHA-256 Pinned" tone="pi" />
                </div>
                <span className="font-sans text-xs text-fg-muted">
                  Joins coordinates, geometry buffers, and verified media into one reproducible record. Missing fields stay <code className="font-mono text-fg">UNKNOWN</code>.
                </span>
              </motion.div>
            </motion.div>
          )}

          {beat === 1 && (
            <motion.div
              key="beat-vision"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center"
            >
              {/* Stylized Photo Frame with Scanning Beam */}
              <div className="relative rounded-xl border border-border-strong bg-surface-1 p-4 h-36 overflow-hidden flex flex-col justify-between">
                <motion.div
                  animate={{ y: [0, 110, 0] }}
                  transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
                  className="absolute inset-x-0 top-2 h-0.5 bg-system-pi shadow-sm"
                />
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-fg-muted">
                    IMG_042.JPG · 24mm FOV
                  </span>
                  <StatusPill label="Gemini Vision" tone="pi" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-lg border border-system-pi/40 bg-card/90 p-2">
                    <span className="font-mono text-[11px] font-semibold text-system-pi block">
                      Kitchen · Oak
                    </span>
                    <span className="font-sans text-[11px] text-fg-muted">
                      Bright natural light
                    </span>
                  </div>
                  <div className="rounded-lg border border-border-subtle bg-card/90 p-2">
                    <span className="font-mono text-[11px] font-semibold text-fg block">
                      Open Dining
                    </span>
                    <span className="font-sans text-[11px] text-fg-muted">
                      Camera angle: 18 deg
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {[
                  { label: "Room classification & materials", status: "Tagged", tone: "pass" as const },
                  { label: "Camera angle & geometry estimate", status: "Calibrated", tone: "pi" as const },
                  { label: "Blurry / duplicate thumbnail", status: "Filtered Out", tone: "reject" as const },
                ].map((row, idx) => (
                  <motion.div
                    key={row.label}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="rounded-lg border border-border-subtle bg-surface-1 px-3 py-2 flex items-center justify-between gap-2"
                  >
                    <span className="font-sans text-xs font-medium text-fg">
                      {row.label}
                    </span>
                    <StatusPill label={row.status} tone={row.tone} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {beat === 2 && (
            <motion.div
              key="beat-rag"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr_1fr] gap-3 items-center"
            >
              <div className="rounded-xl border border-border-subtle bg-surface-1 p-3 flex flex-col gap-1.5">
                <span className="font-mono text-[11px] text-fg-muted">USER QUERY</span>
                <span className="font-display text-sm font-bold text-fg">
                  &ldquo;bright oak kitchen&rdquo;
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <motion.div
                  initial={{ scaleX: 0.85, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  className="rounded-lg border border-border-subtle bg-surface-1 p-2.5 flex items-center justify-between gap-2"
                >
                  <span className="font-sans text-xs font-semibold text-fg">
                    Tantivy BM25 (Keywords)
                  </span>
                  <StatusPill label="Exact Match" tone="neutral" />
                </motion.div>
                <motion.div
                  initial={{ scaleX: 0.85, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ delay: 0.12 }}
                  className="rounded-lg border border-system-pi/30 bg-system-pi/5 p-2.5 flex items-center justify-between gap-2"
                >
                  <span className="font-sans text-xs font-semibold text-fg">
                    ONNX 384-d Vectors
                  </span>
                  <StatusPill label="Semantic Rank" tone="pi" />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.22 }}
                className="rounded-xl border border-pass/30 bg-pass/5 p-3 flex flex-col gap-1.5"
              >
                <span className="font-mono text-[11px] text-pass font-semibold">
                  RRF FUSION TOP HIT
                </span>
                <span className="font-display text-sm font-bold text-fg">
                  Nordic Oak Island #04
                </span>
                <span className="font-mono text-[11px] text-fg-muted">
                  Zero external vector DB
                </span>
              </motion.div>
            </motion.div>
          )}

          {beat === 3 && (
            <motion.div
              key="beat-guard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-3"
            >
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                className="rounded-xl border border-reject/30 bg-reject/5 p-3.5 flex flex-col gap-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-sans text-xs font-bold text-reject">
                    Blocked Unsupported Claim
                  </span>
                  <StatusPill label="REJECTED" tone="reject" />
                </div>
                <span className="font-mono text-xs text-fg">
                  &ldquo;Panoramic sea view from terrace&rdquo;
                </span>
                <span className="font-sans text-xs text-fg-muted">
                  No matching photo evidence or coastal line-of-sight in DuckDB geometry.
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.12 }}
                className="rounded-xl border border-pass/30 bg-pass/5 p-3.5 flex flex-col gap-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-sans text-xs font-bold text-pass">
                    Verified Property Fact
                  </span>
                  <StatusPill label="PUBLISHED" tone="pass" />
                </div>
                <span className="font-mono text-xs text-fg">
                  &ldquo;420m walk to Metro · Oak Kitchen (IMG_042)&rdquo;
                </span>
                <span className="font-sans text-xs text-fg-muted">
                  Backed by Google Places distance + Vision evidence ID.
                </span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
