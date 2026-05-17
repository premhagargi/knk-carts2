import Link from 'next/link';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

async function getCounts() {
  const supabase = await createServerSupabaseClient();
  const [products, services, projects, posts, inquiries] = await Promise.all([
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('services').select('*', { count: 'exact', head: true }),
    supabase.from('projects').select('*', { count: 'exact', head: true }),
    supabase.from('posts').select('*', { count: 'exact', head: true }),
    supabase
      .from('inquiries')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'new'),
  ]);
  return {
    products: products.count ?? 0,
    services: services.count ?? 0,
    projects: projects.count ?? 0,
    posts: posts.count ?? 0,
    newInquiries: inquiries.count ?? 0,
  };
}

export default async function AdminDashboard() {
  let counts = {
    products: 0,
    services: 0,
    projects: 0,
    posts: 0,
    newInquiries: 0,
  };
  try {
    counts = await getCounts();
  } catch {
    // DB unreachable — show zeros and a hint.
  }

  const tiles = [
    { label: 'Products', value: counts.products, href: '/admin/products' },
    { label: 'Services', value: counts.services, href: '/admin/services' },
    { label: 'Projects', value: counts.projects, href: '/admin/projects' },
    { label: 'Posts', value: counts.posts, href: '/admin/posts' },
    {
      label: 'New inquiries',
      value: counts.newInquiries,
      href: '/admin/inquiries',
    },
  ];

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl font-black uppercase tracking-tightest">
          Dashboard
        </h1>
        <p className="text-xs uppercase tracking-widest font-bold text-admin-muted mt-2">
          Overview of VCR content
        </p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-t border-l border-admin-border">
        {tiles.map((t) => (
          <Link
            key={t.label}
            href={t.href}
            className="block p-8 border-r border-b border-admin-border hover:bg-admin-surface-2 transition-colors"
          >
            <span className="block text-[10px] uppercase tracking-widest font-bold text-admin-muted mb-3">
              {t.label}
            </span>
            <span className="block text-5xl font-black tracking-tightest">
              {t.value}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
