"use client";

import { useMemo, useState } from "react";
import type { MarketingPerformanceData } from "@/lib/dashboards/types";
import {
  BRAND_OPTIONS,
  CAMPAIGN_TYPE_OPTIONS,
  DATE_RANGE_OPTIONS,
  buildCityOptions,
  buildInsightSummary,
  computeKpis,
  filterCampaigns,
  formatCompact,
  formatPercent,
} from "@/lib/dashboards/marketing-utils";
import { BrandBreakoutTab } from "@/components/dashboards/demos/marketing-performance-dashboard/BrandBreakoutTab";
import { GeoPerformanceTab } from "@/components/dashboards/demos/marketing-performance-dashboard/GeoPerformanceTab";
import { OverviewTab } from "@/components/dashboards/demos/marketing-performance-dashboard/OverviewTab";
import { DashboardFilterBar } from "@/components/dashboards/filters/DashboardFilterBar";
import { KpiGrid } from "@/components/dashboards/metrics/KpiGrid";
import { DashboardTabs } from "@/components/dashboards/shell/DashboardTabs";

interface MarketingPerformanceDashboardProps {
  data: MarketingPerformanceData;
}

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "geo", label: "Geo Performance" },
  { id: "brand", label: "Brand Breakout" },
];

export function MarketingPerformanceDashboard({
  data,
}: MarketingPerformanceDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [dateRange, setDateRange] = useState("rolling-12m");
  const [city, setCity] = useState("all");
  const [brand, setBrand] = useState("all");
  const [campaignType, setCampaignType] = useState("all");
  const [selectedCity, setSelectedCity] = useState("all");

  const filters = useMemo(
    () => ({ dateRange, city, brand, campaignType }),
    [dateRange, city, brand, campaignType]
  );

  const filteredRows = useMemo(
    () => filterCampaigns(data.campaigns, filters),
    [data.campaigns, filters]
  );

  const kpis = useMemo(() => computeKpis(filteredRows), [filteredRows]);
  const insight = useMemo(
    () => buildInsightSummary(kpis, filteredRows, filters, data),
    [kpis, filteredRows, filters, data]
  );

  function goalTrend(goalRatio: number): "up" | "down" | "neutral" {
    if (goalRatio >= 1) return "up";
    if (goalRatio >= 0.85) return "neutral";
    return "down";
  }

  const kpiItems: {
    id: string;
    label: string;
    value: string;
    subtitle: string;
    trend: string;
    trendDirection: "up" | "down" | "neutral";
  }[] = [
    {
      id: "events",
      label: "Events",
      value: kpis.events.toLocaleString("en-US"),
      subtitle: "Activations in scope",
      trend: filteredRows.length > 0 ? "In selected period" : "No data",
      trendDirection: "neutral" as const,
    },
    {
      id: "impressions",
      label: "Impressions",
      value: formatCompact(kpis.impressions),
      subtitle: "Total reach",
      trend: `${formatPercent(kpis.impressionsToGoal, 0)} to goal`,
      trendDirection: goalTrend(kpis.impressionsToGoal),
    },
    {
      id: "interactions",
      label: "Interactions",
      value: formatCompact(kpis.interactions),
      subtitle: "Touched sessions",
      trend: "Filtered view",
      trendDirection: "neutral" as const,
    },
    {
      id: "engagements",
      label: "Engagements",
      value: formatCompact(kpis.engagements),
      subtitle: "Qualified actions",
      trend: `${formatPercent(kpis.engagementsToGoal, 0)} to goal`,
      trendDirection: goalTrend(kpis.engagementsToGoal),
    },
    {
      id: "engagement-rate",
      label: "Engagement rate",
      value: formatPercent(kpis.engagementRate, 2),
      subtitle: "Engagements / impressions",
      trend: kpis.engagementRate >= 0.03 ? "Above 3.0% benchmark" : "Below 3.0% benchmark",
      trendDirection: kpis.engagementRate >= 0.03 ? "up" : "down",
    },
    {
      id: "goal-attainment",
      label: "Goal attainment",
      value: formatPercent(kpis.goalAttainment, 0),
      subtitle: "Composite goal progress",
      trend: kpis.goalAttainment >= 1 ? "On track" : "Below plan",
      trendDirection: goalTrend(kpis.goalAttainment),
    },
  ];

  function handleFilterChange(
    key: "dateRange" | "city" | "brand" | "campaignType",
    value: string
  ) {
    if (key === "dateRange") setDateRange(value);
    if (key === "city") {
      setCity(value);
      setSelectedCity(value);
    }
    if (key === "brand") setBrand(value);
    if (key === "campaignType") setCampaignType(value);
  }

  function handleSelectCity(cityId: string) {
    setSelectedCity(cityId);
    setCity(cityId);
  }

  return (
    <div className="space-y-3">
      <DashboardFilterBar
        filters={{
          dateRange: [...DATE_RANGE_OPTIONS],
          city: buildCityOptions(data.cities),
          brand: [...BRAND_OPTIONS],
          campaignType: [...CAMPAIGN_TYPE_OPTIONS],
        }}
        values={{ dateRange, city, brand, campaignType }}
        onChange={handleFilterChange}
      />

      <KpiGrid items={kpiItems} />

      <DashboardTabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === "overview" && (
        <OverviewTab rows={filteredRows} kpis={kpis} insight={insight} />
      )}
      {activeTab === "geo" && (
        <GeoPerformanceTab
          rows={filteredRows}
          allRows={data.campaigns}
          cities={data.cities}
          selectedCity={selectedCity}
          onSelectCity={handleSelectCity}
          kpis={kpis}
        />
      )}
      {activeTab === "brand" && (
        <BrandBreakoutTab rows={filteredRows} cities={data.cities} />
      )}
    </div>
  );
}
