import type { CampaignRow, CityMeta, DashboardKpis } from "@/lib/dashboards/types";
import {
  computeKpis,
  computeMarketRankings,
  computeMinMidMax,
  formatCompact,
  formatPercent,
} from "@/lib/dashboards/marketing-utils";
import { DivergingBarChart } from "@/components/dashboards/charts/DivergingBarChart";
import {
  GeoMarkerPanel,
  RankedBarList,
} from "@/components/dashboards/charts/GeoMarkerPanel";
import { MinMidMaxBand } from "@/components/dashboards/charts/MinMidMaxBand";
import { ChartPanel } from "@/components/dashboards/shell/ChartPanel";

interface GeoPerformanceTabProps {
  rows: CampaignRow[];
  allRows: CampaignRow[];
  cities: CityMeta[];
  selectedCity: string;
  onSelectCity: (cityId: string) => void;
  kpis: DashboardKpis;
}

export function GeoPerformanceTab({
  rows,
  allRows,
  cities,
  selectedCity,
  onSelectCity,
  kpis,
}: GeoPerformanceTabProps) {
  const impressionRankings = computeMarketRankings(rows, cities, "impressions");
  const rateRankings = computeMarketRankings(rows, cities, "engagementRate");
  const portfolioKpis = computeKpis(allRows);
  const selectedRows =
    selectedCity === "all"
      ? rows
      : rows.filter((row) => row.city === selectedCity);
  const selectedKpis = computeKpis(selectedRows);
  const selectedLabel =
    cities.find((city) => city.id === selectedCity)?.label ?? "Portfolio";

  const rateDelta =
    portfolioKpis.engagementRate > 0
      ? ((selectedKpis.engagementRate - portfolioKpis.engagementRate) /
          portfolioKpis.engagementRate) *
        100
      : 0;
  const impressionDelta =
    portfolioKpis.impressions > 0
      ? ((selectedKpis.impressions - portfolioKpis.impressions / cities.length) /
          (portfolioKpis.impressions / cities.length || 1)) *
        100
      : 0;

  const cityRates = selectedRows.map((row) =>
    row.impressions > 0 ? row.engagements / row.impressions : 0
  );
  const benchmark = computeMinMidMax(cityRates);

  return (
    <div className="space-y-3 border border-t-0 border-[#d6d6d4] bg-white p-3">
      <div className="grid gap-3 lg:grid-cols-2">
        <ChartPanel
          title="Market map"
          subtitle="Select a market marker to focus comparison"
        >
          <GeoMarkerPanel
            cities={cities}
            rankings={impressionRankings}
            selectedCity={selectedCity}
            onSelectCity={onSelectCity}
          />
        </ChartPanel>
        <ChartPanel
          title={`${selectedLabel} vs portfolio`}
          subtitle="Selected market compared with total average"
        >
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="border border-[#e4e4e2] p-2">
                <p className="text-[10px] uppercase text-[#6b6b6b]">Impressions</p>
                <p className="mt-1 text-lg font-semibold tabular-nums">
                  {formatCompact(selectedKpis.impressions)}
                </p>
                <p
                  className={`text-[10px] ${
                    impressionDelta >= 0 ? "text-[#2b6cb0]" : "text-[#e87722]"
                  }`}
                >
                  {impressionDelta >= 0 ? "+" : ""}
                  {impressionDelta.toFixed(0)}% vs avg market
                </p>
              </div>
              <div className="border border-[#e4e4e2] p-2">
                <p className="text-[10px] uppercase text-[#6b6b6b]">Engagement rate</p>
                <p className="mt-1 text-lg font-semibold tabular-nums">
                  {formatPercent(selectedKpis.engagementRate, 2)}
                </p>
                <p
                  className={`text-[10px] ${
                    rateDelta >= 0 ? "text-[#2b6cb0]" : "text-[#e87722]"
                  }`}
                >
                  {rateDelta >= 0 ? "+" : ""}
                  {rateDelta.toFixed(0)}% vs portfolio
                </p>
              </div>
            </div>
            <MinMidMaxBand
              label="Market engagement spread"
              min={benchmark.min}
              mid={benchmark.mid}
              max={benchmark.max}
              current={benchmark.current}
            />
            <DivergingBarChart
              rows={[
                {
                  id: "impressions",
                  label: "Impressions",
                  value: impressionDelta,
                  maxAbs: Math.max(Math.abs(impressionDelta), Math.abs(rateDelta), 1),
                },
                {
                  id: "rate",
                  label: "Eng. rate",
                  value: rateDelta,
                  maxAbs: Math.max(Math.abs(impressionDelta), Math.abs(rateDelta), 1),
                },
              ]}
            />
          </div>
        </ChartPanel>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <ChartPanel title="Markets by impressions" subtitle="Ranked bar view">
          <RankedBarList rows={impressionRankings} metric="impressions" />
        </ChartPanel>
        <ChartPanel title="Markets by engagement rate" subtitle="Ranked bar view">
          <RankedBarList rows={rateRankings} metric="engagementRate" />
        </ChartPanel>
      </div>

      <p className="text-[10px] text-[#7a7a7a]">
        Portfolio engagement rate: {formatPercent(kpis.engagementRate, 2)} across{" "}
        {rows.length} filtered activations.
      </p>
    </div>
  );
}
