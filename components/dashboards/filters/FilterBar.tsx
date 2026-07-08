interface FilterOption {
  value: string;
  label: string;
}

interface FilterBarProps {
  label: string;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
}

export function FilterBar({
  label,
  value,
  options,
  onChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
      <span className="font-mono text-xs uppercase text-muted">{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            aria-pressed={value === option.value}
            className={`rounded-full border px-3 py-1 font-mono text-xs transition-colors ${
              value === option.value
                ? "border-accent bg-accent/10 text-accent"
                : "border-border text-muted hover:border-accent/40"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
