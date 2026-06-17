# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A developer/agency portfolio + blog ("Web Dynasty") built on **Next.js 16 (App Router) + Payload CMS 3 + Chakra UI 3**. Payload runs *inside* the Next app (not a separate server) — the admin panel, GraphQL/REST API, and the public site are all served by one Next process. The database is **SQLite via libsql/Turso** (local file in dev, Turso cloud in prod). UI text is largely in Russian.

## Commands

```bash
npm run dev              # Next dev server (site + Payload admin at /admin)
npm run build            # Production build (output: standalone)
npm start                # Run the standalone build
npm run lint             # next lint
npm run generate:types   # Regenerate payload-types.ts from collections (run after editing any collection)
npm run generate:importmap  # Regenerate app/(payload)/admin/importMap.js after adding admin components
npm run payload          # Payload CLI (migrations, etc.)
```

There is **no test suite**. Type checking happens through `next build` / the editor (`tsc --noEmit` via tsconfig).

After changing anything under `collections/`, run `npm run generate:types` so `payload-types.ts` stays in sync — many files import types from it.

## Architecture

### Two source roots, one canonical
- `app/` — Next.js App Router (routes, API handlers, layouts) **plus** `app/components/` which holds GSAP/Framer animation components (`HeroAnimation`, `MagneticButton`, `CountUp`, `FloatingElements`, `ParallaxSection`, `TextReveal`).
- `src/` — **Feature-Sliced Design** layers and the canonical home for domain UI/logic: `src/shared` (theme, `formatDate`, reusable UI like `ScrollReveal`/`StaggerContainer`), `src/entities` (`post`, `tag` models), `src/widgets` (`blog`, `post`, `navigation` — each with `ui/` and `model/`).
- Several files in `app/components/` (BlogCard, BlogGrid, PostContent, ScrollReveal, StaggerContainer) are **thin re-export shims** pointing at `src/`. When editing blog/post/navigation behavior, change the real implementation in `src/`, not the shim. New animation-only components can live in `app/components/`.

### Route groups
- `app/(payload)/` — Payload admin (`/admin`) and its layout. Generated; edit `importMap.js` only via `generate:importmap`.
- `app/(site)/` — public site: home (`page.tsx`), `blog/`, `blog/[slug]/`, shared `layout.tsx` + `globals.css`.
- `app/api/` — `[...slug]`, `graphql`, `graphql-playground` are Payload's own handlers. `app/api/blog/posts` and `app/api/blog/tags` are **custom** REST endpoints used by client-side filtering/pagination.

### Data flow
- **Server components** (layouts, blog pages) call Payload directly: `const payload = await getPayload({ config })` then `payload.find(...)`. Import config via `@payload-config`.
- **Client components** (blog grid filtering/search) fetch from the custom `/api/blog/*` routes through `src/widgets/blog/model/api.ts`, wrapped in React Query (provider in `app/providers.tsx`).
- Path aliases (tsconfig): `@/*` → repo root, `@payload-config` → `payload.config.ts`.

### Payload config
- `payload.config.ts` registers collections: `Users`, `Pages`, `Media`, `Projects`, `Skills`, `Posts`, `Navigation` (each in `collections/`). Editor is Lexical richtext.
- `onInit` **seeds** a default admin (`admin@example.com` / `password`) and two nav items if the DB is empty.
- Posts have a `status` (draft/published) and a `tags` array of `select` values; the blog API filters on `status: published` and `tags.tag`.
- DB adapter is `sqliteAdapter` — `TURSO_DATABASE_URL` (`file:./...` locally or `libsql://...` for Turso) + optional `TURSO_AUTH_TOKEN`.

### Live preview
`app/(site)/blog/[slug]/RefreshRouteOnSave.tsx` uses `@payloadcms/live-preview-react` so admin edits refresh the front-end route.

## Environment

Copy `.env.example` → `.env`. Required: `PAYLOAD_SECRET` (32+ chars), `NEXT_PUBLIC_SERVER_URL`, `TURSO_DATABASE_URL`. For prod deploy also `GHCR_IMAGE`, `PORT`, and `TURSO_AUTH_TOKEN`. Note `chakra`/SQLite native deps are marked `serverExternalPackages` in `next.config.ts` — keep `@libsql/client`, `libsql`, `@payloadcms/db-sqlite` listed there.

## Deployment

- Multi-stage `Dockerfile` builds the Next `standalone` output (Node 20-slim, non-root `nextjs` user). Build-time DB env vars are passed as `ARG`s because the build touches Payload.
- CI: `.github/workflows/docker.yml` builds and pushes to **GHCR** (`ghcr.io/<repo>`) on push to main/master and tags `v*`; multi-arch (amd64/arm64).
- Prod runtime: `docker-compose.prod.yml` pulls the GHCR image and mounts `./data` (SQLite) and `./media` (uploads). `./deploy.sh` automates pull + restart + prune. Healthcheck hits `/api/health`.
