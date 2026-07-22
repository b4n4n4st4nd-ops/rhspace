import Link from "next/link";
import { Container } from "@/components/layout/SiteChrome";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillPills } from "@/components/ui/SkillPills";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { getFeaturedProjects, getSiteConfig } from "@/lib/content";

export default function HomePage() {
  const site = getSiteConfig();
  const featured = getFeaturedProjects().slice(0, 3);

  return (
    <>
      <section className="mesh-bg border-b border-border/60">
        <Container as="section" className="py-20 sm:py-32">
          <FadeIn>
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-accent">
              {site.title}
            </p>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
              I build bridges between{" "}
              <span className="gradient-text">possibility and reality</span>.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted leading-relaxed">
              {site.tagline}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/portfolio">View portfolio</Button>
              <Button href="/resume" variant="secondary">
                Resume
              </Button>
            </div>
          </FadeIn>
        </Container>
      </section>

      <Container as="section" className="py-16 sm:py-24">
        <SectionHeading
          eyebrow="Featured work"
          title="Selected projects"
          description="Examples across BI reporting, web products, and interactive demos"
        />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
        <p className="mt-8">
          <Link
            href="/portfolio"
            className="text-sm text-accent hover:underline"
          >
            See all projects →
          </Link>
        </p>
      </Container>

      <section className="border-y border-border/60 bg-surface/50">
        <Container className="py-16 sm:py-20">
          <SectionHeading
            eyebrow="Toolkit"
            title="Platform-agnostic, outcome-focused"
          />
          <SkillPills skills={site.skills} />
        </Container>
      </section>

      <Container as="section" className="py-16 sm:py-24 text-center">
        <h2 className="text-2xl font-semibold sm:text-3xl">
          Let&apos;s build something
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-muted">
          Explore the lab for live demos, or reach out via{" "}
          <a
            href={`mailto:${site.email}`}
            className="text-accent hover:underline"
          >
            {site.email}
          </a>
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button href="/lab">Open lab</Button>
          <Button href="/about" variant="secondary">
            About me
          </Button>
        </div>
      </Container>
    </>
  );
}
