-- ============================================================
-- 1. PROFILES TABLE - User Authentication & Preferences
-- ============================================================

create table if not exists public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text not null,
  github_handle text unique,
  twitter_handle text,
  bio text,
  avatar_url text,
  theme_preference text default 'system',
  reduced_motion boolean default false,
  custom_css text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.profiles enable row level security;

-- RLS Policies:
-- Public: Read profiles (for public display)
-- Authenticated: Upsert own profile on login

create policy "Public profiles are viewable by everyone" on public.profiles
for select using (true);

create policy "Users can insert own profile" on public.profiles
for insert with check (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
for update using (auth.uid() = id);

-- Trigger for automatic timestamp updates
create or replace function handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql security definer;

create trigger on_profiles_updated
  before update on public.profiles
  for each row execute function handle_updated_at();