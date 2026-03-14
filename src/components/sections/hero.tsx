"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import { PlaceHolderImages } from '@/lib/placeholder-images'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-kart')

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Grid Overlay */}
      <div className="absolute inset-0 grid-overlay z-10 pointer-events-none" />
      
      {/* Background Image with Parallax/Fade */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage?.imageUrl || ''}
          alt="VCR Motorsport Design"
          fill
          className="object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
          priority
          data-ai-hint="racing kart"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
      </div>

      <div className="container mx-auto px-6 relative z-20 pt-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block text-[10px] sm:text-xs font-bold tracking-[0.4em] uppercase text-primary mb-6">
              Visions • Concepts • Realities
            </span>
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black leading-[0.8] tracking-tightest uppercase mb-12">
              VCR <span className="text-primary italic">STUDIO</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-col md:flex-row gap-8 items-start md:items-center"
          >
            <p className="text-lg md:text-xl font-light tracking-tight max-w-lg">
              Function-driven motorsport engineering. We define the design rights for the world's most precise handcrafted karts.
            </p>
            
            <div className="flex gap-4">
              <button className="bg-primary text-white px-10 py-5 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center gap-3">
                Design Concepts <ArrowRight className="w-4 h-4" />
              </button>
              <button className="border border-white/20 text-white px-10 py-5 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                Manufacturing Partner
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[8px] uppercase tracking-[0.3em] font-bold text-white/40">Discover VCR</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  )
}
