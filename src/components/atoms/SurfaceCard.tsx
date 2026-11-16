import React from "react";
import { clsx } from "clsx";
import type { SystemAccentKey } from "@/design-system/quarks";

export interface SurfaceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  elevation?: "base" | "elevated";
  accent?: "none" | SystemAccentKey;
  padding?: "sm" | "md" | "lg";
}

const accentBorderClasses: Record<"none" | SystemAccentKey, string> = {
  none: "border-border-subtle",
  pi: "border-border-subtle border-t-4 border-t-system-pi",
  oracle: "border-border-subtle border-t-4 border-t-system-oracle",
};

const paddingClasses = {
  sm: "p-4",
  md: "p-5 sm:p-6",
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
        "rounded-2xl border transition-shadow duration-200",
        elevation === "elevated"
          ? "bg-surface-1 border-border-subtle"
          : "bg-card shadow-sm",
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
