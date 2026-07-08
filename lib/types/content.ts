export type ProjectCategory =
  | "visualization"
  | "analytics"
  | "automation"
  | "ai";

export type ProjectKind = "case-study" | "dashboard";

export type DashboardStatus = "draft" | "published";

export type DashboardDesignVersion = "report-card-v1" | "report-card-v2";

export interface ProjectLinks {
  live?: string;
  repo?: string;
}

export interface Project {
  slug: string;
  title: string;
  kind?: ProjectKind;
  /** Dashboard visibility — draft items stay in repo but hide from portfolio grid. */
  status?: DashboardStatus;
  /** Shell/layout design direction applied by DashboardShell. */
  designVersion?: DashboardDesignVersion;
  /** Short taxonomy label, e.g. "marketing-performance", "executive-kpi". */
  dashboardType?: string;
  /** Capability labels for filtering and future portfolio UX. */
  capabilityTags?: string[];
  /** Lower numbers surface first among dashboards; case studies fall back to date. */
  displayOrder?: number;
  /** Key into lib/dashboards/registry.ts */
  componentKey?: string;
  /** Folder under content/data/dashboards/ */
  dataPath?: string;
  category: ProjectCategory;
  tools: string[];
  featured: boolean;
  thumbnail: string;
  summary: string;
  links?: ProjectLinks;
  date?: string;
}

export interface ArtPiece {
  slug: string;
  title: string;
  medium: string;
  tools: string[];
  featured: boolean;
  thumbnail: string;
  summary: string;
  images?: string[];
  video?: string;
  date?: string;
}

export interface EnsoImage {
  src: string;
  alt: string;
}

export interface PoetryNft {
  title: string;
  imageUrl: string;
  openseaUrl: string;
  poem?: string;
  excerpt?: string;
}

export interface PoetryCollection {
  collectionUrl: string;
  collectionDescription: string;
  items: PoetryNft[];
}

export interface ArtProjectCard {
  title: string;
  tag?: string;
  body: string;
  image?: string | null;
  tags: string[];
}

export interface ArtImage {
  src: string;
  alt: string;
}

export interface ArtSpec {
  label: string;
  value: string;
}

export interface ArtPageConfig {
  hero: {
    title: string;
    body: string;
    ctaPrimary: { label: string; href: string };
    ctaSecondary: { label: string; href: string };
  };
  painting: {
    title: string;
    subtitle: string;
    body: string;
    images: EnsoImage[];
  };
  poetry: {
    title: string;
    subtitle: string;
    body: string;
    collectedHaiku: {
      title: string;
      body: string;
      collectionUrl: string;
      collectionButtonLabel: string;
    };
  };
  story: {
    title: string;
    subtitle: string;
    projects: ArtProjectCard[];
  };
  digitalArt: {
    title: string;
    subtitle: string;
    highlightPhrase: string;
    projects: ArtProjectCard[];
  };
  music: {
    title: string;
    subtitle: string;
    body: string;
    highlight: string;
    signalChain: string[];
    image: ArtImage;
    detailSlug: string;
  };
  installation: {
    title: string;
    projectTitle: string;
    body: string;
    image: ArtImage;
    specs: ArtSpec[];
    detailSlug: string;
  };
  closing: {
    title: string;
    body: string;
  };
}

export interface LabDemo {
  slug: string;
  title: string;
  type: "agent" | "streamlit" | "embed";
  summary: string;
  thumbnail?: string;
  embedUrl?: string;
  featured: boolean;
}

export interface ResumeExperience {
  company: string;
  role: string;
  start: string;
  end: string;
  location?: string;
  highlights: string[];
}

export interface ResumeEducation {
  institution: string;
  degree: string;
  year: string;
}

export interface ResumeData {
  name: string;
  title: string;
  summary: string;
  email: string;
  phone?: string;
  linkedin?: string;
  skills: string[];
  experience: ResumeExperience[];
  education: ResumeEducation[];
}

export interface SiteConfig {
  name: string;
  title: string;
  tagline: string;
  url: string;
  email: string;
  social: {
    linkedin?: string;
    github?: string;
    tableau?: string;
  };
  skills: string[];
  nav: { label: string; href: string }[];
}

export interface AboutContent {
  title: string;
  subtitle: string;
  body: string;
}
