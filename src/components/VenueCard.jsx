import React from 'react'
import { CardSpotlight } from './kokonutui/CardSpotlight'
import { GradientButton } from './kokonutui/GradientButton'
import { Heart, Users, MapPin, Sparkles, Check, Layers, ArrowUpRight } from 'lucide-react'

export function VenueCard({
  venue,
  lang = 'en',
  t,
  isShortlisted = false,
  onToggleShortlist,
  isCompared = false,
  onToggleCompare,
  canCompare = true,
  onOpenDetails,
  onOpenInquiry
}) {
  const maxCapacity = Math.max(...venue.spaces.map((s) => s.capacity))
  const startingRate = Math.min(...venue.packages.map((p) => p.price))

  return (
    <CardSpotlight className="group flex flex-col h-full bg-[#141211]/90 border border-[#27231f] hover:border-[#dfc086]/35 transition-all duration-300">
      {/* Cover Image Container */}
      <div className="relative h-56 w-full overflow-hidden rounded-t-2xl bg-stone-950">
        <img
          src={venue.coverPhoto}
          alt={lang === 'ar' ? venue.name.ar : venue.name.en}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Gradient Shadow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141211] via-[#141211]/30 to-transparent opacity-85" />

        {/* Top Badges & Actions */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between z-20">
          {/* Badge */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#141211]/90 backdrop-blur-md text-[#dfc086] border border-[#dfc086]/30 shadow-md">
            <Sparkles className="w-3 h-3 text-[#dfc086]" />
            <span>{lang === 'ar' ? venue.badge.ar : venue.badge.en}</span>
          </span>

          {/* Shortlist Heart Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onToggleShortlist(venue.id)
            }}
            title={isShortlisted ? t.savedToShortlist : t.saveToShortlist}
            className={`p-2 rounded-full backdrop-blur-md border transition-all duration-200 cursor-pointer ${
              isShortlisted
                ? 'bg-rose-500/20 border-rose-500/60 text-rose-300'
                : 'bg-[#141211]/80 border-[#2f2822] text-[#d6cebf] hover:text-rose-300 hover:bg-[#1f1b18]'
            }`}
          >
            <Heart className={`w-4 h-4 ${isShortlisted ? 'fill-rose-300' : ''}`} />
          </button>
        </div>

        {/* Bottom Price & Capacity Overlay */}
        <div className="absolute bottom-3 inset-x-3 flex items-end justify-between z-20">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#a89d91] font-medium block">
              {t.startingFrom}
            </span>
            <div className="text-xl font-bold font-serif text-[#faecd2]">
              {startingRate.toLocaleString()} <span className="text-xs font-sans text-[#b8ada0]">EGP</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#141211]/90 backdrop-blur-md border border-[#2b2520] text-xs text-[#ece6dc]">
            <Users className="w-3.5 h-3.5 text-[#dfc086]" />
            <span>
              {t.capacityUpTo} <strong>{maxCapacity}</strong> {t.guests}
            </span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Location & Rating */}
          <div className="flex items-center justify-between text-xs text-[#a89d91] mb-2">
            <span className="flex items-center gap-1 text-[#d6cebf]">
              <MapPin className="w-3.5 h-3.5 text-[#dfc086] shrink-0" />
              <span>{lang === 'ar' ? venue.address.ar : venue.address.en}</span>
            </span>
            <span className="flex items-center gap-1 text-[#dfc086] font-medium">
              ★ {venue.rating} <span className="text-[#84796e]">({venue.reviewsCount})</span>
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-serif font-bold text-[#f7f3eb] mb-2 group-hover:text-[#faecd2] transition-colors">
            {lang === 'ar' ? venue.name.ar : venue.name.en}
          </h3>

          {/* Description */}
          <p className="text-xs text-[#b8ada0] line-clamp-2 leading-relaxed mb-4">
            {lang === 'ar' ? venue.summary.ar : venue.summary.en}
          </p>

          {/* Spaces Preview Chips */}
          <div className="space-y-1.5 mb-5 pt-3 border-t border-[#26211c]">
            <div className="flex items-center justify-between text-[11px] text-[#a89d91] uppercase tracking-wider font-semibold">
              <span className="flex items-center gap-1">
                <Layers className="w-3 h-3 text-[#dfc086]" />
                <span>{venue.spaces.length} {t.spacesCount}</span>
              </span>
              <span>{venue.packages.length} {t.packagesTab}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {venue.spaces.map((space) => (
                <span
                  key={space.id}
                  className="inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-md bg-[#191614] border border-[#2b2520] text-[#ded6cb]"
                >
                  <span>{lang === 'ar' ? space.name.ar : space.name.en}</span>
                  <span className="text-[#dfc086] font-mono">({space.capacity})</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="space-y-3 pt-3 border-t border-stone-800/80">
          <div className="grid grid-cols-2 gap-2">
            <GradientButton
              size="sm"
              variant="secondary"
              onClick={() => onOpenDetails(venue)}
              icon={ArrowUpRight}
              iconPosition="right"
              className="w-full text-xs"
            >
              {t.viewDetails}
            </GradientButton>

            <GradientButton
              size="sm"
              variant="primary"
              onClick={() => onOpenInquiry(venue)}
              className="w-full text-xs"
            >
              {t.inquireNow}
            </GradientButton>
          </div>

          {/* Compare Checkbox */}
          <label className="flex items-center justify-center gap-2 text-xs text-[#a89d91] hover:text-[#fdfbf7] cursor-pointer select-none py-1 transition-colors">
            <input
              type="checkbox"
              checked={isCompared}
              disabled={!isCompared && !canCompare}
              onChange={() => onToggleCompare(venue.id)}
              className="w-4 h-4 rounded border-[#3a332c] bg-[#141211] text-[#dfc086] accent-[#dfc086] focus:ring-[#dfc086]/40 focus:ring-offset-0 cursor-pointer disabled:opacity-40"
            />
            <span className={isCompared ? 'text-[#dfc086] font-semibold' : ''}>
              {isCompared ? (lang === 'ar' ? 'محدد للمقارنة ✓' : 'Selected for Comparison ✓') : t.addToCompare}
            </span>
          </label>
        </div>
      </div>
    </CardSpotlight>
  )
}
export default VenueCard
