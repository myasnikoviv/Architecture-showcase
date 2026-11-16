import React from "react";
import { clsx } from "clsx";
import type { SystemAccentKey } from "@/design-system/quarks";

export interface TechTagProps {
  label: string;
  systemAccent: SystemAccentKey;
  isActive?: boolean;
  onClick?: () => void;
}

const activeBorderClasses: Record<SystemAccentKey, string> = {
  pi: "border-system-pi bg-system-pi/15 text-fg",
  oracle: "border-system-oracle bg-system-oracle/15 text-fg",
  guelga: "border-system-guelga bg-system-guelga/15 text-fg",
};

const dotClasses: Record<SystemAccentKey, string> = {
  pi: "bg-system-pi",
  oracle: "bg-system-oracle",
  guelga: "bg-system-guelga",
};

export function TechTag({
  label,
  systemAccent,
  isActive = false,
  onClick,
}: TechTagProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={clsx(
        "min-h-11 inline-flex items-center gap-2 rounded-lg border px-3 py-2 font-mono text-xs transition-colors duration-150 cursor-pointer text-left",
        isActive
          ? activeBorderClasses[systemAccent]
          : "border-border-strong bg-surface-1 text-fg-muted hover:text-fg hover:border-fg-muted"
      )}
    >
      <span
        aria-hidden="true"
        className={clsx("h-2 w-2 rounded-full shrink-0", dotClasses[systemAccent])}
      />
      <span>{label}</span>
    </button>
  );
}
