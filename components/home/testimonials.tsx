import { SectionHeader } from "@/components/section-header";
import { StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { Quote } from "lucide-react";

/** Placeholder testimonials — replace with real reader feedback once you have it. */
const testimonials = [
  {
    quote:
      "The post on shortening the feedback loop between shipping and learning changed how I plan my own side projects.",
    name: "A. K.",
    role: "Reader, Software Engineering",
  },
  {
    quote:
      "Refreshing to read startup content that includes the boring runway math instead of just the highlight reel.",
    name: "S. P.",
    role: "Reader, Startup Journey",
  },
  {
    quote:
      "The book summaries are better than most full reviews I've read elsewhere — concise without losing the substance.",
    name: "J. C.",
    role: "Reader, Book Summaries",
  },
];

export function Testimonials() {
  return (
    <section className="container-premium py-20 sm:py-28">
      <SectionHeader
        eyebrow="Reader Feedback"
        title="What people are saying"
        className="mb-10"
      />
      <StaggerGroup className="grid gap-5 sm:grid-cols-3">
        {testimonials.map((t) => (
          <StaggerItem key={t.name}>
            <figure className="card-hover flex h-full flex-col rounded-2xl border border-border bg-card p-6">
              <Quote className="size-5 text-brand-purple/60" />
              <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-foreground/85">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4 text-sm">
                <span className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-blue via-brand-purple to-brand-emerald text-xs font-semibold text-white">
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </span>
                <div>
                  <div className="font-medium text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
