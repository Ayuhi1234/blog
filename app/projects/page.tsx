import type { Metadata } from "next";
import { ProjectCard } from "@/components/projects/project-card";
import { getAllProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things I've built — from a full startup to weekend experiments.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="container-premium py-16 sm:py-20">
      <div className="mb-12 max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Projects</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          A mix of the startup I&apos;m building full-time and the smaller things I
          build to stay sharp.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} id={project.slug} />
        ))}
      </div>
    </div>
  );
}
