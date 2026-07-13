# rendering-concepts — Notes

## What this project teaches
The Server Components vs Client Components mental model: what runs where, how to keep
server-only code safe, how to stream slow content with `Suspense`, and static vs
dynamic rendering.

## Key concepts
- [x] Server Components are async by default — can directly `await` data/cookies
- [x] `"use client"` directive marks a Client Component boundary
- [x] `server-only` package — throws a build error if server code is ever imported into
  a Client Component by mistake
- [x] `cookies()` from `next/headers` — server-only API, only works in Server
  Components/Route Handlers
- [x] Streaming with `<Suspense>` — multiple independent slow components stream in as
  they resolve, not all-or-nothing
- [x] `generateStaticParams` — pre-renders known dynamic routes at build time (SSG)
- [x] React Context for client-side theming (`createContext`/`useContext`)
- [x] Wrapping a third-party client-only library (`react-slick`) in its own
  `"use client"` component

## File-by-file breakdown
- `src/utils/server-utils.ts` — imports `"server-only"` at the top; this function
  simulates work that must never run in the browser (env vars, DB access, secrets).
  Importing this into a Client Component would fail the build — that's the point.
- `src/app/server-route/page.tsx` — Server Component that calls `serverSideFunction()`
  directly and also renders the Client Component `<ImageSlider />` — shows Server →
  Client composition.
- `src/app/about/page.tsx` — `await cookies()` then reads a `"theme"` cookie, proving
  cookies are readable server-side without any client JS.
- `src/app/dashboard/page.tsx` — `"use client"` + `useState` — a fully interactive
  page, contrasted directly with the server-rendered `about/` page.
- `src/app/products/[id]/page.tsx` — `generateStaticParams()` returns
  `[{id:"1"},{id:"2"},{id:"3"}]` so these three product pages are statically generated
  at build time instead of on each request.
- `src/app/product-reviews/page.tsx` — the streaming showcase: `<Product/>` (2s delay)
  and `<Reviews/>` (4s delay) are each wrapped in their own `<Suspense fallback=…>`, so
  the page shell + `Product` appear before `Reviews` finishes — classic out-of-order
  streaming.
- `src/components/product.tsx` / `reviews.tsx` — async Server Components that
  `await new Promise(setTimeout(...))` purely to simulate slow data fetching.
- `src/components/theme-provider.tsx` — `"use client"` Context provider
  (`ThemeContext`) with a `useTheme()` hook consumed by `client-route/page.tsx`.
- `src/components/ImageSlider.tsx` — `"use client"` wrapper around `react-slick`
  (a browser-only carousel library) — the standard pattern for using client-only npm
  packages inside the App Router.

## Gotchas / things to remember
- Anything using hooks (`useState`, `useEffect`, Context) or browser APIs **must** be
  `"use client"` — and that boundary is contagious downward (children of a client
  component are client too, by default) but not upward.
- `server-only` is a *safety net*, not a requirement — it just turns an accidental
  server→client leak into a compile-time error instead of a runtime bug/security hole.
- Suspense boundaries should wrap the *slowest independent unit*, not the whole page,
  or you lose the benefit of streaming.