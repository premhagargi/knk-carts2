"use client"

import { useState, useEffect } from 'react'
import { motion, useScroll } from 'framer-motion'
import Link from 'next/link'

export default function Navbar() {
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50)
    })
    return () => unsubscribe()
  }, [scrollY])

  return (
    <motion.nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? "bg-black/80 backdrop-blur-md border-b border-white/10 py-4" : "bg-transparent py-8"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="group">
          <span className="text-2xl font-bold tracking-tightest uppercase italic flex items-center gap-2">
            <span className="bg-primary px-1 text-black">VCR</span>
            <span className="text-white group-hover:text-primary transition-colors">DESIGN</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-12">
          {['Portfolio', 'Ecosystem', 'Engineering', 'Legacy'].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="text-[10px] uppercase tracking-widest font-semibold hover:text-primary transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>

        <button className="border border-white/20 px-6 py-2 text-[10px] uppercase tracking-widest font-bold hover:bg-white hover:text-black transition-all">
          Design Inquiry
        </button>
      </div>
    </motion.nav>
  )
}
