import type { CampaignRow, DashboardKpis } from "@/lib/dashboards/types";
import {
  computeBrandComparison,
  computeMinMidMax,
  computeMonthlyTrends,
  computeScatterPoints,
  computeTypeMix,
} from "@/lib/dashboards/marketing-utils";
import { BarLineChart } from "@/components/dashboards/charts/BarLineChart";
import { DivergingBarChart } from "@/components/dashboards/charts/DivergingBarChart";
import { MinMidMaxBand } from "@/components/dashboards/charts/MinMidMaxBand";
import { ScatterPlot } from "@/components/dashboards/charts/ScatterPlot";
import { StackedBarChart } from "@/components/dashboards/charts/StackedBarChart";
import { ChartPanel } from "@/components/dashboards/shell/ChartPanel";
import { InsightPanel } from "@/components/dashboards/shell/InsightPanel";
import { GoalProgress } from "@/components/dashboards/metrics/GoalProgress";

interface OverviewTabProps {
  rows: CampaignRow[];
  kpis: DashboardKpis;
  insight: string;
}

export function OverviewTab({ rows, kpis, insight }: OverviewTabProps) {
  const typeMix = computeTypeMix(rows);
  const trends = computeMonthlyTrends(rows);
  const scatter = computeScatterPoints(rows);
  const engagementRates = rows.map((row) =>
    row.impressions > 0 ? row.engagements / row.impressions : 0
  );
  const benchmark = computeMinMidMax(engagementRates);
  const impressionGoal = rows.reduce((sum, row) => sum + row.impressionGoal, 0);
  const engagementGoal = rows.reduce((sum, row) => sum + row.engagementGoal, 0);

  return (
    <div className="space-y-3 border border-t-0 border-[#d6d6d4] bg-white p-3">
      <div className="grid gap-3 lg:grid-cols-2">
        <GoalProgress
          label="Impressions to goal"
          current={kpis.impressions}
          goal={impressionGoal}
        />
        <GoalProgress
          label="Engagements to goal"
          current={kpis.engagements}
          goal={engagementGoal}
        />
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <ChartPanel title="Campaign type mix" subtitle="Share of impressions by activation type">
          <StackedBarChart segments={typeMix} />
        </ChartPanel>
        <ChartPanel
          title="Engagement rate benchmark"
          subtitle="Min / mid / max across filtered campaigns"
        >
          <MinMidMaxBand
            label="Engagement rate"
            min={benchmark.min}
            mid={benchmark.mid}
            max={benchmark.max}
            current={benchmark.current}
          />
        </ChartPanel>
      </div>

      <div className="grid gap-3 lg:grid-cols-3">
        <ChartPanel
          title="Impressions & engagement rate"
          subtitle="Monthly volume with rate overlay"
          className="lg:col-span-2"
        >
          <BarLineChart data={trends} />
        </ChartPanel>
        <ChartPanel title="Campaign scatterplot" subtitle="Reach vs engagement efficiency">
          <ScatterPlot points={scatter} />
        </ChartPanel>
      </div>

      <InsightPanel body={insight} />

      <ChartPanel title="Performance vs portfolio average" subtitle="Diverging view by brand">
        <DivergingBarChart
          rows={rows.length > 0 ? computeBrandComparison(rows, "engagementRate") : []}
        />
      </ChartPanel>
    </div>
  );
}
