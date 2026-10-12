# Authentication (Clerk)

## Rules

- All authentication and user management is handled by Clerk (`@clerk/nextjs`). **No other auth method may be used** (no custom sessions, JWTs, cookies, NextAuth, passwords, or hand-rolled login).
- Do not store credentials or build your own user/session tables. Identify users only by the Clerk `userId`.
- Never read or print Clerk keys. They come from environment variables only.

## Route Access

| Route | Access | Behavior |
| --- | --- | --- |
| `/` (homepage) | Public | Signed-in users are redirected to `/dashboard` |
| `/dashboard` (and sub-routes) | Protected | Signed-out users cannot access it; they are sent to sign in |

- Enforce both rules on the server in `proxy.ts` (not `middleware.ts`) using `clerkMiddleware`, `createRouteMatcher`, and `auth.protect()`. Never rely on hiding UI.
- New protected routes must be added to the protected matcher in `proxy.ts`.

```ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  if (userId && req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (isProtectedRoute(req)) await auth.protect();
});
```

Keep the existing `config.matcher` export unchanged.

## Sign In / Sign Up

- Sign in and sign up **must always open as a Clerk modal**. Use `<SignInButton mode="modal">` and `<SignUpButton mode="modal">`.
- Do not create dedicated `/sign-in` or `/sign-up` pages, and do not render `<SignIn />` / `<SignUp />` as full pages. Do not link or redirect to such routes.
- Use Clerk components for session UI: `<Show when="signed-in">` / `<Show when="signed-out">` and `<UserButton />`. `<ClerkProvider>` stays in `app/layout.tsx`.

## Server-Side Auth

- In server components, server actions, and route handlers, get the user with `auth()` from `@clerk/nextjs/server` and `await` it.
- Return/redirect early when `userId` is missing; do not continue with partial access.
- Every database query and mutation must be scoped to the authenticated `userId` (see `/docs/database.md`).
- Use `currentUser()` only when profile data is needed; prefer `auth()` for the ID.
