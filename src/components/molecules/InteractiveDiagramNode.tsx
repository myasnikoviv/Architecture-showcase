"use client";

import React from "react";
import { clsx } from "clsx";
import { Icon, StatusPill, Text, type IconName } from "@/components/atoms";
import type { SystemAccentKey } from "@/design-system/quarks";

export interface InteractiveDiagramNodeProps {
  step: string;
  title: string;
  roleBadge: string;
  icon: IconName;
  systemAccent: SystemAccentKey;
  isSelected: boolean;
  onSelect: () => void;
}

const activeCardMap: Record<SystemAccentKey, string> = {
  pi: "border-system-pi bg-system-pi/5 ring-4 ring-system-pi/15 shadow-md",
  oracle: "border-system-oracle bg-system-oracle/5 ring-4 ring-system-oracle/15 shadow-md",
};

const iconBgMap: Record<SystemAccentKey, string> = {
  pi: "bg-system-pi text-on-accent",
  oracle: "bg-system-oracle text-on-accent",
};

export function InteractiveDiagramNode({
  step,
  title,
  roleBadge,
  icon,
  systemAccent,
  isSelected,
  onSelect,
}: InteractiveDiagramNodeProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isSelected}
      className={clsx(
        "w-full rounded-2xl border p-4 text-left transition-all duration-200 cursor-pointer flex flex-col gap-3",
        isSelected
          ? activeCardMap[systemAccent]
          : "border-border-strong bg-card shadow-xs hover:border-fg-muted hover:shadow-sm"
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span
          className={clsx(
            "h-9 w-9 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200",
            isSelected
              ? iconBgMap[systemAccent]
              : "bg-surface-1 text-fg"
          )}
        >
          <Icon name={icon} size={18} />
        </span>
        <StatusPill label={roleBadge} tone={isSelected ? systemAccent : "neutral"} />
      </div>

      <div className="flex flex-col gap-1">
        <span className="font-mono text-[11px] font-medium text-fg-muted">
          {step}
        </span>
        <span className="font-display text-sm font-bold text-fg leading-snug">
          {title}
        </span>
      </div>

      <div className="flex items-center gap-1 pt-1 text-xs font-sans font-semibold text-accent-run">
        <Text as="span" variant="muted" className="text-xs font-semibold text-accent-run">
          {isSelected ? "Active View" : "Click to inspect"}
        </Text>
        <Icon name="chevronRight" size={14} className="text-accent-run" />
      </div>
    </button>
  );
}
