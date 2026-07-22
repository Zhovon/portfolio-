# Conversation Topics, Do's & Don'ts Summary (Full 30-Day Log: June 11 – July 22, 2026)

> **Overview**: Chronological log of all conversation topics, project sessions, system architectural decisions, best practices, and anti-patterns extracted across your active workspaces and sessions over the past month.

---

## 1. Complete Chronological Session Log (June 11 – July 22, 2026)

| Date Range | Topic / Focus Area | Summary of Work & Key Decisions | Primary Files & Artifacts |
| :--- | :--- | :--- | :--- |
| **June 11, 2026** | **Codebase Audit & Task Manager Setup** | Full system code inspection, architecture audit, defining daily back-office task management structure. | `SYSTEM_ARCHITECTURE.md`<br>`task_schedule.md` |
| **June 13, 2026** | **Employee Auth & Supabase Setup** | Setup daily task manager dashboard, fixed missing employee credentials, resolved Supabase login authentication issues. | `frontend/src/app/dashboard/`<br>`backend/app/domains/users/` |
| **June 15, 2026** | **Payroll System & Salary Tracking** | Audited payroll and salary calculation modules, deployed initial live versions to Vercel. | `backend/app/domains/payroll/`<br>`report.md` |
| **June 16–17, 2026** | **System Architecture & Design Review** | Architectural review, creating comprehensive system guides and recommended design guidelines for back-office apps. | `SYSTEM_ARCHITECTURE.md`<br>`user_guide.md` |
| **June 21, 2026** | **Remote Git Sync & Environment Setup** | Pulled remote changes from Git, updated `.env` configurations from `localhost` to production server endpoints. | `.env.local`<br>`backend/.env` |
| **June 22, 2026** | **Local AI Execution & Omnichannel Automation** | Planned local LLM execution, designed unified messaging architecture (WhatsApp, Instagram, Messenger like Crisp), analyzed roster data in `Sheet1.html`. | `Sheet1.html`<br>`SYSTEM_ARCHITECTURE.md` |
| **June 23–25, 2026** | **BIW Dashboard UI & Document Exports** | Iterated on main BIW dashboard UX, exported custom dashboard HTML snippets, built task schedule views. | `biw dashboard.tsx`<br>`BIW Dashboard RiskCoded.html` |
| **June 27–28, 2026** | **GitHub Sync Workflows & Local AI Image Models** | Configured GitHub office repository sync workflow YAMLs, set up local image generation models (Z Image Turbo). | `.github/workflows/`<br>`scripts/` |
| **June 29–30, 2026** | **N8n Workflow Automation & System Prep** | Developed n8n workflow automation scripts from scratch, evaluated system implementation plans for production readiness. | `migration_plan.md`<br>`migration_task.md` |
| **July 1–5, 2026** | **Migration Planning & AI Agent Memory Skills** | Formulated step-by-step database migration plans, integrated agent memory skills to retain project decisions across sessions. | `migration_plan.md`<br>`SKILL.md` |
| **July 6–8, 2026** | **Shopify Service Booking Integration** | Implemented Liquid logic (`product.tags contains 'Service'`) for booking buttons vs cart buttons, resolved Next.js iFrame CSP / `X-Frame-Options` headers. | `shopify-booking-snippet.html`<br>`ZBOOKING_SETUP.md`<br>`next.config.mjs` |
| **July 9–14, 2026** | **CRM Employee UIDs, Ticket Attribution & UX** | Added employee UIDs next to names in CRM, fixed ticket creator vs participant attribution bugs, integrated local Ollama models, styled light UX themes. | `frontend/src/app/dashboard/staff/`<br>`backend/app/domains/tickets/` |
| **July 16–17, 2026** | **Shopify Page Redesign & Process Audits** | Analyzed modern Shopify About page designs for UX inspiration, monitored running background tasks and terminal processes. | `shopify-cart-booking-embed.html`<br>`portfolio-/` |
| **July 21, 2026** | **Vercel Serverless Evaluation & MYR Rates** | Evaluated serverless local vs cloud deployments, updated MYR to BDT currency exchange rates in ad account tracking pages. | `BIW_Ad_Account_Plain_View_1.html`<br>`proxy.ts`<br>`vercel.json` |
| **July 21, 2026** | **Employee Joining Date & Staff Page Migration** | Migrated branch joining dates, recalculated chronological staff UIDs (`BIW 0001`), synced DB to Google Sheets webhooks, debugged staff page UI. | `backend/scripts/migrate_staff_ids.py`<br>`reorder_uids_smart.py`<br>`page.tsx` |
| **July 22, 2026** | **30-Day System Audit & Documentation** | Compiled complete 30-day session log, best practices, and anti-patterns documentation. | `conversation_topics_dos_and_donts.md` |

---

## 2. Comprehensive Best Practices (Do's)

### System Architecture & Database Operations
- [x] **Chronological UID Generation**: Always sort employee records chronologically by `joining_date` prior to assigning or re-indexing sequential staff UIDs (e.g., `BIW 0001`).
- [x] **Sync Third-Party External Views**: Trigger Google Sheets synchronization webhooks immediately following database migrations to keep external reporting tools in sync.
- [x] **Preserve Credentials During Sync**: Keep user passwords and authentication tokens untouched during automated roster imports or batch script runs.
- [x] **Correct Creator Attribution**: Distinguish clearly between ticket creators and ticket participants in notification and UI event handlers.

### Security, Headers & Integrations
- [x] **CSP & iFrame Header Configuration**: Set explicit `frame-ancestors` in `next.config.mjs` when embedding application frames inside external host domains like Shopify.
- [x] **Isolated Snippet Scoping**: Maintain strict class scoping for injected Shopify HTML snippets to prevent style leakage into host theme layouts.
- [x] **Liquid Tag Wrapping**: Wrap shopify customization scripts in conditional Liquid checks (`{% if product.tags contains 'Service' %}`) to avoid loading scripts on non-service product pages.

### Development Workflow & Deployment
- [x] **Local Build Auditing**: Run `npm run build` or `vercel build` locally and inspect `build_log.txt` prior to triggering production deployments.
- [x] **Form State Lifecycle**: Reset form inputs, error notices, and loading states cleanly upon modal dismissal or API mutation completion.

---

## 3. Critical Pitfalls & Anti-Patterns (Don'ts)

### Database & Backend Anti-Patterns
- [!] **Don't Allow Sequence Drift**: Avoid generating unindexed sequential IDs in Postgres without explicit sequence re-indexing logic.
- [!] **Don't Execute Destructive Resets**: Never drop or reset database tables without consulting existing architectural `.md` files and active sequence scripts.
- [!] **Don't Swallow API Exceptions**: Avoid wrapping failing backend requests or script migrations in silent try/catch blocks that return dummy fallback data without log traces.

### UI & Integration Anti-Patterns
- [!] **Don't Mutate Third-Party DOM Elements Directly**: Do not mutate parent Shopify theme elements directly; use scoped overlay containers.
- [!] **Don't Hardcode Static Offsets**: Avoid using static pixel offsets (+12px) for dynamic container height calculations; compute bounds dynamically.
- [!] **Don't Leave Obsolete Configuration Values**: Avoid leaving outdated exchange rates or staging endpoints hardcoded in production static templates.

---

## 4. Quick Action Checklist for Future Tasks

1. **Before Database Migrations**: Inspect `SYSTEM_ARCHITECTURE.md` and run `backend/scripts/check_uids.py`.
2. **Before Shopify / iFrame Embed Changes**: Check `next.config.mjs` frame headers and `shopify-booking-snippet.html`.
3. **Before Production Builds**: Audit `proxy.ts`, `vercel.json`, and run local build verification.
