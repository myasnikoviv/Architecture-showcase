import React, { forwardRef } from "react";
import { clsx } from "clsx";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4";
  size?: "display" | "lg" | "md" | "sm";
  font?: "mono" | "sans";
}

const sizeClasses: Record<NonNullable<HeadingProps["size"]>, string> = {
  display: "text-3xl sm:text-4xl lg:text-[3.1rem] leading-[1.1] tracking-[-0.025em] font-semibold",
  lg: "text-2xl sm:text-3xl leading-[1.2] tracking-[-0.02em] font-semibold",
  md: "text-lg sm:text-xl leading-[1.35] tracking-[-0.01em] font-semibold",
  sm: "text-base leading-[1.4] font-semibold",
};

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ as: Tag = "h2", size = "lg", font = "mono", className, children, ...props }, ref) => {
    return (
      <Tag
        ref={ref}
        className={clsx(
          "text-fg text-balance",
          font === "mono" ? "font-mono" : "font-sans",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </Tag>
    );
  }
);

Heading.displayName = "Heading";
