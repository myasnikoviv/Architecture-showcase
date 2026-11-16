import React from "react";
import { Heading, Icon, SurfaceCard, Text } from "@/components/atoms";
import type { CommonContent } from "@/content/schema";

export interface ShowcaseFooterProps {
  footer: CommonContent["footer"];
  actions: CommonContent["nav"]["actions"];
}

export function ShowcaseFooter({ footer, actions }: ShowcaseFooterProps) {
  return (
    <footer className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 pb-16">
      <SurfaceCard elevation="elevated" padding="lg" className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 max-w-3xl">
          <Heading as="h2" size="md">
            {footer.headline}
          </Heading>
          <Text variant="muted" className="text-sm">
            {footer.subcopy}
          </Text>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href={actions.githubShowcaseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-11 inline-flex items-center gap-2 rounded-lg bg-accent-run px-5 py-2.5 font-mono text-xs sm:text-sm font-semibold text-on-accent hover:opacity-90 transition-opacity cursor-pointer"
          >
            <span>{footer.ctas.showcase}</span>
            <Icon name="arrowUpRight" size={16} className="text-on-accent" />
          </a>

          <a
            href={actions.agentsSystemUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-11 inline-flex items-center gap-2 rounded-lg border border-border-strong bg-canvas px-4 py-2.5 font-mono text-xs sm:text-sm text-fg hover:border-fg-muted transition-colors cursor-pointer"
          >
            <Icon name="gitBranch" size={16} />
            <span>{footer.ctas.agentsSystem}</span>
            <Icon name="arrowUpRight" size={15} />
          </a>

          <a
            href={actions.authorPortfolioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-11 inline-flex items-center gap-2 rounded-lg border border-border-strong bg-surface-1 px-4 py-2.5 font-mono text-xs sm:text-sm text-fg-muted hover:text-fg transition-colors cursor-pointer"
          >
            <span>{footer.ctas.portfolio}</span>
            <Icon name="arrowUpRight" size={15} />
          </a>
        </div>

        <div className="pt-4 border-t border-border-subtle">
          <Text variant="mono" className="text-xs text-fg-muted">
            {footer.copyright}
          </Text>
        </div>
      </SurfaceCard>
    </footer>
  );
}
