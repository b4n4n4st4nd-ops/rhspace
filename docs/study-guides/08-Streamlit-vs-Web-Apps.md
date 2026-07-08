# 08 — Streamlit vs Next.js / React

You know Streamlit. Here's when to use what — and how skills transfer.

---

## 1. Streamlit — what it's great for

| Strength | Example |
|----------|---------|
| Fast data apps | Dashboards, explorers, internal tools |
| Python-native | pandas, plotly, sklearn in one script |
| Minimal frontend code | `st.write`, `st.chart`, done |

**Run:** `streamlit run app.py`  
**Deploy:** Streamlit Community Cloud, containers

**Your site embeds Streamlit:** `/lab/[slug]` uses iframe to external Streamlit URL.

---

## 2. Next.js / React — what it's great for

| Strength | Example |
|----------|---------|
| Public marketing sites | Portfolios, landing pages |
| Custom design | Brand, animation, SEO |
| Full web platform | Auth, e-commerce, complex UX |
| Performance + SEO | Pre-built HTML, fast load |

**Run:** `npm run dev`  
**Deploy:** Vercel, Netlify

**Your portfolio:** Next.js — because it's a public, branded, multi-page site.

---

## 3. Side-by-side

| | Streamlit | Next.js |
|---|-----------|---------|
| Language | Python | JavaScript/TypeScript |
| UI model | Script reruns top-to-bottom | Component tree |
| State | `st.session_state` | `useState`, server data |
| Routing | `pages/` folder | `app/` folder |
| Styling | Limited | Full CSS/Tailwind |
| SEO | Weak | Strong |
| Best for | Data tools, prototypes | Public websites, products |

---

## 4. Skill transfer map

| You know (Streamlit/Python) | Web equivalent |
|------------------------------|----------------|
| Script structure | React components |
| session_state | useState / URL params |
| st.sidebar | layout.tsx / nav |
| CSV/JSON data | content/*.json |
| requests.post | fetch() to API route |
| Deploy to cloud | git push → Vercel |

---

## 5. Hybrid architecture (your lab)

```
Next.js site (portfolio, brand, SEO)
    └── /lab/streamlit-demo → iframe → Streamlit app
    └── /lab/agent-shell → Next.js API → OpenAI
```

Use Next.js as the **front door**. Embed Streamlit or agents where they shine.

---

## 6. When to choose which (job context)

**Choose Streamlit when:**
- Internal analytics tool
- POC in a day
- Audience is data-literate
- Python ML pipeline is the product

**Choose React/Next when:**
- Client-facing website
- Custom UX/brand matters
- SEO and performance matter
- Mobile-responsive marketing

**Choose both when:**
- Portfolio site + demo apps (your setup)

---

## 7. Study checkpoint

1. Why is your portfolio Next.js not Streamlit?
2. How could you embed a Streamlit app on your site?
3. What's the Python equivalent of a React component?
4. When would you build an agent in Python vs Next.js API route?

---

## Next document

→ **09 Building & Managing AI Agents**
