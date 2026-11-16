import React from "react";
import { clsx } from "clsx";
import type { SystemAccentKey } from "@/design-system/quarks";

export interface TechTagProps {
  label: string;
  systemAccent: SystemAccentKey;
  isActive?: boolean;
  onClick?: () => void;
}

const activeClasses: Record<SystemAccentKey, string> = {
  pi: "border-system-pi bg-system-pi text-on-accent shadow-sm",
  oracle: "border-system-oracle bg-system-oracle text-on-accent shadow-sm",
};

const dotClasses: Record<SystemAccentKey, string> = {
  pi: "bg-system-pi",
  oracle: "bg-system-oracle",
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
        "min-h-11 inline-flex items-center gap-2 rounded-full border px-4 py-2 font-sans text-sm font-semibold transition-all duration-150 cursor-pointer text-left",
        isActive
          ? activeClasses[systemAccent]
          : "border-border-strong bg-card text-fg hover:border-fg-muted hover:bg-surface-1 shadow-xs"
      )}
    >
      <span
        aria-hidden="true"
        className={clsx(
          "h-2 w-2 rounded-full shrink-0",
          isActive ? "bg-on-accent" : dotClasses[systemAccent]
        )}
      />
      <span>{label}</span>
    </button>
  );
}
