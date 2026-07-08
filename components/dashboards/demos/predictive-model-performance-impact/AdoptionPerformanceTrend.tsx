"use client";

import type { ModelOperationsTrendPoint } from "@/lib/dashboards/types";
import {
  buildBandPath,
  buildLinePath,
  findPostInterventionStartIndex,
  trendToSvgPoint,
  type TrendChartLayout,
} from "@/lib/dashboards/model-ops-utils";

interface AdoptionPerformanceTrendProps {
  subtitle: string;
  interventionMonth: string;
  points: ModelOperationsTrendPoint[];
  selectedOutlierId: string | null;
  onSelectOutlier: (outlierId: string) => void;
}

const LAYOUT: TrendChartLayout = {
  width: 640,
  height: 220,
  padding: { top: 12, right: 12, bottom: 28, left: 36 },
};

export function AdoptionPerformanceTrend({
  subtitle,
  points,
  selectedOutlierId,
  onSelectOutlier,
}: AdoptionPerformanceTrendProps) {
  const adoptionPath = buildLinePath(points, (p) => p.adoptionRate, LAYOUT);
  const performancePath = buildLinePath(
    points,
    (p) => p.performanceRate,
    LAYOUT
  );
  const bandPath = buildBandPath(points, LAYOUT);
  const postIdx = findPostInterventionStartIndex(points);
  const postStart =
    postIdx >= 0
      ? trendToSvgPoint(postIdx, 50, points.length, LAYOUT).x
      : null;

  const tickIndices = [0, 5, 11, 17, 23].filter((i) => i < points.length);

  return (
    <div className="border border-[#d2d2d0] bg-white">
      <div className="border-b border-[#e2e2e0] bg-[#f8f8f7] px-3 py-2">
        <h3 className="text-[11px] font-semibold uppercase tracking-wide text-[#3d3d3d]">
          Adoption &amp; performance trend
        </h3>
        <p className="mt-0.5 text-[10px] text-[#7a7a7a]">{subtitle}</p>
      </div>
      <div className="p-3">
        <svg
          viewBox={`0 0 ${LAYOUT.width} ${LAYOUT.height}`}
          className="w-full"
          role="img"
          aria-label="Adoption and performance trend chart"
        >
          {postStart !== null && (
            <rect
              x={postStart}
              y={LAYOUT.padding.top}
              width={LAYOUT.width - LAYOUT.padding.right - postStart}
              height={
                LAYOUT.height - LAYOUT.padding.top - LAYOUT.padding.bottom
              }
              fill="#2b6cb0"
              opacity={0.06}
            />
          )}

          <path d={bandPath} fill="#e8e8e6" stroke="none" />

          <path
            d={performancePath}
            fill="none"
            stroke="#1a4f7a"
            strokeWidth={2}
          />
          <path
            d={adoptionPath}
            fill="none"
            stroke="#2b6cb0"
            strokeWidth={2}
            strokeDasharray="4 3"
          />

          {points.map((point, i) => {
            if (!point.outlierId) return null;
            const { x, y } = trendToSvgPoint(
              i,
              point.performanceRate,
              points.length,
              LAYOUT
            );
            const selected = selectedOutlierId === point.outlierId;
            return (
              <g key={point.month}>
                <circle
                  cx={x}
                  cy={y}
                  r={selected ? 7 : 5}
                  fill={selected ? "#e87722" : "#fff"}
                  stroke="#e87722"
                  strokeWidth={2}
                  className="cursor-pointer"
                  onClick={() => onSelectOutlier(point.outlierId!)}
                />
                {selected && (
                  <text
                    x={x}
                    y={y - 12}
                    textAnchor="middle"
                    className="fill-[#c45f12] text-[9px] font-semibold uppercase"
                  >
                    Outlier
                  </text>
                )}
              </g>
            );
          })}

          {tickIndices.map((i) => {
            const { x } = trendToSvgPoint(i, 50, points.length, LAYOUT);
            return (
              <text
                key={points[i].month}
                x={x}
                y={LAYOUT.height - 6}
                textAnchor="middle"
                className="fill-[#7a7a7a] text-[8px]"
              >
                {points[i].label}
              </text>
            );
          })}

          <text
            x={LAYOUT.padding.left}
            y={LAYOUT.padding.top - 2}
            className="fill-[#7a7a7a] text-[8px]"
          >
            50%
          </text>
          <text
            x={LAYOUT.padding.left}
            y={LAYOUT.height - LAYOUT.padding.bottom}
            className="fill-[#7a7a7a] text-[8px]"
          >
            100%
          </text>
        </svg>

        <div className="mt-2 flex flex-wrap gap-4 text-[9px] uppercase tracking-wide text-[#656565]">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-0.5 w-4 bg-[#2b6cb0]" />
            Adoption rate
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-0.5 w-4 bg-[#1a4f7a]" />
            Performance rate
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-4 bg-[#e8e8e6]" />
            Expected range
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-4 bg-[#2b6cb0]/10" />
            Post-intervention
          </span>
          <span className="flex items-center gap-1.5 text-[#c45f12]">
            <span className="inline-block h-2 w-2 rounded-full border-2 border-[#e87722] bg-white" />
            Detected outlier
          </span>
        </div>
      </div>
    </div>
  );
}
