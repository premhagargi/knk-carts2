"use client"

import { motion } from 'framer-motion'
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-black pt-32 pb-12 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 mb-32">
          {/* Contact Form Area */}
          <div>
            <h2 className="text-xs font-bold tracking-[0.5em] uppercase text-primary mb-8">START A PROJECT</h2>
            <h3 className="text-5xl font-black uppercase tracking-tightest mb-12">GET IN <br /><span className="text-primary">TOUCH.</span></h3>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input 
                  type="text" 
                  placeholder="NAME" 
                  className="bg-transparent border border-white/10 p-6 text-[10px] tracking-widest font-bold focus:border-primary outline-none w-full"
                />
                <input 
                  type="email" 
                  placeholder="EMAIL" 
                  className="bg-transparent border border-white/10 p-6 text-[10px] tracking-widest font-bold focus:border-primary outline-none w-full"
                />
              </div>
              <select className="bg-transparent border border-white/10 p-6 text-[10px] tracking-widest font-bold focus:border-primary outline-none w-full appearance-none">
                <option value="">PROJECT TYPE</option>
                <option value="karts">KART FLEET</option>
                <option value="track">TRACK CONSTRUCTION</option>
                <option value="consultancy">CONSULTANCY</option>
              </select>
              <textarea 
                placeholder="MESSAGE" 
                rows={4}
                className="bg-transparent border border-white/10 p-6 text-[10px] tracking-widest font-bold focus:border-primary outline-none w-full"
              ></textarea>
              <button className="bg-primary text-white py-6 px-12 text-xs font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all w-full">
                SEND INQUIRY
              </button>
            </form>
          </div>

          {/* Quick Links / Info Area */}
          <div className="flex flex-col justify-between">
            <div className="grid grid-cols-2 gap-20">
              <div className="space-y-8">
                <span className="text-[10px] font-bold tracking-widest text-primary uppercase">Navigation</span>
                <div className="flex flex-col gap-4">
                  {['Karts', 'Engineering', 'Track Design', 'Safety Systems', 'Contact'].map(link => (
                    <a key={link} href="#" className="text-xs uppercase tracking-widest font-bold hover:text-primary transition-colors">{link}</a>
                  ))}
                </div>
              </div>
              <div className="space-y-8">
                <span className="text-[10px] font-bold tracking-widest text-primary uppercase">Social</span>
                <div className="flex flex-col gap-4">
                  {['Instagram', 'Facebook', 'LinkedIn', 'X / Twitter'].map(link => (
                    <a key={link} href="#" className="text-xs uppercase tracking-widest font-bold hover:text-primary transition-colors">{link}</a>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-32 space-y-4">
              <h4 className="text-6xl font-black italic tracking-tightest uppercase text-white/5">KNK KARTS</h4>
              <p className="text-xs text-white/40 font-light tracking-widest uppercase leading-loose">
                Plot No. 12, Sector 5, Kopar Khairane,<br />
                Navi Mumbai, Maharashtra 400709, India
              </p>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <span className="text-[8px] uppercase tracking-[0.4em] font-bold text-white/20">
            © {new Date().getFullYear()} KNK KARTS PVT LTD. ALL RIGHTS RESERVED.
          </span>
          <div className="flex gap-8">
            <span className="text-[8px] uppercase tracking-[0.4em] font-bold text-white/20 cursor-pointer hover:text-white">Privacy Policy</span>
            <span className="text-[8px] uppercase tracking-[0.4em] font-bold text-white/20 cursor-pointer hover:text-white">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
