import { Container } from "@/components/layout/SiteChrome";
import { PageHero } from "@/components/ui/PageHero";
import { SkillPills } from "@/components/ui/SkillPills";
import { Timeline } from "@/components/resume/Timeline";
import { getResume } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Resume",
  description:
    "Ryan Hambleton — senior visualization and experience manager. Experience, skills, and download.",
  path: "/resume",
});

export default function ResumePage() {
  const resume = getResume();

  return (
    <>
      <PageHero title={resume.name}>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
          <a
            href={`mailto:${resume.email}`}
            className="text-accent hover:underline"
          >
            {resume.email}
          </a>
          {resume.phone && (
            <>
              <span aria-hidden>|</span>
              <a
                href={`tel:${resume.phone.replace(/\D/g, "")}`}
                className="hover:text-accent transition-colors"
              >
                {resume.phone}
              </a>
            </>
          )}
          {resume.linkedin && (
            <>
              <span aria-hidden>|</span>
              <a
                href={resume.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                www.linkedin.com/in/ryanhambleton
              </a>
            </>
          )}
        </p>
        <a
          href="/resume.pdf"
          download
          className="mt-6 inline-flex items-center rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:border-accent/50 transition-colors"
        >
          Download PDF
        </a>
      </PageHero>
      <Container className="py-16">
        <section className="mb-16">
          <h2 className="mb-6 text-xl font-semibold">Summary</h2>
          <p className="max-w-3xl text-muted leading-relaxed">{resume.summary}</p>
        </section>
        <section className="mb-16">
          <h2 className="mb-6 text-xl font-semibold">Core Skills</h2>
          <SkillPills skills={resume.skills} />
        </section>
        <section className="mb-16">
          <h2 className="mb-6 text-xl font-semibold">Experience</h2>
          <Timeline experience={resume.experience} />
        </section>
        <section>
          <h2 className="mb-6 text-xl font-semibold">Education</h2>
          <ul className="space-y-4">
            {resume.education.map((edu) => (
              <li
                key={edu.institution}
                className="rounded-lg border border-border bg-surface p-4"
              >
                <p className="font-semibold">{edu.institution}</p>
                <p className="text-sm text-muted">
                  {edu.degree}
                  {edu.year ? ` · ${edu.year}` : ""}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </>
  );
}
