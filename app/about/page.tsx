import { Container } from "@/components/layout/SiteChrome";
import { PageHero } from "@/components/ui/PageHero";
import { SkillPills } from "@/components/ui/SkillPills";
import { getAboutMdx, getSiteConfig } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "About",
  description:
    "Strategy, data, design, and development — building adaptive experiences that help people and organizations grow.",
  path: "/about",
});

export default async function AboutPage() {
  const site = getSiteConfig();
  const content = await getAboutMdx();

  return (
    <>
      <PageHero title="About me" />
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
