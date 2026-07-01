# Module 7 — Client vs server components

**Concept:**

| Type | Runs where | When to use |
|------|------------|-------------|
| **Server Component** (default) | Server at build/request time | Static content, reading files |
| **Client Component** (`"use client"` at top) | Visitor's browser | Clicks, typing, theme toggle, chat |

## Exercise

1. Open `app/about/page.tsx` — no `"use client"` → Server Component
2. Open `components/layout/ThemeToggle.tsx` — has `"use client"` → needs browser APIs (`localStorage`, clicks)
3. Open `components/portfolio/PortfolioGrid.tsx` — client (filter buttons need state)

## Checkpoint answers

**Q: Why does ThemeToggle need `"use client"` but About doesn't?**

Theme toggle uses `localStorage` and `onClick` — those only exist in the browser. About page just displays content from files.

## Next

→ [Module 8 — API routes](./module-8-api-routes.md)
