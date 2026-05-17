'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api-client';
import { Field, inputClass, textareaClass } from '@/components/admin/admin-ui';
import ImageField, { type ImageAsset } from '@/components/admin/image-field';
import { slugify } from '@/lib/slug';

type PostRecord = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  body: string;
  author: string | null;
  featured: boolean;
  cover_image: ImageAsset | null;
  published_at: string | null;
};

function toDatetimeLocal(iso: string | null): string {
  if (!iso) return '';
  // Convert ISO → "YYYY-MM-DDTHH:mm" in local time for <input type="datetime-local">.
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function PostForm({ post }: { post?: PostRecord }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState(post?.title ?? '');
  const [slug, setSlug] = useState(post?.slug ?? '');
  const [slugTouched, setSlugTouched] = useState(!!post);
  const isEdit = !!post;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setError(null);
        const fd = new FormData(e.currentTarget);

        let cover_image: ImageAsset | null = null;
        const coverRaw = String(fd.get('cover_image') ?? '').trim();
        if (coverRaw) {
          try {
            const parsed = JSON.parse(coverRaw);
            cover_image = Array.isArray(parsed) ? (parsed[0] ?? null) : parsed;
          } catch {
            setError('Cover image payload is malformed.');
            return;
          }
        }

        const status = String(fd.get('status') ?? 'draft');
        const publishedAtLocal = String(fd.get('published_at') ?? '').trim();
        let published_at: string | null = null;
        if (status === 'publish' || status === 'schedule') {
          if (status === 'publish' && !publishedAtLocal) {
            published_at = new Date().toISOString();
          } else if (publishedAtLocal) {
            const d = new Date(publishedAtLocal);
            if (Number.isNaN(d.getTime())) {
              setError('Publish date is invalid.');
              return;
            }
            published_at = d.toISOString();
          } else {
            setError('Pick a publish date for scheduled posts.');
            return;
          }
        }

        const payload = {
          title: String(fd.get('title') ?? ''),
          slug: String(fd.get('slug') ?? ''),
          excerpt: String(fd.get('excerpt') ?? ''),
          body: String(fd.get('body') ?? ''),
          author: String(fd.get('author') ?? ''),
          featured: fd.get('featured') === 'on',
          cover_image,
          published_at,
        };

        startTransition(async () => {
          try {
            if (isEdit) {
              await api.patch(`/api/posts/${post!.id}`, payload);
            } else {
              await api.post('/api/posts', payload);
            }
            router.push('/admin/posts');
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

      <Field label="Slug" hint="Becomes /blog/[slug]">
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

      <Field label="Author">
        <input
          name="author"
          defaultValue={post?.author ?? ''}
          className={inputClass}
        />
      </Field>

      <Field label="Excerpt" hint="Shown on the journal index.">
        <textarea
          name="excerpt"
          rows={3}
          defaultValue={post?.excerpt ?? ''}
          className={textareaClass}
        />
      </Field>

      <Field label="Body" hint="Plain text or Markdown. One paragraph per blank line on the public page.">
        <textarea
          name="body"
          rows={16}
          required
          defaultValue={post?.body ?? ''}
          className={textareaClass}
        />
      </Field>

      <ImageField
        name="cover_image"
        entity="posts"
        multiple={false}
        defaultValue={post?.cover_image ? [post.cover_image] : []}
        label="Cover image"
      />

      <Field label="Featured">
        <label className="inline-flex items-center gap-3 text-sm">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={post?.featured}
            className="w-4 h-4 accent-primary"
          />
          <span>Surface in featured slots.</span>
        </label>
      </Field>

      <fieldset className="space-y-3 border-t border-admin-border pt-6">
        <legend className="text-[10px] uppercase tracking-widest font-bold text-admin-muted">
          Publishing
        </legend>
        <div className="space-y-2 text-sm">
          <label className="flex items-center gap-3">
            <input
              type="radio"
              name="status"
              value="draft"
              defaultChecked={!post?.published_at}
              className="accent-primary"
            />
            <span>Draft (hidden from public site)</span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="radio"
              name="status"
              value="publish"
              defaultChecked={
                !!post?.published_at &&
                new Date(post.published_at).getTime() <= Date.now()
              }
              className="accent-primary"
            />
            <span>Publish now</span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="radio"
              name="status"
              value="schedule"
              defaultChecked={
                !!post?.published_at &&
                new Date(post.published_at).getTime() > Date.now()
              }
              className="accent-primary"
            />
            <span>Schedule for</span>
            <input
              type="datetime-local"
              name="published_at"
              defaultValue={toDatetimeLocal(post?.published_at ?? null)}
              className="bg-admin-bg border border-admin-border p-2 text-sm outline-none focus:border-primary"
            />
          </label>
        </div>
      </fieldset>

      {error && (
        <div className="border border-primary/50 p-4 text-sm text-primary">{error}</div>
      )}

      <div className="flex gap-4 items-center pt-4 border-t border-admin-border">
        <button
          type="submit"
          disabled={isPending}
          className="bg-primary text-white py-4 px-8 text-xs font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all disabled:opacity-50"
        >
          {isPending ? 'Saving…' : isEdit ? 'Save changes' : 'Create post'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/posts')}
          className="text-[10px] uppercase tracking-widest font-bold text-admin-muted hover:text-white"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
