import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { signUploadParams } from '@/lib/cloudinary';

const ALLOWED_FOLDERS = new Set(['products', 'services', 'projects', 'posts']);

export async function POST(req: Request) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: { entity?: string } = {};
  try {
    body = await req.json();
  } catch {
    // empty body is fine — default to "products"
  }
  const entity = body.entity ?? 'products';
  if (!ALLOWED_FOLDERS.has(entity)) {
    return NextResponse.json({ error: 'Invalid folder' }, { status: 400 });
  }

  const folder = `vcr/${entity}`;
  const params = signUploadParams(folder);
  return NextResponse.json(params);
}
