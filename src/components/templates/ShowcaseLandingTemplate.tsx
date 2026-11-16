import React from "react";
import {
  ContractInspectorDrawer,
  GuelgaSection,
  HeroArchitectureSplit,
  InteractiveTechExplorer,
  OracleWaveYSection,
  PropertyIntelligenceSection,
  ShowcaseFooter,
  ShowcaseHeader,
} from "@/components/organisms";
import type { ShowcaseBundle } from "@/content/schema";

export interface ShowcaseLandingTemplateProps {
  bundle: ShowcaseBundle;
}

export function ShowcaseLandingTemplate({ bundle }: ShowcaseLandingTemplateProps) {
  const { locale, common, hero, techExplorer, propertyIntelligence, oracleWaveY, guelga, contracts } =
    bundle;

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-fg">
      <ShowcaseHeader locale={locale} nav={common.nav} />
      <main className="flex-1">
        <HeroArchitectureSplit hero={hero} />
        <InteractiveTechExplorer content={techExplorer} />
        <PropertyIntelligenceSection
          locale={locale}
          content={propertyIntelligence}
          deepDiveLabel={common.nav.actions.openFullDeepDive}
          showDeepDiveLink
        />
        <OracleWaveYSection
          locale={locale}
          content={oracleWaveY}
          deepDiveLabel={common.nav.actions.openFullDeepDive}
          showDeepDiveLink
        />
        <GuelgaSection
          locale={locale}
          content={guelga}
          deepDiveLabel={common.nav.actions.openFullDeepDive}
          showDeepDiveLink
        />
        <ContractInspectorDrawer
          sectionMeta={common.contractsSection}
          contracts={contracts}
          actions={common.nav.actions}
        />
      </main>
      <ShowcaseFooter footer={common.footer} actions={common.nav.actions} />
    </div>
  );
}
