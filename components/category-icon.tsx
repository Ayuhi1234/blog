import {
  Code2,
  Sparkles,
  BookOpen,
  Zap,
  Lightbulb,
  Rocket,
  TrendingUp,
  Plane,
  NotebookPen,
  Shuffle,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Code2,
  Sparkles,
  BookOpen,
  Zap,
  Lightbulb,
  Rocket,
  TrendingUp,
  Plane,
  NotebookPen,
  Shuffle,
};

export function CategoryIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICON_MAP[name] ?? Sparkles;
  return <Icon className={className} />;
}
