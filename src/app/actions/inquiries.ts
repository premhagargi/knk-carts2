'use server';

import { createServerSupabaseClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export type SubmitResult = { ok: true } | { ok: false; error: string };

export async function submitInquiry(formData: FormData): Promise<SubmitResult> {
  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const company = String(formData.get('company') ?? '').trim() || null;
  const inquiry_type = String(formData.get('inquiry_type') ?? '').trim() || null;
  const message = String(formData.get('message') ?? '').trim();

  if (!name || !email || !message) {
    return { ok: false, error: 'Name, email, and message are required.' };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: 'Please enter a valid email address.' };
  }

  try {
    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.from('inquiries').insert({
      name,
      email,
      company,
      inquiry_type,
      message,
    });
    if (error) return { ok: false, error: error.message };
    revalidatePath('/admin/inquiries');
    return { ok: true };
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Unknown error';
    return { ok: false, error: msg };
  }
}

export async function markInquiryStatus(id: string, status: 'new' | 'read' | 'archived') {
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase
    .from('inquiries')
    .update({ status })
    .eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/inquiries');
}
