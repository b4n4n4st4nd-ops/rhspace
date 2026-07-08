# 04 — Next.js Deep Dive

Next.js is React with routing, builds, and server features built in. Your site is Next.js 16 App Router.

---

## 1. What Next.js adds to React

| React alone | Next.js adds |
|-------------|--------------|
| UI components | File-based routing (`app/about/page.tsx` → `/about`) |
| Client-side only | Server Components, SSR, static generation |
| Manual setup | `npm run build`, optimization, image handling |
| No backend | API routes (`app/api/...`) |

---

## 2. App Router — folders are URLs

```
app/
  page.tsx              →  /
  layout.tsx            →  wraps ALL pages
  about/
    page.tsx            →  /about
  portfolio/
    page.tsx            →  /portfolio
    [slug]/
      page.tsx          →  /portfolio/anything
```

**`[slug]`** = dynamic segment. One template, many URLs from content files.

---

## 3. layout.tsx vs page.tsx

**layout.tsx** — persistent shell (header, footer, fonts):

```tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
```

**page.tsx** — unique content per route. `{children}` in layout = the page.

---

## 4. Metadata and SEO

In `app/layout.tsx` and individual pages:

```tsx
export const metadata = {
  title: "Ryan Hambleton",
  description: "...",
};
```

**Your SEO helper:** `lib/seo.ts` — `createMetadata()` for per-page titles.

---

## 5. Data loading — no useEffect needed on server

Server Components read data directly:

```tsx
export default function HomePage() {
  const site = getSiteConfig();  // reads content/site.json
  return <h1>{site.tagline}</h1>;
}
```

**Flow:** File on disk → `lib/content/index.ts` → page component → HTML sent to browser.

---

## 6. generateStaticParams — pre-building dynamic pages

For `/portfolio/[slug]`, Next.js needs to know all slugs at build time:

```tsx
export async function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}
```

This creates one HTML file per project at build time = fast loading.

---

## 7. The build process

```
npm run build
  → TypeScript compile
  → Read all content files
  → Generate static HTML for each route
  → Output to .next/ folder
  → Vercel deploys that output
```

If build fails locally, it will fail on Vercel. Always run `npm run build` before pushing big changes.

---

## 8. Images — next/image

```tsx
import Image from "next/image";
<Image src="/images/portfolio/foo.svg" alt="" fill />
```

Optimizes images automatically. Files live in `public/`.

---

## 9. Link — client-side navigation

```tsx
import Link from "next/link";
<Link href="/about">About</Link>
```

Faster than `<a>` — doesn't reload entire page.

---

## 10. API Routes

`app/api/agent/route.ts` exports HTTP handlers:

```tsx
export async function POST(request: Request) {
  const body = await request.json();
  // ... call OpenAI or mock
  return Response.json({ reply: "..." });
}
```

Browser calls `/api/agent` — keys stay on server.

---

## 11. Project config files

| File | Purpose |
|------|---------|
| `package.json` | Dependencies and scripts |
| `next.config.ts` | Next.js settings |
| `tsconfig.json` | TypeScript, `@/` path alias |
| `postcss.config.mjs` | Tailwind processing |
| `.env.local` | Local secrets (not in git) |

---

## 12. Study checkpoint

1. What file creates the `/resume` route?
2. What is `[slug]`?
3. Why is `getSiteConfig()` called in a page, not in the browser?
4. What does `npm run build` produce?
5. Where is the agent API defined?

---

## Next document

→ **05 Your Site File-by-File**
