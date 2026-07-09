import Image from "next/image";
import type { ArtProjectCard } from "@/lib/types/content";
import { Badge } from "@/components/ui/Badge";

interface ArtProjectCardProps {
  project: ArtProjectCard;
  highlightPhrase?: string;
}

export function ArtProjectCardDisplay({
  project,
  highlightPhrase,
}: ArtProjectCardProps) {
  return (
    <article className="overflow-hidden rounded-xl border border-border bg-surface">
      {project.image ? (
        <div className="relative aspect-[16/10] border-b border-border">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      ) : null}
      <div className="p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-xl font-semibold">{project.title}</h3>
          {project.tag && <Badge>{project.tag}</Badge>}
        </div>
        {highlightPhrase && (
          <p className="mt-4 font-mono text-sm text-accent">{highlightPhrase}</p>
        )}
        {project.body ? (
          <p className="mt-4 text-muted leading-relaxed">{project.body}</p>
        ) : null}
        {project.tags.length > 0 ? (
          <ul
            className="mt-6 flex flex-wrap gap-2"
            aria-label={`${project.title} tags`}
          >
          {project.tags.map((tag) => (
            <li key={tag}>
              <Badge>{tag}</Badge>
            </li>
          ))}
        </ul>
        ) : null}
      </div>
    </article>
  );
}
