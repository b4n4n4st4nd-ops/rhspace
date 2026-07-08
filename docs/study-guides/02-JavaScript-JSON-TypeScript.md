# 02 — JavaScript, JSON & TypeScript

The languages your site is written in — and how they relate to Python and SQL.

---

## 1. Why JavaScript?

Browsers only run **JavaScript** (not Python, not SQL). Every interactive website eventually runs JS in the browser.

**Next.js** lets you write **TypeScript** (typed JavaScript) that compiles to JS. **React** is a JavaScript library for building UI from components.

---

## 2. JSON — the universal data format

**JSON** (JavaScript Object Notation) looks like Python dictionaries:

```json
{
  "name": "Ryan Hambleton",
  "email": "ryha1089@gmail.com",
  "skills": ["Tableau", "SQL", "React"]
}
```

**Rules:**
- Keys must be in double quotes
- No trailing commas on last item
- Strings in double quotes

**Your site uses JSON in:** `content/site.json`, `content/resume.json`, `content/portfolio/*.json`

**SQL analogy:** JSON row = one record. `content/portfolio/*.json` = one table split into files per project.

---

## 3. JavaScript basics you must know

### Variables
```javascript
const name = "Ryan";   // cannot reassign
let count = 0;         // can reassign
```

### Functions
```javascript
function greet(name) {
  return "Hello, " + name;
}
```

### Arrow functions (common in React)
```javascript
const greet = (name) => "Hello, " + name;
```

### Arrays
```javascript
const skills = ["Tableau", "SQL"];
skills.map((skill) => skill.toUpperCase());
```

### Objects
```javascript
const site = { name: "Ryan", tagline: "..." };
site.name;  // access with dot
```

### Import / export (modules)
```javascript
import { getSiteConfig } from "@/lib/content";
export function Button() { ... }
```

**Python analogy:** `import` works like Python modules. `@/` is a shortcut to your project root.

---

## 4. TypeScript — JavaScript with types

TypeScript catches errors before runtime:

```typescript
interface SiteConfig {
  name: string;
  tagline: string;
  skills: string[];
}
```

**Your types live in:** `lib/types/content.ts`

If you pass a number where a string is expected, the editor warns you. Employers expect TypeScript on modern React teams.

---

## 5. JSX — HTML inside JavaScript

React uses **JSX**:

```tsx
<h1 className="text-4xl">{site.tagline}</h1>
```

| HTML | JSX |
|------|-----|
| class | className |
| for | htmlFor |
| onclick | onClick |

Curly braces `{ }` embed JavaScript expressions inside markup.

---

## 6. async / await — for API calls

When the browser talks to your server:

```javascript
const response = await fetch("/api/agent", {
  method: "POST",
  body: JSON.stringify({ message: "Hello" }),
});
const data = await response.json();
```

**Python analogy:** Like `requests.post()` in Python. `await` pauses until the response returns.

**Used in:** `components/lab/AgentChat.tsx`

---

## 7. npm and package.json

**npm** = Node Package Manager. Installs libraries.

**package.json** lists dependencies:

| Package | Purpose in your site |
|---------|---------------------|
| next | Framework |
| react | UI library |
| tailwindcss | Styling |
| next-mdx-remote | Read MDX content files |

**Commands:**
- `npm install` — install dependencies
- `npm run dev` — start development server
- `npm run build` — production build

---

## 8. Environment variables

Secrets and config that change per environment:

| File | Where | Committed? |
|------|-------|------------|
| `.env.local` | Your PC | No (gitignored) |
| Vercel dashboard | Production | No |

```
NEXT_PUBLIC_SITE_URL=https://ryanhambleton.space
AGENT_DEMO_MODE=mock
OPENAI_API_KEY=sk-...   # never NEXT_PUBLIC_
```

`NEXT_PUBLIC_` prefix = exposed to browser. API keys must NOT use that prefix.

---

## 9. Practice exercises (your repo)

1. Open `content/site.json` — identify objects, arrays, strings.
2. Open `app/page.tsx` — find `{site.tagline}` — that's JS reading JSON.
3. Break JSON syntax (remove a comma), save, see error in terminal — fix it.

---

## 10. Study checkpoint

1. What's the difference between JSON and JavaScript? two different languages
2. What does `{site.email}` do in a `.tsx` file? no idea 
3. What is TypeScript adding on top of JavaScript? gives errors before run if format is off
4. Where are your npm dependencies listed? no idea
5. Why can't API keys use `NEXT_PUBLIC_`? no idea

---

## Next document

→ **03 React Fundamentals**
