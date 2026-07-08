import type { ModelOperationsKpis } from "@/lib/dashboards/types";
import {
  deltaDirection,
  formatDelta,
  formatKpiValue,
} from "@/lib/dashboards/model-ops-utils";

interface ModelOpsKpiRowProps {
  kpis: ModelOperationsKpis;
}

const trendColors = {
  up: "text-[#2b6cb0]",
  down: "text-[#e87722]",
  neutral: "text-[#6b6b6b]",
} as const;

export function ModelOpsKpiRow({ kpis }: ModelOpsKpiRowProps) {
  return (
    <div className="grid grid-cols-2 gap-px border border-[#d2d2d0] bg-[#d2d2d0] sm:grid-cols-3 lg:grid-cols-6">
      {kpis.items.map((kpi) => {
        const direction = deltaDirection(kpi);
        return (
          <div key={kpi.id} className="bg-white px-3 py-2.5">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-[#656565]">
              {kpi.label}
            </p>
            <p className="mt-1 text-xl font-semibold tabular-nums tracking-tight text-[#141414] sm:text-2xl">
              {formatKpiValue(kpi)}
            </p>
            <p
              className={`mt-0.5 text-[10px] tabular-nums ${trendColors[direction]}`}
            >
              {formatDelta(kpi)} {kpi.comparisonPeriod}
            </p>
            <p className="mt-0.5 text-[9px] leading-snug text-[#7a7a7a]">
              {kpi.subtext}
            </p>
          </div>
        );
      })}
    </div>
  );
}
