import { formatPercent } from "@/lib/dashboards/marketing-utils";

interface MinMidMaxBandProps {
  label: string;
  min: number;
  mid: number;
  max: number;
  current: number;
  formatValue?: (value: number) => string;
}

export function MinMidMaxBand({
  label,
  min,
  mid,
  max,
  current,
  formatValue = (value) => formatPercent(value, 1),
}: MinMidMaxBandProps) {
  const range = max - min || 1;
  const currentPct = ((current - min) / range) * 100;
  const midPct = ((mid - min) / range) * 100;

  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-[10px]">
        <span className="font-semibold uppercase tracking-wide text-[#6b6b6b]">
          {label}
        </span>
        <span className="tabular-nums text-[#2b6cb0]">
          Current {formatValue(current)}
        </span>
      </div>
      <div className="relative h-4 border border-[#d6d6d4] bg-[#f7f7f5]">
        <div
          className="absolute top-0 h-full bg-[#e8edf3]"
          style={{ left: "0%", right: `${100 - midPct}%` }}
        />
        <div
          className="absolute top-0 h-full bg-[#dce8f4]"
          style={{ left: `${midPct}%`, right: "0%" }}
        />
        <div
          className="absolute top-[-2px] h-[calc(100%+4px)] w-0.5 bg-[#141414]"
          style={{ left: `${Math.min(Math.max(currentPct, 0), 100)}%` }}
        />
      </div>
      <div className="mt-1 grid grid-cols-3 text-[9px] uppercase tracking-wide text-[#7a7a7a]">
        <span>Min {formatValue(min)}</span>
        <span className="text-center">Mid {formatValue(mid)}</span>
        <span className="text-right">Max {formatValue(max)}</span>
      </div>
    </div>
  );
}
