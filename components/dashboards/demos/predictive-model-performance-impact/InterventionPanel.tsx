import type { ModelIntervention, ModelOutlier } from "@/lib/dashboards/types";
import { segmentLabel } from "@/lib/dashboards/model-ops-utils";

interface InterventionPanelProps {
  intervention: ModelIntervention;
  outlier: ModelOutlier;
  active: boolean;
}

export function InterventionPanel({
  intervention,
  outlier,
  active,
}: InterventionPanelProps) {
  const closed = intervention.actionStatus === "Closed";

  return (
    <div
      className={`border bg-white transition-colors ${
        active
          ? "border-[#2b6cb0] ring-1 ring-[#2b6cb0]/25"
          : "border-[#d2d2d0]"
      }`}
    >
      <div
        className={`border-b px-3 py-2 ${
          closed ? "border-[#dbe8f4] bg-[#f4f8fc]" : "border-[#e2e2e0] bg-[#f8f8f7]"
        }`}
      >
        <p className="text-[9px] font-semibold uppercase tracking-widest text-[#2b6cb0]">
          Intervention
        </p>
        <h3 className="mt-0.5 text-[11px] font-semibold uppercase tracking-wide text-[#3d3d3d]">
          {intervention.actionType}
        </h3>
      </div>
      <div className="space-y-2 p-3 text-[11px] leading-relaxed text-[#4a4a4a]">
        <p className="text-[9px] uppercase tracking-wide text-[#c45f12]">
          Triggered by: {segmentLabel(outlier)}
        </p>
        <dl className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[10px]">
          <div>
            <dt className="font-semibold uppercase tracking-wide text-[#868686]">
              Status
            </dt>
            <dd className="mt-0.5 font-medium text-[#2b6cb0]">
              {intervention.actionStatus}
            </dd>
          </div>
          <div>
            <dt className="font-semibold uppercase tracking-wide text-[#868686]">
              Date
            </dt>
            <dd className="mt-0.5 tabular-nums">{intervention.date}</dd>
          </div>
          <div className="col-span-2">
            <dt className="font-semibold uppercase tracking-wide text-[#868686]">
              Owner
            </dt>
            <dd className="mt-0.5">{intervention.ownerTeam}</dd>
          </div>
        </dl>
        <p>{intervention.description}</p>
      </div>
    </div>
  );
}
