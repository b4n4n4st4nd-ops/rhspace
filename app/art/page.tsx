import { Container } from "@/components/layout/SiteChrome";
import { PageHero } from "@/components/ui/PageHero";
import { ArtSection } from "@/components/art/ArtSection";
import { ArtPageNav } from "@/components/art/ArtPageNav";
import { EnsoGallery } from "@/components/art/EnsoGallery";
import { PoetryGallery } from "@/components/art/PoetryGallery";
import { MusicProductionPlayer } from "@/components/art/MusicProductionPlayer";
import { VisualReactiveMedia } from "@/components/art/VisualReactiveMedia";
import { getArtPageConfig, getPoetryCollection } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Art",
  description:
    "Audio-visual design, music production, painting, and writing — enso, poetry, and narrative projects.",
  path: "/art",
});

function SubsectionHeading({
  title,
  body,
  level = 3,
}: {
  title: string;
  body?: string;
  level?: 3 | 4;
}) {
  const Tag = level === 4 ? "h4" : "h3";
  const headingClass =
    level === 4
      ? "text-base font-semibold tracking-tight"
      : "text-lg font-semibold tracking-tight sm:text-xl";

  return (
    <div className={level === 4 ? "mb-4" : "mb-8"}>
      <Tag className={headingClass}>{title}</Tag>
      {body?.trim() ? (
        <p className="mt-3 max-w-2xl text-muted leading-relaxed">{body}</p>
      ) : null}
    </div>
  );
}

export default function ArtPage() {
  const page = getArtPageConfig();
  const poetry = getPoetryCollection();
  const wizard = page.audioVisualDesign.visualReactiveAudioWizard;
  const music = page.musicProduction;
  const enso = page.painting.enso;

  return (
    <>
      <PageHero title={page.hero.title}>
        {page.hero.body?.trim() ? (
          <p className="max-w-3xl text-lg text-muted leading-relaxed">
            {page.hero.body}
          </p>
        ) : null}
      </PageHero>

      <Container className="space-y-0 pb-16 sm:pb-20">
        <ArtPageNav items={page.nav} />

        <ArtSection
          id="audio-visual-design"
          title={page.audioVisualDesign.title}
          bordered={false}
          className="pt-12 sm:pt-16"
        >
          <SubsectionHeading title={wizard.title} body={wizard.body} />
          <VisualReactiveMedia
            videoSrc={wizard.video.src}
            audioSrc={music.audio.src}
            workspaceImage={wizard.workspaceImage}
          />
        </ArtSection>

        <ArtSection id="music-production" title={page.musicProduction.title}>
          <MusicProductionPlayer
            audioSrc={music.audio.src}
            title={music.audio.title}
          />
        </ArtSection>

        <ArtSection id="painting" title={page.painting.title}>
          <SubsectionHeading title={enso.title} body={enso.body} />
          <EnsoGallery images={enso.images} />
        </ArtSection>

        <ArtSection id="writing" title={page.writing.title}>
          <div className="space-y-16">
            <div>
              <SubsectionHeading title={page.writing.poetry.title} />
              <PoetryGallery
                collection={poetry}
                subsectionTitle={page.writing.poetry.haiku.title}
              />
            </div>

            <div className="border-t border-border pt-12">
              <SubsectionHeading title={page.writing.storyAndScript.title} />
              <ul className="space-y-6">
                {page.writing.storyAndScript.projects.map((project) => (
                  <li key={project.title}>
                    <SubsectionHeading level={4} title={project.title} body={project.body} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ArtSection>
      </Container>
    </>
  );
}
