"use client";

import React, { useState } from "react";
import Link from "next/link";
import { clsx } from "clsx";
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
  ChartLegendToggle,
  FoldSplitBar,
  GitHubArtifactLink,
  SubsystemTabStrip,
} from "@/components/molecules";
import type { OracleWaveYContent } from "@/content/schema";

export interface OracleWaveYSectionProps {
  locale: string;
  content: OracleWaveYContent;
  deepDiveLabel?: string;
  showDeepDiveLink?: boolean;
}

const clusterColorVar: Record<string, string> = {
  "trend-persist": "var(--color-accent-run)",
  "vol-compress": "var(--color-system-oracle)",
  "struct-churn": "var(--color-system-pi)",
  "hdbscan-noise": "var(--color-warn)",
};

const clusterTextClass: Record<string, string> = {
  "trend-persist": "text-accent-run",
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
  if (shape === "circle") {
    return <circle cx={cx} cy={cy} r={3.2} fill={fill} />;
  }
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
  showDeepDiveLink = true,
}: OracleWaveYSectionProps) {
  const [activeTabId, setActiveTabId] = useState(content.subsystems[0].id);
  const activeTab =
    content.subsystems.find((t) => t.id === activeTabId) ??
    content.subsystems[0];

  const { purgedCv, challengerChart, waveYPlot } = content.visuals;

  // Animation 5A
  const [cvMode, setCvMode] = useState<"naive" | "purged">("purged");

  // Chart 5B
  const [showChallengerTable, setShowChallengerTable] = useState(false);

  // Plot 5C
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
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 scroll-mt-20"
    >
      <SurfaceCard accent="oracle" padding="lg" className="flex flex-col gap-8">
        {/* Header & Origin */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Text variant="eyebrow" className="text-system-oracle">
              {content.eyebrow}
            </Text>
            {showDeepDiveLink && deepDiveLabel && (
              <Link
                href={`/${locale}/systems/${content.slug}`}
                className="min-h-11 inline-flex items-center gap-1.5 rounded-lg border border-system-oracle/40 bg-system-oracle/10 px-3.5 py-2 font-mono text-xs text-fg hover:bg-system-oracle/20 transition-colors cursor-pointer"
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
              <StatusPill key={badge} label={badge} tone="oracle" />
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
            <div className="mt-1 rounded-lg border border-warn/30 bg-warn/10 px-3.5 py-2.5">
              <Text variant="mono" className="text-xs text-warn">
                {content.scopeDisclaimer}
              </Text>
            </div>
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
            accent="oracle"
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

        {/* Animation 5A: Purged Walk-Forward CV */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <Heading as="h3" size="md">
                {purgedCv.title}
              </Heading>
              <Text variant="muted" className="text-sm">
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

          <div className="rounded-lg border border-border-subtle bg-canvas px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <Text variant="muted" className="text-xs sm:text-sm">
              {cvMode === "purged" ? purgedCv.purgedCaption : purgedCv.naiveCaption}
            </Text>
            <CodeToken tone="oracle" className="shrink-0">
              {purgedCv.assertCode}
            </CodeToken>
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

        {/* Chart 5B + Plot 5C */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Chart 5B */}
          <SurfaceCard elevation="elevated" padding="md" className="lg:col-span-6 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <Heading as="h3" size="sm">
                {challengerChart.title}
              </Heading>
              <Text variant="muted" className="text-xs">
                {challengerChart.subtitle}
              </Text>
            </div>

            <div className="flex flex-col gap-3">
              {challengerChart.models.map((m) => {
                const aucPct = Math.round(((m.rocAuc - 0.45) / 0.25) * 100);
                return (
                  <div
                    key={m.id}
                    className="rounded-lg border border-border-subtle bg-canvas p-3 flex flex-col gap-2"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono text-xs font-semibold text-fg">
                        {m.label}
                      </span>
                      <div className="flex items-center gap-2 font-mono text-xs">
                        <CodeToken tone={m.id === "lgbm" ? "oracle" : "default"}>
                          AUC {m.rocAuc.toFixed(2)}
                        </CodeToken>
                        <CodeToken tone={m.id === "lgbm" ? "run" : "default"}>
                          LogLoss {m.logLoss.toFixed(2)}
                        </CodeToken>
                      </div>
                    </div>
                    <div className="h-3 rounded bg-surface-1 border border-border-subtle overflow-hidden">
                      <div
                        style={{ width: `${Math.max(10, Math.min(100, aucPct))}%` }}
                        className={clsx(
                          "h-full transition-all duration-300",
                          m.id === "lgbm"
                            ? "bg-system-oracle"
                            : m.id === "full-linear"
                              ? "bg-accent-run"
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

            <div className="pt-2 border-t border-border-subtle flex items-center justify-between gap-2">
              <Text variant="muted" className="text-xs">
                {challengerChart.note}
              </Text>
              <Button
                size="sm"
                variant="ghost"
                leftIcon={<Icon name="table" size={14} />}
                onClick={() => setShowChallengerTable((v) => !v)}
              >
                {challengerChart.toggleTableLabel}
              </Button>
            </div>

            {showChallengerTable && (
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs border border-border-subtle">
                  <thead className="bg-canvas text-fg-muted">
                    <tr>
                      <th className="p-2 border-b border-border-subtle">Model</th>
                      <th className="p-2 border-b border-border-subtle">ROC-AUC</th>
                      <th className="p-2 border-b border-border-subtle">Log-Loss</th>
                    </tr>
                  </thead>
                  <tbody>
                    {challengerChart.models.map((m) => (
                      <tr key={m.id} className="border-b border-border-subtle">
                        <td className="p-2 text-fg">{m.label}</td>
                        <td className="p-2 tabular-nums">{m.rocAuc.toFixed(2)}</td>
                        <td className="p-2 tabular-nums">{m.logLoss.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </SurfaceCard>

          {/* Plot 5C */}
          <SurfaceCard elevation="elevated" padding="md" className="lg:col-span-6 flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex flex-col gap-1">
                <Heading as="h3" size="sm">
                  {waveYPlot.title}
                </Heading>
                <Text variant="muted" className="text-xs">
                  {waveYPlot.subtitle}
                </Text>
              </div>
              <div className="flex gap-1.5 shrink-0">
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
              <div className="flex flex-col gap-3">
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

                <div className="rounded-lg border border-border-subtle bg-canvas p-3">
                  <svg
                    viewBox="0 0 100 90"
                    className="w-full h-48"
                    role="img"
                    aria-label="Illustrative UMAP and HDBSCAN density cluster scatter plot"
                  >
                    <line x1="10" y1="80" x2="95" y2="80" stroke="var(--color-border-strong)" strokeWidth="0.6" />
                    <line x1="10" y1="5" x2="10" y2="80" stroke="var(--color-border-strong)" strokeWidth="0.6" />
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
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {waveYPlot.ablationFeatures.map((af) => (
                  <div key={af.feature} className="flex flex-col gap-1">
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="text-fg">{af.feature}</span>
                      <span className="text-fg-muted">{af.group}</span>
                    </div>
                    <div className="h-4 rounded bg-canvas border border-border-subtle overflow-hidden">
                      <div
                        style={{ width: `${af.deltaScore}%` }}
                        className="h-full bg-system-oracle"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Visual DAG -> AST Compiler Strip */}
            <div className="pt-3 border-t border-border-subtle flex flex-col gap-2">
              <Text variant="mono" className="text-xs text-fg">
                {waveYPlot.compilerTitle}
              </Text>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {waveYPlot.compilerNodes.map((cn) => (
                  <div
                    key={cn.step}
                    className="rounded-lg border border-border-subtle bg-canvas px-3 py-2 flex flex-col gap-0.5"
                  >
                    <div className="flex items-center gap-2">
                      <CodeToken tone="oracle">{cn.step}</CodeToken>
                      <span className="font-mono text-xs text-fg font-medium truncate">
                        {cn.node}
                      </span>
                    </div>
                    <span className="font-sans text-xs text-fg-muted">
                      {cn.artifact}
                    </span>
                  </div>
                ))}
              </div>
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
