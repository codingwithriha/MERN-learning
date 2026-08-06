# ▲ Next.js Interview Handbook
### The Complete Beginner-to-Staff-Engineer Reference & Interview Preparation Guide

## 📖 Table of Contents

1. [Introduction to Next.js](#1-introduction-to-nextjs)
2. [Core Concepts](#2-core-concepts)
3. [Internal Working / Architecture](#3-internal-working--architecture)
4. [Visual Diagrams](#4-visual-diagrams)
5. [Code Examples (Simple → Production)](#5-code-examples)
6. [Real World Usage](#6-real-world-usage)
7. [Best Practices](#7-best-practices)
8. [Common Beginner Mistakes](#8-common-beginner-mistakes)
9. [Advanced Topics](#9-advanced-topics)
10. [Interview Questions (All Levels)](#10-interview-questions)
11. [Coding Exercises](#11-coding-exercises)
12. [MCQs](#12-mcqs)
13. [Flashcards](#13-flashcards)
14. [Cheat Sheet](#14-cheat-sheet)
15. [Revision Notes (5/15/30/60 min)](#15-revision-notes)
16. [Common Bugs & Debugging](#16-common-bugs--debugging)
17. [Production Interview Stories](#17-production-interview-stories)
18. [Company-Specific Questions](#18-company-specific-questions)
19. [Final Revision Checklist](#19-final-revision-checklist)

---

# 1. Introduction to Next.js

## What is Next.js?

**Next.js** is a **React framework** (built by Vercel) that adds the production infrastructure React itself doesn't provide: file-system-based routing, server-side rendering (SSR), static site generation (SSG), API routes, image/font optimization, and — since version 13 — a completely new **App Router** built on **React Server Components**.

If React is the engine, Next.js is the car: it wires the engine (React) to a chassis (routing, bundling, deployment conventions) so you get a drivable, production-ready application rather than a pile of parts.

## Why Was Next.js Created?

Vercel (then "Zeit") released Next.js in **October 2016**. At the time, using React "properly" for a real product meant hand-assembling: a bundler (Webpack) config, a router (React Router), a server-rendering setup (for SEO/performance), and code-splitting logic — all non-trivial, error-prone plumbing that every company reinvented. Next.js's goal was **zero-config, sensible-defaults React**: create a file in a `pages` (or now `app`) folder and you have a working, server-rendered, code-split route — no Webpack config required.

## Why Do Companies Use Next.js?

| Reason | Explanation |
|---|---|
| **SEO** | Server-rendered/static HTML is immediately crawlable, unlike a blank CSR shell. |
| **Performance out of the box** | Automatic code splitting, image optimization, font optimization, streaming SSR. |
| **File-based routing** | No manual route config — folder structure *is* the routing table. |
| **Full-stack in one codebase** | API routes / Route Handlers mean you don't need a separate backend for simple needs. |
| **Deployment story** | Built by Vercel, so first-class integration with Vercel's edge network (though it deploys anywhere via Node/Docker). |
| **Incremental adoption of new React features** | Server Components, streaming, and Suspense-based data fetching land in Next.js first in the ecosystem. |

## Real-World Analogy

If React is a box of **LEGO bricks**, Next.js is the **instruction booklet + pre-sorted bags** that tells you exactly which bricks go where to build a working house (routing), plumbing (data fetching), and electricity (API routes) — instead of you figuring out the wiring from scratch every time.

Another analogy: Next.js is like a **hotel** instead of building your own house (plain React + Webpack + React Router). The hotel already has rooms (pages/routes), room service (API routes), climate control (image/font optimization) — you just move in and start living, instead of laying foundation and wiring electricity yourself.

## History Timeline

```
2016 ── Next.js 1.0 released by Zeit (later renamed Vercel)
2017 ── Next.js 2, 3 — CSS-in-JS support, faster builds
2018 ── Next.js 6, 7 — Webpack customization, dynamic imports
2019 ── Next.js 9 — API routes, built-in TypeScript support, file-system routing formalized
2020 ── Next.js 9.3-10 — getStaticProps/getServerSideProps/getStaticPaths, Image component, ISR (Incremental Static Regeneration)
2021 ── Next.js 11-12 — Middleware, Rust-based compiler (SWC replacing Babel)
2022 ── Next.js 13 — App Router (beta), React Server Components, layouts, streaming
2023 ── Next.js 13.4-14 — App Router stable, Server Actions, Turbopack (dev, beta)
2024 ── Next.js 14-15 — Partial Prerendering (experimental), React 19 support, caching overhaul
```

## Advantages

- Best-in-class SEO/performance defaults for React apps.
- File-based routing dramatically reduces boilerplate.
- One codebase for frontend + lightweight backend (Route Handlers).
- Automatic image, font, and script optimization.
- First-class support for the newest React features (Server Components, streaming).
- Huge deployment flexibility (Vercel, self-hosted Node, Docker, static export for some use cases).

## Disadvantages

- **Steep learning curve for the App Router's caching model** — arguably the #1 developer complaint; caching behavior (fetch cache, Router cache, full route cache) is powerful but non-obvious.
- **Vendor gravity toward Vercel** — while it deploys elsewhere, some features (ISR, Edge runtime specifics) are most seamless on Vercel's infrastructure.
- **Server/Client component mental model** is a real paradigm shift, and mixing them incorrectly causes confusing errors.
- **Two router systems co-exist** (`pages/` legacy, `app/` modern) which can confuse tutorials/Stack Overflow answers of different vintages.
- Build times can grow significantly on very large apps (mitigated by Turbopack, still maturing).

---

# 2. Core Concepts

## 2.1 File-System-Based Routing

In the **App Router** (`app/` directory, Next.js 13+), folders define routes, and specific filenames define UI for that segment.

```
app/
├── page.tsx              → /
├── about/
│   └── page.tsx          → /about
├── blog/
│   ├── page.tsx          → /blog
│   └── [slug]/
│       └── page.tsx      → /blog/:slug   (dynamic route)
├── dashboard/
│   ├── layout.tsx        → shared layout for all /dashboard/* routes
│   ├── page.tsx          → /dashboard
│   └── settings/
│       └── page.tsx      → /dashboard/settings
```

**Special files** in the App Router:

| File | Purpose |
|---|---|
| `page.tsx` | Makes a route segment publicly accessible; defines the UI |
| `layout.tsx` | Shared UI wrapping child segments; preserves state across navigation |
| `loading.tsx` | Instant loading UI shown via Suspense while the segment loads |
| `error.tsx` | Error boundary UI for that segment (must be a Client Component) |
| `not-found.tsx` | UI shown when `notFound()` is called or a route doesn't match |
| `route.ts` | API "Route Handler" (GET/POST/etc.) instead of a page |
| `template.tsx` | Like layout, but creates a new instance (resets state) on navigation |

## 2.2 Server Components vs Client Components

**By default, every component in the App Router is a Server Component.** They render on the server, ship zero JS for their own logic to the browser, and can directly do async data fetching (`await fetch(...)`, DB queries).

```jsx
// app/products/page.jsx — Server Component (default, no directive needed)
async function ProductsPage() {
  const products = await db.products.findMany(); // direct DB access, no API route needed!
  return <ProductList products={products} />;
}
export default ProductsPage;
```

To use interactivity (hooks, event handlers, browser APIs), opt into a **Client Component** with the `"use client"` directive at the top of the file:

```jsx
"use client";
import { useState } from "react";

export default function LikeButton() {
  const [liked, setLiked] = useState(false);
  return <button onClick={() => setLiked(!liked)}>{liked ? "❤️" : "🤍"}</button>;
}
```

**Key rule:** Server Components can import and render Client Components. Client Components **cannot** import Server Components directly (but can receive them as `children`/props — "slot" pattern).

## 2.3 Data Fetching

**App Router** — fetch directly inside async Server Components, extending the native `fetch` with caching controls:

```jsx
// Cached indefinitely (like old getStaticProps)
const data = await fetch("https://api.example.com/data", { cache: "force-cache" });

// Never cached (like old getServerSideProps)
const data = await fetch("https://api.example.com/data", { cache: "no-store" });

// Revalidate every 60 seconds (like ISR)
const data = await fetch("https://api.example.com/data", { next: { revalidate: 60 } });
```

**Pages Router (legacy but still widely used/asked about)**:

```jsx
export async function getStaticProps() {
  const data = await fetchData();
  return { props: { data }, revalidate: 60 }; // ISR
}

export async function getServerSideProps(context) {
  const data = await fetchData();
  return { props: { data } }; // fresh on every request
}

export async function getStaticPaths() {
  return { paths: [{ params: { slug: "hello" } }], fallback: false };
}
```

## 2.4 Rendering Strategies

| Strategy | When HTML is generated | Use case |
|---|---|---|
| **SSG** (Static Site Generation) | At build time | Blogs, marketing pages, docs — content that's the same for all users |
| **SSR** (Server-Side Rendering) | Per request | Personalized dashboards, content that must be fresh every load |
| **ISR** (Incremental Static Regeneration) | At build time, then re-generated in background after a revalidation window | E-commerce product pages — mostly static, occasionally updated |
| **CSR** (Client-Side Rendering) | In the browser, after JS loads | Highly interactive, authenticated-only widgets where SEO doesn't matter |

## 2.5 Layouts and Nested Routing

Layouts wrap pages and **persist across navigations** within their segment — they don't re-render or lose state when navigating between child routes.

```jsx
// app/dashboard/layout.jsx
export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard">
      <Sidebar />       {/* stays mounted across dashboard sub-route navigation */}
      <main>{children}</main>
    </div>
  );
}
```

## 2.6 Route Handlers (API Routes)

```jsx
// app/api/users/route.ts
export async function GET(request) {
  const users = await db.user.findMany();
  return Response.json(users);
}

export async function POST(request) {
  const body = await request.json();
  const user = await db.user.create({ data: body });
  return Response.json(user, { status: 201 });
}
```

## 2.7 Middleware

Runs **before** a request completes, at the edge, for auth checks, redirects, rewrites, A/B testing, etc.

```jsx
// middleware.ts (project root)
import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token");
  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/dashboard/:path*"] };
```

## 2.8 Image, Font, and Script Optimization

```jsx
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

<Image src="/hero.jpg" width={800} height={400} alt="Hero" priority />
```
`next/image` automatically serves responsive, lazy-loaded, modern-format (WebP/AVIF) images with correct `width`/`height` to prevent layout shift (CLS). `next/font` self-hosts Google Fonts at build time (no runtime request to Google, better privacy and performance).

## 2.9 Server Actions

Functions that run on the server, callable directly from Client Components (or forms) without manually creating an API route — Next.js handles the network call under the hood.

```jsx
// app/actions.ts
"use server";

export async function createPost(formData) {
  const title = formData.get("title");
  await db.post.create({ data: { title } });
  revalidatePath("/posts");
}

// app/new-post/page.jsx
import { createPost } from "../actions";

export default function NewPost() {
  return (
    <form action={createPost}>
      <input name="title" />
      <button type="submit">Create</button>
    </form>
  );
}
```

---

# 3. Internal Working / Architecture

## 3.1 Request Lifecycle (App Router, Production)

```
Request hits Next.js server (or Vercel Edge Network)
        │
        ▼
Middleware runs (edge runtime) — auth check, redirects, rewrites
        │
        ▼
Router matches URL to a route segment tree (nested layouts + page)
        │
        ▼
For each segment: is there a cached render? (Full Route Cache)
   ├─ YES → serve cached static HTML/RSC payload immediately
   └─ NO  → render Server Components (may fetch data, hit Data Cache)
        │
        ▼
React streams HTML to the client as each Suspense boundary resolves
(loading.tsx shown for segments still pending)
        │
        ▼
Client receives HTML + a serialized "React Server Component payload"
        │
        ▼
Client Components hydrate (attach event listeners, become interactive)
        │
        ▼
Client-side navigation from here on: Router Cache reuses already-fetched
segments; only changed segments re-fetch from the server (soft navigation)
```

## 3.2 The Four Next.js Caches (App Router) — this is the #1 interview topic

| Cache | What it stores | Persists across | Controlled by |
|---|---|---|---|
| **Request Memoization** | Dedupes identical `fetch()` calls during a single render pass | One render only | Automatic (React `cache()` under the hood) |
| **Data Cache** | Results of `fetch()` calls | Across requests, persists on server (even across deploys unless invalidated) | `fetch` options: `cache`, `next.revalidate`, `next.tags` |
| **Full Route Cache** | Rendered HTML + RSC payload for a route at build time | Across requests, until revalidated/redeployed | Static vs dynamic rendering decision, `revalidate` |
| **Router Cache** (client-side) | Visited route segments, in the browser | Session/navigation, brief TTL | Automatic; `router.refresh()` clears it |

Understanding **which cache** is causing "stale data" bugs is one of the highest-signal senior Next.js interview topics.

## 3.3 Static vs Dynamic Rendering Decision

Next.js decides whether a route is **static** (rendered at build time / cached) or **dynamic** (rendered per-request) based on whether it uses "dynamic APIs":

```
Uses cookies(), headers(), searchParams, or a `fetch` with cache: 'no-store'?
      │
     YES ──────────────▶ Route is rendered DYNAMICALLY (per request)
      │
     NO
      │
      ▼
Route is rendered STATICALLY at build time (and cached)
```

## 3.4 Streaming SSR with Suspense

Instead of waiting for the *entire* page's data before sending any HTML, Next.js can stream in independently-resolving chunks:

```
Server render starts
   │
   ├─▶ Fast section (e.g., navbar) — HTML sent immediately
   ├─▶ Slow section (e.g., recommendations widget wrapped in <Suspense>)
   │        — a loading fallback is sent first, then the real content
   │          is streamed in and swaps in-place once its data resolves
   └─▶ Browser progressively displays content instead of a blank screen
```

## 3.5 Server Component "RSC Payload" 

When a Server Component renders, React doesn't send raw HTML alone — it also generates a special serialized format (the RSC payload) describing the component tree, including "holes" where Client Components should be hydrated with their props. This payload is what allows Next.js to do **partial re-renders** on client-side navigation (re-fetching only the RSC payload for the changed segment, not the whole page).

---

# 4. Visual Diagrams

## 4.1 App Router Segment → Layout Nesting

```
URL: /dashboard/settings/profile

app/layout.tsx (root layout — always rendered)
   └── app/dashboard/layout.tsx (persists across dashboard/* navigation)
        └── app/dashboard/settings/layout.tsx (optional nested layout)
             └── app/dashboard/settings/profile/page.tsx (the actual page)
```

## 4.2 Server vs Client Component Boundary

```
┌─────────────── Server Component (default) ───────────────┐
│  async function Page() {                                   │
│    const data = await db.query();     ← runs ONLY on server │
│    return (                                                 │
│      <div>                                                  │
│        <StaticHeader data={data} />   ← still Server Component
│        <LikeButton initialCount={data.likes} />  ┐          │
│      </div>                                        │        │
│    );                                              │        │
│  }                                                 │        │
└─────────────────────────────────────────────────────┼───────┘
                                                         │ crosses boundary
                                                         ▼
                                   ┌─── Client Component ("use client") ───┐
                                   │  function LikeButton({ initialCount }) │
                                   │  { const [n,setN]=useState(initialCount);
                                   │    return <button onClick={...}>{n}</button>;
                                   │  }                                     │
                                   └────────────────────────────────────────┘
```

## 4.3 Rendering Strategy Decision Tree

```
Does content differ per user/request?
        │
   ┌────┴────┐
   NO         YES
   │           │
   ▼           ▼
 Is it     Does it need to be
 known      100% fresh every
 at        request (e.g. bank
 build      balance)?
 time?          │
   │        ┌───┴────┐
  YES       YES       NO (ok to be up to N seconds stale)
   │         │          │
   ▼         ▼          ▼
  SSG       SSR         ISR (revalidate: N)
```

## 4.4 Cache Layers Visualized

```
Browser
   │
   ▼
Router Cache (client, per-session) ──── miss ───▶
   │ hit                                          │
   ▼                                               ▼
Serve cached segment              Full Route Cache (server, per-route)
                                          │ miss                │ hit
                                          ▼                     ▼
                                   Render Server Components   Serve cached HTML/RSC
                                          │
                                          ▼
                                   Data Cache (per fetch() call)
                                          │ miss
                                          ▼
                                   Actual data source (DB/API)
```

---

# 5. Code Examples

## 5.1 Dynamic Routes — Simple → Production

**Simple:**
```jsx
// app/blog/[slug]/page.jsx
export default async function BlogPost({ params }) {
  const post = await getPost(params.slug);
  return <article><h1>{post.title}</h1><p>{post.body}</p></article>;
}
```

**Production (with static params generation, metadata, and 404 handling):**
```jsx
// app/blog/[slug]/page.jsx
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const posts = await getAllPostSlugs();
  return posts.map(post => ({ slug: post.slug })); // pre-renders these at build time
}

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt, openGraph: { images: [post.coverImage] } };
}

export default async function BlogPost({ params }) {
  const post = await getPost(params.slug);
  if (!post) notFound(); // renders the nearest not-found.tsx with a 404 status

  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.sanitizedHtml }} />
    </article>
  );
}
```

## 5.2 Data Fetching with Caching Control

```jsx
// Product page: mostly static, revalidate every hour, but can be tagged
// for on-demand invalidation when an admin updates the product.
async function getProduct(id) {
  const res = await fetch(`https://api.shop.com/products/${id}`, {
    next: { revalidate: 3600, tags: [`product-${id}`] }
  });
  return res.json();
}

// Elsewhere, e.g., in a Server Action after an admin edits the product:
import { revalidateTag } from "next/cache";
async function updateProduct(id, data) {
  await db.product.update({ where: { id }, data });
  revalidateTag(`product-${id}`); // immediately invalidates the Data Cache for this tag
}
```

## 5.3 Server Actions — Production Form Handling

```jsx
// app/actions/contact.ts
"use server";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  message: z.string().min(10),
});

export async function submitContact(prevState, formData) {
  const parsed = schema.safeParse({
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  await sendEmail(parsed.data);
  return { success: true };
}
```

```jsx
// app/contact/page.jsx
"use client";
import { useFormState, useFormStatus } from "react-dom";
import { submitContact } from "../actions/contact";

function SubmitButton() {
  const { pending } = useFormStatus();
  return <button disabled={pending}>{pending ? "Sending..." : "Send"}</button>;
}

export default function ContactForm() {
  const [state, formAction] = useFormState(submitContact, {});
  return (
    <form action={formAction}>
      <input name="email" type="email" />
      {state.errors?.email && <p>{state.errors.email[0]}</p>}
      <textarea name="message" />
      <SubmitButton />
    </form>
  );
}
```

## 5.4 Middleware — Production Auth Guard

```jsx
// middleware.ts
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const token = request.cookies.get("session")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    return NextResponse.next();
  } catch {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("session");
    return response;
  }
}

export const config = { matcher: ["/dashboard/:path*", "/admin/:path*"] };
```

## 5.5 Parallel and Intercepting Routes (Advanced Patterns)

```
app/
├── @modal/                     ← parallel route slot
│   └── (.)photo/[id]/page.jsx  ← intercepts /photo/:id when navigated from within the app
├── photo/
│   └── [id]/page.jsx           ← full page version when visited directly (e.g., shared link)
└── layout.jsx                  ← renders {children} AND {modal} slots simultaneously
```
Used for the classic "Instagram photo modal" pattern: clicking a photo from a feed opens it as a modal overlay (intercepted route), but a direct link/refresh shows the full standalone page.

---

# 6. Real World Usage

| Concept | Where it shows up in real projects |
|---|---|
| ISR | E-commerce product/category pages (Vercel's own case studies; Target-scale retailers) — mostly static, revalidated periodically or on-demand after inventory/price changes |
| Middleware | Auth gating (`/dashboard/*`), geolocation-based redirects (`/us` vs `/eu`), A/B testing via cookie-based routing |
| Server Actions | Forms without a separate API layer — contact forms, comment submission, admin CRUD panels |
| Streaming + Suspense | Dashboards with a fast "shell" (nav, KPIs) and slow widgets (heavy analytics charts) that stream in independently |
| `generateStaticParams` | Blogs/docs sites — pre-render every known post/page at build time for instant loads |
| Route Handlers | Webhook receivers (Stripe, GitHub), lightweight internal APIs consumed by the same app's client components |
| Image optimization | Any content-heavy site (news, e-commerce) — automatic responsive images cut Largest Contentful Paint significantly |
| Parallel/Intercepting routes | Social apps' modal patterns (photo viewers, quick-view product modals) |

**Example — Vercel's own marketing/docs site**: statically generated (SSG) for near-instant loads and perfect SEO, with ISR for docs pages that update periodically without a full rebuild.

**Example — SaaS dashboard**: root layout renders persistent nav/sidebar (Server Component), while the live data widgets are Client Components using `useEffect`/`useSWR` for real-time polling, wrapped in Suspense boundaries fed by fast initial Server Component data.

---

# 7. Best Practices

## Folder Structure (App Router, feature-colocated)

```
app/
├── (marketing)/            # route group — doesn't affect URL, groups related routes
│   ├── page.jsx            → /
│   └── about/page.jsx      → /about
├── (app)/
│   ├── layout.jsx           # authenticated app shell
│   └── dashboard/
│       ├── page.jsx
│       └── _components/     # private folder (underscore) — not routable
│           └── RevenueChart.jsx
├── api/
│   └── webhooks/stripe/route.ts
├── actions/                # Server Actions grouped by domain
│   ├── posts.ts
│   └── users.ts
├── lib/                    # DB clients, utilities, shared server logic
└── layout.jsx               # root layout
```

## Naming & Organization

- Use **route groups** `(groupName)` to organize without affecting the URL (e.g., separating marketing pages from authenticated app pages under different layouts).
- Prefix non-routable helper folders with `_` (e.g., `_components/`) so Next.js never treats them as routes.
- Keep Server Actions in a dedicated `actions/` folder, one file per domain, always starting with `"use server"`.

## Optimization

- Push data fetching as deep/close to where it's needed as possible in Server Components — Next.js automatically dedupes identical `fetch` calls within a render (Request Memoization), so don't over-engineer prop drilling to "avoid re-fetching."
- Use `generateStaticParams` for any dynamic route where the full set of values is knowable ahead of time (blog slugs, product IDs).
- Wrap slow, independent sections in `<Suspense>` boundaries so fast content isn't blocked by slow content (streaming).
- Use `next/image` and `next/font` always — never raw `<img>`/Google Fonts `<link>` tags in production.

## Security

- Never trust `formData` in a Server Action without server-side validation (Zod/Yup) — the network boundary is still crossed even though it "feels" like a local function call.
- Keep secrets (`DATABASE_URL`, API keys) in server-only environment variables (no `NEXT_PUBLIC_` prefix) — anything prefixed `NEXT_PUBLIC_` is bundled into client JS and publicly visible.
- Validate/authorize in Middleware AND in the actual Route Handler/Server Action — Middleware alone can be bypassed in some edge caching/misconfiguration scenarios, so defense-in-depth matters.

## Maintainability

- Keep Client Component boundaries as small/deep as possible ("leaf" components) — don't slap `"use client"` on an entire page just because one button needs `onClick`.
- Document caching intent explicitly (`{ cache: 'no-store' }` vs `{ next: { revalidate: 60 } }`) — implicit defaults change between Next.js versions and confuse future maintainers.

---

# 8. Common Beginner Mistakes

| Mistake | Why it happens | Fix |
|---|---|---|
| Adding `"use client"` to the entire app/root layout | Hitting a hooks error and reflexively slapping the directive on the nearest file | Push `"use client"` down to only the specific leaf component needing interactivity/hooks |
| Trying to `import` a Server Component inside a Client Component | Assuming components compose the same regardless of boundary | Pass the Server Component as `children`/a prop from a parent Server Component instead |
| Expecting `fetch` to always be fresh | Not knowing Next.js extends `fetch` with caching by default in many cases | Explicitly set `{ cache: 'no-store' }` or use `revalidate` intentionally, and understand the default has changed across Next.js versions |
| Using `useState`/`useEffect` in a `page.jsx` without `"use client"` | Copy-pasting patterns from plain React tutorials | Add `"use client"` at the top of any file using hooks, event handlers, or browser-only APIs |
| Forgetting `generateStaticParams` and wondering why dynamic routes 404 in static export | Not realizing static builds need to know all possible param values ahead of time | Implement `generateStaticParams`, or accept dynamic (per-request) rendering if the full set isn't knowable |
| Storing secrets in `NEXT_PUBLIC_*` env vars | Not realizing the prefix controls client bundle exposure | Only prefix env vars meant to be public; keep secrets unprefixed and server-only |
| Confusing Middleware with a full backend | Assuming Middleware can do anything a Node server can | Middleware runs on a limited Edge Runtime (no full Node APIs, no direct DB drivers in most cases) — keep it to lightweight checks/redirects |
| Not handling loading/error states per route segment | Coming from single-page CSR apps without per-segment UX | Add `loading.tsx`/`error.tsx` files per segment for real streaming UX benefits |

---

# 9. Advanced Topics

## 9.1 Partial Prerendering (PPR) — Experimental

A hybrid rendering mode combining **static** and **dynamic** in the *same page*: the static "shell" is served instantly from the cache, while dynamic "holes" (wrapped in Suspense) stream in per-request. This aims to give SSG's speed with SSR's freshness, without picking one strategy per whole route.

## 9.2 Edge Runtime vs Node.js Runtime

| | Edge Runtime | Node.js Runtime |
|---|---|---|
| Where it runs | Distributed edge locations, close to the user | Traditional server region |
| Startup | Near-instant (no cold start like traditional serverless) | Standard Node cold start |
| API surface | Limited (Web APIs only — `fetch`, `Request`/`Response`) | Full Node.js API (fs, native modules, etc.) |
| Use case | Middleware, lightweight auth checks, geolocation logic | Full DB access, heavy computation, legacy Node libraries |

## 9.3 `revalidatePath` vs `revalidateTag`

```jsx
revalidatePath("/blog/hello-world"); // invalidates cache for a specific path
revalidateTag("posts");              // invalidates every fetch() tagged with 'posts', across any path
```
`revalidateTag` is more flexible for invalidating data used across multiple pages (e.g., a "featured posts" widget appearing on both the homepage and a category page) without knowing every path in advance.

## 9.4 Parallel Data Fetching vs Waterfalls

```jsx
// ❌ Waterfall — second fetch waits for first to fully resolve unnecessarily
async function Page() {
  const user = await getUser();
  const posts = await getPosts(); // could have started immediately
  return <Profile user={user} posts={posts} />;
}

// ✅ Parallel — both requests fire immediately
async function Page() {
  const userPromise = getUser();
  const postsPromise = getPosts();
  const [user, posts] = await Promise.all([userPromise, postsPromise]);
  return <Profile user={user} posts={posts} />;
}
```

## 9.5 `next/dynamic` for Client-Only / Heavy Components

```jsx
import dynamic from "next/dynamic";

const HeavyChart = dynamic(() => import("../components/HeavyChart"), {
  ssr: false,        // skip server rendering entirely (e.g., a library needing `window`)
  loading: () => <Spinner />,
});
```

## 9.6 Internationalization (i18n)

App Router doesn't have built-in i18n routing config like the old Pages Router did — it's implemented via middleware-based locale detection/redirects plus dynamic segments (`app/[locale]/...`), typically paired with a library like `next-intl`.

## 9.7 Draft Mode / Preview Content

```jsx
// app/api/draft/route.ts
import { draftMode } from "next/headers";
export async function GET(request) {
  draftMode().enable();
  return new Response("Draft mode enabled");
}
```
Lets CMS editors preview unpublished content by bypassing the static cache for that session, rendering fresh/draft data instead.

---

# 10. Interview Questions

## 10.1 Beginner Questions

**Q1. What is Next.js and how does it relate to React?**

> *Ideal answer:* Next.js is a framework built on top of React that adds routing, rendering strategies (SSR/SSG/ISR), API routes, and build/deploy tooling — things React itself doesn't provide out of the box.
> *Tests:* Basic scope understanding — a common follow-up trap is "so Next.js replaces React," which is wrong.

**Q2. How does file-system routing work in the App Router?**

> *Ideal answer:* Each folder under `app/` represents a URL segment; a `page.jsx` file inside a folder makes that segment a navigable route rendering that component. Dynamic segments use bracket syntax, e.g. `[slug]`.

**Q3. What's the difference between `pages/` and `app/` directories?**

> *Ideal answer:* `pages/` is the original (now legacy but still supported) router — one file per route, data fetching via `getStaticProps`/`getServerSideProps`. `app/` (Next.js 13+) is built on React Server Components, supports nested layouts, streaming, and colocated Route Handlers/Server Actions — the current recommended approach for new projects.

**Q4. What is SSR?**

> *Ideal answer:* Server-Side Rendering — the server generates the full HTML for a page on every request, sent to the browser already populated (good for SEO and personalized/fresh content), then React "hydrates" it to become interactive.

**Q5. What is SSG?**

> *Ideal answer:* Static Site Generation — HTML is generated once, at build time, and served as a static file to every visitor (fastest possible response, ideal for content that doesn't change per-user).

**Q6. What is a Server Component, in simple terms?**

> *Ideal answer:* A component that renders exclusively on the server and never ships its own JavaScript to the browser — the default for every component in the App Router unless marked `"use client"`.

**Q7. What does the `"use client"` directive do?**

> *Ideal answer:* Marks a file's component (and everything it imports) as a Client Component, allowed to use hooks, state, and browser/event APIs, and shipping its JS to the browser for hydration.

**Q8. What is `next/image` and why not just use `<img>`?**

> *Ideal answer:* `next/image` automatically optimizes images — resizing, serving modern formats (WebP/AVIF), lazy loading offscreen images, and preventing layout shift by requiring width/height — all things you'd otherwise hand-roll or forget.

**Q9. What is a Route Handler?**

> *Ideal answer:* A `route.ts` file exporting HTTP-method functions (`GET`, `POST`, etc.) that acts like a backend API endpoint colocated inside the `app/` directory, replacing the old `pages/api` folder.

**Q10. What is Middleware in Next.js?**

> *Ideal answer:* Code that runs before a request is completed, at the edge, used for tasks like auth checks, redirects, or rewrites — defined in a single `middleware.ts` file at the project root with a `matcher` config for which paths it applies to.

*(Beginner set continues with: what a layout is and why it persists across navigation, difference between `<Link>` and `<a>`, what `next.config.js` is for, environment variable conventions (`NEXT_PUBLIC_`), what `notFound()` does, difference between static and dynamic routes, what `generateMetadata` is for, and the purpose of `loading.tsx`.)*

## 10.2 Intermediate Questions

**Q1. Explain the four caching layers in the Next.js App Router.**

> *Ideal answer:* Request Memoization (dedupes identical fetches within one render pass), Data Cache (persists `fetch` results across requests per its cache config), Full Route Cache (stores the rendered HTML/RSC payload for a whole static route), and Router Cache (client-side, caches visited segments for fast back/forward navigation). Each has different scope and invalidation triggers — a favorite senior-level topic because misunderstanding it causes "why is my data stale" bugs constantly.

**Q2. When would you choose ISR over full SSR?**

> *Ideal answer:* ISR when content changes infrequently but must stay reasonably fresh (product catalogs, blog listings) — you get SSG's speed/cache-hit-rate with periodic background regeneration, instead of paying a full server-render cost on every single request as SSR does.

**Q3. Why can't a Client Component directly import a Server Component?**

> *Ideal answer:* Because a Client Component's code (and everything it imports) is bundled and sent to the browser — but Server Components may use server-only APIs (DB clients, filesystem access, secrets) that cannot exist in browser JS. The fix is passing Server Components down as `children`/props from a parent Server Component, so the Client Component just "slots" already-rendered content in without needing to import or re-render it itself.

**Q4. What's the difference between `revalidatePath` and `revalidateTag`?**

> *Ideal answer:* `revalidatePath` invalidates the cache for one specific route path. `revalidateTag` invalidates every cached `fetch` call across the entire app that was tagged with that tag, regardless of which page(s) used it — more efficient when the same data appears on multiple pages.

**Q5. What problem do Server Actions solve compared to a traditional API route + client fetch?**

> *Ideal answer:* They let you call a server-side function directly from a form or client event handler without manually wiring up a Route Handler, a `fetch` call, and response parsing — Next.js handles the network boundary, serialization, and (with progressive enhancement) even works without JavaScript enabled on `<form action={serverAction}>`.

**Q6. Explain nested layouts and why they preserve state across navigation.**

> *Ideal answer:* A `layout.jsx` wraps its child segments and is **not** re-rendered/remounted when navigating between those children — only the `page.jsx` content inside changes. This means state in the layout (like a sidebar's expanded/collapsed state, or an open WebSocket connection) survives client-side route changes within that segment.

**Q7. How does streaming SSR with Suspense improve perceived performance?**

> *Ideal answer:* Instead of blocking the entire response until the slowest piece of data resolves, Next.js can send the fast, ready parts of the HTML immediately and stream in slower Suspense-wrapped sections as their data resolves — improving Time to First Byte and perceived load speed even though total data-fetch time is unchanged.

**Q8. What determines whether a route is statically or dynamically rendered?**

> *Ideal answer:* Use of "dynamic APIs" like `cookies()`, `headers()`, reading `searchParams`, or a `fetch` call configured with `cache: 'no-store'` forces dynamic (per-request) rendering; otherwise Next.js renders the route statically at build time.

**Q9. What's the purpose of route groups `(folderName)`?**

> *Ideal answer:* They let you organize routes into logical groups (e.g., separating a marketing site's pages from an authenticated app's pages, each with their own layout) without the group name appearing in the actual URL.

**Q10. How would you handle authentication across both Middleware and Server Components?**

> *Ideal answer:* Use Middleware for a fast, edge-level redirect of clearly unauthenticated requests (checking for a session cookie's presence). Then, still verify/authorize properly inside the actual Server Component or Route Handler/Server Action (checking the token's validity, user permissions) — Middleware is a first line of defense, not the sole authorization boundary, since it runs in a limited Edge Runtime and shouldn't be the only gate for sensitive operations.

*(Intermediate set continues with: `generateStaticParams` and dynamic route pre-rendering, `next/dynamic` for client-only components, environment variable exposure rules, image optimization internals (`next/image` responsive `srcset` generation), differences between `redirect()` and `NextResponse.redirect`, and `useFormState`/`useFormStatus` patterns for Server Action forms.)*

## 10.3 Advanced Questions

**Q1. Walk through exactly what happens on the server when a request hits a partially-cached dynamic page using streaming.**

> *Ideal answer:* Middleware runs first (Edge Runtime). The router resolves the matching layout/page tree. For segments with a valid Full Route Cache entry (static), cached HTML/RSC payload is served immediately. For dynamic segments, Server Components render — any wrapped in `<Suspense>` that are still awaiting data get a `loading.tsx`-derived fallback streamed first, while React continues rendering in the background and streams the real content in-place once ready, using out-of-order streaming (later-resolving content doesn't block earlier content already sent).

**Q2. Explain the RSC payload and why it enables efficient client-side navigation.**

> *Ideal answer:* When Server Components render, Next.js/React generate a serialized description of the resulting tree — not raw HTML alone, but a payload describing which parts are static (already-rendered content) and where Client Component "holes" exist along with their serialized props. On client-side navigation, Next.js can request just the RSC payload for the newly needed segment(s) — not a full page reload nor a full app JS re-fetch — enabling fast, partial updates.

**Q3. How would you debug "stale data" bugs when a Server Action updates the DB but the UI doesn't reflect it?**

> *Ideal answer:* Check whether the corresponding `fetch` calls displaying that data have appropriate cache tags/paths, and whether the Server Action calls `revalidatePath`/`revalidateTag` after the mutation. Also check the Router Cache client-side — sometimes a `router.refresh()` is needed to force the client to re-request the current route's Server Components rather than reusing a cached client-side navigation entry.

**Q4. Discuss trade-offs of Partial Prerendering versus choosing SSR or SSG per-route.**

> *Ideal answer:* PPR aims to let a single route have both an instantly-served static shell and per-request dynamic content, avoiding the traditional binary choice of "the whole route is static" or "the whole route is dynamic." The trade-off is added complexity in reasoning about which parts of a component tree are static vs dynamic, and (as of its experimental status) less mature tooling/debugging support compared to well-established SSR/SSG.

**Q5. Why does Next.js recommend pushing `"use client"` boundaries as deep/small as possible, and what's the actual cost if you don't?**

> *Ideal answer:* Every Client Component (and its subtree, and everything it imports) ships JS to the browser and loses the "zero client JS" benefit of Server Components. Marking a whole page as `"use client"` because one nested button needs `onClick` forces the entire subtree — including components that could've been server-rendered with zero JS cost — into the client bundle, increasing bundle size and losing direct server-side data-fetching capability for that whole tree.

**Q6. Explain how Middleware's Edge Runtime constraints affect what you can and can't do there.**

> *Ideal answer:* The Edge Runtime is a lightweight, V8-isolate-based runtime supporting standard Web APIs (`fetch`, `Request`/`Response`, Web Crypto) but not full Node.js APIs (no native `fs`, no arbitrary native Node modules, limited/no direct traditional DB TCP drivers in many cases). This is why Middleware should stay fast/lightweight (auth token presence checks, geolocation, redirects) rather than doing heavy database queries or CPU-intensive logic.

*(Advanced set continues with: Turbopack vs Webpack trade-offs, `unstable_cache` for wrapping arbitrary async functions with the Data Cache, self-hosting Next.js vs Vercel-specific feature parity, parallel/intercepting route implementation details, and strategies for incrementally migrating a large Pages Router app to the App Router.)*

## 10.4 Scenario-Based Questions

**Q1. A product page shows outdated pricing for up to an hour after an admin updates it, even though `revalidate: 60` is set. Why might it still feel stale, and what would you check?**

> *Ideal answer:* Check whether the specific `fetch` call for that product actually includes the `revalidate`/tag config, versus a *different* fetch (e.g., a cached aggregate "featured products" list elsewhere) still serving old data. Also verify whether an intervening CDN/edge cache (if self-hosted or behind another proxy) has its own TTL stacking on top of Next.js's cache. Consider using `revalidateTag` triggered directly from the admin update action for instant invalidation instead of relying purely on the time-based window.

**Q2. Users on slow connections see a fully blank white screen for several seconds on a data-heavy dashboard route. How do you improve this without changing the backend?**

> *Ideal answer:* Wrap slow, independent widgets in `<Suspense>` boundaries with meaningful `loading.tsx`/fallback UI so fast content (nav, header, KPI summary if quick) streams immediately while slower widgets show skeletons and stream in afterward — converting an all-or-nothing wait into a progressively-rendering page.

**Q3. A Client Component throws "Error: You're importing a component that needs `useState`... This only works in a Client Component." What's the likely mistake and fix?**

> *Ideal answer:* A component using hooks is missing the `"use client"` directive at the top of its file, or it's being imported into a file that itself lacks the directive while still trying to use client-only features. Add `"use client"` to the specific file defining that component.

*(Additional scenarios: debugging hydration mismatches caused by locale/timezone-dependent formatting, diagnosing why `NEXT_PUBLIC_` env var changes aren't reflected without a rebuild, and resolving duplicate/competing data fetches causing a request waterfall on a slow-loading profile page.)*

## 10.5 Practical / Debugging / Coding Questions

**Q1 (Debugging). This Server Action doesn't seem to update the UI after submission, even though the DB write succeeds:**
```jsx
"use server";
export async function addComment(formData) {
  await db.comment.create({ data: { text: formData.get("text") } });
}
```
> *Ideal answer:* Missing cache invalidation — the page displaying comments is likely statically cached or its `fetch` call isn't tagged/revalidated. Fix by calling `revalidatePath("/posts/[id]")` (or the specific path) or `revalidateTag("comments")` after the DB write, matching how the comments data was originally fetched/tagged.

**Q2 (Coding). Implement a dynamic route with `generateStaticParams` for a docs site with nested categories: `/docs/[category]/[slug]`.**
```jsx
export async function generateStaticParams() {
  const docs = await getAllDocs(); // [{ category: 'guides', slug: 'intro' }, ...]
  return docs.map(doc => ({ category: doc.category, slug: doc.slug }));
}

export default async function DocPage({ params }) {
  const doc = await getDoc(params.category, params.slug);
  if (!doc) notFound();
  return <DocContent doc={doc} />;
}
```

**Q3 (Debugging). Middleware-based auth redirect works locally but users report being stuck in an infinite redirect loop in production.**

> *Ideal answer:* Most likely the `matcher` config also matches the `/login` route itself, so an unauthenticated user hitting `/login` gets redirected... back to `/login`. Fix the matcher to exclude the login route (or add an explicit check inside the middleware function: `if (request.nextUrl.pathname === '/login') return NextResponse.next();`).

---

# 11. Coding Exercises

## Easy
**Build a static blog listing page** using `app/blog/page.jsx` that fetches posts with `{ next: { revalidate: 3600 } }` and renders a list of `<Link>`s to `/blog/[slug]`.

## Medium
**Build an authenticated dashboard** with Middleware redirecting unauthenticated users to `/login`, a persistent `layout.jsx` sidebar, and a `loading.tsx` skeleton for a slow-loading analytics widget wrapped in Suspense.

## Hard
**Build a comment system using Server Actions** — form submission creates a comment via a Server Action, invalidates the correct cache tag, includes optimistic UI update on the client (`useOptimistic`), and gracefully handles validation errors returned from the server via `useFormState`.

## Interview Level
**Design the caching strategy for a news site homepage** that shows: (a) a static "About" section, (b) a list of articles that should update every 5 minutes, (c) a personalized "recommended for you" widget requiring the logged-in user's cookie. Explain, in your answer, which Next.js caching mechanism and rendering strategy you'd apply to each of the three sections and why, including how you'd structure Suspense boundaries so (c) doesn't block (a) and (b) from rendering fast.

---

# 12. MCQs

**1. By default, what type of component is every component inside the `app/` directory?**
A) Client Component
B) Server Component ✅
C) Static Component
D) Hybrid Component

*Explanation:* The App Router flips the historical default — everything is a Server Component unless explicitly marked `"use client"`.

**2. Which caching layer would you invalidate to force fresh data across every page using a specific tagged `fetch` call?**
A) Router Cache
B) Request Memoization
C) Data Cache via `revalidateTag` ✅
D) Full Route Cache only

*Explanation:* `revalidateTag` targets the Data Cache entries sharing that tag, wherever they're used across the app — broader and more targeted than invalidating one specific route path.

**3. What happens if a route uses `cookies()` inside a Server Component?**
A) Nothing changes, it still renders statically
B) The route is forced into dynamic (per-request) rendering ✅
C) It throws a build error
D) It only works in Middleware

*Explanation:* `cookies()`/`headers()`/reading `searchParams` are "dynamic APIs" that require per-request rendering, since their values can differ for every request.

**4. Where does Middleware run?**
A) In the browser
B) On a full Node.js server only
C) At the edge, before the request completes ✅
D) After the page has already rendered

*Explanation:* Middleware executes on Next.js's Edge Runtime, intercepting the request before routing/rendering proceeds — ideal for lightweight, low-latency checks.

**5. What's the main reason to avoid marking an entire page as `"use client"` unnecessarily?**
A) It's not allowed on `page.jsx` files
B) It disables `next/image` optimization
C) It forces that whole subtree's JS to ship to the browser, losing Server Component benefits ✅
D) It breaks routing

*Explanation:* The cost isn't a hard restriction — it's a performance/architecture trade-off: unnecessary Client Component boundaries increase bundle size and remove the ability to fetch data directly/server-side within that subtree.

*(Additional MCQs cover: `getStaticProps` vs `getServerSideProps` distinctions (Pages Router), `next/image` required props, `generateMetadata` vs static `metadata` export, `notFound()` behavior, and correct Server Action form wiring with `action={serverActionFn}`.)*

---

# 13. Flashcards

- **What is the App Router built on?** → *React Server Components, enabling server-only rendering by default with opt-in Client Components.*
- **What does `"use client"` do?** → *Marks a file's component tree as client-rendered, enabling hooks/interactivity, and ships its JS to the browser.*
- **What are the four App Router caches?** → *Request Memoization, Data Cache, Full Route Cache, Router Cache.*
- **When is a route rendered dynamically instead of statically?** → *When it uses `cookies()`, `headers()`, reads `searchParams`, or fetches with `cache: 'no-store'`.*
- **What does `generateStaticParams` do?** → *Tells Next.js which dynamic route param values to pre-render at build time.*
- **What is ISR?** → *Incremental Static Regeneration — statically generated pages that re-generate in the background after a revalidation window, without a full rebuild.*
- **What does `revalidateTag` do differently from `revalidatePath`?** → *Invalidates all cached fetches sharing a tag across the whole app, not just one specific route path.*
- **What is a Server Action?** → *A server-only function (marked `"use server"`) callable directly from client forms/components without manually building an API route.*
- **What does `next/image` do automatically?** → *Resizes, serves modern formats, lazy-loads offscreen images, and prevents layout shift via required width/height.*
- **Where does Middleware run and what can't it do?** → *Edge Runtime — no full Node APIs, so avoid heavy DB queries/CPU-intensive logic there.*

---

# 14. Cheat Sheet

```
SPECIAL FILES (App Router)
───────────────────────────
page.tsx        → route UI
layout.tsx       → persistent wrapper UI, preserves state across nav
loading.tsx       → Suspense fallback for that segment
error.tsx          → error boundary (must be Client Component)
not-found.tsx       → 404 UI
route.ts             → API endpoint (GET/POST/etc.)
template.tsx          → like layout but remounts on navigation

FETCH CACHING CHEAT SHEET
──────────────────────────
{ cache: 'force-cache' }         → static, cached indefinitely (default in many cases)
{ cache: 'no-store' }             → always fresh, forces dynamic rendering
{ next: { revalidate: 60 } }       → ISR-style, revalidate every 60s
{ next: { tags: ['posts'] } }        → tag for on-demand revalidateTag() invalidation

RENDERING STRATEGY PICKER
──────────────────────────
Same for all users, rarely changes     → SSG
Same for all users, changes sometimes  → ISR
Different per user / must be fresh     → SSR
Highly interactive, SEO doesn't matter → CSR

SERVER VS CLIENT COMPONENT
───────────────────────────
Default                → Server Component (no directive)
Needs hooks/state       → add "use client"
Needs DB/secrets access → keep as Server Component
Needs onClick/onChange  → add "use client"
```

---

# 15. Revision Notes

## ⏱ 5-Minute Revision
- Next.js = React framework: file-based routing + SSR/SSG/ISR + API routes.
- App Router (`app/`) = Server Components by default; `"use client"` opts into interactivity.
- `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx` special files.
- SSG (build time) vs SSR (per request) vs ISR (static + periodic regen) vs CSR (browser only).

## ⏱ 15-Minute Revision
Add:
- Four caches: Request Memoization, Data Cache, Full Route Cache, Router Cache.
- Server Actions (`"use server"`) for form/mutation handling without manual API routes.
- Middleware runs at the edge, before routing, for auth/redirects — limited runtime (no full Node APIs).
- `generateStaticParams` pre-renders dynamic route params at build time.
- `next/image` and `next/font` automatic optimization.

## ⏱ 30-Minute Revision
Add:
- Streaming SSR + Suspense boundaries for progressive rendering.
- RSC payload concept and why it enables fast partial client navigation.
- `revalidatePath` vs `revalidateTag` — path-scoped vs tag-scoped invalidation.
- Route groups `(name)` and private folders `_name` for organization without affecting URLs.
- Parallel routes (`@slot`) and intercepting routes (`(.)segment`) for modal patterns.
- Edge Runtime vs Node.js Runtime trade-offs.

## ⏱ 1-Hour Revision
Add everything above plus:
- Walk through the full request lifecycle diagram (section 3.1) from memory, including cache-hit/miss branching.
- Practice explaining, unprompted, why a Client Component can't import a Server Component and the "children slot" workaround.
- Review all Advanced Q&A (section 10.3) — caching and RSC payload questions are the most common senior differentiators.
- Do the Medium coding exercise (auth + Suspense dashboard) without referencing the solution.
- Review the Common Bugs table (section 16) for the caching-related "gotchas" — these come up constantly in real interviews.

---

# 16. Common Bugs & Debugging

| Bug | Why It Occurs | How to Debug | Fix |
|---|---|---|---|
| Data doesn't update after a mutation | Missing `revalidatePath`/`revalidateTag` call after a Server Action's DB write | Check whether the displaying page's `fetch` is tagged, and whether the action calls the matching revalidate function | Add the correct `revalidatePath`/`revalidateTag` call right after the mutation succeeds |
| "This Component needs useState..." error | A file using hooks is missing `"use client"` | Look at the exact file/line in the error stack | Add `"use client"` at the top of that file |
| Infinite redirect loop from Middleware | The `matcher` also matches the redirect target (e.g., `/login`) | Log `request.nextUrl.pathname` inside middleware to see repeated hits | Exclude the redirect target from the matcher or add an explicit bypass check |
| Environment variable is `undefined` in the browser | Missing `NEXT_PUBLIC_` prefix on a variable meant for client code | Check `.env` file and confirm which side (server/client) is reading it | Prefix client-needed vars with `NEXT_PUBLIC_`; keep secrets unprefixed |
| Dynamic route 404s in a static export | Missing `generateStaticParams`, so Next.js doesn't know which param values to pre-render | Check build output for which paths were actually generated | Implement `generateStaticParams`, or switch that route to dynamic rendering |
| Large, slow-loading bundle on a simple page | An entire page tree marked `"use client"` unnecessarily, pulling heavy client-only libraries into the bundle | Use `next build` bundle analysis or check the Network tab for JS payload size | Push `"use client"` boundaries down to only the specific interactive leaf components |
| Hydration mismatch warning | Non-deterministic content rendered differently on server vs client (locale/timezone formatting, `Math.random()`, conditional `typeof window` checks) | Read the console warning's HTML diff carefully | Compute non-deterministic values in a `useEffect` (client-only) or pass explicit, consistent props from the server |

---

# 17. Production Interview Stories

**Story 1 — "The E-commerce Site That Showed Sold-Out Items as In Stock"**
> *Scenario:* "Our product pages use ISR with a 5-minute revalidation window. During a flash sale, several products sold out but still showed 'In Stock' for up to 5 minutes, causing failed checkouts. How do you fix this without making every product page fully dynamic (which would hurt overall performance)?"
> *Expected senior response:* Keep the bulk of the product page (description, images, reviews) statically cached via ISR, but split out the **stock/price** into a small, separately-fetched Client Component (or a nested dynamic Server Component with `cache: 'no-store'`) that fetches fresh inventory data on each load — or better, trigger `revalidateTag('inventory-<sku>')` directly from the checkout/inventory system the instant stock changes, rather than waiting on the timed window at all. This shows understanding that caching strategy can be applied at a *granular* (per-fetch/per-tag), not just per-page, level.

**Story 2 — "The Dashboard That Felt Slow Despite Fast APIs"**
> *Scenario:* "Our internal analytics dashboard's APIs all respond in under 200ms, yet users say the page feels slow to load. Where do you look?"
> *Expected response:* Suspect a request waterfall — Server Components sequentially awaiting fetches instead of firing them in parallel with `Promise.all`, or a large `"use client"` boundary forcing significant hydration/JS-parsing time before *any* interactivity, even though the data itself came back quickly. Recommend profiling with the Network tab (checking if fetches are sequential vs parallel) and the Next.js/React DevTools to see hydration timing, and consider adding Suspense boundaries so fast sections aren't blocked by a slower one, even if all API calls are individually fast.

**Story 3 — "The Security Incident from Trusting Middleware Alone"**
> *Scenario:* "We used Middleware to check for a session cookie and redirect unauthenticated users, but a security audit found a way to access protected admin API routes directly, bypassing the redirect. What went wrong architecturally?"
> *Expected response:* Middleware-based redirects protect *page navigation* UX but are not a substitute for real authorization checks inside the actual Route Handlers/Server Actions themselves — especially since Route Handlers can be hit directly (via `fetch`, curl, etc.) without ever going through the page-level redirect flow if the matcher config or logic has gaps. The fix is defense-in-depth: verify the session/permissions again inside every sensitive Route Handler and Server Action, treating Middleware as a fast first-pass UX optimization, not the sole security boundary.

---

# 18. Company-Specific Questions

## Google-style
- "How would you structure caching for a page that's 90% static content and 10% personalized, without making the whole page dynamic?" *(Tests granular caching/Suspense architecture thinking.)*
- "Explain how you'd measure and improve Core Web Vitals on a Next.js e-commerce site." *(Tests `next/image`, font optimization, streaming, bundle size awareness.)*

## Microsoft-style
- "How would you migrate a large legacy Pages Router app to the App Router incrementally, without a risky big-bang rewrite?" *(Tests knowledge that both routers can coexist during migration, plus prioritization/risk-management thinking.)*
- "Walk through your approach to internationalizing a Next.js app for 12 markets." *(Tests `[locale]` dynamic segments, middleware-based locale detection, and third-party i18n library integration.)*

## Amazon-style
- "Design the rendering strategy for a product catalog with millions of SKUs — you can't statically pre-render all of them at build time. What do you do?" *(Tests `generateStaticParams` with `fallback`/on-demand ISR generation for pages not pre-built, i.e., generating and caching a static page the *first* time it's requested.)*
- "Tell me about a time a caching decision caused a production bug, and how you diagnosed it." *(Behavioral + tests real caching debugging experience.)*

## Meta-style
- Given Meta's investment in React internals: expect deep RSC questions — "Explain exactly what's serialized in the RSC payload and how Client Component 'holes' are represented," or "How does streaming avoid head-of-line blocking compared to traditional SSR?"

## Netflix-style
- "How would you ensure a content browsing page stays fast and interactive even if a personalization/recommendation API is slow or down?" *(Tests Suspense fallback design and graceful degradation — directly relevant to Netflix's actual UI patterns.)*

## Modern Startup-style
- "We're a small team — would you self-host Next.js or deploy to Vercel, and what are you trading off either way?" *(Tests pragmatic infra awareness: Vercel's zero-config ISR/edge integration vs. self-hosting cost/control trade-offs.)*
- "Our build times are creeping up as the app grows — what would you investigate first?" *(Tests Turbopack awareness, unnecessary static generation of huge param sets, and bundle analysis.)*