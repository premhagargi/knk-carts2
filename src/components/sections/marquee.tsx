"use client"

import { motion } from 'framer-motion'

export default function Marquee() {
  const items = [
    "Australia", "Canada", "Germany", "USA", "Singapore", 
    "Malaysia", "Kenya", "Nigeria", "Sri Lanka", "Chile", 
    "Namibia", "India"
  ]

  return (
    <div className="bg-primary py-10 overflow-hidden relative border-y-4 border-black">
      <div className="flex whitespace-nowrap">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-20 items-center px-10"
        >
          {[...items, ...items].map((country, idx) => (
            <div key={idx} className="flex items-center gap-10">
              <span className="text-4xl md:text-6xl font-black uppercase tracking-tightest text-black italic">
                {country}
              </span>
              <div className="w-4 h-4 bg-black rotate-45" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
