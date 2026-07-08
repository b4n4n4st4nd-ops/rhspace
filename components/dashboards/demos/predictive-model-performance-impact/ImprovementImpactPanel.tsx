import type { ModelImprovement, ModelIntervention } from "@/lib/dashboards/types";
import { formatCurrency } from "@/lib/dashboards/model-ops-utils";

interface ImprovementImpactPanelProps {
  improvement: ModelImprovement;
  intervention: ModelIntervention;
  active: boolean;
}

function DeltaPill({
  label,
  before,
  after,
  suffix = "pp",
}: {
  label: string;
  before: number;
  after: number;
  suffix?: string;
}) {
  const delta = after - before;
  const positive = delta >= 0;
  return (
    <div className="border border-[#e2e2e0] bg-[#fafaf9] px-2 py-1.5">
      <p className="text-[9px] font-semibold uppercase tracking-wide text-[#868686]">
        {label}
      </p>
      <p className="mt-0.5 text-[11px] tabular-nums">
        <span className="text-[#7a7a7a]">{before}%</span>
        <span className="mx-1 text-[#b0b0ae]">→</span>
        <span className="font-semibold text-[#141414]">{after}%</span>
        <span
          className={`ml-1.5 text-[10px] font-medium ${
            positive ? "text-[#2b6cb0]" : "text-[#e87722]"
          }`}
        >
          ({delta > 0 ? "+" : ""}
          {delta}
          {suffix})
        </span>
      </p>
    </div>
  );
}

export function ImprovementImpactPanel({
  improvement,
  intervention,
  active,
}: ImprovementImpactPanelProps) {
  const sparkPoints = [0, 35, 55, 72, 88, 100];
  const sparkPath = sparkPoints
    .map((v, i) => {
      const x = 4 + (i / (sparkPoints.length - 1)) * 116;
      const y = 28 - (v / 100) * 24;
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  return (
    <div
      className={`border bg-white transition-colors ${
        active
          ? "border-[#2b6cb0] ring-1 ring-[#2b6cb0]/25"
          : "border-[#d2d2d0]"
      }`}
    >
      <div className="border-b border-[#dbe8f4] bg-[#f4f8fc] px-3 py-2">
        <p className="text-[9px] font-semibold uppercase tracking-widest text-[#2b6cb0]">
          Improvement &amp; impact
        </p>
        <h3 className="mt-0.5 text-[11px] font-semibold uppercase tracking-wide text-[#3d3d3d]">
          Result of intervention
        </h3>
      </div>
      <div className="space-y-2 p-3">
        <p className="text-[9px] uppercase tracking-wide text-[#2b6cb0]">
          Result of: {intervention.actionType}
        </p>
        <div className="grid gap-1.5 sm:grid-cols-2">
          <DeltaPill
            label="Adoption change"
            before={improvement.adoptionBefore}
            after={improvement.adoptionAfter}
          />
          <DeltaPill
            label="Performance change"
            before={improvement.performanceBefore}
            after={improvement.performanceAfter}
          />
          <DeltaPill
            label="Override rate"
            before={improvement.overrideRateBefore}
            after={improvement.overrideRateAfter}
          />
          <div className="border border-[#e2e2e0] bg-[#fafaf9] px-2 py-1.5">
            <p className="text-[9px] font-semibold uppercase tracking-wide text-[#868686]">
              Incremental value
            </p>
            <p className="mt-0.5 text-[11px] font-semibold tabular-nums text-[#2b6cb0]">
              +{formatCurrency(improvement.incrementalValueImpact)}
            </p>
          </div>
        </div>
        <div className="border border-[#e2e2e0] bg-white px-2 py-2">
          <div className="flex items-end justify-between gap-2">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-wide text-[#868686]">
                Cumulative value impact
              </p>
              <p className="mt-0.5 text-lg font-semibold tabular-nums text-[#141414]">
                {formatCurrency(improvement.cumulativeValueImpact)}
              </p>
            </div>
            <svg
              viewBox="0 0 120 32"
              className="h-8 w-28 shrink-0"
              aria-hidden
            >
              <path
                d={sparkPath}
                fill="none"
                stroke="#2b6cb0"
                strokeWidth={2}
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
