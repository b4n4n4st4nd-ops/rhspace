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
      ) : (
        <div className="flex aspect-[16/10] items-center justify-center border-b border-border bg-background/50">
          <p className="px-6 text-center font-mono text-xs text-muted">
            Image coming soon — add to{" "}
            <code className="text-foreground">public/images/art/</code>
          </p>
        </div>
      )}
      <div className="p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-xl font-semibold">{project.title}</h3>
          {project.tag && <Badge>{project.tag}</Badge>}
        </div>
        {highlightPhrase && (
          <p className="mt-4 font-mono text-sm text-accent">{highlightPhrase}</p>
        )}
        <p className="mt-4 text-muted leading-relaxed">{project.body}</p>
        <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${project.title} tags`}>
          {project.tags.map((tag) => (
            <li key={tag}>
              <Badge>{tag}</Badge>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
