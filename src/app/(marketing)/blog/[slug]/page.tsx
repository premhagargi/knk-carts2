import { notFound } from 'next/navigation';
import PageHeader from '@/components/sections/page-header';
import Footer from '@/components/sections/footer';

const posts: Record<
  string,
  { title: string; date: string; author: string; body: string[] }
> = {
  'designing-the-genesis-sxx5': {
    title: 'Designing the Genesis SXX5',
    date: '2026-02-12',
    author: 'Ishaan Singh',
    body: [
      'When we began the SXX5 program in 2022, the brief was deceptively simple: a sprint chassis that wouldn’t punish a mid-pack driver for an imperfect entry.',
      'We started with torsional response. The previous generation of CrMo frames was, frankly, too stiff at the front-end pickup — the kart would push under braking unless the driver was perfectly geometric.',
      'The fix wasn’t dramatic: a relocated pickup, a wider track at the rear, and an aluminium seat-mount cluster that lets the seat take a controlled flex through the apex. The result is a chassis you can hustle.',
    ],
  },
  'monsoon-grade-track-drainage': {
    title: 'Monsoon-grade track drainage',
    date: '2026-01-18',
    author: 'VCR Engineering',
    body: [
      'In Belagavi we plan for 200mm of rain in an afternoon. That number isn’t hypothetical — it’s the design load for every karting venue we’ve commissioned in tropical climates.',
      'The trick is to do most of the work below the surface. Cambered tarmac and well-cut gutters carry the first 20mm; everything beyond that is the job of the subsurface drainage network.',
    ],
  },
  'rental-fleet-economics-101': {
    title: 'Rental fleet economics 101',
    date: '2025-12-04',
    author: 'Indrajeet Singh',
    body: [
      'The single best predictor of rental fleet profitability is per-lap maintenance cost — and it’s the metric most operators don’t track.',
      'Track it, and the obvious wins reveal themselves: a $4 sprocket lasting 1,500 laps vs 4,000 laps is not a $4 decision, it’s a $40,000 decision over the year.',
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = posts[params.slug];
  if (!p) return {};
  return { title: `${p.title} | VCR Journal` };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = posts[params.slug];
  if (!post) notFound();

  return (
    <>
      <PageHeader
        eyebrow={post.date}
        title={post.title}
        description={`By ${post.author}`}
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Journal', href: '/blog' },
          { label: post.title },
        ]}
      />
      <article className="py-20">
        <div className="container mx-auto px-6 max-w-3xl space-y-8">
          {post.body.map((para, i) => (
            <p
              key={i}
              className="text-xl font-light text-white/80 leading-relaxed"
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
