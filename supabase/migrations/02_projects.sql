-- ============================================================
-- 2. PROJECTS TABLE - Dynamic Project Portfolio
-- ============================================================

create table if not exists public.projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text unique not null,
  description text not null,
  long_description text,
  tech_stack jsonb default '[]'::jsonb,
  image_url text,
  live_url text,
  github_url text,
  category text,
  metrics jsonb default '[]'::jsonb,
  challenges jsonb default '[]'::jsonb,
  results jsonb default '[]'::jsonb,
  sort_order integer default 0,
  is_featured boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.projects enable row level security;

-- RLS Policies:
-- Public: Read all projects (portfolio showcase)
-- Authenticated: Insert/update own projects

create policy "Projects are viewable by everyone" on public.projects
for select using (true);

create policy "Authenticated users can insert projects" on public.projects
for insert with check (auth.role() = 'authenticated');

create policy "Authenticated users can update projects" on public.projects
for update using (auth.role() = 'authenticated');

-- Index for featured and sorting
create index "projects_sort_order_idx" on public.projects(sort_order, is_featured desc);
create index "projects_category_idx" on public.projects(category);

-- Trigger for automatic timestamp updates
create or replace function handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql security definer;

create trigger on_projects_updated
  before update on public.projects
  for each row execute function handle_updated_at();