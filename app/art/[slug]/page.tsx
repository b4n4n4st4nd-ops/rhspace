import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/SiteChrome";
import { Badge } from "@/components/ui/Badge";
import { getArtBySlug, getArtMdx, getArtSlugs } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getArtSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const piece = getArtBySlug(slug);
  if (!piece) return {};
  return createMetadata({
    title: piece.title,
    description: piece.summary,
    path: `/art/${slug}`,
  });
}

export default async function ArtDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const piece = getArtBySlug(slug);
  if (!piece) notFound();

  const mdx = await getArtMdx(slug);

  return (
    <>
      <section className="border-b border-border/60 bg-surface/30 py-16">
        <Container>
          <Link
            href="/art"
            className="text-sm text-muted hover:text-accent-warm transition-colors"
          >
            ← Art
          </Link>
          <div className="mt-6 flex flex-wrap gap-2">
            <Badge>{piece.medium}</Badge>
            {piece.tools.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
          <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">
            {piece.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">{piece.summary}</p>
        </Container>
      </section>
      {piece.images && piece.images.length > 0 && (
        <div className="relative aspect-[21/9] w-full overflow-hidden border-b border-border">
          <Image
            src={piece.images[0]}
            alt={piece.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
      )}
      <Container className="py-16">
        {mdx ? (
          <div className="prose-site max-w-none">{mdx}</div>
        ) : (
          <p className="text-muted">Details coming soon.</p>
        )}
      </Container>
    </>
  );
}
