import { type NextRequest } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import {
  jsonErr,
  jsonOk,
  parseJson,
  requireAdmin,
} from '@/lib/api-auth';
import { parseProductInput } from '@/lib/validators';

export const dynamic = 'force-dynamic';

// GET /api/products — public list (RLS allows anon select).
export async function GET(req: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const featured = req.nextUrl.searchParams.get('featured');
  let q = supabase
    .from('products')
    .select('*')
    .order('updated_at', { ascending: false });
  if (featured === 'true') q = q.eq('featured', true);

  const { data, error } = await q;
  if (error) return jsonErr(error.message, 500);
  return jsonOk(data);
}

// POST /api/products — admin only.
export async function POST(req: NextRequest) {
  const auth = await requireAdmin();
  if ('response' in auth) return auth.response;

  const body = await parseJson<unknown>(req);
  const parsed = parseProductInput(body);
  if (typeof parsed === 'string') return jsonErr(parsed, 400);

  const { data, error } = await auth.supabase
    .from('products')
    .insert(parsed)
    .select('*')
    .single();
  if (error) return jsonErr(error.message, 400);
  return jsonOk(data, { status: 201 });
}
