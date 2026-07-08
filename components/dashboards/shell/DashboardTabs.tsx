interface DashboardTab {
  id: string;
  label: string;
}

interface DashboardTabsProps {
  tabs: DashboardTab[];
  activeTab: string;
  onChange: (tabId: string) => void;
}

export function DashboardTabs({ tabs, activeTab, onChange }: DashboardTabsProps) {
  return (
    <div className="border border-[#d6d6d4] bg-white">
      <div
        className="flex flex-wrap border-b border-[#e4e4e2]"
        role="tablist"
        aria-label="Dashboard views"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(tab.id)}
              className={`border-r border-[#e4e4e2] px-4 py-2 text-[11px] font-semibold uppercase tracking-wide transition-colors ${
                isActive
                  ? "bg-[#141414] text-white"
                  : "bg-[#fafaf8] text-[#5c5c5c] hover:bg-[#f0f0ee]"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
