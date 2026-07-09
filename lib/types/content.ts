export type ProjectCategory =
  | "visualization"
  | "analytics"
  | "automation"
  | "ai";

export type ProjectKind = "case-study" | "dashboard";

export type ProjectStatus = "draft" | "published";

export type DashboardDesignVersion = "report-card-v1" | "report-card-v2";

export interface ProjectLinks {
  live?: string;
  repo?: string;
}

export interface Project {
  slug: string;
  title: string;
  kind: ProjectKind;
  /** draft hides from portfolio grid; published shows. Case studies default to published. */
  status: ProjectStatus;
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

export interface AudioVisualProject {
  title: string;
  body: string;
  video: { src: string };
  workspaceImage: ArtImage;
}

export interface MusicProductionProject {
  title: string;
  audio: { src: string; title: string };
}

export interface ArtPageConfig {
  hero: {
    title: string;
    body: string;
  };
  nav: { label: string; href: string }[];
  audioVisualDesign: {
    title: string;
    visualReactiveAudioWizard: AudioVisualProject;
  };
  musicProduction: {
    title: string;
    audio: { src: string; title: string };
  };
  painting: {
    title: string;
    enso: {
      title: string;
      body: string;
      images: EnsoImage[];
    };
  };
  writing: {
    title: string;
    poetry: {
      title: string;
      haiku: {
        title: string;
      };
    };
    storyAndScript: {
      title: string;
      projects: ArtProjectCard[];
    };
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
