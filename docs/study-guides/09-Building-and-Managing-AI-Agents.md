# 09 — Building & Managing AI Agents for Web Development

You want agents to build sites for you. You must understand output to manage them.

---

## 1. The agentic development loop

```
You (architect) → define goal, constraints
    ↓
AI agent → generates/edits code
    ↓
You (reviewer) → verify, test, understand
    ↓
Git commit → deploy
```

**You are the manager.** The agent is a fast junior developer who sometimes over-builds.

---

## 2. What to specify before asking an agent

| Specify | Example |
|---------|---------|
| Scope | "Only add a /contact page, nothing else" |
| Stack | "Next.js App Router, Tailwind, no new packages" |
| Files | "Edit only content/site.json" |
| Out of scope | "Don't add API routes" |

**Bad prompt:** "Build me a website"  
**Good prompt:** "Add app/contact/page.tsx with email link from site.json. No new dependencies."

---

## 3. What to verify after every agent session

| Check | How |
|-------|-----|
| Build passes | `npm run build` |
| Site runs | `npm run dev`, click affected pages |
| No secrets committed | `git diff` — no API keys |
| Scope creep | Only files you expected changed |
| You can explain it | Read each new file, one paragraph each |

---

## 4. Red flags in agent-generated code

- 10 new pages when you asked for one
- Dependencies you don't recognize
- API keys in client code (`NEXT_PUBLIC_OPENAI`)
- Hardcoded personal data you didn't provide
- No way to edit content without React
- Duplicate patterns instead of reusing components

---

## 5. Vocabulary to command agents precisely

| Term | Meaning |
|------|---------|
| App Router | Next.js `app/` folder routing |
| Server Component | Default — no "use client" |
| Client Component | Needs "use client" for interactivity |
| props | Data passed to components |
| API route | `app/api/.../route.ts` |
| env var | Secret in .env.local / Vercel |
| SSG | Static generation at build time |
| MDX | Markdown + optional React |

---

## 6. Managing agents on YOUR site

**Safe to delegate:**
- New portfolio case study JSON + MDX
- Styling tweaks with Tailwind
- New static page from template
- SEO metadata

**Review carefully:**
- API routes and auth
- New npm packages
- Database connections
- Payment integration

**Always do yourself first (learning):**
- First deploy to Vercel
- First git push
- Editing content/site.json
- Understanding layout.tsx

---

## 7. Interview-ready agent story

> "I use AI agents to accelerate scaffolding and repetitive code, but I review every change, run production builds locally, and own the architecture. I understand the stack from DNS through React components, so I can debug agent output and enforce scope. My portfolio at ryanhambleton.space is a Next.js App Router site with content-driven JSON/MDX, deployed on Vercel from GitHub."

---

## 8. Study plan for job-ready React developer

### Month 1 — Foundations
- Guides 01, 02, 06 — web + JS + deploy
- Customize all content files
- Deploy and update live site 3 times

### Month 2 — React
- Guides 03, 04, 05 — components, Next.js, your codebase
- Build one new page yourself (/contact)
- Change colors and layout without agent

### Month 3 — Integration
- Guides 07, 08 — APIs, Streamlit comparison
- Wire one new field from site.json to a page (with agent help, you review)
- One small Streamlit app embedded in /lab

### Month 4 — Professional practice
- Guide 09 — direct agents with tight scope
- Contribute to open source or clone a Next.js template and modify
- Practice explaining your site in a 5-minute walkthrough

---

## 9. Five-minute site walkthrough (practice out loud)

1. "Domain on Vercel, code on GitHub, auto-deploy."
2. "Next.js App Router — each folder in app/ is a route."
3. "Content in JSON and MDX so I update copy without touching layout."
4. "Shared header/footer in layout.tsx."
5. "Agent demo uses server API route so keys stay secret."

---

## 10. Final checkpoint

1. What three checks do you run after an agent edits your code?
2. How do you prevent scope creep in prompts?
3. Explain your site's data flow from site.json to homepage.
4. When would you use Streamlit instead of Next.js?
5. What's your GitHub → Vercel → domain pipeline?

---

## You finished the study guide series

Return to **00 START HERE** for the roadmap.  
Keep adding entries to `docs/learning-journal.md` after each session.

**Your live site:** https://ryanhambleton.space (after Vercel domain setup)  
**Your repo:** https://github.com/b4n4n4st4nd-ops/rhspace
