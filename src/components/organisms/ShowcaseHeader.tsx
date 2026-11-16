"use client";

import React from "react";
import Link from "next/link";
import { CodeToken, Heading, Icon, StatusPill } from "@/components/atoms";
import type { CommonContent } from "@/content/schema";

export interface ShowcaseHeaderProps {
  locale: string;
  nav: CommonContent["nav"];
  isSubPage?: boolean;
}

export function ShowcaseHeader({
  locale,
  nav,
  isSubPage = false,
}: ShowcaseHeaderProps) {
  const baseHref = isSubPage ? `/${locale}` : "";

  return (
    <header className="sticky top-0 z-40 border-b border-border-subtle bg-canvas/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2.5 min-w-0 cursor-pointer"
          >
            <span
              aria-hidden="true"
              className="h-8 w-8 rounded-lg bg-surface-1 border border-border-strong flex items-center justify-center shrink-0"
            >
              <Icon name="layers" size={16} className="text-accent-run" />
            </span>
            <span className="flex flex-col min-w-0">
              <Heading as="h4" size="sm" className="text-sm truncate">
                {nav.brandTitle}
              </Heading>
              <span className="font-mono text-[11px] text-fg-muted hidden sm:block truncate">
                {nav.subtitleBadge}
              </span>
            </span>
          </Link>
        </div>

        <nav
          aria-label="Primary sections"
          className="hidden lg:flex items-center gap-5 font-mono text-xs text-fg-muted"
        >
          <a href={`${baseHref}#tech-explorer`} className="hover:text-fg transition-colors py-2">
            {nav.links.techExplorer}
          </a>
          <a href={`${baseHref}#property-intelligence`} className="hover:text-system-pi transition-colors py-2">
            {nav.links.pi}
          </a>
          <a href={`${baseHref}#oracle-wave-y`} className="hover:text-system-oracle transition-colors py-2">
            {nav.links.oracle}
          </a>
          <a href={`${baseHref}#guelga`} className="hover:text-system-guelga transition-colors py-2">
            {nav.links.guelga}
          </a>
          <Link
            href={`/${locale}/contracts`}
            className="hover:text-accent-run transition-colors py-2"
          >
            {nav.links.contracts}
          </Link>
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href={nav.actions.agentsSystemUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-border-strong bg-surface-1 px-3 py-2 font-mono text-xs text-fg-muted hover:text-fg hover:border-fg-muted transition-colors cursor-pointer"
          >
            <Icon name="gitBranch" size={14} className="text-fg-muted" />
            <span>{nav.actions.agentsSystem}</span>
          </a>

          <a
            href={nav.actions.githubShowcaseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-11 inline-flex items-center gap-1.5 rounded-lg bg-accent-run px-3.5 py-2 font-mono text-xs font-semibold text-on-accent hover:opacity-90 transition-opacity cursor-pointer"
          >
            <CodeToken className="border-on-accent/30 bg-on-accent/10 text-on-accent px-1.5 py-0">
              GH
            </CodeToken>
            <span>{nav.actions.githubShowcase}</span>
            <Icon name="arrowUpRight" size={14} className="text-on-accent" />
          </a>

          <StatusPill label="OPEN ARCH" tone="run" className="hidden xl:inline-flex" />
        </div>
      </div>
    </header>
  );
}
