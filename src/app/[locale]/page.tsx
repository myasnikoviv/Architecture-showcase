import React from "react";
import { setRequestLocale } from "next-intl/server";
import { ShowcaseLandingTemplate } from "@/components/templates";
import { loadShowcaseBundle } from "@/content/loader";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function ShowcaseHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const bundle = await loadShowcaseBundle(locale);

  return <ShowcaseLandingTemplate bundle={bundle} />;
}
