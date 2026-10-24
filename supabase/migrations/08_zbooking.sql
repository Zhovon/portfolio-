-- ============================================================
-- 8. ZBOOKING LICENSE & VERIFICATION TABLES
-- ============================================================

-- License Keys table
create table if not exists public.zbooking_license_keys (
  id bigserial primary key,
  token varchar(255) unique not null,
  customer_email varchar(255) not null,
  plan varchar(50) default 'pro',
  status varchar(50) default 'active',
  max_domains integer default 1,
  expires_at timestamp with time zone,
  plugin varchar(100),
  notes text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create index if not exists idx_zbooking_license_keys_token on public.zbooking_license_keys(token);
create index if not exists idx_zbooking_license_keys_email on public.zbooking_license_keys(customer_email);

alter table public.zbooking_license_keys enable row level security;

-- Only service role key has access (internal API routes)
create policy "Service role has full access to zbooking_license_keys"
  on public.zbooking_license_keys
  for all
  using (auth.role() = 'service_role');

-- Domain Bindings table
create table if not exists public.zbooking_license_domain_bindings (
  id bigserial primary key,
  license_id bigint not null references public.zbooking_license_keys(id) on delete cascade,
  domain varchar(255) not null,
  first_seen_at timestamp with time zone default now(),
  last_seen_at timestamp with time zone default now(),
  unique(license_id, domain)
);

create index if not exists idx_zbooking_license_domain_bindings_license_id on public.zbooking_license_domain_bindings(license_id);
create index if not exists idx_zbooking_license_domain_bindings_domain on public.zbooking_license_domain_bindings(domain);

alter table public.zbooking_license_domain_bindings enable row level security;

create policy "Service role has full access to zbooking_license_domain_bindings"
  on public.zbooking_license_domain_bindings
  for all
  using (auth.role() = 'service_role');

-- Verification Logs table
create table if not exists public.zbooking_license_verification_logs (
  id bigserial primary key,
  token varchar(255) not null,
  domain varchar(255),
  ok boolean default false,
  reason varchar(100),
  ip varchar(50),
  user_agent text,
  created_at timestamp with time zone default now()
);

create index if not exists idx_zbooking_license_verification_logs_token on public.zbooking_license_verification_logs(token);
create index if not exists idx_zbooking_license_verification_logs_domain on public.zbooking_license_verification_logs(domain);
create index if not exists idx_zbooking_license_verification_logs_created_at on public.zbooking_license_verification_logs(created_at);

alter table public.zbooking_license_verification_logs enable row level security;

create policy "Service role has full access to zbooking_license_verification_logs"
  on public.zbooking_license_verification_logs
  for all
  using (auth.role() = 'service_role');
