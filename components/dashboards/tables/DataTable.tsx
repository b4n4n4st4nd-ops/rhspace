interface DataTableColumn<T> {
  key: keyof T;
  label: string;
  align?: "left" | "right";
  format?: (value: T[keyof T], row: T) => string;
}

interface DataTableProps<T extends { id: string }> {
  columns: DataTableColumn<T>[];
  rows: T[];
  emptyMessage?: string;
}

export function DataTable<T extends { id: string }>({
  columns,
  rows,
  emptyMessage = "No rows match the current filters.",
}: DataTableProps<T>) {
  if (rows.length === 0) {
    return <p className="text-[11px] text-[#7a7a7a]">{emptyMessage}</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] border-collapse text-[11px]">
        <thead>
          <tr className="border-b border-[#d6d6d4] bg-[#fafaf8] text-left">
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className={`px-2 py-2 font-semibold uppercase tracking-wide text-[#6b6b6b] ${
                  column.align === "right" ? "text-right" : ""
                }`}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-[#ececea]">
              {columns.map((column) => {
                const raw = row[column.key];
                const display = column.format
                  ? column.format(raw, row)
                  : String(raw ?? "");

                return (
                  <td
                    key={String(column.key)}
                    className={`px-2 py-2 tabular-nums text-[#3a3a3a] ${
                      column.align === "right" ? "text-right" : ""
                    }`}
                  >
                    {display}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
