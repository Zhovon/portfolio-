# zhovon.com

Portfolio of Shahadat Hossain (Zhovon) — Lead SaaS Architect & Full-Stack Engineer — plus the ZBooking plugin license API.

Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, and Framer Motion. Deployed on Vercel.

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Environment variables

| Variable | Used by |
|---|---|
| `RESEND_API_KEY`, `CONTACT_EMAIL` | Contact & order email routes |
| `GITHUB_TOKEN` | GitHub activity section |
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase client |
| `SUPABASE_SERVICE_ROLE_KEY`, `ZBOOKING_ADMIN_KEY` | ZBooking license API (see `ZBOOKING_SETUP.md`) |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | API rate limiting (optional; falls back to per-instance limiter) |

## Project docs

- `CLAUDE.md` — repo conventions and structure (entry point for AI-assisted sessions)
- `ARCHITECTURE.md` — route map, API endpoints, data flow
- `MEMORY.md` — decision log and known debt
- `ZBOOKING_SETUP.md` — license server setup

Portfolio content (projects, case studies) is hardcoded in `data/projects.ts` — no CMS.

## License

Proprietary. See `LICENSE`.
