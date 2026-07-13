# route-handlers-demo — Notes

## What this project teaches
Building actual API endpoints inside the App Router using `route.ts` files — the
replacement for the old Pages Router `pages/api/`.

## Key concepts
- [x] Basic `route.ts` with a `GET` handler
- [x] Multiple HTTP methods in one file (`GET`, `POST`, `PATCH`, `DELETE`)
- [x] Colocating a UI route (`page.tsx`) and an API route (`api/route.ts`) under the
  same folder
- [x] Dynamic segments in route handlers (`[id]/route.ts`)
- [x] Reading query/search params via `NextRequest.nextUrl.searchParams`
- [x] Static route handlers: `export const dynamic = "force-static"` +
  `export const revalidate = <seconds>`
- [x] Reading/writing cookies and headers inside a Route Handler
  (`headers()`, `cookies()` from `next/headers`, plus `request.headers` /
  `request.cookies` directly)
- [x] `redirect()` used **inside** a Route Handler (API versioning pattern)

## File-by-file breakdown
- `src/app/hello/route.ts` — simplest possible handler: `GET` returns a plain
  `new Response("Hello world!")`.
- `src/app/dashboard/route.ts` + `dashboard/users/route.ts` — nested route handlers,
  each independent.
- `src/app/profile/page.tsx` + `profile/api/route.ts` — proves a folder can have
  **both** a page and an API route as siblings/children — `/profile` renders UI,
  `/profile/api` returns data.
- `src/app/profile/api/route.ts` — reads the `Authorization` header two ways
  (`new Headers(request.headers)` vs `await headers()`), reads a `theme` cookie two
  ways (`request.cookies.get` vs `await cookies()`), **sets** a cookie via the
  `Set-Cookie` response header, and separately **sets** `resultsPerPage` via the
  `cookies()` API — showing both the Web-standard and Next.js-specific ways to touch
  headers/cookies in a Route Handler.
- `src/app/time/route.ts` — `dynamic = "force-static"` + `revalidate = 10`: the handler
  looks like it computes `new Date()` on every call, but because it's forced static
  with a 10s revalidation window, the response is actually cached and only recomputed
  at most once every 10 seconds.
- `src/app/categories/route.ts` — same static pattern, no revalidate set (so it's
  static indefinitely until a redeploy/manual revalidation).
- `src/app/comments/route.ts` + `comments/data.ts` — `GET` filters an in-memory array
  by a `?query=` search param; `POST` appends a new comment (in-memory, resets on
  server restart).
- `src/app/comments/[id]/route.ts` — full CRUD-per-item: `GET` finds by id, `PATCH`
  updates `text`, `DELETE` removes and returns the deleted item — the standard REST
  resource pattern (`/comments/:id`).
- `src/app/api/v1/users/route.ts` vs `src/app/api/v2/users/route.ts` — **API
  versioning** example. `v1` now just `redirect("/api/v2/users")` (old shape commented
  out below for reference); `v2` returns a richer, restructured `UserV2` shape
  (structured `name` object, `status`, `profile`, `preferences`) while still keeping
  `fullName` for backwards compatibility. This is a realistic "how do you evolve a
  public API without breaking old clients" example.

## Gotchas / things to remember
- A `route.ts` and a `page.tsx` **cannot** both live directly in the same folder for
  the same path segment — that's why `profile/api/route.ts` is nested one level deeper
  than `profile/page.tsx`, not a sibling file.
- `force-static` + `revalidate` on a Route Handler is exactly the same caching model as
  static pages — don't assume a Route Handler is always dynamic just because it "looks
  like an API."
- Prefer `await headers()` / `await cookies()` (Next.js APIs) over manually reading
  `request.headers` when you're already inside an `async` Route Handler — both work,
  but the Next.js helpers are usable from anywhere in the request lifecycle, not just
  where the `Request` object is in scope.