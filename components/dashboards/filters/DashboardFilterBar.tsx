interface FilterOption {
  value: string;
  label: string;
}

interface DashboardFilterBarProps {
  filters: {
    dateRange: FilterOption[];
    city: FilterOption[];
    brand: FilterOption[];
    campaignType: FilterOption[];
  };
  values: {
    dateRange: string;
    city: string;
    brand: string;
    campaignType: string;
  };
  onChange: (key: "dateRange" | "city" | "brand" | "campaignType", value: string) => void;
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex min-w-[140px] flex-1 flex-col gap-1">
      <span className="text-[10px] font-semibold uppercase tracking-wide text-[#6b6b6b]">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-8 border border-[#cfcfcb] bg-white px-2 text-[11px] text-[#2a2a2a] outline-none focus:border-[#2b6cb0]"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function DashboardFilterBar({
  filters,
  values,
  onChange,
}: DashboardFilterBarProps) {
  return (
    <div className="grid gap-3 border border-[#d6d6d4] bg-white p-3 sm:grid-cols-2 lg:grid-cols-4">
      <FilterSelect
        label="Date range"
        value={values.dateRange}
        options={filters.dateRange}
        onChange={(value) => onChange("dateRange", value)}
      />
      <FilterSelect
        label="City / market"
        value={values.city}
        options={filters.city}
        onChange={(value) => onChange("city", value)}
      />
      <FilterSelect
        label="Brand"
        value={values.brand}
        options={filters.brand}
        onChange={(value) => onChange("brand", value)}
      />
      <FilterSelect
        label="Campaign type"
        value={values.campaignType}
        options={filters.campaignType}
        onChange={(value) => onChange("campaignType", value)}
      />
    </div>
  );
}
