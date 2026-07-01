# Deployment Guide

## Prerequisites

- GitHub account with this repository pushed
- Vercel account linked to GitHub
- Domain `ryanhambleton.space` on Vercel

## Steps

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial portfolio site"
git remote add origin https://github.com/YOUR_USER/ryanhambleton.space.git
git push -u origin main
```

### 2. Import to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import the GitHub repository
3. Framework preset: **Next.js** (auto-detected)
4. Deploy

### 3. Custom domain

1. Vercel project → **Settings** → **Domains**
2. Add `ryanhambleton.space` and `www.ryanhambleton.space`
3. If domain was purchased on Vercel, DNS is usually automatic
4. Enable redirect: `www` → apex (or vice versa)

### 4. Environment variables

| Variable | Where | Purpose |
|----------|-------|---------|
| `NEXT_PUBLIC_SITE_URL` | Vercel + `.env.local` | Canonical URLs, OG metadata |
| `OPENAI_API_KEY` | Vercel only (server) | Agent demo (optional) |
| `AGENT_DEMO_MODE` | Vercel | Set to `mock` for interview-safe demos |

Example `.env.local`:

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
AGENT_DEMO_MODE=mock
```

### 5. CI/CD

Every push to `main` triggers a production deploy. Pull requests get preview URLs automatically.

## Verify production

```bash
npm run build
npm run start
```

Check Lighthouse in Chrome DevTools before sharing with your network.
