import PageHeader from '@/components/sections/page-header';
import Legacy from '@/components/sections/legacy';
import Blueprint from '@/components/sections/blueprint';
import Footer from '@/components/sections/footer';

export const metadata = {
  title: 'About VCR | Visions, Concepts & Realities',
  description:
    'The design authority behind KnK Karts. Founded by Indrajeet and Ishaan Singh, VCR has shaped motorsport engineering for 25 years.',
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About VCR"
        title={
          <>
            DESIGN <span className="text-primary italic">AUTHORITY.</span>
            <br />
            SINCE 2000.
          </>
        }
        description="VCR — Visions, Concepts & Realities — is the design-rights holder behind KnK Karts Pvt Ltd. From a Belagavi studio, we shape the chassis, circuits, and operations that power 350+ karting venues globally."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
      />
      <Legacy />
      <section className="py-32 border-t border-white/5">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-xs font-bold tracking-[0.5em] uppercase text-primary mb-6">
              LEADERSHIP
            </h2>
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tightest leading-none mb-10">
              FOUNDERS,<br />
              <span className="text-primary italic">ENGINEERS.</span>
            </h3>
            <div className="space-y-8 text-white/70 font-light leading-relaxed text-lg">
              <p>
                <span className="font-bold text-white uppercase tracking-widest text-xs block mb-2">
                  Indrajeet Singh — Proprietor
                </span>
                A three-decade career in motorsport design and karting manufacture. Indrajeet directs VCR’s design rights, IP strategy, and key client engagements.
              </p>
              <p>
                <span className="font-bold text-white uppercase tracking-widest text-xs block mb-2">
                  Ishaan Singh — Co-Founder
                </span>
                Leads engineering programs, new-product development, and the partnership with KnK Karts’ Belagavi manufacturing operation.
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-xs font-bold tracking-[0.5em] uppercase text-primary mb-6">
              VCR × KNK KARTS
            </h2>
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tightest leading-none mb-10">
              ONE DESIGN.<br />
              <span className="text-primary italic">ONE FACTORY.</span>
            </h3>
            <p className="text-white/70 font-light leading-relaxed text-lg">
              VCR owns the design rights; KnK Karts Pvt Ltd, founded in 1999, manufactures them in Belagavi, Karnataka. The result is a single chain of custody — from concept sketch to factory weld jig to chassis-on-pallet — and a karting product line trusted by 350+ B2B clients across 12+ countries.
            </p>
          </div>
        </div>
      </section>
      <Blueprint />
      <Footer />
    </>
  );
}
