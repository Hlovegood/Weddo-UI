import React, { useState } from 'react'
import { 
  Sparkles, 
  Sunset, 
  Sun, 
  Moon, 
  Volume2, 
  VolumeX, 
  Scale, 
  Search, 
  Send, 
  Layers, 
  ShieldCheck, 
  Users, 
  Briefcase,
  ChevronDown
} from 'lucide-react'
import { ShinyText } from '../reactbits/ShinyText'
import { WALKTHROUGH_CHAPTERS } from './SpatialWalkthroughScene'

export function SpatialDynamicIsland({
  activeChapterIndex = 0,
  onChapterSelect,
  atmosphere = 'golden',
  onAtmosphereChange,
  isMuted = true,
  onToggleAudio,
  compareCount = 0,
  onOpenCompare,
  onOpenInquiry,
  onOpenSearch,
  activePerspective = 'couple', // 'couple' | 'owner' | 'admin'
  onPerspectiveChange
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const currentChapter = WALKTHROUGH_CHAPTERS[activeChapterIndex] || WALKTHROUGH_CHAPTERS[0]

  return (
    <header className="fixed top-3 left-1/2 -translate-x-1/2 z-40 w-[calc(100vw-1.5rem)] max-w-6xl">
      <div className="relative px-3 sm:px-5 py-2.5 rounded-2xl sm:rounded-full bg-[#12100f]/80 backdrop-blur-2xl border border-[#dfc086]/25 shadow-2xl shadow-black/80 flex items-center justify-between gap-2 sm:gap-4 transition-all">
        {/* Brand Monogram & Current Chapter */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => onChapterSelect(0)}>
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#dfc086] via-[#ceab68] to-[#9e7a3d] p-0.5 shadow-md shadow-[#ceab68]/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0e0d0c] rounded-[9px] flex items-center justify-center">
                <span className="font-serif font-black text-sm text-[#dfc086]">W</span>
              </div>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-serif text-sm font-bold tracking-tight text-[#f7f3eb] flex items-center gap-1 leading-none">
                <span>WEDDO</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#dfc086]" />
              </span>
              <span className="text-[8px] uppercase tracking-widest text-[#a89d91] font-semibold mt-0.5">
                Spatial 3D MVP
              </span>
            </div>
          </div>

          <div className="hidden md:block w-px h-5 bg-[#2c2621]" />

          {/* Active Chapter Pill */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#1a1714] border border-[#332920]">
            <span className="font-mono text-[10px] font-bold text-[#dfc086]">
              CH.{currentChapter.chapterNumber}
            </span>
            <span className="text-xs font-semibold text-[#f7f3eb] truncate max-w-[140px] sm:max-w-[200px]">
              {currentChapter.title}
            </span>
          </div>
        </div>

        {/* Center Perspective Switcher (Couple / Owner / Admin) */}
        <div className="hidden lg:flex items-center p-1 rounded-full bg-[#181512] border border-[#2b241d] text-[11px] font-medium text-[#a89d91]">
          <button
            type="button"
            onClick={() => {
              onPerspectiveChange('couple')
              if (activeChapterIndex > 4) onChapterSelect(0)
            }}
            className={`px-3 py-1 rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
              activePerspective === 'couple'
                ? 'bg-[#dfc086] text-[#0e0d0c] font-semibold shadow-sm'
                : 'hover:text-[#f7f3eb]'
            }`}
          >
            <Users className="w-3 h-3" />
            <span>Couple</span>
          </button>
          <button
            type="button"
            onClick={() => {
              onPerspectiveChange('owner')
              onChapterSelect(5) // Jump to Vendor Operations
            }}
            className={`px-3 py-1 rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
              activePerspective === 'owner'
                ? 'bg-[#dfc086] text-[#0e0d0c] font-semibold shadow-sm'
                : 'hover:text-[#f7f3eb]'
            }`}
          >
            <Briefcase className="w-3 h-3" />
            <span>Venue Owner</span>
          </button>
          <button
            type="button"
            onClick={() => {
              onPerspectiveChange('admin')
              onChapterSelect(6) // Jump to Admin Review Desk
            }}
            className={`px-3 py-1 rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
              activePerspective === 'admin'
                ? 'bg-[#dfc086] text-[#0e0d0c] font-semibold shadow-sm'
                : 'hover:text-[#f7f3eb]'
            }`}
          >
            <ShieldCheck className="w-3 h-3" />
            <span>Admin Audit</span>
          </button>
        </div>

        {/* Right Tools: Lighting, Sound, Compare, Search, Inquire */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Quick Cairo Search Drawer Button */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-[#1c1815] border border-[#332920] hover:border-[#dfc086]/50 text-[#f7f3eb] text-xs font-medium transition-all cursor-pointer"
            title="Search Cairo areas, date, and budget"
          >
            <Search className="w-3.5 h-3.5 text-[#dfc086]" />
            <span className="hidden sm:inline">Cairo Search</span>
          </button>

          {/* Atmosphere Toggle Icons */}
          <div className="flex items-center p-0.5 rounded-full bg-[#181512] border border-[#2b241d]">
            <button
              type="button"
              onClick={() => onAtmosphereChange('golden')}
              className={`p-1.5 rounded-full transition-all cursor-pointer ${
                atmosphere === 'golden'
                  ? 'bg-amber-500/20 text-[#dfc086]'
                  : 'text-[#776c5f] hover:text-[#f7f3eb]'
              }`}
              title="Golden Hour Cairo Sunset"
            >
              <Sunset className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onAtmosphereChange('sunrise')}
              className={`p-1.5 rounded-full transition-all cursor-pointer ${
                atmosphere === 'sunrise'
                  ? 'bg-rose-500/20 text-rose-300'
                  : 'text-[#776c5f] hover:text-[#f7f3eb]'
              }`}
              title="Soft Sunrise Dew"
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onAtmosphereChange('midnight')}
              className={`p-1.5 rounded-full transition-all cursor-pointer ${
                atmosphere === 'midnight'
                  ? 'bg-indigo-500/20 text-indigo-300'
                  : 'text-[#776c5f] hover:text-[#f7f3eb]'
              }`}
              title="Midnight Gala Starlight"
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Audio Chime Ambient Toggle */}
          <button
            type="button"
            onClick={onToggleAudio}
            className={`p-1.5 sm:p-2 rounded-full border transition-all cursor-pointer ${
              !isMuted
                ? 'bg-[#241e17] border-[#dfc086] text-[#dfc086] shadow-sm shadow-[#ceab68]/20'
                : 'bg-[#181512] border-[#2b241d] text-[#776c5f] hover:text-[#f7f3eb]'
            }`}
            title={isMuted ? 'Unmute Ambient Sound' : 'Mute Ambient Sound'}
          >
            {!isMuted ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* Compare Drawer Pill */}
          <button
            type="button"
            onClick={onOpenCompare}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-[#1c1815] border border-[#332920] hover:border-[#dfc086]/50 text-[#dfc086] text-xs font-medium transition-all cursor-pointer"
            title="Side-by-side venue compare"
          >
            <Scale className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Compare</span>
            <span className="px-1.5 py-0.2 rounded-full bg-[#dfc086]/20 text-[#dfc086] text-[10px] font-bold">
              {compareCount}
            </span>
          </button>

          {/* Direct 1-on-1 Inquiry Trigger */}
          <button
            type="button"
            onClick={onOpenInquiry}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#dfc086] via-[#ceab68] to-[#9e7a3d] text-[#0e0d0c] font-bold text-xs shadow-md shadow-[#ceab68]/25 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Inquire</span>
          </button>
        </div>
      </div>
    </header>
  )
}
