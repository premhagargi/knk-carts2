import Link from 'next/link';
import PageHeader from '@/components/sections/page-header';
import Footer from '@/components/sections/footer';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

type Product = {
  slug: string;
  name: string;
  category: string;
  short_description: string | null;
};

async function getProducts(): Promise<Product[]> {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from('products')
    .select('slug, name, category, short_description')
    .order('created_at', { ascending: true });
  return (data ?? []) as Product[];
}

export const metadata = {
  title: 'Products | VCR Design',
  description:
    'The VCR product lineup — Genesis SXX5, Genesis S25, TS22 Twin Seater, VCR Sport, Mudslinger SR-III, and KNK Cub.',
};

const categoryLabel: Record<string, string> = {
  racing: 'Racing',
  rental: 'Rental',
  'twin-seater': 'Twin Seater',
  'off-road': 'Off-Road',
  junior: 'Junior',
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <>
      <PageHeader
        eyebrow="Design Portfolio"
        title={
          <>
            THE VCR <span className="text-primary italic">LINEUP.</span>
          </>
        }
        description="Six production chassis and a constantly-evolving R&D pipeline. Each model is a VCR design, manufactured at the KnK Karts factory in Belagavi."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Products' }]}
      />
      <section className="py-20">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-white/10">
          {products.map((p) => (
            <Link
              key={p.slug}
              href={`/products/${p.slug}`}
              className="group p-10 border-r border-b border-white/10 hover:bg-primary/5 transition-colors flex flex-col gap-6 min-h-[320px]"
            >
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-primary">
                {categoryLabel[p.category] ?? p.category}
              </span>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tightest leading-none">
                {p.name}
              </h2>
              <p className="text-sm text-white/60 font-light leading-relaxed flex-1">
                {p.short_description}
              </p>
              <span className="flex items-center gap-3 text-[10px] uppercase tracking-widest font-bold group-hover:text-primary transition-colors">
                View detail <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
