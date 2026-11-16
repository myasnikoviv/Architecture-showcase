"use client";

import React, { useMemo, useState } from "react";
import {
  Button,
  Heading,
  StatusPill,
  SurfaceCard,
  Text,
} from "@/components/atoms";
import { GitHubArtifactLink, TechFilterGroup } from "@/components/molecules";
import type { SystemId, TechExplorerContent } from "@/content/schema";

export interface InteractiveTechExplorerProps {
  content: TechExplorerContent;
}

const systemLabelMap: Record<SystemId, string> = {
  pi: "01 / Property Intelligence",
  oracle: "02 / Oracle & Wave Y",
  guelga: "03 / GÜELGA",
};

export function InteractiveTechExplorer({ content }: InteractiveTechExplorerProps) {
  const allItems = useMemo(
    () => content.categories.flatMap((c) => c.items),
    [content.categories]
  );

  const [systemFilter, setSystemFilter] = useState<SystemId | "all">("all");
  const [selectedId, setSelectedId] = useState<string>(allItems[0].id);

  const filteredCategories = useMemo(() => {
    if (systemFilter === "all") return content.categories;
    return content.categories
      .map((cat) => ({
        ...cat,
        items: cat.items.filter((item) => item.systems.includes(systemFilter)),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [content.categories, systemFilter]);

  const activeItem =
    allItems.find((i) => i.id === selectedId) ?? allItems[0];

  return (
    <section
      id="tech-explorer"
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 scroll-mt-20"
    >
      <SurfaceCard padding="lg" className="flex flex-col gap-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div className="flex flex-col gap-2 max-w-3xl">
            <Text variant="eyebrow">{content.eyebrow}</Text>
            <Heading as="h2" size="lg">
              {content.heading}
            </Heading>
            <Text variant="muted">{content.intro}</Text>
          </div>

          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by system">
            <Button
              size="sm"
              variant={systemFilter === "all" ? "primary" : "secondary"}
              onClick={() => setSystemFilter("all")}
            >
              {content.allFilterLabel}
            </Button>
            {(["pi", "oracle", "guelga"] as SystemId[]).map((sys) => (
              <Button
                key={sys}
                size="sm"
                variant={systemFilter === sys ? "primary" : "secondary"}
                onClick={() => setSystemFilter(sys)}
              >
                {systemLabelMap[sys]}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 flex flex-col gap-5">
            {filteredCategories.map((cat) => (
              <TechFilterGroup
                key={cat.id}
                title={cat.title}
                items={cat.items}
                selectedId={activeItem.id}
                onSelect={setSelectedId}
              />
            ))}
          </div>

          <SurfaceCard
            elevation="elevated"
            accent={activeItem.primarySystem}
            padding="md"
            className="lg:col-span-5 flex flex-col gap-4 lg:sticky lg:top-24"
          >
            <div className="flex flex-wrap items-center gap-2">
              {activeItem.systems.map((sys) => (
                <StatusPill
                  key={sys}
                  label={systemLabelMap[sys]}
                  tone={sys}
                />
              ))}
            </div>

            <Heading as="h3" size="md">
              {activeItem.label}
            </Heading>

            <div className="flex flex-col gap-3">
              <div>
                <Text variant="mono" className="text-xs uppercase text-fg-muted">
                  {content.detailPrefix.usedIn}
                </Text>
                <Text variant="body" className="text-sm mt-1">
                  {activeItem.whereItRuns}
                </Text>
              </div>
              <div>
                <Text variant="mono" className="text-xs uppercase text-fg-muted">
                  {content.detailPrefix.whyChosen}
                </Text>
                <Text variant="muted" className="text-sm mt-1">
                  {activeItem.whyChosen}
                </Text>
              </div>
            </div>

            <div className="pt-2 border-t border-border-subtle flex flex-col gap-2">
              <Text variant="mono" className="text-xs uppercase text-fg-muted">
                {content.detailPrefix.inspectArtifact}
              </Text>
              <GitHubArtifactLink
                label={activeItem.artifact.label}
                path={activeItem.artifact.path}
                url={activeItem.artifact.url}
              />
            </div>
          </SurfaceCard>
        </div>
      </SurfaceCard>
    </section>
  );
}
