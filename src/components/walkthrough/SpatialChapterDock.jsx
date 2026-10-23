import React, { useEffect } from 'react'
import { Play, Pause, ChevronLeft, ChevronRight, Compass } from 'lucide-react'
import { WALKTHROUGH_CHAPTERS } from './SpatialWalkthroughScene'

export function SpatialChapterDock({
  activeChapterIndex = 0,
  onChapterSelect,
  isAutoTouring = false,
  onToggleAutoTour,
  className = ''
}) {
  // Keyboard arrow listener for seamless chapter flythrough
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
      if (e.key === 'ArrowRight') {
        const next = (activeChapterIndex + 1) % WALKTHROUGH_CHAPTERS.length
        onChapterSelect(next)
      } else if (e.key === 'ArrowLeft') {
        const prev = (activeChapterIndex - 1 + WALKTHROUGH_CHAPTERS.length) % WALKTHROUGH_CHAPTERS.length
        onChapterSelect(prev)
      } else if (e.key === ' ') {
        e.preventDefault()
        onToggleAutoTour()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeChapterIndex, onChapterSelect, onToggleAutoTour])

  // Auto-tour timer
  useEffect(() => {
    if (!isAutoTouring) return
    const timer = setInterval(() => {
      onChapterSelect((prev) => (prev + 1) % WALKTHROUGH_CHAPTERS.length)
    }, 7500)
    return () => clearInterval(timer)
  }, [isAutoTouring, onChapterSelect])

  const handlePrev = () => {
    const prev = (activeChapterIndex - 1 + WALKTHROUGH_CHAPTERS.length) % WALKTHROUGH_CHAPTERS.length
    onChapterSelect(prev)
  }

  const handleNext = () => {
    const next = (activeChapterIndex + 1) % WALKTHROUGH_CHAPTERS.length
    onChapterSelect(next)
  }

  return (
    <div className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100vw-1.5rem)] max-w-4xl ${className}`}>
      <div className="relative px-2.5 sm:px-4 py-2 rounded-2xl sm:rounded-full bg-[#12100f]/85 backdrop-blur-2xl border border-[#dfc086]/25 shadow-2xl shadow-black/80 flex items-center justify-between gap-2">
        {/* Play / Pause Auto-Tour & Prev / Next */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          <button
            type="button"
            onClick={onToggleAutoTour}
            className={`p-2 rounded-full border transition-all cursor-pointer ${
              isAutoTouring
                ? 'bg-[#dfc086] text-[#0e0d0c] border-[#faecd2] shadow-sm'
                : 'bg-[#1a1714] text-[#dfc086] border-[#332920] hover:bg-[#25201b]'
            }`}
            title={isAutoTouring ? 'Pause 3D Tour (Spacebar)' : 'Play Automated 3D Tour (Spacebar)'}
          >
            {isAutoTouring ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          </button>

          <button
            type="button"
            onClick={handlePrev}
            className="p-1.5 rounded-full bg-[#181512] text-[#a89d91] hover:text-[#f7f3eb] border border-[#2b241d] hover:bg-[#221c17] transition-all cursor-pointer"
            title="Previous Chapter (Left Arrow)"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="p-1.5 rounded-full bg-[#181512] text-[#a89d91] hover:text-[#f7f3eb] border border-[#2b241d] hover:bg-[#221c17] transition-all cursor-pointer"
            title="Next Chapter (Right Arrow)"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 7 Chapter Scrubber Buttons */}
        <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-0.5 scrollbar-none flex-1 justify-center">
          {WALKTHROUGH_CHAPTERS.map((ch, idx) => {
            const isActive = idx === activeChapterIndex
            return (
              <button
                key={ch.id}
                type="button"
                onClick={() => onChapterSelect(idx)}
                className={`px-2.5 sm:px-3 py-1.5 rounded-full text-left transition-all shrink-0 cursor-pointer flex items-center gap-1.5 border ${
                  isActive
                    ? 'bg-[#221c16] border-[#dfc086] text-[#faecd2] shadow-sm shadow-[#ceab68]/20'
                    : 'bg-[#151311]/70 border-[#241e18] text-[#8e8377] hover:text-[#f7f3eb] hover:bg-[#1a1714]'
                }`}
              >
                <span
                  className={`font-mono text-[9px] font-bold ${
                    isActive ? 'text-[#dfc086]' : 'text-[#6e6355]'
                  }`}
                >
                  {ch.chapterNumber}
                </span>
                <span className="text-[11px] font-medium hidden md:inline truncate max-w-[110px]">
                  {ch.title.split(' ')[0]} {ch.title.split(' ')[1] || ''}
                </span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
                )}
              </button>
            )
          })}
        </div>

        {/* Chapter Counter Badge */}
        <div className="hidden sm:flex items-center gap-1.5 font-mono text-[10px] text-[#dfc086] px-2.5 py-1 rounded-full bg-[#1a1714] border border-[#332920] shrink-0">
          <Compass className="w-3 h-3" />
          <span>{activeChapterIndex + 1} / {WALKTHROUGH_CHAPTERS.length}</span>
        </div>
      </div>
    </div>
  )
}
