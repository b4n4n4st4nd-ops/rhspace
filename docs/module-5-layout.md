# Module 5 — Layout vs page

**Concept:**

- `app/layout.tsx` — wraps **every** page (header, footer, fonts)
- `app/page.tsx` (or `app/about/page.tsx`) — **one route's** unique content

## Exercise

1. Open `app/layout.tsx` — find `<SiteHeader>`, `<main>{children}</main>`, `<SiteFooter>`
2. Open `app/page.tsx` — find only homepage content (hero, featured work)
3. Notice: `page.tsx` does NOT repeat the nav — `layout.tsx` adds it automatically

## Checkpoint answers

**Q: Why don't I repeat the nav on every page?**

`layout.tsx` renders once around all pages. `{children}` is where each page's content gets inserted.

**Q: What is `{children}`?**

The page component for the current URL — Next.js passes it into the layout automatically.

## Next

→ [Module 6 — MDX](./module-6-mdx.md)
