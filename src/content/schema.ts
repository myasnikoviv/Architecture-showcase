import { z } from "zod";

export const SystemIdSchema = z.enum(["pi", "oracle"]);
export type SystemId = z.infer<typeof SystemIdSchema>;

export const SystemSlugSchema = z.enum([
  "property-intelligence",
  "oracle-wave-y",
]);
export type SystemSlug = z.infer<typeof SystemSlugSchema>;

export const IconKeySchema = z.enum([
  "database",
  "brain",
  "search",
  "shieldCheck",
  "workflow",
  "layoutGrid",
  "cpu",
  "layers",
  "sliders",
  "eye",
  "server",
  "sparkles",
]);

export const GitHubLinkSchema = z.object({
  label: z.string().min(1),
  path: z.string().min(1),
  url: z.string().url(),
});

export const DiagramNodeSchema = z.object({
  id: z.string().min(1),
  step: z.string().min(1),
  title: z.string().min(1),
  roleBadge: z.string().min(1),
  icon: IconKeySchema,
  plainSummary: z.string().min(1),
  visualType: z.enum([
    "rrf-chart",
    "dag-stepper",
    "epistemic-guard",
    "purged-cv",
    "challenger-chart",
    "umap-clusters",
  ]),
  drawerEyebrow: z.string().min(1),
  drawerBullets: z.array(z.string().min(1)).min(1),
  githubSectionLink: GitHubLinkSchema,
});

export const CommonContentSchema = z.object({
  meta: z.object({
    siteTitle: z.string().min(1),
    siteDescription: z.string().min(1),
  }),
  nav: z.object({
    brandTitle: z.string().min(1),
    subtitleBadge: z.string().min(1),
    links: z.object({
      matcher: z.string().min(1),
      pi: z.string().min(1),
      oracle: z.string().min(1),
      contracts: z.string().min(1),
    }),
    actions: z.object({
      githubShowcase: z.string().min(1),
      githubShowcaseUrl: z.string().url(),
      agentsSystem: z.string().min(1),
      agentsSystemUrl: z.string().url(),
      backToOverview: z.string().min(1),
      openFullDeepDive: z.string().min(1),
      openRawOnGitHub: z.string().min(1),
      readTechnicalDetails: z.string().min(1),
      copyJson: z.string().min(1),
      copied: z.string().min(1),
    }),
  }),
  contractsSection: z.object({
    id: z.string().min(1),
    eyebrow: z.string().min(1),
    heading: z.string().min(1),
    intro: z.string().min(1),
    contracts: z.array(
      z.object({
        id: z.string().min(1),
        filename: z.string().min(1),
        systemLabel: z.string().min(1),
        systemId: SystemIdSchema,
        caption: z.string().min(1),
        invariants: z.array(z.string().min(1)).min(1),
        githubUrl: z.string().url(),
      })
    ),
  }),
  footer: z.object({
    headline: z.string().min(1),
    subcopy: z.string().min(1),
    ctas: z.object({
      showcase: z.string().min(1),
      agentsSystem: z.string().min(1),
      portfolio: z.string().min(1),
      portfolioUrl: z.string().url(),
    }),
    copyright: z.string().min(1),
  }),
});

export const HeroContentSchema = z.object({
  eyebrow: z.string().min(1),
  headline: z.string().min(1),
  subheadline: z.string().min(1),
  ctas: z.object({
    primary: z.string().min(1),
    secondary: z.string().min(1),
    github: z.string().min(1),
    githubUrl: z.string().url(),
  }),
  metrics: z
    .array(
      z.object({
        id: z.string().min(1),
        value: z.string().min(1),
        label: z.string().min(1),
        detail: z.string().min(1),
        systemId: SystemIdSchema,
      })
    )
    .length(4),
});

export const TechExplorerContentSchema = z.object({
  eyebrow: z.string().min(1),
  heading: z.string().min(1),
  intro: z.string().min(1),
  pills: z
    .array(
      z.object({
        id: z.string().min(1),
        label: z.string().min(1),
        projectLabel: z.string().min(1),
        systemId: SystemIdSchema,
        plainEnglishSummary: z.string().min(1),
        flowNodes: z
          .array(
            z.object({
              step: z.string().min(1),
              title: z.string().min(1),
              subtitle: z.string().min(1),
              icon: IconKeySchema,
            })
          )
          .length(4),
        githubLinks: z.array(GitHubLinkSchema).min(1),
      })
    )
    .min(5),
});

export const PropertyIntelligenceContentSchema = z.object({
  slug: z.literal("property-intelligence"),
  systemId: z.literal("pi"),
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  plainPitch: z.string().min(1),
  scaleBadges: z.array(z.string().min(1)).min(1),
  diagramHint: z.string().min(1),
  nodes: z.array(DiagramNodeSchema).length(5),
  githubLinks: z.array(GitHubLinkSchema).min(1),
  visuals: z.object({
    dagStepper: z.object({
      title: z.string().min(1),
      subtitle: z.string().min(1),
      playHappyLabel: z.string().min(1),
      simulateDriftLabel: z.string().min(1),
      resetLabel: z.string().min(1),
      stages: z.array(
        z.object({
          id: z.string().min(1),
          name: z.string().min(1),
          contract: z.string().min(1),
          happyStatus: z.enum(["PASS", "OBSERVED"]),
          driftStatus: z.enum(["PASS", "WARN", "FAIL-CLOSED", "REPAIRED"]),
          happyDetail: z.string().min(1),
          driftDetail: z.string().min(1),
          shaDigest: z.string().min(1),
        })
      ),
    }),
    rrfChart: z.object({
      title: z.string().min(1),
      subtitle: z.string().min(1),
      toggleTableLabel: z.string().min(1),
      note: z.string().min(1),
      modes: z.array(
        z.object({
          id: z.string().min(1),
          label: z.string().min(1),
          shape: z.enum(["circle", "square", "diamond", "triangle"]),
          scores: z.array(
            z.object({
              facet: z.string().min(1),
              value: z.number().min(0).max(100),
            })
          ),
        })
      ),
    }),
    epistemicInspector: z.object({
      title: z.string().min(1),
      subtitle: z.string().min(1),
      validTabLabel: z.string().min(1),
      blockedTabLabel: z.string().min(1),
      validPayload: z.object({
        verdict: z.string().min(1),
        reason: z.string().min(1),
        tiers: z.array(
          z.object({
            tier: z.string().min(1),
            epistemicClass: z.string().min(1),
            statement: z.string().min(1),
            status: z.enum(["OBSERVED", "UNKNOWN", "PASS"]),
            shaRef: z.string().min(1),
          })
        ),
      }),
      blockedPayload: z.object({
        verdict: z.string().min(1),
        reason: z.string().min(1),
        tiers: z.array(
          z.object({
            tier: z.string().min(1),
            epistemicClass: z.string().min(1),
            statement: z.string().min(1),
            status: z.enum(["FAIL-CLOSED", "REJECTED", "UNKNOWN"]),
            shaRef: z.string().min(1),
          })
        ),
      }),
    }),
  }),
});

export const OracleWaveYContentSchema = z.object({
  slug: z.literal("oracle-wave-y"),
  systemId: z.literal("oracle"),
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  plainPitch: z.string().min(1),
  scopeDisclaimer: z.string().min(1),
  scaleBadges: z.array(z.string().min(1)).min(1),
  diagramHint: z.string().min(1),
  nodes: z.array(DiagramNodeSchema).length(5),
  githubLinks: z.array(GitHubLinkSchema).min(1),
  visuals: z.object({
    purgedCv: z.object({
      title: z.string().min(1),
      subtitle: z.string().min(1),
      naiveLabel: z.string().min(1),
      purgedLabel: z.string().min(1),
      assertCode: z.string().min(1),
      naiveCaption: z.string().min(1),
      purgedCaption: z.string().min(1),
      folds: z.array(
        z.object({
          fold: z.string().min(1),
          trainPct: z.number().min(0).max(100),
          purgePct: z.number().min(0).max(100),
          testPct: z.number().min(0).max(100),
          trainEpisodes: z.string().min(1),
          testEpisodes: z.string().min(1),
        })
      ),
    }),
    challengerChart: z.object({
      title: z.string().min(1),
      subtitle: z.string().min(1),
      toggleTableLabel: z.string().min(1),
      note: z.string().min(1),
      models: z.array(
        z.object({
          id: z.string().min(1),
          label: z.string().min(1),
          shape: z.enum(["circle", "square", "diamond", "triangle"]),
          rocAuc: z.number().min(0).max(1),
          logLoss: z.number().min(0).max(2),
          calibrationNote: z.string().min(1),
        })
      ),
    }),
    waveYPlot: z.object({
      title: z.string().min(1),
      subtitle: z.string().min(1),
      clusterModeLabel: z.string().min(1),
      ablationModeLabel: z.string().min(1),
      compilerTitle: z.string().min(1),
      clusters: z.array(
        z.object({
          id: z.string().min(1),
          label: z.string().min(1),
          shape: z.enum(["circle", "triangle", "diamond", "cross"]),
          points: z.array(
            z.object({
              x: z.number().min(0).max(100),
              y: z.number().min(0).max(100),
            })
          ),
        })
      ),
      ablationFeatures: z.array(
        z.object({
          feature: z.string().min(1),
          group: z.string().min(1),
          deltaScore: z.number().min(0).max(100),
        })
      ),
      compilerNodes: z.array(
        z.object({
          step: z.string().min(1),
          node: z.string().min(1),
          artifact: z.string().min(1),
        })
      ),
    }),
  }),
});

export const LoadedContractFileSchema = z.object({
  id: z.string().min(1),
  filename: z.string().min(1),
  systemLabel: z.string().min(1),
  systemId: SystemIdSchema,
  caption: z.string().min(1),
  invariants: z.array(z.string().min(1)),
  githubUrl: z.string().url(),
  rawJson: z.string().min(2),
});

export const ShowcaseBundleSchema = z.object({
  locale: z.string().min(2),
  common: CommonContentSchema,
  hero: HeroContentSchema,
  techExplorer: TechExplorerContentSchema,
  propertyIntelligence: PropertyIntelligenceContentSchema,
  oracleWaveY: OracleWaveYContentSchema,
  contracts: z.array(LoadedContractFileSchema).length(2),
});

export type CommonContent = z.infer<typeof CommonContentSchema>;
export type HeroContent = z.infer<typeof HeroContentSchema>;
export type TechExplorerContent = z.infer<typeof TechExplorerContentSchema>;
export type PropertyIntelligenceContent = z.infer<
  typeof PropertyIntelligenceContentSchema
>;
export type OracleWaveYContent = z.infer<typeof OracleWaveYContentSchema>;
export type DiagramNode = z.infer<typeof DiagramNodeSchema>;
export type LoadedContractFile = z.infer<typeof LoadedContractFileSchema>;
export type ShowcaseBundle = z.infer<typeof ShowcaseBundleSchema>;
