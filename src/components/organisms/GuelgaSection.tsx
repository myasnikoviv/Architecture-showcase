"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Button,
  CodeToken,
  Divider,
  Heading,
  Icon,
  StatusPill,
  SurfaceCard,
  Text,
} from "@/components/atoms";
import {
  ContextLayerRow,
  GitHubArtifactLink,
  QaGateItem,
  SubsystemTabStrip,
} from "@/components/molecules";
import type { GuelgaContent } from "@/content/schema";

export interface GuelgaSectionProps {
  locale: string;
  content: GuelgaContent;
  deepDiveLabel?: string;
  showDeepDiveLink?: boolean;
}

export function GuelgaSection({
  locale,
  content,
  deepDiveLabel,
  showDeepDiveLink = true,
}: GuelgaSectionProps) {
  const [activeTabId, setActiveTabId] = useState(content.subsystems[0].id);
  const activeTab =
    content.subsystems.find((t) => t.id === activeTabId) ??
    content.subsystems[0];

  const { contextGate, monorepoQa } = content.visuals;

  // Animation 6A state
  const [phaseId, setPhaseId] = useState(contextGate.phases[0].id);
  const [personaId, setPersonaId] = useState(contextGate.personas[0].id);

  const activePhase =
    contextGate.phases.find((p) => p.id === phaseId) ?? contextGate.phases[0];
  const activePersona =
    contextGate.personas.find((p) => p.id === personaId) ??
    contextGate.personas[0];

  return (
    <section
      id="guelga"
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 scroll-mt-20"
    >
      <SurfaceCard accent="guelga" padding="lg" className="flex flex-col gap-8">
        {/* Header & Origin */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Text variant="eyebrow" className="text-system-guelga">
              {content.eyebrow}
            </Text>
            {showDeepDiveLink && deepDiveLabel && (
              <Link
                href={`/${locale}/systems/${content.slug}`}
                className="min-h-11 inline-flex items-center gap-1.5 rounded-lg border border-system-guelga/40 bg-system-guelga/10 px-3.5 py-2 font-mono text-xs text-fg hover:bg-system-guelga/20 transition-colors cursor-pointer"
              >
                <span>{deepDiveLabel}</span>
                <Icon name="arrowRight" size={14} />
              </Link>
            )}
          </div>

          <Heading as="h2" size="lg">
            {content.title}
          </Heading>

          <div className="flex flex-wrap gap-2">
            {content.scaleBadges.map((badge) => (
              <StatusPill key={badge} label={badge} tone="guelga" />
            ))}
          </div>

          <div className="rounded-xl border border-border-subtle bg-surface-1 p-5 flex flex-col gap-2.5">
            <Heading as="h3" size="sm">
              {content.whyHeading}
            </Heading>
            {content.whyParagraphs.map((p, idx) => (
              <Text key={idx} variant="muted" className="text-sm sm:text-base">
                {p}
              </Text>
            ))}
          </div>
        </div>

        {/* 3 Subsystem Tabs */}
        <div className="flex flex-col gap-4">
          <Heading as="h3" size="md">
            {content.howHeading}
          </Heading>
          <SubsystemTabStrip
            items={content.subsystems}
            activeId={activeTab.id}
            onChange={setActiveTabId}
            accent="guelga"
            ariaLabel={content.howHeading}
          />
          <SurfaceCard elevation="elevated" padding="md" className="flex flex-col gap-3">
            <Text variant="body" className="font-medium text-fg">
              {activeTab.summary}
            </Text>
            <ul className="list-disc pl-5 flex flex-col gap-2 text-sm text-fg-muted">
              {activeTab.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </SurfaceCard>
        </div>

        <Divider />

        {/* Animation 6A + Diagram 6B */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Animation 6A */}
          <SurfaceCard elevation="elevated" padding="md" className="lg:col-span-6 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <Heading as="h3" size="sm">
                {contextGate.title}
              </Heading>
              <Text variant="muted" className="text-xs">
                {contextGate.subtitle}
              </Text>
            </div>

            <div className="flex flex-col gap-2">
              <Text variant="mono" className="text-xs uppercase text-fg-muted">
                {contextGate.phaseLabel}
              </Text>
              <div className="flex flex-wrap gap-2">
                {contextGate.phases.map((ph) => (
                  <Button
                    key={ph.id}
                    size="sm"
                    variant={phaseId === ph.id ? "primary" : "secondary"}
                    onClick={() => setPhaseId(ph.id)}
                  >
                    {ph.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Text variant="mono" className="text-xs uppercase text-fg-muted">
                {contextGate.personaLabel}
              </Text>
              <div className="flex flex-wrap gap-2">
                {contextGate.personas.map((per) => (
                  <Button
                    key={per.id}
                    size="sm"
                    variant={personaId === per.id ? "primary" : "secondary"}
                    onClick={() => setPersonaId(per.id)}
                  >
                    {per.label}
                  </Button>
                ))}
              </div>
              <div className="rounded-lg border border-border-subtle bg-canvas px-3 py-2">
                <Text variant="muted" className="text-xs">
                  {activePersona.scope}
                </Text>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-1">
              {activePhase.layers.map((layer) => (
                <ContextLayerRow
                  key={layer.code}
                  code={layer.code}
                  name={layer.name}
                  purpose={layer.purpose}
                  permission={layer.permission}
                />
              ))}
            </div>
          </SurfaceCard>

          {/* Diagram 6B */}
          <SurfaceCard elevation="elevated" padding="md" className="lg:col-span-6 flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <Heading as="h3" size="sm">
                {monorepoQa.graphTitle}
              </Heading>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {monorepoQa.packages.map((pkg) => (
                  <div
                    key={pkg.name}
                    className="rounded-lg border border-border-subtle bg-canvas p-2.5 flex flex-col gap-1"
                  >
                    <CodeToken tone="guelga">{pkg.name}</CodeToken>
                    <Text variant="muted" className="text-xs">
                      {pkg.role}
                    </Text>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                {monorepoQa.apps.map((app) => (
                  <div
                    key={app.name}
                    className="rounded-lg border border-system-guelga/40 bg-system-guelga/10 p-2.5 flex flex-col gap-1"
                  >
                    <span className="font-mono text-xs font-semibold text-fg">
                      {app.name}
                    </span>
                    <Text variant="muted" className="text-xs">
                      {app.role}
                    </Text>
                  </div>
                ))}
              </div>
            </div>

            <Divider />

            <div className="flex flex-col gap-2.5">
              <Heading as="h3" size="sm">
                {monorepoQa.qaTitle}
              </Heading>
              {monorepoQa.qaItems.map((qa) => (
                <QaGateItem
                  key={qa.check}
                  check={qa.check}
                  tool={qa.tool}
                  status={qa.status}
                />
              ))}
            </div>
          </SurfaceCard>
        </div>

        {/* Direct GitHub Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          {content.githubLinks.map((lnk) => (
            <GitHubArtifactLink
              key={lnk.path}
              label={lnk.label}
              path={lnk.path}
              url={lnk.url}
            />
          ))}
        </div>
      </SurfaceCard>
    </section>
  );
}
