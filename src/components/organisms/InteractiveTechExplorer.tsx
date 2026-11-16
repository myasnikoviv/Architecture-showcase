import React from "react";
import { clsx } from "clsx";
import { Heading, Icon, SurfaceCard, Text } from "@/components/atoms";
import type { TechExplorerContent } from "@/content/schema";

export interface InteractiveTechExplorerProps {
  content: TechExplorerContent;
}

const tagClasses = {
  PI: "bg-system-pi/10 text-system-pi border-system-pi/25",
  ML: "bg-system-oracle/10 text-system-oracle border-system-oracle/25",
  Both: "bg-pass/10 text-pass border-pass/25",
} as const;

export function InteractiveTechExplorer({ content }: InteractiveTechExplorerProps) {
  return (
    <section
      id="tech-explorer"
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 scroll-mt-20"
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-1.5 max-w-2xl">
            <Text variant="eyebrow">{content.eyebrow}</Text>
            <Heading as="h2" size="lg">
              {content.heading}
            </Heading>
            <Text variant="muted" className="text-sm">
              {content.intro}
            </Text>
          </div>

          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
            <span className="rounded-full border border-system-pi/25 bg-system-pi/10 text-system-pi px-2.5 py-0.5 font-semibold">
              PI = Property Intelligence
            </span>
            <span className="rounded-full border border-system-oracle/25 bg-system-oracle/10 text-system-oracle px-2.5 py-0.5 font-semibold">
              ML = Trade Bot / Oracle
            </span>
            <span className="rounded-full border border-pass/25 bg-pass/10 text-pass px-2.5 py-0.5 font-semibold">
              Both = Used in Both
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {content.categories.map((category) => (
            <SurfaceCard
              key={category.id}
              padding="md"
              className="flex flex-col gap-3 min-w-0"
            >
              <div className="flex items-center gap-2.5">
                <span className="h-8 w-8 rounded-lg bg-surface-1 border border-border-subtle text-fg flex items-center justify-center shrink-0">
                  <Icon name={category.icon} size={16} />
                </span>
                <Heading as="h3" size="sm" className="text-sm font-bold">
                  {category.title}
                </Heading>
              </div>

              <ul className="flex flex-col gap-2">
                {category.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="flex items-center justify-between gap-2 text-xs sm:text-sm"
                  >
                    <span className="font-sans font-medium text-fg truncate">
                      {skill.name}
                    </span>
                    <span
                      className={clsx(
                        "rounded-full border px-2 py-0.5 font-mono text-[10px] font-semibold shrink-0",
                        tagClasses[skill.projectTag]
                      )}
                    >
                      {skill.projectTag}
                    </span>
                  </li>
                ))}
              </ul>
            </SurfaceCard>
          ))}
        </div>
      </div>
    </section>
  );
}
