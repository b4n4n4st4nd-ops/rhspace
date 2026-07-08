import type { Project } from "@/lib/types/content";

export function isDashboardProject(project: Project): boolean {
  return project.kind === "dashboard";
}

/** Draft dashboards are hidden from portfolio grids but reachable by direct URL. */
export function isPublishedDashboard(project: Project): boolean {
  if (!isDashboardProject(project)) return true;
  return project.status !== "draft";
}

/** Case studies always show; dashboards respect draft/published. */
export function isVisibleInPortfolioGrid(project: Project): boolean {
  return isPublishedDashboard(project);
}
