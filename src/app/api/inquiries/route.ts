import { type NextRequest } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { jsonErr, jsonOk, parseJson, requireAdmin } from '@/lib/api-auth';
import { parseInquiryInput } from '@/lib/validators';

export const dynamic = 'force-dynamic';

// GET /api/inquiries — admin only.
export async function GET(req: NextRequest) {
  const auth = await requireAdmin();
  if ('response' in auth) return auth.response;
  const status = req.nextUrl.searchParams.get('status');
  let q = auth.supabase
    .from('inquiries')
    .select('*')
    .order('created_at', { ascending: false });
  if (status) q = q.eq('status', status);
  const { data, error } = await q;
  if (error) return jsonErr(error.message, 500);
  return jsonOk(data);
}

// POST /api/inquiries — public. RLS allows insert for both anon and authenticated.
export async function POST(req: NextRequest) {
  const body = await parseJson<unknown>(req);
  const parsed = parseInquiryInput(body);
  if (typeof parsed === 'string') return jsonErr(parsed, 400);
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('inquiries')
    .insert(parsed)
    .select('id, created_at')
    .single();
  if (error) return jsonErr(error.message, 400);
  return jsonOk(data, { status: 201 });
}
