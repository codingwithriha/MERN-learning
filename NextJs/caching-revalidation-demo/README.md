# caching-revalidation-demo — Notes

## What this project teaches
Next.js's **Data Cache** — the layer that caches the *results* of data fetching (as
opposed to the Full Route Cache, which caches whole rendered pages) — demonstrated with
two different data sources: a `fetch()`-based mock API and a Prisma database call.

## Key concepts
- [x] `fetch()` caching via the `cache` option: `{ cache: "force-cache" }`
- [x] `unstable_cache()` — caching **non-fetch** data sources (e.g. an ORM/database
  call) using the same Data Cache mechanism `fetch` gets automatically
- [x] `json-server` used as a disposable mock REST API for local experimentation
  (backed by `db.json`)
- [x] Prisma + SQLite as the "real" database source for comparison

## File-by-file breakdown
- `db.json` — seed data for `json-server` (3 products).
- `package.json` → `"serve-json": "json-server --watch db.json --port 3001"` — spins up
  a mock REST API at `localhost:3001` alongside the Next.js dev server.
- `src/app/json-server-products/page.tsx` — `await fetch("http://localhost:3001/products", { cache: "force-cache" })`.
  Because `force-cache` is explicit here, the response is cached in Next.js's Data
  Cache — refreshing the page won't re-hit `json-server` until the cache is invalidated
  (this is actually the **default** behavior for `fetch` in Server Components, made
  explicit here for teaching purposes).
- `prisma/schema.prisma`, `prisma/migrations/`, `app.db` — SQLite database, same
  `Product` model pattern as `data-fetching-demo`.
- `src/prisma-db.ts` — `getProducts()` — a plain Prisma call, **not** wrapped in any
  cache by default (Prisma calls, unlike `fetch`, are *not* automatically cached by
  Next.js).
- `src/app/prisma-products/page.tsx` — wraps `getProducts` with
  `unstable_cache(getProducts)` before calling it. This is the key lesson: Next.js's
  Data Cache only auto-applies to `fetch()`; any other data-access function (ORM,
  raw SQL client, etc.) needs to be manually opted in via `unstable_cache` to get the
  same caching benefit.

## Gotchas / things to remember
- `fetch()` inside a Server Component is cached **by default** in Next.js — you don't
  need `cache: "force-cache"` to get caching, but writing it explicitly (as this demo
  does) makes the behavior visible and easy to reason about while learning.
- Prisma/DB calls are plain JavaScript function calls from Next.js's point of view —
  they get **no** automatic caching. If you want DB reads cached the same way `fetch`
  is, you must wrap them yourself with `unstable_cache`.
- `unstable_cache` is still an experimental API (hence the name) — check the current
  Next.js docs for the latest signature/behavior before relying on it in production
  (it may have been stabilized/renamed since this course was recorded).
- This project doesn't show `revalidatePath` / `revalidateTag` directly, but pairs
  naturally with `data-fetching-demo`'s `revalidatePath` usage — think of the two
  projects together as "cache it here (`caching-revalidation-demo`), then bust it there
  (`data-fetching-demo`'s Server Actions)."