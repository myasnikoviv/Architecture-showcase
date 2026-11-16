import React from "react";
import Link from "next/link";
import { Heading, Icon, StatusPill, SurfaceCard, Text } from "@/components/atoms";
import type { OracleWaveYContent } from "@/content/schema";
import { OracleAgenticMotionExplainer } from "./OracleAgenticMotionExplainer";

export interface OracleAgenticOverviewProps {
  locale: string;
  content: OracleWaveYContent;
  deepDiveLabel: string;
}

export function OracleAgenticOverview({
  locale,
  content,
  deepDiveLabel,
}: OracleAgenticOverviewProps) {
  return (
    <section
      id="oracle-wave-y"
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 scroll-mt-20"
    >
      <SurfaceCard accent="oracle" padding="lg" className="flex flex-col gap-5">
        <div className="flex flex-col gap-2.5 max-w-3xl">
          <Text variant="eyebrow" className="text-system-oracle">
            {content.eyebrow}
          </Text>
          <Heading as="h2" size="lg">
            {content.title}
          </Heading>
          <Text variant="body" className="text-sm sm:text-base text-fg-muted">
            {content.plainPitch}
          </Text>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {content.scaleBadges.map((badge) => (
              <StatusPill key={badge} label={badge} tone="oracle" />
            ))}
            <StatusPill label={content.scopeDisclaimer} tone="warn" className="whitespace-normal" />
          </div>
        </div>

        <OracleAgenticMotionExplainer />

        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <Link
            href={`/${locale}/systems/${content.slug}`}
            className="min-h-11 inline-flex items-center gap-2 rounded-xl bg-system-oracle px-5 py-2.5 font-sans text-sm font-semibold text-on-accent shadow-xs hover:opacity-92 transition-opacity cursor-pointer"
          >
            <span>{deepDiveLabel}</span>
            <Icon name="arrowRight" size={16} />
          </Link>

          <a
            href={content.githubLinks[0]?.url}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-11 inline-flex items-center gap-1.5 rounded-xl border border-border-strong bg-card px-4 py-2 font-sans text-sm font-semibold text-fg hover:bg-surface-1 transition-colors cursor-pointer"
          >
            <span>{content.githubLinks[0]?.label ?? "View Case Study on GitHub"}</span>
            <Icon name="arrowUpRight" size={15} />
          </a>
        </div>
      </SurfaceCard>
    </section>
  );
}
