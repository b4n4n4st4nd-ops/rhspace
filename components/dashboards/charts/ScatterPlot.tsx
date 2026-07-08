import type { ScatterPoint } from "@/lib/dashboards/types";
import { formatPercent } from "@/lib/dashboards/marketing-utils";

interface ScatterPlotProps {
  points: ScatterPoint[];
  xLabel?: string;
  yLabel?: string;
}

export function ScatterPlot({
  points,
  xLabel = "Impressions (M)",
  yLabel = "Engagement rate",
}: ScatterPlotProps) {
  if (points.length === 0) {
    return <p className="text-[11px] text-[#7a7a7a]">No points for current filters.</p>;
  }

  const width = 360;
  const height = 200;
  const padding = 28;
  const maxX = Math.max(...points.map((point) => point.x), 0.5);
  const maxY = Math.max(...points.map((point) => point.y), 0.01);
  const maxSize = Math.max(...points.map((point) => point.size), 1);

  return (
    <div>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
        <rect
          x={padding}
          y={padding / 2}
          width={width - padding * 1.5}
          height={height - padding * 1.5}
          fill="#fafaf8"
          stroke="#e4e4e2"
        />
        {points.map((point) => {
          const cx =
            padding +
            (point.x / maxX) * (width - padding * 2);
          const cy =
            height -
            padding -
            (point.y / maxY) * (height - padding * 2);
          const radius = 3 + (point.size / maxSize) * 6;
          return (
            <circle
              key={point.id}
              cx={cx}
              cy={cy}
              r={radius}
              fill="#2b6cb0"
              fillOpacity="0.65"
              stroke="#1f4f86"
              strokeWidth="1"
            >
              <title>
                {point.label}: {point.x.toFixed(2)}M, {formatPercent(point.y, 2)}
              </title>
            </circle>
          );
        })}
        <text x={padding} y={12} className="fill-[#6b6b6b] text-[9px]">
          {yLabel}
        </text>
        <text
          x={width - padding}
          y={height - 4}
          textAnchor="end"
          className="fill-[#6b6b6b] text-[9px]"
        >
          {xLabel}
        </text>
      </svg>
    </div>
  );
}
