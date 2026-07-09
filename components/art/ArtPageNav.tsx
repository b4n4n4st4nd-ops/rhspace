"use client";

interface ArtPageNavProps {
  items: { label: string; href: string }[];
}

export function ArtPageNav({ items }: ArtPageNavProps) {
  return (
    <nav
      aria-label="Art sections"
      className="sticky top-16 z-30 -mx-4 border-b border-border bg-background/95 px-4 backdrop-blur-sm sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
    >
      <ul className="flex gap-1 overflow-x-auto py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item) => (
          <li key={item.href} className="shrink-0">
            <a
              href={item.href}
              className="inline-flex rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface hover:text-foreground"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
