'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const navLinks: { label: string; href: string }[] = [
  { label: 'Products', href: '/products' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Projects', href: '/projects' },
  { label: 'Rental', href: '/rental-program' },
  { label: 'Spares', href: '/spares' },
  { label: 'About', href: '/about' },
  { label: 'Journal', href: '/blog' },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setIsScrolled(latest > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

  return (
    <motion.nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-brand-charcoal/85 backdrop-blur-md border-b border-white/10 py-4'
          : 'bg-transparent py-8'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="group inline-flex items-center" aria-label="VCR Design home">
          <Image
            src="/VCR logo final 190116.png"
            alt="VCR Design"
            width={160}
            height={82}
            priority
            className={`w-auto object-contain transition-all duration-500 ${
              isScrolled ? 'h-10' : 'h-12'
            }`}
          />
        </Link>

        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[10px] uppercase tracking-widest font-semibold hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href="/contact"
          className="border border-white/20 px-6 py-2 text-[10px] uppercase tracking-widest font-bold hover:bg-white hover:text-brand-charcoal transition-all"
        >
          Design Inquiry
        </Link>
      </div>
    </motion.nav>
  );
}
