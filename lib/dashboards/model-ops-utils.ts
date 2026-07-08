import type {
  ModelImprovement,
  ModelIntervention,
  ModelOperationsKpi,
  ModelOperationsTrendPoint,
  ModelOutlier,
  PredictiveModelPerformanceImpactData,
} from "@/lib/dashboards/types";

export function formatKpiValue(kpi: ModelOperationsKpi): string {
  switch (kpi.format) {
    case "percent":
      return `${kpi.value}%`;
    case "currency":
      return formatCurrency(kpi.value);
    case "count":
      return formatCompact(kpi.value);
    default:
      return String(kpi.value);
  }
}

export function formatCompact(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return value.toLocaleString();
}

export function formatCurrency(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value.toLocaleString()}`;
}

export function formatDelta(kpi: ModelOperationsKpi): string {
  const sign = kpi.delta > 0 ? "+" : "";
  if (kpi.format === "percent") return `${sign}${kpi.delta}pp`;
  if (kpi.format === "currency") return `${sign}${formatCurrency(kpi.delta)}`;
  return `${sign}${kpi.delta}%`;
}

export function deltaDirection(
  kpi: ModelOperationsKpi
): "up" | "down" | "neutral" {
  if (kpi.delta === 0) return "neutral";
  const positive = kpi.delta > 0;
  const good = kpi.higherIsBetter ? positive : !positive;
  return good ? "up" : "down";
}

export function getOutlierById(
  data: PredictiveModelPerformanceImpactData,
  id: string
): ModelOutlier | undefined {
  return data.outliers.find((o) => o.id === id);
}

export function getInterventionForOutlier(
  data: PredictiveModelPerformanceImpactData,
  outlier: ModelOutlier
): ModelIntervention | undefined {
  return data.interventions.find((i) => i.id === outlier.interventionId);
}

export function getImprovementForIntervention(
  data: PredictiveModelPerformanceImpactData,
  intervention: ModelIntervention
): ModelImprovement | undefined {
  return data.improvements.find((i) => i.interventionId === intervention.id);
}

export function segmentLabel(outlier: ModelOutlier): string {
  return `${outlier.periodLabel} · ${outlier.market} · ${outlier.product}`;
}

export interface TrendChartLayout {
  width: number;
  height: number;
  padding: { top: number; right: number; bottom: number; left: number };
}

export function trendToSvgPoint(
  index: number,
  value: number,
  total: number,
  layout: TrendChartLayout,
  yMin = 50,
  yMax = 100
): { x: number; y: number } {
  const { width, height, padding } = layout;
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;
  const x = padding.left + (index / Math.max(total - 1, 1)) * chartW;
  const y =
    padding.top + chartH - ((value - yMin) / (yMax - yMin)) * chartH;
  return { x, y };
}

export function buildLinePath(
  points: ModelOperationsTrendPoint[],
  accessor: (p: ModelOperationsTrendPoint) => number,
  layout: TrendChartLayout
): string {
  return points
    .map((p, i) => {
      const { x, y } = trendToSvgPoint(
        i,
        accessor(p),
        points.length,
        layout
      );
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
}

export function buildBandPath(
  points: ModelOperationsTrendPoint[],
  layout: TrendChartLayout
): string {
  const top = points
    .map((p, i) => {
      const { x, y } = trendToSvgPoint(
        i,
        p.expectedMax,
        points.length,
        layout
      );
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");

  const bottom = [...points]
    .reverse()
    .map((p, i) => {
      const origIndex = points.length - 1 - i;
      const { x, y } = trendToSvgPoint(
        origIndex,
        p.expectedMin,
        points.length,
        layout
      );
      return `L ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");

  return `${top} ${bottom} Z`;
}

export function findPostInterventionStartIndex(
  points: ModelOperationsTrendPoint[]
): number {
  return points.findIndex((p) => p.isPostIntervention);
}
