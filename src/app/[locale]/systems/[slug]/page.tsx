import React from "react";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { SystemDeepDiveTemplate } from "@/components/templates";
import { loadShowcaseBundle } from "@/content/loader";
import { SystemSlugSchema, type SystemSlug } from "@/content/schema";
import { routing } from "@/i18n/routing";

const SYSTEM_SLUGS: SystemSlug[] = [
  "property-intelligence",
  "oracle-wave-y",
  "guelga",
];

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    SYSTEM_SLUGS.map((slug) => ({ locale, slug }))
  );
}

export default async function SystemDeepDivePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const parsed = SystemSlugSchema.safeParse(slug);
  if (!parsed.success) {
    notFound();
  }

  setRequestLocale(locale);
  const bundle = await loadShowcaseBundle(locale);

  return <SystemDeepDiveTemplate bundle={bundle} slug={parsed.data} />;
}
