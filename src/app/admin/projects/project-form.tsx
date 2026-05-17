'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api-client';
import { Field, inputClass, textareaClass } from '@/components/admin/admin-ui';
import ImageField, { type ImageAsset } from '@/components/admin/image-field';
import { slugify } from '@/lib/slug';

type ProjectRecord = {
  id: string;
  title: string;
  slug: string;
  client: string | null;
  location: string | null;
  year: number | null;
  description: string | null;
  featured: boolean;
  images: ImageAsset[];
};

export default function ProjectForm({ project }: { project?: ProjectRecord }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState(project?.title ?? '');
  const [slug, setSlug] = useState(project?.slug ?? '');
  const [slugTouched, setSlugTouched] = useState(!!project);
  const isEdit = !!project;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setError(null);
        const fd = new FormData(e.currentTarget);

        let images: ImageAsset[] = [];
        const imagesRaw = String(fd.get('images') ?? '').trim();
        if (imagesRaw) {
          try {
            images = JSON.parse(imagesRaw);
          } catch {
            setError('Images payload is malformed.');
            return;
          }
        }

        const yearRaw = String(fd.get('year') ?? '').trim();

        const payload = {
          title: String(fd.get('title') ?? ''),
          slug: String(fd.get('slug') ?? ''),
          client: String(fd.get('client') ?? ''),
          location: String(fd.get('location') ?? ''),
          year: yearRaw ? parseInt(yearRaw, 10) : null,
          description: String(fd.get('description') ?? ''),
          featured: fd.get('featured') === 'on',
          images,
        };

        startTransition(async () => {
          try {
            if (isEdit) {
              await api.patch(`/api/projects/${project!.id}`, payload);
            } else {
              await api.post('/api/projects', payload);
            }
            router.push('/admin/projects');
            router.refresh();
          } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
          }
        });
      }}
      className="space-y-8 max-w-3xl"
    >
      <Field label="Title">
        <input
          name="title"
          required
          className={inputClass}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
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

      <div className="grid md:grid-cols-2 gap-6">
        <Field label="Client (optional)">
          <input
            name="client"
            defaultValue={project?.client ?? ''}
            className={inputClass}
          />
        </Field>
        <Field label="Location">
          <input
            name="location"
            defaultValue={project?.location ?? ''}
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Year">
        <input
          name="year"
          type="number"
          step="1"
          min="1990"
          max="2100"
          defaultValue={project?.year ?? new Date().getFullYear()}
          className={inputClass}
        />
      </Field>

      <Field label="Description">
        <textarea
          name="description"
          rows={6}
          defaultValue={project?.description ?? ''}
          className={textareaClass}
        />
      </Field>

      <Field label="Featured">
        <label className="inline-flex items-center gap-3 text-sm">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={project?.featured}
            className="w-4 h-4 accent-primary"
          />
          <span>Surface in the homepage / projects index callouts.</span>
        </label>
      </Field>

      <ImageField
        name="images"
        entity="projects"
        defaultValue={project?.images ?? []}
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
          {isPending ? 'Saving…' : isEdit ? 'Save changes' : 'Create project'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/projects')}
          className="text-[10px] uppercase tracking-widest font-bold text-admin-muted hover:text-white"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
