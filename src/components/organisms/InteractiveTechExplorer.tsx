"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import {
  Heading,
  Icon,
  StatusPill,
  SurfaceCard,
  TechTag,
  Text,
} from "@/components/atoms";
import { GitHubArtifactLink } from "@/components/molecules";
import type { TechExplorerContent } from "@/content/schema";

export interface InteractiveTechExplorerProps {
  content: TechExplorerContent;
}

export function InteractiveTechExplorer({ content }: InteractiveTechExplorerProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    content.categories[0].id
  );
  const [selectedId, setSelectedId] = useState(content.pills[0].id);

  const activeCategory =
    content.categories.find((c) => c.id === selectedCategoryId) ??
    content.categories[0];

  const visiblePills =
    activeCategory.id === "all"
      ? content.pills
      : content.pills.filter((p) => activeCategory.skillIds.includes(p.id));

  const activePill =
    visiblePills.find((p) => p.id === selectedId) ??
    visiblePills[0] ??
    content.pills[0];

  const isPi = activePill.systemId === "pi";

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    const cat = content.categories.find((c) => c.id === categoryId);
    if (cat && cat.id !== "all" && !cat.skillIds.includes(selectedId)) {
      setSelectedId(cat.skillIds[0]);
    }
  };

  return (
    <section
      id="tech-explorer"
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 scroll-mt-20"
    >
      <SurfaceCard padding="lg" className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 max-w-3xl">
          <Text variant="eyebrow">{content.eyebrow}</Text>
          <Heading as="h2" size="lg">
            {content.heading}
          </Heading>
          <Text variant="muted">{content.intro}</Text>
        </div>

        {/* Categorized Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {content.categories.map((category) => {
            const isActive = category.id === activeCategory.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => handleCategorySelect(category.id)}
                aria-pressed={isActive}
                className={clsx(
                  "min-w-0 rounded-xl border p-3.5 text-left transition-all cursor-pointer flex items-start gap-3",
                  isActive
                    ? "border-accent-run bg-accent-run/5 shadow-xs ring-1 ring-accent-run/25"
                    : "border-border-subtle bg-surface-1 hover:border-border-strong hover:bg-card"
                )}
              >
                <span
                  className={clsx(
                    "h-8 w-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5",
                    isActive
                      ? "bg-accent-run text-on-accent"
                      : "bg-card text-fg-muted border border-border-subtle"
                  )}
                >
                  <Icon name={category.icon} size={16} />
                </span>
                <div className="flex flex-col gap-1 min-w-0">
                  <span className="font-display text-sm font-bold text-fg leading-snug">
                    {category.title}
                  </span>
                  <span className="font-sans text-xs text-fg-muted leading-relaxed">
                    {category.description}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Clickable Job-Description Skill Pills */}
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-fg-muted">
            {activeCategory.title} — Select a skill to inspect its live pipeline
          </span>
          <div className="flex flex-wrap gap-2.5" role="group" aria-label={content.heading}>
            {visiblePills.map((pill) => (
              <TechTag
                key={pill.id}
                label={pill.label}
                systemAccent={pill.systemId}
                isActive={pill.id === activePill.id}
                onClick={() => setSelectedId(pill.id)}
              />
            ))}
          </div>
        </div>

        {/* Animated Architecture Flow Diagram for Selected Technology */}
        <div
          key={activePill.id}
          className="rounded-2xl border border-border-subtle bg-surface-1 p-5 sm:p-6 flex flex-col gap-5 animate-fade-slide"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2.5 min-w-0">
              <Heading as="h3" size="md">
                {activePill.label}
              </Heading>
              <StatusPill label={activePill.projectLabel} tone={activePill.systemId} />
            </div>
            <StatusPill label="Pipeline Walkthrough" tone="pass" />
          </div>

          <Text variant="body" className="text-sm sm:text-base max-w-4xl">
            {activePill.plainEnglishSummary}
          </Text>

          {/* Animated 4-Node Pipeline (explicit arrow column widths so cards never get squeezed) */}
          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_24px_minmax(0,1fr)_24px_minmax(0,1fr)_24px_minmax(0,1fr)] gap-2 items-center">
            {activePill.flowNodes.map((node, idx) => (
              <React.Fragment key={node.step}>
                <div className="min-w-0 overflow-hidden rounded-xl border border-border-strong bg-card p-3.5 shadow-xs flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={clsx(
                        "h-8 w-8 rounded-lg flex items-center justify-center shrink-0",
                        isPi
                          ? "bg-system-pi/10 text-system-pi"
                          : "bg-system-oracle/10 text-system-oracle"
                      )}
                    >
                      <Icon name={node.icon} size={16} />
                    </span>
                    <span className="font-mono text-[11px] text-fg-muted">
                      {node.step}
                    </span>
                  </div>
                  <span className="font-display text-sm font-bold text-fg leading-snug">
                    {node.title}
                  </span>
                  <span className="font-sans text-xs text-fg-muted">
                    {node.subtitle}
                  </span>
                </div>

                {idx < activePill.flowNodes.length - 1 && (
                  <div className="hidden md:flex items-center justify-center w-6" aria-hidden="true">
                    <svg viewBox="0 0 24 16" className="w-6 h-4">
                      <line
                        x1="0"
                        y1="8"
                        x2="18"
                        y2="8"
                        stroke={isPi ? "var(--color-system-pi)" : "var(--color-system-oracle)"}
                        strokeWidth="2"
                        className="animate-flow-dash"
                      />
                      <polygon
                        points="16,4 23,8 16,12"
                        fill={isPi ? "var(--color-system-pi)" : "var(--color-system-oracle)"}
                      />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Direct GitHub Section Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            {activePill.githubLinks.map((lnk) => (
              <GitHubArtifactLink
                key={lnk.url}
                label={lnk.label}
                path={lnk.path}
                url={lnk.url}
              />
            ))}
          </div>
        </div>
      </SurfaceCard>
    </section>
  );
}
