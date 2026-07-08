import type { ModelOperationsLifecycle } from "@/lib/dashboards/types";

interface LifecycleStripProps {
  lifecycle: ModelOperationsLifecycle;
}

export function LifecycleStrip({ lifecycle }: LifecycleStripProps) {
  return (
    <div className="border border-[#d2d2d0] bg-white px-3 py-2">
      <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-widest text-[#868686]">
        Operating lifecycle
      </p>
      <ol className="flex flex-wrap items-center gap-1">
        {lifecycle.stages.map((stage, index) => {
          const accented = lifecycle.accentStages.includes(stage);
          return (
            <li key={stage} className="flex items-center gap-1">
              <span
                className={`rounded-sm px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide ${
                  accented
                    ? "bg-[#e87722]/15 text-[#c45f12] ring-1 ring-[#e87722]/40"
                    : "text-[#4a4a4a]"
                }`}
              >
                {stage}
              </span>
              {index < lifecycle.stages.length - 1 && (
                <span className="text-[10px] text-[#b0b0ae]" aria-hidden>
                  →
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
