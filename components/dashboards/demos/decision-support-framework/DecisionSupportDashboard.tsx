import type { DecisionSupportData } from "@/lib/dashboards/types";
import { DashboardSection } from "@/components/dashboards/shell/DashboardSection";

interface DecisionSupportDashboardProps {
  data: DecisionSupportData;
}

export function DecisionSupportDashboard({ data }: DecisionSupportDashboardProps) {
  return (
    <div className="space-y-4">
      <DashboardSection
        title="Framework map"
        description="Planned visualization layers — interactive views will be added per dimension."
      >
        <ul className="grid gap-2 sm:grid-cols-2">
          {data.framework.dimensions.map((dimension) => (
            <li
              key={dimension.id}
              className="border border-[#e4e4e2] bg-[#fafaf9] px-3 py-2"
            >
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[#4a4a4a]">
                {dimension.label}
              </p>
              <p className="mt-1 text-[11px] leading-relaxed text-[#6b6b6b]">
                {dimension.description}
              </p>
            </li>
          ))}
        </ul>
      </DashboardSection>
      <p className="text-[10px] uppercase tracking-wide text-[#8f8f8f]">
        Time-series views will span all dimensions — draft scaffold only.
      </p>
    </div>
  );
}
