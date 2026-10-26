import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { 
  Search, 
  Scale, 
  Heart, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  SlidersHorizontal,
  ChevronUp
} from 'lucide-react'
import { sound } from '@/lib/sound'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { Badge } from '@/components/ui/badge'

export function InteractiveDock({
  lang,
  filters,
  setFilters,
  shortlistCount,
  compareCount,
  onOpenCompare,
  onOpenShortlist,
  onOpenSpotlight = () => window.dispatchEvent(new CustomEvent('open-spotlight')),
  t
}) {
  const [audioEnabled, setAudioEnabled] = useState(sound.enabled)
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleAudio = () => {
    const newState = sound.toggle()
    setAudioEnabled(newState)
    if (newState) sound.success()
  }

  const categoryPresets = [
    { id: 'all', label: lang === 'ar' ? 'الكل' : 'All' },
    { id: 'royal_estate', label: lang === 'ar' ? 'قصور ملكية' : 'Royal Estates' },
    { id: 'outdoor_garden', label: lang === 'ar' ? 'مسطحات خضراء' : 'Open Lawns' },
    { id: 'nile_front', label: lang === 'ar' ? 'واجهة نيلية' : 'Nile Front' },
    { id: 'boutique_heritage', label: lang === 'ar' ? 'تراثي خاص' : 'Heritage' },
  ]

  const handleSelectCategory = (catId) => {
    sound.tap()
    setFilters(prev => ({ ...prev, category: catId }))
    const catalogEl = document.getElementById('venues-catalog')
    catalogEl?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="fixed bottom-6 inset-x-0 z-40 pointer-events-none flex justify-center px-4">
      <motion.nav 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 260 }}
        className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-full bg-[#000000]/88 text-[#ffffff] backdrop-blur-2xl border border-[#ffffff]/15 shadow-2xl shadow-[#000000]/40 max-w-[94vw] sm:max-w-none"
        style={{
          boxShadow: '0 20px 40px -15px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1) inset'
        }}
      >
        {/* 1. Spotlight Search Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => {
                sound.pop()
                onOpenSpotlight?.()
              }}
              className="flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-[#ffffff]/10 hover:bg-[#ffffff]/20 text-[#ffffff] text-xs font-medium transition-colors cursor-pointer select-none"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{lang === 'ar' ? 'بحث سريع' : 'Spotlight'}</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[9px] font-mono rounded bg-white/15 text-white/80">⌘K</kbd>
            </motion.button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>{lang === 'ar' ? 'بحث شامل وفوري (⌘K)' : 'Omni Search (⌘K)'}</p>
          </TooltipContent>
        </Tooltip>

        <div className="hidden sm:block h-4 w-[1px] bg-white/20 my-auto" />

        {/* 2. Category Quick Filters (Apple Segmented Tab Pill) */}
        <div className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10">
          {categoryPresets.map((preset) => {
            const isActive = filters.category === preset.id
            return (
              <button
                key={preset.id}
                onClick={() => handleSelectCategory(preset.id)}
                className={`relative px-3 py-1 rounded-full text-[11px] font-medium transition-colors cursor-pointer select-none ${
                  isActive ? 'text-[#000000]' : 'text-white/70 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="dockCategoryActive"
                    transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                    className="absolute inset-0 bg-[#ffffff] rounded-full shadow-xs -z-10"
                  />
                )}
                {preset.label}
              </button>
            )
          })}
        </div>

        {/* 3. Live Compare Indicator Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => {
                sound.pop()
                onOpenCompare?.()
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer select-none ${
                compareCount > 0 
                  ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30' 
                  : 'bg-white/5 hover:bg-white/15 text-white/80'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{lang === 'ar' ? 'المقارنة' : 'Compare'}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold ${
                compareCount > 0 ? 'bg-amber-400 text-black' : 'bg-white/20 text-white'
              }`}>
                {compareCount}
              </span>
            </motion.button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>{lang === 'ar' ? `مقارنة القاعات المختارة (${compareCount})` : `Compare selected venues (${compareCount})`}</p>
          </TooltipContent>
        </Tooltip>

        {/* 4. Shortlist Saved Heart */}
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => {
                sound.pop()
                onOpenShortlist?.()
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer select-none ${
                shortlistCount > 0 
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' 
                  : 'bg-white/5 hover:bg-white/15 text-white/80'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${shortlistCount > 0 ? 'fill-rose-400 text-rose-400' : ''}`} />
              <span className="hidden sm:inline">{lang === 'ar' ? 'المفضلة' : 'Shortlist'}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold ${
                shortlistCount > 0 ? 'bg-rose-500 text-white' : 'bg-white/20 text-white'
              }`}>
                {shortlistCount}
              </span>
            </motion.button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>{lang === 'ar' ? `القاعات المحفوظة (${shortlistCount})` : `Saved shortlist venues (${shortlistCount})`}</p>
          </TooltipContent>
        </Tooltip>

        <div className="h-4 w-[1px] bg-white/20 my-auto" />

        {/* 5. Audio-Haptic Feedback Switcher */}
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={toggleAudio}
              className={`p-1.5 sm:p-2 rounded-full transition-colors cursor-pointer select-none ${
                audioEnabled ? 'bg-white/15 text-white hover:bg-white/25' : 'bg-white/5 text-white/40 hover:text-white/70'
              }`}
            >
              {audioEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </motion.button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>{audioEnabled ? (lang === 'ar' ? 'التفاعل الصوتي مفعّل' : 'Audio haptics enabled') : (lang === 'ar' ? 'التفاعل الصوتي معطّل' : 'Audio haptics disabled')}</p>
          </TooltipContent>
        </Tooltip>
      </motion.nav>
    </div>
  )
}
