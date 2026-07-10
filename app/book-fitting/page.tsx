import { Container } from "@/components/layout/SiteChrome";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getSiteConfig } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Book a Fitting",
  description:
    "Request a certified Titleist club fitting with Joe around Oak Ridge Country Club and Deer Park Country Club in Illinois.",
  path: "/book-fitting",
});

const fittingTypes = [
  {
    title: "Driver and woods",
    body: "Work through launch, spin, forgiveness, shaft feel, and the clubs that can help you hit more useful tee shots.",
  },
  {
    title: "Irons and hybrids",
    body: "Review distance gaps, ball flight, set makeup, and the mix of irons or hybrids that best fits your game.",
  },
  {
    title: "Wedges and scoring clubs",
    body: "Talk through loft gapping, turf interaction, short-game needs, and the shots you want around the green.",
  },
];

const steps = [
  "Tell Joe what you are playing now and what you want to improve.",
  "Bring your current clubs so the fitting can compare real options.",
  "Review recommendations in plain language before making a club decision.",
];

export default function BookFittingPage() {
  const site = getSiteConfig();
  const bookingEmail = `mailto:${site.email}?subject=Book%20a%20golf%20club%20fitting`;

  return (
    <>
      <PageHero
        title="Book a fitting"
        subtitle="Get Titleist-certified fitting help for your next driver, iron, wedge, hybrid, or full bag decision."
      >
        <div className="flex flex-wrap gap-4">
          <Button href={bookingEmail}>Email Joe to book</Button>
          <Button href="/clubs-for-sale" variant="secondary">
            See clubs for sale
          </Button>
        </div>
      </PageHero>

      <Container as="section" className="py-16 sm:py-24">
        <SectionHeading
          eyebrow="Fitting options"
          title="Choose the part of the bag that needs attention"
          description="A fitting can focus on one problem club, a section of the bag, or the full setup depending on what you are trying to improve."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {fittingTypes.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-border bg-surface p-6"
            >
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </Container>

      <section className="border-y border-border/60 bg-surface/50">
        <Container className="grid gap-10 py-16 sm:py-20 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="How it works"
              title="Simple, practical, and built around your game"
              description="Joe keeps the process focused on better decisions, not a complicated equipment lecture."
            />
          </div>
          <ol className="space-y-4">
            {steps.map((step, index) => (
              <li
                key={step}
                className="rounded-2xl border border-border bg-background p-5"
              >
                <span className="font-mono text-xs uppercase tracking-widest text-accent">
                  Step {index + 1}
                </span>
                <p className="mt-2 text-muted">{step}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <Container as="section" className="py-16 text-center sm:py-24">
        <h2 className="text-2xl font-semibold sm:text-3xl">
          Ready to schedule?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted">
          Email Joe with your preferred club, your usual availability, and
          whether you are closer to Oak Ridge Country Club or Deer Park Country
          Club.
        </p>
        <div className="mt-8">
          <Button href={bookingEmail}>Email {site.email}</Button>
        </div>
      </Container>
    </>
  );
}
