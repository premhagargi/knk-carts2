import { type NextRequest } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { jsonErr, jsonOk, parseJson, requireAdmin } from '@/lib/api-auth';
import { parsePostInput } from '@/lib/validators';

export const dynamic = 'force-dynamic';

// GET /api/posts
//   ?status=all       — admin only, returns drafts too
//   default           — public, only published posts (RLS enforces this too)
export async function GET(req: NextRequest) {
  const status = req.nextUrl.searchParams.get('status');
  const wantsAll = status === 'all';

  if (wantsAll) {
    const auth = await requireAdmin();
    if ('response' in auth) return auth.response;
    const { data, error } = await auth.supabase
      .from('posts')
      .select('*')
      .order('updated_at', { ascending: false });
    if (error) return jsonErr(error.message, 500);
    return jsonOk(data);
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .not('published_at', 'is', null)
    .lte('published_at', new Date().toISOString())
    .order('published_at', { ascending: false });
  if (error) return jsonErr(error.message, 500);
  return jsonOk(data);
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin();
  if ('response' in auth) return auth.response;
  const body = await parseJson<unknown>(req);
  const parsed = parsePostInput(body);
  if (typeof parsed === 'string') return jsonErr(parsed, 400);
  const { data, error } = await auth.supabase
    .from('posts')
    .insert(parsed)
    .select('*')
    .single();
  if (error) return jsonErr(error.message, 400);
  return jsonOk(data, { status: 201 });
}
