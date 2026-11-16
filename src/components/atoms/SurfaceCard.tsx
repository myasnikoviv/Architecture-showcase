import React from "react";
import { clsx } from "clsx";
import type { SystemAccentKey } from "@/design-system/quarks";

export interface SurfaceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  elevation?: "base" | "elevated";
  accent?: "none" | SystemAccentKey;
  padding?: "sm" | "md" | "lg";
}

const accentBorderClasses: Record<"none" | SystemAccentKey, string> = {
  none: "border-border-strong",
  pi: "border-border-strong border-t-2 border-t-system-pi",
  oracle: "border-border-strong border-t-2 border-t-system-oracle",
  guelga: "border-border-strong border-t-2 border-t-system-guelga",
};

const paddingClasses = {
  sm: "p-4",
  md: "p-6",
  lg: "p-6 sm:p-8",
};

export function SurfaceCard({
  elevation = "base",
  accent = "none",
  padding = "md",
  className,
  children,
  ...props
}: SurfaceCardProps) {
  return (
    <div
      className={clsx(
        "rounded-xl border transition-colors duration-200",
        elevation === "elevated" ? "bg-surface-1" : "bg-card",
        accentBorderClasses[accent],
        paddingClasses[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
