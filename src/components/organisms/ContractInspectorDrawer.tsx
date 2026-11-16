"use client";

import React, { useState } from "react";
import {
  Button,
  Heading,
  Icon,
  StatusPill,
  SurfaceCard,
  Text,
} from "@/components/atoms";
import type { CommonContent, LoadedContractFile } from "@/content/schema";

export interface ContractInspectorDrawerProps {
  sectionMeta: CommonContent["contractsSection"];
  contracts: LoadedContractFile[];
  actions: Pick<
    CommonContent["nav"]["actions"],
    "openRawOnGitHub" | "copyJson" | "copied"
  >;
  defaultExpanded?: boolean;
}

export function ContractInspectorDrawer({
  sectionMeta,
  contracts,
  actions,
  defaultExpanded = false,
}: ContractInspectorDrawerProps) {
  const [selectedId, setSelectedId] = useState(contracts[0].id);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showRawJson, setShowRawJson] = useState(defaultExpanded);

  const activeContract =
    contracts.find((c) => c.id === selectedId) ?? contracts[0];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeContract.rawJson);
      setCopiedId(activeContract.id);
      setTimeout(() => setCopiedId(null), 1800);
    } catch {
      // Clipboard unavailable in restricted mode
    }
  };

  return (
    <section
      id={sectionMeta.id}
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 scroll-mt-20"
    >
      <SurfaceCard padding="lg" className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col gap-2 max-w-2xl">
            <Text variant="eyebrow">{sectionMeta.eyebrow}</Text>
            <Heading as="h2" size="lg">
              {sectionMeta.heading}
            </Heading>
            <Text variant="muted">{sectionMeta.intro}</Text>
          </div>

          <div role="tablist" aria-label={sectionMeta.heading} className="flex flex-wrap gap-2">
            {contracts.map((c) => {
              const isSelected = c.id === activeContract.id;
              return (
                <Button
                  key={c.id}
                  size="sm"
                  role="tab"
                  aria-selected={isSelected}
                  variant={isSelected ? "primary" : "secondary"}
                  onClick={() => setSelectedId(c.id)}
                >
                  {c.filename}
                </Button>
              );
            })}
          </div>
        </div>

        <SurfaceCard elevation="elevated" padding="md" className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <StatusPill
                label={activeContract.systemLabel}
                tone={activeContract.systemId}
              />
              <span className="font-mono text-xs font-medium text-fg-muted">
                contracts/{activeContract.filename}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button
                size="sm"
                variant="secondary"
                leftIcon={<Icon name="code" size={14} />}
                onClick={() => setShowRawJson((v) => !v)}
              >
                {showRawJson ? "Hide Raw JSON" : "View Raw JSON Schema"}
              </Button>
              <a
                href={activeContract.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-11 inline-flex items-center gap-1.5 rounded-xl border border-border-strong bg-card px-3.5 py-2 font-sans text-xs sm:text-sm font-semibold text-fg hover:border-accent-run transition-colors cursor-pointer"
              >
                <span>{actions.openRawOnGitHub}</span>
                <Icon name="arrowUpRight" size={14} />
              </a>
            </div>
          </div>

          <Text variant="body" className="text-sm sm:text-base">
            {activeContract.caption}
          </Text>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {activeContract.invariants.map((inv, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-border-subtle bg-card p-3 flex items-start gap-2.5 text-xs sm:text-sm text-fg"
              >
                <Icon name="checkCircle" size={16} className="text-pass shrink-0 mt-0.5" />
                <span>{inv}</span>
              </div>
            ))}
          </div>

          {showRawJson && (
            <div className="rounded-xl border border-border-strong bg-fg text-card overflow-hidden animate-fade-slide">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-fg-muted/30 font-mono text-xs">
                <span>contracts/{activeContract.filename}</span>
                <Button
                  size="sm"
                  variant="secondary"
                  leftIcon={
                    <Icon
                      name={copiedId === activeContract.id ? "check" : "copy"}
                      size={14}
                    />
                  }
                  onClick={handleCopy}
                >
                  {copiedId === activeContract.id ? actions.copied : actions.copyJson}
                </Button>
              </div>
              <pre className="p-4 overflow-x-auto max-h-96 text-xs leading-relaxed font-mono">
                <code>{activeContract.rawJson}</code>
              </pre>
            </div>
          )}
        </SurfaceCard>
      </SurfaceCard>
    </section>
  );
}
