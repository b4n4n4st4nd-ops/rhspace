interface KpiCardProps {
  label: string;
  value: string;
  subtitle?: string;
  trend?: string;
  trendDirection?: "up" | "down" | "neutral";
}

const trendColors = {
  up: "text-[#2b6cb0]",
  down: "text-[#e87722]",
  neutral: "text-[#6b6b6b]",
} as const;

export function KpiCard({
  label,
  value,
  subtitle,
  trend,
  trendDirection = "neutral",
}: KpiCardProps) {
  return (
    <div className="border border-[#d6d6d4] bg-white px-3 py-2.5">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-[#6b6b6b]">
        {label}
      </p>
      <p className="mt-1 text-xl font-semibold tabular-nums tracking-tight text-[#141414] sm:text-2xl">
        {value}
      </p>
      {subtitle && (
        <p className="mt-1 text-[10px] text-[#7a7a7a]">{subtitle}</p>
      )}
      {trend && (
        <p className={`mt-1 text-[10px] tabular-nums ${trendColors[trendDirection]}`}>
          {trend}
        </p>
      )}
    </div>
  );
}
