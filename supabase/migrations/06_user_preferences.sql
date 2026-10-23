-- ============================================================
-- 7. USER PREFERENCES TABLE - Per-User Settings
-- ============================================================

create table if not exists public.user_preferences (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  theme_preference text default 'system',
  reduced_motion boolean default false,
  custom_css text,
  last_visited timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.user_preferences enable row level security;

-- RLS Policies:
-- Users: Read/update own preferences
-- Admins: All operations

create policy "Users can read own preferences" on public.user_preferences
for select using (auth.uid() = user_id);

create policy "Users can update own preferences" on public.user_preferences
for update using (auth.uid() = user_id);

create policy "Admins can manage all preferences" on public.user_preferences
for all using (auth.role() = 'authenticated');

-- Trigger for automatic timestamp updates
create or replace function handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql security definer;

create trigger on_user_preferences_updated
  before update on public.user_preferences
  for each row execute function handle_updated_at();