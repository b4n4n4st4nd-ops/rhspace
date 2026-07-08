import type { DivergingRow } from "@/lib/dashboards/types";

interface DivergingBarChartProps {
  rows: DivergingRow[];
  unit?: string;
}

export function DivergingBarChart({ rows, unit = "%" }: DivergingBarChartProps) {
  if (rows.length === 0) {
    return <p className="text-[11px] text-[#7a7a7a]">No comparison data.</p>;
  }

  return (
    <div className="space-y-2">
      {rows.map((row) => {
        const widthPct = (Math.abs(row.value) / row.maxAbs) * 50;
        const isPositive = row.value >= 0;
        return (
          <div key={row.id} className="grid grid-cols-[88px_1fr_48px] items-center gap-2">
            <span className="truncate text-[10px] text-[#4a4a4a]">{row.label}</span>
            <div className="relative h-3 bg-[#ececea]">
              <div className="absolute left-1/2 top-0 h-full w-px bg-[#c8c8c6]" />
              <div
                className="absolute top-0 h-full"
                style={{
                  width: `${widthPct}%`,
                  left: isPositive ? "50%" : `${50 - widthPct}%`,
                  backgroundColor: isPositive ? "#2b6cb0" : "#e87722",
                }}
              />
            </div>
            <span
              className={`text-right text-[10px] tabular-nums ${
                isPositive ? "text-[#2b6cb0]" : "text-[#e87722]"
              }`}
            >
              {row.value > 0 ? "+" : ""}
              {row.value.toFixed(0)}
              {unit}
            </span>
          </div>
        );
      })}
    </div>
  );
}
