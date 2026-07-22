import type { Project } from "@/lib/types/content";
import { PRACTICE_SECTIONS } from "@/lib/dashboards/project";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface PortfolioPracticeSectionsProps {
  projectsByPractice: Record<string, Project[]>;
}

export function PortfolioPracticeSections({
  projectsByPractice,
}: PortfolioPracticeSectionsProps) {
  return (
    <div className="flex flex-col gap-20">
      {PRACTICE_SECTIONS.map((section) => {
        const projects = projectsByPractice[section.id] ?? [];

        return (
          <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`}>
            <SectionHeading
              eyebrow="Practice"
              title={section.title}
              description={section.description}
            />
            {projects.length === 0 ? (
              <p className="rounded-xl border border-dashed border-border bg-surface/40 px-5 py-8 text-sm text-muted">
                Examples coming soon.
              </p>
            ) : (
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                  <li key={project.slug}>
                    <ProjectCard project={project} />
                  </li>
                ))}
              </ul>
            )}
          </section>
        );
      })}
    </div>
  );
}
