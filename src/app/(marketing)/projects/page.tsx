import PageHeader from '@/components/sections/page-header';
import Footer from '@/components/sections/footer';
import { stats } from '@/lib/vcr-content';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import Marquee from '@/components/sections/marquee';

export const dynamic = 'force-dynamic';

type Project = {
  slug: string;
  title: string;
  client: string | null;
  location: string | null;
  year: number | null;
  description: string | null;
};

async function getProjects(): Promise<Project[]> {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from('projects')
    .select('slug, title, client, location, year, description')
    .order('year', { ascending: false });
  return (data ?? []) as Project[];
}

export const metadata = {
  title: 'Projects | VCR Design',
  description: 'Selected circuit and fleet projects from VCR + KnK Karts.',
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <PageHeader
        eyebrow="Case Studies"
        title={
          <>
            {stats.b2bClients}+ CLIENTS.<br />
            <span className="text-primary italic">12+ COUNTRIES.</span>
          </>
        }
        description="A selection of recent circuit, fleet, and operations projects delivered by VCR with KnK Karts."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Projects' }]}
      />
      <section className="py-20">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-0 border-t border-l border-white/10">
          {projects.map((p) => (
            <div
              key={p.slug}
              className="p-12 border-r border-b border-white/10 flex flex-col gap-6 min-h-[280px]"
            >
              <div className="flex justify-between items-start gap-6">
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-primary">
                  {p.location}
                </span>
                <span className="text-[10px] uppercase tracking-widest font-bold text-white/40">
                  {p.year}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tightest leading-none">
                {p.title}
              </h2>
              {p.client && (
                <span className="text-[10px] uppercase tracking-widest font-bold text-white/40">
                  Client · {p.client}
                </span>
              )}
              <p className="text-sm text-white/60 font-light leading-relaxed flex-1">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </section>
      <Marquee />
      <Footer />
    </>
  );
}
