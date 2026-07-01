import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/types/content";
import { Badge } from "@/components/ui/Badge";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-all hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-border/30">
        <Image
          src={project.thumbnail}
          alt=""
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap gap-2">
          <Badge>{project.category}</Badge>
          {project.tools.slice(0, 3).map((tool) => (
            <Badge key={tool}>{tool}</Badge>
          ))}
        </div>
        <h3 className="text-lg font-semibold group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-muted leading-relaxed">{project.summary}</p>
      </div>
    </Link>
  );
}
