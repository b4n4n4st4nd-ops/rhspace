import type { Project } from "@/lib/types/content";

export function isDashboardProject(project: Project): boolean {
  return project.kind === "dashboard";
}

/** Draft items are hidden from portfolio grids but reachable by direct URL. */
export function isPublishedProject(project: Project): boolean {
  return project.status === "published";
}

/** Portfolio grid — only published entries. */
export function isVisibleInPortfolioGrid(project: Project): boolean {
  return isPublishedProject(project);
}
