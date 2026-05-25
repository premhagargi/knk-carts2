import Link from 'next/link';
import { unstable_cache } from 'next/cache';
import PageHeader from '@/components/sections/page-header';
import Footer from '@/components/sections/footer';
import { createPublicSupabaseClient } from '@/lib/supabase/public';
import { CACHE_TAGS } from '@/lib/cache-tags';

type Post = {
  slug: string;
  title: string;
  excerpt: string | null;
  author: string | null;
  published_at: string;
};

const getPosts = unstable_cache(
  async (): Promise<Post[]> => {
    const supabase = createPublicSupabaseClient();
    const { data } = await supabase
      .from('posts')
      .select('slug, title, excerpt, author, published_at')
      .not('published_at', 'is', null)
      .lte('published_at', new Date().toISOString())
      .order('published_at', { ascending: false });
    return (data ?? []) as Post[];
  },
  ['marketing:posts:list'],
  // Time-based fallback so future-scheduled posts go live without an admin
  // write; admin edits still revalidate instantly via the posts tag.
  { tags: [CACHE_TAGS.posts], revalidate: 300 },
);

export const metadata = {
  title: 'Journal | VCR Design',
  description: 'Engineering notes, project updates, and operator insights from VCR.',
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <PageHeader
        eyebrow="Journal"
        title={
          <>
            FIELD NOTES.<br />
            <span className="text-primary italic">ENGINEERING TALK.</span>
          </>
        }
        description="Long-form notes from the VCR studio and the KnK factory floor."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Journal' }]}
      />
      <section className="py-20">
        <div className="container mx-auto px-6 border-t border-white/10">
          {posts.length === 0 ? (
            <div className="py-20 text-center text-white/40 text-sm uppercase tracking-widest font-bold">
              No posts published yet.
            </div>
          ) : (
            posts.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="block py-12 border-b border-white/10 group"
              >
                <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-white/40 md:w-32 shrink-0">
                    {new Date(p.published_at).toISOString().slice(0, 10)}
                  </span>
                  <div className="flex-1">
                    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tightest leading-none mb-4 group-hover:text-primary transition-colors">
                      {p.title}
                    </h2>
                    {p.excerpt && (
                      <p className="text-white/60 font-light leading-relaxed max-w-2xl">
                        {p.excerpt}
                      </p>
                    )}
                    {p.author && (
                      <span className="block mt-4 text-[10px] uppercase tracking-widest font-bold text-white/40">
                        By {p.author}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
