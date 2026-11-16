import React from "react";
import {
  HeroArchitectureSplit,
  InteractiveTechExplorer,
  OracleAgenticOverview,
  PropertyIntelligenceOverview,
  ShowcaseFooter,
  ShowcaseHeader,
} from "@/components/organisms";
import type { ShowcaseBundle } from "@/content/schema";

export interface ShowcaseLandingTemplateProps {
  bundle: ShowcaseBundle;
}

export function ShowcaseLandingTemplate({ bundle }: ShowcaseLandingTemplateProps) {
  const { locale, common, hero, techExplorer, propertyIntelligence, oracleWaveY } =
    bundle;

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-fg">
      <ShowcaseHeader locale={locale} nav={common.nav} />
      <main className="flex-1">
        <HeroArchitectureSplit hero={hero} />
        <InteractiveTechExplorer content={techExplorer} />
        <PropertyIntelligenceOverview
          locale={locale}
          content={propertyIntelligence}
          deepDiveLabel={common.nav.actions.openFullDeepDive}
        />
        <OracleAgenticOverview
          locale={locale}
          content={oracleWaveY}
          deepDiveLabel={common.nav.actions.openFullDeepDive}
        />
      </main>
      <ShowcaseFooter footer={common.footer} actions={common.nav.actions} />
    </div>
  );
}
