import { createServerSupabaseClient } from '@/lib/supabase/server';
import { jsonErr, jsonOk } from '@/lib/api-auth';

export const dynamic = 'force-dynamic';

export async function POST() {
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.auth.signOut();
  if (error) return jsonErr(error.message, 400);
  return jsonOk({ ok: true });
}
