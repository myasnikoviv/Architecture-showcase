import React from "react";
import {
  CodeToken,
  ShaDigestBadge,
  StatusPill,
  Text,
} from "@/components/atoms";
import type { SemanticTone } from "@/design-system/quarks";

export interface EpistemicTierRowProps {
  tier: string;
  epistemicClass: string;
  statement: string;
  status: string;
  shaRef: string;
  tone: SemanticTone;
}

export function EpistemicTierRow({
  tier,
  epistemicClass,
  statement,
  status,
  shaRef,
  tone,
}: EpistemicTierRowProps) {
  return (
    <div className="rounded-lg border border-border-subtle bg-surface-1 p-3.5 flex flex-col gap-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <CodeToken tone={tone === "reject" ? "default" : "pi"}>{tier}</CodeToken>
          <span className="font-mono text-xs text-fg font-medium">
            {epistemicClass}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <ShaDigestBadge digest={shaRef} />
          <StatusPill label={status} tone={tone} />
        </div>
      </div>
      <Text variant="muted" className="text-sm text-fg/90">
        {statement}
      </Text>
    </div>
  );
}
