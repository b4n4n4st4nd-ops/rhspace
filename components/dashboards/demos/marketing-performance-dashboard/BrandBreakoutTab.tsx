import type { BrandId, CampaignRow, CityMeta } from "@/lib/dashboards/types";
import {
  BRAND_LABELS,
  TYPE_LABELS,
  computeBrandComparison,
  computeKpis,
  formatCompact,
  formatPercent,
  getCityLabel,
} from "@/lib/dashboards/marketing-utils";
import { DivergingBarChart } from "@/components/dashboards/charts/DivergingBarChart";
import { ScatterPlot } from "@/components/dashboards/charts/ScatterPlot";
import { ChartPanel } from "@/components/dashboards/shell/ChartPanel";
import { KpiCard } from "@/components/dashboards/metrics/KpiCard";
import { DataTable } from "@/components/dashboards/tables/DataTable";

interface BrandBreakoutTabProps {
  rows: CampaignRow[];
  cities: CityMeta[];
}

const BRANDS: BrandId[] = ["brand-a", "brand-b", "brand-c", "brand-d"];

export function BrandBreakoutTab({ rows, cities }: BrandBreakoutTabProps) {
  const brandTiles = BRANDS.map((brand) => {
    const brandRows = rows.filter((row) => row.brand === brand);
    const kpis = computeKpis(brandRows);
    return { brand, kpis, count: brandRows.length };
  });

  const scatter = rows.map((row) => ({
    id: row.id,
    label: row.name,
    x: row.impressions / 1_000_000,
    y: row.impressions > 0 ? row.engagements / row.impressions : 0,
    size: row.engagements,
  }));

  return (
    <div className="space-y-3 border border-t-0 border-[#d6d6d4] bg-white p-3">
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {brandTiles.map(({ brand, kpis, count }) => (
          <KpiCard
            key={brand}
            label={BRAND_LABELS[brand]}
            value={formatCompact(kpis.impressions)}
            subtitle={`${count} campaigns · ${formatPercent(kpis.engagementRate, 2)} rate`}
            trend={`${formatPercent(kpis.goalAttainment, 0)} goal attainment`}
            trendDirection={
              kpis.goalAttainment >= 1 ? "up" : kpis.goalAttainment >= 0.85 ? "neutral" : "down"
            }
          />
        ))}
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <ChartPanel title="Brand comparison" subtitle="Engagement rate vs portfolio average">
          <DivergingBarChart rows={computeBrandComparison(rows, "engagementRate")} />
        </ChartPanel>
        <ChartPanel title="Brand reach scatterplot" subtitle="Campaign-level performance">
          <ScatterPlot points={scatter} />
        </ChartPanel>
      </div>

      <ChartPanel title="Campaign detail" subtitle="Granular activation table">
        <DataTable
          rows={rows}
          columns={[
            { key: "name", label: "Campaign" },
            {
              key: "brand",
              label: "Brand",
              format: (value) => BRAND_LABELS[value as BrandId],
            },
            {
              key: "campaignType",
              label: "Type",
              format: (value) => TYPE_LABELS[value as keyof typeof TYPE_LABELS],
            },
            { key: "city", label: "Market", format: (value) => getCityLabel(cities, value as string) },
            {
              key: "impressions",
              label: "Impressions",
              align: "right",
              format: (value) => formatCompact(value as number),
            },
            {
              key: "interactions",
              label: "Interactions",
              align: "right",
              format: (value) => formatCompact(value as number),
            },
            {
              key: "engagements",
              label: "Engagements",
              align: "right",
              format: (value, row) =>
                `${formatCompact(value as number)} (${formatPercent(
                  row.impressions > 0 ? row.engagements / row.impressions : 0,
                  2
                )})`,
            },
          ]}
        />
      </ChartPanel>
    </div>
  );
}
