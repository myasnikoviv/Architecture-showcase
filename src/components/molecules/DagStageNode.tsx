import React from "react";
import { clsx } from "clsx";
import {
  CodeToken,
  ShaDigestBadge,
  StatusPill,
  SurfaceCard,
  Text,
} from "@/components/atoms";
import type { SemanticTone } from "@/design-system/quarks";

export interface DagStageNodeProps {
  id: string;
  name: string;
  contract: string;
  status: string;
  detail: string;
  shaDigest: string;
  isCurrent: boolean;
  tone: SemanticTone;
  onSelect: () => void;
}

export function DagStageNode({
  id,
  name,
  contract,
  status,
  detail,
  shaDigest,
  isCurrent,
  tone,
  onSelect,
}: DagStageNodeProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="text-left w-full cursor-pointer rounded-2xl"
    >
      <SurfaceCard
        padding="sm"
        className={clsx(
          "h-full flex flex-col justify-between gap-2.5 transition-all duration-200",
          isCurrent
            ? "border-system-pi ring-2 ring-system-pi/25 bg-system-pi/5"
            : "border-border-strong hover:border-fg-muted"
        )}
      >
        <div className="flex items-center justify-between gap-2">
          <CodeToken tone={isCurrent ? "pi" : "default"}>{id}</CodeToken>
          <StatusPill label={status} tone={tone} />
        </div>
        <div className="flex flex-col gap-1">
          <Text as="div" variant="body" className="text-sm font-bold text-fg">
            {name}
          </Text>
          <Text variant="muted" className="text-xs leading-snug">
            {detail}
          </Text>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-1.5 pt-2 border-t border-border-subtle">
          <span className="font-mono text-xs text-fg-muted truncate">
            {contract}
          </span>
          <ShaDigestBadge digest={shaDigest} />
        </div>
      </SurfaceCard>
    </button>
  );
}
