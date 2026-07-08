# 01 — Internet & Web Fundamentals

From domain name to browser — everything that happens before React matters.

---

## 1. What is the internet (for a developer)?

The internet is a network of computers that agree to send each other **messages** using standard **protocols** (rules).

When someone visits ryanhambleton.space, their browser asks a server: "Give me the files for this website." The server responds with HTML, CSS, JavaScript, images, etc.

**You are building those files.** Vercel's servers deliver them to the world.

---

## 2. Domain names (ryanhambleton.space)

A **domain** is a human-readable address.

| Part | Example | Meaning |
|------|---------|---------|
| Subdomain | www | Optional prefix |
| Domain | ryanhambleton | Your name |
| TLD | .space | Top-level category |

You **rent** a domain (you paid for 12 months). You do not own the internet — you own the right to use that name, pointed at servers you control.

**Analogy (data world):** A domain is like a **canonical business name** in a dimension table. DNS is the **lookup** that resolves name → IP address.

---

## 3. DNS — Domain Name System

Computers find each other using **IP addresses** (e.g. 76.76.21.21). DNS translates:

```
ryanhambleton.space  →  IP address of Vercel's server
```

**Flow when someone types your URL:**

1. Browser asks DNS: "Where is ryanhambleton.space?"
2. DNS returns an IP address
3. Browser connects to that IP and requests your site

Because you bought the domain on **Vercel**, Vercel usually manages DNS for you when you add the domain to a project.

---

## 4. Hosting vs domain

| Concept | What it is | Your situation |
|---------|------------|----------------|
| **Domain** | The address | ryanhambleton.space (Vercel registrar) |
| **Hosting** | Computers that serve files 24/7 | Vercel (after you import GitHub repo) |
| **Your code** | The actual website files | On your PC + GitHub |

**Domain without hosting:** Name exists, nothing to show.  
**Hosting without domain:** Site works at `something.vercel.app` but not your custom name.  
**You need both connected.**

---

## 5. HTTP and HTTPS — how browsers talk to servers

**HTTP** (HyperText Transfer Protocol) is the language of the web.

| Method | Purpose | Example |
|--------|---------|---------|
| GET | Fetch a page or file | Loading homepage |
| POST | Send data to server | Agent chat message to `/api/agent` |

**HTTPS** = HTTP + encryption (SSL/TLS). The padlock in the browser. Vercel provides SSL automatically.

**Request → Response cycle:**

1. Browser sends **request** (GET https://ryanhambleton.space/resume)
2. Server runs code (Next.js builds/serves the page)
3. Server sends **response** (HTML + assets)
4. Browser renders the page

---

## 6. What a website actually is

A website is **files**:

| File type | Role |
|-----------|------|
| HTML | Structure (headings, paragraphs, links) |
| CSS | Appearance (colors, layout) |
| JavaScript | Behavior (clicks, forms, dynamic updates) |
| Images/PDF | Static assets |

**React/Next.js** ultimately produce HTML, CSS, and JavaScript that the browser runs. You write in JSX/TypeScript; the **build step** (`npm run build`) compiles it into browser-ready files.

---

## 7. Client vs server

| | **Client** | **Server** |
|---|------------|------------|
| Where | User's browser | Vercel's computers (or your PC in dev) |
| Runs | React client components, clicks | Next.js pages, API routes, reading files |
| Sees secrets? | Never API keys | Yes — env vars |

**localhost:3000** = your PC acts as both client and server during development.

---

## 8. Ports and localhost

**localhost** = "this computer" (127.0.0.1).

**Port 3000** = the specific door Next.js listens on when you run `npm run dev`.

Only you can see it unless you expose it. Production uses port 443 (HTTPS) on Vercel's infrastructure — you don't configure that manually.

---

## 9. Static vs dynamic

| Type | Meaning | Your site |
|------|---------|-----------|
| **Static** | Same HTML for everyone, pre-built | Most pages (home, about, portfolio) |
| **Dynamic** | Computed per request | `/api/agent` chat endpoint |

Next.js pre-builds static pages at deploy time for speed. That's why `npm run build` lists all your routes.

---

## 10. CDN (Content Delivery Network)

Vercel copies your built files to servers worldwide so a visitor in Tokyo gets fast load times. You get this automatically — no extra setup.

---

## 11. How your pieces connect

```
You edit code on PC
    ↓ git push
GitHub stores code
    ↓ Vercel watches repo
Vercel runs npm run build
    ↓ deploys output
CDN serves files at ryanhambleton.space
    ↓ DNS points domain here
Visitor's browser displays site
```

---

## 12. Study checkpoint

Answer without looking:

1. What does DNS do? name for site address
2. What's the difference between your domain and Vercel hosting? i rent a domain name vs. their own site address
3. What does HTTPS add? secure transfer protocal for web load
4. What runs on localhost:3000 vs ryanhambleton.space? dev runs on local, prod runs on .space
5. What are the three file types every website uses? css, html, javascript?

---

## Next document

→ **02 JavaScript, JSON & TypeScript**
