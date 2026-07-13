# data-fetching-practice — Notes

## What this project teaches
Every major way to get data into and out of a Next.js app: server-side fetching,
client-side fetching, parallel vs sequential fetching + streaming, Server Actions,
form handling (three different ways), Prisma as a database layer, and optimistic UI.

## Key concepts
- [x] Server-side data fetching in an async Server Component (`fetch` + `await`)
- [x] `loading.tsx` — automatic Suspense fallback per route segment
- [x] `error.tsx` — automatic error boundary per route segment
- [x] Client-side data fetching (`useEffect` + `useState`, manual loading/error state)
- [x] **Parallel** fetching — `Promise.all([...])` to fetch two resources concurrently
- [x] **Sequential** fetching + streaming — outer data fetched first, then each item
  streams in its own nested async component via `Suspense`
- [x] Server Actions (`"use server"`) for mutations: create / update / delete
- [x] Three form-submission patterns compared side by side:
  1. Plain `fetch` POST to a Route Handler from a client form
  2. `useActionState` + Server Action + `useFormStatus` (progressive enhancement)
  3. `next/form` (`<Form action="...">`) for GET navigation with search params
- [x] `useOptimistic` — instant UI update before the server confirms a mutation
- [x] Prisma ORM: schema, migrations, a seed-on-boot helper
- [x] `notFound()` inside a dynamic route when a DB lookup returns nothing
- [x] `redirect()` + `revalidatePath()` after a Server Action mutation

## File-by-file breakdown

### Server-side fetching + Suspense/loading/error conventions
- `src/app/users-server/page.tsx` — `await fetch(...)`, artificially delayed 2s.
- `src/app/users-server/loading.tsx` — spinner shown automatically while the page
  above is fetching (Next.js wraps the segment in Suspense for you).
- `src/app/users-server/error.tsx` — Client Component error boundary, logs the error in
  `useEffect`.

### Client-side fetching
- `src/app/users-client/page.tsx` — the "old React" way: `useEffect` fetch with manual
  `loading`/`error`/`users` state. Good contrast to the server version above — no
  loading flash avoidance, and JS has to ship to the browser to fetch at all.

### Parallel vs sequential + streaming
- `src/app/user-parallel/[userId]/page.tsx` — kicks off `getUserPosts` and
  `getUserAlbums` **without** awaiting immediately, then `Promise.all`s them — both
  requests fire at once instead of one waiting for the other.
- `src/app/posts-sequential/page.tsx` + `author.tsx` — fetches all posts first, then
  for **each post**, renders `<Suspense><Author userId={...}/></Suspense>` — each
  author streams in independently instead of blocking the whole post list.

### Server Actions & Prisma
- `prisma/schema.prisma`, `prisma/migrations/` — SQLite-backed `Product` model.
- `src/prisma-db.ts` — `PrismaClient` singleton + `seedProducts()` run once on import,
  plus `getProducts`, `getProduct`, `addProduct`, `updateProduct`, `deleteProduct`
  (all artificially delayed 1.5s to simulate real DB latency).
- `src/actions/products.ts` — `"use server"` file:
  - `createProduct` — validates `FormData`, returns `{errors}` if invalid, else
    `addProduct()` then `redirect("/products-db")`.
  - `editProduct` — same validation pattern, bound with a specific `id` via
    `.bind(null, id)`.
  - `removeProduct` — deletes then `revalidatePath("/products-db")` so the list
    re-fetches without a full navigation.

### Forms — three approaches compared
1. **Plain fetch to a Route Handler**: `react-form/page.tsx` (client state + fetch) →
   `react-form/api/route.ts` (`POST` handler calling `addProduct`).
2. **`useActionState` + Server Action**: `products-db-create/page.tsx` binds
   `createProduct` via `useActionState`, shows per-field errors from returned state;
   `product-edit-form.tsx` does the same for edits using `.bind(null, product.id)`.
   `src/components/submit.tsx` uses `useFormStatus()` to disable the button while
   `pending`.
3. **`next/form`**: `src/components/search.tsx` uses `<Form action="/products-db">` —
   a GET-style form that updates the URL's `?query=` search param and triggers
   client-side navigation (prefetches the target route).

### Optimistic UI
- `src/app/products-db/product-detail.tsx` — `useOptimistic(products, reducer)`
  immediately removes a product from the rendered list on delete click, **before**
  `removeProduct` (the Server Action) actually resolves — then reconciles with the real
  server state once it responds.

### notFound()
- `src/app/products-db/[id]/page.tsx` — if `getProduct(id)` returns `null`, calls
  `notFound()` which renders the nearest `not-found.tsx` (or the default 404).

## Gotchas / things to remember
- `useActionState`'s action function signature is `(prevState, formData) => newState`
  — that's why `createProduct`/`editProduct` take `prevState` as their first argument.
- `.bind(null, id)` on a Server Action is how you pass extra fixed arguments to an
  action invoked from a `<form action={...}>` — the bound argument arrives **before**
  `prevState`/`formData` in the underlying function signature.
- `revalidatePath` vs `redirect`: use `revalidatePath` when you want to stay on the same
  page and just refresh its data (delete); use `redirect` when the action should
  navigate somewhere else (create/edit finishing).
- Client-side fetching (`users-client`) ships more JS and has a visible loading state
  managed by hand — server-side fetching + `loading.tsx` gets you the same UX for free
  with less code.