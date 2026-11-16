export const colors = {
  surface: {
    canvas: "#020617",
    primary: "#0F172A",
    secondary: "#1E293B",
    card: "#0E1223",
    muted: "#1A1E2F",
  },
  text: {
    primary: "#F8FAFC",
    muted: "#94A3B8",
    onAccent: "#0F172A",
  },
  border: {
    subtle: "#1E293B",
    strong: "#334155",
    ring: "#38BDF8",
  },
  semantic: {
    run: "#22C55E",
    warn: "#F59E0B",
    reject: "#EF4444",
  },
  systems: {
    pi: "#6366F1",
    oracle: "#06B6D4",
    guelga: "#F59E0B",
  },
} as const;

export type SystemAccentKey = keyof typeof colors.systems;
export type SemanticTone = "run" | "warn" | "reject" | "neutral" | "pi" | "oracle" | "guelga";
