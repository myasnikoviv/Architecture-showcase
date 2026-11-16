import React from "react";
import { clsx } from "clsx";
import type { SystemAccentKey } from "@/design-system/quarks";

export interface MetricNumberProps {
  value: string;
  accent?: SystemAccentKey;
  className?: string;
}

const accentTextClasses: Record<SystemAccentKey, string> = {
  pi: "text-system-pi",
  oracle: "text-system-oracle",
};

export function MetricNumber({
  value,
  accent = "pi",
  className,
}: MetricNumberProps) {
  return (
    <span
      className={clsx(
        "font-display text-3xl sm:text-4xl font-extrabold tabular-nums tracking-tight",
        accentTextClasses[accent],
        className
      )}
    >
      {value}
    </span>
  );
}
