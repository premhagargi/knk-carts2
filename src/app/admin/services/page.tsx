import Link from 'next/link';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { AdminPageHeader } from '@/components/admin/admin-ui';
import ServiceRow from './service-row';

export const dynamic = 'force-dynamic';

type Service = {
  id: string;
  name: string;
  slug: string;
  updated_at: string;
};

export default async function ServicesListPage() {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('services')
    .select('id, name, slug, updated_at')
    .order('updated_at', { ascending: false });
  const services = (data ?? []) as Service[];

  return (
    <div>
      <AdminPageHeader
        title="Services"
        description="Track design and operator services"
        action={{ href: '/admin/services/new', label: 'New service' }}
      />
      {error && (
        <div className="border border-primary/50 p-6 mb-6 text-sm text-primary">
          {error.message}
        </div>
      )}
      {services.length === 0 ? (
        <div className="border border-admin-border p-12 text-center text-sm text-admin-muted">
          No services yet.{' '}
          <Link href="/admin/services/new" className="text-primary hover:underline">
            Create the first one.
          </Link>
        </div>
      ) : (
        <div className="border border-admin-border">
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-admin-border text-[10px] uppercase tracking-widest font-bold text-admin-muted">
            <div className="col-span-5">Name</div>
            <div className="col-span-3">Slug</div>
            <div className="col-span-2">Updated</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>
          {services.map((s) => (
            <ServiceRow key={s.id} service={s} />
          ))}
        </div>
      )}
    </div>
  );
}
