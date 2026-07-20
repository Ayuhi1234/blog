import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons/social-icons";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/content";

const STATUS_LABEL: Record<Project["status"], string> = {
  live: "Live",
  "in-progress": "In Progress",
  archived: "Archived",
};

const STATUS_CLASS: Record<Project["status"], string> = {
  live: "bg-brand-emerald-soft text-brand-emerald border-brand-emerald/30",
  "in-progress": "bg-amber-500/10 text-amber-500 border-amber-500/30",
  archived: "bg-muted text-muted-foreground border-border",
};

export function ProjectCard({ project, id }: { project: Project; id?: string }) {
  return (
    <article
      id={id}
      className="card-hover group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card scroll-mt-24"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <span
          className={cn(
            "absolute left-4 top-4 rounded-full border px-2.5 py-1 text-xs font-medium backdrop-blur-sm",
            STATUS_CLASS[project.status]
          )}
        >
          {STATUS_LABEL[project.status]}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold tracking-tight">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        {project.features.length > 0 && (
          <ul className="mt-4 space-y-1.5">
            {project.features.slice(0, 3).map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-2 size-1 shrink-0 rounded-full bg-brand-emerald" />
                {feature}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.map((tech) => (
            <Badge key={tech} variant="secondary" className="rounded-full font-normal">
              {tech}
            </Badge>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <GithubIcon className="size-4" />
              Code
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Live Demo
              <ArrowUpRight className="size-3.5" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
