import { type NextRequest } from 'next/server';
import { revalidateTag } from 'next/cache';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import {
  jsonErr,
  jsonOk,
  parseJson,
  requireAdmin,
} from '@/lib/api-auth';
import { CACHE_TAGS } from '@/lib/cache-tags';
import { parseProductInput } from '@/lib/validators';

export const dynamic = 'force-dynamic';

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('products')
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
  const parsed = parseProductInput(body);
  if (typeof parsed === 'string') return jsonErr(parsed, 400);

  const { data, error } = await auth.supabase
    .from('products')
    .update(parsed)
    .eq('id', id)
    .select('*')
    .single();
  if (error) return jsonErr(error.message, 400);
  revalidateTag(CACHE_TAGS.products);
  return jsonOk(data);
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  const auth = await requireAdmin();
  if ('response' in auth) return auth.response;

  const { error } = await auth.supabase.from('products').delete().eq('id', id);
  if (error) return jsonErr(error.message, 400);
  revalidateTag(CACHE_TAGS.products);
  return new Response(null, { status: 204 });
}
