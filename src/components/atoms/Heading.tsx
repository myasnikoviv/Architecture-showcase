import React, { forwardRef } from "react";
import { clsx } from "clsx";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4";
  size?: "display" | "lg" | "md" | "sm";
}

const sizeClasses: Record<NonNullable<HeadingProps["size"]>, string> = {
  display:
    "font-display text-3xl sm:text-4xl lg:text-[3.1rem] leading-[1.12] tracking-[-0.025em] font-extrabold",
  lg: "font-display text-2xl sm:text-3xl leading-[1.2] tracking-[-0.02em] font-bold",
  md: "font-display text-lg sm:text-xl leading-[1.35] tracking-[-0.015em] font-bold",
  sm: "font-display text-base leading-[1.4] font-semibold",
};

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ as: Tag = "h2", size = "lg", className, children, ...props }, ref) => {
    return (
      <Tag
        ref={ref}
        className={clsx("text-fg text-balance", sizeClasses[size], className)}
        {...props}
      >
        {children}
      </Tag>
    );
  }
);

Heading.displayName = "Heading";
