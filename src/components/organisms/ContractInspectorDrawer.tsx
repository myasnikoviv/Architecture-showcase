"use client";

import React, { useState } from "react";
import {
  Button,
  CodeToken,
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
}

export function ContractInspectorDrawer({
  sectionMeta,
  contracts,
  actions,
}: ContractInspectorDrawerProps) {
  const [selectedId, setSelectedId] = useState(contracts[0].id);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeContract =
    contracts.find((c) => c.id === selectedId) ?? contracts[0];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeContract.rawJson);
      setCopiedId(activeContract.id);
      setTimeout(() => setCopiedId(null), 1800);
    } catch {
      // Clipboard API unavailable in restricted contexts; fail safely
    }
  };

  return (
    <section
      id={sectionMeta.id}
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 scroll-mt-20"
    >
      <SurfaceCard padding="lg" className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 max-w-3xl">
          <Text variant="eyebrow">{sectionMeta.eyebrow}</Text>
          <Heading as="h2" size="lg">
            {sectionMeta.heading}
          </Heading>
          <Text variant="muted">{sectionMeta.intro}</Text>
        </div>

        {/* Contract Tabs */}
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Invariants Summary */}
          <SurfaceCard elevation="elevated" padding="md" className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <StatusPill
                label={activeContract.systemLabel}
                tone={activeContract.systemId}
              />
              <CodeToken tone="run">JSON Schema</CodeToken>
            </div>

            <Text variant="body" className="text-sm">
              {activeContract.caption}
            </Text>

            <div className="flex flex-col gap-2 pt-2 border-t border-border-subtle">
              <Text variant="mono" className="text-xs uppercase text-fg-muted">
                Enforced Invariants
              </Text>
              <ul className="flex flex-col gap-2">
                {activeContract.invariants.map((inv, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-fg-muted font-sans">
                    <Icon name="check" size={14} className="text-accent-run shrink-0 mt-0.5" />
                    <span>{inv}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
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
                {copiedId === activeContract.id
                  ? actions.copied
                  : actions.copyJson}
              </Button>
              <a
                href={activeContract.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-11 inline-flex items-center gap-1.5 rounded-lg border border-border-strong bg-canvas px-3.5 py-2 font-mono text-xs text-fg hover:border-fg-muted transition-colors cursor-pointer"
              >
                <span>{actions.openRawOnGitHub}</span>
                <Icon name="arrowUpRight" size={14} />
              </a>
            </div>
          </SurfaceCard>

          {/* Right: Raw Contract Viewer */}
          <div className="lg:col-span-8 rounded-xl border border-border-strong bg-canvas overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border-subtle bg-surface-1 font-mono text-xs text-fg-muted">
              <span>contracts/{activeContract.filename}</span>
              <span>Read directly at build/request time</span>
            </div>
            <pre className="p-4 overflow-x-auto max-h-[460px] text-xs leading-relaxed font-mono text-fg/90">
              <code>{activeContract.rawJson}</code>
            </pre>
          </div>
        </div>
      </SurfaceCard>
    </section>
  );
}
