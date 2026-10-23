import React from 'react'
import { Sparkles, MapPin, ShieldCheck, Heart } from 'lucide-react'

export function LuxuryFooter() {
  return (
    <footer className="border-t border-[#231e1a] bg-[#07080a] text-[#9c9183] py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        {/* Brand column */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#dfc086] via-[#ceab68] to-[#9e7a3d] flex items-center justify-center font-serif font-black text-[#0e0d0c] text-base shadow-sm">
              W
            </div>
            <span className="font-serif text-xl font-bold text-[#f7f3eb]">WEDDO</span>
          </div>
          <p className="text-xs text-[#9c9183] leading-relaxed">
            Cairo’s authentic wedding venue registry and 3D architectural pre-visualization platform. Transparent capacities, direct pricing snapshots, and certified space dimensions.
          </p>
          <div className="text-[11px] text-[#dfc086] flex items-center gap-1.5 font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Weddo MVP v0.7 — 3D Architecture Engine</span>
          </div>
        </div>

        {/* Areas */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#d6cebf]">
            Cairo Destinations
          </h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#curated-venues" className="hover:text-[#dfc086] transition-colors">New Cairo & 90th Street</a></li>
            <li><a href="#curated-venues" className="hover:text-[#dfc086] transition-colors">Garden City & Nile Corniche</a></li>
            <li><a href="#curated-venues" className="hover:text-[#dfc086] transition-colors">Heliopolis & Korba Heritage</a></li>
            <li><a href="#curated-venues" className="hover:text-[#dfc086] transition-colors">Giza & Pyramids Plateau</a></li>
            <li><a href="#curated-venues" className="hover:text-[#dfc086] transition-colors">Zamalek Island Waterfront</a></li>
          </ul>
        </div>

        {/* 3D Walkthrough Chapters */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#d6cebf]">
            3D Walkthrough Tour
          </h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#walkthrough-centerpiece" className="hover:text-[#dfc086] transition-colors">01. The Grand Arch Portal</a></li>
            <li><a href="#walkthrough-centerpiece" className="hover:text-[#dfc086] transition-colors">02. Ceremony Lawn & Seating</a></li>
            <li><a href="#walkthrough-centerpiece" className="hover:text-[#dfc086] transition-colors">03. Glasshouse Crystal Atrium</a></li>
            <li><a href="#walkthrough-centerpiece" className="hover:text-[#dfc086] transition-colors">04. Sunset Riverfront Promenade</a></li>
            <li><a href="#walkthrough-centerpiece" className="hover:text-[#dfc086] transition-colors">05. VIP Bridal Sanctuary Suite</a></li>
          </ul>
        </div>

        {/* Contact & Support */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#d6cebf]">
            Platform Governance
          </h4>
          <p className="text-xs text-[#9c9183] leading-relaxed">
            Local preview edition. Database stores accounts, sessions, listings, and messages in SQLite with WAL protection.
          </p>
          <div className="text-xs text-[#dfc086]">
            concierge@weddo.luxury
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-[#1c1815] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8e8377]">
        <span>© 2026 Weddo Luxury Wedding Sanctuaries. All rights reserved.</span>
        <span>Built with Three.js, React Bits, and Apple-grade fluid motion.</span>
      </div>
    </footer>
  )
}

export default LuxuryFooter
