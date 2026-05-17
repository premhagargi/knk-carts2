import { AdminPageHeader } from '@/components/admin/admin-ui';
import ProjectForm from '../project-form';

export default function NewProjectPage() {
  return (
    <div>
      <AdminPageHeader title="New project" description="Add a case study" />
      <ProjectForm />
    </div>
  );
}
