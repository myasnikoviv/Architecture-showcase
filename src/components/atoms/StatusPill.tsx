import React from "react";
import { clsx } from "clsx";
import type { SemanticTone } from "@/design-system/quarks";

export interface StatusPillProps {
  label: string;
  tone?: SemanticTone;
  className?: string;
}

const toneClasses: Record<SemanticTone, string> = {
  run: "bg-accent-run/10 text-accent-run border-accent-run/30",
  pass: "bg-pass/10 text-pass border-pass/30",
  warn: "bg-warn/10 text-warn border-warn/30",
  reject: "bg-reject/10 text-reject border-reject/30",
  neutral: "bg-surface-1 text-fg-muted border-border-strong",
  pi: "bg-system-pi/10 text-system-pi border-system-pi/30",
  oracle: "bg-system-oracle/10 text-system-oracle border-system-oracle/30",
};

export function StatusPill({
  label,
  tone = "neutral",
  className,
}: StatusPillProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-sans text-xs font-semibold max-w-full truncate",
        toneClasses[tone],
        className
      )}
    >
      {label}
    </span>
  );
}
