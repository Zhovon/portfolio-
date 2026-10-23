-- ============================================================
-- 3. SKILLS TABLE - Dynamic Competencies Display
-- ============================================================

create table if not exists public.skills (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  level text not null,
  color_primary text not null,
  color_secondary text not null,
  description text not null,
  tech_stack text[] default '{}',
  sort_order integer default 0,
  is_visible boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.skills enable row level security;

-- RLS Policies:
-- Public: Read all skills (showcase competencies)
-- Authenticated: Manage skills (admin)

create policy "Skills are viewable by everyone" on public.skills
for select using (true);

create policy "Authenticated users can manage skills" on public.skills
for all using (auth.role() = 'authenticated');

-- Index for ordering
create index "skills_sort_order_idx" on public.skills(sort_order);

-- Trigger for automatic timestamp updates
create or replace function handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql security definer;

create trigger on_skills_updated
  before update on public.skills
  for each row execute function handle_updated_at();