# 03 — React Fundamentals

React is how modern web UIs are built. Your entire site is React components.

---

## 1. What is React?

React is a **JavaScript library** for building user interfaces from **components** — reusable pieces of UI.

**Core idea:** UI = f(data). When data changes, UI updates.

**Streamlit analogy:**

| Streamlit | React |
|-----------|-------|
| `st.write(name)` | `<p>{name}</p>` |
| Rerun whole script on change | Only changed components re-render |
| Session state | `useState` hook |
| Multipage `pages/` folder | Next.js `app/` folder |

---

## 2. Components are functions

```tsx
function SkillPills({ skills }: { skills: string[] }) {
  return (
    <ul>
      {skills.map((skill) => (
        <li key={skill}>{skill}</li>
      ))}
    </ul>
  );
}
```

**Input:** props (`skills`)  
**Output:** JSX (what appears on screen)

**Your components:** `components/ui/SkillPills.tsx`, `components/portfolio/ProjectCard.tsx`, etc.

---

## 3. Props — passing data down

Props are **read-only** inputs from parent to child:

```tsx
// Parent (page)
<SkillPills skills={site.skills} />

// Child (component)
function SkillPills({ skills }: { skills: string[] }) { ... }
```

**Rule:** Data flows **down** via props. Child does not mutate props.

---

## 4. State — data that changes inside a component

When user interaction changes UI, use **state**:

```tsx
"use client";
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}
```

**`"use client"`** = this component runs in the browser (needed for clicks, typing).

**Your state examples:**
- `PortfolioGrid.tsx` — filter category/tool
- `ThemeToggle.tsx` — dark/light mode
- `AgentChat.tsx` — chat messages, loading

---

## 5. Server Components vs Client Components (Next.js + React 19)

| | Server Component | Client Component |
|---|------------------|------------------|
| Directive | (default, none) | `"use client"` at top |
| Runs | Server at build/request | Browser |
| Can use | Read files, databases | onClick, useState, useEffect |
| Your examples | `app/about/page.tsx` | `ThemeToggle.tsx` |

**Rule of thumb:** Use server by default. Add `"use client"` only when you need interactivity.

---

## 6. Lists and keys

Rendering arrays:

```tsx
{projects.map((project) => (
  <ProjectCard key={project.slug} project={project} />
))}
```

`key` helps React track which item changed. Use unique IDs (slug).

---

## 7. Conditional rendering

```tsx
{error && <p className="text-red-500">{error}</p>}
{loading ? <Spinner /> : <Content />}
```

---

## 8. Component composition

Build small pieces, combine into pages:

```
SiteHeader (nav)
  └── uses site.nav from props

HomePage
  ├── SiteHeader (via layout)
  ├── Hero section
  ├── ProjectCard × 3
  ├── SkillPills
  └── SiteFooter (via layout)
```

**layout.tsx** wraps every page with header/footer so you don't repeat them.

---

## 9. Styling in React (Tailwind)

Classes go on elements:

```tsx
<h1 className="text-4xl font-semibold text-foreground">
```

Tailwind = utility CSS. `text-4xl` = font size, `font-semibold` = weight.

Global colors defined in `app/globals.css` as CSS variables.

---

## 10. Common patterns in your codebase

| Pattern | File example |
|---------|--------------|
| Presentational component | `Badge.tsx` — just displays children |
| Container + data | `app/page.tsx` — calls `getSiteConfig()`, passes to children |
| Client interactivity | `AgentChat.tsx` — fetch + state |
| Layout wrapper | `app/layout.tsx` — shared chrome |

---

## 11. Practice exercises

1. Open `components/ui/Badge.tsx` — identify props and return value.
2. Open `components/portfolio/PortfolioGrid.tsx` — find `useState` for filters.
3. Change button text in `app/page.tsx` from "View portfolio" to "See my work".
4. Add one skill to `content/site.json` — see it appear in SkillPills without editing React.

---

## 12. Study checkpoint

1. What is a React component?
2. What are props?
3. When do you need `"use client"`?
4. What's the difference between `site.json` data and `useState`?
5. Why does `layout.tsx` exist?

---

## Next document

→ **04 Next.js Deep Dive**
