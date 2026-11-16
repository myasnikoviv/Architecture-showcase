"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { clsx } from "clsx";
import { Icon } from "@/components/atoms";

const DURATION_MS = 12000;

export function PropertyIntelligenceMotionExplainer() {
  const [elapsedMs, setElapsedMs] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    let last = performance.now();
    let rafId = 0;
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      setElapsedMs((prev) => (prev + dt) % DURATION_MS);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isPlaying]);

  const t = elapsedMs / 1000; // 0..12s
  const progressPct = (elapsedMs / DURATION_MS) * 100;

  // Continuous choreography phases (0-3s Ingest, 3-6s Vision+Geo, 6-9s RAG+Guard, 9-12s Dossier)
  const phase = t < 3 ? 0 : t < 6 ? 1 : t < 9 ? 2 : 3;
  const phaseLabels = [
    "1. Collecting photos, maps & official records",
    "2. Scanning rooms with Vision AI & measuring distance",
    "3. Matching interiors (BM25 + Vector) & blocking hallucinations",
    "4. Publishing verified property dossier",
  ];

  const packetProgress = Math.min(1, Math.max(0, t / 2.6));
  const scanY = phase === 1 ? ((t - 3) / 3) * 100 : phase > 1 ? 100 : 0;
  const showRagMatch = t >= 6.0;
  const showSeaViewRejected = t >= 7.2;
  const showCleanDossier = t >= 9.0;

  return (
    <div className="rounded-2xl border border-system-pi/25 bg-surface-1 p-4 sm:p-5 flex flex-col gap-4 overflow-hidden">
      {/* Minimal Motion Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="h-2.5 w-2.5 rounded-full bg-system-pi animate-pulse shrink-0" />
          <span className="font-mono text-xs font-semibold text-system-pi truncate">
            {phaseLabels[phase]}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPlaying((p) => !p)}
            className="min-h-8 inline-flex items-center gap-1.5 rounded-lg border border-border-strong bg-card px-2.5 py-1 font-sans text-xs font-semibold text-fg hover:bg-surface-2 transition-colors cursor-pointer"
          >
            <Icon name={isPlaying ? "pause" : "play"} size={12} />
            <span>{isPlaying ? "Pause" : "Play"}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setElapsedMs(0);
              setIsPlaying(true);
            }}
            className="min-h-8 inline-flex items-center gap-1 rounded-lg border border-border-strong bg-card px-2.5 py-1 font-sans text-xs font-semibold text-fg-muted hover:text-fg transition-colors cursor-pointer"
            aria-label="Replay animation"
          >
            <Icon name="reset" size={12} />
          </button>
        </div>
      </div>

      {/* Continuous Visual Storyboard Canvas */}
      <div className="rounded-xl border border-border-subtle bg-card p-4 sm:p-5">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1.25fr_auto_1fr] gap-3 items-center">
          {/* LEFT: Raw Listing + 3 Sources */}
          <div className="flex flex-col gap-2.5 min-w-0">
            <div className="rounded-xl border border-border-strong bg-surface-1 p-3 flex flex-col gap-1.5">
              <div className="flex items-center justify-between gap-2">
                <span className="font-display text-xs font-bold text-fg">
                  Raw Listing
                </span>
                <span className="font-mono text-[10px] text-fg-muted">
                  Portal Input
                </span>
              </div>
              <p className="font-sans text-xs text-fg-muted leading-snug">
                &ldquo;Oak kitchen · Near Metro · Panoramic sea view&rdquo;
              </p>
            </div>

            <div className="grid grid-cols-3 gap-1.5">
              {[
                { label: "Photos", icon: "eye" as const },
                { label: "Maps", icon: "layers" as const },
                { label: "Catastro", icon: "database" as const },
              ].map((src, i) => (
                <motion.div
                  key={src.label}
                  animate={{
                    borderColor:
                      phase === 0
                        ? "var(--color-system-pi)"
                        : "var(--color-border-subtle)",
                    scale: phase === 0 && Math.floor(t * 2) % 3 === i ? 1.03 : 1,
                  }}
                  className="rounded-lg border bg-surface-1 p-2 flex flex-col items-center gap-1 text-center"
                >
                  <Icon name={src.icon} size={13} className="text-system-pi" />
                  <span className="font-mono text-[10px] font-medium text-fg">
                    {src.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ANIMATED FLOW ARROW 1 */}
          <div className="hidden lg:flex items-center justify-center w-10" aria-hidden="true">
            <svg viewBox="0 0 40 20" className="w-10 h-5">
              <line
                x1="2"
                y1="10"
                x2="34"
                y2="10"
                stroke="var(--color-border-strong)"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <circle
                cx={4 + packetProgress * 28}
                cy="10"
                r="4"
                fill="var(--color-system-pi)"
              />
            </svg>
          </div>

          {/* CENTER: Vision Laser + Geo Radar + Hallucination Shield */}
          <div className="rounded-xl border border-system-pi/30 bg-system-pi/5 p-3.5 flex flex-col gap-3 min-w-0">
            <div className="grid grid-cols-2 gap-2">
              {/* Photo Scan Box */}
              <div className="relative rounded-lg border border-border-strong bg-card p-2.5 h-20 overflow-hidden flex flex-col justify-between">
                {phase === 1 && (
                  <div
                    style={{ top: `${scanY}%` }}
                    className="absolute inset-x-0 h-0.5 bg-system-pi shadow-sm transition-none"
                  />
                )}
                <span className="font-mono text-[10px] text-fg-muted">
                  Vision AI
                </span>
                <span
                  className={clsx(
                    "font-sans text-xs font-bold transition-opacity duration-300",
                    t >= 3.5 ? "text-system-pi opacity-100" : "text-fg-muted opacity-40"
                  )}
                >
                  Oak Kitchen
                </span>
              </div>

              {/* Geo Radar Box */}
              <div className="relative rounded-lg border border-border-strong bg-card p-2.5 h-20 overflow-hidden flex flex-col justify-between">
                <span className="font-mono text-[10px] text-fg-muted">
                  DuckDB Geo
                </span>
                <div className="flex items-center gap-1.5">
                  <span
                    className={clsx(
                      "h-2 w-2 rounded-full",
                      phase === 1 ? "bg-pass animate-ping" : "bg-pass"
                    )}
                  />
                  <span
                    className={clsx(
                      "font-sans text-xs font-bold transition-opacity duration-300",
                      t >= 4.2 ? "text-pass opacity-100" : "text-fg-muted opacity-40"
                    )}
                  >
                    420m Metro
                  </span>
                </div>
              </div>
            </div>

            {/* Hybrid RAG + Hallucination Gate Strip */}
            <div className="rounded-lg border border-border-subtle bg-card px-3 py-2 flex items-center justify-between gap-2">
              <div className="flex flex-col min-w-0">
                <span className="font-mono text-[10px] text-fg-muted">
                  Tantivy + ONNX Match
                </span>
                <span
                  className={clsx(
                    "font-sans text-xs font-semibold truncate transition-opacity duration-300",
                    showRagMatch ? "text-fg opacity-100" : "text-fg-muted opacity-40"
                  )}
                >
                  Nordic Oak Island #04
                </span>
              </div>
              <span
                className={clsx(
                  "rounded-full px-2 py-0.5 font-mono text-[10px] font-bold border shrink-0 transition-all duration-300",
                  showSeaViewRejected
                    ? "bg-reject/10 text-reject border-reject/30"
                    : "bg-surface-1 text-fg-muted border-border-subtle"
                )}
              >
                {showSeaViewRejected ? "Sea view: BLOCKED" : "Schema Gate"}
              </span>
            </div>
          </div>

          {/* ANIMATED FLOW ARROW 2 */}
          <div className="hidden lg:flex items-center justify-center w-10" aria-hidden="true">
            <svg viewBox="0 0 40 20" className="w-10 h-5">
              <line
                x1="2"
                y1="10"
                x2="34"
                y2="10"
                stroke="var(--color-border-strong)"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <circle
                cx={showCleanDossier ? 32 : t >= 6 ? 4 + ((t - 6) / 3) * 28 : 4}
                cy="10"
                r="4"
                fill={showCleanDossier ? "var(--color-pass)" : "var(--color-system-pi)"}
              />
            </svg>
          </div>

          {/* RIGHT: Clean Verified Dossier */}
          <motion.div
            animate={{
              borderColor: showCleanDossier
                ? "var(--color-pass)"
                : "var(--color-border-subtle)",
              opacity: showCleanDossier ? 1 : 0.55,
            }}
            className="rounded-xl border bg-surface-1 p-3 flex flex-col gap-2 min-w-0"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-display text-xs font-bold text-fg">
                Verified Dossier
              </span>
              <span
                className={clsx(
                  "rounded-full px-2 py-0.5 font-mono text-[10px] font-bold",
                  showCleanDossier
                    ? "bg-pass/15 text-pass"
                    : "bg-surface-2 text-fg-muted"
                )}
              >
                {showCleanDossier ? "GROUNDED" : "WAIT..."}
              </span>
            </div>

            <div className="flex flex-col gap-1 font-sans text-xs">
              <div className="flex items-center gap-1.5 text-pass">
                <Icon name="checkCircle" size={13} />
                <span>Oak kitchen (Photo #4)</span>
              </div>
              <div className="flex items-center gap-1.5 text-pass">
                <Icon name="checkCircle" size={13} />
                <span>420m to Metro (Map)</span>
              </div>
              <div className="flex items-center gap-1.5 text-reject line-through opacity-75">
                <Icon name="close" size={13} />
                <span>Sea view (No proof)</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Continuous Timeline Scrubber */}
      <div
        className="h-1.5 w-full rounded-full bg-surface-2 overflow-hidden cursor-pointer"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
          setElapsedMs(ratio * DURATION_MS);
        }}
        title="Click anywhere to scrub timeline"
      >
        <div
          style={{ width: `${progressPct}%` }}
          className="h-full bg-system-pi transition-none"
        />
      </div>
    </div>
  );
}
