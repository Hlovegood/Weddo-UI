import React from 'react'
import { cairoAreas, guestBands, venueTypes } from '../data/venues'
import { GradientButton } from './kokonutui/GradientButton'
import { MapPin, Calendar, Users, Building, Search, X } from 'lucide-react'

export function SearchCockpit({
  lang = 'en',
  t,
  filters,
  setFilters,
  onReset
}) {
  const isFiltered =
    filters.area !== 'all' ||
    filters.guests !== 'all' ||
    filters.type !== 'all' ||
    Boolean(filters.date)

  return (
    <div className="relative z-30 max-w-5xl mx-auto px-4 -mt-4 mb-16">
      <div className="bg-[#151312]/95 border border-[#2a241f] rounded-2xl p-4 sm:p-6 shadow-2xl shadow-black/80 backdrop-blur-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Cairo Area Select */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#dfc086]">
              <MapPin className="w-3.5 h-3.5 text-[#dfc086]" />
              <span>{t.searchAreaLabel}</span>
            </label>
            <select
              value={filters.area}
              onChange={(e) => setFilters((prev) => ({ ...prev, area: e.target.value }))}
              className="w-full bg-[#0e0d0c]/90 border border-[#2c2621] rounded-xl px-3.5 py-2.5 text-sm text-[#f2ede6] focus:outline-none focus:border-[#dfc086]/70 focus:ring-1 focus:ring-[#dfc086]/40 transition-colors"
            >
              {cairoAreas.map((area) => (
                <option key={area.id} value={area.id}>
                  {lang === 'ar' ? area.name.ar : area.name.en}
                </option>
              ))}
            </select>
          </div>

          {/* Event Date Picker */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#dfc086]">
              <Calendar className="w-3.5 h-3.5 text-[#dfc086]" />
              <span>{t.searchDateLabel}</span>
            </label>
            <input
              type="date"
              value={filters.date}
              min="2026-10-01"
              max="2028-12-31"
              onChange={(e) => setFilters((prev) => ({ ...prev, date: e.target.value }))}
              className="w-full bg-[#0e0d0c]/90 border border-[#2c2621] rounded-xl px-3.5 py-2.5 text-sm text-[#f2ede6] focus:outline-none focus:border-[#dfc086]/70 focus:ring-1 focus:ring-[#dfc086]/40 transition-colors"
            />
          </div>

          {/* Guest Count Band */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#dfc086]">
              <Users className="w-3.5 h-3.5 text-[#dfc086]" />
              <span>{t.searchGuestsLabel}</span>
            </label>
            <select
              value={filters.guests}
              onChange={(e) => setFilters((prev) => ({ ...prev, guests: e.target.value }))}
              className="w-full bg-[#0e0d0c]/90 border border-[#2c2621] rounded-xl px-3.5 py-2.5 text-sm text-[#f2ede6] focus:outline-none focus:border-[#dfc086]/70 focus:ring-1 focus:ring-[#dfc086]/40 transition-colors"
            >
              {guestBands.map((band) => (
                <option key={band.id} value={band.id}>
                  {lang === 'ar' ? band.label.ar : band.label.en}
                </option>
              ))}
            </select>
          </div>

          {/* Venue Style */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#dfc086]">
              <Building className="w-3.5 h-3.5 text-[#dfc086]" />
              <span>{t.searchTypeLabel}</span>
            </label>
            <select
              value={filters.type}
              onChange={(e) => setFilters((prev) => ({ ...prev, type: e.target.value }))}
              className="w-full bg-[#0e0d0c]/90 border border-[#2c2621] rounded-xl px-3.5 py-2.5 text-sm text-[#f2ede6] focus:outline-none focus:border-[#dfc086]/70 focus:ring-1 focus:ring-[#dfc086]/40 transition-colors"
            >
              {venueTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {lang === 'ar' ? type.label.ar : type.label.en}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Controls & Active Filter Badges */}
        <div className="mt-5 pt-4 border-t border-stone-800/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-stone-400">
            <span>
              {lang === 'ar'
                ? 'يتم استبعاد التواريخ المحظورة مسبقاً من القاعات تلقائياً.'
                : 'Blocked dates and paused spaces are automatically excluded from catalog.'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {isFiltered && (
              <button
                type="button"
                onClick={onReset}
                className="flex items-center gap-1 text-xs text-[#a89d91] hover:text-[#dfc086] transition-colors cursor-pointer px-2 py-1 rounded"
              >
                <X className="w-3.5 h-3.5" />
                <span>{t.resetFilters}</span>
              </button>
            )}

            <GradientButton
              size="sm"
              variant="primary"
              icon={Search}
              onClick={() => {
                const catalogEl = document.getElementById('venues-catalog')
                if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              {t.searchButton}
            </GradientButton>
          </div>
        </div>
      </div>
    </div>
  )
}
export default SearchCockpit
