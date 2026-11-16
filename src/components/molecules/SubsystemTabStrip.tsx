"use client";

import React from "react";
import { clsx } from "clsx";
import { CodeToken } from "@/components/atoms";
import type { SystemAccentKey } from "@/design-system/quarks";

export interface SubsystemTabItem {
  id: string;
  code: string;
  title: string;
}

export interface SubsystemTabStripProps {
  items: SubsystemTabItem[];
  activeId: string;
  onChange: (id: string) => void;
  accent?: SystemAccentKey;
  ariaLabel: string;
}

const activeTabMap: Record<SystemAccentKey, string> = {
  pi: "border-system-pi bg-system-pi/10 text-fg shadow-xs",
  oracle: "border-system-oracle bg-system-oracle/10 text-fg shadow-xs",
};

export function SubsystemTabStrip({
  items,
  activeId,
  onChange,
  accent = "pi",
  ariaLabel,
}: SubsystemTabStripProps) {
  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      onChange(items[(idx + 1) % items.length].id);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      onChange(items[(idx - 1 + items.length) % items.length].id);
    }
  };

  return (
    <div role="tablist" aria-label={ariaLabel} className="flex flex-wrap gap-2">
      {items.map((item, idx) => {
        const isActive = item.id === activeId;
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(item.id)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            className={clsx(
              "min-h-11 inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-left transition-all duration-150 cursor-pointer",
              isActive
                ? activeTabMap[accent]
                : "border-border-strong bg-card text-fg-muted hover:text-fg hover:bg-surface-1"
            )}
          >
            <CodeToken tone={isActive ? accent : "default"}>{item.code}</CodeToken>
            <span className="font-sans text-sm font-semibold">{item.title}</span>
          </button>
        );
      })}
    </div>
  );
}
