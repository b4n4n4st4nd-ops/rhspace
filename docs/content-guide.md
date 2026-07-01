# Content Guide

## NDA / clean-room rule

For employer work, **never** include proprietary system names, internal metrics, or identifiable client data on the public site. Abstract into generic scenarios (e.g., "global retail inventory routing" instead of specific employer tooling).

## Add a portfolio project

1. Create `content/portfolio/your-slug.json`:

```json
{
  "slug": "your-slug",
  "title": "Project Title",
  "category": "visualization",
  "tools": ["Tableau", "SQL"],
  "featured": false,
  "thumbnail": "/images/portfolio/your-slug.png",
  "summary": "One-line outcome.",
  "date": "2024-06",
  "links": { "live": "https://...", "repo": "https://..." }
}
```

Categories: `visualization` | `analytics` | `automation` | `ai`

2. Create `content/portfolio/your-slug.mdx` using STAR:

```mdx
## Situation
Business context...

## Task
What you were asked to deliver...

## Action
Tools, architecture, your contributions...

## Result
Quantified outcomes...
```

3. Add thumbnail to `public/images/portfolio/`
4. Run `npm run build` to verify

## Add an art project

Same pattern under `content/art/` with `medium` instead of `category`.

## Add a lab demo

Create `content/lab/your-slug.json`:

```json
{
  "slug": "your-slug",
  "title": "Demo Title",
  "type": "streamlit",
  "summary": "What it demonstrates.",
  "embedUrl": "https://your-app.streamlit.app",
  "featured": true
}
```

Types: `agent` | `streamlit` | `embed`

For agent demos, use a dedicated page under `app/lab/your-slug/page.tsx` instead of the dynamic embed route.
