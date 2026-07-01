interface PageHeroProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export function PageHero({ title, subtitle, children }: PageHeroProps) {
  return (
    <section className="mesh-bg border-b border-border/60 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-lg text-muted leading-relaxed">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
