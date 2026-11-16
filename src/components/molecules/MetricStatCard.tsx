import React from "react";
import { MetricNumber, SurfaceCard, Text } from "@/components/atoms";
import type { SystemAccentKey } from "@/design-system/quarks";

export interface MetricStatCardProps {
  value: string;
  label: string;
  detail: string;
  systemId: SystemAccentKey;
}

export function MetricStatCard({
  value,
  label,
  detail,
  systemId,
}: MetricStatCardProps) {
  return (
    <SurfaceCard accent={systemId} padding="sm" className="flex flex-col gap-1.5">
      <MetricNumber value={value} accent={systemId} />
      <Text as="div" variant="body" className="text-sm font-bold text-fg">
        {label}
      </Text>
      <Text variant="muted" className="text-xs leading-snug">
        {detail}
      </Text>
    </SurfaceCard>
  );
}
