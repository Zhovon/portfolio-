# Portfolio (zhovon.com)

Personal portfolio of Shahadat Hossain (Zhovon) + ZBooking license API. Next.js 16 App Router, React 19, TypeScript, Tailwind v4, Framer Motion, deployed on Vercel.

## Commands
- `npm run dev` — dev server (localhost:3000)
- `npm run build` — production build (run before pushing UI changes)
- `npm run lint` — eslint
- `seed` / `migrate` scripts are BROKEN (scripts/seed.ts, scripts/migrate.ts don't exist) — don't use.

## Structure (read ARCHITECTURE.md only if you need routing/data-flow detail)
- `app/(website)/` — pages. Pattern: `page.tsx` is a thin server component, all UI lives in a sibling `*Client.tsx` ('use client').
- `app/api/` — contact & order (Resend email), github (activity), og, `internal/zbooking/` (license server).
- `components/sections/` — homepage sections; `components/animations/` — reusable motion wrappers.
- `data/projects.ts` — ALL project/case-study content is hardcoded here (no CMS). Edit this to change projects.
- `lib/zbooking.ts` — Supabase license logic; `proxy.ts` — Next 16 middleware (security headers/CSP).

## Conventions
- 4-space indent, single quotes, no semicolons.
- Content changes = edit `data/projects.ts` or the section component; do not add a CMS.
- Dark sci-fi theme: black bg, emerald/teal/purple accents, `glass-panel` utility class, uppercase tracking-wide labels.
- New pages: server `page.tsx` (metadata) + `XClient.tsx` (UI). Keep Framer Motion in client files only.

## Gotchas
- Repo dir name is `portfolio-` (trailing dash) — caused a submodule accident before; never `git add` a nested `portfolio-/` dir.
- Env vars needed: RESEND_API_KEY, CONTACT_EMAIL, NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY (required for zbooking admin — no anon fallback), ZBOOKING_ADMIN_KEY (see ZBOOKING_SETUP.md), GITHUB_TOKEN, optional UPSTASH_REDIS_REST_URL/TOKEN for rate limiting.
- API routes use `lib/api-utils.ts` (zod + escapeHtml + checkRateLimit) — follow that pattern for any new route.
- CSP in proxy.ts is an allowlist — new third-party scripts/iframes must be added there or they'll be blocked.

## Session log
Append significant decisions to MEMORY.md (one line each). Read it at session start; don't re-read other docs unless the task touches them.
