# Architecture

Read this only when working on routing, data flow, APIs, or deployment. Day-to-day info is in CLAUDE.md.

## Stack
Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion 12 · Lenis (smooth scroll) · Three.js/R3F (star background) · Resend (email) · Supabase (ZBooking licenses only) · Vercel.

## Route map
| Route | Files | Notes |
|---|---|---|
| `/` | `app/(website)/page.tsx` → `HomeClient.tsx` | Hero, warp, stack strip, About, scroll "dive", Projects, Skills, pricing, Terminal |
| `/projects`, `/projects/[slug]` | `ProjectsClient.tsx`, `CaseStudyClient.tsx` | Content from `data/projects.ts` (`FALLBACK_PROJECTS`), no DB |
| `/portfolio` | `PortfolioClient.tsx` | Alternate gallery view |
| `/contact`, `/order` | page + client | POST to `/api/contact`, `/api/order` |
| `/team/rashed`, `/card/rashed` | client comps | Consultant profile + digital visiting card (QR, vCard, print PDF in `public/`) |
| `/diagnostic` | page | Debug page |
| `/zb-token` | `app/zb-token/page.tsx` | ZBooking token admin UI (outside `(website)` group — no site chrome) |

Global chrome lives in `app/layout.tsx`: fonts, JSON-LD Person schema, StarBackgroundWrapper, SmoothScroll (Lenis), NexusNav, CalComFloatingButton, Vercel Analytics/SpeedInsights.

## API routes
| Endpoint | What it does | Deps |
|---|---|---|
| `POST /api/contact` | Sends contact email via Resend (`onboarding@resend.dev` sender) | RESEND_API_KEY, CONTACT_EMAIL |
| `POST /api/order` | Sends order-request email via Resend | same |
| `GET /api/github` | GitHub activity stats for GithubActivity section | GITHUB_TOKEN |
| `GET /api/og` | OG image generation | — |
| `POST /api/internal/zbooking/license/generate` | Creates license token (admin-key gated) | Supabase service role |
| `POST /api/internal/zbooking/license/verify` | Verifies token + domain binding, logs attempts; accepts WordPress form payloads | Supabase |

## Data flow
- **Projects/content**: fully static — `data/projects.ts` exports `FALLBACK_PROJECTS` + helpers (`getFeaturedProjects`, etc.). Server pages pass data into client components as props.
- **ZBooking**: `lib/zbooking.ts` lazily creates a Supabase admin client (falls back through several env var names, including anon key — fix candidate). Tables: licenses, domain bindings, verification logs. Setup doc: `ZBOOKING_SETUP.md`.
- **`lib/supabase.ts`**: separate anon client with `saveContactMessage`/`getContactMessages` — currently unused by the contact route (route only emails via Resend).

## Middleware / security
`proxy.ts` (Next 16 rename of middleware.ts) sets CSP + HSTS + X-Frame-Options etc. on all non-API, non-static routes. CSP script-src is currently permissive (`unsafe-inline unsafe-eval https: http:`).

## Deployment
Vercel, config in `vercel.json`. Push to `main` deploys. Domain: zhovon.com.
