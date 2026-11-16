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
  const [selectedId, setSelectedId] = useState(content.pills[0].id);
  const activePill =
    content.pills.find((p) => p.id === selectedId) ?? content.pills[0];

  const isPi = activePill.systemId === "pi";

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

        {/* Clickable Job-Description Skill Pills */}
        <div className="flex flex-wrap gap-2.5" role="group" aria-label={content.heading}>
          {content.pills.map((pill) => (
            <TechTag
              key={pill.id}
              label={pill.label}
              systemAccent={pill.systemId}
              isActive={pill.id === activePill.id}
              onClick={() => setSelectedId(pill.id)}
            />
          ))}
        </div>

        {/* Animated Architecture Flow Diagram for Selected Technology */}
        <div
          key={activePill.id}
          className="rounded-2xl border border-border-subtle bg-surface-1 p-5 sm:p-6 flex flex-col gap-5 animate-fade-slide"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <Heading as="h3" size="md">
                {activePill.label}
              </Heading>
              <StatusPill label={activePill.projectLabel} tone={activePill.systemId} />
            </div>
            <StatusPill label="Live Flow Diagram" tone="pass" />
          </div>

          <Text variant="body" className="text-sm sm:text-base max-w-4xl">
            {activePill.plainEnglishSummary}
          </Text>

          {/* Animated 4-Node Pipeline */}
          <div className="grid grid-cols-1 md:grid-cols-7 gap-2 items-center">
            {activePill.flowNodes.map((node, idx) => (
              <React.Fragment key={node.step}>
                <div className="md:col-span-1 rounded-xl border border-border-strong bg-card p-3.5 shadow-xs flex flex-col gap-2">
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
                  <div className="hidden md:flex items-center justify-center" aria-hidden="true">
                    <svg viewBox="0 0 60 20" className="w-full h-5">
                      <line
                        x1="2"
                        y1="10"
                        x2="52"
                        y2="10"
                        stroke={isPi ? "var(--color-system-pi)" : "var(--color-system-oracle)"}
                        strokeWidth="2.5"
                        className="animate-flow-dash"
                      />
                      <polygon
                        points="50,5 58,10 50,15"
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
