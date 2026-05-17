'use client';

import { useRouter } from 'next/navigation';
import { DeleteButton, EditLink } from '@/components/admin/admin-ui';
import { api } from '@/lib/api-client';

type Post = {
  id: string;
  title: string;
  slug: string;
  featured: boolean;
  published_at: string | null;
  updated_at: string;
};

function statusOf(p: Post): { label: string; className: string } {
  if (!p.published_at) {
    return {
      label: 'Draft',
      className: 'bg-admin-bg text-admin-muted border border-admin-border',
    };
  }
  const pubAt = new Date(p.published_at);
  if (pubAt.getTime() > Date.now()) {
    return { label: 'Scheduled', className: 'bg-admin-surface-2 text-white' };
  }
  return { label: 'Live', className: 'bg-primary text-white' };
}

export default function PostRow({ post }: { post: Post }) {
  const router = useRouter();
  const s = statusOf(post);
  return (
    <div className="grid grid-cols-12 gap-4 p-4 border-b border-admin-border items-center text-sm last:border-b-0 hover:bg-admin-surface-2">
      <div className="col-span-5 flex items-center gap-3">
        <span className="font-bold">{post.title}</span>
        {post.featured && (
          <span className="text-[9px] uppercase tracking-widest font-black bg-primary text-white px-2 py-0.5">
            Featured
          </span>
        )}
      </div>
      <div className="col-span-2">
        <span
          className={`text-[9px] uppercase tracking-widest font-black px-2 py-1 ${s.className}`}
        >
          {s.label}
        </span>
      </div>
      <div className="col-span-3 text-xs text-admin-muted">
        {post.published_at
          ? new Date(post.published_at).toLocaleDateString()
          : new Date(post.updated_at).toLocaleDateString()}
      </div>
      <div className="col-span-2 flex justify-end items-center gap-4">
        <EditLink href={`/admin/posts/${post.id}`} />
        <DeleteButton
          onConfirm={async () => {
            await api.del(`/api/posts/${post.id}`);
            router.refresh();
          }}
        />
      </div>
    </div>
  );
}
