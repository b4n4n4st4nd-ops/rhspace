import type { ResumeExperience } from "@/lib/types/content";

interface TimelineProps {
  experience: ResumeExperience[];
}

export function Timeline({ experience }: TimelineProps) {
  return (
    <ol className="relative border-l border-border pl-6">
      {experience.map((job) => (
        <li key={`${job.company}-${job.start}`} className="mb-10 last:mb-0">
          <span
            className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border-2 border-accent bg-background"
            aria-hidden
          />
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <div>
              <h3 className="font-semibold">{job.role}</h3>
              <p className="text-accent">{job.company}</p>
            </div>
            <p className="font-mono text-xs text-muted">
              {job.start} — {job.end}
              {job.location && ` · ${job.location}`}
            </p>
          </div>
          <ul className="mt-3 list-disc space-y-1 pl-4 text-sm text-muted">
            {job.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
