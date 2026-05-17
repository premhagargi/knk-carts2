import Link from 'next/link';
import PageHeader from '@/components/sections/page-header';
import Footer from '@/components/sections/footer';

const posts = [
  {
    slug: 'designing-the-genesis-sxx5',
    title: 'Designing the Genesis SXX5',
    excerpt:
      'Inside VCR’s flagship sprint chassis — the geometry, the torsional brief, and the trade-offs we refused to make.',
    date: '2026-02-12',
    author: 'Ishaan Singh',
  },
  {
    slug: 'monsoon-grade-track-drainage',
    title: 'Monsoon-grade track drainage',
    excerpt:
      'Notes from designing drainage for venues that take 200mm of rain in a single afternoon.',
    date: '2026-01-18',
    author: 'VCR Engineering',
  },
  {
    slug: 'rental-fleet-economics-101',
    title: 'Rental fleet economics 101',
    excerpt:
      'What 25 years of partnering with rental operators has taught us about per-lap maintenance cost.',
    date: '2025-12-04',
    author: 'Indrajeet Singh',
  },
];

export const metadata = {
  title: 'Journal | VCR Design',
  description: 'Engineering notes, project updates, and operator insights from VCR.',
};

export default function BlogPage() {
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
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="block py-12 border-b border-white/10 group"
            >
              <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12">
                <span className="text-[10px] uppercase tracking-widest font-bold text-white/40 md:w-32 shrink-0">
                  {p.date}
                </span>
                <div className="flex-1">
                  <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tightest leading-none mb-4 group-hover:text-primary transition-colors">
                    {p.title}
                  </h2>
                  <p className="text-white/60 font-light leading-relaxed max-w-2xl">
                    {p.excerpt}
                  </p>
                  <span className="block mt-4 text-[10px] uppercase tracking-widest font-bold text-white/40">
                    By {p.author}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
