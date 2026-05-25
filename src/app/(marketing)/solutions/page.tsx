import Link from 'next/link';
import { unstable_cache } from 'next/cache';
import PageHeader from '@/components/sections/page-header';
import Ecosystem from '@/components/sections/ecosystem';
import Footer from '@/components/sections/footer';
import { createPublicSupabaseClient } from '@/lib/supabase/public';
import { CACHE_TAGS } from '@/lib/cache-tags';
import { ArrowRight } from 'lucide-react';

type Service = {
  slug: string;
  name: string;
  short_description: string | null;
};

const getServices = unstable_cache(
  async (): Promise<Service[]> => {
    const supabase = createPublicSupabaseClient();
    const { data } = await supabase
      .from('services')
      .select('slug, name, short_description')
      .order('created_at', { ascending: true });
    return (data ?? []) as Service[];
  },
  ['marketing:services:list'],
  { tags: [CACHE_TAGS.services] },
);

export const metadata = {
  title: 'Track Solutions | VCR Design',
  description:
    'Track design, safety barriers, lifting systems, lighting, drainage, consultancy, and rental support.',
};

export default async function SolutionsPage() {
  const services = await getServices();

  return (
    <>
      <PageHeader
        eyebrow="Track Solutions"
        title={
          <>
            BUILT FOR <span className="text-primary italic">OPERATORS.</span>
          </>
        }
        description="Everything an operator needs to design, build, light, drain, and run a karting venue — delivered by the team that designs the chassis you’re putting on it."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Solutions' }]}
      />
      <section className="py-20">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-0 border-t border-l border-white/10">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/solutions/${s.slug}`}
              className="group p-12 border-r border-b border-white/10 hover:bg-primary/5 transition-colors flex flex-col gap-6 min-h-[260px]"
            >
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tightest leading-none">
                {s.name}
              </h2>
              <p className="text-sm text-white/60 font-light leading-relaxed flex-1">
                {s.short_description}
              </p>
              <span className="flex items-center gap-3 text-[10px] uppercase tracking-widest font-bold group-hover:text-primary transition-colors">
                View detail <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <Ecosystem />
      <Footer />
    </>
  );
}
