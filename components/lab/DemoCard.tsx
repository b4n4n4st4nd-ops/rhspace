import Link from "next/link";
import Image from "next/image";
import type { LabDemo } from "@/lib/types/content";

interface DemoCardProps {
  demo: LabDemo;
}

function demoHref(demo: LabDemo): string {
  if (demo.type === "agent") return `/lab/${demo.slug}`;
  return `/lab/${demo.slug}`;
}

export function DemoCard({ demo }: DemoCardProps) {
  return (
    <Link
      href={demoHref(demo)}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-all hover:border-accent/40"
    >
      {demo.thumbnail && (
        <div className="relative aspect-[16/10] overflow-hidden bg-border/30">
          <Image
            src={demo.thumbnail}
            alt=""
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-2 p-5">
        <span className="font-mono text-xs uppercase text-accent">
          {demo.type}
        </span>
        <h3 className="text-lg font-semibold group-hover:text-accent transition-colors">
          {demo.title}
        </h3>
        <p className="text-sm text-muted">{demo.summary}</p>
      </div>
    </Link>
  );
}
