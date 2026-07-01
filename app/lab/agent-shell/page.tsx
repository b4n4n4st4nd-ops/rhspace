import Link from "next/link";
import { Container } from "@/components/layout/SiteChrome";
import { AgentChat } from "@/components/lab/AgentChat";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Retail Inventory Routing Agent",
  description:
    "Clean-room agent demo with expandable decision logs — portfolio lab project.",
  path: "/lab/agent-shell",
});

export default function AgentShellPage() {
  return (
    <>
      <section className="border-b border-border/60 py-12">
        <Container>
          <Link
            href="/lab"
            className="text-sm text-muted hover:text-accent transition-colors"
          >
            ← Lab
          </Link>
          <h1 className="mt-4 text-3xl font-semibold">
            Retail Inventory Routing Agent
          </h1>
          <p className="mt-3 max-w-2xl text-muted">
            A generic retail scenario for demonstrating agent architecture —
            natural language queries, tool routing, and observable logs. No
            proprietary employer data. Set{" "}
            <code className="font-mono text-xs text-accent">
              AGENT_DEMO_MODE=mock
            </code>{" "}
            for interview-safe responses.
          </p>
        </Container>
      </section>
      <Container className="max-w-2xl py-12">
        <AgentChat />
      </Container>
    </>
  );
}
