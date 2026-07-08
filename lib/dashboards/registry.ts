import type { ComponentType } from "react";
import type { DashboardData } from "@/lib/dashboards/types";
import { DecisionSupportDashboard } from "@/components/dashboards/demos/decision-support-framework/DecisionSupportDashboard";
import { MarketingPerformanceDashboard } from "@/components/dashboards/demos/marketing-performance-dashboard/MarketingPerformanceDashboard";

export type DashboardComponent = ComponentType<{ data: DashboardData }>;

/** Add one entry per dashboard component. Key must match portfolio JSON componentKey. */
const registry = {
  "marketing-performance-dashboard":
    MarketingPerformanceDashboard as DashboardComponent,
  "decision-support-framework":
    DecisionSupportDashboard as DashboardComponent,
} satisfies Record<string, DashboardComponent>;

export type DashboardComponentKey = keyof typeof registry;

export interface DashboardEntry {
  componentKey: DashboardComponentKey;
  component: DashboardComponent;
}

export function getDashboardEntry(
  componentKey: string
): DashboardEntry | undefined {
  if (!(componentKey in registry)) return undefined;
  const key = componentKey as DashboardComponentKey;
  return {
    componentKey: key,
    component: registry[key] as DashboardComponent,
  };
}

export function isDashboardComponentKey(
  componentKey: string
): componentKey is DashboardComponentKey {
  return componentKey in registry;
}
