import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, Send, Calendar, Users, Clock, CheckCircle2, Sparkles, Building2 } from 'lucide-react'
import { formatEGP } from '../lib/utils'

export function InquiryModal({
  venue,
  defaultSpaceId,
  defaultPackageId,
  isOpen,
  onClose,
  onSubmitInquiry,
  lang,
  t
}) {
  if (!isOpen || !venue) return null

  const name = venue.name[lang] || venue.name.en

  const [date, setDate] = useState('2026-11-20')
  const [session, setSession] = useState('evening')
  const [guests, setGuests] = useState(250)
  const [spaceId, setSpaceId] = useState(defaultSpaceId || venue.spaces?.[0]?.id || '')
  const [packageId, setPackageId] = useState(defaultPackageId || venue.packages?.[0]?.id || '')
  const [contactName, setContactName] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const selectedSpace = venue.spaces?.find(s => s.id === spaceId) || venue.spaces?.[0]
  const selectedPackage = venue.packages?.find(p => p.id === packageId) || venue.packages?.[0]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!contactName.trim() || !contactPhone.trim()) {
      alert(lang === 'ar' ? 'يرجى إدخال الاسم ورقم الهاتف للتواصل.' : 'Please enter your name and phone number.')
      return
    }

    const newInquiry = {
      id: `inq-${Date.now()}`,
      venueId: venue.id,
      venueName: venue.name,
      date,
      session,
      guestCount: guests,
      spaceSnapshot: {
        id: selectedSpace.id,
        name: selectedSpace.name,
        capacity: selectedSpace.capacity
      },
      packageSnapshot: {
        id: selectedPackage.id,
        name: selectedPackage.name,
        price: selectedPackage.price,
        currency: 'EGP'
      },
      contactName,
      contactPhone,
      notes,
      createdAt: new Date().toISOString(),
      status: 'under_review',
      messages: [
        {
          id: `m-1`,
          senderRole: 'client',
          author: contactName,
          text: notes || (lang === 'ar' ? 'مرحباً، أود الاستفسار عن إمكانية حجز القاعة لهذا التاريخ.' : 'Hello, I would like to inquire about availability and formal terms for this date.'),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
        {
          id: `m-2`,
          senderRole: 'venue',
          author: `${name} Operations`,
          text: lang === 'ar' 
            ? `أهلاً بك يا ${contactName}! تم استلام طلبك للمساحة (${selectedSpace.name[lang] || selectedSpace.name.en}). جاري مراجعة التاريخ المقترح وإعداد عرض السعر الرسمي.`
            : `Welcome ${contactName}! We have received your inquiry for (${selectedSpace.name.en}). We are currently checking date availability and preparing your formal proposal.`,
          timestamp: 'Just now'
        }
      ]
    }

    onSubmitInquiry(newInquiry)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      onClose()
    }, 2000)
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-[#000000]/75 backdrop-blur-xs transition-opacity" 
      />

      {/* Modal Surface per Design.md: Bone #e7e5e4, 9px radius, hairline #dfdcd5 */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-2xl rounded-[9px] bg-[#e7e5e4] dark:bg-[#1c1b18] border border-[#dfdcd5] dark:border-[#2e2d28] overflow-hidden z-10 flex flex-col shadow-2xl text-[#000000] dark:text-[#f5f5f3]"
      >
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#dfdcd5] dark:border-[#2e2d28] flex items-center justify-between shrink-0 bg-[#ebebeb] dark:bg-[#141412]">
          <div>
            <div className="text-[11px] font-mono tracking-widest uppercase text-[#595855] dark:text-[#a8a69e] mb-1 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#000000] dark:text-[#f5f5f3]" />
              <span>{name}</span>
            </div>
            <h3 className="font-serif text-2xl font-normal text-[#000000] dark:text-[#f5f5f3]">
              {t.inquiryModalTitle}
            </h3>
            <p className="text-[13px] text-[#595855] dark:text-[#a8a69e] mt-0.5 font-sans">
              {t.inquiryModalDesc}
            </p>
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="tap-bounce p-1.5 rounded-full text-[#595855] dark:text-[#a8a69e] hover:bg-[#dfdcd5] dark:hover:bg-[#282723] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Success Confirmation */}
        {submitted ? (
          <div className="p-12 text-center flex flex-col items-center justify-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#000000] dark:bg-[#f5f5f3] text-[#ffffff] dark:text-[#0b0b0a] flex items-center justify-center shadow-sm">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="font-serif text-2xl font-normal text-[#000000] dark:text-[#f5f5f3]">
              {t.inquirySuccessTitle}
            </h4>
            <p className="text-sm text-[#595855] dark:text-[#a8a69e] max-w-md font-sans leading-relaxed">
              {t.inquirySuccessBody}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-7 space-y-4">
            
            {/* Row 1: Date & Session */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-[#000000] dark:text-[#f5f5f3] block mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#000000] dark:text-[#f5f5f3]" />
                  <span>{t.inquiryEventDate}</span>
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full h-10 px-3 text-xs sm:text-sm rounded-[6px] bg-[#ffffff] dark:bg-[#282723] text-[#000000] dark:text-[#f5f5f3] border border-[#dfdcd5] dark:border-[#2e2d28] focus:outline-none focus:border-[#000000] dark:focus:border-[#f5f5f3]"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-[#000000] dark:text-[#f5f5f3] block mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#000000] dark:text-[#f5f5f3]" />
                  <span>{t.inquirySession}</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSession('day')}
                    className={`py-2 px-3 rounded-[28.8px] text-xs font-mono tracking-wider uppercase transition-all cursor-pointer ${
                      session === 'day'
                        ? 'bg-[#000000] text-[#ffffff] dark:bg-[#f5f5f3] dark:text-[#0b0b0a]'
                        : 'border border-[#dfdcd5] dark:border-[#2e2d28] text-[#595855] dark:text-[#a8a69e] bg-[#ebebeb] dark:bg-[#141412]'
                    }`}
                  >
                    {t.sessionDay}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSession('evening')}
                    className={`py-2 px-3 rounded-[28.8px] text-xs font-mono tracking-wider uppercase transition-all cursor-pointer ${
                      session === 'evening'
                        ? 'bg-[#000000] text-[#ffffff] dark:bg-[#f5f5f3] dark:text-[#0b0b0a]'
                        : 'border border-[#dfdcd5] dark:border-[#2e2d28] text-[#595855] dark:text-[#a8a69e] bg-[#ebebeb] dark:bg-[#141412]'
                    }`}
                  >
                    {t.sessionEvening}
                  </button>
                </div>
              </div>
            </div>

            {/* Row 2: Space & Package */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-[#000000] dark:text-[#f5f5f3] block mb-1.5">
                  {t.inquirySpace}
                </label>
                <select
                  value={spaceId}
                  onChange={(e) => setSpaceId(e.target.value)}
                  className="w-full h-10 px-3 text-xs rounded-[6px] bg-[#ffffff] dark:bg-[#282723] text-[#000000] dark:text-[#f5f5f3] border border-[#dfdcd5] dark:border-[#2e2d28] focus:outline-none focus:border-[#000000] dark:focus:border-[#f5f5f3]"
                >
                  {venue.spaces?.map(s => (
                    <option key={s.id} value={s.id} className="dark:bg-[#1c1b18] dark:text-[#f5f5f3]">
                      {s.name[lang] || s.name.en} ({s.capacity} {t.guestsLabel})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-[#000000] dark:text-[#f5f5f3] block mb-1.5">
                  {t.inquiryPackage}
                </label>
                <select
                  value={packageId}
                  onChange={(e) => setPackageId(e.target.value)}
                  className="w-full h-10 px-3 text-xs rounded-[6px] bg-[#ffffff] dark:bg-[#282723] text-[#000000] dark:text-[#f5f5f3] border border-[#dfdcd5] dark:border-[#2e2d28] focus:outline-none focus:border-[#000000] dark:focus:border-[#f5f5f3]"
                >
                  {venue.packages?.map(p => (
                    <option key={p.id} value={p.id} className="dark:bg-[#1c1b18] dark:text-[#f5f5f3]">
                      {p.name[lang] || p.name.en} — {formatEGP(p.price, lang)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 3: Guest Count */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-[#000000] dark:text-[#f5f5f3] flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#000000] dark:text-[#f5f5f3]" />
                  <span>{t.inquiryExpectedGuests}</span>
                </label>
                <span className="text-xs font-mono font-semibold text-[#000000] dark:text-[#f5f5f3]">
                  {guests} {t.guestsLabel}
                </span>
              </div>
              <input
                type="range"
                min="30"
                max={selectedSpace?.capacity || 1000}
                step="10"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value, 10))}
                className="w-full accent-[#000000] dark:accent-[#f5f5f3] cursor-pointer"
              />
            </div>

            {/* Row 4: Contact Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-[#000000] dark:text-[#f5f5f3] block mb-1.5">
                  {t.inquiryName} *
                </label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder={lang === 'ar' ? 'سارة المنصور' : 'Sarah Mansour'}
                  className="w-full h-10 px-3 text-xs rounded-[6px] bg-[#ffffff] dark:bg-[#282723] text-[#000000] dark:text-[#f5f5f3] border border-[#dfdcd5] dark:border-[#2e2d28] focus:outline-none focus:border-[#000000] dark:focus:border-[#f5f5f3]"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-[#000000] dark:text-[#f5f5f3] block mb-1.5">
                  {t.inquiryPhone} *
                </label>
                <input
                  type="tel"
                  required
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="01012345678"
                  className="w-full h-10 px-3 text-xs rounded-[6px] bg-[#ffffff] dark:bg-[#282723] text-[#000000] dark:text-[#f5f5f3] border border-[#dfdcd5] dark:border-[#2e2d28] focus:outline-none focus:border-[#000000] dark:focus:border-[#f5f5f3] font-mono"
                />
              </div>
            </div>

            {/* Row 5: Notes */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-[#000000] dark:text-[#f5f5f3] block mb-1.5">
                {t.inquiryNotes}
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={lang === 'ar' ? 'ملاحظات خاصة، استفسار عن الكوشة أو موعد المعاينة...' : 'Special requirements, bridal suite timing, menu tasting...'}
                className="w-full p-3 text-xs rounded-[6px] bg-[#ffffff] dark:bg-[#282723] text-[#000000] dark:text-[#f5f5f3] border border-[#dfdcd5] dark:border-[#2e2d28] focus:outline-none focus:border-[#000000] dark:focus:border-[#f5f5f3]"
              />
            </div>

            {/* Action Bar */}
            <div className="pt-3 border-t border-[#dfdcd5] dark:border-[#2e2d28] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-[28.8px] border border-[#dfdcd5] dark:border-[#2e2d28] text-xs font-sans text-[#595855] dark:text-[#a8a69e] hover:text-[#000000] dark:hover:text-[#f5f5f3] hover:bg-[#dfdcd5] dark:hover:bg-[#282723] cursor-pointer"
              >
                {t.modalClose}
              </button>

              <button
                type="submit"
                className="btn-pill-ink dark:bg-[#f5f5f3] dark:text-[#0b0b0a] inline-flex items-center gap-2 tap-bounce cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-[#ffffff] dark:text-[#0b0b0a]" />
                <span>{t.inquirySubmit}</span>
              </button>
            </div>

          </form>
        )}

      </motion.div>

    </div>
  )
}
