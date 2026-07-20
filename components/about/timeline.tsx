import { Reveal } from "@/components/motion/reveal";

const milestones = [
  {
    year: "2021",
    title: "Started as a Software Engineer",
    description: "First engineering role out of school — mostly backend, mostly learning in the deep end.",
  },
  {
    year: "2024",
    title: "Started writing publicly",
    description: "Began keeping notes on what I was learning. Most of it never left a private notebook.",
  },
  {
    year: "2025",
    title: "Started validating 0waste",
    description: "Ran the idea as a spreadsheet and a WhatsApp group for three months before writing any code.",
  },
  {
    year: "2026",
    title: "Went full-time on 0waste",
    description: "Left the day job to build the sustainable packaging marketplace full-time.",
  },
  {
    year: "2026",
    title: "Rebuilt this site (again)",
    description: "Third rewrite. This time it's just files — no CMS, no database.",
  },
];

export function Timeline() {
  return (
    <div className="relative space-y-10 border-l border-border pl-8">
      {milestones.map((m, i) => (
        <Reveal key={m.title} delay={i * 0.05}>
          <div className="relative">
            <span className="absolute -left-[2.28rem] top-1 flex size-4 items-center justify-center rounded-full border-2 border-background bg-gradient-to-br from-brand-blue via-brand-purple to-brand-emerald" />
            <p className="text-sm font-semibold text-brand-purple">{m.year}</p>
            <h3 className="mt-1 text-lg font-semibold tracking-tight">{m.title}</h3>
            <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">
              {m.description}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
