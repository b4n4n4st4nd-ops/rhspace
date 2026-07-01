# Module 8 — API routes (optional)

**Concept:** `app/api/agent/route.ts` is a **backend endpoint** on your site. The browser calls `/api/agent`; the server holds API keys.

```
Browser  →  POST /api/agent  →  OpenAI (or mock)  →  response + logs
```

Keys live in `.env.local` / Vercel env vars — never `NEXT_PUBLIC_`.

## Exercise

1. Run `npm run dev`
2. Go to http://localhost:3000/lab/agent-shell
3. Send: "Which DC has more SKU-1042 stock?"
4. Open browser DevTools → Network tab → see POST to `/api/agent`
5. Expand **Agent logs** panel below the chat

## Checkpoint answers

**Q: Why is the OpenAI key not in the browser?**

If it were in client code, anyone could view source and steal it. API routes run on the server only.

**Q: What does `AGENT_DEMO_MODE=mock` do?**

Returns hardcoded responses — no API call, no cost, reliable for demos.

## Next

→ [Module 9 — Deploy](./module-9-deploy.md)
