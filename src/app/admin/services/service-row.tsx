'use client';

import { DeleteButton, EditLink } from '@/components/admin/admin-ui';
import { deleteService } from '@/app/actions/services';

type Service = {
  id: string;
  name: string;
  slug: string;
  updated_at: string;
};

export default function ServiceRow({ service }: { service: Service }) {
  return (
    <div className="grid grid-cols-12 gap-4 p-4 border-b border-admin-border items-center text-sm last:border-b-0 hover:bg-admin-surface-2">
      <div className="col-span-5 font-bold">{service.name}</div>
      <div className="col-span-3 font-mono text-xs text-admin-muted">
        {service.slug}
      </div>
      <div className="col-span-2 text-xs text-admin-muted">
        {new Date(service.updated_at).toLocaleDateString()}
      </div>
      <div className="col-span-2 flex justify-end items-center gap-4">
        <EditLink href={`/admin/services/${service.id}`} />
        <DeleteButton onConfirm={async () => deleteService(service.id)} />
      </div>
    </div>
  );
}
