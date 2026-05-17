'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireAdminUser } from '@/lib/supabase/server';
import { slugify } from '@/lib/slug';

type ActionResult = { ok: true } | { ok: false; error: string };

function parsePayload(formData: FormData) {
  const title = String(formData.get('title') ?? '').trim();
  const slug = String(formData.get('slug') ?? '').trim() || (title ? slugify(title) : '');
  const client = String(formData.get('client') ?? '').trim() || null;
  const location = String(formData.get('location') ?? '').trim() || null;
  const yearRaw = String(formData.get('year') ?? '').trim();
  const year = yearRaw ? parseInt(yearRaw, 10) : null;
  const description = String(formData.get('description') ?? '').trim() || null;
  const featured = formData.get('featured') === 'on';

  let images: unknown[] = [];
  const imagesRaw = String(formData.get('images') ?? '').trim();
  if (imagesRaw) {
    try {
      images = JSON.parse(imagesRaw);
    } catch {
      throw new Error('Images payload is malformed.');
    }
  }
  return { title, slug, client, location, year, description, featured, images };
}

export async function createProject(formData: FormData): Promise<ActionResult> {
  try {
    const { supabase } = await requireAdminUser();
    const payload = parsePayload(formData);
    if (!payload.title || !payload.slug) {
      return { ok: false, error: 'Title and slug are required.' };
    }
    const { error } = await supabase.from('projects').insert(payload);
    if (error) return { ok: false, error: error.message };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Unknown error' };
  }
  revalidatePath('/admin/projects');
  redirect('/admin/projects');
}

export async function updateProject(id: string, formData: FormData): Promise<ActionResult> {
  try {
    const { supabase } = await requireAdminUser();
    const payload = parsePayload(formData);
    if (!payload.title || !payload.slug) {
      return { ok: false, error: 'Title and slug are required.' };
    }
    const { error } = await supabase.from('projects').update(payload).eq('id', id);
    if (error) return { ok: false, error: error.message };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Unknown error' };
  }
  revalidatePath('/admin/projects');
  revalidatePath(`/admin/projects/${id}`);
  redirect('/admin/projects');
}

export async function deleteProject(id: string) {
  const { supabase } = await requireAdminUser();
  const { error } = await supabase.from('projects').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/projects');
}
