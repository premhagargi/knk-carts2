'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireAdminUser } from '@/lib/supabase/server';
import { slugify } from '@/lib/slug';

type ActionResult = { ok: true } | { ok: false; error: string };

function parsePayload(formData: FormData) {
  const name = String(formData.get('name') ?? '').trim();
  const slug = String(formData.get('slug') ?? '').trim() || (name ? slugify(name) : '');
  const short_description = String(formData.get('short_description') ?? '').trim() || null;
  const description = String(formData.get('description') ?? '').trim() || null;

  const featuresRaw = String(formData.get('features') ?? '').trim();
  const features = featuresRaw
    ? featuresRaw
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  let hero_image: unknown = null;
  const heroRaw = String(formData.get('hero_image') ?? '').trim();
  if (heroRaw) {
    try {
      const parsed = JSON.parse(heroRaw);
      hero_image = Array.isArray(parsed) ? (parsed[0] ?? null) : parsed;
    } catch {
      throw new Error('Hero image payload is malformed.');
    }
  }

  let gallery: unknown[] = [];
  const galleryRaw = String(formData.get('gallery') ?? '').trim();
  if (galleryRaw) {
    try {
      gallery = JSON.parse(galleryRaw);
    } catch {
      throw new Error('Gallery payload is malformed.');
    }
  }

  return { name, slug, short_description, description, features, hero_image, gallery };
}

export async function createService(formData: FormData): Promise<ActionResult> {
  try {
    const { supabase } = await requireAdminUser();
    const payload = parsePayload(formData);
    if (!payload.name || !payload.slug) {
      return { ok: false, error: 'Name and slug are required.' };
    }
    const { error } = await supabase.from('services').insert(payload);
    if (error) return { ok: false, error: error.message };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Unknown error' };
  }
  revalidatePath('/admin/services');
  redirect('/admin/services');
}

export async function updateService(id: string, formData: FormData): Promise<ActionResult> {
  try {
    const { supabase } = await requireAdminUser();
    const payload = parsePayload(formData);
    if (!payload.name || !payload.slug) {
      return { ok: false, error: 'Name and slug are required.' };
    }
    const { error } = await supabase.from('services').update(payload).eq('id', id);
    if (error) return { ok: false, error: error.message };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Unknown error' };
  }
  revalidatePath('/admin/services');
  revalidatePath(`/admin/services/${id}`);
  redirect('/admin/services');
}

export async function deleteService(id: string) {
  const { supabase } = await requireAdminUser();
  const { error } = await supabase.from('services').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/services');
}
