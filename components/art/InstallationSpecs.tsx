import type { ArtSpec } from "@/lib/types/content";

interface InstallationSpecsProps {
  specs: ArtSpec[];
}

export function InstallationSpecs({ specs }: InstallationSpecsProps) {
  return (
    <dl className="grid gap-4 sm:grid-cols-2">
      {specs.map((spec) => (
        <div
          key={spec.label}
          className="rounded-lg border border-border bg-surface p-5"
        >
          <dt className="font-mono text-xs uppercase tracking-widest text-accent-warm">
            {spec.label}
          </dt>
          <dd className="mt-2 text-sm text-muted leading-relaxed">
            {spec.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
