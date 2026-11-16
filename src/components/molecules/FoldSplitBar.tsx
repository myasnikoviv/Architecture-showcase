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
    <div className="flex flex-col gap-1.5 rounded-lg border border-border-subtle bg-surface-1 p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <CodeToken tone="oracle">{fold}</CodeToken>
          <span className="font-mono text-xs text-fg-muted">
            {trainEpisodes} -&gt; {testEpisodes}
          </span>
        </div>
        <StatusPill
          label={isPurged ? "ISOLATED (0 LEAKS)" : "OVERLAP LEAKAGE"}
          tone={isPurged ? "run" : "reject"}
        />
      </div>

      <div className="h-7 w-full rounded-md bg-canvas border border-border-subtle overflow-hidden flex font-mono text-[11px]">
        <div
          style={{ width: `${trainPct}%` }}
          className="h-full bg-system-oracle/25 border-r border-system-oracle text-fg flex items-center justify-center truncate px-1.5"
        >
          Train
        </div>

        {isPurged ? (
          <div
            style={{ width: `${purgePct}%` }}
            className="h-full bg-warn/20 border-r border-warn text-warn flex items-center justify-center truncate px-1"
            title="PURGE_4H_MS Embargo Zone"
          >
            Purge
          </div>
        ) : (
          <div
            style={{ width: `${purgePct}%` }}
            className="h-full bg-reject/35 border-r border-reject text-fg flex items-center justify-center truncate px-1"
            title="Future Window Leakage"
          >
            Leak!
          </div>
        )}

        <div
          style={{ width: `${testPct}%` }}
          className="h-full bg-accent-run/25 border-r border-accent-run text-fg flex items-center justify-center truncate px-1.5"
        >
          Test
        </div>
      </div>
    </div>
  );
}
