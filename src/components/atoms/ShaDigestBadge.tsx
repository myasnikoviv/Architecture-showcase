import React from "react";
import { clsx } from "clsx";

export interface ShaDigestBadgeProps {
  digest: string;
  className?: string;
}

export function ShaDigestBadge({ digest, className }: ShaDigestBadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-md bg-surface-1 px-2 py-0.5 font-mono text-xs text-fg-muted border border-border-subtle",
        className
      )}
    >
      {digest}
    </span>
  );
}
