import React from "react";
import { Icon } from "@/components/atoms";

export interface GitHubArtifactLinkProps {
  label: string;
  path: string;
  url: string;
}

export function GitHubArtifactLink({
  label,
  path,
  url,
}: GitHubArtifactLinkProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="min-h-11 inline-flex items-center justify-between gap-3 rounded-lg border border-border-strong bg-surface-1 px-3.5 py-2 text-left transition-colors duration-150 hover:border-fg-muted hover:bg-surface-2 cursor-pointer"
    >
      <span className="flex items-center gap-2.5 min-w-0">
        <Icon name="fileCode" size={16} className="text-accent-run shrink-0" />
        <span className="flex flex-col min-w-0">
          <span className="font-sans text-sm font-medium text-fg truncate">
            {label}
          </span>
          <span className="font-mono text-xs text-fg-muted truncate">
            {path}
          </span>
        </span>
      </span>
      <Icon name="arrowUpRight" size={16} className="text-fg-muted shrink-0" />
    </a>
  );
}
