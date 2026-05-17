import Link from 'next/link';

type Crumb = { label: string; href?: string };

export default function PageHeader({
  eyebrow,
  title,
  description,
  crumbs,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  crumbs?: Crumb[];
}) {
  return (
    <section className="pt-44 pb-20 border-b border-white/5">
      <div className="container mx-auto px-6">
        {crumbs && crumbs.length > 0 && (
          <nav className="mb-8 flex gap-2 text-[10px] uppercase tracking-widest font-bold text-white/40">
            {crumbs.map((c, i) => (
              <span key={`${c.label}-${i}`} className="flex items-center gap-2">
                {c.href ? (
                  <Link href={c.href} className="hover:text-primary transition-colors">
                    {c.label}
                  </Link>
                ) : (
                  <span>{c.label}</span>
                )}
                {i < crumbs.length - 1 && <span className="text-white/20">/</span>}
              </span>
            ))}
          </nav>
        )}
        <h2 className="text-xs font-bold tracking-[0.5em] uppercase text-primary mb-6">
          {eyebrow}
        </h2>
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tightest leading-[0.9] max-w-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-8 text-lg md:text-xl font-light text-white/70 leading-relaxed max-w-3xl">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
