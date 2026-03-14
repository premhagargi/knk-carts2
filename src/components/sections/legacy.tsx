"use client"

import { motion } from 'framer-motion'

export default function Legacy() {
  return (
    <section id="legacy" className="py-32 relative overflow-hidden bg-transparent">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-[12rem] md:text-[20rem] font-black leading-none tracking-tightest text-white/5 uppercase">
              25
            </h2>
            <div className="-mt-12 md:-mt-32 relative z-10">
              <span className="text-primary text-xl md:text-2xl font-bold uppercase tracking-[0.3em]">YEARS OF IMPACT</span>
              <p className="text-4xl md:text-6xl font-black uppercase tracking-tighter mt-4 max-w-xl">
                ENGINEERING <br />LEGENDS.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex flex-col gap-12"
          >
            <div className="space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-widest text-primary">Global Presence</h3>
              <p className="text-xl md:text-2xl font-light text-white/80 leading-relaxed">
                From Canada to Singapore, our hand-built karts dominate the global track ecosystem. 
                Engineering at a world standard, driven by a quarter-century of racing DNA.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <span className="block text-3xl font-black mb-1">12+</span>
                <span className="text-[10px] uppercase tracking-widest text-white/40">Countries Served</span>
              </div>
              <div>
                <span className="block text-3xl font-black mb-1">250+</span>
                <span className="text-[10px] uppercase tracking-widest text-white/40">Tracks Designed</span>
              </div>
            </div>

            <div className="border-l-2 border-primary pl-8 py-2">
              <p className="text-sm uppercase tracking-widest font-bold text-white/60 leading-loose">
                Hand-Built Engineering<br />
                Trusted across continents<br />
                Designed for performance
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
