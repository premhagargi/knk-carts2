import { createClient } from '@supabase/supabase-js';

// Cookie-free anonymous client for public reads. Because it never touches
// cookies()/headers(), pages that fetch through it are NOT forced into dynamic
// rendering — they can be statically rendered and ISR-cached. RLS still applies
// (anon role), so this only ever sees publicly-readable rows.
export function createPublicSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
