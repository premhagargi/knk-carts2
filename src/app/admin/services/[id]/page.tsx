import { notFound } from 'next/navigation';
import { AdminPageHeader } from '@/components/admin/admin-ui';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import ServiceForm from '../service-form';

export const dynamic = 'force-dynamic';

export default async function EditServicePage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('id', params.id)
    .single();
  if (error || !data) notFound();

  return (
    <div>
      <AdminPageHeader title={data.name} description="Edit service" />
      <ServiceForm service={data} />
    </div>
  );
}
