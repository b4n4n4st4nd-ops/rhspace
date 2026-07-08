interface ChartPanelProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export function ChartPanel({
  title,
  subtitle,
  children,
  className = "",
}: ChartPanelProps) {
  return (
    <div className={`border border-[#d6d6d4] bg-white ${className}`}>
      <div className="border-b border-[#e4e4e2] px-3 py-2">
        <h3 className="text-[11px] font-semibold uppercase tracking-wide text-[#4a4a4a]">
          {title}
        </h3>
        {subtitle && (
          <p className="mt-0.5 text-[10px] text-[#7a7a7a]">{subtitle}</p>
        )}
      </div>
      <div className="p-3">{children}</div>
    </div>
  );
}
