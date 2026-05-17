import { notFound } from 'next/navigation';
import Image from 'next/image';
import PageHeader from '@/components/sections/page-header';
import Footer from '@/components/sections/footer';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

type Post = {
  slug: string;
  title: string;
  excerpt: string | null;
  body: string;
  author: string | null;
  cover_image: {
    secure_url: string;
    width: number;
    height: number;
  } | null;
  published_at: string;
};

async function getPost(slug: string): Promise<Post | null> {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from('posts')
    .select('slug, title, excerpt, body, author, cover_image, published_at')
    .eq('slug', slug)
    .not('published_at', 'is', null)
    .lte('published_at', new Date().toISOString())
    .maybeSingle();
  return (data as Post | null) ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | VCR Journal`,
    description: post.excerpt ?? undefined,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const paragraphs = post.body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <>
      <PageHeader
        eyebrow={new Date(post.published_at).toISOString().slice(0, 10)}
        title={post.title}
        description={post.author ? `By ${post.author}` : undefined}
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Journal', href: '/blog' },
          { label: post.title },
        ]}
      />
      {post.cover_image && (
        <section className="py-12">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="relative w-full aspect-[16/9] border border-white/10">
              <Image
                src={post.cover_image.secure_url}
                alt={post.title}
                fill
                sizes="(min-width: 1024px) 896px, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>
      )}
      <article className="py-20">
        <div className="container mx-auto px-6 max-w-3xl space-y-8">
          {paragraphs.map((para, i) => (
            <p
              key={i}
              className="text-xl font-light text-white/80 leading-relaxed whitespace-pre-wrap"
            >
              {para}
            </p>
          ))}
        </div>
      </article>
      <Footer />
    </>
  );
}
