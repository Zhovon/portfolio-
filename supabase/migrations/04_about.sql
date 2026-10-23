-- ============================================================
-- 4. ABOUT SECTIONS TABLE - Dynamic About Me Content
-- ============================================================

create table if not exists public.about_sections (
  id uuid default gen_random_uuid() primary key,
  tagline text not null,
  title text not null,
  subtitle text,
  narrative text not null,
  avatar_url text,
  problem_solving jsonb default '[]'::jsonb,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.about_sections enable row level security;

-- RLS Policies:
-- Public: Read about section (single row)
-- Authenticated: Update about content

create policy "About section is viewable by everyone" on public.about_sections
for select using (true);

create policy "Authenticated users can update about section" on public.about_sections
for update using (auth.role() = 'authenticated');

-- Trigger for automatic timestamp updates
create or replace function handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql security definer;

create trigger on_about_sections_updated
  before update on public.about_sections
  for each row execute function handle_updated_at();