# Module 1 — Edit content without touching React

**Concept:** JSON files in `content/` are **data**. Pages read that data and display it. You can change your name, tagline, resume, and project summaries without learning React.

## Data flow (memorize this)

```
content/site.json  →  lib/content/index.ts (getSiteConfig)  →  app/layout.tsx (header/footer)
content/resume.json  →  lib/content/index.ts (getResume)  →  app/resume/page.tsx
```

Like SQL: **table** (JSON) → **query** (loader function) → **dashboard** (page).

## Exercise — your turn

Open these two files and edit the fields marked **← EDIT**:

### 1. `content/site.json`

| Field | Current value | Your edit |
|-------|---------------|-----------|
| `tagline` | (see file) | Write your own one-line pitch **← EDIT** |
| `email` | hello@ryanhambleton.space | Your real email **← EDIT** |
| `social.linkedin` | placeholder URL | Your LinkedIn URL **← EDIT** |
| `social.github` | placeholder URL | Your GitHub URL **← EDIT** |

Save the file. With `npm run dev` running, check:
- Footer links updated?
- Homepage hero shows new tagline?

### 2. `content/resume.json`

| Field | Current value | Your edit |
|-------|---------------|-----------|
| `education[0].institution` | "Your University" | Your school **← EDIT** |
| `education[0].degree` | "B.S. — field of study" | Your degree **← EDIT** |
| `experience` highlights | placeholder bullets | Your real accomplishments **← EDIT** (optional) |

Save. Visit http://localhost:3000/resume — education section should show your edits.

## Checkpoint answers

**Q: Where does the nav menu get its links?**

`content/site.json` → `"nav"` array → loaded by `getSiteConfig()` in `lib/content/index.ts` → passed to `SiteHeader` in `components/layout/SiteChrome.tsx`.

**Q: If I change `site.json`, do I need to restart the dev server?**

Usually no — save the file and refresh the browser. If a change doesn't appear, refresh once or restart `npm run dev`.

**Q: What's the difference between `site.json` and `resume.json`?**

- `site.json` — site-wide config (nav, tagline, social links, skills on homepage)
- `resume.json` — resume page only (jobs, education, detailed skills)

## Add to your learning journal

Copy this template into `docs/learning-journal.md` and fill in your answers:

```markdown
## Session — Module 1 (my edits)

**Files I edited:** content/site.json, content/resume.json

**What I changed:**
- Tagline: ...
- Email: ...
- Education: ...

**What I learned:**
- JSON in content/ flows to pages via lib/content/
- I can update the site without editing React files
```

## Next

→ [Module 2 — Folder = URL](./module-2-routing.md)  
→ Or jump to [Module 9 — Deploy](./module-9-deploy.md) when you want to go live
