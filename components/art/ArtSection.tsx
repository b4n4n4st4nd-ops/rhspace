import type { ReactNode } from "react";

interface ArtSectionProps {
  id: string;
  title: string;
  subtitle?: string;
  body?: string;
  children?: ReactNode;
  bordered?: boolean;
  className?: string;
}

export function ArtSection({
  id,
  title,
  subtitle,
  body,
  children,
  bordered = true,
  className = "",
}: ArtSectionProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-32 ${bordered ? "border-t border-border pt-16 sm:pt-20" : ""} ${className}`.trim()}
    >
      <div className="mb-10 max-w-2xl">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h2>
        {subtitle?.trim() ? (
          <p className="mt-3 text-accent-warm leading-relaxed">{subtitle}</p>
        ) : null}
        {body?.trim() ? (
          <p className="mt-4 text-muted leading-relaxed">{body}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}
