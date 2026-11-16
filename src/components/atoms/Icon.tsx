import React from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Code2,
  Copy,
  Cpu,
  Database,
  FileCode2,
  GitBranch,
  Layers,
  Lock,
  Play,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Table,
} from "lucide-react";

const iconMap = {
  arrowRight: ArrowRight,
  arrowUpRight: ArrowUpRight,
  check: Check,
  checkCircle: CheckCircle2,
  code: Code2,
  copy: Copy,
  cpu: Cpu,
  database: Database,
  fileCode: FileCode2,
  gitBranch: GitBranch,
  layers: Layers,
  lock: Lock,
  play: Play,
  reset: RotateCcw,
  shieldAlert: ShieldAlert,
  shieldCheck: ShieldCheck,
  sparkles: Sparkles,
  table: Table,
} as const;

export type IconName = keyof typeof iconMap;

export interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  decorative?: boolean;
  ariaLabel?: string;
}

export function Icon({
  name,
  size = 16,
  className,
  decorative = true,
  ariaLabel,
}: IconProps) {
  const LucideIcon = iconMap[name];
  return (
    <LucideIcon
      size={size}
      className={className}
      aria-hidden={decorative ? true : undefined}
      aria-label={!decorative ? ariaLabel : undefined}
    />
  );
}
