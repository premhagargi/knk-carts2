import { type NextRequest } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { jsonErr, jsonOk, parseJson, requireAdmin } from '@/lib/api-auth';
import { parseProjectInput } from '@/lib/validators';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const featured = req.nextUrl.searchParams.get('featured');
  let q = supabase
    .from('projects')
    .select('*')
    .order('updated_at', { ascending: false });
  if (featured === 'true') q = q.eq('featured', true);
  const { data, error } = await q;
  if (error) return jsonErr(error.message, 500);
  return jsonOk(data);
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin();
  if ('response' in auth) return auth.response;
  const body = await parseJson<unknown>(req);
  const parsed = parseProjectInput(body);
  if (typeof parsed === 'string') return jsonErr(parsed, 400);
  const { data, error } = await auth.supabase
    .from('projects')
    .insert(parsed)
    .select('*')
    .single();
  if (error) return jsonErr(error.message, 400);
  return jsonOk(data, { status: 201 });
}
