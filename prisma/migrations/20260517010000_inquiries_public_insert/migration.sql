-- Allow both anon and authenticated visitors to submit inquiries.
--
-- Previously the policy was scoped to the `anon` role, which broke the
-- contact form whenever an admin (role: authenticated) was signed in and
-- submitted the same form from the public site.
--
-- The other tables (products / services / projects) already have
-- `to authenticated` (auth full) plus `to anon` (read) policies, so they
-- are already covered for both roles — only inquiries.insert was scoped
-- too narrowly.

drop policy if exists "anon insert"   on inquiries;
drop policy if exists "public insert" on inquiries;

create policy "public insert" on inquiries
  for insert to public with check (true);
