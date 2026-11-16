"use client";

import React, { useEffect } from "react";
import { Button, Heading, Icon, StatusPill, Text } from "@/components/atoms";
import type { SystemAccentKey } from "@/design-system/quarks";

export interface SlideOverExplainerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  eyebrow: string;
  title: string;
  summary: string;
  bullets: string[];
  accent: SystemAccentKey;
  githubLabel: string;
  githubUrl: string;
  closeLabel?: string;
}

export function SlideOverExplainerDrawer({
  isOpen,
  onClose,
  eyebrow,
  title,
  summary,
  bullets,
  accent,
  githubLabel,
  githubUrl,
  closeLabel = "Close",
}: SlideOverExplainerDrawerProps) {
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-fg/35 backdrop-blur-xs"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl h-full bg-card border-l border-border-strong shadow-2xl p-6 sm:p-8 overflow-y-auto flex flex-col justify-between gap-6 animate-fade-slide"
      >
        <div className="flex flex-col gap-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-2">
              <StatusPill label={eyebrow} tone={accent} />
              <Heading as="h3" size="md">
                {title}
              </Heading>
            </div>
            <Button
              size="sm"
              variant="secondary"
              onClick={onClose}
              aria-label={closeLabel}
              leftIcon={<Icon name="close" size={16} />}
            >
              {closeLabel}
            </Button>
          </div>

          <div className="rounded-xl bg-surface-1 border border-border-subtle p-4">
            <Text variant="body" className="text-sm sm:text-base font-medium">
              {summary}
            </Text>
          </div>

          <div className="flex flex-col gap-3">
            <Text variant="eyebrow">Implementation Details</Text>
            <ul className="flex flex-col gap-3">
              {bullets.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-sm text-fg-muted leading-relaxed"
                >
                  <Icon
                    name="checkCircle"
                    size={16}
                    className="text-pass shrink-0 mt-0.5"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-4 border-t border-border-subtle flex flex-wrap items-center justify-between gap-3">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-11 inline-flex items-center gap-2 rounded-xl bg-accent-run px-5 py-2.5 font-sans text-sm font-semibold text-on-accent hover:opacity-92 transition-opacity cursor-pointer"
          >
            <Icon name="fileCode" size={16} />
            <span>{githubLabel}</span>
            <Icon name="arrowUpRight" size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
