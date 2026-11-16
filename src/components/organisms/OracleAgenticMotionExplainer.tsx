"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { clsx } from "clsx";
import { Icon, StatusPill, Text } from "@/components/atoms";

const BEATS = [
  {
    id: "embargo",
    step: "01",
    label: "Leakage Shield",
    title: "Block Future Data From Leaking Into Training",
    caption:
      "A strict time-embargo buffer separates training windows from test windows so ML models never peek at future market moves.",
  },
  {
    id: "regimes",
    step: "02",
    label: "Regimes & ML",
    title: "Group Market Regimes Before Scoring Signals",
    caption:
      "UMAP + HDBSCAN cluster market states into Trend, Range, or High-Volatility regimes before LightGBM scores calibrated probabilities.",
  },
  {
    id: "tool-gate",
    step: "03",
    label: "Agent Risk Gate",
    title: "Validate Every Agent Tool Call Against Hard Rules",
    caption:
      "Even without a consumer UI, agentic orchestration enforces deterministic risk and schema gates before any action can execute.",
  },
  {
    id: "replay",
    step: "04",
    label: "1:1 Replay",
    title: "Re-Run Any Past Decision Bit-for-Bit",
    caption:
      "Every approved state transition writes an immutable snapshot so historical replay, paper runs, and live execution behave identically.",
  },
] as const;

export function OracleAgenticMotionExplainer() {
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
    <div className="rounded-2xl border border-system-oracle/25 bg-surface-1 p-4 sm:p-6 flex flex-col gap-4 overflow-hidden">
      {/* Storyboard Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 min-w-0">
          <StatusPill label="HOW IT WORKS · ANIMATED WALKTHROUGH" tone="oracle" />
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
                  ? "border-system-oracle bg-card shadow-xs ring-1 ring-system-oracle/30"
                  : "border-border-subtle bg-card/60 hover:bg-card"
              )}
            >
              <span
                className={clsx(
                  "font-mono text-[11px] font-bold px-1.5 py-0.5 rounded shrink-0",
                  active
                    ? "bg-system-oracle text-on-accent"
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
              key="beat-embargo"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-[1.2fr_auto_1fr] gap-3 items-center"
            >
              <div className="rounded-xl border border-border-subtle bg-surface-1 p-3.5 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-fg-muted">
                    TRAIN WINDOW (PAST ONLY)
                  </span>
                  <StatusPill label="Leakage-Free" tone="pass" />
                </div>
                <div className="grid grid-cols-6 gap-1.5 items-end h-14">
                  {[38, 52, 44, 68, 56, 74].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ delay: i * 0.06 }}
                      style={{ height: `${h}%` }}
                      className="rounded-t bg-system-oracle/75 origin-bottom"
                    />
                  ))}
                </div>
              </div>

              <motion.div
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ repeat: Infinity, duration: 1.8 }}
                className="rounded-xl border border-warn/40 bg-warn/10 px-3 py-2.5 flex flex-col items-center gap-1 text-center"
              >
                <Icon name="lock" size={16} className="text-warn" />
                <span className="font-mono text-[11px] font-bold text-warn">
                  EMBARGO GAP
                </span>
              </motion.div>

              <div className="rounded-xl border border-border-subtle bg-surface-1 p-3.5 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-fg-muted">
                    OUT-OF-SAMPLE TEST
                  </span>
                  <StatusPill label="Unseen Future" tone="oracle" />
                </div>
                <div className="grid grid-cols-4 gap-1.5 items-end h-14">
                  {[48, 62, 58, 70].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ delay: 0.25 + i * 0.06 }}
                      style={{ height: `${h}%` }}
                      className="rounded-t bg-pass/75 origin-bottom"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {beat === 1 && (
            <motion.div
              key="beat-regimes"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-3"
            >
              {[
                { name: "Trend Regime", score: "78% Conf", width: "w-4/5", tone: "oracle" as const },
                { name: "Mean-Reverting", score: "64% Conf", width: "w-2/3", tone: "pass" as const },
                { name: "High-Vol Noise", score: "Hold / Skip", width: "w-1/3", tone: "warn" as const },
              ].map((cluster, idx) => (
                <motion.div
                  key={cluster.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="rounded-xl border border-border-subtle bg-surface-1 p-3.5 flex flex-col gap-2.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-display text-sm font-bold text-fg">
                      {cluster.name}
                    </span>
                    <StatusPill label={cluster.score} tone={cluster.tone} />
                  </div>
                  <div className="h-2 w-full rounded-full bg-surface-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 0.15 + idx * 0.1, duration: 0.5 }}
                      className={clsx(
                        "h-full rounded-full",
                        cluster.width,
                        cluster.tone === "oracle"
                          ? "bg-system-oracle"
                          : cluster.tone === "pass"
                          ? "bg-pass"
                          : "bg-warn"
                      )}
                    />
                  </div>
                  <span className="font-mono text-[11px] text-fg-muted">
                    UMAP + HDBSCAN -&gt; LightGBM
                  </span>
                </motion.div>
              ))}
            </motion.div>
          )}

          {beat === 2 && (
            <motion.div
              key="beat-toolgate"
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
                  <span className="font-mono text-xs font-bold text-reject">
                    tool: submit_order(size=5x)
                  </span>
                  <StatusPill label="BLOCKED BY GATE" tone="reject" />
                </div>
                <span className="font-sans text-xs text-fg-muted">
                  Violates max exposure limit and fails regime check. Stopped before execution.
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.12 }}
                className="rounded-xl border border-pass/30 bg-pass/5 p-3.5 flex flex-col gap-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs font-bold text-pass">
                    tool: emit_signal(size=1x)
                  </span>
                  <StatusPill label="APPROVED" tone="pass" />
                </div>
                <span className="font-sans text-xs text-fg-muted">
                  Passes AJV schema contract, risk budget, and compiled TypeScript AST checks.
                </span>
              </motion.div>
            </motion.div>
          )}

          {beat === 3 && (
            <motion.div
              key="beat-replay"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center"
            >
              {[
                { mode: "Historical Replay", hash: "sha256:9f4a...c21", icon: "reset" as const },
                { mode: "Paper Simulation", hash: "sha256:9f4a...c21", icon: "cpu" as const },
                { mode: "Live Runtime", hash: "sha256:9f4a...c21", icon: "shieldCheck" as const },
              ].map((env, i) => (
                <motion.div
                  key={env.mode}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-xl border border-system-oracle/30 bg-system-oracle/5 p-3.5 flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-display text-sm font-bold text-fg">
                      {env.mode}
                    </span>
                    <Icon name={env.icon} size={15} className="text-system-oracle" />
                  </div>
                  <span className="font-mono text-xs text-pass font-semibold">
                    {env.hash}
                  </span>
                  <span className="font-sans text-[11px] text-fg-muted">
                    Identical inputs produce identical decisions.
                  </span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
