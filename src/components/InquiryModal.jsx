import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { GradientButton } from './kokonutui/GradientButton'
import { X, Send, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react'

export function InquiryModal({
  isOpen,
  onClose,
  venue,
  defaultSpaceId,
  defaultPackageId,
  lang = 'en',
  t,
  onSubmitInquiry
}) {
  const [formData, setFormData] = useState(() => ({
    name: '',
    phone: '',
    email: '',
    date: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    guestCount: 200,
    spaceId: defaultSpaceId || venue?.spaces?.[0]?.id || '',
    packageId: defaultPackageId || venue?.packages?.[0]?.id || '',
    notes: ''
  }))

  const [isSubmitted, setIsSubmitted] = useState(false)

  if (!isOpen || !venue) return null

  const selectedSpace = venue.spaces.find((s) => s.id === formData.spaceId) || venue.spaces[0]
  const selectedPackage = venue.packages.find((p) => p.id === formData.packageId) || venue.packages[0]

  const handleSubmit = (e) => {
    e.preventDefault()
    const inquiryRecord = {
      id: `inq-${Date.now()}`,
      venueId: venue.id,
      venueName: venue.name,
      coverPhoto: venue.coverPhoto,
      submittedAt: new Date().toISOString(),
      customerName: formData.name || (lang === 'ar' ? 'سارة ومحمد' : 'Sarah & Mohamed'),
      phone: formData.phone || '+20 100 123 4567',
      email: formData.email || 'couple@weddo.local',
      date: formData.date,
      guestCount: Number(formData.guestCount),
      spaceSnapshot: {
        id: selectedSpace.id,
        name: selectedSpace.name,
        capacity: selectedSpace.capacity
      },
      packageSnapshot: {
        id: selectedPackage.id,
        name: selectedPackage.name,
        price: selectedPackage.price,
        currency: selectedPackage.currency || 'EGP'
      },
      notes: formData.notes,
      status: 'pending', // 'pending' | 'offer_sent'
      messages: [
        {
          id: 'msg-1',
          sender: 'customer',
          senderName: formData.name || (lang === 'ar' ? 'العروسين' : 'Couple'),
          text: formData.notes || (lang === 'ar' ? 'نود الاستفسار عن توفر القاعة والمشتملات بالتاريخ المحدد.' : 'Inquiring about venue availability and package inclusions for our date.'),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
        {
          id: 'msg-2',
          sender: 'coordinator',
          senderName: lang === 'ar' ? 'منسق الحجوزات الرسمي' : 'Senior Venue Coordinator',
          text: lang === 'ar'
            ? 'مرحباً بكم في ويدو! تلقينا طلبكم لتاريخ ' + formData.date + ' لمساحة (' + (selectedSpace.name.ar) + '). جاري التحقق من أحدث باقات الزفاف وإرسال بيان الأسعار.'
            : 'Welcome to Weddo! We received your inquiry for ' + formData.date + ' at ' + selectedSpace.name.en + '. Our team is verifying your requested session now.',
          timestamp: new Date(Date.now() + 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]
    }

    onSubmitInquiry(inquiryRecord)
    setIsSubmitted(true)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0a0908]/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-[#141211] border border-[#27221e] rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-6 border-b border-[#27221e] flex items-center justify-between bg-[#0d0c0b]/70">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#dfc086]">
                {lang === 'ar' ? venue.name.ar : venue.name.en}
              </span>
              <h3 className="text-xl font-serif font-bold text-[#f7f3eb]">{t.inquiryTitle}</h3>
              <p className="text-xs text-[#a89d91] mt-0.5">{t.inquirySubtitle}</p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2.5 rounded-full bg-[#181513] text-[#d6cebf] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Form Body or Success State */}
          <div className="p-6 overflow-y-auto flex-1">
            {isSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-serif font-bold text-[#f7f3eb]">{t.inquirySuccessTitle}</h4>
                <p className="text-sm text-[#d6cebf] max-w-md mx-auto leading-relaxed">
                  {t.inquirySuccessMsg}
                </p>

                {/* Snapshot card */}
                <div className="p-4 rounded-2xl bg-[#0e0d0c] border border-[#27221e] max-w-md mx-auto text-left text-xs space-y-2 mt-4">
                  <div className="flex justify-between text-[#8e8377]">
                    <span>{lang === 'ar' ? 'المساحة:' : 'Space:'}</span>
                    <span className="text-[#f7f3eb] font-medium">
                      {lang === 'ar' ? selectedSpace?.name.ar : selectedSpace?.name.en}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#8e8377]">
                    <span>{lang === 'ar' ? 'الباقة الاسترشادية:' : 'Package:'}</span>
                    <span className="text-[#dfc086] font-bold">
                      {selectedPackage ? selectedPackage.price.toLocaleString() : '---'} EGP
                    </span>
                  </div>
                </div>

                <div className="pt-4">
                  <GradientButton variant="primary" onClick={onClose}>
                    {lang === 'ar' ? 'تم ومتابعة التصفح' : 'Done & Continue Browsing'}
                  </GradientButton>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {/* Couple Contact Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[#d6cebf] font-medium">{t.fullName}</label>
                    <input
                      type="text"
                      required
                      placeholder={lang === 'ar' ? 'مثال: نورهان وكريم' : 'e.g., Farida & Omar'}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#0e0d0c] border border-[#27221e] rounded-xl px-3.5 py-2.5 text-[#fdfbf7] focus:outline-none focus:border-[#dfc086]/60 focus:ring-1 focus:ring-[#dfc086]/20 placeholder-[#786e64]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[#d6cebf] font-medium">{t.phoneNumber}</label>
                    <input
                      type="tel"
                      required
                      placeholder="0100 123 4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#0e0d0c] border border-[#27221e] rounded-xl px-3.5 py-2.5 text-[#fdfbf7] focus:outline-none focus:border-[#dfc086]/60 focus:ring-1 focus:ring-[#dfc086]/20 font-mono placeholder-[#786e64]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[#d6cebf] font-medium">{t.eventDate}</label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-[#0e0d0c] border border-[#27221e] rounded-xl px-3.5 py-2.5 text-[#fdfbf7] focus:outline-none focus:border-[#dfc086]/60 focus:ring-1 focus:ring-[#dfc086]/20"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[#d6cebf] font-medium">{t.estimatedGuests}</label>
                    <input
                      type="number"
                      min="30"
                      max={selectedSpace ? selectedSpace.capacity : 800}
                      value={formData.guestCount}
                      onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                      className="w-full bg-[#0e0d0c] border border-[#27221e] rounded-xl px-3.5 py-2.5 text-[#fdfbf7] focus:outline-none focus:border-[#dfc086]/60 focus:ring-1 focus:ring-[#dfc086]/20 font-mono"
                    />
                  </div>
                </div>

                {/* Space and Package Selectors */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1">
                    <label className="text-[#d6cebf] font-medium">{t.selectedSpace}</label>
                    <select
                      value={formData.spaceId}
                      onChange={(e) => setFormData({ ...formData, spaceId: e.target.value })}
                      className="w-full bg-[#0e0d0c] border border-[#27221e] rounded-xl px-3.5 py-2.5 text-[#fdfbf7] focus:outline-none focus:border-[#dfc086]/60 focus:ring-1 focus:ring-[#dfc086]/20"
                    >
                      {venue.spaces.map((space) => (
                        <option key={space.id} value={space.id}>
                          {lang === 'ar' ? space.name.ar : space.name.en} ({space.capacity} {t.guests})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[#d6cebf] font-medium">{t.selectedPackage}</label>
                    <select
                      value={formData.packageId}
                      onChange={(e) => setFormData({ ...formData, packageId: e.target.value })}
                      className="w-full bg-[#0e0d0c] border border-[#27221e] rounded-xl px-3.5 py-2.5 text-[#fdfbf7] focus:outline-none focus:border-[#dfc086]/60 focus:ring-1 focus:ring-[#dfc086]/20"
                    >
                      {venue.packages.map((pkg) => (
                        <option key={pkg.id} value={pkg.id}>
                          {lang === 'ar' ? pkg.name.ar : pkg.name.en} — {pkg.price.toLocaleString()} EGP
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-1">
                  <label className="text-[#d6cebf] font-medium">{t.notesPlaceholder}</label>
                  <textarea
                    rows="3"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder={t.notesPlaceholder}
                    className="w-full bg-[#0e0d0c] border border-[#27221e] rounded-xl p-3 text-[#fdfbf7] focus:outline-none focus:border-[#dfc086]/60 focus:ring-1 focus:ring-[#dfc086]/20 placeholder-[#786e64]"
                  />
                </div>

                {/* Legal and workflow disclaimer */}
                <div className="p-3.5 rounded-xl bg-[#0e0d0c]/70 border border-[#27221e] flex items-start gap-2.5 text-[11px] text-[#a89d91]">
                  <AlertCircle className="w-4 h-4 text-[#dfc086] shrink-0 mt-0.5" />
                  <span>{t.inquiryNotice}</span>
                </div>

                {/* Submit button */}
                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-[#a89d91] hover:text-[#fdfbf7] transition-colors cursor-pointer"
                  >
                    {t.close}
                  </button>
                  <GradientButton type="submit" variant="primary" icon={Send}>
                    {t.sendInquiryButton}
                  </GradientButton>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
export default InquiryModal
