import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { GradientButton } from './kokonutui/GradientButton'
import { X, MessageSquare, Send, Clock, User, Building, CheckCheck } from 'lucide-react'

export function InquiriesConversationDrawer({
  isOpen,
  onClose,
  inquiries,
  lang = 'en',
  t,
  onSendMessage
}) {
  const [activeInquiryId, setActiveInquiryId] = useState(inquiries[0]?.id || '')
  const [replyText, setReplyText] = useState('')

  if (!isOpen) return null

  const activeInquiry = inquiries.find((i) => i.id === activeInquiryId) || inquiries[0]

  const handleSend = (e) => {
    e.preventDefault()
    if (!replyText.trim() || !activeInquiry) return
    onSendMessage(activeInquiry.id, replyText)
    setReplyText('')
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
          className="relative w-full max-w-4xl bg-[#141211] border border-[#27221e] rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col h-[85vh]"
        >
          {/* Header */}
          <div className="p-5 border-b border-[#27221e] flex items-center justify-between bg-[#0e0d0c]/80 shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#dfc086]/15 text-[#dfc086]">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-[#fdfbf7]">{t.inquiriesTitle}</h3>
                <p className="text-xs text-[#a89d91]">{t.inquiriesSubtitle}</p>
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

          {/* Inquiries Layout */}
          {inquiries.length === 0 ? (
            <div className="p-12 text-center my-auto">
              <MessageSquare className="w-12 h-12 text-[#524538] mx-auto mb-3" />
              <h4 className="text-base font-serif font-bold text-[#fdfbf7] mb-1">
                {lang === 'ar' ? 'لا توجد استفسارات مرسلة' : 'No Inquiries Yet'}
              </h4>
              <p className="text-xs text-[#a89d91] max-w-sm mx-auto">{t.emptyInquiries}</p>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
              {/* Left sidebar: list of inquiries */}
              <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-[#27221e] bg-[#0e0d0c]/50 p-3 overflow-y-auto shrink-0 space-y-2">
                {inquiries.map((inq) => {
                  const isSelected = inq.id === activeInquiry?.id
                  return (
                    <div
                      key={inq.id}
                      onClick={() => setActiveInquiryId(inq.id)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#dfc086]/10 border-[#dfc086]/50 shadow-[0_0_15px_rgba(223,192,134,0.12)]'
                          : 'bg-[#181513] border-[#27221e] hover:border-[#3d342c]'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-serif font-bold text-[#fdfbf7] truncate">
                          {lang === 'ar' ? inq.venueName.ar : inq.venueName.en}
                        </span>
                        <span className="text-[10px] text-[#dfc086] font-mono">
                          {inq.packageSnapshot.price.toLocaleString()} EGP
                        </span>
                      </div>
                      <div className="text-[11px] text-[#a89d91]">
                        {inq.date} • {inq.spaceSnapshot.name[lang] || inq.spaceSnapshot.name.en}
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#dfc086]/10 text-[#dfc086] border border-[#dfc086]/20">
                          {t.statusOfferSent}
                        </span>
                        <span className="text-[10px] text-[#786e64]">{inq.messages.length} msgs</span>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Right panel: Active conversation stream */}
              {activeInquiry && (
                <div className="flex flex-col flex-1 overflow-hidden bg-[#141211]/60">
                  {/* Inquiry Header Snapshot */}
                  <div className="p-3.5 bg-[#0e0d0c]/80 border-b border-[#27221e] flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[#a89d91]">{lang === 'ar' ? 'الطلب المسجل لـ:' : 'Booking Date: '}</span>
                      <strong className="text-[#fdfbf7] ml-1">{activeInquiry.date}</strong>
                      <span className="text-[#524538] mx-2">|</span>
                      <span className="text-[#a89d91]">{lang === 'ar' ? 'الضيوف:' : 'Guests: '}</span>
                      <strong className="text-[#fdfbf7] ml-1">{activeInquiry.guestCount}</strong>
                    </div>
                    <div className="text-right">
                      <span className="text-[#a89d91]">{lang === 'ar' ? 'السعر المثبت:' : 'Locked Rate: '}</span>
                      <strong className="text-[#dfc086] font-mono ml-1">
                        {activeInquiry.packageSnapshot.price.toLocaleString()} EGP
                      </strong>
                    </div>
                  </div>

                  {/* Messages Bubble List */}
                  <div className="p-4 overflow-y-auto flex-1 space-y-3">
                    {activeInquiry.messages.map((msg) => {
                      const isCustomer = msg.sender === 'customer'
                      return (
                        <div
                          key={msg.id}
                          className={`flex flex-col ${isCustomer ? 'items-end' : 'items-start'}`}
                        >
                          <div className="flex items-center gap-1.5 text-[11px] text-[#786e64] mb-1">
                            {isCustomer ? (
                              <>
                                <span>{msg.senderName}</span>
                                <User className="w-3 h-3" />
                              </>
                            ) : (
                              <>
                                <Building className="w-3 h-3 text-[#dfc086]" />
                                <span className="text-[#dfc086] font-medium">{msg.senderName}</span>
                              </>
                            )}
                            <span className="text-[10px]">({msg.timestamp})</span>
                          </div>

                          <div
                            className={`p-3 rounded-2xl max-w-md text-xs leading-relaxed ${
                              isCustomer
                                ? 'bg-gradient-to-r from-[#dfc086] to-[#ceab68] text-[#0e0d0c] font-medium rounded-tr-none shadow'
                                : 'bg-[#1e1a17] text-[#d6cebf] border border-[#2c2621] rounded-tl-none shadow'
                            }`}
                          >
                            {msg.text}
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Reply Composer */}
                  <form onSubmit={handleSend} className="p-3 border-t border-[#27221e] bg-[#0e0d0c]/80 flex gap-2">
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder={t.typeMessagePlaceholder}
                      className="flex-1 bg-[#181513] border border-[#27221e] rounded-xl px-4 py-2.5 text-xs text-[#fdfbf7] focus:outline-none focus:border-[#dfc086]/60 focus:ring-1 focus:ring-[#dfc086]/20 placeholder-[#786e64]"
                    />
                    <GradientButton type="submit" size="sm" variant="primary" icon={Send}>
                      {t.sendMessage}
                    </GradientButton>
                  </form>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
export default InquiriesConversationDrawer
