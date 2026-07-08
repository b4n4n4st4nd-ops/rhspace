import type { ReactNode } from "react";

interface ArtSectionProps {
  id: string;
  title: string;
  subtitle?: string;
  body?: string;
  children?: ReactNode;
  bordered?: boolean;
}

export function ArtSection({
  id,
  title,
  subtitle,
  body,
  children,
  bordered = true,
}: ArtSectionProps) {
  return (
    <section
      id={id}
      className={bordered ? "border-t border-border pt-16 sm:pt-20 scroll-mt-24" : "scroll-mt-24"}
    >
      <div className="mb-10 max-w-2xl">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 text-accent-warm leading-relaxed">{subtitle}</p>
        )}
        {body && (
          <p className="mt-4 text-muted leading-relaxed">{body}</p>
        )}
      </div>
      {children}
    </section>
  );
}
