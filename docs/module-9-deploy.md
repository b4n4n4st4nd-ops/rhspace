# Module 9 — Git + deploy to ryanhambleton.space

**Concept:** Git versions your code. GitHub stores it in the cloud. Vercel builds and hosts it. DNS connects your domain.

```mermaid
flowchart LR
  Local["Your PC"] -->|git push| GitHub["GitHub"]
  GitHub -->|auto deploy| Vercel["Vercel"]
  Vercel --> Domain["ryanhambleton.space"]
```

## Pre-flight checklist

Run these locally before deploying:

```bash
cd c:\Users\rhamb\Drive\Cursor\ryanhambleton-space
npm run build    # must pass with no errors
npm run lint     # should pass
```

- [ ] Module 1 done — `content/site.json` has your real email and tagline
- [ ] `content/resume.json` education placeholder replaced
- [ ] `.env.local` exists (copy from `.env.example`) — not committed to git

## Step-by-step deploy

### Step 1 — Git commit (local)

```bash
git status
git add .
git commit -m "Personal portfolio site — ready for deploy"
```

### Step 2 — GitHub repository

1. Create a new repo on https://github.com/new (e.g. `ryanhambleton.space`)
2. Do **not** initialize with README if your local repo already has code
3. Connect and push:

```bash
git remote add origin https://github.com/YOUR_USERNAME/ryanhambleton.space.git
git branch -M main
git push -u origin main
```

### Step 3 — Vercel import

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Framework: **Next.js** (auto-detected)
4. Add environment variables:
   - `NEXT_PUBLIC_SITE_URL` = `https://ryanhambleton.space`
   - `AGENT_DEMO_MODE` = `mock`
5. Click **Deploy**
6. You get a URL like `ryanhambleton-space.vercel.app` — test it

### Step 4 — Custom domain

1. Vercel project → **Settings** → **Domains**
2. Add `ryanhambleton.space` and `www.ryanhambleton.space`
3. If domain was purchased on Vercel, DNS is usually automatic
4. Wait for SSL (green checkmark) — can take a few minutes

### Step 5 — Verify

- [ ] https://ryanhambleton.space loads
- [ ] All nav links work
- [ ] `/lab/agent-shell` chat works

## Checkpoint answers

**Q: What happens when I push to GitHub?**

Vercel detects the push, runs `npm run build`, and deploys the new version automatically.

**Q: What's the difference between localhost and production?**

- `localhost:3000` — only you, dev server, hot reload
- `ryanhambleton.space` — anyone on the internet, optimized build on Vercel's servers

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Build fails on Vercel | Run `npm run build` locally; fix errors first |
| Domain not connecting | Check Vercel Domains tab for DNS status |
| Old content showing | Hard refresh (Ctrl+Shift+R) or wait for deploy to finish |

## After deploy

Every `git push` to `main` redeploys the site. Pull requests get preview URLs.

Add a journal entry: "Deployed to ryanhambleton.space on [date]."
