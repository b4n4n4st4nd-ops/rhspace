/**
 * Dashboard design direction — reusable tokens for the portfolio dashboard system.
 * Bump designVersion in portfolio JSON to apply a new shell across dashboards.
 */

export const designVersions = ["report-card-v1", "report-card-v2"] as const;
export type DesignVersion = (typeof designVersions)[number];

export interface DashboardDesignTokens {
  /** Page wrapper — light executive canvas */
  shell: string;
  /** Black/charcoal report header */
  header: string;
  headerMuted: string;
  headerSubtle: string;
  /** Main content area */
  main: string;
  /** Thin gray panel borders */
  panel: string;
  panelHeader: string;
  /** Compact KPI tile */
  kpiTile: string;
  kpiLabel: string;
  kpiValue: string;
  /** Orange/blue accent logic (positive vs negative) */
  accentPositive: string;
  accentNegative: string;
  accentNeutral: string;
  /** Dense executive reporting typography */
  label: string;
  sectionTitle: string;
}

const reportCardV1: DashboardDesignTokens = {
  shell: "bg-[#f3f3f1] text-[#1a1a1a]",
  header: "border-b border-[#2a2a2a] bg-[#141414] text-[#f5f5f5]",
  headerMuted: "text-[#a8a8a8]",
  headerSubtle: "text-[#8f8f8f]",
  main: "mx-auto max-w-6xl px-6 py-4",
  panel: "border border-[#d6d6d4] bg-white",
  panelHeader: "border-b border-[#e4e4e2] bg-[#fafaf9] px-3 py-2",
  kpiTile: "border border-[#d6d6d4] bg-white px-3 py-2",
  kpiLabel: "text-[10px] font-medium uppercase tracking-wide text-[#6b6b6b]",
  kpiValue: "text-lg font-semibold tabular-nums text-[#1a1a1a]",
  accentPositive: "text-[#2b6cb0]",
  accentNegative: "text-[#e87722]",
  accentNeutral: "text-[#6b6b6b]",
  label: "text-[10px] uppercase tracking-wide",
  sectionTitle: "text-[11px] font-semibold uppercase tracking-wide text-[#4a4a4a]",
};

/** Placeholder — mirrors v1 until a V2 redesign is applied site-wide. */
const reportCardV2: DashboardDesignTokens = { ...reportCardV1 };

export const dashboardDesign: Record<DesignVersion, DashboardDesignTokens> = {
  "report-card-v1": reportCardV1,
  "report-card-v2": reportCardV2,
};

export function getDashboardDesign(
  version: DesignVersion = "report-card-v1"
): DashboardDesignTokens {
  return dashboardDesign[version];
}
