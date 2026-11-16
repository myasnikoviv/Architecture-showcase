import fs from "node:fs";
import path from "node:path";
import {
  ShowcaseBundleSchema,
  type ShowcaseBundle,
  type SystemSlug,
} from "./schema";
import { routing, type AppLocale } from "@/i18n/routing";

export function resolveSupportedLocale(rawLocale: string): AppLocale {
  return (routing.locales as readonly string[]).includes(rawLocale)
    ? (rawLocale as AppLocale)
    : routing.defaultLocale;
}

export async function loadShowcaseBundle(rawLocale: string): Promise<ShowcaseBundle> {
  const locale = resolveSupportedLocale(rawLocale);

  const [common, hero, techExplorer, propertyIntelligence, oracleWaveY, guelga] =
    await Promise.all([
      import(`./locales/${locale}/common.json`).then((m) => m.default),
      import(`./locales/${locale}/hero.json`).then((m) => m.default),
      import(`./locales/${locale}/tech-explorer.json`).then((m) => m.default),
      import(`./locales/${locale}/systems/property-intelligence.json`).then(
        (m) => m.default
      ),
      import(`./locales/${locale}/systems/oracle-wave-y.json`).then(
        (m) => m.default
      ),
      import(`./locales/${locale}/systems/guelga.json`).then((m) => m.default),
    ]);

  const contractsDir = path.join(process.cwd(), "contracts");
  const contracts = (common.contractsSection?.contracts ?? []).map(
    (entry: {
      id: string;
      filename: string;
      systemLabel: string;
      systemId: "pi" | "oracle" | "guelga";
      caption: string;
      invariants: string[];
      githubUrl: string;
    }) => {
      const filePath = path.join(contractsDir, entry.filename);
      const rawJson = fs.readFileSync(filePath, "utf-8");
      return {
        ...entry,
        rawJson,
      };
    }
  );

  return ShowcaseBundleSchema.parse({
    locale,
    common,
    hero,
    techExplorer,
    propertyIntelligence,
    oracleWaveY,
    guelga,
    contracts,
  });
}

export function getSystemBySlug(bundle: ShowcaseBundle, slug: SystemSlug) {
  switch (slug) {
    case "property-intelligence":
      return bundle.propertyIntelligence;
    case "oracle-wave-y":
      return bundle.oracleWaveY;
    case "guelga":
      return bundle.guelga;
  }
}
