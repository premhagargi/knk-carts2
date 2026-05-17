import { notFound } from 'next/navigation';
import { AdminPageHeader } from '@/components/admin/admin-ui';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import PostForm from '../post-form';

export const dynamic = 'force-dynamic';

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();
  if (error || !data) notFound();

  return (
    <div>
      <AdminPageHeader title={data.title} description="Edit post" />
      <PostForm post={data} />
    </div>
  );
}
