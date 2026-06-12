import Link from 'next/link';
import { notFound } from 'next/navigation';
import { unstable_cache } from 'next/cache';
import PageHeader from '@/components/sections/page-header';
import Footer from '@/components/sections/footer';
import { createPublicSupabaseClient } from '@/lib/supabase/public';
import { CACHE_TAGS } from '@/lib/cache-tags';
import { ArrowRight } from 'lucide-react';

type Product = {
  slug: string;
  name: string;
  category: string;
  short_description: string | null;
  description: string | null;
  specs: Record<string, string> | null;
};

const getProduct = unstable_cache(
  async (slug: string): Promise<Product | null> => {
    const supabase = createPublicSupabaseClient();
    const { data } = await supabase
      .from('products')
      .select('slug, name, category, short_description, description, specs')
      .eq('slug', slug)
      .maybeSingle();
    return (data as Product | null) ?? null;
  },
  ['marketing:products:detail'],
  { tags: [CACHE_TAGS.products] },
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.name} | VCR Design`,
    description: product.short_description ?? undefined,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const specs = product.specs ?? {};

  return (
    <>
      <PageHeader
        eyebrow={product.category.replace('-', ' ')}
        title={product.name}
        description={product.short_description ?? undefined}
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: product.name },
        ]}
      />
      <section className="py-32">
        <div className="container mx-auto px-6 grid lg:grid-cols-3 gap-20">
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="text-xs font-bold tracking-[0.5em] uppercase text-primary mb-6">
                OVERVIEW
              </h2>
              <p className="text-xl md:text-2xl font-light text-white/80 leading-relaxed">
                {product.description}
              </p>
            </div>
            <div>
              <h2 className="text-xs font-bold tracking-[0.5em] uppercase text-primary mb-6">
                SPECIFICATIONS
              </h2>
              <div className="border-t border-l border-white/10">
                {Object.entries(specs).map(([k, v]) => (
                  <div
                    key={k}
                    className="grid grid-cols-2 border-r border-b border-white/10"
                  >
                    <div className="p-6 text-[10px] uppercase tracking-widest font-bold text-white/40 border-r border-white/10">
                      {k}
                    </div>
                    <div className="p-6 text-sm font-light">{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <aside className="space-y-8">
            <div className="bg-white/5 border border-white/10 p-10">
              <h3 className="text-[10px] uppercase tracking-widest font-black text-primary mb-4">
                INQUIRE
              </h3>
              <p className="text-sm text-white/70 font-light leading-relaxed mb-6">
                Request specifications, pricing, and lead time for {product.name}.
              </p>
              <Link
                href={`/contact?product=${product.slug}`}
                className="flex items-center gap-3 bg-primary text-white px-6 py-4 text-[10px] uppercase tracking-widest font-bold hover:bg-white hover:text-brand-charcoal transition-all"
              >
                Start Inquiry <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <Link
              href="/products"
              className="block text-[10px] uppercase tracking-widest font-bold text-white/40 hover:text-primary transition-colors"
            >
              ← Back to all products
            </Link>
          </aside>
        </div>
      </section>
      <Footer />
    </>
  );
}
