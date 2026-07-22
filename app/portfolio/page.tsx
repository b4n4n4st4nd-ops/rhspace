import { Container } from "@/components/layout/SiteChrome";
import { PageHero } from "@/components/ui/PageHero";
import { PortfolioPracticeSections } from "@/components/portfolio/PortfolioPracticeSections";
import { getPublishedProjectsByPractice } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Portfolio",
  description:
    "AI product development, BI reporting and visualization, solution architecture, and web and app development.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  const projectsByPractice = getPublishedProjectsByPractice();

  return (
    <>
      <PageHero
        title="Portfolio"
        subtitle="Four practices: AI product development, BI reporting and visualization, solution architecture, and web and app development. Primary practice places each project; tags show the wider skills involved."
      />
      <Container className="py-16">
        <PortfolioPracticeSections projectsByPractice={projectsByPractice} />
      </Container>
    </>
  );
}
