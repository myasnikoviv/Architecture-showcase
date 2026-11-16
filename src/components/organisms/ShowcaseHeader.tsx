"use client";

import React from "react";
import Link from "next/link";
import { Heading, Icon } from "@/components/atoms";
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
    <header className="sticky top-0 z-40 border-b border-border-subtle bg-card/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2.5 shrink-0 cursor-pointer"
        >
          <span
            aria-hidden="true"
            className="h-9 w-9 rounded-xl bg-accent-run text-on-accent flex items-center justify-center shadow-xs shrink-0"
          >
            <Icon name="layers" size={18} />
          </span>
          <span className="flex items-baseline gap-2">
            <Heading as="h4" size="sm" className="text-base whitespace-nowrap">
              {nav.brandTitle}
            </Heading>
            <span className="hidden xl:inline font-sans text-xs font-medium text-fg-muted whitespace-nowrap">
              · {nav.subtitleBadge}
            </span>
          </span>
        </Link>

        <nav
          aria-label="Primary sections"
          className="hidden md:flex items-center gap-6 font-sans text-sm font-medium text-fg-muted"
        >
          <a
            href={`${baseHref}#tech-explorer`}
            className="hover:text-fg transition-colors whitespace-nowrap py-2"
          >
            {nav.links.matcher}
          </a>
          <a
            href={`${baseHref}#property-intelligence`}
            className="hover:text-system-pi transition-colors whitespace-nowrap py-2"
          >
            {nav.links.pi}
          </a>
          <a
            href={`${baseHref}#oracle-wave-y`}
            className="hover:text-system-oracle transition-colors whitespace-nowrap py-2"
          >
            {nav.links.oracle}
          </a>
          <Link
            href={`/${locale}/contracts`}
            className="hover:text-accent-run transition-colors whitespace-nowrap py-2"
          >
            {nav.links.contracts}
          </Link>
        </nav>

        <div className="flex items-center gap-2.5 shrink-0">
          <a
            href={nav.actions.agentsSystemUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-border-strong bg-surface-1 px-3.5 py-2 font-sans text-xs font-semibold text-fg hover:bg-surface-2 transition-colors whitespace-nowrap cursor-pointer"
          >
            <Icon name="gitBranch" size={14} className="text-fg-muted" />
            <span>{nav.actions.agentsSystem}</span>
          </a>

          <a
            href={nav.actions.githubShowcaseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-11 inline-flex items-center gap-1.5 rounded-xl bg-accent-run px-4 py-2 font-sans text-xs sm:text-sm font-semibold text-on-accent shadow-xs hover:opacity-92 transition-opacity whitespace-nowrap cursor-pointer"
          >
            <span>{nav.actions.githubShowcase}</span>
            <Icon name="arrowUpRight" size={15} />
          </a>
        </div>
      </div>
    </header>
  );
}
