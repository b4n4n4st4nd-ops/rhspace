# Module 0 — See it run

**Concept:** `npm run dev` starts a local development server on your machine. When you save a file, the browser updates automatically (hot reload).

## Exercise

1. Open terminal in Cursor: `` Ctrl + ` ``
2. Run:

```bash
cd c:\Users\rhamb\Drive\Cursor\ryanhambleton-space
npm run dev
```

3. Open http://localhost:3000 in your browser
4. Click every link in the nav bar and visit each page below

## Route tour (verified)

| URL | What you should see |
|-----|---------------------|
| `/` | Homepage hero, featured projects, skills |
| `/about` | Your story (from `content/about.mdx`) |
| `/portfolio` | Grid of 3 projects with filters |
| `/portfolio/executive-kpi-dashboard` | One case study (STAR format) |
| `/art` | LED music sync project |
| `/resume` | Timeline, skills, education |
| `/lab` | Demo cards (agent + Streamlit placeholder) |
| `/lab/agent-shell` | Chat UI — try asking about SKU inventory |

5. Stop the server when done: `Ctrl + C` in the terminal

## Checkpoint answers

**Q: Name all 5 nav destinations.**

1. About → `/about`
2. Portfolio → `/portfolio`
3. Art → `/art`
4. Resume → `/resume`
5. Lab → `/lab`

**Q: What command starts the local site?**

`npm run dev` — defined in `package.json` under `"scripts"`.

**Q: Where does the site run locally?**

http://localhost:3000 — only on **your** computer until you deploy to Vercel.

## Streamlit comparison

| Streamlit | Next.js |
|-----------|---------|
| `streamlit run app.py` | `npm run dev` |
| Browser opens to localhost:8501 | Browser opens to localhost:3000 |
| Edit Python → rerun | Edit file → page hot-reloads |

## Next

→ [Module 1 — Edit content](./module-1-edit-content.md)
