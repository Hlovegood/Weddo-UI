import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { 
  Sparkles, 
  Building2, 
  Trees, 
  Landmark, 
  Presentation, 
  Filter, 
  RotateCcw,
  ArrowUpDown
} from 'lucide-react'
import { VenueCard } from './VenueCard'
import { sound } from '@/lib/sound'
import { Badge } from '@/components/ui/badge'

export function VenueCatalog({
  venues,
  filters,
  shortlist,
  onToggleShortlist,
  compareIds,
  onToggleCompare,
  onSelectDetails,
  onQuickInquire,
  onResetFilters,
  lang,
  t
}) {
  const [activeTab, setActiveTab] = useState('all')
  const [sortBy, setSortBy] = useState('featured') // featured, price_asc, price_desc, capacity

  const categoryTabs = [
    { id: 'all', label: lang === 'ar' ? 'كافة المعروضات' : 'All Venues', icon: Sparkles },
    { id: 'wedding', label: lang === 'ar' ? 'أفراح وعقد قران' : 'Weddings & Katb Ketab', icon: Landmark },
    { id: 'conference', label: lang === 'ar' ? 'مؤتمرات وقمم دولية' : 'Conferences & Summits', icon: Presentation },
    { id: 'garden', label: lang === 'ar' ? 'حدائق ومساحات مفتوحة' : 'Open-Air Lawns', icon: Trees },
    { id: 'ballroom', label: lang === 'ar' ? 'قاعات كبرى وفندقية' : 'Grand Ballrooms', icon: Building2 },
  ]

  const filteredVenues = venues.filter(venue => {
    if (filters.area !== 'all' && venue.area !== filters.area) return false
    if (filters.category && filters.category !== 'all' && venue.category !== filters.category) return false

    if (activeTab === 'wedding' && venue.category !== 'wedding') return false
    if (activeTab === 'conference' && venue.category !== 'conference') return false
    if (activeTab === 'garden' && venue.kind !== 'garden') return false
    if (activeTab === 'ballroom' && venue.kind !== 'ballroom') return false

    if (filters.guests !== 'all') {
      const maxCap = venue.spaces?.reduce((max, s) => s.capacity > max ? s.capacity : max, 0)
      if (filters.guests === 'intimate' && maxCap > 120) return false
      if (filters.guests === 'medium' && (maxCap < 120 || maxCap > 280)) return false
      if (filters.guests === 'grand' && (maxCap < 280 || maxCap > 600)) return false
      if (filters.guests === 'royal' && maxCap < 600) return false
    }

    if (filters.budget !== 'all') {
      const lowest = venue.packages?.reduce((min, p) => p.price < min ? p.price : min, venue.packages[0]?.price || 0)
      if (filters.budget === 'under150k' && lowest > 150000) return false
      if (filters.budget === '150k-300k' && (lowest < 150000 || lowest > 300000)) return false
      if (filters.budget === 'above300k' && lowest < 300000) return false
    }

    return true
  }).sort((a, b) => {
    if (sortBy === 'price_asc') {
      const minA = a.packages?.reduce((m, p) => p.price < m ? p.price : m, a.packages[0]?.price || 0)
      const minB = b.packages?.reduce((m, p) => p.price < m ? p.price : m, b.packages[0]?.price || 0)
      return minA - minB
    }
    if (sortBy === 'price_desc') {
      const minA = a.packages?.reduce((m, p) => p.price < m ? p.price : m, a.packages[0]?.price || 0)
      const minB = b.packages?.reduce((m, p) => p.price < m ? p.price : m, b.packages[0]?.price || 0)
      return minB - minA
    }
    if (sortBy === 'capacity') {
      const capA = a.spaces?.reduce((m, s) => s.capacity > m ? s.capacity : m, 0)
      const capB = b.spaces?.reduce((m, s) => s.capacity > m ? s.capacity : m, 0)
      return capB - capA
    }
    return 0
  })

  return (
    <section id="venues-catalog" className="py-20 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Renaissance Gallery Exhibition Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6 border-b border-[#dfdcd5] dark:border-[#2e2d28] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-[11px] font-mono tracking-widest uppercase text-[#595855] dark:text-[#a8a69e] mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#000000] dark:bg-[#f5f5f3]" />
            <span>EXHIBITION CATALOG // VOLUME 2026</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-[-0.03em] text-[#000000] dark:text-[#f5f5f3] leading-[1.0]">
            {t.catalogTitle}
          </h2>
        </div>

        {/* Counter Pill Badge & Sort options */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-[#e7e5e4] dark:bg-[#1c1b18] px-3 py-1 rounded-full border border-[#dfdcd5] dark:border-[#2e2d28] text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#595855] dark:text-[#a8a69e]" />
            <select
              value={sortBy}
              onChange={(e) => {
                sound.tap()
                setSortBy(e.target.value)
              }}
              className="bg-transparent text-xs font-medium text-[#000000] dark:text-[#f5f5f3] outline-none cursor-pointer [&>option]:bg-[#e7e5e4] [&>option]:text-black dark:[&>option]:bg-[#1c1b18] dark:[&>option]:text-[#f5f5f3]"
            >
              <option value="featured">{lang === 'ar' ? 'المميزة أولاً' : 'Featured First'}</option>
              <option value="price_asc">{lang === 'ar' ? 'السعر: من الأقل' : 'Price: Low to High'}</option>
              <option value="price_desc">{lang === 'ar' ? 'السعر: من الأعلى' : 'Price: High to Low'}</option>
              <option value="capacity">{lang === 'ar' ? 'السعة: الأكبر' : 'Max Capacity'}</option>
            </select>
          </div>

          <Badge variant="secondary" className="font-mono text-xs py-1 dark:bg-[#1c1b18] dark:text-[#f5f5f3] dark:border-[#2e2d28]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#000000] dark:bg-[#f5f5f3] animate-pulse" />
            <span className="font-semibold tabular-nums">
              {filteredVenues.length < 10 ? `0${filteredVenues.length}` : filteredVenues.length}
            </span>
            <span className="text-[#595855] dark:text-[#a8a69e] uppercase text-[11px]">{t.resultsFound}</span>
          </Badge>
        </div>
      </div>

      {/* Gallery Pill Category Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none relative">
        {categoryTabs.map(tab => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => {
                sound.tap()
                setActiveTab(tab.id)
              }}
              className={`tap-bounce relative whitespace-nowrap inline-flex items-center gap-2 px-4 py-2 rounded-[28.8px] text-[12px] font-sans font-medium transition-all cursor-pointer z-10 select-none ${
                isActive
                  ? 'bg-[#000000] text-[#ffffff] dark:bg-[#f5f5f3] dark:text-[#0b0b0a]'
                  : 'bg-[#e7e5e4] text-[#595855] hover:text-[#000000] border border-[#dfdcd5] dark:bg-[#1c1b18] dark:text-[#a8a69e] dark:hover:text-[#f5f5f3] dark:border-[#2e2d28]'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeCategoryPill"
                  className="absolute inset-0 rounded-[28.8px] bg-[#000000] dark:bg-[#f5f5f3] -z-10"
                  transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                />
              )}
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#ffffff] dark:text-[#0b0b0a]' : 'text-[#595855] dark:text-[#a8a69e]'}`} />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Venues Grid with Animated Presence */}
      {filteredVenues.length > 0 ? (
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence>
            {filteredVenues.map(venue => (
              <VenueCard
                key={venue.id}
                venue={venue}
                lang={lang}
                isShortlisted={shortlist.includes(venue.id)}
                onToggleShortlist={onToggleShortlist}
                isCompared={compareIds.includes(venue.id)}
                onToggleCompare={onToggleCompare}
                onSelectDetails={onSelectDetails}
                onQuickInquire={onQuickInquire}
                t={t}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="py-16 px-6 text-center rounded-[9px] bg-[#e7e5e4] dark:bg-[#1c1b18] border border-[#dfdcd5] dark:border-[#2e2d28] max-w-xl mx-auto"
        >
          <div className="w-12 h-12 rounded-full bg-[#dfdcd5] dark:bg-[#282723] text-[#000000] dark:text-[#f5f5f3] flex items-center justify-center mx-auto mb-4 border border-[#dfdcd5] dark:border-[#2e2d28]">
            <Filter className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-2xl font-normal text-[#000000] dark:text-[#f5f5f3] mb-2">
            {t.noResultsTitle}
          </h3>
          <p className="text-sm text-[#595855] dark:text-[#a8a69e] leading-relaxed mb-6 font-sans">
            {t.noResultsHint}
          </p>
          <button
            onClick={() => {
              sound.tap()
              onResetFilters()
            }}
            className="btn-pill-ink dark:bg-[#f5f5f3] dark:text-[#0b0b0a] inline-flex items-center gap-2 tap-bounce cursor-pointer select-none"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#ffffff] dark:text-[#0b0b0a]" />
            <span>{t.searchReset}</span>
          </button>
        </motion.div>
      )}

    </section>
  )
}
