import React from "react";
import { CodeToken, StatusPill, Text } from "@/components/atoms";
import type { SemanticTone } from "@/design-system/quarks";

export interface ContextLayerRowProps {
  code: string;
  name: string;
  purpose: string;
  permission: "PERMITTED" | "GATED" | "BLOCKED";
}

const permissionToneMap: Record<ContextLayerRowProps["permission"], SemanticTone> = {
  PERMITTED: "run",
  GATED: "warn",
  BLOCKED: "reject",
};

export function ContextLayerRow({
  code,
  name,
  purpose,
  permission,
}: ContextLayerRowProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-lg border border-border-subtle bg-surface-1 px-3.5 py-2.5">
      <div className="flex items-start sm:items-center gap-3">
        <CodeToken tone={permission === "PERMITTED" ? "guelga" : "default"}>
          {code}
        </CodeToken>
        <div className="flex flex-col">
          <span className="font-mono text-xs font-semibold text-fg">
            {name}
          </span>
          <Text variant="muted" className="text-xs">
            {purpose}
          </Text>
        </div>
      </div>
      <StatusPill label={permission} tone={permissionToneMap[permission]} />
    </div>
  );
}
