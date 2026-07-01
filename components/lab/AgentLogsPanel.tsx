"use client";

interface AgentLog {
  step: string;
  detail: string;
  timestamp: string;
}

interface AgentLogsPanelProps {
  logs: AgentLog[];
}

export function AgentLogsPanel({ logs }: AgentLogsPanelProps) {
  if (logs.length === 0) return null;

  return (
    <details className="mt-4 rounded-lg border border-border bg-surface">
      <summary className="cursor-pointer px-4 py-3 font-mono text-xs uppercase tracking-wider text-accent">
        Agent logs ({logs.length})
      </summary>
      <ol className="max-h-64 space-y-3 overflow-y-auto border-t border-border px-4 py-3">
        {logs.map((log, i) => (
          <li key={`${log.step}-${i}`} className="text-sm">
            <div className="flex items-baseline justify-between gap-2">
              <span className="font-mono text-xs text-accent">{log.step}</span>
              <span className="font-mono text-[10px] text-muted">
                {log.timestamp}
              </span>
            </div>
            <p className="mt-1 text-muted">{log.detail}</p>
          </li>
        ))}
      </ol>
    </details>
  );
}

export type { AgentLog };
