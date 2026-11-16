"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import {
  Button,
  CodeToken,
  Heading,
  Icon,
  StatusPill,
  SurfaceCard,
  Text,
} from "@/components/atoms";
import { MetricStatCard } from "@/components/molecules";
import type { HeroContent } from "@/content/schema";

export interface HeroArchitectureSplitProps {
  hero: HeroContent;
}

const sysAccentMap = {
  pi: "border-system-pi bg-system-pi/10 text-fg",
  oracle: "border-system-oracle bg-system-oracle/10 text-fg",
  guelga: "border-system-guelga bg-system-guelga/10 text-fg",
} as const;

export function HeroArchitectureSplit({ hero }: HeroArchitectureSplitProps) {
  const [activeInvId, setActiveInvId] = useState(hero.dnaMap.invariants[0].id);
  const activeInvariant =
    hero.dnaMap.invariants.find((i) => i.id === activeInvId) ??
    hero.dnaMap.invariants[0];

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        <div className="lg:col-span-6 flex flex-col gap-5">
          <Text variant="eyebrow">{hero.eyebrow}</Text>
          <Heading as="h1" size="display">
            {hero.headline}
          </Heading>
          <Text variant="lead">{hero.subheadline}</Text>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#property-intelligence"
              className="min-h-11 inline-flex items-center gap-2 rounded-lg bg-accent-run px-5 py-2.5 font-mono text-sm font-semibold text-on-accent hover:opacity-90 transition-opacity cursor-pointer"
            >
              <span>{hero.ctas.primary}</span>
              <Icon name="arrowRight" size={16} className="text-on-accent" />
            </a>
            <a
              href="#tech-explorer"
              className="min-h-11 inline-flex items-center gap-2 rounded-lg border border-border-strong bg-surface-1 px-5 py-2.5 font-mono text-sm text-fg hover:border-fg-muted hover:bg-surface-2 transition-colors cursor-pointer"
            >
              <span>{hero.ctas.secondary}</span>
            </a>
            <a
              href={hero.ctas.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-11 inline-flex items-center gap-1.5 px-2 font-mono text-xs text-fg-muted hover:text-fg transition-colors cursor-pointer"
            >
              <span>{hero.ctas.github}</span>
              <Icon name="arrowUpRight" size={14} />
            </a>
          </div>
        </div>

        {/* Interactive Visual 2A: Cross-System Engineering DNA Map */}
        <SurfaceCard
          elevation="elevated"
          padding="md"
          className="lg:col-span-6 flex flex-col gap-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-col gap-1">
              <Heading as="h2" size="sm">
                {hero.dnaMap.title}
              </Heading>
              <Text variant="muted" className="text-xs">
                {hero.dnaMap.subtitle}
              </Text>
            </div>
            <StatusPill label={hero.dnaMap.hint} tone="run" />
          </div>

          <div
            role="tablist"
            aria-label={hero.dnaMap.title}
            className="grid grid-cols-1 sm:grid-cols-2 gap-2"
          >
            {hero.dnaMap.invariants.map((inv) => {
              const isSelected = inv.id === activeInvariant.id;
              return (
                <Button
                  key={inv.id}
                  variant={isSelected ? "primary" : "secondary"}
                  size="sm"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveInvId(inv.id)}
                  className="justify-start text-left"
                >
                  {inv.label}
                </Button>
              );
            })}
          </div>

          <div className="rounded-lg border border-border-subtle bg-canvas p-3.5">
            <Text variant="body" className="text-sm text-fg/95">
              {activeInvariant.description}
            </Text>
          </div>

          {/* Animated SVG Connector Lines & Target System Mapping */}
          <div className="flex flex-col gap-2">
            <svg
              viewBox="0 0 600 42"
              className="w-full h-8 hidden sm:block"
              aria-hidden="true"
            >
              <line
                x1="300"
                y1="0"
                x2="100"
                y2="40"
                stroke="var(--color-system-pi)"
                strokeWidth="2"
                strokeDasharray="5 4"
              />
              <line
                x1="300"
                y1="0"
                x2="300"
                y2="40"
                stroke="var(--color-system-oracle)"
                strokeWidth="2"
                strokeDasharray="5 4"
              />
              <line
                x1="300"
                y1="0"
                x2="500"
                y2="40"
                stroke="var(--color-system-guelga)"
                strokeWidth="2"
                strokeDasharray="5 4"
              />
              <circle cx="100" cy="38" r="4" fill="var(--color-system-pi)" />
              <circle cx="300" cy="38" r="4" fill="var(--color-system-oracle)" />
              <circle cx="500" cy="38" r="4" fill="var(--color-system-guelga)" />
            </svg>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {hero.dnaMap.systems.map((sys) => (
                <a
                  key={sys.id}
                  href={sys.anchor}
                  className={clsx(
                    "rounded-lg border p-3 flex flex-col gap-1.5 transition-colors hover:opacity-95 cursor-pointer",
                    sysAccentMap[sys.id]
                  )}
                >
                  <div className="flex items-center justify-between gap-1">
                    <CodeToken tone={sys.id}>{sys.code}</CodeToken>
                    <Icon name="arrowRight" size={13} className="text-fg-muted" />
                  </div>
                  <span className="font-mono text-xs font-semibold text-fg">
                    {sys.name}
                  </span>
                  <span className="font-sans text-xs text-fg-muted leading-snug">
                    {activeInvariant.systems[sys.id]}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </SurfaceCard>
      </div>

      {/* 5 Verified Codebase Scale Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-10">
        {hero.metrics.map((metric) => (
          <MetricStatCard
            key={metric.id}
            value={metric.value}
            label={metric.label}
            detail={metric.detail}
            systemId={metric.systemId}
          />
        ))}
      </div>
    </section>
  );
}
