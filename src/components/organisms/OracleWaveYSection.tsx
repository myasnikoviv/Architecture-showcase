"use client";

import React, { useState } from "react";
import Link from "next/link";
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
import {
  ChartLegendToggle,
  FoldSplitBar,
  GitHubArtifactLink,
  InteractiveDiagramNode,
  SlideOverExplainerDrawer,
} from "@/components/molecules";
import type { OracleWaveYContent } from "@/content/schema";

export interface OracleWaveYSectionProps {
  locale: string;
  content: OracleWaveYContent;
  deepDiveLabel?: string;
  detailsButtonLabel: string;
  showDeepDiveLink?: boolean;
}

const clusterColorVar: Record<string, string> = {
  "trend-persist": "var(--color-pass)",
  "vol-compress": "var(--color-system-oracle)",
  "struct-churn": "var(--color-system-pi)",
  "hdbscan-noise": "var(--color-warn)",
};

const clusterTextClass: Record<string, string> = {
  "trend-persist": "text-pass",
  "vol-compress": "text-system-oracle",
  "struct-churn": "text-system-pi",
  "hdbscan-noise": "text-warn",
};

function ClusterMarker({
  shape,
  cx,
  cy,
  fill,
}: {
  shape: "circle" | "triangle" | "diamond" | "cross";
  cx: number;
  cy: number;
  fill: string;
}) {
  if (shape === "circle") return <circle cx={cx} cy={cy} r={3.2} fill={fill} />;
  if (shape === "triangle") {
    return (
      <polygon
        points={`${cx},${cy - 3.6} ${cx + 3.4},${cy + 3} ${cx - 3.4},${cy + 3}`}
        fill={fill}
      />
    );
  }
  if (shape === "diamond") {
    return (
      <polygon
        points={`${cx},${cy - 3.8} ${cx + 3.8},${cy} ${cx},${cy + 3.8} ${cx - 3.8},${cy}`}
        fill={fill}
      />
    );
  }
  return (
    <path
      d={`M${cx - 2.6} ${cy - 2.6} L${cx + 2.6} ${cy + 2.6} M${cx + 2.6} ${cy - 2.6} L${cx - 2.6} ${cy + 2.6}`}
      stroke={fill}
      strokeWidth={1.6}
      strokeLinecap="round"
    />
  );
}

export function OracleWaveYSection({
  locale,
  content,
  deepDiveLabel,
  detailsButtonLabel,
  showDeepDiveLink = true,
}: OracleWaveYSectionProps) {
  const [selectedNodeId, setSelectedNodeId] = useState(content.nodes[2].id);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const activeNode =
    content.nodes.find((n) => n.id === selectedNodeId) ?? content.nodes[0];

  const { purgedCv, challengerChart, waveYPlot } = content.visuals;
  const [cvMode, setCvMode] = useState<"naive" | "purged">("purged");
  const [showChallengerTable, setShowChallengerTable] = useState(false);
  const [waveMode, setWaveMode] = useState<"clusters" | "ablation">("clusters");
  const [visibleClusters, setVisibleClusters] = useState<string[]>(
    waveYPlot.clusters.map((c) => c.id)
  );

  const toggleCluster = (id: string) => {
    setVisibleClusters((prev) =>
      prev.includes(id)
        ? prev.length > 1
          ? prev.filter((x) => x !== id)
          : prev
        : [...prev, id]
    );
  };

  return (
    <section
      id="oracle-wave-y"
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 scroll-mt-20"
    >
      <SurfaceCard accent="oracle" padding="lg" className="flex flex-col gap-6">
        {/* Clean Header */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Text variant="eyebrow" className="text-system-oracle">
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

          <div className="flex flex-wrap items-center gap-2 pt-1">
            {content.scaleBadges.map((badge) => (
              <StatusPill key={badge} label={badge} tone="oracle" />
            ))}
            <StatusPill label={content.scopeDisclaimer} tone="warn" className="whitespace-normal" />
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
                    systemAccent="oracle"
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
                        stroke="var(--color-system-oracle)"
                        strokeWidth="2.5"
                        className="animate-flow-dash"
                      />
                      <polygon points="34,3 42,8 34,13" fill="var(--color-system-oracle)" />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Focused Visual Panel for Clicked Node */}
        <div
          key={activeNode.id}
          className="rounded-2xl border border-border-subtle bg-card p-5 sm:p-6 shadow-xs flex flex-col gap-5 animate-fade-slide"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-border-subtle">
            <div className="flex flex-col gap-1.5 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <StatusPill label={activeNode.step} tone="oracle" />
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

          {activeNode.visualType === "purged-cv" && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <Heading as="h4" size="sm">
                    {purgedCv.title}
                  </Heading>
                  <Text variant="muted" className="text-xs sm:text-sm">
                    {purgedCv.subtitle}
                  </Text>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant={cvMode === "naive" ? "primary" : "secondary"}
                    onClick={() => setCvMode("naive")}
                  >
                    {purgedCv.naiveLabel}
                  </Button>
                  <Button
                    size="sm"
                    variant={cvMode === "purged" ? "primary" : "secondary"}
                    onClick={() => setCvMode("purged")}
                  >
                    {purgedCv.purgedLabel}
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border-subtle bg-surface-1 px-4 py-2.5">
                <Text variant="muted" className="text-xs sm:text-sm">
                  {cvMode === "purged" ? purgedCv.purgedCaption : purgedCv.naiveCaption}
                </Text>
                <CodeToken tone="oracle">{purgedCv.assertCode}</CodeToken>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {purgedCv.folds.map((f) => (
                  <FoldSplitBar
                    key={f.fold}
                    fold={f.fold}
                    mode={cvMode}
                    trainPct={f.trainPct}
                    purgePct={f.purgePct}
                    testPct={f.testPct}
                    trainEpisodes={f.trainEpisodes}
                    testEpisodes={f.testEpisodes}
                  />
                ))}
              </div>
            </div>
          )}

          {activeNode.visualType === "challenger-chart" && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <Heading as="h4" size="sm">
                    {challengerChart.title}
                  </Heading>
                  <Text variant="muted" className="text-xs sm:text-sm">
                    {challengerChart.subtitle}
                  </Text>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  leftIcon={<Icon name="table" size={14} />}
                  onClick={() => setShowChallengerTable((v) => !v)}
                >
                  {challengerChart.toggleTableLabel}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {challengerChart.models.map((m) => {
                  const aucPct = Math.round(((m.rocAuc - 0.45) / 0.25) * 100);
                  return (
                    <div
                      key={m.id}
                      className="rounded-xl border border-border-subtle bg-surface-1 p-4 flex flex-col gap-2"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-display text-sm font-bold text-fg">
                          {m.label}
                        </span>
                        <div className="flex gap-1.5">
                          <CodeToken tone={m.id === "lgbm" ? "oracle" : "default"}>
                            AUC {m.rocAuc.toFixed(2)}
                          </CodeToken>
                          <CodeToken tone={m.id === "lgbm" ? "pass" : "default"}>
                            LogLoss {m.logLoss.toFixed(2)}
                          </CodeToken>
                        </div>
                      </div>
                      <div className="h-3 rounded-full bg-card border border-border-subtle overflow-hidden">
                        <div
                          style={{ width: `${Math.max(10, Math.min(100, aucPct))}%` }}
                          className={clsx(
                            "h-full rounded-full transition-all duration-300",
                            m.id === "lgbm"
                              ? "bg-system-oracle"
                              : m.id === "full-linear"
                                ? "bg-pass"
                                : "bg-fg-muted"
                          )}
                        />
                      </div>
                      <Text variant="muted" className="text-xs">
                        {m.calibrationNote}
                      </Text>
                    </div>
                  );
                })}
              </div>

              {showChallengerTable && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-sans text-xs border border-border-subtle">
                    <thead className="bg-surface-1 text-fg">
                      <tr>
                        <th className="p-2.5 border-b border-border-subtle">Model</th>
                        <th className="p-2.5 border-b border-border-subtle">ROC-AUC</th>
                        <th className="p-2.5 border-b border-border-subtle">Log-Loss</th>
                      </tr>
                    </thead>
                    <tbody>
                      {challengerChart.models.map((m) => (
                        <tr key={m.id} className="border-b border-border-subtle">
                          <td className="p-2.5 font-semibold text-fg">{m.label}</td>
                          <td className="p-2.5 tabular-nums">{m.rocAuc.toFixed(2)}</td>
                          <td className="p-2.5 tabular-nums">{m.logLoss.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeNode.visualType === "umap-clusters" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              <div className="lg:col-span-7 flex flex-col gap-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <Heading as="h4" size="sm">
                      {waveYPlot.title}
                    </Heading>
                    <Text variant="muted" className="text-xs sm:text-sm">
                      {waveYPlot.subtitle}
                    </Text>
                  </div>
                  <div className="flex gap-1.5">
                    <Button
                      size="sm"
                      variant={waveMode === "clusters" ? "primary" : "secondary"}
                      onClick={() => setWaveMode("clusters")}
                    >
                      {waveYPlot.clusterModeLabel}
                    </Button>
                    <Button
                      size="sm"
                      variant={waveMode === "ablation" ? "primary" : "secondary"}
                      onClick={() => setWaveMode("ablation")}
                    >
                      {waveYPlot.ablationModeLabel}
                    </Button>
                  </div>
                </div>

                {waveMode === "clusters" ? (
                  <>
                    <div className="flex flex-wrap gap-2">
                      {waveYPlot.clusters.map((cl) => (
                        <ChartLegendToggle
                          key={cl.id}
                          label={cl.label}
                          shape={cl.shape}
                          colorClass={clusterTextClass[cl.id]}
                          isActive={visibleClusters.includes(cl.id)}
                          onClick={() => toggleCluster(cl.id)}
                        />
                      ))}
                    </div>
                    <div className="rounded-xl border border-border-subtle bg-surface-1 p-3">
                      <svg
                        viewBox="0 0 100 88"
                        className="w-full h-48"
                        role="img"
                        aria-label="UMAP and HDBSCAN density cluster map"
                      >
                        <line x1="10" y1="78" x2="95" y2="78" stroke="var(--color-border-strong)" strokeWidth="0.7" />
                        <line x1="10" y1="6" x2="10" y2="78" stroke="var(--color-border-strong)" strokeWidth="0.7" />
                        {waveYPlot.clusters
                          .filter((c) => visibleClusters.includes(c.id))
                          .map((cl) =>
                            cl.points.map((pt, i) => (
                              <ClusterMarker
                                key={`${cl.id}-${i}`}
                                shape={cl.shape}
                                cx={pt.x}
                                cy={pt.y}
                                fill={clusterColorVar[cl.id]}
                              />
                            ))
                          )}
                      </svg>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col gap-3 rounded-xl border border-border-subtle bg-surface-1 p-4">
                    {waveYPlot.ablationFeatures.map((af) => (
                      <div key={af.feature} className="flex flex-col gap-1">
                        <div className="flex justify-between font-sans text-xs font-semibold">
                          <span className="text-fg">{af.feature}</span>
                          <span className="text-fg-muted">{af.group}</span>
                        </div>
                        <div className="h-3.5 rounded-full bg-card border border-border-subtle overflow-hidden">
                          <div
                            style={{ width: `${af.deltaScore}%` }}
                            className="h-full rounded-full bg-system-oracle"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="lg:col-span-5 rounded-xl border border-border-subtle bg-surface-1 p-4 flex flex-col gap-3">
                <Text variant="eyebrow" className="text-system-oracle">
                  {waveYPlot.compilerTitle}
                </Text>
                <div className="flex flex-col gap-2">
                  {waveYPlot.compilerNodes.map((cn) => (
                    <div
                      key={cn.step}
                      className="rounded-lg border border-border-subtle bg-card px-3 py-2.5 flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <CodeToken tone="oracle">{cn.step}</CodeToken>
                        <span className="font-display text-xs font-bold text-fg truncate">
                          {cn.node}
                        </span>
                      </div>
                      <span className="font-sans text-xs text-fg-muted shrink-0">
                        {cn.artifact}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Direct GitHub Files */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
        accent="oracle"
        githubLabel={activeNode.githubSectionLink.label}
        githubUrl={activeNode.githubSectionLink.url}
      />
    </section>
  );
}
