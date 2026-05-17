import { AdminPageHeader } from '@/components/admin/admin-ui';
import ServiceForm from '../service-form';

export default function NewServicePage() {
  return (
    <div>
      <AdminPageHeader title="New service" description="Add a track-solution service" />
      <ServiceForm />
    </div>
  );
}
