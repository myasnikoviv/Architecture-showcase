"use client";

import React, { useState } from "react";
import Link from "next/link";
import { clsx } from "clsx";
import {
  Button,
  Divider,
  Heading,
  Icon,
  StatusPill,
  SurfaceCard,
  Text,
} from "@/components/atoms";
import {
  ChartLegendToggle,
  DagStageNode,
  EpistemicTierRow,
  GitHubArtifactLink,
  SubsystemTabStrip,
} from "@/components/molecules";
import type { PropertyIntelligenceContent } from "@/content/schema";

export interface PropertyIntelligenceSectionProps {
  locale: string;
  content: PropertyIntelligenceContent;
  deepDiveLabel?: string;
  showDeepDiveLink?: boolean;
}

const modeFillClasses: Record<string, string> = {
  bm25: "bg-fg-muted",
  vector: "bg-system-oracle",
  rrf: "bg-system-pi",
  beam: "bg-accent-run",
};

const modeTextClasses: Record<string, string> = {
  bm25: "text-fg-muted",
  vector: "text-system-oracle",
  rrf: "text-system-pi",
  beam: "text-accent-run",
};

export function PropertyIntelligenceSection({
  locale,
  content,
  deepDiveLabel,
  showDeepDiveLink = true,
}: PropertyIntelligenceSectionProps) {
  const [activeTabId, setActiveTabId] = useState(content.subsystems[0].id);
  const activeTab =
    content.subsystems.find((t) => t.id === activeTabId) ??
    content.subsystems[0];

  // Animation 4A state
  const { dagStepper, rrfChart, epistemicInspector } = content.visuals;
  const [dagMode, setDagMode] = useState<"happy" | "drift">("happy");
  const [activeStageIdx, setActiveStageIdx] = useState(0);

  const runDagSequence = (mode: "happy" | "drift") => {
    setDagMode(mode);
    setActiveStageIdx(mode === "drift" ? 4 : dagStepper.stages.length - 1);
  };

  // Chart 4B state
  const [activeModes, setActiveModes] = useState<string[]>([
    "bm25",
    "vector",
    "beam",
  ]);
  const [showRrfTable, setShowRrfTable] = useState(false);

  const toggleMode = (id: string) => {
    setActiveModes((prev) =>
      prev.includes(id)
        ? prev.length > 1
          ? prev.filter((x) => x !== id)
          : prev
        : [...prev, id]
    );
  };

  const facets = rrfChart.modes[0].scores.map((s) => s.facet);
  const visibleModes = rrfChart.modes.filter((m) => activeModes.includes(m.id));

  // Widget 4C state
  const [epistemicTab, setEpistemicTab] = useState<"valid" | "blocked">("valid");
  const currentEpistemic =
    epistemicTab === "valid"
      ? epistemicInspector.validPayload
      : epistemicInspector.blockedPayload;

  return (
    <section
      id="property-intelligence"
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 scroll-mt-20"
    >
      <SurfaceCard accent="pi" padding="lg" className="flex flex-col gap-8">
        {/* Header & Origin */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Text variant="eyebrow" className="text-system-pi">
              {content.eyebrow}
            </Text>
            {showDeepDiveLink && deepDiveLabel && (
              <Link
                href={`/${locale}/systems/${content.slug}`}
                className="min-h-11 inline-flex items-center gap-1.5 rounded-lg border border-system-pi/40 bg-system-pi/10 px-3.5 py-2 font-mono text-xs text-fg hover:bg-system-pi/20 transition-colors cursor-pointer"
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
              <StatusPill key={badge} label={badge} tone="pi" />
            ))}
          </div>

          <div className="rounded-xl border border-border-subtle bg-surface-1 p-5 flex flex-col gap-2.5">
            <Heading as="h3" size="sm" className="text-fg">
              {content.whyHeading}
            </Heading>
            {content.whyParagraphs.map((p, idx) => (
              <Text key={idx} variant="muted" className="text-sm sm:text-base">
                {p}
              </Text>
            ))}
          </div>
        </div>

        {/* 4 Subsystem Tabs */}
        <div className="flex flex-col gap-4">
          <Heading as="h3" size="md">
            {content.howHeading}
          </Heading>
          <SubsystemTabStrip
            items={content.subsystems}
            activeId={activeTab.id}
            onChange={setActiveTabId}
            accent="pi"
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

        {/* Animation 4A: 18-Stage DAG Stepper & Self-Healing Loop */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <Heading as="h3" size="md">
                {dagStepper.title}
              </Heading>
              <Text variant="muted" className="text-sm">
                {dagStepper.subtitle}
              </Text>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant={dagMode === "happy" ? "primary" : "secondary"}
                leftIcon={<Icon name="play" size={14} />}
                onClick={() => runDagSequence("happy")}
              >
                {dagStepper.playHappyLabel}
              </Button>
              <Button
                size="sm"
                variant={dagMode === "drift" ? "primary" : "secondary"}
                leftIcon={<Icon name="shieldAlert" size={14} />}
                onClick={() => runDagSequence("drift")}
              >
                {dagStepper.simulateDriftLabel}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                leftIcon={<Icon name="reset" size={14} />}
                onClick={() => {
                  setDagMode("happy");
                  setActiveStageIdx(0);
                }}
              >
                {dagStepper.resetLabel}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {dagStepper.stages.map((st, idx) => {
              const status = dagMode === "happy" ? st.happyStatus : st.driftStatus;
              const detail = dagMode === "happy" ? st.happyDetail : st.driftDetail;
              const tone =
                status === "REPAIRED"
                  ? "warn"
                  : status === "FAIL-CLOSED"
                    ? "reject"
                    : "run";

              return (
                <DagStageNode
                  key={st.id}
                  id={st.id}
                  name={st.name}
                  contract={st.contract}
                  status={status}
                  detail={detail}
                  shaDigest={st.shaDigest}
                  isCurrent={idx === activeStageIdx}
                  tone={tone}
                  onSelect={() => setActiveStageIdx(idx)}
                />
              );
            })}
          </div>
        </div>

        {/* Chart 4B + Widget 4C side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Chart 4B */}
          <SurfaceCard elevation="elevated" padding="md" className="lg:col-span-6 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <Heading as="h3" size="sm">
                {rrfChart.title}
              </Heading>
              <Text variant="muted" className="text-xs">
                {rrfChart.subtitle}
              </Text>
            </div>

            <div className="flex flex-wrap gap-2">
              {rrfChart.modes.map((m) => (
                <ChartLegendToggle
                  key={m.id}
                  label={m.label}
                  shape={m.shape}
                  colorClass={modeTextClasses[m.id]}
                  isActive={activeModes.includes(m.id)}
                  onClick={() => toggleMode(m.id)}
                />
              ))}
            </div>

            <div className="flex flex-col gap-4 pt-2">
              {facets.map((facet) => (
                <div key={facet} className="flex flex-col gap-1.5">
                  <span className="font-mono text-xs text-fg">{facet}</span>
                  <div className="flex flex-col gap-1.5">
                    {visibleModes.map((m) => {
                      const val =
                        m.scores.find((s) => s.facet === facet)?.value ?? 0;
                      return (
                        <div key={m.id} className="flex items-center gap-2">
                          <span className="font-mono text-[11px] text-fg-muted w-32 truncate">
                            {m.label}
                          </span>
                          <div className="flex-1 h-4 rounded bg-canvas border border-border-subtle overflow-hidden">
                            <div
                              style={{ width: `${val}%` }}
                              className={clsx(
                                "h-full transition-all duration-300",
                                modeFillClasses[m.id]
                              )}
                            />
                          </div>
                          <span className="font-mono text-xs text-fg tabular-nums w-9 text-right">
                            {val}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-border-subtle flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2">
                <Text variant="muted" className="text-xs">
                  {rrfChart.note}
                </Text>
                <Button
                  size="sm"
                  variant="ghost"
                  leftIcon={<Icon name="table" size={14} />}
                  onClick={() => setShowRrfTable((v) => !v)}
                >
                  {rrfChart.toggleTableLabel}
                </Button>
              </div>

              {showRrfTable && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-xs border border-border-subtle">
                    <thead className="bg-canvas text-fg-muted">
                      <tr>
                        <th className="p-2 border-b border-border-subtle">Facet</th>
                        {rrfChart.modes.map((m) => (
                          <th key={m.id} className="p-2 border-b border-border-subtle">
                            {m.label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {facets.map((facet) => (
                        <tr key={facet} className="border-b border-border-subtle">
                          <td className="p-2 text-fg">{facet}</td>
                          {rrfChart.modes.map((m) => (
                            <td key={m.id} className="p-2 tabular-nums">
                              {m.scores.find((s) => s.facet === facet)?.value}%
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </SurfaceCard>

          {/* Widget 4C */}
          <SurfaceCard elevation="elevated" padding="md" className="lg:col-span-6 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <Heading as="h3" size="sm">
                {epistemicInspector.title}
              </Heading>
              <Text variant="muted" className="text-xs">
                {epistemicInspector.subtitle}
              </Text>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant={epistemicTab === "valid" ? "primary" : "secondary"}
                leftIcon={<Icon name="shieldCheck" size={14} />}
                onClick={() => setEpistemicTab("valid")}
              >
                {epistemicInspector.validTabLabel}
              </Button>
              <Button
                size="sm"
                variant={epistemicTab === "blocked" ? "primary" : "secondary"}
                leftIcon={<Icon name="shieldAlert" size={14} />}
                onClick={() => setEpistemicTab("blocked")}
              >
                {epistemicInspector.blockedTabLabel}
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border-subtle bg-canvas px-3.5 py-2.5">
              <StatusPill
                label={currentEpistemic.verdict}
                tone={epistemicTab === "valid" ? "run" : "reject"}
              />
              <Text variant="muted" className="text-xs">
                {currentEpistemic.reason}
              </Text>
            </div>

            <div className="flex flex-col gap-2.5">
              {currentEpistemic.tiers.map((row) => (
                <EpistemicTierRow
                  key={row.tier}
                  tier={row.tier}
                  epistemicClass={row.epistemicClass}
                  statement={row.statement}
                  status={row.status}
                  shaRef={row.shaRef}
                  tone={
                    row.status === "FAIL-CLOSED" || row.status === "REJECTED"
                      ? "reject"
                      : row.status === "UNKNOWN"
                        ? "warn"
                        : "run"
                  }
                />
              ))}
            </div>
          </SurfaceCard>
        </div>

        {/* Direct GitHub Files */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
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
