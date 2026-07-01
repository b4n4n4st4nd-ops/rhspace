# Module 4 — Tailwind CSS

**Concept:** Style elements by adding **class names** directly in JSX. No separate CSS file per component (mostly).

```tsx
<h1 className="text-4xl font-semibold text-foreground">Hello</h1>
```

- `text-4xl` — large text
- `font-semibold` — bold weight
- `text-foreground` — uses your theme color from `globals.css`

## Exercise

1. Open `app/page.tsx`
2. Find the `<h1>` in the hero section
3. Change `text-4xl` to `text-3xl` (smaller) or `text-5xl` (larger)
4. Save → see the change at http://localhost:3000

5. Open `app/globals.css`
6. Find `--accent: #00e5ff` under `[data-theme="dark"]`
7. Change to a color you like (e.g. `#ff6b4a`) → save → accent color updates site-wide

## Checkpoint answers

**Q: Where are site colors defined?**

`app/globals.css` — CSS variables like `--accent`, `--background`, `--foreground`.

**Q: What does `className` do?**

Same as HTML `class` — applies CSS styles. In React/JSX it's `className` because `class` is a reserved word in JavaScript.

## Next

→ [Module 5 — Layout vs page](./module-5-layout.md)
