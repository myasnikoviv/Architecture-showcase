import React from "react";
import { CodeToken, Icon, StatusPill, Text } from "@/components/atoms";

export interface QaGateItemProps {
  check: string;
  tool: string;
  status: string;
}

export function QaGateItem({ check, tool, status }: QaGateItemProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-lg border border-border-subtle bg-surface-1 px-3.5 py-2.5">
      <div className="flex items-center gap-2.5">
        <Icon name="checkCircle" size={16} className="text-accent-run shrink-0" />
        <Text as="span" variant="body" className="text-sm text-fg">
          {check}
        </Text>
      </div>
      <div className="flex items-center gap-2">
        <CodeToken tone="guelga">{tool}</CodeToken>
        <StatusPill label={status} tone="run" />
      </div>
    </div>
  );
}
