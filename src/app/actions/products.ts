'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireAdminUser } from '@/lib/supabase/server';
import { slugify } from '@/lib/slug';

type ActionResult = { ok: true } | { ok: false; error: string };

function parseFormPayload(formData: FormData) {
  const name = String(formData.get('name') ?? '').trim();
  const slug =
    String(formData.get('slug') ?? '').trim() ||
    (name ? slugify(name) : '');
  const category = String(formData.get('category') ?? '').trim();
  const short_description =
    String(formData.get('short_description') ?? '').trim() || null;
  const description =
    String(formData.get('description') ?? '').trim() || null;
  const price_raw = String(formData.get('price_inr') ?? '').trim();
  const price_inr = price_raw ? Number(price_raw) : null;
  const featured = formData.get('featured') === 'on';

  let specs: Record<string, unknown> = {};
  const specsRaw = String(formData.get('specs') ?? '').trim();
  if (specsRaw) {
    try {
      specs = JSON.parse(specsRaw);
    } catch {
      throw new Error('Specs must be valid JSON, e.g. {"Wheelbase": "1040 mm"}.');
    }
  }

  let images: unknown[] = [];
  const imagesRaw = String(formData.get('images') ?? '').trim();
  if (imagesRaw) {
    try {
      images = JSON.parse(imagesRaw);
    } catch {
      throw new Error('Images payload is malformed.');
    }
  }

  return {
    name,
    slug,
    category,
    short_description,
    description,
    price_inr,
    featured,
    specs,
    images,
  };
}

export async function createProduct(formData: FormData): Promise<ActionResult> {
  try {
    const { supabase } = await requireAdminUser();
    const payload = parseFormPayload(formData);
    if (!payload.name || !payload.slug || !payload.category) {
      return { ok: false, error: 'Name, slug, and category are required.' };
    }
    const { error } = await supabase.from('products').insert(payload);
    if (error) return { ok: false, error: error.message };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : 'Unknown error',
    };
  }
  revalidatePath('/admin/products');
  redirect('/admin/products');
}

export async function updateProduct(
  id: string,
  formData: FormData,
): Promise<ActionResult> {
  try {
    const { supabase } = await requireAdminUser();
    const payload = parseFormPayload(formData);
    if (!payload.name || !payload.slug || !payload.category) {
      return { ok: false, error: 'Name, slug, and category are required.' };
    }
    const { error } = await supabase
      .from('products')
      .update(payload)
      .eq('id', id);
    if (error) return { ok: false, error: error.message };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : 'Unknown error',
    };
  }
  revalidatePath('/admin/products');
  revalidatePath(`/admin/products/${id}`);
  redirect('/admin/products');
}

export async function deleteProduct(id: string) {
  const { supabase } = await requireAdminUser();
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/products');
}
