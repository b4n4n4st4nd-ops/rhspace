import { Container } from "@/components/layout/SiteChrome";
import { PageHero } from "@/components/ui/PageHero";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { getPublishedProjects } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Portfolio",
  description:
    "BI, visualization, analytics engineering, and AI projects — Tableau, Alteryx, SQL, Python.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  const projects = getPublishedProjects();

  return (
    <>
      <PageHero
        title="Portfolio"
        subtitle="Interactive dashboard demos with fictional data. Draft items are hidden until a visual is ready."
      />
      <Container className="py-16">
        <PortfolioGrid projects={projects} />
      </Container>
    </>
  );
}
