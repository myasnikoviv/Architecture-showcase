import React, { forwardRef } from "react";
import { clsx } from "clsx";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-accent-run text-on-accent font-semibold shadow-sm hover:opacity-92 border border-accent-run",
  secondary:
    "bg-card text-fg font-medium border border-border-strong shadow-xs hover:bg-surface-1 hover:border-fg-muted",
  ghost:
    "bg-transparent text-fg-muted font-medium border border-transparent hover:text-fg hover:bg-surface-1",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-11 px-3.5 py-2 text-xs sm:text-sm",
  md: "min-h-11 px-5 py-2.5 text-sm",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "secondary",
      size = "md",
      leftIcon,
      rightIcon,
      className,
      children,
      type = "button",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={clsx(
          "inline-flex items-center justify-center gap-2 rounded-xl font-sans transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {leftIcon}
        <span>{children}</span>
        {rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";
