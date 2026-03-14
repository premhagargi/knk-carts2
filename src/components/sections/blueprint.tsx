"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import { PlaceHolderImages } from '@/lib/placeholder-images'

export default function Blueprint() {
  const bg = PlaceHolderImages.find(img => img.id === 'blueprint-bg')

  return (
    <section id="engineering" className="relative py-48 overflow-hidden bg-black">
      <div className="absolute inset-0 blueprint-grid z-0 opacity-20" />
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] z-0 pointer-events-none opacity-30">
        <Image
          src={bg?.imageUrl || ''}
          alt="Technical Blueprint"
          fill
          className="object-contain"
          data-ai-hint="engineering blueprint"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-xs font-bold tracking-[0.8em] uppercase text-primary mb-12">TECHNICAL SUPERIORITY</h2>
            <p className="text-5xl md:text-8xl lg:text-9xl font-black uppercase tracking-tightest leading-[0.9] mb-12">
              PRECISION <br /> <span className="text-blue-500">CRAFTED.</span>
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-5xl mt-12">
            {[
              { title: "CAD OPTIMIZED", desc: "Every chassis is stress-tested in 3D environments for maximum stiffness." },
              { title: "SITE SUPERVISION", desc: "Our engineers stay on-site during track construction for total precision." },
              { title: "TELEMETRY READY", desc: "Integrated fleet management for commercial tracking of every lap." }
            ].map((box, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="bg-white/5 border border-white/10 p-10 text-left hover:border-primary/50 transition-colors"
              >
                <h3 className="text-[10px] font-black tracking-widest text-primary mb-4">{box.title}</h3>
                <p className="text-sm font-light text-white/60 leading-relaxed uppercase tracking-wider">
                  {box.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
