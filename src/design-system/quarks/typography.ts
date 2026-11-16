export const typography = {
  fonts: {
    mono: "var(--font-mono), 'JetBrains Mono', ui-monospace, SFMono-Regular, monospace",
    sans: "var(--font-sans), 'IBM Plex Sans', system-ui, -apple-system, sans-serif",
  },
  scale: {
    displayLg: "clamp(2.25rem, 4vw, 3.25rem)",
    headingLg: "1.875rem",
    headingMd: "1.25rem",
    bodyMd: "1rem",
    monoSm: "0.8125rem",
    monoXs: "0.75rem",
  },
} as const;
