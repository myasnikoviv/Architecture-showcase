import React from "react";
import { Icon, StatusPill } from "@/components/atoms";

export interface GitHubArtifactLinkProps {
  label: string;
  path: string;
  url: string;
  badge?: string;
}

export function GitHubArtifactLink({
  label,
  path,
  url,
  badge = "GitHub Spec",
}: GitHubArtifactLinkProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="min-h-11 inline-flex items-center justify-between gap-3 rounded-xl border border-border-strong bg-card px-4 py-2.5 text-left shadow-xs transition-all duration-150 hover:border-accent-run hover:bg-surface-1 cursor-pointer"
    >
      <span className="flex items-center gap-3 min-w-0">
        <span className="h-8 w-8 rounded-lg bg-accent-run/10 flex items-center justify-center shrink-0">
          <Icon name="fileCode" size={16} className="text-accent-run" />
        </span>
        <span className="flex flex-col min-w-0">
          <span className="font-sans text-sm font-semibold text-fg truncate">
            {label}
          </span>
          <span className="font-mono text-xs text-fg-muted truncate">
            {path}
          </span>
        </span>
      </span>
      <span className="flex items-center gap-2 shrink-0">
        <StatusPill label={badge} tone="run" className="hidden sm:inline-flex" />
        <Icon name="arrowUpRight" size={16} className="text-fg-muted" />
      </span>
    </a>
  );
}
