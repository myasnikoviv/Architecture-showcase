"use client";

import React from "react";
import { clsx } from "clsx";

export type MarkerShape = "circle" | "square" | "diamond" | "triangle" | "cross";

export interface ChartLegendToggleProps {
  label: string;
  shape: MarkerShape;
  colorClass: string;
  isActive: boolean;
  onClick: () => void;
}

function ShapeSvg({ shape, colorClass }: { shape: MarkerShape; colorClass: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" className={clsx("shrink-0 fill-current", colorClass)}>
      {shape === "circle" && <circle cx="7" cy="7" r="5" />}
      {shape === "square" && <rect x="2" y="2" width="10" height="10" rx="1.5" />}
      {shape === "diamond" && <polygon points="7,1 13,7 7,13 1,7" />}
      {shape === "triangle" && <polygon points="7,1.5 13,12 1,12" />}
      {shape === "cross" && (
        <path d="M3.2 2L7 5.8L10.8 2L12 3.2L8.2 7L12 10.8L10.8 12L7 8.2L3.2 12L2 10.8L5.8 7L2 3.2Z" />
      )}
    </svg>
  );
}

export function ChartLegendToggle({
  label,
  shape,
  colorClass,
  isActive,
  onClick,
}: ChartLegendToggleProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={clsx(
        "min-h-11 inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 font-sans text-xs font-semibold transition-all duration-150 cursor-pointer",
        isActive
          ? "border-border-strong bg-card text-fg shadow-xs"
          : "border-border-subtle bg-surface-1 text-fg-muted opacity-60 hover:opacity-100"
      )}
    >
      <ShapeSvg shape={shape} colorClass={colorClass} />
      <span>{label}</span>
    </button>
  );
}
