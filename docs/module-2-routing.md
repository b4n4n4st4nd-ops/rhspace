# Module 2 — Folder = URL

**Concept:** In Next.js App Router, the folder path under `app/` becomes the URL path.

```
app/about/page.tsx     →  ryanhambleton.space/about
app/portfolio/page.tsx →  ryanhambleton.space/portfolio
app/foo/page.tsx       →  ryanhambleton.space/foo  (if you create it)
```

No router config file. The folder **is** the route.

## Exercise

1. Open `app/about/page.tsx`
2. Find the line that loads content: `getAboutMdx()` or similar
3. Open `content/about.mdx` — that's the text on the About page
4. Trace: MDX file → loader in `lib/content/index.ts` → page component → browser

## Checkpoint answers

**Q: If I wanted `/contact`, what file would I create?**

`app/contact/page.tsx` — export a default function that returns your contact UI.

**Q: What is `[slug]` in `app/portfolio/[slug]/page.tsx`?**

A **dynamic segment** — one page template serves many URLs:
- `/portfolio/executive-kpi-dashboard`
- `/portfolio/supply-chain-etl-pipeline`

The `slug` comes from the folder name in `content/portfolio/*.json`.

## Next

→ [Module 3 — Components](./module-3-components.md)
