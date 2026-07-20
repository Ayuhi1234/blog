import { AlertTriangle, Info, Lightbulb, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const VARIANTS = {
  info: {
    icon: Info,
    className: "border-brand-blue/30 bg-brand-blue-soft text-foreground [&_svg]:text-brand-blue",
  },
  tip: {
    icon: Lightbulb,
    className: "border-brand-emerald/30 bg-brand-emerald-soft text-foreground [&_svg]:text-brand-emerald",
  },
  warning: {
    icon: AlertTriangle,
    className: "border-amber-500/30 bg-amber-500/10 text-foreground [&_svg]:text-amber-500",
  },
  quote: {
    icon: Quote,
    className: "border-brand-purple/30 bg-brand-purple-soft text-foreground [&_svg]:text-brand-purple",
  },
} as const;

export function Callout({
  type = "info",
  title,
  children,
}: {
  type?: keyof typeof VARIANTS;
  title?: string;
  children: ReactNode;
}) {
  const variant = VARIANTS[type];
  const Icon = variant.icon;
  return (
    <div className={cn("not-prose flex gap-3 rounded-2xl border p-4 sm:p-5", variant.className)}>
      <Icon className="mt-0.5 size-5 shrink-0" />
      <div className="text-[15px] leading-relaxed [&>p]:m-0 [&>p+p]:mt-2">
        {title && <p className="mb-1 font-semibold">{title}</p>}
        {children}
      </div>
    </div>
  );
}
