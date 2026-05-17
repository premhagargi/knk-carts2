import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/sections/page-header';
import Footer from '@/components/sections/footer';
import { services } from '@/lib/vcr-content';
import { ArrowRight, Check } from 'lucide-react';

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const s = services.find((x) => x.slug === params.slug);
  if (!s) return {};
  return { title: `${s.name} | VCR Design`, description: s.shortDescription };
}

export default function ServiceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const s = services.find((x) => x.slug === params.slug);
  if (!s) notFound();

  return (
    <>
      <PageHeader
        eyebrow="Track Solution"
        title={s.name}
        description={s.shortDescription}
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
                {s.features.map((f) => (
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
