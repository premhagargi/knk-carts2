"use client"

import { motion } from 'framer-motion'
import { 
  DraftingCompass, 
  Construction, 
  Droplets, 
  ShieldAlert, 
  Lightbulb, 
  Settings, 
  Database, 
  Zap, 
  Wrench, 
  FileText 
} from 'lucide-react'

const features = [
  { name: "Track Design", icon: DraftingCompass },
  { name: "Surface Construction", icon: Construction },
  { name: "Drainage Systems", icon: Droplets },
  { name: "Safety Barriers", icon: ShieldAlert },
  { name: "Lighting", icon: Lightbulb },
  { name: "Pitlane Setup", icon: Settings },
  { name: "Fleet Management", icon: Database },
  { name: "Electric Kart Integration", icon: Zap },
  { name: "Maintenance Support", icon: Wrench },
  { name: "CAD Documentation", icon: FileText },
]

export default function Ecosystem() {
  return (
    <section id="track-solutions" className="py-32 bg-black border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 mb-20">
          <div className="lg:col-span-1">
            <h2 className="text-xs font-bold tracking-[0.5em] uppercase text-primary mb-6">TURNKEY SOLUTIONS</h2>
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tightest leading-none mb-8">
              BEYOND <br /><span className="text-primary italic">THE MACHINE.</span>
            </h3>
            <p className="text-white/60 font-light leading-relaxed max-w-sm uppercase text-xs tracking-widest">
              We provide the complete infrastructure. From initial CAD blueprints to fleet telemetry systems.
            </p>
          </div>

          <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-0 border-t border-l border-white/10">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ backgroundColor: "rgba(252, 33, 33, 0.05)" }}
                className="p-12 border-r border-b border-white/10 flex flex-col items-center justify-center gap-6 group cursor-pointer transition-all duration-500"
              >
                <feature.icon className="w-8 h-8 text-white/20 group-hover:text-primary transition-colors duration-500" />
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-center group-hover:text-white transition-colors">
                  {feature.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
