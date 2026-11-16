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
  guelga: "text-system-guelga",
};

export function MetricNumber({
  value,
  accent = "pi",
  className,
}: MetricNumberProps) {
  return (
    <span
      className={clsx(
        "font-mono text-3xl sm:text-4xl font-semibold tabular-nums tracking-tight",
        accentTextClasses[accent],
        className
      )}
    >
      {value}
    </span>
  );
}
