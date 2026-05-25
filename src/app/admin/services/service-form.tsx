'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api-client';
import { Field, inputClass, textareaClass } from '@/components/admin/admin-ui';
import ImageField, { type ImageAsset } from '@/components/admin/image-field';
import { slugify } from '@/lib/slug';

type ServiceRecord = {
  id: string;
  name: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  features: string[];
  hero_image: ImageAsset | null;
  gallery: ImageAsset[];
};

export default function ServiceForm({ service }: { service?: ServiceRecord }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState(service?.name ?? '');
  const [slug, setSlug] = useState(service?.slug ?? '');
  const [slugTouched, setSlugTouched] = useState(!!service);
  const isEdit = !!service;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setError(null);
        const fd = new FormData(e.currentTarget);

        const features = String(fd.get('features') ?? '')
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean);

        let hero_image: ImageAsset | null = null;
        const heroRaw = String(fd.get('hero_image') ?? '').trim();
        if (heroRaw) {
          try {
            const parsed = JSON.parse(heroRaw);
            hero_image = Array.isArray(parsed) ? (parsed[0] ?? null) : parsed;
          } catch {
            setError('Hero image payload is malformed.');
            return;
          }
        }

        let gallery: ImageAsset[] = [];
        const galleryRaw = String(fd.get('gallery') ?? '').trim();
        if (galleryRaw) {
          try {
            gallery = JSON.parse(galleryRaw);
          } catch {
            setError('Gallery payload is malformed.');
            return;
          }
        }

        const payload = {
          name: String(fd.get('name') ?? ''),
          slug: String(fd.get('slug') ?? ''),
          short_description: String(fd.get('short_description') ?? ''),
          description: String(fd.get('description') ?? ''),
          features,
          hero_image,
          gallery,
        };

        startTransition(async () => {
          try {
            if (isEdit) {
              await api.patch(`/api/services/${service!.id}`, payload);
            } else {
              await api.post('/api/services', payload);
            }
            router.push('/admin/services');
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

      <Field label="Slug">
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

      <Field label="Short description">
        <input
          name="short_description"
          defaultValue={service?.short_description ?? ''}
          className={inputClass}
        />
      </Field>

      <Field label="Description">
        <textarea
          name="description"
          rows={6}
          defaultValue={service?.description ?? ''}
          className={textareaClass}
        />
      </Field>

      <Field label="Features" hint="One feature per line.">
        <textarea
          name="features"
          rows={6}
          defaultValue={(service?.features ?? []).join('\n')}
          className={textareaClass}
        />
      </Field>

      <ImageField
        name="hero_image"
        entity="services"
        multiple={false}
        defaultValue={service?.hero_image ? [service.hero_image] : []}
        label="Hero image"
        hint="Widescreen 16:9 — recommended 1600×900px (min 1280×720). Used as the service banner."
        previewAspect="aspect-[16/9]"
      />

      <ImageField
        name="gallery"
        entity="services"
        defaultValue={service?.gallery ?? []}
        label="Gallery"
        hint="Square 1:1 — recommended 1200×1200px. Displayed in a uniform grid."
        previewAspect="aspect-square"
      />

      {error && (
        <div className="border border-primary/50 p-4 text-sm text-primary">{error}</div>
      )}

      <div className="flex gap-4 items-center pt-4 border-t border-admin-border">
        <button
          type="submit"
          disabled={isPending}
          className="bg-primary text-white py-4 px-8 text-xs font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all disabled:opacity-50"
        >
          {isPending ? 'Saving…' : isEdit ? 'Save changes' : 'Create service'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/services')}
          className="text-[10px] uppercase tracking-widest font-bold text-admin-muted hover:text-white"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
