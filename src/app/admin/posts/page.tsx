import Link from 'next/link';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { AdminPageHeader } from '@/components/admin/admin-ui';
import PostRow from './post-row';

export const dynamic = 'force-dynamic';

type Post = {
  id: string;
  title: string;
  slug: string;
  featured: boolean;
  published_at: string | null;
  updated_at: string;
};

export default async function PostsListPage() {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('posts')
    .select('id, title, slug, featured, published_at, updated_at')
    .order('updated_at', { ascending: false });
  const posts = (data ?? []) as Post[];

  return (
    <div>
      <AdminPageHeader
        title="Journal"
        description="Blog posts and field notes"
        action={{ href: '/admin/posts/new', label: 'New post' }}
      />
      {error && (
        <div className="border border-primary/50 p-6 mb-6 text-sm text-primary">
          {error.message}
        </div>
      )}
      {posts.length === 0 ? (
        <div className="border border-admin-border p-12 text-center text-sm text-admin-muted">
          No posts yet.{' '}
          <Link href="/admin/posts/new" className="text-primary hover:underline">
            Write the first one.
          </Link>
        </div>
      ) : (
        <div className="border border-admin-border">
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-admin-border text-[10px] uppercase tracking-widest font-bold text-admin-muted">
            <div className="col-span-5">Title</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-3">Published / updated</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>
          {posts.map((p) => (
            <PostRow key={p.id} post={p} />
          ))}
        </div>
      )}
    </div>
  );
}
