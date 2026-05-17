'use client';

import { useRouter } from 'next/navigation';
import { DeleteButton, EditLink } from '@/components/admin/admin-ui';
import { api } from '@/lib/api-client';

type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  featured: boolean;
  updated_at: string;
};

export default function ProductRow({ product }: { product: Product }) {
  const router = useRouter();
  return (
    <div className="grid grid-cols-12 gap-4 p-4 border-b border-admin-border items-center text-sm last:border-b-0 hover:bg-admin-surface-2">
      <div className="col-span-4 flex items-center gap-3">
        <span className="font-bold">{product.name}</span>
        {product.featured && (
          <span className="text-[9px] uppercase tracking-widest font-black bg-primary text-white px-2 py-0.5">
            Featured
          </span>
        )}
      </div>
      <div className="col-span-2 text-admin-muted">{product.category}</div>
      <div className="col-span-2 font-mono text-xs text-admin-muted">
        {product.slug}
      </div>
      <div className="col-span-2 text-xs text-admin-muted">
        {new Date(product.updated_at).toLocaleDateString()}
      </div>
      <div className="col-span-2 flex justify-end items-center gap-4">
        <EditLink href={`/admin/products/${product.id}`} />
        <DeleteButton
          onConfirm={async () => {
            await api.del(`/api/products/${product.id}`);
            router.refresh();
          }}
        />
      </div>
    </div>
  );
}
