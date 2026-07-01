# Module 3 — Components = functions that return UI

**Concept:** A React component is a function. Input = **props** (like function arguments). Output = **JSX** (HTML-like syntax).

```tsx
// Python mental model:
// def SiteHeader(site):
//     return render_nav(site.nav)

function SiteHeader({ site }: { site: SiteConfig }) {
  return <nav>...</nav>;
}
```

## Exercise

1. Open `components/layout/SiteChrome.tsx`
2. Find `site.nav.map(...)` — each nav item becomes a `<Link>`
3. Open `app/layout.tsx` — see `<SiteHeader site={site} />` passing data as a prop
4. Change one nav `label` in `content/site.json` — watch the header update

## Checkpoint answers

**Q: What's the difference between `SiteHeader` and `app/about/page.tsx`?**

- `SiteHeader` — **reusable component** used on every page (defined once in `components/`)
- `app/about/page.tsx` — **one route's page** (only renders at `/about`)

**Q: What are props?**

Data passed from parent to child: `<SiteHeader site={site} />` passes the `site` object into `SiteHeader`.

## Next

→ [Module 4 — Tailwind](./module-4-tailwind.md)
