"use client"

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { PlaceHolderImages } from '@/lib/placeholder-images'

const products = [
  {
    title: "RECREATIONAL",
    subtitle: "Petrol & Electric",
    desc: "Engineered for maximum durability and low maintenance for amusement parks worldwide.",
    image: PlaceHolderImages.find(img => img.id === 'recreational-kart')?.imageUrl || '',
    color: "from-blue-900/40"
  },
  {
    title: "RACE",
    subtitle: "Competition Ready",
    desc: "Championship-winning geometry crafted with aerospace precision for serious athletes.",
    image: PlaceHolderImages.find(img => img.id === 'race-kart')?.imageUrl || '',
    color: "from-red-900/40"
  },
  {
    title: "OFF-ROAD",
    subtitle: "Terrain Domination",
    desc: "Rugged buggies designed to conquer the harshest environments with comfort and safety.",
    image: PlaceHolderImages.find(img => img.id === 'off-road-buggy')?.imageUrl || '',
    color: "from-gray-900/40"
  }
]

export default function Products() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollXProgress } = useScroll({ container: containerRef })

  return (
    <section id="karts" className="py-32 bg-black/40">
      <div className="container mx-auto px-6 mb-20">
        <h2 className="text-xs font-bold tracking-[0.5em] uppercase text-primary mb-4">THE FLEET</h2>
        <p className="text-4xl md:text-6xl font-black uppercase tracking-tightest">PRECISION LINEUP</p>
      </div>

      <div className="relative">
        <div 
          ref={containerRef}
          className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory gap-0"
        >
          {products.map((product, idx) => (
            <div 
              key={idx}
              className="min-w-full md:min-w-[70vw] h-[70vh] relative snap-center overflow-hidden border-r border-white/5 group"
            >
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                data-ai-hint={product.title.toLowerCase() + " kart"}
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${product.color} to-transparent opacity-80`} />
              
              <div className="absolute inset-0 p-12 flex flex-col justify-end">
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/60 mb-2">{product.subtitle}</span>
                <h3 className="text-6xl md:text-8xl font-black uppercase tracking-tightest leading-none mb-6">
                  {product.title}
                </h3>
                <p className="max-w-md text-sm md:text-base font-light text-white/80 leading-relaxed uppercase tracking-widest">
                  {product.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Progress Bar */}
        <div className="container mx-auto px-6 mt-12">
          <div className="w-full h-[1px] bg-white/10 relative">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-primary"
              style={{ scaleX: scrollXProgress }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
