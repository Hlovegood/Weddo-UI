import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { 
  X, 
  MapPin, 
  Star, 
  Users, 
  Sparkles, 
  Check, 
  Send,
  Calendar,
  Building2,
  CheckCircle2,
  Clock
} from 'lucide-react'
import { formatEGP } from '../lib/utils'

export function VenueDetailsModal({
  venue,
  isOpen,
  onClose,
  onOpenInquiry,
  lang,
  t
}) {
  if (!isOpen || !venue) return null

  const [activeTab, setActiveTab] = useState('spaces')
  const [selectedSpaceId, setSelectedSpaceId] = useState(venue.spaces?.[0]?.id || '')
  const [selectedPackageId, setSelectedPackageId] = useState(venue.packages?.[0]?.id || '')

  const name = venue.name[lang] || venue.name.en
  const summary = venue.summary[lang] || venue.summary.en
  const address = venue.address?.[lang] || venue.address?.en
  const badge = venue.badge?.[lang] || venue.badge?.en

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 lg:p-8">
      
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-[#000000]/75 backdrop-blur-xs transition-opacity" 
      />

      {/* Modal Dialog Card per Design.md: Bone #e7e5e4, 9px radius, hairline #dfdcd5 */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-4xl rounded-[9px] bg-[#e7e5e4] dark:bg-[#1c1b18] border border-[#dfdcd5] dark:border-[#2e2d28] overflow-hidden z-10 flex flex-col max-h-[90vh] shadow-2xl text-[#000000] dark:text-[#f5f5f3]"
      >
        
        {/* Cover Photo Banner */}
        <div className="relative aspect-[16/7] w-full overflow-hidden bg-[#c4c3b6] dark:bg-[#121210] shrink-0">
          <img
            src={venue.coverPhoto}
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/85 via-[#000000]/30 to-transparent" />

          {/* Close Pill Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="tap-bounce absolute top-4 right-4 p-2 rounded-full bg-[#000000]/70 hover:bg-[#000000] text-[#ffffff] transition-colors z-20 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </motion.button>

          {/* Title on Image */}
          <div className="absolute bottom-5 inset-x-6 text-[#ffffff] z-10">
            {badge && (
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-[28.8px] bg-[#ffffff] text-[#000000] text-[11px] font-mono tracking-wider uppercase mb-2">
                <Sparkles className="w-3 h-3 text-[#000000]" />
                <span>{badge}</span>
              </span>
            )}
            <h2 className="font-serif text-2xl sm:text-4xl font-normal tracking-[-0.03em] leading-tight text-[#ffffff]">
              {name}
            </h2>
            <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-[#dfdcd5] font-mono">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#ffffff]" />
                <span>{address}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-[#ffffff]">
                <Star className="w-3.5 h-3.5 fill-[#ffffff]" />
                <span>{venue.rating} ({venue.reviewsCount} reviews)</span>
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs Pill Bar */}
        <div className="flex items-center border-b border-[#dfdcd5] dark:border-[#2e2d28] px-6 bg-[#ebebeb] dark:bg-[#141412] shrink-0">
          <button
            onClick={() => setActiveTab('spaces')}
            className={`py-3 px-4 text-xs font-mono uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
              activeTab === 'spaces'
                ? 'border-[#000000] dark:border-[#f5f5f3] text-[#000000] dark:text-[#f5f5f3] font-semibold'
                : 'border-transparent text-[#595855] dark:text-[#a8a69e] hover:text-[#000000] dark:hover:text-[#f5f5f3]'
            }`}
          >
            {t.spacesTitle}
          </button>
          <button
            onClick={() => setActiveTab('packages')}
            className={`py-3 px-4 text-xs font-mono uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
              activeTab === 'packages'
                ? 'border-[#000000] dark:border-[#f5f5f3] text-[#000000] dark:text-[#f5f5f3] font-semibold'
                : 'border-transparent text-[#595855] dark:text-[#a8a69e] hover:text-[#000000] dark:hover:text-[#f5f5f3]'
            }`}
          >
            {t.packagesTitle}
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            className={`py-3 px-4 text-xs font-mono uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
              activeTab === 'calendar'
                ? 'border-[#000000] dark:border-[#f5f5f3] text-[#000000] dark:text-[#f5f5f3] font-semibold'
                : 'border-transparent text-[#595855] dark:text-[#a8a69e] hover:text-[#000000] dark:hover:text-[#f5f5f3]'
            }`}
          >
            {t.checkAvailability}
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          <div className="p-4 rounded-[9px] bg-[#ebebeb] dark:bg-[#282723]/60 border border-[#dfdcd5] dark:border-[#2e2d28] text-xs sm:text-sm text-[#595855] dark:text-[#a8a69e] leading-relaxed font-sans">
            {summary}
          </div>

          {/* TAB 1: Named Spaces */}
          {activeTab === 'spaces' && (
            <div className="space-y-4">
              {venue.spaces?.map(space => {
                const spaceName = space.name[lang] || space.name.en
                const spaceType = space.type[lang] || space.type.en
                const spaceDesc = space.description?.[lang] || space.description?.en
                const isSelected = selectedSpaceId === space.id

                return (
                  <motion.div
                    key={space.id}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setSelectedSpaceId(space.id)}
                    className={`tap-bounce cursor-pointer p-4 sm:p-5 rounded-[9px] border transition-all ${
                      isSelected
                        ? 'border-[#000000] dark:border-[#f5f5f3] bg-[#ffffff] dark:bg-[#282723] shadow-sm'
                        : 'border-[#dfdcd5] dark:border-[#2e2d28] bg-[#ebebeb] dark:bg-[#1c1b18] hover:border-[#000000] dark:hover:border-[#f5f5f3]'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                      <div>
                        <h4 className="font-serif text-lg font-normal text-[#000000] dark:text-[#f5f5f3]">
                          {spaceName}
                        </h4>
                        <span className="text-xs text-[#595855] dark:text-[#a8a69e] font-sans">
                          {spaceType}
                        </span>
                      </div>

                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[28.8px] bg-[#dfdcd5] dark:bg-[#282723] text-xs font-mono text-[#000000] dark:text-[#f5f5f3] border border-[#dfdcd5] dark:border-[#2e2d28]">
                        <Users className="w-3.5 h-3.5 text-[#000000] dark:text-[#f5f5f3]" />
                        <span>{t.capacityUpTo} {space.capacity} {t.guestsLabel}</span>
                      </div>
                    </div>

                    <p className="text-xs text-[#595855] dark:text-[#a8a69e] leading-relaxed mb-3 font-sans">
                      {spaceDesc}
                    </p>

                    {space.facilities && (
                      <div className="flex flex-wrap gap-1.5">
                        {space.facilities.map((fac, idx) => (
                          <span 
                            key={idx}
                            className="px-2.5 py-0.5 rounded-[28.8px] bg-[#dfdcd5] dark:bg-[#282723] text-[11px] font-sans text-[#000000] dark:text-[#f5f5f3] border border-[#dfdcd5] dark:border-[#2e2d28]"
                          >
                            ✓ {fac}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>
          )}

          {/* TAB 2: Packages */}
          {activeTab === 'packages' && (
            <div className="space-y-4">
              {venue.packages?.map(pkg => {
                const pkgName = pkg.name[lang] || pkg.name.en
                const isSelected = selectedPackageId === pkg.id

                return (
                  <motion.div
                    key={pkg.id}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setSelectedPackageId(pkg.id)}
                    className={`tap-bounce cursor-pointer p-4 sm:p-5 rounded-[9px] border transition-all ${
                      isSelected
                        ? 'border-[#000000] dark:border-[#f5f5f3] bg-[#ffffff] dark:bg-[#282723] shadow-sm'
                        : 'border-[#dfdcd5] dark:border-[#2e2d28] bg-[#ebebeb] dark:bg-[#1c1b18] hover:border-[#000000] dark:hover:border-[#f5f5f3]'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div>
                        <h4 className="font-serif text-lg font-normal text-[#000000] dark:text-[#f5f5f3]">
                          {pkgName}
                        </h4>
                        <span className="text-[12px] text-[#595855] dark:text-[#a8a69e] font-sans">
                          {lang === 'ar' ? 'سعر إرشادي شامل لكل مناسبة' : 'Turnkey guide price per event'}
                        </span>
                      </div>

                      <div className="font-serif text-xl font-normal text-[#000000] dark:text-[#f5f5f3]">
                        {formatEGP(pkg.price, lang)}
                      </div>
                    </div>

                    <ul className="space-y-2 mt-4 pt-3 border-t border-[#dfdcd5] dark:border-[#2e2d28]">
                      {pkg.inclusions?.map((inc, i) => {
                        const incText = inc[lang] || inc.en
                        return (
                          <li key={i} className="flex items-center gap-2 text-xs text-[#000000] dark:text-[#f5f5f3] font-sans">
                            <div className="w-4 h-4 rounded-full bg-[#000000] dark:bg-[#f5f5f3] text-[#ffffff] dark:text-[#0b0b0a] flex items-center justify-center shrink-0">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </div>
                            <span>{incText}</span>
                          </li>
                        )
                      })}
                    </ul>
                  </motion.div>
                )
              })}
            </div>
          )}

          {/* TAB 3: Calendar */}
          {activeTab === 'calendar' && (
            <div className="space-y-4">
              <div className="p-4 rounded-[9px] bg-[#ebebeb] dark:bg-[#282723]/60 border border-[#dfdcd5] dark:border-[#2e2d28] text-[#595855] dark:text-[#a8a69e] text-xs leading-relaxed font-mono">
                ℹ️ {lang === 'ar' 
                  ? 'ملاحظة: المواعيد غير المحظورة تظهر كـ "إتاحة غير مؤكدة" وتتطلب موافقة رسمية من القاعة.'
                  : 'Policy Note: Unblocked dates have unknown availability and require venue confirmation.'}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {['2026-11-14', '2026-11-20', '2026-12-05', '2026-12-18', '2027-01-15', '2027-02-12', '2027-03-05', '2027-04-20'].map((dateStr, i) => {
                  const isBlocked = i === 1
                  return (
                    <div
                      key={dateStr}
                      className={`p-3 rounded-[9px] border text-center text-xs ${
                        isBlocked
                          ? 'bg-[#dfdcd5] dark:bg-[#282723] border-[#595855] text-[#595855] dark:text-[#a8a69e] line-through'
                          : 'bg-[#ffffff] dark:bg-[#1c1b18] border-[#dfdcd5] dark:border-[#2e2d28] text-[#000000] dark:text-[#f5f5f3]'
                      }`}
                    >
                      <div className="font-mono font-medium">{dateStr}</div>
                      <div className="text-[10px] mt-1 text-[#595855] dark:text-[#a8a69e] uppercase font-mono">
                        {isBlocked ? 'Reserved' : 'Open'}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-[#dfdcd5] dark:border-[#2e2d28] bg-[#ebebeb] dark:bg-[#141412] flex items-center justify-between gap-4 shrink-0">
          <div className="hidden sm:flex flex-col text-xs text-[#595855] dark:text-[#a8a69e] font-mono">
            <span>{t.inquirySpace}: <strong className="text-[#000000] dark:text-[#f5f5f3] font-semibold">{selectedSpaceId || 'Default'}</strong></span>
            <span>{t.inquiryPackage}: <strong className="text-[#000000] dark:text-[#f5f5f3] font-semibold">{selectedPackageId || 'Default'}</strong></span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-[28.8px] border border-[#dfdcd5] dark:border-[#2e2d28] bg-[#e7e5e4] dark:bg-[#1c1b18] text-xs font-sans text-[#000000] dark:text-[#f5f5f3] hover:bg-[#dfdcd5] dark:hover:bg-[#282723] cursor-pointer"
            >
              {t.modalClose}
            </button>

            <button
              onClick={() => {
                onClose()
                onOpenInquiry(venue, selectedSpaceId, selectedPackageId)
              }}
              className="btn-pill-ink dark:bg-[#f5f5f3] dark:text-[#0b0b0a] inline-flex items-center gap-2 tap-bounce cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 text-[#ffffff] dark:text-[#0b0b0a]" />
              <span>{t.quickInquire}</span>
            </button>
          </div>
        </div>

      </motion.div>

    </div>
  )
}
