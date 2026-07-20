import { SectionHeader } from "@/components/section-header";
import { ProjectCard } from "@/components/projects/project-card";
import { StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import type { Project } from "@/lib/content";

export function FeaturedProjects({ projects }: { projects: Project[] }) {
  if (!projects.length) return null;

  return (
    <section className="container-premium py-20 sm:py-28">
      <SectionHeader
        eyebrow="Building"
        title="Projects"
        description="Things I've shipped, from a full startup to weekend experiments."
        href="/projects"
        className="mb-10"
      />
      <StaggerGroup className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <StaggerItem key={project.slug}>
            <ProjectCard project={project} />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
