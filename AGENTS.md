# Agent Instructions

Link shortener web app. These instructions are binding for all LLM agents working in this repository.

## Required: Read Layer Docs First

Layer-specific standards live in the `/docs` directory. **Before generating or modifying any code, read the doc(s) in `/docs` that cover the layer you are touching.** If a layer doc conflicts with this file, the layer doc wins for that layer.

| Layer | Doc |
| --- | --- |
| Authentication (Clerk) | `/docs/auth.md` |
| Database (Drizzle / Neon) | `/docs/database.md` |
| UI components (shadcn/ui, Tailwind) | `/docs/ui.md` |
| Routing, pages, server actions | `/docs/routing.md` |

If a doc listed above does not exist yet, follow this file and the existing code conventions, and do not invent a new standard.

## Tech Stack

- Next.js 16 (App Router, React Server Components) with React 19
- TypeScript (strict)
- Clerk (`@clerk/nextjs`) for authentication
- Drizzle ORM (`drizzle-orm`, `drizzle-kit`) on Neon serverless Postgres (`@neondatabase/serverless`)
- Tailwind CSS v4 with shadcn/ui (`base-nova` style, `@base-ui/react`) and `lucide-react` icons
- ESLint 9 with `eslint-config-next`

## Next.js Version Warning

This Next.js version has breaking changes from older versions you may know from training data. For example, `proxy.ts` replaces `middleware.ts`. Do not assume older APIs, conventions, or file names. Check the installed docs in `node_modules/next/dist/docs/` (or the official docs) before using any Next.js API you are not certain about, and heed deprecation notices.

## Project Structure

| Path | Purpose |
| --- | --- |
| `app/` | Routes, layouts, pages (App Router) |
| `components/ui/` | shadcn/ui primitives (generated; see UI rules) |
| `components/` | Application components |
| `db/` | Drizzle client (`index.ts`) and schema (`schema.ts`) |
| `lib/` | Shared utilities (e.g. `cn` in `utils.ts`) |
| `proxy.ts` | Clerk request proxy (replaces middleware) |
| `docs/` | Layer-specific agent instructions |
| `local/` | Local-only files. Never read, print, copy, or commit contents |

Use the `@/` path alias for all non-relative imports (e.g. `@/lib/utils`, `@/db`).

## Core Coding Standards

- Write TypeScript only. No `any`; use `unknown` and narrow, or define proper types. Do not use `@ts-ignore`/`@ts-expect-error` without a one-line justification.
- Default to Server Components. Add `"use client"` only when a component needs state, effects, event handlers, or browser APIs, and keep client components as small leaves.
- Mutations go through Server Actions, not ad hoc API routes, unless an external consumer requires an HTTP endpoint.
- Validate all external input (form data, params, search params, request bodies) at the boundary on the server. Never trust client-side validation alone.
- Use named exports for components and utilities; default exports only where Next.js requires them (pages, layouts, route handlers, config).
- File names: `kebab-case`. Components: `PascalCase`. Functions/variables: `camelCase`. Types: `PascalCase`. Constants: `SCREAMING_SNAKE_CASE` only for true constants.
- Prefer `async/await` over promise chains. Prefer early returns over deep nesting.
- Keep functions small and single-purpose. Do not add abstractions for one-time use.
- Comments only for non-obvious intent, one short line. Do not restate the code.
- Do not leave dead code, commented-out code, `console.log` debugging, or unused imports.

## Security Rules

- Authorize every server action and data access on the server using Clerk's `auth()`; scope all database queries to the authenticated user's ID. Never rely on hiding UI to enforce access.
- Never expose secrets to the client. Only variables prefixed with `NEXT_PUBLIC_` may be client-visible, and only when intentionally public.
- Never hardcode credentials, API keys, or connection strings. Read them from environment variables.
- Do not read, log, or commit `local/secrets.txt` or any `.env*` file contents.
- Use Drizzle's query builder / parameterized queries. Never build SQL via string concatenation with user input.
- Validate and sanitize any URL stored or redirected to (allow only `http`/`https`) to prevent open redirect and XSS vectors.

## Dependencies

- Do not add a new dependency when the existing stack or platform APIs can do the job. Ask before adding any.
- Use the project's package manager lockfile; do not mix package managers.
- Add shadcn components with the shadcn CLI (`npx shadcn@latest add <component>`), not by hand-writing them.

## Workflow

- Commands: `npm run dev`, `npm run build`, `npm run lint`.
- After changes, run `npm run lint` and ensure the TypeScript build has no errors.
- Schema changes: edit `db/schema.ts`, then generate and apply migrations with `drizzle-kit`. Never hand-edit generated migration files.
- Make only the changes requested. Do not refactor unrelated code or reformat files you are not changing.
- Do not create documentation or markdown files unless asked.
