import React, { useState } from 'react'
import { X, Send, CheckCircle2, Sparkles, Building, Calendar, Users, DollarSign } from 'lucide-react'

export function DirectInquiryModal({
  isOpen,
  onClose,
  stopData,
  onSubmitSuccess
}) {
  const [formData, setFormData] = useState({
    coupleNames: 'Sarah & Tarek',
    phone: '+20 100 876 5432',
    email: 'sarah.tarek@example.eg',
    weddingDate: '2026-11-14',
    guestCount: 250,
    preferredSpace: 'The Royal Lawn & Grand Arch',
    notes: 'We would love to schedule a private tour of the estate and tasting session.'
  })

  const [submitted, setSubmitted] = useState(false)

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      onSubmitSuccess?.(formData)
    }, 1800)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#08090b]/85 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-xl rounded-3xl bg-[#141211] border border-[#dfc086]/30 shadow-2xl overflow-hidden p-6 sm:p-8 animate-scale-up">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#1e1a17] text-[#a89d91] hover:text-[#f7f3eb] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#f7f3eb]">
              Inquiry Snapshot Recorded
            </h3>
            <p className="text-xs text-[#a89d91] max-w-md">
              Mabrouk! Your inquiry with snapshot pricing and requested date (<b>{formData.weddingDate}</b>) has been dispatched directly to the estate concierge. A verified private conversation thread is active.
            </p>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#dfc086] mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#dfc086]" />
              <span>Verified Direct Inquiry</span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#f7f3eb] mb-1">
              Connect With Venue Concierge
            </h3>
            <p className="text-xs text-[#a89d91] mb-6">
              Inquire directly without intermediaries. Your selected date, capacity, and pricing snapshot are frozen on submission.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-[#d6cebf] uppercase tracking-wider">
                    Couple Names
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.coupleNames}
                    onChange={(e) => setFormData({ ...formData, coupleNames: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d0c] border border-[#27221e] text-xs text-[#f7f3eb] focus:border-[#dfc086] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-[#d6cebf] uppercase tracking-wider">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d0c] border border-[#27221e] text-xs text-[#f7f3eb] focus:border-[#dfc086] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-[#d6cebf] uppercase tracking-wider">
                    Wedding Celebration Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.weddingDate}
                    onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d0c] border border-[#27221e] text-xs text-[#f7f3eb] focus:border-[#dfc086] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-[#d6cebf] uppercase tracking-wider">
                    Estimated Guests
                  </label>
                  <input
                    type="number"
                    min="50"
                    max="1000"
                    required
                    value={formData.guestCount}
                    onChange={(e) => setFormData({ ...formData, guestCount: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d0c] border border-[#27221e] text-xs text-[#f7f3eb] focus:border-[#dfc086] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-[#d6cebf] uppercase tracking-wider">
                  Special Notes / Layout Requests
                </label>
                <textarea
                  rows="2"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d0c] border border-[#27221e] text-xs text-[#f7f3eb] focus:border-[#dfc086] focus:outline-none resize-none"
                />
              </div>

              {/* Price Snapshot Pill */}
              <div className="p-3 rounded-xl bg-[#1a1715] border border-[#2e261f] flex items-center justify-between text-xs">
                <span className="text-[#a89d91]">Frozen Contract Estimate Snapshot:</span>
                <span className="font-bold font-serif text-[#dfc086]">
                  {stopData?.calculatedEstimate ? `${stopData.calculatedEstimate.toLocaleString()} EGP` : '195,000 EGP'}
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#dfc086] via-[#ceab68] to-[#9e7a3d] text-[#0e0d0c] font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#ceab68]/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit & Freeze Snapshot</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default DirectInquiryModal
