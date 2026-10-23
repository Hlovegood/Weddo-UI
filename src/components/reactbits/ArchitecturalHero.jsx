import React from 'react'
import { ShinyText } from './ShinyText'
import { BlurText } from './BlurText'
import { Sparkles, Compass, Building, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react'

export function ArchitecturalHero({
  onStartTour,
  className = ''
}) {
  return (
    <section className={`relative pt-16 pb-12 px-4 max-w-7xl mx-auto text-center ${className}`}>
      {/* Top Subtle Pill */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141211] border border-[#dfc086]/30 text-xs text-[#dfc086] mb-6 shadow-lg shadow-black/40 backdrop-blur-md">
        <Sparkles className="w-3.5 h-3.5 text-[#dfc086]" />
        <span className="font-semibold tracking-wide">
          Weddo Architectural MVP v0.7 — 3D Spatial Walkthrough
        </span>
      </div>

      {/* Main Headline */}
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-[#f7f3eb] tracking-tight leading-[1.08] max-w-5xl mx-auto mb-6">
        <span>Experience Cairo’s Most Enchanting Sanctuaries in </span>
        <ShinyText text="Living 3D Space." speed={4.5} className="font-serif italic font-normal" />
      </h1>

      {/* Subtitle */}
      <p className="text-sm sm:text-base lg:text-lg text-[#a89d91] max-w-3xl mx-auto leading-relaxed mb-8">
        Step beyond static PDF brochures. Glide through an authentic architectural pavilion rendered live in WebGL, explore genuine space capacities, test real seating layouts, and freeze transparent contract quotes directly with Cairo estate owners.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
        <button
          type="button"
          onClick={onStartTour}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#dfc086] via-[#ceab68] to-[#9e7a3d] text-[#0e0d0c] font-bold text-xs sm:text-sm tracking-wide flex items-center gap-2 shadow-xl shadow-[#ceab68]/25 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <Compass className="w-4 h-4" />
          <span>Launch 3D Walkthrough Tour</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <a
          href="#curated-venues"
          className="px-6 py-3.5 rounded-2xl bg-[#141211]/90 border border-[#27221e] hover:border-[#dfc086]/50 text-[#f7f3eb] font-semibold text-xs sm:text-sm flex items-center gap-2 backdrop-blur-xl transition-all cursor-pointer"
        >
          <Building className="w-4 h-4 text-[#dfc086]" />
          <span>Browse Curated Cairo Venues</span>
        </a>
      </div>

      {/* Stats Proof Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-[#231e1a]">
        <div className="flex flex-col items-center">
          <span className="text-2xl sm:text-3xl font-serif font-bold text-[#dfc086]">14.6 MB</span>
          <span className="text-[11px] text-[#8e8377] mt-0.5 uppercase tracking-wider">Spatial 3D Model</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl sm:text-3xl font-serif font-bold text-[#dfc086]">100%</span>
          <span className="text-[11px] text-[#8e8377] mt-0.5 uppercase tracking-wider">Capacity Certified</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl sm:text-3xl font-serif font-bold text-[#dfc086]">3 Years</span>
          <span className="text-[11px] text-[#8e8377] mt-0.5 uppercase tracking-wider">Date Lock Horizon</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl sm:text-3xl font-serif font-bold text-[#dfc086]">0 EGP</span>
          <span className="text-[11px] text-[#8e8377] mt-0.5 uppercase tracking-wider">Broker Commissions</span>
        </div>
      </div>
    </section>
  )
}

export default ArchitecturalHero
