import React from "react";
import { CodeToken, StatusPill } from "@/components/atoms";

export interface FoldSplitBarProps {
  fold: string;
  mode: "naive" | "purged";
  trainPct: number;
  purgePct: number;
  testPct: number;
  trainEpisodes: string;
  testEpisodes: string;
}

export function FoldSplitBar({
  fold,
  mode,
  trainPct,
  purgePct,
  testPct,
  trainEpisodes,
  testEpisodes,
}: FoldSplitBarProps) {
  const isPurged = mode === "purged";

  return (
    <div className="flex flex-col gap-2 rounded-xl border border-border-subtle bg-card p-3.5 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <CodeToken tone="oracle">{fold}</CodeToken>
          <span className="font-mono text-xs text-fg-muted">
            {trainEpisodes} -&gt; {testEpisodes}
          </span>
        </div>
        <StatusPill
          label={isPurged ? "0 Leakage (Purged)" : "Leakage Risk"}
          tone={isPurged ? "pass" : "reject"}
        />
      </div>

      <div className="h-8 w-full rounded-lg bg-surface-1 border border-border-subtle overflow-hidden flex font-sans text-xs font-semibold">
        <div
          style={{ width: `${trainPct}%` }}
          className="h-full bg-system-oracle/20 border-r border-system-oracle text-fg flex items-center justify-center truncate px-2"
        >
          Train Data
        </div>

        {isPurged ? (
          <div
            style={{ width: `${purgePct}%` }}
            className="h-full bg-warn/20 border-r border-warn text-warn flex items-center justify-center truncate px-1"
            title="PURGE_4H_MS Embargo Buffer"
          >
            4h Gap
          </div>
        ) : (
          <div
            style={{ width: `${purgePct}%` }}
            className="h-full bg-reject/20 border-r border-reject text-reject flex items-center justify-center truncate px-1"
            title="Overlapping Future Window"
          >
            Overlap!
          </div>
        )}

        <div
          style={{ width: `${testPct}%` }}
          className="h-full bg-pass/20 border-r border-pass text-pass flex items-center justify-center truncate px-2"
        >
          Test Data
        </div>
      </div>
    </div>
  );
}
