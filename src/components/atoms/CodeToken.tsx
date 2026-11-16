import React from "react";
import { clsx } from "clsx";

export interface CodeTokenProps {
  children: React.ReactNode;
  tone?: "default" | "pi" | "oracle" | "guelga" | "run";
  className?: string;
}

const toneMap = {
  default: "bg-muted text-fg border-border-strong",
  pi: "bg-system-pi/10 text-system-pi border-system-pi/30",
  oracle: "bg-system-oracle/10 text-system-oracle border-system-oracle/30",
  guelga: "bg-system-guelga/10 text-system-guelga border-system-guelga/30",
  run: "bg-accent-run/10 text-accent-run border-accent-run/30",
};

export function CodeToken({
  children,
  tone = "default",
  className,
}: CodeTokenProps) {
  return (
    <code
      className={clsx(
        "inline-flex items-center rounded border px-2 py-0.5 font-mono text-xs",
        toneMap[tone],
        className
      )}
    >
      {children}
    </code>
  );
}
