'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api-client';
import { Field, inputClass, textareaClass } from '@/components/admin/admin-ui';
import ImageField, { type ImageAsset } from '@/components/admin/image-field';
import { slugify } from '@/lib/slug';

type ProductRecord = {
  id: string;
  slug: string;
  name: string;
  category: string;
  short_description: string | null;
  description: string | null;
  price_inr: number | null;
  featured: boolean;
  specs: Record<string, unknown>;
  images: ImageAsset[];
};

const categories = [
  { value: 'racing', label: 'Racing' },
  { value: 'rental', label: 'Rental' },
  { value: 'twin-seater', label: 'Twin Seater' },
  { value: 'off-road', label: 'Off-Road' },
  { value: 'junior', label: 'Junior' },
];

export default function ProductForm({ product }: { product?: ProductRecord }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState(product?.name ?? '');
  const [slug, setSlug] = useState(product?.slug ?? '');
  const [slugTouched, setSlugTouched] = useState(!!product);
  const isEdit = !!product;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setError(null);
        const fd = new FormData(e.currentTarget);

        let specs: Record<string, unknown> = {};
        const specsRaw = String(fd.get('specs') ?? '').trim();
        if (specsRaw) {
          try {
            specs = JSON.parse(specsRaw);
          } catch {
            setError('Specs must be valid JSON.');
            return;
          }
        }

        const imagesRaw = String(fd.get('images') ?? '').trim();
        let images: ImageAsset[] = [];
        if (imagesRaw) {
          try {
            images = JSON.parse(imagesRaw);
          } catch {
            setError('Images payload is malformed.');
            return;
          }
        }

        const priceRaw = String(fd.get('price_inr') ?? '').trim();

        const payload = {
          name: String(fd.get('name') ?? ''),
          slug: String(fd.get('slug') ?? ''),
          category: String(fd.get('category') ?? ''),
          short_description: String(fd.get('short_description') ?? ''),
          description: String(fd.get('description') ?? ''),
          specs,
          price_inr: priceRaw ? Number(priceRaw) : null,
          featured: fd.get('featured') === 'on',
          images,
        };

        startTransition(async () => {
          try {
            if (isEdit) {
              await api.patch(`/api/products/${product!.id}`, payload);
            } else {
              await api.post('/api/products', payload);
            }
            router.push('/admin/products');
            router.refresh();
          } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
          }
        });
      }}
      className="space-y-8 max-w-3xl"
    >
      <Field label="Name">
        <input
          name="name"
          required
          className={inputClass}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (!slugTouched) setSlug(slugify(e.target.value));
          }}
        />
      </Field>

      <Field label="Slug" hint="Lowercase, hyphen-separated. Used in URLs.">
        <input
          name="slug"
          required
          className={inputClass}
          value={slug}
          onChange={(e) => {
            setSlug(e.target.value);
            setSlugTouched(true);
          }}
        />
      </Field>

      <Field label="Category">
        <select
          name="category"
          required
          defaultValue={product?.category ?? ''}
          className={inputClass + ' appearance-none'}
        >
          <option value="" className="bg-admin-bg">Choose…</option>
          {categories.map((c) => (
            <option key={c.value} value={c.value} className="bg-admin-bg">
              {c.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Short description">
        <input
          name="short_description"
          defaultValue={product?.short_description ?? ''}
          className={inputClass}
        />
      </Field>

      <Field label="Description">
        <textarea
          name="description"
          rows={6}
          defaultValue={product?.description ?? ''}
          className={textareaClass}
        />
      </Field>

      <Field
        label="Specs (JSON object)"
        hint='Example: {"Wheelbase": "1040 mm", "Engine": "Rotax Max"}'
      >
        <textarea
          name="specs"
          rows={6}
          defaultValue={JSON.stringify(product?.specs ?? {}, null, 2)}
          className={textareaClass}
        />
      </Field>

      <Field label="Price (INR, optional)">
        <input
          name="price_inr"
          type="number"
          step="1"
          defaultValue={product?.price_inr ?? ''}
          className={inputClass}
        />
      </Field>

      <Field label="Featured">
        <label className="inline-flex items-center gap-3 text-sm">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={product?.featured}
            className="w-4 h-4 accent-primary"
          />
          <span>Show this product in featured slots on the public site.</span>
        </label>
      </Field>

      <ImageField
        name="images"
        entity="products"
        defaultValue={product?.images ?? []}
        label="Gallery"
        hint="Square 1:1 — recommended 1200×1200px. Shown in product cards and the detail gallery."
        previewAspect="aspect-square"
      />

      {error && (
        <div className="border border-primary/50 p-4 text-sm text-primary">
          {error}
        </div>
      )}

      <div className="flex gap-4 items-center pt-4 border-t border-admin-border">
        <button
          type="submit"
          disabled={isPending}
          className="bg-primary text-white py-4 px-8 text-xs font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all disabled:opacity-50"
        >
          {isPending ? 'Saving…' : isEdit ? 'Save changes' : 'Create product'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/products')}
          className="text-[10px] uppercase tracking-widest font-bold text-admin-muted hover:text-white"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
