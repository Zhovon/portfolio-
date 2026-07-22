# Memory — decision & session log

Append-only. One dated line (or short block) per significant decision. Newest first. Keep entries to one line unless the "why" is non-obvious. Prune entries older than ~3 months if superseded.

## Decisions
- 2026-07-22: Case study pages rebuilt as normal scrolling articles (hero + whileInView sections) — do NOT reintroduce fixed-overlay scroll sections; position:fixed panels break IntersectionObserver reveals and trap pointer events. Projects grid staggers by column (idx % 2), filters are keyword groups in ProjectsClient FILTERS.
- 2026-07-22: Hardened /api/contact and /api/order — zod validation, HTML escaping (`lib/api-utils.ts`), rate limiting (Upstash sliding window if UPSTASH_REDIS_REST_URL/TOKEN set, else per-instance in-memory 5/min). Added replyTo so replies go to the sender.
- 2026-07-22: `lib/zbooking.ts` admin client now REQUIRES SUPABASE_SERVICE_ROLE_KEY (no anon fallback); dropped SUPABASE_URL_PUBLIC env alias.
- 2026-07-22: CSP tightened in proxy.ts — no unsafe-eval in prod, script/connect/frame-src limited to cal.com, Vercel analytics, Supabase. If a new third-party script is added, it must be allowlisted there.
- 2026-07-22: Untracked portfolio-.zip, build_log.txt, Cloudflare CSV (`git rm --cached`); files remain in old git history unless purged with filter-repo.
- 2026-07-22: Added CLAUDE.md / ARCHITECTURE.md / AGENTS.md / MEMORY.md so AI sessions read a small index instead of re-scanning the repo (token efficiency).
- 2026-07: Hero redesigned to split layout with portrait photo; floating badges hidden on mobile (commits e46150c, 2576fc1).
- 2026-07: Projects data stays hardcoded in `data/projects.ts` — no CMS/DB for portfolio content.
- 2026-06/07: `/team/rashed` + `/card/rashed` added for consultant Md Rashed Khan; card uses `rashed-card.png`, team/profile uses original photo (ee3ad40) — don't swap them.
- Earlier: nested `portfolio-/` repo copy was accidentally committed as a submodule, then removed and gitignored (07659da). Never re-add.
- ZBooking license verify endpoint accepts WordPress form-encoded payloads, not just JSON (1712361) — keep backward compatible.

## Known debt (delete lines as fixed)
- 2026-07-22 history was rewritten with git-filter-repo (zip/CSV/build_log/conversation notes purged) and force-pushed; backup bundle at `~/Documents/portfolio-backup-20260722.bundle`. Any OTHER clone of this repo must be re-cloned, not pulled.
- Project "screenshots" in `data/projects.ts` are Unsplash stock photos; metrics read as invented. Replace with real screenshots of BIW CRM etc.
- Verify Cal.com floating button and embeds still work after the CSP tightening (frame-src/connect-src) once deployed.
- `lib/supabase.ts` (`saveContactMessage`) is unused by the contact route — either persist messages or delete the module.
