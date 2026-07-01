interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "";
  return (
    <div className={`mb-10 max-w-2xl ${alignClass}`}>
      {eyebrow && (
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-muted leading-relaxed">{description}</p>
      )}
    </div>
  );
}
