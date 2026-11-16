import React from "react";
import { clsx } from "clsx";
import { Heading, Icon, SurfaceCard, Text } from "@/components/atoms";
import type { HeroContent } from "@/content/schema";

export interface HeroArchitectureSplitProps {
  hero: HeroContent;
}

export function HeroArchitectureSplit({ hero }: HeroArchitectureSplitProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8">
      <div className="max-w-4xl flex flex-col gap-5">
        <Text variant="eyebrow">{hero.eyebrow}</Text>
        <Heading as="h1" size="display">
          {hero.headline}
        </Heading>
        <Text variant="lead" className="max-w-3xl">
          {hero.subheadline}
        </Text>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href="#tech-explorer"
            className="min-h-11 inline-flex items-center gap-2 rounded-xl bg-accent-run px-5 py-2.5 font-sans text-sm font-semibold text-on-accent shadow-sm hover:opacity-92 transition-opacity cursor-pointer"
          >
            <span>{hero.ctas.primary}</span>
            <Icon name="arrowRight" size={16} />
          </a>
          <a
            href="#property-intelligence"
            className="min-h-11 inline-flex items-center gap-2 rounded-xl border border-border-strong bg-card px-5 py-2.5 font-sans text-sm font-semibold text-fg shadow-xs hover:bg-surface-1 transition-colors cursor-pointer"
          >
            <span>{hero.ctas.secondary}</span>
          </a>
          <a
            href={hero.ctas.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-11 inline-flex items-center gap-1.5 px-3 font-sans text-sm font-semibold text-fg-muted hover:text-accent-run transition-colors cursor-pointer"
          >
            <span>{hero.ctas.github}</span>
            <Icon name="arrowUpRight" size={15} />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {hero.pillars.map((pillar) => {
          const isPi = pillar.systemId === "pi";
          return (
            <SurfaceCard
              key={pillar.id}
              accent={pillar.systemId}
              padding="md"
              className="flex flex-col gap-2.5 min-w-0"
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={clsx(
                    "h-8 w-8 rounded-lg flex items-center justify-center shrink-0",
                    isPi
                      ? "bg-system-pi/10 text-system-pi"
                      : "bg-system-oracle/10 text-system-oracle"
                  )}
                >
                  <Icon name={pillar.icon} size={16} />
                </span>
                <span className="font-display text-sm font-bold text-fg leading-snug">
                  {pillar.title}
                </span>
              </div>
              <Text variant="muted" className="text-xs sm:text-sm leading-relaxed">
                {pillar.detail}
              </Text>
            </SurfaceCard>
          );
        })}
      </div>
    </section>
  );
}
