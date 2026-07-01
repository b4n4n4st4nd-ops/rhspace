# Learning Journal

Add an entry after each module. **You** should write Sessions marked "(your turn)".

---

## Session 0 — Agent scaffold (historical)

The initial site was scaffolded quickly by Cursor: 10 routes, content layer, lab demo.  
**Your job now:** understand it module by module, starting with [START_HERE.md](./START_HERE.md).

---

## Session — Module 0 (verified)

**Date:** 2026-03-22

**What I verified:**
- `npm run build` passes — all 16 routes generate successfully
- Nav destinations: About, Portfolio, Art, Resume, Lab (5 links)
- Local dev command: `npm run dev` → http://localhost:3000

**Checkpoint — name all 5 nav destinations:**
1. `/about` — About
2. `/portfolio` — Portfolio
3. `/art` — Art
4. `/resume` — Resume
5. `/lab` — Lab

**What I learned:**
- The site runs on my machine before it runs on the internet
- `package.json` scripts: `dev` = local, `build` = production compile, `start` = run production build locally

**Next:** Complete Module 1 exercise in [module-1-edit-content.md](./module-1-edit-content.md)

---

## Session — Module 1 (your turn)

**Files to edit:** `content/site.json`, `content/resume.json`

**What I changed:**
- Tagline: _[fill in after you edit]_
- Email: _[fill in]_
- Education: _[fill in]_

**What I learned:**
- JSON in `content/` flows to pages via `lib/content/`
- I can update the site without editing React files
- Nav links come from `site.json` → `getSiteConfig()` → `SiteHeader`

**Next:** Say **"teach me Module 2"** or **"teach me Module 9"** in Cursor — see [WHATS_NEXT.md](./WHATS_NEXT.md)

---

## Session — Module 9 deploy (your turn)

**Date:** _[fill in when deployed]_

**Steps completed:**
- [ ] Git commit and push to GitHub
- [ ] Vercel import and first deploy
- [ ] Custom domain `ryanhambleton.space` attached
- [ ] Site loads in browser

**What I learned:**
- _[fill in]_
