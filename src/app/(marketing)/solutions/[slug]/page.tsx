import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/sections/page-header';
import Footer from '@/components/sections/footer';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { ArrowRight, Check } from 'lucide-react';

export const dynamic = 'force-dynamic';

type Service = {
  slug: string;
  name: string;
  short_description: string | null;
  description: string | null;
  features: string[] | null;
};

async function getService(slug: string): Promise<Service | null> {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from('services')
    .select('slug, name, short_description, description, features')
    .eq('slug', slug)
    .maybeSingle();
  return (data as Service | null) ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = await getService(slug);
  if (!s) return {};
  return { title: `${s.name} | VCR Design`, description: s.short_description ?? undefined };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = await getService(slug);
  if (!s) notFound();

  const features = s.features ?? [];

  return (
    <>
      <PageHeader
        eyebrow="Track Solution"
        title={s.name}
        description={s.short_description ?? undefined}
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Solutions', href: '/solutions' },
          { label: s.name },
        ]}
      />
      <section className="py-32">
        <div className="container mx-auto px-6 grid lg:grid-cols-3 gap-20">
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="text-xs font-bold tracking-[0.5em] uppercase text-primary mb-6">
                APPROACH
              </h2>
              <p className="text-xl md:text-2xl font-light text-white/80 leading-relaxed">
                {s.description}
              </p>
            </div>
            <div>
              <h2 className="text-xs font-bold tracking-[0.5em] uppercase text-primary mb-6">
                DELIVERABLES
              </h2>
              <ul className="space-y-4">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-4 text-lg text-white/80 font-light">
                    <Check className="w-5 h-5 text-primary mt-1.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <aside className="space-y-8">
            <div className="bg-white/5 border border-white/10 p-10">
              <h3 className="text-[10px] uppercase tracking-widest font-black text-primary mb-4">
                ENGAGE
              </h3>
              <p className="text-sm text-white/70 font-light leading-relaxed mb-6">
                Brief us on your venue — we’ll respond with a scoped proposal.
              </p>
              <Link
                href={`/contact?service=${s.slug}`}
                className="flex items-center gap-3 bg-primary text-white px-6 py-4 text-[10px] uppercase tracking-widest font-bold hover:bg-white hover:text-black transition-all"
              >
                Start Inquiry <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <Link
              href="/solutions"
              className="block text-[10px] uppercase tracking-widest font-bold text-white/40 hover:text-primary transition-colors"
            >
              ← Back to all solutions
            </Link>
          </aside>
        </div>
      </section>
      <Footer />
    </>
  );
}
