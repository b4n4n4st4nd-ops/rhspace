# ryanhambleton.space — Architecture

## Overview

Personal portfolio built with **Next.js 16 App Router**, **React 19**, **Tailwind CSS v4**, and a **hybrid JSON + MDX** content layer. Static pages are generated at build time; interactive demos live under `/lab`.

## Routes

| Route | Type | Data source |
|-------|------|-------------|
| `/` | Static | `content/site.json`, featured portfolio JSON |
| `/about` | Static | `content/about.mdx` |
| `/portfolio` | Static | `content/portfolio/*.json` |
| `/portfolio/[slug]` | SSG | JSON metadata + `*.mdx` case study |
| `/art` | Static | `content/art/*.json` |
| `/art/[slug]` | SSG | JSON + `*.mdx` |
| `/resume` | Static | `content/resume.json` |
| `/lab` | Static index | `content/lab/*.json` |
| `/lab/agent-shell` | Client + API | `app/api/agent/route.ts` |
| `/lab/[slug]` | Dynamic | iframe embed for Streamlit demos |

## Content model

- **JSON** — filterable metadata (title, tools, category, thumbnail, links)
- **MDX** — STAR-structured case studies (Situation, Task, Action, Result)
- **Loaders** — `lib/content/index.ts` reads files at build time

## Component map

```
components/
  layout/     SiteHeader, SiteFooter, ThemeToggle
  ui/         Button, Badge, SectionHeading, PageHero, SkillPills
  portfolio/  ProjectCard, ProjectGrid, FilterBar
  art/        ArtGallery
  resume/     Timeline
  lab/        AgentChat, AgentLogsPanel, DemoCard, DemoFrame
```

## V2 agent demo pattern

```
Browser (AgentChat) → POST /api/agent → OpenAI gpt-4o-mini OR mock mode
```

- API keys in `OPENAI_API_KEY` (server-only)
- `AGENT_DEMO_MODE=mock` for interview-safe hardcoded responses
- Agent logs returned as structured JSON for the expandable Logs panel

## Streamlit embed pattern

Deploy app to Streamlit Community Cloud → set `embedUrl` in `content/lab/*.json` → `/lab/[slug]` renders `DemoFrame` iframe.

## Deployment

GitHub → Vercel → `ryanhambleton.space`. See [deployment.md](./deployment.md).
