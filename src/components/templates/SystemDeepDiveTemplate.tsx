import React from "react";
import Link from "next/link";
import { Icon } from "@/components/atoms";
import {
  GuelgaSection,
  OracleWaveYSection,
  PropertyIntelligenceSection,
  ShowcaseFooter,
  ShowcaseHeader,
} from "@/components/organisms";
import type { ShowcaseBundle, SystemSlug } from "@/content/schema";

export interface SystemDeepDiveTemplateProps {
  bundle: ShowcaseBundle;
  slug: SystemSlug;
}

export function SystemDeepDiveTemplate({
  bundle,
  slug,
}: SystemDeepDiveTemplateProps) {
  const { locale, common, propertyIntelligence, oracleWaveY, guelga } = bundle;

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-fg">
      <ShowcaseHeader locale={locale} nav={common.nav} isSubPage />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
          <Link
            href={`/${locale}`}
            className="min-h-11 inline-flex items-center gap-2 rounded-lg border border-border-strong bg-surface-1 px-4 py-2 font-mono text-xs text-fg-muted hover:text-fg transition-colors cursor-pointer"
          >
            <Icon name="arrowRight" size={14} className="rotate-180" />
            <span>{common.nav.actions.backToOverview}</span>
          </Link>
        </div>

        {slug === "property-intelligence" && (
          <PropertyIntelligenceSection
            locale={locale}
            content={propertyIntelligence}
            showDeepDiveLink={false}
          />
        )}
        {slug === "oracle-wave-y" && (
          <OracleWaveYSection
            locale={locale}
            content={oracleWaveY}
            showDeepDiveLink={false}
          />
        )}
        {slug === "guelga" && (
          <GuelgaSection
            locale={locale}
            content={guelga}
            showDeepDiveLink={false}
          />
        )}
      </main>
      <ShowcaseFooter footer={common.footer} actions={common.nav.actions} />
    </div>
  );
}
