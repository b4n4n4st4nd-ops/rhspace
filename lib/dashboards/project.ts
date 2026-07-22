import type { PrimaryPractice, Project } from "@/lib/types/content";
import { isDashboardComponentKey } from "@/lib/dashboards/registry";

export const PRACTICE_SECTIONS: {
  id: PrimaryPractice;
  title: string;
  description: string;
}[] = [
  {
    id: "ai-product-development",
    title: "AI Product Development & Implementation",
    description:
      "LLM workflows, agentic tools, NLP interfaces, and AI-assisted analytics products built with established models and platforms.",
  },
  {
    id: "bi-reporting-visualization",
    title: "BI Reporting & Visualization",
    description:
      "Executive reporting, dashboard UX, metric design, and decision-support interfaces that turn complex systems into usable information.",
  },
  {
    id: "solution-architecture",
    title: "Solution Architecture & Strategy",
    description:
      "End-to-end system design connecting people, platforms, workflows, governance, and interfaces around a business problem.",
  },
  {
    id: "web-app-development",
    title: "Web & App Development",
    description:
      "Customer-facing websites and applications — product definition, UX, front-end engineering, and deployment.",
  },
];

export function isDashboardProject(project: Project): boolean {
  return project.kind === "dashboard";
}

export function isPublishedProject(project: Project): boolean {
  return project.status === "published";
}

function hasBuiltDashboard(project: Project): boolean {
  const componentKey = project.componentKey ?? project.slug;
  return isDashboardComponentKey(componentKey);
}

/** Portfolio grid — published entries; dashboards also require a registered component. */
export function isVisibleInPortfolioGrid(project: Project): boolean {
  if (!isPublishedProject(project)) return false;
  if (isDashboardProject(project)) return hasBuiltDashboard(project);
  return true;
}

export function groupProjectsByPractice(
  projects: Project[]
): Record<PrimaryPractice, Project[]> {
  const grouped: Record<PrimaryPractice, Project[]> = {
    "ai-product-development": [],
    "bi-reporting-visualization": [],
    "solution-architecture": [],
    "web-app-development": [],
  };

  for (const project of projects) {
    grouped[project.primaryPractice].push(project);
  }

  return grouped;
}
