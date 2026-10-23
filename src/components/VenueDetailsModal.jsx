import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { GradientButton } from './kokonutui/GradientButton'
import { X, Users, MapPin, Sparkles, Check, Layers, ShieldCheck, Heart, Send } from 'lucide-react'

export function VenueDetailsModal({
  venue,
  isOpen,
  onClose,
  lang = 'en',
  t,
  onOpenInquiry,
  isShortlisted,
  onToggleShortlist
}) {
  const [activeTab, setActiveTab] = useState('spaces') // 'spaces' | 'packages' | 'amenities'
  const [selectedSpaceId, setSelectedSpaceId] = useState(venue?.spaces[0]?.id || '')
  const [selectedPackageId, setSelectedPackageId] = useState(venue?.packages[0]?.id || '')

  if (!isOpen || !venue) return null

  const selectedSpace = venue.spaces.find((s) => s.id === selectedSpaceId) || venue.spaces[0]
  const selectedPackage = venue.packages.find((p) => p.id === selectedPackageId) || venue.packages[0]

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0a0908]/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-4xl bg-[#141211] border border-[#27221e] rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
        >
          {/* Header Banner */}
          <div className="relative h-64 sm:h-72 w-full overflow-hidden shrink-0 bg-stone-950">
            <img
              src={venue.coverPhoto}
              alt={lang === 'ar' ? venue.name.ar : venue.name.en}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141211] via-[#141211]/50 to-transparent" />

            {/* Top Close & Shortlist Controls */}
            <div className="absolute top-4 inset-x-4 flex items-center justify-between z-20">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#141211]/85 backdrop-blur-md text-[#dfc086] border border-[#dfc086]/30">
                <Sparkles className="w-3.5 h-3.5 text-[#dfc086]" />
                <span>{lang === 'ar' ? venue.badge.ar : venue.badge.en}</span>
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onToggleShortlist(venue.id)}
                  className={`p-2.5 rounded-full backdrop-blur-md border transition-colors cursor-pointer ${
                    isShortlisted
                      ? 'bg-rose-500/20 border-rose-500/60 text-rose-300'
                      : 'bg-[#141211]/80 border-[#2f2822] text-[#d6cebf] hover:text-rose-300'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isShortlisted ? 'fill-rose-300' : ''}`} />
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="p-2.5 rounded-full bg-[#141211]/80 border border-[#2f2822] text-[#d6cebf] hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Venue Identity in Banner */}
            <div className="absolute bottom-4 inset-x-6 z-20">
              <div className="flex items-center gap-2 text-xs text-[#dfc086] font-medium mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? venue.address.ar : venue.address.en}</span>
                <span>• ★ {venue.rating} ({venue.reviewsCount} {lang === 'ar' ? 'تقييم معتمد' : 'reviews'})</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#f7f3eb]">
                {lang === 'ar' ? venue.name.ar : venue.name.en}
              </h2>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center border-b border-[#27221e] bg-[#0d0c0b]/70 px-6 shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab('spaces')}
              className={`py-3.5 px-4 text-xs sm:text-sm font-medium border-b-2 transition-colors cursor-pointer ${
                activeTab === 'spaces'
                  ? 'border-[#dfc086] text-[#dfc086]'
                  : 'border-transparent text-[#8e8377] hover:text-[#d6cebf]'
              }`}
            >
              {t.spacesTab} ({venue.spaces.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('packages')}
              className={`py-3.5 px-4 text-xs sm:text-sm font-medium border-b-2 transition-colors cursor-pointer ${
                activeTab === 'packages'
                  ? 'border-[#dfc086] text-[#dfc086]'
                  : 'border-transparent text-[#8e8377] hover:text-[#d6cebf]'
              }`}
            >
              {t.packagesTab} ({venue.packages.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('amenities')}
              className={`py-3.5 px-4 text-xs sm:text-sm font-medium border-b-2 transition-colors cursor-pointer ${
                activeTab === 'amenities'
                  ? 'border-[#dfc086] text-[#dfc086]'
                  : 'border-transparent text-[#8e8377] hover:text-[#d6cebf]'
              }`}
            >
              {t.amenitiesTab}
            </button>
          </div>

          {/* Tab Content Area (Scrollable) */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            {/* SPACES TAB */}
            {activeTab === 'spaces' && (
              <div className="space-y-4">
                <p className="text-xs text-stone-400">
                  {lang === 'ar'
                    ? 'المساحات المسماة المعتمدة لدى إدارة المكان مع أقصى طاقة استيعابية موثقة لكل تصميم:'
                    : 'Certified spaces and layouts with recorded capacities from venue management:'}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {venue.spaces.map((space) => {
                    const isSelected = selectedSpaceId === space.id
                    return (
                      <div
                        key={space.id}
                        onClick={() => setSelectedSpaceId(space.id)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#241e17] border-[#dfc086]/80 shadow-lg shadow-black/40'
                            : 'bg-[#181513]/70 border-[#28221d] hover:border-[#382f28]'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h4 className="font-serif font-bold text-[#f7f3eb] text-base">
                            {lang === 'ar' ? space.name.ar : space.name.en}
                          </h4>
                          <span className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full bg-[#0f0e0d] border border-[#28221d] text-[#dfc086] font-mono">
                            <Users className="w-3 h-3 text-[#dfc086]" />
                            <span>{space.capacity} {t.guests}</span>
                          </span>
                        </div>
                        <div className="text-xs text-[#dfc086] font-medium mb-1">
                          {lang === 'ar' ? space.type.ar : space.type.en}
                        </div>
                        <p className="text-xs text-[#a89d91] leading-relaxed">
                          {lang === 'ar' ? space.description.ar : space.description.en}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* PACKAGES TAB */}
            {activeTab === 'packages' && (
              <div className="space-y-4">
                <p className="text-xs text-[#a89d91]">
                  {lang === 'ar'
                    ? 'باقات الأسعار الاسترشادية ومشتملات كل باقة (تثبت أسعار هذه الباقة عند إرسال الاستفسار):'
                    : 'Guide package pricing and inclusions (snapshot rates guaranteed upon inquiry submission):'}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {venue.packages.map((pkg) => {
                    const isSelected = selectedPackageId === pkg.id
                    return (
                      <div
                        key={pkg.id}
                        onClick={() => setSelectedPackageId(pkg.id)}
                        className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#241e17] border-[#dfc086]/80 shadow-lg shadow-black/40'
                            : 'bg-[#181513]/70 border-[#28221d] hover:border-[#382f28]'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-serif font-bold text-[#f7f3eb] text-lg">
                              {lang === 'ar' ? pkg.name.ar : pkg.name.en}
                            </h4>
                            <span className="text-lg font-bold font-serif text-[#faecd2]">
                              {pkg.price.toLocaleString()} <span className="text-xs text-[#a89d91]">EGP</span>
                            </span>
                          </div>

                          <div className="space-y-2 mt-4 pt-3 border-t border-[#28221d]">
                            {pkg.inclusions.map((inc, i) => (
                              <div key={i} className="flex items-center gap-2 text-xs text-[#d6cebf]">
                                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                <span>{lang === 'ar' ? inc.ar : inc.en}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mt-4 pt-3 text-right">
                          <span className={`text-xs font-semibold ${isSelected ? 'text-[#dfc086]' : 'text-[#6e6357]'}`}>
                            {isSelected ? (lang === 'ar' ? 'الباقة المحددة ✓' : 'Selected Package ✓') : (lang === 'ar' ? 'اختر هذه الباقة' : 'Click to Select')}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* AMENITIES TAB */}
            {activeTab === 'amenities' && (
              <div className="space-y-4">
                <p className="text-xs text-[#a89d91]">
                  {lang === 'ar' ? 'الخدمات والمرافق المتوفرة حصرياً بموقع الحفل:' : 'On-site facilities and certified logistics:'}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {venue.amenities.map((amenityKey) => (
                    <div
                      key={amenityKey}
                      className="p-3 rounded-xl bg-[#181513]/70 border border-[#28221d] flex items-center gap-2.5 text-xs text-[#d6cebf]"
                    >
                      <ShieldCheck className="w-4 h-4 text-[#dfc086] shrink-0" />
                      <span>{t[`amenity_${amenityKey}`] || amenityKey}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Instant Guide Quote Snapshot Box */}
            <div className="p-4 rounded-2xl bg-[#0e0d0c] border border-[#dfc086]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#dfc086] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t.instantQuote}</span>
                </span>
                <div className="text-xs text-[#a89d91] mt-1">
                  {lang === 'ar' ? selectedSpace?.name.ar : selectedSpace?.name.en} +{' '}
                  {lang === 'ar' ? selectedPackage?.name.ar : selectedPackage?.name.en}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-[10px] uppercase text-[#6e6357] block">
                    {lang === 'ar' ? 'التكلفة الاسترشادية' : 'Estimated Base'}
                  </span>
                  <span className="text-xl font-bold font-serif text-[#faecd2]">
                    {selectedPackage ? selectedPackage.price.toLocaleString() : '---'} EGP
                  </span>
                </div>

                <GradientButton
                  variant="primary"
                  size="md"
                  icon={Send}
                  onClick={() => {
                    onClose()
                    onOpenInquiry(venue, selectedSpaceId, selectedPackageId)
                  }}
                >
                  {t.inquireNow}
                </GradientButton>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
export default VenueDetailsModal
