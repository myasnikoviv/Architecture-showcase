import React from "react";
import { clsx } from "clsx";

export interface CodeTokenProps {
  children: React.ReactNode;
  tone?: "default" | "pi" | "oracle" | "run" | "pass";
  className?: string;
}

const toneMap = {
  default: "bg-surface-1 text-fg-muted border-border-strong",
  pi: "bg-system-pi/10 text-system-pi border-system-pi/25",
  oracle: "bg-system-oracle/10 text-system-oracle border-system-oracle/25",
  run: "bg-accent-run/10 text-accent-run border-accent-run/25",
  pass: "bg-pass/10 text-pass border-pass/25",
};

export function CodeToken({
  children,
  tone = "default",
  className,
}: CodeTokenProps) {
  return (
    <code
      className={clsx(
        "inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-xs font-medium",
        toneMap[tone],
        className
      )}
    >
      {children}
    </code>
  );
}
