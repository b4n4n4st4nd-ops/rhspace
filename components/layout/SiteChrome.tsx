import Link from "next/link";
import type { SiteConfig } from "@/lib/types/content";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "main";
}

export function Container({
  children,
  className = "",
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag className={`mx-auto w-full max-w-6xl px-6 ${className}`}>{children}</Tag>
  );
}

interface SiteHeaderProps {
  site: SiteConfig;
}

export function SiteHeader({ site }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-mono text-sm font-semibold tracking-tight text-accent hover:text-accent/80 transition-colors"
        >
          {site.name}
        </Link>
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <MobileNav site={site} />
        </div>
      </Container>
    </header>
  );
}

function MobileNav({ site }: SiteHeaderProps) {
  return (
    <details className="relative md:hidden group">
      <summary className="list-none cursor-pointer font-mono text-sm text-muted hover:text-foreground transition-colors [&::-webkit-details-marker]:hidden">
        Menu
      </summary>
      <nav
        aria-label="Mobile navigation"
        className="absolute right-0 top-full mt-2 min-w-40 rounded-lg border border-border bg-surface p-2 shadow-lg"
      >
        {site.nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded-md px-3 py-2 text-sm text-muted hover:bg-border/40 hover:text-foreground transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </details>
  );
}

interface SiteFooterProps {
  site: SiteConfig;
}

export function SiteFooter({ site }: SiteFooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-border/60 bg-surface/50">
      <Container className="flex flex-col gap-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          © {year} {site.name}. Built with Next.js.
        </p>
        <div className="flex flex-wrap gap-4">
          {site.social.linkedin && (
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted hover:text-accent transition-colors"
            >
              LinkedIn
            </a>
          )}
          {site.social.github && (
            <a
              href={site.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted hover:text-accent transition-colors"
            >
              GitHub
            </a>
          )}
          {site.social.tableau && (
            <a
              href={site.social.tableau}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted hover:text-accent transition-colors"
            >
              Tableau Public
            </a>
          )}
        </div>
      </Container>
    </footer>
  );
}
