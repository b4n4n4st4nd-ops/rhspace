"use client";

import { useMemo, useState } from "react";
import type { Project, ProjectCategory } from "@/lib/types/content";
import { ProjectCard } from "@/components/portfolio/ProjectCard";

const CATEGORIES: { value: ProjectCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "visualization", label: "Visualization" },
  { value: "analytics", label: "Analytics" },
  { value: "automation", label: "Automation" },
  { value: "ai", label: "AI" },
];

interface PortfolioGridProps {
  projects: Project[];
}

export function PortfolioGrid({ projects }: PortfolioGridProps) {
  const [category, setCategory] = useState<ProjectCategory | "all">("all");
  const [tool, setTool] = useState<string>("all");

  const allTools = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.tools.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [projects]);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (tool !== "all" && !p.tools.includes(tool)) return false;
      return true;
    });
  }, [projects, category, tool]);

  return (
    <div>
      <div
        className="mb-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center"
        role="group"
        aria-label="Filter projects"
      >
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => setCategory(c.value)}
              aria-pressed={category === c.value}
              className={`rounded-full border px-3 py-1 font-mono text-xs transition-colors ${
                category === c.value
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border text-muted hover:border-accent/40"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-sm text-muted">
          <span className="sr-only">Filter by tool</span>
          <select
            value={tool}
            onChange={(e) => setTool(e.target.value)}
            className="rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-foreground"
          >
            <option value="all">All tools</option>
            {allTools.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
      </div>
      {filtered.length === 0 ? (
        <p className="text-muted">No projects match these filters.</p>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
