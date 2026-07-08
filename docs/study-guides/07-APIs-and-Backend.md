# 07 — APIs & Backend Communication

How the web talks to servers — and how your agent demo works.

---

## 1. What is an API?

**API** (Application Programming Interface) = a way for programs to request data or actions.

**Web API** = URLs that return JSON instead of HTML pages.

| URL type | Returns | Example |
|----------|---------|---------|
| Page | HTML | /about |
| API | JSON | /api/agent |

---

## 2. HTTP methods (again)

| Method | Use | Your site |
|--------|-----|-----------|
| GET | Fetch data | Loading pages |
| POST | Send data | Agent chat messages |
| PUT/PATCH | Update | (not used yet) |
| DELETE | Remove | (not used yet) |

---

## 3. Request and response

**Client sends:**
```
POST /api/agent
Content-Type: application/json

{"message": "Which DC has more stock?"}
```

**Server responds:**
```json
{
  "reply": "DC-West has 1,240 units...",
  "logs": [{"step": "inventory_lookup", "detail": "..."}]
}
```

**Code path:**
- Browser: `components/lab/AgentChat.tsx` → `fetch("/api/agent", ...)`
- Server: `app/api/agent/route.ts` → `lib/agent/index.ts`

---

## 4. Why API routes live on the server

**Never put API keys in browser code.** Anyone can view source or network tab.

**Correct pattern:**
```
Browser → your /api/agent → OpenAI (key on server only)
```

**Wrong pattern:**
```
Browser → OpenAI directly (key exposed)
```

---

## 5. Environment variables

| Variable | Purpose |
|----------|---------|
| OPENAI_API_KEY | OpenAI access (server only) |
| AGENT_DEMO_MODE=mock | Skip OpenAI, use hardcoded responses |
| NEXT_PUBLIC_SITE_URL | Public site URL for metadata |

Set in `.env.local` locally, Vercel dashboard in production.

---

## 6. fetch() in JavaScript

```javascript
const res = await fetch("/api/agent", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ message: userText }),
});
const data = await res.json();
```

**Python equivalent:**
```python
import requests
requests.post(url, json={"message": userText})
```

---

## 7. JSON as the wire format

APIs almost always speak JSON. Same format as your `content/*.json` files.

---

## 8. CORS (brief)

Browsers block random websites from calling your API unless configured. Same-origin requests (`/api/agent` on your own domain) work without extra setup.

---

## 9. Rate limiting and security (production mindset)

For public agent demos:
- Use mock mode for interviews
- Rate-limit API routes in production
- Validate input (your route checks message length)
- Never log API keys

---

## 10. Practice

1. Open `/lab/agent-shell` with DevTools → Network tab
2. Send a message — watch POST to `/api/agent`
3. Read response JSON — `reply` and `logs`
4. Open `app/api/agent/route.ts` — trace the code

---

## 11. Study checkpoint

1. Why is `/api/agent` a POST not a GET?
2. Where is OPENAI_API_KEY stored?
3. What does AGENT_DEMO_MODE=mock do?
4. What format does the API return?

---

## Next document

→ **08 Streamlit vs Web Apps**
