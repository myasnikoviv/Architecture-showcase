import React from "react";
import { Heading, Text } from "@/components/atoms";
import type { HeroContent } from "@/content/schema";

export interface HeroArchitectureSplitProps {
  hero: HeroContent;
}

export function HeroArchitectureSplit({ hero }: HeroArchitectureSplitProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-4">
      <div className="max-w-3xl flex flex-col gap-3">
        <Text variant="eyebrow">{hero.eyebrow}</Text>
        <Heading as="h1" size="display">
          {hero.headline}
        </Heading>
        <Text variant="lead" className="text-base sm:text-lg">
          {hero.subheadline}
        </Text>
      </div>
    </section>
  );
}
