# 06 — Git, GitHub & Deploy

Version control and going live — what you did and what happens on every update.

---

## 1. Git — save history on your computer

Git tracks **snapshots** of your project.

| Command | What it does |
|---------|--------------|
| `git status` | What's changed |
| `git add .` | Stage all changes for next snapshot |
| `git commit -m "message"` | Save snapshot with description |
| `git log` | View history |

**Analogy:** Commits are like save points in a game. You can go back.

---

## 2. GitHub — cloud backup + collaboration

GitHub stores your Git history online.

**Your repo:** https://github.com/b4n4n4st4nd-ops/rhspace

| Command | What it does |
|---------|--------------|
| `git remote -v` | Show connected GitHub URL |
| `git push origin main` | Upload commits to GitHub |

**Why it matters for your site:** Vercel watches GitHub and redeploys when you push.

---

## 3. The deploy pipeline

```
1. Edit files locally
2. git add .
3. git commit -m "Describe change"
4. git push origin main
5. Vercel detects push
6. Vercel runs npm run build
7. New site live at ryanhambleton.space (~1-2 min)
```

---

## 4. Vercel setup (one-time)

1. vercel.com → Sign in with GitHub
2. Import `rhspace` repository
3. Deploy (defaults work for Next.js)
4. Settings → Environment Variables:
   - NEXT_PUBLIC_SITE_URL = https://ryanhambleton.space
   - AGENT_DEMO_MODE = mock
5. Settings → Domains → add ryanhambleton.space

---

## 5. Branches (for later)

`main` = production branch. Vercel deploys `main` by default.

Feature branches let you experiment without breaking live site:

```bash
git checkout -b new-feature
# ... work ...
git push origin new-feature
# Vercel creates preview URL for the branch
```

---

## 6. .gitignore — what never goes to GitHub

Your repo ignores:
- `node_modules/` — reinstalled with `npm install`
- `.env.local` — secrets
- `.next/` — build output

**Never commit API keys.**

---

## 7. Troubleshooting

| Problem | Solution |
|---------|----------|
| Push rejected | `git pull` first, resolve conflicts |
| Vercel build fails | Run `npm run build` locally, fix errors |
| Site shows old content | Hard refresh; check deploy finished |
| Domain not working | Vercel Domains tab — wait for DNS/SSL |

---

## 8. Study checkpoint

1. What's the difference between git commit and git push?
2. What triggers a Vercel redeploy?
3. Why is .env.local not on GitHub?
4. What's your GitHub repo URL?

---

## Next document

→ **07 APIs & Backend**
