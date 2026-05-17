import { type NextRequest } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { jsonErr, jsonOk, parseJson, requireAdmin } from '@/lib/api-auth';
import { parseServiceInput } from '@/lib/validators';

export const dynamic = 'force-dynamic';

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('id', id)
    .single();
  if (error) return jsonErr(error.message, 404);
  return jsonOk(data);
}

export async function PATCH(req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  const auth = await requireAdmin();
  if ('response' in auth) return auth.response;
  const body = await parseJson<unknown>(req);
  const parsed = parseServiceInput(body);
  if (typeof parsed === 'string') return jsonErr(parsed, 400);
  const { data, error } = await auth.supabase
    .from('services')
    .update(parsed)
    .eq('id', id)
    .select('*')
    .single();
  if (error) return jsonErr(error.message, 400);
  return jsonOk(data);
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  const auth = await requireAdmin();
  if ('response' in auth) return auth.response;
  const { error } = await auth.supabase.from('services').delete().eq('id', id);
  if (error) return jsonErr(error.message, 400);
  return new Response(null, { status: 204 });
}
