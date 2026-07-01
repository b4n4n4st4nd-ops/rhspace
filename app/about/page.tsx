import { Container } from "@/components/layout/SiteChrome";
import { PageHero } from "@/components/ui/PageHero";
import { SkillPills } from "@/components/ui/SkillPills";
import { getAboutMdx, getSiteConfig } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "About",
  description:
    "Visualization developer and analytics engineer — from dashboards to AI-driven workflows.",
  path: "/about",
});

export default async function AboutPage() {
  const site = getSiteConfig();
  const content = await getAboutMdx();

  return (
    <>
      <PageHero
        title="About me"
        subtitle="From reactive dashboarding to AI-driven workflows — building systems that help people see and decide."
      />
      <Container className="py-16">
        <div className="prose-site max-w-none">{content}</div>
        <section className="mt-16 border-t border-border pt-16">
          <h2 className="mb-6 text-xl font-semibold">Core skills</h2>
          <SkillPills skills={site.skills} />
        </section>
      </Container>
    </>
  );
}
