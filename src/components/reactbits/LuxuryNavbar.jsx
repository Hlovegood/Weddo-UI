import React, { useState } from 'react'
import { Sparkles, Scale, Heart, Compass, Send, Menu, X, Volume2, VolumeX, ShieldCheck } from 'lucide-react'
import { ShinyText } from './ShinyText'

export function LuxuryNavbar({
  compareCount = 0,
  onOpenCompare,
  onOpenInquiry,
  isMuted = true,
  onToggleAudio
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollTo = (id) => {
    setMobileMenuOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#231e1a]/80 bg-[#08090b]/80 backdrop-blur-2xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#dfc086] via-[#ceab68] to-[#9e7a3d] p-0.5 shadow-md shadow-[#ceab68]/20 group-hover:shadow-[#ceab68]/40 transition-shadow">
              <div className="w-full h-full bg-[#0e0d0c] rounded-[10px] flex items-center justify-center">
                <span className="font-serif font-black text-xl text-[#dfc086] tracking-tighter">W</span>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-tight text-[#f7f3eb] flex items-center gap-1.5">
                <span>WEDDO</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#dfc086]" />
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[#a89d91] font-semibold -mt-1 hidden sm:block">
                The Architecture of Forever
              </span>
            </div>
          </a>
        </div>

        {/* Desktop Navigation Links (Stable, No upward disappearance!) */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-medium text-[#d6cebf]">
          <button
            type="button"
            onClick={() => scrollTo('walkthrough-centerpiece')}
            className="flex items-center gap-1.5 text-[#dfc086] hover:text-[#f7e7c4] transition-colors cursor-pointer group"
          >
            <Compass className="w-3.5 h-3.5 text-[#dfc086] group-hover:rotate-45 transition-transform" />
            <span>3D Walkthrough Tour</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
          </button>

          <button
            type="button"
            onClick={() => scrollTo('curated-venues')}
            className="hover:text-[#dfc086] transition-colors cursor-pointer"
          >
            Curated Venues
          </button>

          <button
            type="button"
            onClick={() => scrollTo('market-intelligence')}
            className="hover:text-[#dfc086] transition-colors cursor-pointer"
          >
            Market Intelligence
          </button>

          <button
            type="button"
            onClick={() => scrollTo('platform-architecture')}
            className="hover:text-[#dfc086] transition-colors cursor-pointer"
          >
            Platform Blueprint
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Audio Chime Toggle */}
          <button
            type="button"
            onClick={onToggleAudio}
            title={isMuted ? 'Unmute luxury ambient chime' : 'Mute luxury ambient chime'}
            className="p-2 rounded-xl bg-[#141211] border border-[#27221e] text-[#a89d91] hover:text-[#dfc086] transition-colors cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#dfc086]" />}
          </button>

          {/* Compare Drawer Trigger */}
          <button
            type="button"
            onClick={onOpenCompare}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#141211] border border-[#27221e] hover:border-[#dfc086]/50 text-xs font-semibold text-[#f7f3eb] transition-all cursor-pointer shadow-sm"
          >
            <Scale className="w-3.5 h-3.5 text-[#dfc086]" />
            <span className="hidden sm:inline">Compare</span>
            {compareCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-[#dfc086] text-[#0e0d0c] font-bold text-[10px]">
                {compareCount}
              </span>
            )}
          </button>

          {/* Direct Inquiry CTA Button */}
          <button
            type="button"
            onClick={() => onOpenInquiry?.()}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#dfc086] via-[#ceab68] to-[#9e7a3d] text-[#0e0d0c] text-xs font-bold tracking-wide flex items-center gap-1.5 shadow-md shadow-[#ceab68]/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Book Private Tour</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 lg:hidden rounded-xl bg-[#141211] border border-[#27221e] text-[#a89d91] hover:text-[#f7f3eb]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden p-4 border-t border-[#27221e] bg-[#0c0d10] space-y-3">
          <button
            type="button"
            onClick={() => scrollTo('walkthrough-centerpiece')}
            className="w-full text-left p-2.5 rounded-lg text-xs font-semibold text-[#dfc086] flex items-center gap-2"
          >
            <Compass className="w-4 h-4" />
            <span>3D Walkthrough Tour</span>
          </button>

          <button
            type="button"
            onClick={() => scrollTo('curated-venues')}
            className="w-full text-left p-2.5 rounded-lg text-xs font-medium text-[#d6cebf]"
          >
            Curated Cairo Venues
          </button>

          <button
            type="button"
            onClick={() => scrollTo('market-intelligence')}
            className="w-full text-left p-2.5 rounded-lg text-xs font-medium text-[#d6cebf]"
          >
            Market Intelligence
          </button>

          <button
            type="button"
            onClick={() => scrollTo('platform-architecture')}
            className="w-full text-left p-2.5 rounded-lg text-xs font-medium text-[#d6cebf]"
          >
            Platform Architecture & Roles
          </button>
        </div>
      )}
    </header>
  )
}

export default LuxuryNavbar
