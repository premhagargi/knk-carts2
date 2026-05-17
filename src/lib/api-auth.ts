import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export type ApiOk<T> = { data: T };
export type ApiErr = { error: string };

export function jsonOk<T>(data: T, init?: ResponseInit) {
  return NextResponse.json<ApiOk<T>>({ data }, init);
}

export function jsonErr(message: string, status = 400) {
  return NextResponse.json<ApiErr>({ error: message }, { status });
}

// Resolves to either an authenticated Supabase client + user, or a 401
// NextResponse that the route should return directly.
export async function requireAdmin() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) {
    return { response: jsonErr('Unauthorized', 401) as NextResponse } as const;
  }
  return { supabase, user } as const;
}

export async function parseJson<T>(req: Request): Promise<T | null> {
  try {
    return (await req.json()) as T;
  } catch {
    return null;
  }
}
