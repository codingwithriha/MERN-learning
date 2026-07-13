# routing-concepts — Notes

## What this project teaches
This is the **big routing reference project** — almost every App Router routing
convention lives here in one repo, each isolated in its own folder so you can compare
them side by side.

## Key concepts
- [x] Basic file-based routing (`page.tsx` per folder)
- [x] Private folders (`_lib`) — excluded from routing even though they contain a
  `page.tsx`
- [x] Route Groups `(auth)` — group routes without adding a URL segment
- [x] Dynamic segments `[id]`, `[productId]`, `[reviewId]`
- [x] Catch-all / optional catch-all segments `[[...slug]]`
- [x] Nested dynamic routes + nested layouts
- [x] Parallel Routes (`@slot` folders) with `default.tsx` fallback
- [x] Intercepting Routes — all four conventions: `(.)`, `(..)`, `(..)(..)`, `(...)`
- [x] Combining Parallel + Intercepting routes (the classic "photo modal" pattern)
- [x] `template.tsx` vs `layout.tsx` (remounts vs persists across navigation)
- [x] Custom `not-found.tsx` (route-level and root-level)
- [x] `error.tsx` boundaries (route-level, nested) + `global-error.tsx` (root-level)
- [x] Metadata API — static `metadata` export, title templates, `generateMetadata`
  (async, can depend on `params`)
- [x] Reading `params` / `searchParams` as **Promises** (Next 15 change) — `await`
  in Server Components, `use()` in Client Components
- [x] `next/image` with statically imported images
- [x] `next/link`, `usePathname`, `useRouter` (`.back()`, `.refresh()`)

## File-by-file breakdown

### Private folders
- `src/app/_lib/format-date.js`, `src/app/_lib/page.tsx` — folder prefixed with `_` is
  **never** routable, proving Next.js ignores it for routing purposes even though a
  `page.tsx` exists inside (comment literally says "You cannot view this in the
  browser").

### Route Groups
- `src/app/(auth)/{login,register,forgot-password}` — parentheses folder name doesn't
  appear in the URL (`/login`, not `/auth/login`).
- `src/app/(auth)/template.tsx` — a **template**, not a layout: re-renders (and resets
  local state) on every navigation between routes inside the group, unlike a layout
  which persists. Uses `usePathname` to highlight the active nav link.

### Parallel Routes
- `src/app/photo-feed/@modal` + `layout.tsx` — layout receives `modal` as a named slot
  prop (`{ modal: React.ReactNode; children: React.ReactNode }`) and renders both.
- `src/app/photo-feed/@modal/default.tsx` — returns `null`: the fallback shown when the
  intercepted route isn't active.
- `src/app/complex-dashboard/` — a full 4-slot dashboard (`@login`, `@revenue`,
  `@users`, `@notifications`) plus `children`, arranged with flex layouts in
  `layout.tsx`. Demonstrates conditional rendering of an entire slot set
  (`isLoggedIn ? <dashboard/> : login`).
- `@revenue/default.tsx`, `@users/default.tsx` — per-slot fallback UI.
- `@notifications/archived/page.tsx` — a **sub-route inside a parallel slot**.

### Intercepting Routes (the trickiest part)
- `f1/(.)f2/page.tsx` — `(.)` intercepts a route at the **same level** (`/f1/f2`).
- `f1/(..)f3/page.tsx` — `(..)` intercepts **one level up** (`/f3`).
- `f1/f2/(..)(..)f4/page.tsx` — `(..)(..)` intercepts **two levels up** (`/f4`).
- `f1/f2/inner-f2/(...)f5/page.tsx` — `(...)` intercepts from the **root** (`/f5`).
- Real-world use of this pattern: `photo-feed/@modal/(.)[id]/page.tsx` intercepts
  `/photo-feed/[id]` so clicking a photo opens it in a **modal** (via the `Modal`
  component using `router.back()` to dismiss) instead of navigating to the full page —
  but a hard refresh/direct link still lands on the real full `[id]/page.tsx`.

### Dynamic + nested routing
- `products/[productId]/layout.tsx` — layout wraps all product detail pages.
- `products/[productId]/reviews/[reviewId]/` — nested dynamic segments; has its own
  `not-found.tsx` (reads `productId`/`reviewId` from `usePathname` on the client) and
  its own `error.tsx` (client component with a "Try again" button calling
  `router.refresh()` inside `startTransition`).
- `docs/[[...slug]]/page.tsx` — **optional** catch-all: handles `/docs`, `/docs/x`, and
  `/docs/x/y` all in one file by checking `slug?.length`.
- `articles/[articleId]/page.tsx` — Client Component reading `params` **and**
  `searchParams` (both Promises) via React's `use()` hook instead of `await` (only
  works in Client Components).

### Metadata
- `about/page.tsx` — static `export const metadata`.
- `blog/page.tsx` — `title: { absolute: "blog" }` overrides the parent title template
  entirely instead of appending to it.
- `layout.tsx` (root) — `title: { default: ..., template: "%s | Codevolution" }` — every
  child page's title gets wrapped in this template unless it uses `absolute`.
- `products/[productId]/page.tsx` — `generateMetadata` is **async** and awaits `params`
  to build a dynamic `<title>` per product.

### Error handling
- `not-found.tsx` (root) — custom global 404 UI.
- `global-error.tsx` — must be a Client Component, must render its own `<html>`/`<body>`
  because it replaces the root layout entirely when the root layout itself throws.
- `products/error.tsx` — segment-level error boundary with `reset()` + router refresh.

### Misc
- `src/components/modal.tsx` — reusable modal that closes on overlay click, `Escape`
  key, or programmatically — always via `router.back()`, which is what makes it work
  naturally with intercepting routes (closing = going back in history).
- `photo-feed/wonders.ts` — statically imports `.jpg` files so `next/image` can use
  build-time-known dimensions (`StaticImageData`).

## Gotchas / things to remember
- **`params` and `searchParams` are Promises in Next 15** — always `await` them in
  Server Components (`const { id } = await params`) or `use()` them in Client
  Components.
- Route Groups `(name)` = organization only, no URL impact. Parallel Routes `@name` =
  simultaneous slots in a layout. Intercepting Routes `(.)`/`(..)`/`(..)(..)`/`(...)` =
  swap in a different UI for a route while keeping the URL of the *target* route.
- `default.tsx` is required for parallel route slots so Next.js has something to render
  on hard navigation/refresh when that slot has no matching sub-route.
- `template.tsx` resets state on every navigation; `layout.tsx` does not. Use template
  only when you specifically want a remount (e.g. re-triggering an animation).