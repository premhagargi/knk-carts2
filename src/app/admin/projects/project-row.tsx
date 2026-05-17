'use client';

import { DeleteButton, EditLink } from '@/components/admin/admin-ui';
import { deleteProject } from '@/app/actions/projects';

type Project = {
  id: string;
  title: string;
  slug: string;
  location: string | null;
  year: number | null;
  featured: boolean;
  updated_at: string;
};

export default function ProjectRow({ project }: { project: Project }) {
  return (
    <div className="grid grid-cols-12 gap-4 p-4 border-b border-admin-border items-center text-sm last:border-b-0 hover:bg-admin-surface-2">
      <div className="col-span-4 flex items-center gap-3">
        <span className="font-bold">{project.title}</span>
        {project.featured && (
          <span className="text-[9px] uppercase tracking-widest font-black bg-primary text-white px-2 py-0.5">
            Featured
          </span>
        )}
      </div>
      <div className="col-span-3 text-admin-muted">{project.location ?? '—'}</div>
      <div className="col-span-1 text-admin-muted">{project.year ?? '—'}</div>
      <div className="col-span-2 text-xs text-admin-muted">
        {new Date(project.updated_at).toLocaleDateString()}
      </div>
      <div className="col-span-2 flex justify-end items-center gap-4">
        <EditLink href={`/admin/projects/${project.id}`} />
        <DeleteButton onConfirm={async () => deleteProject(project.id)} />
      </div>
    </div>
  );
}
