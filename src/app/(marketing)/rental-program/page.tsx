import Link from 'next/link';
import PageHeader from '@/components/sections/page-header';
import Footer from '@/components/sections/footer';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Rental Program | VCR Design',
  description:
    'Rental-operator program — chassis, spares, training, and operations support engineered for daily duty cycles.',
};

const pillars = [
  {
    label: 'CHASSIS',
    title: 'Built for the rental cycle.',
    body: 'The VCR Sport and TS22 are engineered around 12-hour duty cycles, replaceable wear surfaces, and a service-friendly engine bay — driving per-lap maintenance cost down.',
  },
  {
    label: 'SPARES',
    title: 'Predictable supply.',
    body: 'Bonded stock of high-rotation consumables — bearings, chains, sprockets, bodywork — shipped on a quarterly cadence aligned to your hour-meter forecast.',
  },
  {
    label: 'TRAINING',
    title: 'Your techs, our manuals.',
    body: 'Annual on-site technician training and a structured fault-finding manual cut diagnosis time on the busiest days.',
  },
  {
    label: 'OPERATIONS',
    title: 'Benchmark, don’t guess.',
    body: 'Quarterly operational benchmarks against peer operators in the VCR network — fleet utilization, mean-time-between-failures, and revenue per lane.',
  },
];

export default function RentalProgramPage() {
  return (
    <>
      <PageHeader
        eyebrow="Operator Program"
        title={
          <>
            THE VCR <span className="text-primary italic">RENTAL PROGRAM.</span>
          </>
        }
        description="A long-term commercial framework for rental operators. Chassis, spares, training, and benchmarking — bundled into a single annual partnership."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Rental Program' }]}
      />
      <section className="py-20">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-0 border-t border-l border-white/10">
          {pillars.map((p) => (
            <div
              key={p.label}
              className="p-12 border-r border-b border-white/10 flex flex-col gap-4 min-h-[260px]"
            >
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-primary">
                {p.label}
              </span>
              <h3 className="text-3xl font-black uppercase tracking-tightest leading-none">
                {p.title}
              </h3>
              <p className="text-sm text-white/60 font-light leading-relaxed mt-2">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="py-32 border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-xs font-bold tracking-[0.5em] uppercase text-primary mb-6">
            ENGAGE
          </h2>
          <p className="text-4xl md:text-6xl font-black uppercase tracking-tightest leading-[0.9] mb-12">
            START THE <span className="text-primary italic">CONVERSATION.</span>
          </p>
          <Link
            href="/contact?inquiry=rental"
            className="inline-flex items-center gap-3 bg-primary text-white px-12 py-6 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all"
          >
            Rental Operator Inquiry <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
