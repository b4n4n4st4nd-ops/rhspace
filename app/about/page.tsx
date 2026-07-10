import { Container } from "@/components/layout/SiteChrome";
import { PageHero } from "@/components/ui/PageHero";
import { SkillPills } from "@/components/ui/SkillPills";
import { getAboutMdx, getSiteConfig } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "About Joe",
  description:
    "Meet Joe, a certified Titleist club fitter and golf club seller serving Oak Ridge Country Club and Deer Park Country Club golfers in Illinois.",
  path: "/about",
});

export default async function AboutPage() {
  const site = getSiteConfig();
  const content = await getAboutMdx();

  return (
    <>
      <PageHero
        title="About Joe"
        subtitle="Certified Titleist club fitting and practical golf club guidance for players around Oak Ridge Country Club and Deer Park Country Club."
      />
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr]">
          <div className="prose-site max-w-none">{content}</div>
          <aside className="rounded-3xl border border-border bg-surface p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-accent">
              Local fitting help
            </p>
            <h2 className="mt-3 text-2xl font-semibold">
              Built around better decisions
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Joe helps golfers understand what changes matter, what can wait,
              and which clubs are worth trying before they buy.
            </p>
          </aside>
        </div>
        <section className="mt-16 border-t border-border pt-16">
          <h2 className="mb-6 text-xl font-semibold">Fitting and sales focus</h2>
          <SkillPills skills={site.skills} />
        </section>
      </Container>
    </>
  );
}
