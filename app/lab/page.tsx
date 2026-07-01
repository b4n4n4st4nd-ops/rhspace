import { Container } from "@/components/layout/SiteChrome";
import { PageHero } from "@/components/ui/PageHero";
import { DemoCard } from "@/components/lab/DemoCard";
import { getLabDemos } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Lab",
  description:
    "Live demos — AI agents, Streamlit apps, and interactive prototypes.",
  path: "/lab",
});

export default function LabPage() {
  const demos = getLabDemos();

  return (
    <>
      <PageHero
        title="Lab"
        subtitle="Interactive demos and prototypes. Agent work uses clean-room scenarios with no proprietary data."
      />
      <Container className="py-16">
        <ul className="grid gap-6 sm:grid-cols-2">
          {demos.map((demo) => (
            <li key={demo.slug}>
              <DemoCard demo={demo} />
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
