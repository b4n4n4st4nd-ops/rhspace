interface SignalChainDiagramProps {
  steps: string[];
}

export function SignalChainDiagram({ steps }: SignalChainDiagramProps) {
  return (
    <ol className="space-y-0" aria-label="Technical signal chain">
      {steps.map((step, index) => (
        <li key={step} className="flex flex-col items-stretch">
          <div className="rounded-lg border border-border bg-surface px-4 py-3 text-sm font-medium">
            {step}
          </div>
          {index < steps.length - 1 && (
            <div
              className="flex justify-center py-2 text-muted"
              aria-hidden
            >
              ↓
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}
