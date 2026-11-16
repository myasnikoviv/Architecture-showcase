import React from "react";
import { Heading, TechTag } from "@/components/atoms";
import type { SystemAccentKey } from "@/design-system/quarks";

export interface TechFilterItem {
  id: string;
  label: string;
  primarySystem: SystemAccentKey;
}

export interface TechFilterGroupProps {
  title: string;
  items: TechFilterItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function TechFilterGroup({
  title,
  items,
  selectedId,
  onSelect,
}: TechFilterGroupProps) {
  return (
    <div className="flex flex-col gap-3">
      <Heading as="h3" size="sm" font="mono" className="text-fg-muted uppercase tracking-wider text-xs">
        {title}
      </Heading>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <TechTag
            key={item.id}
            label={item.label}
            systemAccent={item.primarySystem}
            isActive={selectedId === item.id}
            onClick={() => onSelect(item.id)}
          />
        ))}
      </div>
    </div>
  );
}
