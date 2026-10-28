import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { 
  MapPin, 
  Calendar, 
  Users, 
  DollarSign, 
  Sparkles, 
  RotateCcw, 
  Search, 
  ChevronDown, 
  SlidersHorizontal,
  Check
} from 'lucide-react'
import { cairoAreas, eventTypes, guestBands } from '../data/venues'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { formatEGP } from '@/lib/utils'
import { sound } from '@/lib/sound'

export function SearchCockpit({
  filters,
  setFilters,
  onReset,
  lang,
  t
}) {
  const [usePrecisionSliders, setUsePrecisionSliders] = useState(false)
  const [sliderGuests, setSliderGuests] = useState(250)
  const [sliderBudget, setSliderBudget] = useState(220000)

  const budgetOptions = [
    { id: 'all', label: t.anyBudget },
    { id: 'under150k', label: t.budgetUpTo150k },
    { id: '150k-300k', label: t.budget150kTo300k },
    { id: 'above300k', label: t.budgetAbove300k },
  ]

  const handleApplySearch = () => {
    sound.success()
    const el = document.getElementById('venues-catalog')
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleGuestSliderChange = (vals) => {
    const val = vals[0]
    setSliderGuests(val)
    sound.tap()
    // Map slider value to preset band for catalog compatibility
    let band = 'all'
    if (val <= 120) band = 'intimate'
    else if (val <= 280) band = 'medium'
    else if (val <= 600) band = 'grand'
    else band = 'royal'
    setFilters(prev => ({ ...prev, guests: band, customGuests: val }))
  }

  const handleBudgetSliderChange = (vals) => {
    const val = vals[0]
    setSliderBudget(val)
    sound.tap()
    let band = 'all'
    if (val <= 150000) band = 'under150k'
    else if (val <= 300000) band = '150k-300k'
    else band = 'above300k'
    setFilters(prev => ({ ...prev, budget: band, customBudget: val }))
  }

  return (
    <div className="w-full max-w-[1140px] mx-auto rounded-3xl bg-[#e7e5e4]/95 dark:bg-[#1c1b18]/95 backdrop-blur-xl p-6 sm:p-7 relative text-[#000000] dark:text-[#f5f5f3] transition-colors">
      
      {/* Header bar of Cockpit with mode toggle */}
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#dfdcd5] dark:border-[#2e2d28]">
        <div className="flex items-center gap-2">
          <Badge variant="default" className="text-[10px] uppercase font-mono tracking-wider dark:bg-[#f5f5f3] dark:text-[#0b0b0a]">
            {lang === 'ar' ? 'البحث الذكي' : 'Intelligent Search'}
          </Badge>
          <span className="text-xs text-[#595855] dark:text-[#a8a69e] hidden sm:inline">
            {lang === 'ar' ? 'حدد معايير الفرح للحصول على المتاح فوراً' : 'Filter by capacity, budget & heritage location'}
          </span>
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => {
                sound.tap()
                setUsePrecisionSliders(!usePrecisionSliders)
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border border-[#dfdcd5] dark:border-[#2e2d28] bg-white dark:bg-[#282723] text-[#000000] dark:text-[#f5f5f3] hover:bg-[#dfdcd5]/40 dark:hover:bg-[#34332e] transition-colors cursor-pointer select-none"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#000000] dark:text-[#f5f5f3]" />
              <span>{usePrecisionSliders ? (lang === 'ar' ? 'الوضع المجدول' : 'Preset Dropdowns') : (lang === 'ar' ? 'منزلقات تفاعلية' : 'Precision Sliders')}</span>
            </button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>{usePrecisionSliders ? 'Switch to dropdown selectors' : 'Switch to interactive direct-manipulation sliders'}</p>
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* 1. Area / Region Selector */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-[11px] font-mono tracking-wider uppercase text-[#595855] dark:text-[#a8a69e] flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#000000] dark:text-[#f5f5f3]" />
            <span>{t.searchArea}</span>
          </label>
          <div className="relative">
            <select
              value={filters.area}
              onChange={(e) => {
                sound.tap()
                setFilters(prev => ({ ...prev, area: e.target.value }))
              }}
              className="w-full h-12 sm:h-11 px-3 text-base sm:text-[13px] font-medium rounded-[6px] bg-[#ffffff] dark:bg-[#282723] text-[#000000] dark:text-[#f5f5f3] border border-[#dfdcd5] dark:border-[#2e2d28] focus:outline-none focus:border-[#000000] dark:focus:border-[#f5f5f3] transition-colors appearance-none cursor-pointer"
            >
              {cairoAreas.map(area => (
                <option key={area.id} value={area.id} className="dark:bg-[#1c1b18] dark:text-[#f5f5f3]">
                  {area.name[lang] || area.name.en}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-3 rtl:right-auto rtl:left-3 flex items-center pointer-events-none text-xs text-[#595855] dark:text-[#a8a69e]">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* 2. Event Category */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-[11px] font-mono tracking-wider uppercase text-[#595855] dark:text-[#a8a69e] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#000000] dark:text-[#f5f5f3]" />
            <span>{t.searchCategory}</span>
          </label>
          <div className="relative">
            <select
              value={filters.category}
              onChange={(e) => {
                sound.tap()
                setFilters(prev => ({ ...prev, category: e.target.value }))
              }}
              className="w-full h-12 sm:h-11 px-3 text-base sm:text-[13px] font-medium rounded-[6px] bg-[#ffffff] dark:bg-[#282723] text-[#000000] dark:text-[#f5f5f3] border border-[#dfdcd5] dark:border-[#2e2d28] focus:outline-none focus:border-[#000000] dark:focus:border-[#f5f5f3] transition-colors appearance-none cursor-pointer"
            >
              {eventTypes.map(type => (
                <option key={type.id} value={type.id} className="dark:bg-[#1c1b18] dark:text-[#f5f5f3]">
                  {type.label[lang] || type.label.en}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-3 rtl:right-auto rtl:left-3 flex items-center pointer-events-none text-xs text-[#595855] dark:text-[#a8a69e]">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* 3. Date Selector */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-[11px] font-mono tracking-wider uppercase text-[#595855] dark:text-[#a8a69e] flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#000000] dark:text-[#f5f5f3]" />
            <span>{t.searchDate}</span>
          </label>
          <input
            type="date"
            value={filters.date}
            onChange={(e) => {
              sound.tap()
              setFilters(prev => ({ ...prev, date: e.target.value }))
            }}
            className="w-full h-12 sm:h-11 px-3 text-base sm:text-[13px] font-medium rounded-[6px] bg-[#ffffff] dark:bg-[#282723] text-[#000000] dark:text-[#f5f5f3] border border-[#dfdcd5] dark:border-[#2e2d28] focus:outline-none focus:border-[#000000] dark:focus:border-[#f5f5f3] transition-colors cursor-pointer"
          />
        </div>

        {/* 4. Guest Count (Dropdown or Interactive Slider) */}
        <div className="flex flex-col space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-mono tracking-wider uppercase text-[#595855] dark:text-[#a8a69e] flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#000000] dark:text-[#f5f5f3]" />
              <span>{t.searchGuests}</span>
            </label>
            {usePrecisionSliders && (
              <span className="text-[11px] font-bold font-mono text-[#000000] dark:text-[#f5f5f3] bg-white dark:bg-[#282723] px-2 py-0.5 rounded border border-[#dfdcd5] dark:border-[#2e2d28]">
                {sliderGuests} {lang === 'ar' ? 'ضيف' : 'guests'}
              </span>
            )}
          </div>

          {usePrecisionSliders ? (
            <div className="h-12 sm:h-11 px-3 bg-white dark:bg-[#282723] rounded-[6px] border border-[#dfdcd5] dark:border-[#2e2d28] flex flex-col justify-center">
              <Slider
                value={[sliderGuests]}
                min={50}
                max={750}
                step={25}
                onValueChange={handleGuestSliderChange}
              />
            </div>
          ) : (
            <div className="relative">
              <select
                value={filters.guests}
                onChange={(e) => {
                  sound.tap()
                  setFilters(prev => ({ ...prev, guests: e.target.value }))
                }}
                className="w-full h-12 sm:h-11 px-3 text-base sm:text-[13px] font-medium rounded-[6px] bg-[#ffffff] dark:bg-[#282723] text-[#000000] dark:text-[#f5f5f3] border border-[#dfdcd5] dark:border-[#2e2d28] focus:outline-none focus:border-[#000000] dark:focus:border-[#f5f5f3] transition-colors appearance-none cursor-pointer"
              >
                {guestBands.map(band => (
                  <option key={band.id} value={band.id} className="dark:bg-[#1c1b18] dark:text-[#f5f5f3]">
                    {band.label[lang] || band.label.en}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-3 rtl:right-auto rtl:left-3 flex items-center pointer-events-none text-xs text-[#595855] dark:text-[#a8a69e]">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          )}
        </div>

        {/* 5. Budget (Dropdown or Interactive Slider) */}
        <div className="flex flex-col space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-mono tracking-wider uppercase text-[#595855] dark:text-[#a8a69e] flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-[#000000] dark:text-[#f5f5f3]" />
              <span>{t.searchBudget}</span>
            </label>
            {usePrecisionSliders && (
              <span className="text-[11px] font-bold font-mono text-[#000000] dark:text-[#f5f5f3] bg-white dark:bg-[#282723] px-2 py-0.5 rounded border border-[#dfdcd5] dark:border-[#2e2d28]">
                {formatEGP(sliderBudget, lang)}
              </span>
            )}
          </div>

          {usePrecisionSliders ? (
            <div className="h-12 sm:h-11 px-3 bg-white dark:bg-[#282723] rounded-[6px] border border-[#dfdcd5] dark:border-[#2e2d28] flex flex-col justify-center">
              <Slider
                value={[sliderBudget]}
                min={50000}
                max={500000}
                step={10000}
                onValueChange={handleBudgetSliderChange}
              />
            </div>
          ) : (
            <div className="relative">
              <select
                value={filters.budget}
                onChange={(e) => {
                  sound.tap()
                  setFilters(prev => ({ ...prev, budget: e.target.value }))
                }}
                className="w-full h-12 sm:h-11 px-3 text-base sm:text-[13px] font-medium rounded-[6px] bg-[#ffffff] dark:bg-[#282723] text-[#000000] dark:text-[#f5f5f3] border border-[#dfdcd5] dark:border-[#2e2d28] focus:outline-none focus:border-[#000000] dark:focus:border-[#f5f5f3] transition-colors appearance-none cursor-pointer"
              >
                {budgetOptions.map(opt => (
                  <option key={opt.id} value={opt.id} className="dark:bg-[#1c1b18] dark:text-[#f5f5f3]">
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-3 rtl:right-auto rtl:left-3 flex items-center pointer-events-none text-xs text-[#595855] dark:text-[#a8a69e]">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Cockpit Sub-strip with live status, reset and search CTA */}
      <div className="mt-5 pt-4 border-t border-[#dfdcd5] dark:border-[#2e2d28] flex flex-wrap items-center justify-between gap-3 text-xs text-[#595855] dark:text-[#a8a69e]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#000000] dark:bg-[#f5f5f3] animate-pulse" />
          <span className="font-mono text-[11px] uppercase tracking-wider">{t.dateNote}</span>
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => {
              sound.tap()
              onReset()
            }}
            className="tap-bounce flex items-center gap-1.5 text-xs font-medium text-[#595855] dark:text-[#a8a69e] hover:text-[#000000] dark:hover:text-[#f5f5f3] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.searchReset}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleApplySearch}
            className="tap-bounce btn-pill-ink dark:bg-[#f5f5f3] dark:text-[#0b0b0a] min-h-[44px] px-5 flex items-center justify-center gap-2 shadow-sm cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-[#ffffff] dark:text-[#0b0b0a]" />
            <span>{t.searchAction}</span>
          </motion.button>
        </div>
      </div>
    </div>
  )
}
