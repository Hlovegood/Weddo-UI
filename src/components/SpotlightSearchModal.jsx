import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Search, X, MapPin, Building2, Sparkles, ArrowRight, Star } from 'lucide-react'
import gsap from 'gsap'
import { formatEGP } from '../lib/utils'

export function SpotlightSearchModal({
  isOpen,
  onClose,
  venues,
  onSelectVenue,
  lang,
  t
}) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const resultsRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
    } else {
      setQuery('')
    }
  }, [isOpen])

  // Filter venues
  const results = venues.filter(v => {
    if (!query.trim()) return true
    const q = query.toLowerCase()
    const nameEn = v.name.en.toLowerCase()
    const nameAr = (v.name.ar || '').toLowerCase()
    const areaEn = v.area.toLowerCase()
    const address = ((v.address?.[lang] || v.address?.en) || '').toLowerCase()
    return nameEn.includes(q) || nameAr.includes(q) || areaEn.includes(q) || address.includes(q)
  }).slice(0, 5)

  useEffect(() => {
    if (resultsRef.current && results.length > 0) {
      gsap.fromTo(
        resultsRef.current.children,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, stagger: 0.05, duration: 0.25, ease: 'power2.out' }
      )
    }
  }, [query, isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-start justify-center pt-20 px-4 sm:px-6">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-[#0f172a]/70 backdrop-blur-md transition-opacity"
      />

      {/* Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="relative w-full max-w-2xl bg-[#e7e5e4] dark:bg-[#1c1b18] border border-[#dfdcd5] dark:border-[#2e2d28] rounded-[9px] shadow-2xl overflow-hidden z-10 text-[#000000] dark:text-[#f5f5f3] transition-colors"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-[#dfdcd5] dark:border-[#2e2d28] bg-[#ebebeb] dark:bg-[#141412]">
          <Search className="w-5 h-5 text-[#595855] dark:text-[#a8a69e] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={lang === 'ar' ? 'ابحث باسم القاعة، المنطقة (التجمع، الزمالك، الأهرامات)...' : 'Search by venue name, area (New Cairo, Zamalek, Pyramids)...'}
            className="w-full bg-transparent text-sm sm:text-base font-medium text-[#000000] dark:text-[#f5f5f3] placeholder-[#595855] dark:placeholder-[#a8a69e] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-[#595855] dark:text-[#a8a69e] hover:text-[#000000] dark:hover:text-[#f5f5f3] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 rounded-md bg-white dark:bg-[#282723] border border-[#dfdcd5] dark:border-[#2e2d28] text-[11px] font-mono text-[#595855] dark:text-[#a8a69e] shadow-xs">
            ESC
          </kbd>
        </div>

        {/* Quick Suggestions / Results */}
        <div className="p-4 sm:p-5 max-h-[60vh] overflow-y-auto">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#595855] dark:text-[#a8a69e] mb-3 px-2 font-mono">
            {query.trim() ? (lang === 'ar' ? 'نتائج البحث' : 'Matching Venues') : (lang === 'ar' ? 'القاعات الأكثر طلباً في مصر' : 'Curated Premier Venues')}
          </div>

          <div ref={resultsRef} className="space-y-2">
            {results.map((venue) => {
              const name = venue.name[lang] || venue.name.en
              const address = venue.address?.[lang] || venue.address?.en
              const lowestPrice = venue.packages?.reduce((min, p) => p.price < min ? p.price : min, venue.packages[0]?.price || 0)

              return (
                <div
                  key={venue.id}
                  onClick={() => {
                    onClose()
                    onSelectVenue(venue)
                  }}
                  className="flex items-center justify-between p-3 rounded-[9px] hover:bg-[#dfdcd5]/40 dark:hover:bg-[#282723]/60 border border-transparent hover:border-[#dfdcd5] dark:hover:border-[#2e2d28] transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={venue.coverPhoto}
                      alt={name}
                      className="w-12 h-12 rounded-[6px] object-cover shrink-0 border border-[#dfdcd5] dark:border-[#2e2d28]"
                    />
                    <div className="min-w-0">
                      <div className="font-serif text-sm sm:text-base font-normal text-[#000000] dark:text-[#f5f5f3] truncate">
                        {name}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#595855] dark:text-[#a8a69e] truncate mt-0.5">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#595855] dark:text-[#a8a69e]" />
                          <span>{address}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-0.5 text-amber-500">
                          <Star className="w-3 h-3 fill-amber-500" />
                          <span>{venue.rating}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right rtl:text-left shrink-0 pl-3 rtl:pr-3">
                    <div className="text-xs font-mono font-semibold text-[#000000] dark:text-[#f5f5f3]">
                      {formatEGP(lowestPrice, lang)}
                    </div>
                    <div className="text-[10px] font-mono text-[#595855] dark:text-[#a8a69e]">
                      {t.fromPrice}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 border-t border-[#dfdcd5] dark:border-[#2e2d28] bg-[#ebebeb] dark:bg-[#141412] flex items-center justify-between text-xs text-[#595855] dark:text-[#a8a69e] font-mono">
          <span>{lang === 'ar' ? 'انقر على أي قاعة لفتح التفاصيل والمساحات' : 'Click any venue to open spaces & packages'}</span>
          <span className="flex items-center gap-1 text-[#000000] dark:text-[#f5f5f3] font-medium">
            <span>Weddo Direct</span>
            <Sparkles className="w-3 h-3" />
          </span>
        </div>
      </motion.div>
    </div>
  )
}
