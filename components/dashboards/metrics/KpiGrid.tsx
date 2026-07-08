import { KpiCard } from "@/components/dashboards/metrics/KpiCard";

interface KpiItem {
  id: string;
  label: string;
  value: string;
  subtitle?: string;
  trend?: string;
  trendDirection?: "up" | "down" | "neutral";
}

interface KpiGridProps {
  items: KpiItem[];
}

export function KpiGrid({ items }: KpiGridProps) {
  return (
    <div className="grid grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-6">
      {items.map((item) => (
        <KpiCard
          key={item.id}
          label={item.label}
          value={item.value}
          subtitle={item.subtitle}
          trend={item.trend}
          trendDirection={item.trendDirection}
        />
      ))}
    </div>
  );
}
