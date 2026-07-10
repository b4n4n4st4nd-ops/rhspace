import { Container } from "@/components/layout/SiteChrome";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillPills } from "@/components/ui/SkillPills";
import { getSiteConfig } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Certified Titleist Club Fitting",
  description:
    "Book a Titleist club fitting or shop quality golf clubs for sale around Oak Ridge Country Club and Deer Park Country Club in Illinois.",
  path: "/",
});

const fittingHighlights = [
  "Titleist-certified fitting guidance",
  "Driver, woods, hybrids, irons, wedges, and set makeup",
  "Friendly recommendations based on your swing and goals",
];

const serviceCards = [
  {
    title: "Book a fitting",
    body: "Dial in the right club setup with a practical fitting conversation built around ball flight, feel, goals, and confidence.",
    href: "/book-fitting",
    cta: "Start booking",
  },
  {
    title: "Shop clubs for sale",
    body: "Browse available new and used golf clubs, ask about current inventory, and get help deciding what belongs in the bag.",
    href: "/clubs-for-sale",
    cta: "See clubs",
  },
  {
    title: "Ask Joe",
    body: "Not sure whether you need a full fitting, a wedge gap check, or a better used-club option? Send a quick note.",
    href: "mailto:joe@joesgolfclub.com?subject=Golf%20club%20question",
    cta: "Email Joe",
  },
];

export default function HomePage() {
  const site = getSiteConfig();

  return (
    <>
      <section className="mesh-bg border-b border-border/60">
        <Container
          as="section"
          className="grid gap-10 py-20 sm:py-28 lg:grid-cols-[1.2fr_0.8fr] lg:items-center"
        >
          <FadeIn>
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-accent">
              {site.title}
            </p>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl">
              Better golf starts with{" "}
              <span className="gradient-text">clubs that fit you</span>.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              {site.tagline}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/book-fitting">Book a fitting</Button>
              <Button href="/clubs-for-sale" variant="secondary">
                See clubs for sale
              </Button>
            </div>
          </FadeIn>

          <FadeIn>
            <aside className="rounded-3xl border border-border bg-surface/80 p-6 shadow-sm">
              <p className="font-mono text-xs uppercase tracking-widest text-accent">
                Serving Illinois golfers
              </p>
              <h2 className="mt-3 text-2xl font-semibold">
                Oak Ridge Country Club and Deer Park Country Club
              </h2>
              <ul className="mt-6 space-y-3 text-sm text-muted">
                {fittingHighlights.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </FadeIn>
        </Container>
      </section>

      <Container as="section" className="py-16 sm:py-24">
        <SectionHeading
          eyebrow="What you can do here"
          title="A simple path to better equipment"
          description="Use the site to schedule fitting help, review available clubs, and connect with Joe before your next round."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {serviceCards.map((card) => (
            <article
              key={card.title}
              className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6"
            >
              <h3 className="text-xl font-semibold">{card.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                {card.body}
              </p>
              <a
                href={card.href}
                className="mt-6 text-sm font-medium text-accent hover:underline"
              >
                {card.cta}
              </a>
            </article>
          ))}
        </div>
      </Container>

      <section className="border-y border-border/60 bg-surface/50">
        <Container className="grid gap-10 py-16 sm:py-20 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Fitting focus"
              title="Titleist expertise with a player-first approach"
              description="A good club recommendation should make sense to the golfer holding it. Joe keeps the fitting conversation clear, practical, and focused on what helps your game."
            />
            <SkillPills skills={site.skills} />
          </div>
          <div className="rounded-3xl border border-border bg-background p-6">
            <h3 className="text-xl font-semibold">What to bring</h3>
            <ul className="mt-5 space-y-4 text-sm leading-relaxed text-muted">
              <li>Your current clubs, especially the club you want to improve.</li>
              <li>A few notes on your usual miss and what feels uncomfortable.</li>
              <li>Your goals, from more distance to better gapping or consistency.</li>
            </ul>
          </div>
        </Container>
      </section>

      <Container as="section" className="py-16 sm:py-24 text-center">
        <h2 className="text-2xl font-semibold sm:text-3xl">
          Ready to find clubs that fit?
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-muted">
          Book a fitting, browse available clubs, or send Joe a note at{" "}
          <a
            href={`mailto:${site.email}`}
            className="text-accent hover:underline"
          >
            {site.email}
          </a>
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button href="/book-fitting">Book a fitting</Button>
          <Button href="/about" variant="secondary">
            About Joe
          </Button>
        </div>
      </Container>
    </>
  );
}
