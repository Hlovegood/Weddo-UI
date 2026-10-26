import React from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, Scale, Trash2, ArrowUpRight, MapPin, Users, Star } from 'lucide-react'
import { formatEGP } from '../lib/utils'

export function CompareDrawer({
  compareIds,
  venues,
  isOpen,
  onClose,
  onRemoveFromCompare,
  onClearCompare,
  onOpenInquiry,
  lang,
  t
}) {
  if (!isOpen) return null

  const selectedVenues = venues.filter(v => compareIds.includes(v.id))

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-end sm:items-center justify-center p-0 sm:p-4">
      
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-[#000000]/70 backdrop-blur-xs transition-opacity" 
      />

      {/* Drawer Surface per Design.md: Bone #e7e5e4, 9px radius, hairline #dfdcd5 */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-[1100px] rounded-t-[9px] sm:rounded-[9px] bg-[#e7e5e4] dark:bg-[#1c1b18] border border-[#dfdcd5] dark:border-[#2e2d28] overflow-hidden z-10 flex flex-col max-h-[90vh] shadow-2xl text-[#000000] dark:text-[#f5f5f3]"
      >
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-[#dfdcd5] dark:border-[#2e2d28] flex items-center justify-between shrink-0 bg-[#ebebeb] dark:bg-[#141412]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-[#dfdcd5] dark:bg-[#282723] text-[#000000] dark:text-[#f5f5f3]">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-normal text-[#000000] dark:text-[#f5f5f3]">
                {t.compareTitle}
              </h3>
              <p className="text-xs font-mono text-[#595855] dark:text-[#a8a69e] uppercase">
                {t.compareMax} ({selectedVenues.length}/3)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {selectedVenues.length > 0 && (
              <button
                onClick={onClearCompare}
                className="flex items-center gap-1.5 px-3 py-1 rounded-[28.8px] border border-[#dfdcd5] dark:border-[#2e2d28] bg-[#e7e5e4] dark:bg-[#1c1b18] text-xs font-mono uppercase text-[#595855] dark:text-[#a8a69e] hover:text-[#000000] dark:hover:text-[#f5f5f3] hover:bg-[#dfdcd5] dark:hover:bg-[#282723] transition-all cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{t.compareClear}</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-[#595855] dark:text-[#a8a69e] hover:bg-[#dfdcd5] dark:hover:bg-[#282723] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {selectedVenues.length === 0 ? (
            <div className="py-16 text-center text-xs font-mono text-[#595855] dark:text-[#a8a69e]">
              {lang === 'ar' ? 'لم تقم بتحديد أي قاعات للمقارنة بعد.' : 'No venues added to comparison yet.'}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {selectedVenues.map(venue => {
                const name = venue.name[lang] || venue.name.en
                const address = venue.address?.[lang] || venue.address?.en
                const lowestPrice = venue.packages?.reduce((min, p) => p.price < min ? p.price : min, venue.packages[0]?.price || 0)
                const maxCap = venue.spaces?.reduce((max, s) => s.capacity > max ? s.capacity : max, 0)

                return (
                  <div 
                    key={venue.id}
                    className="p-4 rounded-[9px] bg-[#ebebeb] dark:bg-[#141412] border border-[#dfdcd5] dark:border-[#2e2d28] flex flex-col justify-between hover:border-[#000000] dark:hover:border-[#f5f5f3] transition-all"
                  >
                    <div>
                      <div className="relative aspect-[16/10] rounded-[6px] overflow-hidden mb-3 bg-[#000000]">
                        <img
                          src={venue.coverPhoto}
                          alt={name}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => onRemoveFromCompare(venue.id)}
                          className="tap-bounce absolute top-2 right-2 p-1.5 rounded-full bg-[#000000]/70 text-[#ffffff] hover:bg-[#000000] transition-colors cursor-pointer"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>

                      <h4 className="font-serif text-lg font-normal text-[#000000] dark:text-[#f5f5f3] line-clamp-1 mb-1">
                        {name}
                      </h4>

                      <div className="flex items-center gap-1.5 text-xs text-[#595855] dark:text-[#a8a69e] mb-3 font-sans">
                        <MapPin className="w-3.5 h-3.5 text-[#000000] dark:text-[#f5f5f3]" />
                        <span className="truncate">{address}</span>
                      </div>

                      <div className="space-y-2 pt-3 border-t border-[#dfdcd5] dark:border-[#2e2d28] text-xs font-sans">
                        <div className="flex justify-between">
                          <span className="text-[#595855] dark:text-[#a8a69e]">{t.compareStartingPrice}</span>
                          <span className="text-[#000000] dark:text-[#f5f5f3] font-mono font-semibold">{formatEGP(lowestPrice, lang)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#595855] dark:text-[#a8a69e]">{t.capacityUpTo}</span>
                          <span className="text-[#000000] dark:text-[#f5f5f3] font-mono">{maxCap} {t.guestsLabel}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#595855] dark:text-[#a8a69e]">{t.compareSpaces}</span>
                          <span className="text-[#000000] dark:text-[#f5f5f3] font-mono">{venue.spaces?.length} Spaces</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#595855] dark:text-[#a8a69e]">{t.compareRating}</span>
                          <span className="text-[#000000] dark:text-[#f5f5f3] font-mono">★ {venue.rating} ({venue.reviewsCount})</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 mt-3 border-t border-[#dfdcd5] dark:border-[#2e2d28]">
                      <button
                        onClick={() => {
                          onClose()
                          onOpenInquiry(venue)
                        }}
                        className="btn-pill-ink dark:bg-[#f5f5f3] dark:text-[#0b0b0a] w-full flex items-center justify-center gap-1.5 tap-bounce cursor-pointer text-xs"
                      >
                        <span>{t.quickInquire}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#ffffff] dark:text-[#0b0b0a]" />
                      </button>
                    </div>

                  </div>
                )
              })}
            </div>
          )}
        </div>

      </motion.div>

    </div>
  )
}
