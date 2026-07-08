import Image from "next/image";
import { Container } from "@/components/layout/SiteChrome";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { ArtSection } from "@/components/art/ArtSection";
import { ArtProjectCardDisplay } from "@/components/art/ArtProjectCard";
import { EnsoGallery } from "@/components/art/EnsoGallery";
import { PoetryGallery } from "@/components/art/PoetryGallery";
import { SignalChainDiagram } from "@/components/art/SignalChainDiagram";
import { InstallationSpecs } from "@/components/art/InstallationSpecs";
import { getArtPageConfig, getPoetryCollection } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Art",
  description:
    "Art, ritual, story, and interactive worlds — painting, poetry, worldbuilding, digital art, music, and installation.",
  path: "/art",
});

export default function ArtPage() {
  const page = getArtPageConfig();
  const poetry = getPoetryCollection();

  return (
    <>
      <PageHero title={page.hero.title}>
        <p className="max-w-3xl text-lg text-muted leading-relaxed">
          {page.hero.body}
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button href={page.hero.ctaPrimary.href}>
            {page.hero.ctaPrimary.label}
          </Button>
          <Button href={page.hero.ctaSecondary.href} variant="secondary">
            {page.hero.ctaSecondary.label}
          </Button>
        </div>
      </PageHero>

      <Container className="py-16 sm:py-20 space-y-0">
        <ArtSection
          id="painting"
          title={page.painting.title}
          subtitle={page.painting.subtitle}
          body={page.painting.body}
          bordered={false}
        >
          <EnsoGallery images={page.painting.images} />
        </ArtSection>

        <ArtSection
          id="poetry"
          title={page.poetry.title}
          subtitle={page.poetry.subtitle}
          body={page.poetry.body}
        >
          <PoetryGallery
            collection={poetry}
            subsectionTitle={page.poetry.collectedHaiku.title}
            subsectionBody={page.poetry.collectedHaiku.body}
            collectionButtonLabel={
              page.poetry.collectedHaiku.collectionButtonLabel
            }
          />
        </ArtSection>

        <ArtSection
          id="story"
          title={page.story.title}
          subtitle={page.story.subtitle}
        >
          <div className="grid gap-6">
            {page.story.projects.map((project) => (
              <ArtProjectCardDisplay key={project.title} project={project} />
            ))}
          </div>
        </ArtSection>

        <ArtSection
          id="digital-art"
          title={page.digitalArt.title}
          subtitle={page.digitalArt.subtitle}
        >
          <div className="grid gap-6">
            {page.digitalArt.projects.map((project) => (
              <ArtProjectCardDisplay
                key={project.title}
                project={project}
                highlightPhrase={page.digitalArt.highlightPhrase}
              />
            ))}
          </div>
        </ArtSection>

        <ArtSection
          id="music"
          title={page.music.title}
          subtitle={page.music.subtitle}
          body={page.music.body}
        >
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div className="overflow-hidden rounded-xl border border-border">
              <div className="relative aspect-[4/3]">
                <Image
                  src={page.music.image.src}
                  alt={page.music.image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
            <div>
              <p className="text-muted leading-relaxed">{page.music.highlight}</p>
              <div className="mt-8">
                <p className="mb-4 font-mono text-xs uppercase tracking-widest text-accent-warm">
                  Technical flow
                </p>
                <SignalChainDiagram steps={page.music.signalChain} />
              </div>
              <div className="mt-8">
                <Button
                  href={`/art/${page.music.detailSlug}`}
                  variant="secondary"
                >
                  View case study
                </Button>
              </div>
            </div>
          </div>
        </ArtSection>

        <ArtSection
          id="interactive-installation"
          title={page.installation.title}
        >
          <div className="space-y-10">
            <div className="max-w-3xl">
              <h3 className="text-xl font-semibold sm:text-2xl">
                {page.installation.projectTitle}
              </h3>
              <p className="mt-4 text-muted leading-relaxed">
                {page.installation.body}
              </p>
            </div>

            <div className="overflow-hidden rounded-xl border border-border">
              <div className="relative aspect-[21/9]">
                <Image
                  src={page.installation.image.src}
                  alt={page.installation.image.alt}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
            </div>

            <div>
              <h4 className="mb-6 font-mono text-xs uppercase tracking-widest text-accent-warm">
                What I Built
              </h4>
              <InstallationSpecs specs={page.installation.specs} />
            </div>

            <Button href={`/art/${page.installation.detailSlug}`}>
              Full installation case study
            </Button>
          </div>
        </ArtSection>

        <section
          id="creative-practice"
          className="border-t border-border pt-16 sm:pt-20 scroll-mt-24"
        >
          <div className="rounded-2xl border border-border bg-surface/50 px-8 py-12 sm:px-12 sm:py-16 text-center">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {page.closing.title}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-muted leading-relaxed">
              {page.closing.body}
            </p>
          </div>
        </section>
      </Container>
    </>
  );
}
