import { type NextRequest } from 'next/server';
import {
  jsonErr,
  jsonOk,
  parseJson,
  requireAdmin,
} from '@/lib/api-auth';
import { parseInquiryStatus } from '@/lib/validators';

export const dynamic = 'force-dynamic';

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  const auth = await requireAdmin();
  if ('response' in auth) return auth.response;
  const { data, error } = await auth.supabase
    .from('inquiries')
    .select('*')
    .eq('id', id)
    .single();
  if (error) return jsonErr(error.message, 404);
  return jsonOk(data);
}

// PATCH /api/inquiries/[id] — admin only. Currently only `status` is mutable.
export async function PATCH(req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  const auth = await requireAdmin();
  if ('response' in auth) return auth.response;
  const body = await parseJson<{ status?: unknown }>(req);
  const status = parseInquiryStatus(body?.status);
  if (!status) return jsonErr('status must be one of: new, read, archived', 400);
  const { data, error } = await auth.supabase
    .from('inquiries')
    .update({ status })
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
  const { error } = await auth.supabase.from('inquiries').delete().eq('id', id);
  if (error) return jsonErr(error.message, 400);
  return new Response(null, { status: 204 });
}
