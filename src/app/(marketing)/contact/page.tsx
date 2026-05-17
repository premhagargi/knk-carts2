import PageHeader from '@/components/sections/page-header';
import Footer from '@/components/sections/footer';
import ContactForm from '@/components/contact-form';

export const metadata = {
  title: 'Contact | VCR Design',
  description:
    'Start an inquiry — kart design, track solutions, rental program, or spares & support.',
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Initiate Collaboration"
        title={
          <>
            DESIGN <span className="text-primary italic">INQUIRY.</span>
          </>
        }
        description="Tell us about your project — chassis, circuit, fleet, or operations. We respond within two working days."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      />
      <section className="py-20">
        <div className="container mx-auto px-6 grid lg:grid-cols-3 gap-20">
          <aside className="space-y-10">
            <div>
              <h3 className="text-[10px] uppercase tracking-widest font-black text-primary mb-4">
                STUDIO
              </h3>
              <p className="text-sm font-light text-white/70 leading-loose">
                VCR — Visions, Concepts & Realities<br />
                Belagavi, Karnataka, India<br />
                In partnership with KnK Karts Pvt Ltd
              </p>
            </div>
            <div>
              <h3 className="text-[10px] uppercase tracking-widest font-black text-primary mb-4">
                INQUIRIES
              </h3>
              <p className="text-sm font-light text-white/70 leading-loose">
                hello@vcr.studio<br />
                +91 — on request
              </p>
            </div>
          </aside>
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
