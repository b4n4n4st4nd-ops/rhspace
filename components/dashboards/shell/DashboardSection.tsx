interface DashboardSectionProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function DashboardSection({
  title,
  description,
  action,
  children,
  className = "",
}: DashboardSectionProps) {
  return (
    <section
      className={`border border-[#d6d6d4] bg-white ${className}`}
    >
      <div className="flex items-start justify-between gap-3 border-b border-[#e4e4e2] px-3 py-2">
        <div>
          <h2 className="text-[11px] font-semibold uppercase tracking-wide text-[#4a4a4a]">
            {title}
          </h2>
          {description && (
            <p className="mt-0.5 text-[10px] text-[#7a7a7a]">{description}</p>
          )}
        </div>
        {action}
      </div>
      <div className="p-3">{children}</div>
    </section>
  );
}
