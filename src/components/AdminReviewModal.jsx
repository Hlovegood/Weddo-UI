import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react'

export function AdminReviewModal({
  isOpen,
  onClose,
  lang,
  t
}) {
  if (!isOpen) return null

  const [submissions, setSubmissions] = useState([
    {
      id: 'sub-001',
      venueName: lang === 'ar' ? 'حديقة الزيتون الملكية - التجمع الخامس' : 'The Olive Garden Estate - New Cairo',
      version: 'v0.7.2',
      editor: 'Hesham (Vendor Owner)',
      submittedAt: '2026-10-23 18:40',
      status: 'pending',
      summary: 'Added new Andalusian Courtyard space (150 cap) and updated Royal Emerald Gala package to 215,000 EGP.',
      photosCount: 4,
      safetyChecks: 'Bounded raster WebP/JPEG only (nosniff verified)'
    },
    {
      id: 'sub-002',
      venueName: lang === 'ar' ? 'مركز قمة زايد للمؤتمرات' : 'Zayed Crystal Summit Center',
      version: 'v0.7.1',
      editor: 'Summit Operations Team',
      submittedAt: '2026-10-22 11:20',
      status: 'pending',
      summary: 'Configured hybrid livestreaming AV and simultaneously translation booth packages for 2026-2027.',
      photosCount: 6,
      safetyChecks: 'Bounded raster WebP/JPEG only (nosniff verified)'
    }
  ])

  const handleApprove = (id) => {
    alert(lang === 'ar' ? 'تم اعتماد القاعة ونشرها رسمياً للجمهور!' : 'Listing approved and published to public catalog!')
    setSubmissions(prev => prev.filter(s => s.id !== id))
  }

  const handleReject = (id) => {
    const reason = prompt(lang === 'ar' ? 'اذكر سبب طلب التعديل للمالك:' : 'Enter revision request reason for the venue owner:')
    if (reason) {
      alert(lang === 'ar' ? `تم إرسال طلب التعديل: ${reason}` : `Revisions requested: ${reason}`)
      setSubmissions(prev => prev.filter(s => s.id !== id))
    }
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

      {/* Dialog Surface per Design.md: Bone #e7e5e4, 9px radius, hairline #dfdcd5 */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-3xl rounded-[9px] bg-[#e7e5e4] border border-[#dfdcd5] overflow-hidden z-10 flex flex-col max-h-[85vh] shadow-2xl text-[#000000]"
      >
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#dfdcd5] flex items-center justify-between shrink-0 bg-[#ebebeb]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-[#dfdcd5] text-[#000000]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-normal text-[#000000]">
                {t.adminTitle}
              </h3>
              <p className="text-xs font-mono uppercase text-[#595855]">
                {t.adminSubtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#595855] hover:bg-[#dfdcd5] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Submissions List */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#dfdcd5]">
            <span className="text-xs font-mono uppercase text-[#595855]">
              {lang === 'ar' ? 'طلبات التعديل المعلقة' : 'Pending Curator Revisions'}
            </span>
            <span className="text-xs font-mono font-semibold text-[#000000]">
              {submissions.length} {lang === 'ar' ? 'طلبات بانتظار الفحص' : 'Awaiting Audit'}
            </span>
          </div>

          {submissions.length === 0 ? (
            <div className="py-12 text-center text-xs font-mono text-[#595855]">
              {lang === 'ar' ? 'لا توجد طلبات معلقة حالياً.' : 'All venue revisions reviewed and clear.'}
            </div>
          ) : (
            submissions.map(sub => (
              <div 
                key={sub.id}
                className="p-4 sm:p-5 rounded-[9px] bg-[#ebebeb] border border-[#dfdcd5] space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="font-serif text-lg font-normal text-[#000000]">
                      {sub.venueName}
                    </h4>
                    <div className="flex items-center gap-2 text-xs font-mono text-[#595855]">
                      <span>{sub.editor}</span>
                      <span>•</span>
                      <span>{sub.submittedAt}</span>
                      <span>•</span>
                      <span className="text-[#000000] font-semibold">{sub.version}</span>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-[28.8px] bg-[#dfdcd5] text-[10px] font-mono uppercase text-[#000000] self-start sm:self-auto">
                    <span>Pending Curator Review</span>
                  </span>
                </div>

                <p className="text-xs text-[#595855] leading-relaxed font-sans bg-[#ffffff] p-3 rounded-[6px] border border-[#dfdcd5]">
                  {sub.summary}
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                  <div className="text-[11px] font-mono text-[#595855] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#000000]" />
                    <span>{sub.safetyChecks}</span>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={() => handleReject(sub.id)}
                      className="px-3 py-1.5 rounded-[28.8px] border border-[#dfdcd5] text-xs font-mono uppercase text-[#595855] hover:text-[#000000] hover:bg-[#dfdcd5] cursor-pointer"
                    >
                      {lang === 'ar' ? 'طلب تعديل' : 'Request Changes'}
                    </button>

                    <button
                      onClick={() => handleApprove(sub.id)}
                      className="btn-pill-ink px-4 py-1.5 text-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{lang === 'ar' ? 'اعتماد ونشر' : 'Approve & Land'}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-[#dfdcd5] bg-[#ebebeb] flex items-center justify-end shrink-0">
          <button
            onClick={onClose}
            className="btn-pill-ink px-6 py-2 tap-bounce cursor-pointer text-xs"
          >
            <span>{t.modalClose}</span>
          </button>
        </div>

      </motion.div>

    </div>
  )
}
