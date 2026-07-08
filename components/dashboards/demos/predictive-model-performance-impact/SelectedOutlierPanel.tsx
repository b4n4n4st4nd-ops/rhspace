import type { ModelOutlier } from "@/lib/dashboards/types";
import { segmentLabel } from "@/lib/dashboards/model-ops-utils";

interface SelectedOutlierPanelProps {
  outlier: ModelOutlier;
  active: boolean;
}

const severityStyles = {
  High: "bg-[#e87722]/15 text-[#c45f12] ring-[#e87722]/40",
  Medium: "bg-[#f0e6d8] text-[#8a5a20] ring-[#d4a574]/40",
  Low: "bg-[#ececec] text-[#5a5a5a] ring-[#c8c8c8]/40",
} as const;

export function SelectedOutlierPanel({ outlier, active }: SelectedOutlierPanelProps) {
  return (
    <div
      className={`border bg-white transition-colors ${
        active
          ? "border-[#e87722] ring-1 ring-[#e87722]/30"
          : "border-[#d2d2d0]"
      }`}
    >
      <div className="border-b border-[#e2e2e0] bg-[#fff8f3] px-3 py-2">
        <p className="text-[9px] font-semibold uppercase tracking-widest text-[#c45f12]">
          Selected outlier
        </p>
        <h3 className="mt-0.5 text-[11px] font-semibold uppercase tracking-wide text-[#3d3d3d]">
          {segmentLabel(outlier)}
        </h3>
      </div>
      <div className="space-y-2.5 p-3 text-[11px] leading-relaxed text-[#4a4a4a]">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-wide text-[#868686]">
            {outlier.metricLabel}
          </p>
          <p className="mt-0.5 text-lg font-semibold tabular-nums text-[#e87722]">
            {outlier.metricValue}%
            <span className="ml-2 text-[10px] font-normal text-[#7a7a7a]">
              expected {outlier.expectedMin}–{outlier.expectedMax}%
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`rounded-sm px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide ring-1 ${severityStyles[outlier.severity]}`}
          >
            {outlier.severity} severity
          </span>
          {outlier.autoDetected && (
            <span className="text-[9px] uppercase tracking-wide text-[#868686]">
              Auto-detected · z={outlier.zScore}
            </span>
          )}
        </div>
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-wide text-[#868686]">
            Likely driver
          </p>
          <p className="mt-0.5">{outlier.likelyDriver}</p>
        </div>
      </div>
    </div>
  );
}
