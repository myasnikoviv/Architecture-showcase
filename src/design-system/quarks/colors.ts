export const showcasePalette = {
  background: {
    canvas: "#F8FAFC",
    surface: "#F1F5F9",
    surfaceHover: "#E2E8F0",
    card: "#FFFFFF",
  },
  ink: {
    primary: "#0F172A",
    secondary: "#475569",
    inverse: "#FFFFFF",
  },
  border: {
    hairline: "#E2E8F0",
    control: "#CBD5E1",
    focus: "#2563EB",
  },
  status: {
    primaryAction: "#2563EB",
    verified: "#16A34A",
    warning: "#D97706",
    blocked: "#DC2626",
  },
  projects: {
    pi: "#4F46E5",
    oracle: "#0284C7",
  },
} as const;

export type SystemAccentKey = keyof typeof showcasePalette.projects;
export type SemanticTone = "run" | "pass" | "warn" | "reject" | "neutral" | "pi" | "oracle";
