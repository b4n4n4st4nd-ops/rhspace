import type { TypeMixSegment } from "@/lib/dashboards/types";
import { formatCompact, getTypeColor } from "@/lib/dashboards/marketing-utils";

interface StackedBarChartProps {
  segments: TypeMixSegment[];
}

export function StackedBarChart({ segments }: StackedBarChartProps) {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0);

  if (total === 0) {
    return <p className="text-[11px] text-[#7a7a7a]">No data for current filters.</p>;
  }

  return (
    <div className="space-y-3">
      <div className="flex h-5 overflow-hidden border border-[#d6d6d4]">
        {segments.map((segment) => (
          <div
            key={segment.type}
            style={{
              width: `${(segment.value / total) * 100}%`,
              backgroundColor: getTypeColor(segment.type),
            }}
            title={`${segment.label}: ${formatCompact(segment.value)}`}
          />
        ))}
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {segments.map((segment) => (
          <div key={segment.type} className="flex items-center gap-2 text-[10px]">
            <span
              className="inline-block h-2.5 w-2.5 shrink-0"
              style={{ backgroundColor: getTypeColor(segment.type) }}
            />
            <span className="text-[#4a4a4a]">{segment.label}</span>
            <span className="ml-auto tabular-nums text-[#6b6b6b]">
              {formatCompact(segment.value)} ({((segment.value / total) * 100).toFixed(0)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
