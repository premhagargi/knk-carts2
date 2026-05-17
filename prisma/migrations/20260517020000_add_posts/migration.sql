-- Posts (blog / journal) — full CRUD from /admin/posts.
-- published_at IS NULL → draft. published_at <= now() → live on /blog.

create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  body text not null,
  author text,
  cover_image jsonb,
  featured boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists trg_posts_updated_at on posts;
create trigger trg_posts_updated_at
  before update on posts
  for each row execute function set_updated_at();

alter table posts enable row level security;

drop policy if exists "auth full" on posts;
create policy "auth full" on posts
  for all to authenticated using (true) with check (true);

-- Anon can only read posts that are actually published.
drop policy if exists "anon read published" on posts;
create policy "anon read published" on posts
  for select to anon using (published_at is not null and published_at <= now());

create index if not exists posts_published_at_idx on posts (published_at desc);
