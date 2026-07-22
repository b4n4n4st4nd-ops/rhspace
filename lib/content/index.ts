import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import { groupProjectsByPractice, isVisibleInPortfolioGrid } from "@/lib/dashboards/project";
import type {
  AboutContent,
  ArtPageConfig,
  ArtPiece,
  LabDemo,
  PoetryCollection,
  PrimaryPractice,
  Project,
  ResumeData,
  SiteConfig,
} from "@/lib/types/content";

const contentDir = path.join(process.cwd(), "content");

function readJsonFile<T>(filePath: string): T {
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

export function getSiteConfig(): SiteConfig {
  return readJsonFile<SiteConfig>(path.join(contentDir, "site.json"));
}

function sortProjects(a: Project, b: Project): number {
  const aOrder = a.displayOrder ?? Number.POSITIVE_INFINITY;
  const bOrder = b.displayOrder ?? Number.POSITIVE_INFINITY;
  if (aOrder !== bOrder) return aOrder - bOrder;
  return (b.date ?? "").localeCompare(a.date ?? "");
}

export function getProjects(): Project[] {
  const dir = path.join(contentDir, "portfolio");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => readJsonFile<Project>(path.join(dir, f)))
    .sort(sortProjects);
}

/** Portfolio grid and featured sections — hides draft dashboards. */
export function getPublishedProjects(): Project[] {
  return getProjects().filter(isVisibleInPortfolioGrid);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return getPublishedProjects().filter((p) => p.featured);
}

export function getPublishedProjectsByPractice(): Record<
  PrimaryPractice,
  Project[]
> {
  return groupProjectsByPractice(getPublishedProjects());
}

export async function getProjectMdx(slug: string) {
  const mdxPath = path.join(contentDir, "portfolio", `${slug}.mdx`);
  if (!fs.existsSync(mdxPath)) return null;
  const source = fs.readFileSync(mdxPath, "utf-8");
  const { content } = await compileMDX({
    source,
    options: { parseFrontmatter: true },
  });
  return content;
}

export function getArtPieces(): ArtPiece[] {
  const dir = path.join(contentDir, "art");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => readJsonFile<ArtPiece>(path.join(dir, f)))
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}

export function getArtBySlug(slug: string): ArtPiece | undefined {
  return getArtPieces().find((a) => a.slug === slug);
}

export function getArtPageConfig(): ArtPageConfig {
  return readJsonFile<ArtPageConfig>(path.join(contentDir, "art-page.json"));
}

export function getPoetryCollection(): PoetryCollection {
  return readJsonFile<PoetryCollection>(path.join(contentDir, "poetry.json"));
}

export async function getArtMdx(slug: string) {
  const mdxPath = path.join(contentDir, "art", `${slug}.mdx`);
  if (!fs.existsSync(mdxPath)) return null;
  const source = fs.readFileSync(mdxPath, "utf-8");
  const { content } = await compileMDX({
    source,
    options: { parseFrontmatter: true },
  });
  return content;
}

export function getLabDemos(): LabDemo[] {
  const dir = path.join(contentDir, "lab");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => readJsonFile<LabDemo>(path.join(dir, f)));
}

export function getLabDemoBySlug(slug: string): LabDemo | undefined {
  return getLabDemos().find((d) => d.slug === slug);
}

export function getResume(): ResumeData {
  return readJsonFile<ResumeData>(path.join(contentDir, "resume.json"));
}

export function getAbout(): AboutContent {
  const mdxPath = path.join(contentDir, "about.mdx");
  const raw = fs.readFileSync(mdxPath, "utf-8");
  const { data, content } = matter(raw);
  return {
    title: (data.title as string) ?? "About",
    subtitle: (data.subtitle as string) ?? "",
    body: content.trim(),
  };
}

export async function getAboutMdx() {
  const mdxPath = path.join(contentDir, "about.mdx");
  const source = fs.readFileSync(mdxPath, "utf-8");
  const { content } = await compileMDX({
    source,
    options: { parseFrontmatter: true },
  });
  return content;
}

export function getProjectSlugs(): string[] {
  return getProjects().map((p) => p.slug);
}

export function getArtSlugs(): string[] {
  return getArtPieces().map((a) => a.slug);
}

export function getLabSlugs(): string[] {
  return getLabDemos().map((d) => d.slug);
}
