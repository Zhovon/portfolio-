-- ============================================================
-- 8. TRIGGERS - Automatic Timestamp Updates (Shared Function)
-- ============================================================

create or replace function handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql security definer;

-- Apply triggers to all tables with updated_at column
create trigger on_profiles_updated
  before update on public.profiles
  for each row execute function handle_updated_at();

create trigger on_projects_updated
  before update on public.projects
  for each row execute function handle_updated_at();

create trigger on_skills_updated
  before update on public.skills
  for each row execute function handle_updated_at();

create trigger on_about_sections_updated
  before update on public.about_sections
  for each row execute function handle_updated_at();

create trigger on_user_preferences_updated
  before update on public.user_preferences
  for each row execute function handle_updated_at();

-- ============================================================
-- 9. VIEWS FOR COMMON QUERIES
-- ============================================================

-- View: Recent active projects (featured first)
create or replace view public.active_projects as
select id, title, slug, description, live_url, github_url,
       tech_stack, category, is_featured, sort_order,
       created_at
from public.projects
where is_featured = true or sort_order > 0
order by is_featured desc, sort_order asc;

-- View: User profile with preferences
create or replace view public.user_profile as
select p.id, p.full_name, p.github_handle, p.bio, p.avatar_url,
       up.theme_preference, up.reduced_motion, up.custom_css
from public.profiles p
left join public.user_preferences up on p.id = up.user_id;

-- ============================================================
-- 10. RLS SUMMARY & BEST PRACTICES
-- ============================================================

-- RLS is ENABLED on all tables
-- All public-facing tables have select policies for anonymous users
-- All write operations require authentication (except form submissions which are open)
-- Profiles are synced automatically on Next-Auth sign in
-- User preferences are isolated per user via RLS
-- Projects/Skills/About are read-only for public, manageable by admins
-- Form submissions (contact/order) are open for public to write, admin to read

-- Migration Execution Order:
-- 1. Run 01_profiles.sql first (foundation)
-- 2. Run 02_projects.sql (portfolio showcase)
-- 3. Run 03_skills.sql (competencies)
-- 4. Run 04_about.sql (biography)
-- 5. Run 05_form_submissions.sql (forms)
-- 6. Run 06_user_preferences.sql (personalization)
-- 7. Run 07_triggers_views.sql (maintenance)

-- Next Steps After Migration:
-- 1. Update Next-Auth callbacks to sync profiles table on login
-- 2. Run `npm run seed` to migrate existing FALLBACK_PROJECTS data
-- 3. Set environment variables from PLAN.md
-- 4. Test RLS policies with different auth states
-- 5. Verify all tables appear in Supabase Dashboard