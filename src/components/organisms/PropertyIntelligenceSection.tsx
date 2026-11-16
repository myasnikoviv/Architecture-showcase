"use client";

import React, { useState } from "react";
import Link from "next/link";
import { clsx } from "clsx";
import {
  Button,
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
  InteractiveDiagramNode,
  SlideOverExplainerDrawer,
} from "@/components/molecules";
import type { PropertyIntelligenceContent } from "@/content/schema";

export interface PropertyIntelligenceSectionProps {
  locale: string;
  content: PropertyIntelligenceContent;
  deepDiveLabel?: string;
  detailsButtonLabel: string;
  showDeepDiveLink?: boolean;
}

const modeFillClasses: Record<string, string> = {
  bm25: "bg-fg-muted",
  vector: "bg-system-oracle",
  beam: "bg-system-pi",
};

const modeTextClasses: Record<string, string> = {
  bm25: "text-fg-muted",
  vector: "text-system-oracle",
  beam: "text-system-pi",
};

export function PropertyIntelligenceSection({
  locale,
  content,
  deepDiveLabel,
  detailsButtonLabel,
  showDeepDiveLink = true,
}: PropertyIntelligenceSectionProps) {
  const [selectedNodeId, setSelectedNodeId] = useState(content.nodes[2].id);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const activeNode =
    content.nodes.find((n) => n.id === selectedNodeId) ?? content.nodes[0];

  // Visual states
  const { dagStepper, rrfChart, epistemicInspector } = content.visuals;
  const [dagMode, setDagMode] = useState<"happy" | "drift">("drift");
  const [activeStageIdx, setActiveStageIdx] = useState(4);

  const [activeModes, setActiveModes] = useState<string[]>(["bm25", "vector", "beam"]);
  const [showRrfTable, setShowRrfTable] = useState(false);
  const [epistemicTab, setEpistemicTab] = useState<"valid" | "blocked">("blocked");

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
  const currentEpistemic =
    epistemicTab === "valid"
      ? epistemicInspector.validPayload
      : epistemicInspector.blockedPayload;

  return (
    <section
      id="property-intelligence"
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 scroll-mt-20"
    >
      <SurfaceCard accent="pi" padding="lg" className="flex flex-col gap-6">
        {/* Clean Header */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Text variant="eyebrow" className="text-system-pi">
              {content.eyebrow}
            </Text>
            {showDeepDiveLink && deepDiveLabel && (
              <Link
                href={`/${locale}/systems/${content.slug}`}
                className="min-h-11 inline-flex items-center gap-1.5 rounded-xl border border-border-strong bg-surface-1 px-4 py-2 font-sans text-xs sm:text-sm font-semibold text-fg hover:bg-surface-2 transition-colors cursor-pointer"
              >
                <span>{deepDiveLabel}</span>
                <Icon name="arrowRight" size={14} />
              </Link>
            )}
          </div>

          <Heading as="h2" size="lg">
            {content.title}
          </Heading>

          <Text variant="lead" className="text-base sm:text-lg max-w-4xl">
            {content.plainPitch}
          </Text>

          <div className="flex flex-wrap gap-2 pt-1">
            {content.scaleBadges.map((badge) => (
              <StatusPill key={badge} label={badge} tone="pi" />
            ))}
          </div>
        </div>

        {/* Interactive 5-Node Architecture Flow Diagram */}
        <div className="rounded-2xl border border-border-subtle bg-surface-1 p-4 sm:p-6 flex flex-col gap-4">
          <Text variant="muted" className="text-xs sm:text-sm font-medium">
            {content.diagramHint}
          </Text>

          <div className="grid grid-cols-1 lg:grid-cols-9 gap-2 items-center">
            {content.nodes.map((node, idx) => (
              <React.Fragment key={node.id}>
                <div className="lg:col-span-1 min-w-0">
                  <InteractiveDiagramNode
                    step={node.step}
                    title={node.title}
                    roleBadge={node.roleBadge}
                    icon={node.icon}
                    systemAccent="pi"
                    isSelected={node.id === activeNode.id}
                    onSelect={() => setSelectedNodeId(node.id)}
                  />
                </div>
                {idx < content.nodes.length - 1 && (
                  <div className="hidden lg:flex items-center justify-center" aria-hidden="true">
                    <svg viewBox="0 0 44 16" className="w-full h-4">
                      <line
                        x1="0"
                        y1="8"
                        x2="36"
                        y2="8"
                        stroke="var(--color-system-pi)"
                        strokeWidth="2.5"
                        className="animate-flow-dash"
                      />
                      <polygon points="34,3 42,8 34,13" fill="var(--color-system-pi)" />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Focused Visual Panel for the Clicked Diagram Node */}
        <div
          key={activeNode.id}
          className="rounded-2xl border border-border-subtle bg-card p-5 sm:p-6 shadow-xs flex flex-col gap-5 animate-fade-slide"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-border-subtle">
            <div className="flex flex-col gap-1.5 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <StatusPill label={activeNode.step} tone="pi" />
                <Heading as="h3" size="md">
                  {activeNode.title}
                </Heading>
              </div>
              <Text variant="body" className="text-sm sm:text-base text-fg-muted">
                {activeNode.plainSummary}
              </Text>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <Button
                size="sm"
                variant="primary"
                leftIcon={<Icon name="eye" size={15} />}
                onClick={() => setDrawerOpen(true)}
              >
                {detailsButtonLabel}
              </Button>
              <a
                href={activeNode.githubSectionLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-11 inline-flex items-center gap-1.5 rounded-xl border border-border-strong bg-surface-1 px-4 py-2 font-sans text-xs sm:text-sm font-semibold text-fg hover:bg-surface-2 transition-colors cursor-pointer"
              >
                <span>GitHub Diagram</span>
                <Icon name="arrowUpRight" size={14} />
              </a>
            </div>
          </div>

          {/* Interactive Visual for the Active Node */}
          {activeNode.visualType === "rrf-chart" && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <Heading as="h4" size="sm">
                    {rrfChart.title}
                  </Heading>
                  <Text variant="muted" className="text-xs sm:text-sm">
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {facets.map((facet) => (
                  <div
                    key={facet}
                    className="rounded-xl border border-border-subtle bg-surface-1 p-4 flex flex-col gap-3"
                  >
                    <span className="font-display text-sm font-bold text-fg">
                      {facet}
                    </span>
                    <div className="flex flex-col gap-2">
                      {visibleModes.map((m) => {
                        const val =
                          m.scores.find((s) => s.facet === facet)?.value ?? 0;
                        return (
                          <div key={m.id} className="flex flex-col gap-1">
                            <div className="flex justify-between font-sans text-xs font-medium text-fg-muted">
                              <span>{m.label}</span>
                              <span className="font-bold text-fg tabular-nums">
                                {val}%
                              </span>
                            </div>
                            <div className="h-3 rounded-full bg-card border border-border-subtle overflow-hidden">
                              <div
                                style={{ width: `${val}%` }}
                                className={clsx(
                                  "h-full rounded-full transition-all duration-300",
                                  modeFillClasses[m.id]
                                )}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2">
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
                  <table className="w-full text-left font-sans text-xs border border-border-subtle rounded-lg">
                    <thead className="bg-surface-1 text-fg">
                      <tr>
                        <th className="p-2.5 border-b border-border-subtle">Attribute</th>
                        {rrfChart.modes.map((m) => (
                          <th key={m.id} className="p-2.5 border-b border-border-subtle">
                            {m.label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {facets.map((facet) => (
                        <tr key={facet} className="border-b border-border-subtle">
                          <td className="p-2.5 font-semibold text-fg">{facet}</td>
                          {rrfChart.modes.map((m) => (
                            <td key={m.id} className="p-2.5 tabular-nums">
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
          )}

          {activeNode.visualType === "dag-stepper" && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <Heading as="h4" size="sm">
                    {dagStepper.title}
                  </Heading>
                  <Text variant="muted" className="text-xs sm:text-sm">
                    {dagStepper.subtitle}
                  </Text>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant={dagMode === "happy" ? "primary" : "secondary"}
                    leftIcon={<Icon name="play" size={14} />}
                    onClick={() => {
                      setDagMode("happy");
                      setActiveStageIdx(dagStepper.stages.length - 1);
                    }}
                  >
                    {dagStepper.playHappyLabel}
                  </Button>
                  <Button
                    size="sm"
                    variant={dagMode === "drift" ? "primary" : "secondary"}
                    leftIcon={<Icon name="shieldAlert" size={14} />}
                    onClick={() => {
                      setDagMode("drift");
                      setActiveStageIdx(4);
                    }}
                  >
                    {dagStepper.simulateDriftLabel}
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
                        : "pass";
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
          )}

          {activeNode.visualType === "epistemic-guard" && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <Heading as="h4" size="sm">
                    {epistemicInspector.title}
                  </Heading>
                  <Text variant="muted" className="text-xs sm:text-sm">
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
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border-subtle bg-surface-1 px-4 py-2.5">
                <StatusPill
                  label={currentEpistemic.verdict}
                  tone={epistemicTab === "valid" ? "pass" : "reject"}
                />
                <Text variant="muted" className="text-xs sm:text-sm">
                  {currentEpistemic.reason}
                </Text>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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
                          : "pass"
                    }
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Direct GitHub Files Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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

      <SlideOverExplainerDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        eyebrow={activeNode.drawerEyebrow}
        title={activeNode.title}
        summary={activeNode.plainSummary}
        bullets={activeNode.drawerBullets}
        accent="pi"
        githubLabel={activeNode.githubSectionLink.label}
        githubUrl={activeNode.githubSectionLink.url}
      />
    </section>
  );
}
