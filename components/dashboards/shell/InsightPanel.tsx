interface InsightPanelProps {
  title?: string;
  body: string;
}

export function InsightPanel({
  title = "Executive summary",
  body,
}: InsightPanelProps) {
  return (
    <div className="border border-[#d6d6d4] bg-[#fafaf8] px-3 py-3">
      <h3 className="text-[11px] font-semibold uppercase tracking-wide text-[#4a4a4a]">
        {title}
      </h3>
      <p className="mt-2 text-xs leading-relaxed text-[#4a4a4a]">{body}</p>
    </div>
  );
}
