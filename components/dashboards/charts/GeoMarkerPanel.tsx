"use client";

import type { CityMeta, RankedMarket } from "@/lib/dashboards/types";
import { formatCompact, formatPercent } from "@/lib/dashboards/marketing-utils";

interface GeoMarkerPanelProps {
  cities: CityMeta[];
  rankings: RankedMarket[];
  selectedCity: string;
  onSelectCity: (cityId: string) => void;
}

export function GeoMarkerPanel({
  cities,
  rankings,
  selectedCity,
  onSelectCity,
}: GeoMarkerPanelProps) {
  const maxImpressions = Math.max(...rankings.map((row) => row.impressions), 1);
  const impressionMap = new Map(rankings.map((row) => [row.cityId, row]));

  return (
    <div className="relative aspect-[16/10] border border-[#e4e4e2] bg-[#fafaf8]">
      <svg viewBox="0 0 100 62" className="h-full w-full">
        <path
          d="M8 40 L20 28 L34 24 L48 30 L62 22 L78 26 L92 34 L88 48 L70 52 L52 56 L34 50 L16 48 Z"
          fill="#efefec"
          stroke="#d2d2cf"
          strokeWidth="0.6"
        />
        {cities.map((city) => {
          const stats = impressionMap.get(city.id);
          const impressions = stats?.impressions ?? 0;
          const radius = 2 + (impressions / maxImpressions) * 5;
          const isSelected = selectedCity === city.id;
          return (
            <g key={city.id}>
              <circle
                cx={city.x}
                cy={city.y}
                r={radius}
                fill={isSelected ? "#e87722" : "#2b6cb0"}
                fillOpacity={isSelected ? 0.9 : 0.55}
                stroke={isSelected ? "#141414" : "#1f4f86"}
                strokeWidth={isSelected ? 0.8 : 0.4}
                className="cursor-pointer"
                onClick={() => onSelectCity(city.id)}
              />
              <text
                x={city.x}
                y={city.y + radius + 3}
                textAnchor="middle"
                className="fill-[#5c5c5c] text-[3px]"
              >
                {city.label}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="absolute bottom-2 left-2 text-[9px] text-[#6b6b6b]">
        Marker size = impression volume
      </div>
    </div>
  );
}

interface RankedBarListProps {
  rows: RankedMarket[];
  metric: "impressions" | "engagementRate";
}

export function RankedBarList({ rows, metric }: RankedBarListProps) {
  const maxValue =
    metric === "impressions"
      ? Math.max(...rows.map((row) => row.impressions), 1)
      : Math.max(...rows.map((row) => row.engagementRate), 0.01);

  return (
    <div className="space-y-2">
      {rows.map((row) => {
        const value =
          metric === "impressions" ? row.impressions : row.engagementRate;
        const widthPct = (value / maxValue) * 100;
        const display =
          metric === "impressions"
            ? formatCompact(row.impressions)
            : formatPercent(row.engagementRate, 2);

        return (
          <div key={row.cityId} className="grid grid-cols-[96px_1fr_56px] items-center gap-2">
            <span className="truncate text-[10px] text-[#4a4a4a]">{row.label}</span>
            <div className="h-2.5 bg-[#ececea]">
              <div
                className="h-full"
                style={{
                  width: `${widthPct}%`,
                  backgroundColor: metric === "impressions" ? "#2b6cb0" : "#e87722",
                }}
              />
            </div>
            <span className="text-right text-[10px] tabular-nums text-[#4a4a4a]">
              {display}
            </span>
          </div>
        );
      })}
    </div>
  );
}
