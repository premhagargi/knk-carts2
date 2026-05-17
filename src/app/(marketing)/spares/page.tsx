import Link from 'next/link';
import PageHeader from '@/components/sections/page-header';
import Footer from '@/components/sections/footer';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Spares & Support | VCR Design',
  description:
    'Genuine VCR / KnK Karts spares, technical support, and warranty service.',
};

const categories = [
  { name: 'Chassis components', items: ['Spaceframe weldments', 'Bumpers', 'Side pods', 'Steering columns'] },
  { name: 'Drivetrain', items: ['Axles', 'Sprockets', 'Chains', 'Bearings'] },
  { name: 'Brakes', items: ['Discs', 'Pads', 'Calipers', 'Master cylinders'] },
  { name: 'Bodywork', items: ['Front fairings', 'Side pods', 'Seats', 'Number panels'] },
];

export default function SparesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Spares & Support"
        title={
          <>
            GENUINE PARTS. <span className="text-primary italic">DIRECT.</span>
          </>
        }
        description="Authentic VCR/KnK Karts spares, technical service, and warranty support — shipped from the Belagavi factory to operators worldwide."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Spares' }]}
      />
      <section className="py-20">
        <div className="container mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-l border-white/10">
          {categories.map((c) => (
            <div
              key={c.name}
              className="p-10 border-r border-b border-white/10 flex flex-col gap-6 min-h-[300px]"
            >
              <h3 className="text-xl font-black uppercase tracking-tightest leading-none">
                {c.name}
              </h3>
              <ul className="space-y-3 text-sm font-light text-white/60">
                {c.items.map((i) => (
                  <li key={i} className="border-b border-white/5 pb-3">
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <section className="py-32 border-t border-white/5 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-xs font-bold tracking-[0.5em] uppercase text-primary mb-6">
            REQUEST A QUOTE
          </h2>
          <p className="text-4xl md:text-5xl font-black uppercase tracking-tightest mb-10">
            EMAIL US YOUR SPARES LIST.
          </p>
          <Link
            href="/contact?inquiry=spares"
            className="inline-flex items-center gap-3 bg-primary text-white px-12 py-6 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all"
          >
            Spares Inquiry <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
