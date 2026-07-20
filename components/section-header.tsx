import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function SectionHeader({
  eyebrow,
  title,
  description,
  href,
  linkLabel = "View all",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
  className?: string;
}) {
  return (
    <Reveal>
      <div className={cn("flex flex-wrap items-end justify-between gap-4", className)}>
        <div className="max-w-xl">
          {eyebrow && (
            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-brand-purple">
              {eyebrow}
            </p>
          )}
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
          {description && (
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">{description}</p>
          )}
        </div>
        {href && (
          <Link
            href={href}
            className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-foreground"
          >
            {linkLabel}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        )}
      </div>
    </Reveal>
  );
}
