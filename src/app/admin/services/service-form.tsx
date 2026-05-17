'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { createService, updateService } from '@/app/actions/services';
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
      action={(formData) => {
        setError(null);
        startTransition(async () => {
          const res = isEdit
            ? await updateService(service!.id, formData)
            : await createService(formData);
          if (res && 'ok' in res && !res.ok) setError(res.error);
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
      />

      <ImageField
        name="gallery"
        entity="services"
        defaultValue={service?.gallery ?? []}
        label="Gallery"
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
