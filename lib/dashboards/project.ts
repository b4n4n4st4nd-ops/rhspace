import type { Project } from "@/lib/types/content";
import { isDashboardComponentKey } from "@/lib/dashboards/registry";

export function isDashboardProject(project: Project): boolean {
  return project.kind === "dashboard";
}

/** Draft items are hidden from portfolio grids but reachable by direct URL. */
export function isPublishedProject(project: Project): boolean {
  return project.status === "published";
}

function hasBuiltDashboard(project: Project): boolean {
  const componentKey = project.componentKey ?? project.slug;
  return isDashboardComponentKey(componentKey);
}

/** Portfolio grid — only published entries with a built visual when applicable. */
export function isVisibleInPortfolioGrid(project: Project): boolean {
  if (!isPublishedProject(project)) return false;
  if (isDashboardProject(project)) return hasBuiltDashboard(project);
  return true;
}
