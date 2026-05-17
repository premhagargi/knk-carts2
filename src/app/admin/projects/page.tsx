import Link from 'next/link';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { AdminPageHeader } from '@/components/admin/admin-ui';
import ProjectRow from './project-row';

export const dynamic = 'force-dynamic';

type Project = {
  id: string;
  title: string;
  slug: string;
  location: string | null;
  year: number | null;
  featured: boolean;
  updated_at: string;
};

export default async function ProjectsListPage() {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('projects')
    .select('id, title, slug, location, year, featured, updated_at')
    .order('updated_at', { ascending: false });
  const projects = (data ?? []) as Project[];

  return (
    <div>
      <AdminPageHeader
        title="Projects"
        description="Case studies and reference builds"
        action={{ href: '/admin/projects/new', label: 'New project' }}
      />
      {error && (
        <div className="border border-primary/50 p-6 mb-6 text-sm text-primary">
          {error.message}
        </div>
      )}
      {projects.length === 0 ? (
        <div className="border border-admin-border p-12 text-center text-sm text-admin-muted">
          No projects yet.{' '}
          <Link href="/admin/projects/new" className="text-primary hover:underline">
            Create the first one.
          </Link>
        </div>
      ) : (
        <div className="border border-admin-border">
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-admin-border text-[10px] uppercase tracking-widest font-bold text-admin-muted">
            <div className="col-span-4">Title</div>
            <div className="col-span-3">Location</div>
            <div className="col-span-1">Year</div>
            <div className="col-span-2">Updated</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>
          {projects.map((p) => (
            <ProjectRow key={p.id} project={p} />
          ))}
        </div>
      )}
    </div>
  );
}
