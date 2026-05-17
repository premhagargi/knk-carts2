import Link from 'next/link';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { AdminPageHeader } from '@/components/admin/admin-ui';
import ProductRow from './product-row';

export const dynamic = 'force-dynamic';

type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  featured: boolean;
  updated_at: string;
};

export default async function ProductsListPage() {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('products')
    .select('id, name, slug, category, featured, updated_at')
    .order('updated_at', { ascending: false });

  const products = (data ?? []) as Product[];

  return (
    <div>
      <AdminPageHeader
        title="Products"
        description="Chassis, models, and product line"
        action={{ href: '/admin/products/new', label: 'New product' }}
      />

      {error && (
        <div className="border border-primary/50 p-6 mb-6 text-sm text-primary">
          {error.message}
        </div>
      )}

      {products.length === 0 ? (
        <div className="border border-admin-border p-12 text-center text-sm text-admin-muted">
          No products yet.{' '}
          <Link href="/admin/products/new" className="text-primary hover:underline">
            Create the first one.
          </Link>
        </div>
      ) : (
        <div className="border border-admin-border">
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-admin-border text-[10px] uppercase tracking-widest font-bold text-admin-muted">
            <div className="col-span-4">Name</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-2">Slug</div>
            <div className="col-span-2">Updated</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>
          {products.map((p) => (
            <ProductRow key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
