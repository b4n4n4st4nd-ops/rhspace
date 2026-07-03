export type ProjectCategory =
  | "visualization"
  | "analytics"
  | "automation"
  | "ai";

export interface ProjectLinks {
  live?: string;
  repo?: string;
}

export interface Project {
  slug: string;
  title: string;
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
