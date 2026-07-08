import Link from "next/link";
import {
  getDashboardDesign,
  type DesignVersion,
} from "@/lib/dashboards/design";
import type { Project } from "@/lib/types/content";

interface DashboardShellProps {
  project: Project;
  designVersion?: DesignVersion;
  disclaimer: string;
  lastRefreshed?: string;
  children: React.ReactNode;
}

export function DashboardShell({
  project,
  designVersion = "report-card-v1",
  disclaimer,
  lastRefreshed,
  children,
}: DashboardShellProps) {
  const design = getDashboardDesign(designVersion);

  return (
    <div className={design.shell}>
      <header className={design.header}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2">
          <Link
            href="/portfolio"
            className={`text-[11px] uppercase tracking-wide transition-colors hover:text-white ${design.headerMuted}`}
          >
            ← Portfolio
          </Link>
          <div
            className={`flex items-center gap-4 text-[10px] uppercase tracking-wide ${design.headerSubtle}`}
          >
            {lastRefreshed && <span>Refreshed {lastRefreshed}</span>}
            <span className="hidden sm:inline">Report view</span>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-6 pb-4 pt-1">
          <h1 className="text-lg font-semibold tracking-tight sm:text-xl">
            {project.title}
          </h1>
          <p className={`mt-1 max-w-4xl text-xs ${design.headerMuted}`}>
            {project.summary}
          </p>
          <p
            className={`mt-2 max-w-4xl text-[10px] leading-relaxed ${design.headerSubtle}`}
          >
            {disclaimer}
          </p>
        </div>
      </header>
      <main className={design.main}>{children}</main>
    </div>
  );
}
