# 05 — Your Site File-by-File Reference

Every important file in ryanhambleton-space — what it does and how to customize it.

---

## Content files (edit these first — no React required)

### content/site.json
**Purpose:** Site-wide config.  
**Controls:** Nav menu, name in header, tagline, email, social links, skills on homepage/about.  
**Does NOT control:** Resume page education, big homepage headline (that's in app/page.tsx).  
**Unused fields (you added):** `platforms`, `technicalMethods`, `domainExperience`, `education` — not wired to pages yet.

### content/resume.json
**Purpose:** Resume page data only.  
**Controls:** Jobs, education, skills on `/resume`, email on resume page.

### content/about.mdx
**Purpose:** About page body text (markdown).

### content/portfolio/*.json
**Purpose:** Project card metadata (title, tools, thumbnail, featured flag).  
**One file per project.** Set `"featured": true` to show on homepage.

### content/portfolio/*.mdx
**Purpose:** Case study writeup (STAR format) on detail pages.

### content/art/*.json + *.mdx
**Purpose:** Art gallery — same pattern as portfolio.

### content/lab/*.json
**Purpose:** Lab demo cards on `/lab`.

### public/resume.pdf
**Purpose:** Downloadable resume. Replace with your real PDF.

### public/images/
**Purpose:** Portfolio and art images. Paths referenced in JSON files.

---

## App pages (one per URL)

| File | URL | Customize |
|------|-----|-----------|
| app/page.tsx | / | Homepage hero, section titles, buttons |
| app/about/page.tsx | /about | Page structure; text from about.mdx |
| app/portfolio/page.tsx | /portfolio | Portfolio index |
| app/portfolio/[slug]/page.tsx | /portfolio/x | Case study template |
| app/art/page.tsx | /art | Art gallery |
| app/art/[slug]/page.tsx | /art/x | Art detail |
| app/resume/page.tsx | /resume | Resume layout |
| app/lab/page.tsx | /lab | Demo index |
| app/lab/agent-shell/page.tsx | /lab/agent-shell | Agent chat page |
| app/lab/[slug]/page.tsx | /lab/x | Streamlit iframe embeds |
| app/layout.tsx | (all pages) | Header, footer, site metadata |
| app/globals.css | (all pages) | Colors, fonts, prose styles |
| app/not-found.tsx | 404 | Not found page |
| app/api/agent/route.ts | /api/agent | Agent backend (POST) |

---

## Components

### Layout
| File | Purpose |
|------|---------|
| components/layout/SiteChrome.tsx | Header, footer, Container, nav links |
| components/layout/ThemeToggle.tsx | Dark/light mode button |

### UI building blocks
| File | Purpose |
|------|---------|
| components/ui/Button.tsx | Styled links/buttons |
| components/ui/Badge.tsx | Small tags on cards |
| components/ui/SectionHeading.tsx | Section titles with eyebrow |
| components/ui/PageHero.tsx | Top banner on inner pages |
| components/ui/SkillPills.tsx | Skill tag list |
| components/ui/FadeIn.tsx | Homepage hero animation |

### Feature-specific
| File | Purpose |
|------|---------|
| components/portfolio/ProjectCard.tsx | One portfolio card |
| components/portfolio/PortfolioGrid.tsx | Grid + filters (client) |
| components/art/ArtGallery.tsx | Art project grid |
| components/resume/Timeline.tsx | Job history timeline |
| components/lab/AgentChat.tsx | Chat UI (client) |
| components/lab/AgentLogsPanel.tsx | Expandable agent logs |
| components/lab/DemoCard.tsx | Lab index card |
| components/lab/DemoFrame.tsx | iframe for Streamlit |

---

## Library code (loaders and logic)

| File | Purpose |
|------|---------|
| lib/content/index.ts | Reads all JSON/MDX from content/ |
| lib/types/content.ts | TypeScript interfaces for content |
| lib/seo.ts | Page title/description helpers |
| lib/agent/index.ts | Mock + OpenAI agent logic |

---

## Customization cheat sheet

| I want to change… | Edit this |
|-------------------|-----------|
| Nav links | content/site.json → nav |
| Tagline | content/site.json → tagline |
| Big homepage headline | app/page.tsx (lines ~22–24) |
| Site colors | app/globals.css |
| Add portfolio project | content/portfolio/new-slug.json + .mdx |
| Resume jobs | content/resume.json |
| About story | content/about.mdx |
| Footer social links | content/site.json → social |
| Browser tab title | app/layout.tsx → metadata |
| Agent demo behavior | lib/agent/index.ts, .env.local |

---

## Data flow diagram (your site)

```
content/site.json
       ↓
lib/content/getSiteConfig()
       ↓
app/layout.tsx → SiteHeader, SiteFooter
app/page.tsx   → tagline, skills, email
app/about/page.tsx → skills section
```

```
content/resume.json
       ↓
lib/content/getResume()
       ↓
app/resume/page.tsx → Timeline, education
```

```
content/portfolio/foo.json + foo.mdx
       ↓
lib/content/getProjects() / getProjectMdx()
       ↓
app/portfolio/page.tsx (grid)
app/portfolio/[slug]/page.tsx (case study)
```

---

## Study checkpoint

1. Where do you change the nav menu?
2. Why doesn't education in site.json show on /resume?
3. What file controls the agent chat API?
4. How do you add a new portfolio project?
5. What's the difference between ProjectCard and app/portfolio/page.tsx?

---

## Next document

→ **06 Git, GitHub & Deploy**
