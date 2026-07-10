import { Container } from "@/components/layout/SiteChrome";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getSiteConfig } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Clubs for Sale",
  description:
    "Shop quality golf clubs for sale through Joe's Golf Club near Oak Ridge Country Club and Deer Park Country Club in Illinois.",
  path: "/clubs-for-sale",
});

const categories = [
  {
    title: "Drivers and fairway woods",
    body: "Ask about available heads, shafts, lofts, and setup options for more confidence off the tee.",
  },
  {
    title: "Irons and hybrids",
    body: "Find used or new options that match your distance gaps, launch needs, and preferred look at address.",
  },
  {
    title: "Wedges and specialty clubs",
    body: "Review lofts, bounce options, and short-game clubs that can round out the scoring end of your bag.",
  },
];

const buyingNotes = [
  "Inventory changes often, so reach out for the current list.",
  "Joe can help compare a club for sale against what you already play.",
  "If a club is not the right fit, the recommendation will be honest.",
];

export default function ClubsForSalePage() {
  const site = getSiteConfig();
  const inquiryEmail = `mailto:${site.email}?subject=Golf%20clubs%20for%20sale`;

  return (
    <>
      <PageHero
        title="Clubs for sale"
        subtitle="Browse quality golf club options and get practical fitting-minded guidance before you buy."
      >
        <div className="flex flex-wrap gap-4">
          <Button href={inquiryEmail}>Ask for current inventory</Button>
          <Button href="/book-fitting" variant="secondary">
            Book a fitting
          </Button>
        </div>
      </PageHero>

      <Container as="section" className="py-16 sm:py-24">
        <SectionHeading
          eyebrow="Available categories"
          title="Find the right club for the right spot in the bag"
          description="Joe's inventory can include new and used clubs across the bag. Reach out with what you need and he can confirm what is currently available."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {categories.map((category) => (
            <article
              key={category.title}
              className="rounded-2xl border border-border bg-surface p-6"
            >
              <h2 className="text-xl font-semibold">{category.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {category.body}
              </p>
            </article>
          ))}
        </div>
      </Container>

      <section className="border-y border-border/60 bg-surface/50">
        <Container className="grid gap-10 py-16 sm:py-20 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading
              eyebrow="Before you buy"
              title="Equipment guidance comes with the conversation"
              description="A good deal is only a good deal if the club fits the player. Joe can help you think through the tradeoffs before you commit."
            />
          </div>
          <ul className="grid gap-4 sm:grid-cols-3">
            {buyingNotes.map((note) => (
              <li
                key={note}
                className="rounded-2xl border border-border bg-background p-5 text-sm leading-relaxed text-muted"
              >
                {note}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Container as="section" className="py-16 text-center sm:py-24">
        <h2 className="text-2xl font-semibold sm:text-3xl">
          Looking for something specific?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted">
          Email Joe with the club type, loft or set makeup, shaft preference,
          budget range, and whether you would like fitting help before buying.
        </p>
        <div className="mt-8">
          <Button href={inquiryEmail}>Email {site.email}</Button>
        </div>
      </Container>
    </>
  );
}
