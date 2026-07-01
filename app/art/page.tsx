import { Container } from "@/components/layout/SiteChrome";
import { PageHero } from "@/components/ui/PageHero";
import { ArtGallery } from "@/components/art/ArtGallery";
import { getArtPieces } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Art",
  description:
    "Creative technology projects — LED installations, generative visuals, and live performance systems.",
  path: "/art",
});

export default function ArtPage() {
  const pieces = getArtPieces();

  return (
    <>
      <PageHero
        title="Art & installations"
        subtitle="Where data, light, and sound meet — creative technology experiments and works in progress."
      />
      <Container className="py-16">
        <ArtGallery pieces={pieces} />
      </Container>
    </>
  );
}
