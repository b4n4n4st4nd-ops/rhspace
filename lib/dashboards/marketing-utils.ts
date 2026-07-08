import type {
  BrandId,
  CampaignRow,
  CampaignType,
  CityMeta,
  DashboardKpis,
  DivergingRow,
  MarketingPerformanceData,
  MonthlyTrendPoint,
  RankedMarket,
  ScatterPoint,
  TypeMixSegment,
} from "@/lib/dashboards/types";

export interface DashboardFilters {
  dateRange: string;
  city: string;
  brand: string;
  campaignType: string;
}

export const DATE_RANGE_OPTIONS = [
  { value: "rolling-12m", label: "Rolling 12M" },
  { value: "ytd-2026", label: "YTD 2026" },
  { value: "h2-2025", label: "H2 2025" },
  { value: "all", label: "All periods" },
] as const;

export const BRAND_OPTIONS = [
  { value: "all", label: "All brands" },
  { value: "brand-a", label: "Brand A" },
  { value: "brand-b", label: "Brand B" },
  { value: "brand-c", label: "Brand C" },
  { value: "brand-d", label: "Brand D" },
] as const;

export const CAMPAIGN_TYPE_OPTIONS = [
  { value: "all", label: "All types" },
  { value: "event", label: "Event" },
  { value: "sponsorship", label: "Sponsorship" },
  { value: "activation", label: "Activation" },
  { value: "digital", label: "Digital" },
  { value: "retail", label: "Retail" },
] as const;

export const BRAND_LABELS: Record<BrandId, string> = {
  "brand-a": "Brand A",
  "brand-b": "Brand B",
  "brand-c": "Brand C",
  "brand-d": "Brand D",
};

export const TYPE_LABELS: Record<CampaignType, string> = {
  event: "Event",
  sponsorship: "Sponsorship",
  activation: "Activation",
  digital: "Digital",
  retail: "Retail",
};

const TYPE_COLORS: Record<CampaignType, string> = {
  event: "#2b6cb0",
  sponsorship: "#4a5568",
  activation: "#e87722",
  digital: "#3182ce",
  retail: "#718096",
};

export function getTypeColor(type: CampaignType): string {
  return TYPE_COLORS[type];
}

function monthInRange(month: string, dateRange: string): boolean {
  if (dateRange === "all") return true;
  if (dateRange === "rolling-12m") {
    return month >= "2025-03" && month <= "2026-02";
  }
  if (dateRange === "ytd-2026") {
    return month.startsWith("2026-");
  }
  if (dateRange === "h2-2025") {
    return month >= "2025-07" && month <= "2025-12";
  }
  return true;
}

export function filterCampaigns(
  campaigns: CampaignRow[],
  filters: DashboardFilters
): CampaignRow[] {
  return campaigns.filter((row) => {
    if (!monthInRange(row.month, filters.dateRange)) return false;
    if (filters.city !== "all" && row.city !== filters.city) return false;
    if (filters.brand !== "all" && row.brand !== filters.brand) return false;
    if (
      filters.campaignType !== "all" &&
      row.campaignType !== filters.campaignType
    ) {
      return false;
    }
    return true;
  });
}

export function computeKpis(rows: CampaignRow[]): DashboardKpis {
  if (rows.length === 0) {
    return {
      events: 0,
      impressions: 0,
      interactions: 0,
      engagements: 0,
      engagementRate: 0,
      impressionsToGoal: 0,
      engagementsToGoal: 0,
      goalAttainment: 0,
    };
  }

  const events = rows.reduce((sum, row) => sum + row.events, 0);
  const impressions = rows.reduce((sum, row) => sum + row.impressions, 0);
  const interactions = rows.reduce((sum, row) => sum + row.interactions, 0);
  const engagements = rows.reduce((sum, row) => sum + row.engagements, 0);
  const impressionGoal = rows.reduce((sum, row) => sum + row.impressionGoal, 0);
  const engagementGoal = rows.reduce((sum, row) => sum + row.engagementGoal, 0);
  const engagementRate = impressions > 0 ? engagements / impressions : 0;
  const impressionsToGoal = impressionGoal > 0 ? impressions / impressionGoal : 0;
  const engagementsToGoal = engagementGoal > 0 ? engagements / engagementGoal : 0;
  const goalAttainment = (impressionsToGoal + engagementsToGoal) / 2;

  return {
    events,
    impressions,
    interactions,
    engagements,
    engagementRate,
    impressionsToGoal,
    engagementsToGoal,
    goalAttainment,
  };
}

export function formatCompact(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(0)}K`;
  return value.toLocaleString("en-US");
}

export function formatPercent(value: number, digits = 1): string {
  return `${(value * 100).toFixed(digits)}%`;
}

export function computeMonthlyTrends(rows: CampaignRow[]): MonthlyTrendPoint[] {
  const byMonth = new Map<string, { impressions: number; engagements: number }>();

  for (const row of rows) {
    const current = byMonth.get(row.month) ?? { impressions: 0, engagements: 0 };
    current.impressions += row.impressions;
    current.engagements += row.engagements;
    byMonth.set(row.month, current);
  }

  return Array.from(byMonth.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, totals]) => {
      const [year, mon] = month.split("-");
      const label = new Date(Number(year), Number(mon) - 1).toLocaleString(
        "en-US",
        { month: "short" }
      );
      return {
        month,
        label,
        impressions: totals.impressions,
        engagementRate:
          totals.impressions > 0 ? totals.engagements / totals.impressions : 0,
      };
    });
}

export function computeTypeMix(rows: CampaignRow[]): TypeMixSegment[] {
  const totals = new Map<CampaignType, number>();

  for (const row of rows) {
    totals.set(row.campaignType, (totals.get(row.campaignType) ?? 0) + row.impressions);
  }

  return Array.from(totals.entries())
    .map(([type, value]) => ({
      type,
      label: TYPE_LABELS[type],
      value,
    }))
    .sort((a, b) => b.value - a.value);
}

export function computeMarketRankings(
  rows: CampaignRow[],
  cities: CityMeta[],
  metric: "impressions" | "engagementRate"
): RankedMarket[] {
  const cityLabels = new Map(cities.map((city) => [city.id, city.label]));
  const byCity = new Map<string, { impressions: number; engagements: number }>();

  for (const row of rows) {
    const current = byCity.get(row.city) ?? { impressions: 0, engagements: 0 };
    current.impressions += row.impressions;
    current.engagements += row.engagements;
    byCity.set(row.city, current);
  }

  const ranked = Array.from(byCity.entries()).map(([cityId, totals]) => ({
    cityId,
    label: cityLabels.get(cityId) ?? cityId,
    impressions: totals.impressions,
    engagementRate:
      totals.impressions > 0 ? totals.engagements / totals.impressions : 0,
  }));

  if (metric === "impressions") {
    return ranked.sort((a, b) => b.impressions - a.impressions);
  }
  return ranked.sort((a, b) => b.engagementRate - a.engagementRate);
}

export function computeScatterPoints(rows: CampaignRow[]): ScatterPoint[] {
  return rows.map((row) => ({
    id: row.id,
    label: row.name,
    x: row.impressions / 1_000_000,
    y: row.impressions > 0 ? row.engagements / row.impressions : 0,
    size: row.engagements,
  }));
}

export function computeBrandComparison(
  rows: CampaignRow[],
  metric: "engagementRate" | "impressions"
): DivergingRow[] {
  const byBrand = new Map<BrandId, { impressions: number; engagements: number }>();

  for (const row of rows) {
    const current = byBrand.get(row.brand) ?? { impressions: 0, engagements: 0 };
    current.impressions += row.impressions;
    current.engagements += row.engagements;
    byBrand.set(row.brand, current);
  }

  const averages =
    rows.length > 0
      ? computeKpis(rows)
      : { impressions: 0, engagementRate: 0 };

  const rowsOut: DivergingRow[] = Array.from(byBrand.entries()).map(
    ([brand, totals]) => {
      const rate =
        totals.impressions > 0 ? totals.engagements / totals.impressions : 0;
      const value =
        metric === "impressions"
          ? ((totals.impressions - averages.impressions / 4) /
              (averages.impressions / 4 || 1)) *
            100
          : ((rate - averages.engagementRate) / (averages.engagementRate || 0.01)) *
            100;

      return {
        id: brand,
        label: BRAND_LABELS[brand],
        value,
        maxAbs: 0,
      };
    }
  );

  const maxAbs = Math.max(...rowsOut.map((row) => Math.abs(row.value)), 1);
  return rowsOut
    .map((row) => ({ ...row, maxAbs }))
    .sort((a, b) => b.value - a.value);
}

export function buildCityOptions(cities: CityMeta[]) {
  return [
    { value: "all", label: "All markets" },
    ...cities.map((city) => ({ value: city.id, label: city.label })),
  ];
}

export function getCityLabel(cities: CityMeta[], cityId: string): string {
  return cities.find((city) => city.id === cityId)?.label ?? cityId;
}

export function buildInsightSummary(
  kpis: DashboardKpis,
  rows: CampaignRow[],
  filters: DashboardFilters,
  data: MarketingPerformanceData
): string {
  if (rows.length === 0) {
    return "No campaigns match the current filter selection. Adjust date, market, brand, or campaign type to repopulate the report.";
  }

  const topMarket = computeMarketRankings(rows, data.cities, "impressions")[0];
  const topType = computeTypeMix(rows)[0];
  const attainment = formatPercent(kpis.goalAttainment);

  const marketLabel =
    filters.city === "all"
      ? topMarket?.label ?? "selected markets"
      : data.cities.find((city) => city.id === filters.city)?.label ??
        "selected market";

  return `${data.meta.company} recorded ${formatCompact(kpis.impressions)} impressions and ${formatCompact(kpis.engagements)} engagements across ${rows.length} activations. ${marketLabel} leads impression volume; ${topType?.label ?? "mixed"} campaigns contribute the largest share of reach. Composite goal attainment is ${attainment}.`;
}

export function computeMinMidMax(
  values: number[]
): { min: number; mid: number; max: number; current: number } {
  if (values.length === 0) {
    return { min: 0, mid: 0, max: 0, current: 0 };
  }
  const sorted = [...values].sort((a, b) => a - b);
  const min = sorted[0];
  const max = sorted[sorted.length - 1];
  const mid = sorted[Math.floor(sorted.length / 2)];
  const current = values.reduce((sum, value) => sum + value, 0) / values.length;
  return { min, mid, max, current };
}
