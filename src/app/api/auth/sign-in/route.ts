import { type NextRequest } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { jsonErr, jsonOk, parseJson } from '@/lib/api-auth';

export const dynamic = 'force-dynamic';

type Body = { email?: string; password?: string };

export async function POST(req: NextRequest) {
  const body = (await parseJson<Body>(req)) ?? {};
  const email = body.email?.trim();
  const password = body.password;
  if (!email || !password) {
    return jsonErr('Email and password are required.', 400);
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) return jsonErr(error.message, 401);

  return jsonOk({ userId: data.user?.id ?? null, email: data.user?.email ?? null });
}
