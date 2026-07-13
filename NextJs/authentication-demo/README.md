# authentication-demo — Notes

## What this project teaches
End-to-end authentication using **Clerk** (`@clerk/nextjs`): sign in/up flows,
protecting routes with middleware, reading the current user server- and client-side,
and role-based access control (RBAC) via custom session claims.

## Key concepts
- [x] `<ClerkProvider>` wraps the root layout
- [x] Prebuilt Clerk UI components: `<SignIn/>`, `<SignUp/>`, `<UserProfile/>`
- [x] Catch-all route convention required by Clerk's own routing
  (`[[...sign-in]]`, `[[...sign-up]]`, `[[...user-profile]]`)
- [x] `clerkMiddleware()` + `createRouteMatcher()` to define public vs protected routes
- [x] `auth()` / `currentUser()` — server-side helpers (in Server Components, Server
  Actions, middleware)
- [x] `useAuth()` — client-side hook
- [x] `<SignedIn>` / `<SignedOut>` — conditional rendering without a loading flash
- [x] Custom JWT session claims (`CustomJwtSessionClaims`) for storing a `role`
- [x] RBAC: an `/admin` route restricted to `role === "admin"`, with Server Actions to
  promote/demote/remove a user's role
- [x] Middleware `matcher` config — excluding static assets, always running for API/tRPC

## File-by-file breakdown
- `src/app/layout.tsx` — wraps everything in `<ClerkProvider>`, renders `<Navigation/>`
  above `{children}`.
- `src/components/navigation.tsx` — shows `<SignInButton>`/`<SignUpButton>` when
  `<SignedOut>`, and a link to `/user-profile` + `<SignOutButton>` when `<SignedIn>`.
- `src/app/sign-in/[[...sign-in]]/page.tsx`, `sign-up/…`, `user-profile/…` — each just
  renders Clerk's own component; the optional catch-all lets Clerk manage its own
  internal sub-routes/steps.
- `src/middleware.ts` — `isPublicRoute` matcher for `/`, `/sign-in(.*)`, `/sign-up(.*)`;
  `isAdminRoute` matcher for `/admin(.*)`. Logic:
  1. If hitting an admin route and `sessionClaims.metadata.role !== "admin"` → redirect
     home.
  2. If no `userId` and not a public route → `redirectToSignIn()`.
- `src/app/dashboard/page.tsx` — Server Component calling `await auth()` and
  `await currentUser()` and logging both — shows what data is available server-side.
- `src/components/counter.tsx` — Client Component using `useAuth()` to gate rendering
  (`if (!isLoaded || !userId) return null`) before showing an interactive counter.
- `types/globals.d.ts` — augments Clerk's `CustomJwtSessionClaims` type with a
  `metadata: { role?: "admin" | "moderator" }` shape — this is what makes
  `sessionClaims?.metadata?.role` type-safe everywhere.
- `src/app/admin/page.tsx` — Server Component using `clerkClient()` to list **all**
  users, rendering a management table with three `<form action={...}>`s per user
  (Make Admin / Make Moderator / Remove Role) — forms posting straight to Server
  Actions.
- `src/app/admin/actions.ts` — `"use server"` functions `setRole` / `removeRole`. Each
  re-checks `sessionClaims?.metadata?.role !== "admin"` **on the server** before
  mutating (never trust the client), then calls `client.users.updateUser(...)` and
  `revalidatePath("/admin")` to refresh the list.

## Gotchas / things to remember
- Authorization checks must happen **again inside the Server Action**, even though the
  middleware already blocked non-admins from the page — the action is a separate entry
  point and must not assume the UI enforced anything.
- The middleware `matcher` regex is doing real work: it skips Next internals + static
  file extensions, but explicitly always runs for `/(api|trpc)(.*)` so API routes stay
  protected even though they wouldn't match the "page" pattern.
- Session claims (`role`) only show up in `sessionClaims` after they're set **and** the
  session token refreshes — don't expect an instant reflection without a re-auth in
  some Clerk setups.