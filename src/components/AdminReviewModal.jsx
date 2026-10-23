import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { GradientButton } from './kokonutui/GradientButton'
import { X, ShieldCheck, Check, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react'

export function AdminReviewModal({
  isOpen,
  onClose,
  venues,
  lang = 'en',
  t
}) {
  const [submissions, setSubmissions] = useState([
    {
      id: 'sub-1',
      venueId: 'olive-garden',
      venueName: venues[0]?.name,
      spaceAdded: 'The Andalusian Courtyard (Cap: 140)',
      packageProposed: 'Boutique Garden Hire (135,000 EGP)',
      status: 'pending_review',
      submittedBy: 'vendor_owner@olivegarden.eg'
    },
    {
      id: 'sub-2',
      venueId: 'nile-salon',
      venueName: venues[1]?.name,
      spaceAdded: 'Upper River Promenade (Cap: 180)',
      packageProposed: 'Pharaohs Crown Experience (260,000 EGP)',
      status: 'pending_review',
      submittedBy: 'mgmt@nilesalon.cairo'
    }
  ])

  const [actionNotice, setActionNotice] = useState('')

  if (!isOpen) return null

  const handleApprove = (id) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'approved' } : s))
    )
    setActionNotice(lang === 'ar' ? 'تم اعتماد ونشر تعديلات القاعة بنجاح' : 'Listing changes approved and published to catalog')
    setTimeout(() => setActionNotice(''), 4000)
  }

  const handleReject = (id) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'changes_requested' } : s))
    )
    setActionNotice(lang === 'ar' ? 'تم إرجاع القائمة لمالك المكان مع طلب مبررات التعديل' : 'Changes requested with notes sent to venue owner')
    setTimeout(() => setActionNotice(''), 4000)
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
          className="relative w-full max-w-3xl bg-[#141211] border border-[#27221e] rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="p-6 border-b border-[#27221e] flex items-center justify-between bg-[#0e0d0c]/80 shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#dfc086]/15 text-[#dfc086]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-[#fdfbf7]">{t.adminTitle}</h3>
                <p className="text-xs text-[#a89d91]">{t.adminSubtitle}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2.5 rounded-full bg-[#1e1a17] text-[#a89d91] hover:text-[#fdfbf7] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
            {actionNotice && (
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{actionNotice}</span>
              </div>
            )}

            <div className="space-y-4">
              <h4 className="font-serif font-bold text-[#fdfbf7] text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#dfc086]" />
                <span>{t.pendingListings}</span>
              </h4>

              {submissions.map((sub) => (
                <div
                  key={sub.id}
                  className="p-5 rounded-2xl bg-[#0e0d0c]/50 border border-[#27221e] space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-serif font-bold text-[#fdfbf7] text-base">
                        {lang === 'ar' ? sub.venueName?.ar : sub.venueName?.en}
                      </h5>
                      <span className="text-[#a89d91] text-[11px]">{sub.submittedBy}</span>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-semibold border ${
                        sub.status === 'approved'
                          ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                          : sub.status === 'changes_requested'
                          ? 'bg-red-500/10 text-red-300 border-red-500/30'
                          : 'bg-[#dfc086]/10 text-[#dfc086] border-[#dfc086]/25'
                      }`}
                    >
                      {sub.status === 'approved'
                        ? (lang === 'ar' ? 'معتمد ومنشور' : 'Approved')
                        : sub.status === 'changes_requested'
                        ? (lang === 'ar' ? 'مطلوب تعديلات' : 'Changes Requested')
                        : (lang === 'ar' ? 'بانتظار المراجعة' : 'Pending Review')}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 rounded-xl bg-[#181513] border border-[#27221e] text-[#d6cebf]">
                    <div>
                      <span className="text-[#786e64] block text-[10px] uppercase">
                        {lang === 'ar' ? 'المساحة المقترحة:' : 'Proposed Space:'}
                      </span>
                      <span>{sub.spaceAdded}</span>
                    </div>
                    <div>
                      <span className="text-[#786e64] block text-[10px] uppercase">
                        {lang === 'ar' ? 'الباقة المقدمة:' : 'Proposed Package:'}
                      </span>
                      <span className="text-[#dfc086] font-serif font-bold">{sub.packageProposed}</span>
                    </div>
                  </div>

                  {sub.status === 'pending_review' && (
                    <div className="flex justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => handleReject(sub.id)}
                        className="px-3 py-1.5 rounded-lg border border-red-800/60 text-red-400 hover:bg-red-950/40 transition-colors cursor-pointer"
                      >
                        {t.requestChanges}
                      </button>
                      <GradientButton
                        size="sm"
                        variant="primary"
                        icon={Check}
                        onClick={() => handleApprove(sub.id)}
                      >
                        {t.approveListing}
                      </GradientButton>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Audit notice */}
            <div className="p-3.5 rounded-xl bg-[#0e0d0c]/50 border border-[#27221e] text-[11px] text-[#a89d91] leading-relaxed">
              {t.adminNotice}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
export default AdminReviewModal
