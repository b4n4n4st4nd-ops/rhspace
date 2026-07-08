import { formatPercent } from "@/lib/dashboards/marketing-utils";

interface GoalProgressProps {
  label: string;
  current: number;
  goal: number;
}

export function GoalProgress({ label, current, goal }: GoalProgressProps) {
  const ratio = goal > 0 ? Math.min(current / goal, 1.2) : 0;
  const pct = goal > 0 ? current / goal : 0;
  const barColor = pct >= 1 ? "#2b6cb0" : pct >= 0.85 ? "#4a5568" : "#e87722";

  return (
    <div>
      <div className="mb-1 flex items-center justify-between gap-2 text-[10px]">
        <span className="font-semibold uppercase tracking-wide text-[#6b6b6b]">
          {label}
        </span>
        <span className="tabular-nums text-[#4a4a4a]">
          {formatPercent(pct, 0)} of goal
        </span>
      </div>
      <div className="h-2 bg-[#ececea]">
        <div
          className="h-full transition-all"
          style={{ width: `${Math.min(ratio * 100, 100)}%`, backgroundColor: barColor }}
        />
      </div>
    </div>
  );
}
