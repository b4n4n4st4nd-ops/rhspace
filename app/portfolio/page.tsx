import { Container } from "@/components/layout/SiteChrome";
import { PageHero } from "@/components/ui/PageHero";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { getProjects } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Portfolio",
  description:
    "BI, visualization, analytics engineering, and AI projects — Tableau, Alteryx, SQL, Python.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  const projects = getProjects();

  return (
    <>
      <PageHero
        title="Portfolio"
        subtitle="Case studies structured with STAR — Situation, Task, Action, Result. Employer work uses clean-room scenarios."
      />
      <Container className="py-16">
        <PortfolioGrid projects={projects} />
      </Container>
    </>
  );
}
