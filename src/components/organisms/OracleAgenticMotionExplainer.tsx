"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { clsx } from "clsx";
import { Icon } from "@/components/atoms";

const DURATION_MS = 12000;

const CLUSTER_POINTS = [
  { id: 1, x0: 18, y0: 22, x1: 22, y1: 24, group: "trend" },
  { id: 2, x0: 76, y0: 66, x1: 28, y1: 28, group: "trend" },
  { id: 3, x0: 44, y0: 72, x1: 20, y1: 32, group: "trend" },
  { id: 4, x0: 62, y0: 20, x1: 72, y1: 26, group: "range" },
  { id: 5, x0: 24, y0: 64, x1: 78, y1: 32, group: "range" },
  { id: 6, x0: 82, y0: 34, x1: 74, y1: 22, group: "range" },
  { id: 7, x0: 36, y0: 40, x1: 48, y1: 74, group: "noise" },
  { id: 8, x0: 68, y0: 54, x1: 54, y1: 70, group: "noise" },
] as const;

export function OracleAgenticMotionExplainer() {
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

  const t = elapsedMs / 1000;
  const progressPct = (elapsedMs / DURATION_MS) * 100;

  const phase = t < 3 ? 0 : t < 6 ? 1 : t < 9 ? 2 : 3;
  const phaseLabels = [
    "1. Blocking future data leakage with a strict time embargo",
    "2. Clustering market regimes (UMAP + HDBSCAN) & scoring with LightGBM",
    "3. Gating agent tool calls against deterministic risk rules",
    "4. Guaranteeing 1:1 identical Replay, Paper, and Live execution",
  ];

  const clustered = t >= 3.2;
  const gateEvaluated = t >= 6.4;
  const replayLocked = t >= 9.0;

  return (
    <div className="rounded-2xl border border-system-oracle/25 bg-surface-1 p-4 sm:p-5 flex flex-col gap-4 overflow-hidden">
      {/* Minimal Motion Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="h-2.5 w-2.5 rounded-full bg-system-oracle animate-pulse shrink-0" />
          <span className="font-mono text-xs font-semibold text-system-oracle truncate">
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 items-stretch">
          {/* STAGE 1: Time-Series + Embargo Wall */}
          <div className="rounded-xl border border-border-subtle bg-surface-1 p-3 flex flex-col justify-between gap-2 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <span className="font-display text-xs font-bold text-fg">
                Leakage Shield
              </span>
              <span className="font-mono text-[10px] text-warn font-semibold">
                Embargo Gap
              </span>
            </div>

            <div className="flex items-end gap-1 h-16 px-1">
              {[40, 58, 48, 72].map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h}%` }}
                  className="flex-1 rounded-t bg-system-oracle/70"
                />
              ))}
              <motion.div
                animate={{ scaleY: phase >= 0 ? 1 : 0.4 }}
                className="w-2 h-full rounded bg-warn/80 mx-1 origin-top"
                title="48h Embargo Wall"
              />
              {[54, 66, 60].map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h}%` }}
                  className="flex-1 rounded-t bg-fg-muted/25 border border-dashed border-fg-muted/40"
                />
              ))}
            </div>

            <span className="font-mono text-[10px] text-fg-muted">
              Past Train | Blocked Future
            </span>
          </div>

          {/* STAGE 2: UMAP + HDBSCAN Particle Clustering */}
          <div className="rounded-xl border border-border-subtle bg-surface-1 p-3 flex flex-col justify-between gap-2 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <span className="font-display text-xs font-bold text-fg">
                Regime Discovery
              </span>
              <span className="font-mono text-[10px] text-system-oracle font-semibold">
                {clustered ? "3 Regimes" : "Raw Features"}
              </span>
            </div>

            <svg viewBox="0 0 100 90" className="w-full h-16 rounded-lg bg-card border border-border-subtle">
              {CLUSTER_POINTS.map((pt) => {
                const cx = clustered ? pt.x1 : pt.x0;
                const cy = clustered ? pt.y1 : pt.y0;
                const fill = !clustered
                  ? "var(--color-fg-muted)"
                  : pt.group === "trend"
                  ? "var(--color-system-oracle)"
                  : pt.group === "range"
                  ? "var(--color-pass)"
                  : "var(--color-warn)";
                return (
                  <circle
                    key={pt.id}
                    cx={cx}
                    cy={cy}
                    r="4.2"
                    fill={fill}
                    style={{ transition: "all 0.9s cubic-bezier(0.22, 1, 0.36, 1)" }}
                  />
                );
              })}
            </svg>

            <span className="font-mono text-[10px] text-fg-muted">
              UMAP + HDBSCAN -&gt; LightGBM
            </span>
          </div>

          {/* STAGE 3: Agent Tool-Call Risk Gate */}
          <div className="rounded-xl border border-border-subtle bg-surface-1 p-3 flex flex-col justify-between gap-2 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <span className="font-display text-xs font-bold text-fg">
                Agent Risk Gate
              </span>
              <span className="font-mono text-[10px] text-fg-muted">
                LangGraph + AJV
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              <div
                className={clsx(
                  "rounded-md border px-2 py-1 font-mono text-[10px] flex items-center justify-between transition-all duration-300",
                  gateEvaluated
                    ? "border-reject/40 bg-reject/10 text-reject"
                    : "border-border-subtle bg-card text-fg-muted"
                )}
              >
                <span>order(5x)</span>
                <span>{gateEvaluated ? "BLOCKED" : "check"}</span>
              </div>
              <div
                className={clsx(
                  "rounded-md border px-2 py-1 font-mono text-[10px] flex items-center justify-between transition-all duration-300",
                  gateEvaluated
                    ? "border-pass/40 bg-pass/10 text-pass"
                    : "border-border-subtle bg-card text-fg-muted"
                )}
              >
                <span>signal(1x)</span>
                <span>{gateEvaluated ? "APPROVED" : "check"}</span>
              </div>
            </div>

            <span className="font-mono text-[10px] text-fg-muted">
              Hard limits stop unsafe calls
            </span>
          </div>

          {/* STAGE 4: 1:1 Deterministic Replay */}
          <motion.div
            animate={{
              borderColor: replayLocked
                ? "var(--color-pass)"
                : "var(--color-border-subtle)",
            }}
            className="rounded-xl border bg-surface-1 p-3 flex flex-col justify-between gap-2 min-w-0"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-display text-xs font-bold text-fg">
                1:1 Parity
              </span>
              <span
                className={clsx(
                  "rounded-full px-2 py-0.5 font-mono text-[10px] font-bold",
                  replayLocked
                    ? "bg-pass/15 text-pass"
                    : "bg-surface-2 text-fg-muted"
                )}
              >
                {replayLocked ? "IDENTICAL" : "SYNCING"}
              </span>
            </div>

            <div className="flex flex-col gap-1 font-mono text-[10px]">
              {["Replay", "Paper", "Live"].map((env) => (
                <div
                  key={env}
                  className="flex items-center justify-between rounded bg-card px-2 py-0.5 border border-border-subtle"
                >
                  <span className="text-fg">{env}</span>
                  <span className={replayLocked ? "text-pass" : "text-fg-muted"}>
                    #9f4ac21
                  </span>
                </div>
              ))}
            </div>

            <span className="font-mono text-[10px] text-fg-muted">
              Bit-for-bit reproducible runs
            </span>
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
          className="h-full bg-system-oracle transition-none"
        />
      </div>
    </div>
  );
}
