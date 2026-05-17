import { notFound } from 'next/navigation';
import { AdminPageHeader } from '@/components/admin/admin-ui';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import ProjectForm from '../project-form';

export const dynamic = 'force-dynamic';

export default async function EditProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', params.id)
    .single();
  if (error || !data) notFound();

  return (
    <div>
      <AdminPageHeader title={data.title} description="Edit project" />
      <ProjectForm project={data} />
    </div>
  );
}
