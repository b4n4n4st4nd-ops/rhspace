import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/SiteChrome";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  getProjectBySlug,
  getProjectMdx,
  getProjectSlugs,
} from "@/lib/content";
import { createMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return createMetadata({
    title: project.title,
    description: project.summary,
    path: `/portfolio/${slug}`,
  });
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const mdx = await getProjectMdx(slug);

  return (
    <>
      <section className="mesh-bg border-b border-border/60 py-16">
        <Container>
          <Link
            href="/portfolio"
            className="text-sm text-muted hover:text-accent transition-colors"
          >
            ← Portfolio
          </Link>
          <div className="mt-6 flex flex-wrap gap-2">
            <Badge>{project.category}</Badge>
            {project.tools.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
          <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">{project.summary}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {project.links?.live && (
              <Button
                href={project.links.live}
                external={project.links.live.startsWith("http")}
              >
                View live
              </Button>
            )}
            {project.links?.repo && (
              <Button href={project.links.repo} external variant="secondary">
                Repository
              </Button>
            )}
          </div>
        </Container>
      </section>
      <Container className="py-16">
        {mdx ? (
          <div className="prose-site max-w-none">{mdx}</div>
        ) : (
          <p className="text-muted">Case study coming soon.</p>
        )}
      </Container>
    </>
  );
}
