-- ============================================================
-- 5. CONTACT SUBMISSIONS TABLE - Form Submissions
-- ============================================================

create table if not exists public.contact_submissions (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  message text not null,
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.contact_submissions enable row level security;

-- RLS Policies:
-- Public: Insert submissions (from contact form)
-- Authenticated: Read submissions

create policy "Anyone can insert contact submissions" on public.contact_submissions
for insert with check (true);

create policy "Admins can view contact submissions" on public.contact_submissions
for select using (auth.jwt() ->> 'email' = 'shahadathossain1932@gmail.com');

-- ============================================================
-- 6. ORDER SUBMISSIONS TABLE - Portfolio Orders
-- ============================================================

create table if not exists public.order_submissions (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  package_type text not null,
  budget text,
  details text not null,
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.order_submissions enable row level security;

-- RLS Policies:
-- Public: Insert orders (from order form)
-- Authenticated: Read orders

create policy "Anyone can insert order submissions" on public.order_submissions
for insert with check (true);

create policy "Admins can view order submissions" on public.order_submissions
for select using (auth.jwt() ->> 'email' = 'shahadathossain1932@gmail.com');