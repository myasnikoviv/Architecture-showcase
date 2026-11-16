import React from "react";
import { clsx } from "clsx";
import type { SemanticTone } from "@/design-system/quarks";

export interface StatusPillProps {
  label: string;
  tone?: SemanticTone;
  className?: string;
}

const toneClasses: Record<SemanticTone, string> = {
  run: "bg-accent-run/15 text-accent-run border-accent-run/40",
  warn: "bg-warn/15 text-warn border-warn/40",
  reject: "bg-reject/15 text-reject border-reject/40",
  neutral: "bg-muted text-fg-muted border-border-strong",
  pi: "bg-system-pi/15 text-system-pi border-system-pi/40",
  oracle: "bg-system-oracle/15 text-system-oracle border-system-oracle/40",
  guelga: "bg-system-guelga/15 text-system-guelga border-system-guelga/40",
};

export function StatusPill({
  label,
  tone = "neutral",
  className,
}: StatusPillProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-xs font-medium tracking-wide whitespace-nowrap",
        toneClasses[tone],
        className
      )}
    >
      {label}
    </span>
  );
}
