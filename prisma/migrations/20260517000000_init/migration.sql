-- VCR initial schema: products, services, projects, inquiries.
-- This migration is hand-aligned with prisma/schema.prisma. RLS policies
-- and the updated_at trigger live here because Prisma does not model them.

create extension if not exists "pgcrypto";

-- ============================================================
-- Tables (must match prisma/schema.prisma)
-- ============================================================

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  category text not null,
  short_description text,
  description text,
  specs jsonb not null default '{}'::jsonb,
  price_inr numeric,
  featured boolean not null default false,
  images jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  short_description text,
  description text,
  features jsonb not null default '[]'::jsonb,
  hero_image jsonb,
  gallery jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  client text,
  location text,
  year int,
  description text,
  images jsonb not null default '[]'::jsonb,
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  inquiry_type text,
  message text not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

-- ============================================================
-- updated_at trigger
-- ============================================================

create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_products_updated_at on products;
create trigger trg_products_updated_at
  before update on products
  for each row execute function set_updated_at();

drop trigger if exists trg_services_updated_at on services;
create trigger trg_services_updated_at
  before update on services
  for each row execute function set_updated_at();

drop trigger if exists trg_projects_updated_at on projects;
create trigger trg_projects_updated_at
  before update on projects
  for each row execute function set_updated_at();

-- ============================================================
-- Row Level Security
-- ============================================================

alter table products  enable row level security;
alter table services  enable row level security;
alter table projects  enable row level security;
alter table inquiries enable row level security;

drop policy if exists "auth full"  on products;
create policy "auth full" on products
  for all to authenticated using (true) with check (true);
drop policy if exists "anon read" on products;
create policy "anon read" on products
  for select to anon using (true);

drop policy if exists "auth full"  on services;
create policy "auth full" on services
  for all to authenticated using (true) with check (true);
drop policy if exists "anon read" on services;
create policy "anon read" on services
  for select to anon using (true);

drop policy if exists "auth full"  on projects;
create policy "auth full" on projects
  for all to authenticated using (true) with check (true);
drop policy if exists "anon read" on projects;
create policy "anon read" on projects
  for select to anon using (true);

drop policy if exists "auth read"   on inquiries;
create policy "auth read" on inquiries
  for select to authenticated using (true);
drop policy if exists "auth update" on inquiries;
create policy "auth update" on inquiries
  for update to authenticated using (true) with check (true);
drop policy if exists "auth delete" on inquiries;
create policy "auth delete" on inquiries
  for delete to authenticated using (true);
drop policy if exists "anon insert" on inquiries;
create policy "anon insert" on inquiries
  for insert to anon with check (true);

-- ============================================================
-- Indexes
-- ============================================================

create index if not exists products_featured_idx on products (featured) where featured;
create index if not exists projects_featured_idx on projects (featured) where featured;
create index if not exists inquiries_status_idx  on inquiries (status, created_at desc);
