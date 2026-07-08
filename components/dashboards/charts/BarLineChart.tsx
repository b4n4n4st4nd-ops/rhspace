import type { MonthlyTrendPoint } from "@/lib/dashboards/types";
import { formatCompact, formatPercent } from "@/lib/dashboards/marketing-utils";

interface BarLineChartProps {
  data: MonthlyTrendPoint[];
}

export function BarLineChart({ data }: BarLineChartProps) {
  if (data.length === 0) {
    return <p className="text-[11px] text-[#7a7a7a]">No trend data for current filters.</p>;
  }

  const width = 520;
  const height = 180;
  const padding = { top: 12, right: 36, bottom: 28, left: 36 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const maxImpressions = Math.max(...data.map((point) => point.impressions), 1);
  const maxRate = Math.max(...data.map((point) => point.engagementRate), 0.01);
  const step = chartWidth / Math.max(data.length - 1, 1);
  const barWidth = Math.min(24, step * 0.55);

  const linePoints = data
    .map((point, index) => {
      const x = padding.left + index * step;
      const y =
        padding.top +
        chartHeight -
        (point.engagementRate / maxRate) * chartHeight;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full min-w-[320px]">
        {data.map((point, index) => {
          const x = padding.left + index * step - barWidth / 2;
          const barHeight = (point.impressions / maxImpressions) * chartHeight;
          const y = padding.top + chartHeight - barHeight;
          return (
            <g key={point.month}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill="#c5d5e8"
              />
              <text
                x={padding.left + index * step}
                y={height - 8}
                textAnchor="middle"
                className="fill-[#6b6b6b] text-[9px]"
              >
                {point.label}
              </text>
            </g>
          );
        })}
        <polyline
          fill="none"
          stroke="#e87722"
          strokeWidth="2"
          points={linePoints}
        />
        {data.map((point, index) => {
          const x = padding.left + index * step;
          const y =
            padding.top +
            chartHeight -
            (point.engagementRate / maxRate) * chartHeight;
          return <circle key={`${point.month}-dot`} cx={x} cy={y} r="2.5" fill="#e87722" />;
        })}
        <text x={8} y={16} className="fill-[#6b6b6b] text-[9px]">
          {formatCompact(maxImpressions)}
        </text>
        <text
          x={width - 8}
          y={16}
          textAnchor="end"
          className="fill-[#e87722] text-[9px]"
        >
          {formatPercent(maxRate, 1)}
        </text>
      </svg>
      <div className="mt-1 flex gap-4 text-[10px] text-[#6b6b6b]">
        <span className="inline-flex items-center gap-1">
          <span className="inline-block h-2 w-3 bg-[#c5d5e8]" /> Impressions
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="inline-block h-0.5 w-3 bg-[#e87722]" /> Engagement rate
        </span>
      </div>
    </div>
  );
}
