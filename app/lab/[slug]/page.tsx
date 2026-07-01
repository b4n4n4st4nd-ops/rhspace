import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/SiteChrome";
import { DemoFrame } from "@/components/lab/DemoFrame";
import { getLabDemoBySlug, getLabDemos } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getLabDemos()
    .filter((d) => d.type === "streamlit" || d.type === "embed")
    .map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const demo = getLabDemoBySlug(slug);
  if (!demo) return {};
  return createMetadata({
    title: demo.title,
    description: demo.summary,
    path: `/lab/${slug}`,
  });
}

export default async function LabDemoPage({ params }: PageProps) {
  const { slug } = await params;
  const demo = getLabDemoBySlug(slug);

  if (!demo || demo.type === "agent") notFound();
  if (!demo.embedUrl) notFound();

  return (
    <>
      <section className="border-b border-border/60 py-12">
        <Container>
          <Link
            href="/lab"
            className="text-sm text-muted hover:text-accent transition-colors"
          >
            ← Lab
          </Link>
          <h1 className="mt-4 text-2xl font-semibold sm:text-3xl">
            {demo.title}
          </h1>
          <p className="mt-3 max-w-2xl text-muted">{demo.summary}</p>
        </Container>
      </section>
      <Container className="py-12">
        <DemoFrame title={demo.title} embedUrl={demo.embedUrl} />
      </Container>
    </>
  );
}
