import React from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  Check,
  CheckCircle2,
  ChevronRight,
  Code2,
  Copy,
  Cpu,
  Database,
  Eye,
  FileCode2,
  GitBranch,
  Layers,
  LayoutGrid,
  Lock,
  Play,
  RotateCcw,
  Search,
  Server,
  ShieldAlert,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Table,
  Workflow,
  X,
} from "lucide-react";

const iconMap = {
  arrowRight: ArrowRight,
  arrowUpRight: ArrowUpRight,
  brain: BrainCircuit,
  check: Check,
  checkCircle: CheckCircle2,
  chevronRight: ChevronRight,
  close: X,
  code: Code2,
  copy: Copy,
  cpu: Cpu,
  database: Database,
  eye: Eye,
  fileCode: FileCode2,
  gitBranch: GitBranch,
  layers: Layers,
  layoutGrid: LayoutGrid,
  lock: Lock,
  play: Play,
  reset: RotateCcw,
  search: Search,
  server: Server,
  shieldAlert: ShieldAlert,
  shieldCheck: ShieldCheck,
  sliders: SlidersHorizontal,
  sparkles: Sparkles,
  table: Table,
  workflow: Workflow,
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
