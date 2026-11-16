import React, { forwardRef } from "react";
import { clsx } from "clsx";

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: "p" | "span" | "div";
  variant?: "lead" | "body" | "muted" | "mono" | "eyebrow";
}

const variantClasses: Record<NonNullable<TextProps["variant"]>, string> = {
  lead: "font-sans text-base sm:text-lg leading-relaxed text-fg-muted",
  body: "font-sans text-base leading-relaxed text-fg/90",
  muted: "font-sans text-sm leading-relaxed text-fg-muted",
  mono: "font-mono text-[13px] leading-snug text-fg-muted",
  eyebrow: "font-mono text-xs uppercase tracking-[0.14em] font-medium text-accent-run",
};

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ as: Tag = "p", variant = "body", className, children, ...props }, ref) => {
    return (
      <Tag
        ref={ref}
        className={clsx(variantClasses[variant], className)}
        {...props}
      >
        {children}
      </Tag>
    );
  }
);

Text.displayName = "Text";
