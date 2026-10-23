import React from 'react'
import { motion } from 'motion/react'
import { VenueCard } from './VenueCard'
import { GradientButton } from './kokonutui/GradientButton'
import { Scale, Heart, Sparkles, FilterX } from 'lucide-react'

export function VenueCatalog({
  venues,
  lang = 'en',
  t,
  shortlist,
  onToggleShortlist,
  compareList,
  onToggleCompare,
  onClearCompare,
  onOpenCompare,
  onOpenDetails,
  onOpenInquiry,
  onResetFilters
}) {
  return (
    <section className="relative py-12 px-4 max-w-7xl mx-auto" id="venues-catalog">
      {/* Section Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#dfc086] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#dfc086]" />
            <span>{t.catalogTitle}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#f7f3eb]">
            {lang === 'ar' ? 'القاعات المنتقاة في القاهرة الكبرى' : 'Curated Cairo Venues'}
          </h2>
          <p className="text-[#a89d91] text-sm mt-1 max-w-xl">
            {t.catalogSubtitle}
          </p>
        </div>

        {/* Shortlist Counter Badge */}
        {shortlist.length > 0 && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-rose-950/40 border border-rose-800/40 text-rose-300 text-xs self-start md:self-auto">
            <Heart className="w-3.5 h-3.5 fill-rose-300" />
            <span>
              {shortlist.length} {lang === 'ar' ? 'قاعات في مفضلتك' : 'venues in shortlist'}
            </span>
          </div>
        )}
      </div>

      {/* Floating Comparison Sticky Bar */}
      {compareList.length > 0 && (
        <div className="sticky top-20 z-40 mb-8 p-4 rounded-2xl bg-[#181512]/95 border border-[#dfc086]/35 backdrop-blur-xl shadow-2xl shadow-black/80 flex flex-wrap items-center justify-between gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#28211a] text-[#dfc086] border border-[#3d3227]">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#f7f3eb]">
                {compareList.length} / 3 {t.compareCount}
              </div>
              <div className="text-xs text-[#dfc086]/90">
                {compareList.length === 1
                  ? lang === 'ar'
                    ? 'حدد قاعة ثانية لمقارنة السعات والأسعار جنباً إلى جنب'
                    : 'Select at least 2 venues to compare side-by-side'
                  : lang === 'ar'
                  ? 'جاهز للمقارنة التفصيلية'
                  : 'Ready for side-by-side breakdown'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClearCompare}
              className="text-xs text-[#a89d91] hover:text-[#f7f3eb] px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              {t.clearCompare}
            </button>
            <GradientButton
              size="sm"
              variant="glow"
              onClick={onOpenCompare}
              disabled={compareList.length < 2}
            >
              {t.openCompare}
            </GradientButton>
          </div>
        </div>
      )}

      {/* Venues Grid with Motion Reveal */}
      {venues.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {venues.map((venue, index) => (
            <motion.div
              key={venue.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.25, 1, 0.5, 1]
              }}
            >
              <VenueCard
                venue={venue}
                lang={lang}
                t={t}
                isShortlisted={shortlist.includes(venue.id)}
                onToggleShortlist={onToggleShortlist}
                isCompared={compareList.includes(venue.id)}
                onToggleCompare={onToggleCompare}
                canCompare={compareList.length < 3}
                onOpenDetails={onOpenDetails}
                onOpenInquiry={onOpenInquiry}
              />
            </motion.div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="py-16 text-center bg-[#141211]/80 border border-[#27221e] rounded-3xl p-8 max-w-xl mx-auto shadow-xl">
          <FilterX className="w-12 h-12 text-[#524538] mx-auto mb-4" />
          <h3 className="text-lg font-serif font-bold text-[#fdfbf7] mb-2">
            {lang === 'ar' ? 'لا توجد نتائج مطابقة' : 'No Venues Found'}
          </h3>
          <p className="text-sm text-[#a89d91] mb-6">{t.noVenuesMatch}</p>
          <GradientButton variant="secondary" onClick={onResetFilters}>
            {t.resetFilters}
          </GradientButton>
        </div>
      )}
    </section>
  )
}
export default VenueCatalog
