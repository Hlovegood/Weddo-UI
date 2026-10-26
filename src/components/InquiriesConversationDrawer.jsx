import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, MessageSquare, Send, Clock, Building2, User } from 'lucide-react'
import { formatEGP } from '../lib/utils'

export function InquiriesConversationDrawer({
  inquiries,
  isOpen,
  onClose,
  onSendReply,
  lang,
  t
}) {
  if (!isOpen) return null

  const [selectedInquiryId, setSelectedInquiryId] = useState(inquiries[0]?.id || '')
  const [replyText, setReplyText] = useState('')

  const activeInquiry = inquiries.find(inq => inq.id === selectedInquiryId) || inquiries[0]

  const handleSend = (e) => {
    e.preventDefault()
    if (!replyText.trim() || !activeInquiry) return

    onSendReply(activeInquiry.id, replyText)
    setReplyText('')
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-[#000000]/70 backdrop-blur-xs transition-opacity" 
      />

      {/* Slide-in Drawer per Design.md: Bone #e7e5e4, hairline #dfdcd5 */}
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        className="relative w-full max-w-2xl bg-[#e7e5e4] border-l border-[#dfdcd5] z-10 flex flex-col h-full shadow-2xl text-[#000000]"
      >
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-[#dfdcd5] flex items-center justify-between shrink-0 bg-[#ebebeb]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-[#dfdcd5] text-[#000000]">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-normal text-[#000000]">
                {t.inquiriesDrawerTitle}
              </h3>
              <span className="text-xs font-mono uppercase text-[#595855]">
                {inquiries.length} {lang === 'ar' ? 'محادثات استفسار نشطة' : 'Active Venue Conversations'}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#dfdcd5] text-[#595855] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Inquiries Pill Switcher */}
        {inquiries.length > 1 && (
          <div className="p-3 border-b border-[#dfdcd5] bg-[#ebebeb] flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
            {inquiries.map(inq => {
              const vName = inq.venueName[lang] || inq.venueName.en
              const isSelected = inq.id === selectedInquiryId
              return (
                <button
                  key={inq.id}
                  onClick={() => setSelectedInquiryId(inq.id)}
                  className={`tap-bounce whitespace-nowrap px-3.5 py-1.5 rounded-[28.8px] text-xs font-mono uppercase border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#000000] text-[#ffffff] border-[#000000]'
                      : 'border-[#dfdcd5] bg-[#e7e5e4] text-[#595855] hover:text-[#000000]'
                  }`}
                >
                  {vName}
                </button>
              )
            })}
          </div>
        )}

        {/* Conversation Thread & Snapshot */}
        {activeInquiry ? (
          <div className="flex-1 flex flex-col justify-between overflow-hidden">
            
            {/* Snapshot Summary Banner */}
            <div className="p-4 bg-[#ebebeb] border-b border-[#dfdcd5] text-xs space-y-2 shrink-0">
              <div className="flex items-center justify-between">
                <span className="font-serif text-base font-normal text-[#000000]">
                  {activeInquiry.venueName[lang] || activeInquiry.venueName.en}
                </span>

                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-[28.8px] text-[10px] font-mono uppercase bg-[#dfdcd5] text-[#000000]">
                  <Clock className="w-3 h-3 text-[#000000]" />
                  <span>{t.inquiryStatusUnderReview}</span>
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono text-[#595855] pt-1">
                <div>
                  <span className="text-[#808080] block text-[10px] uppercase">{t.inquiryEventDate}</span>
                  <strong className="text-[#000000] font-medium">{activeInquiry.date} ({activeInquiry.session})</strong>
                </div>
                <div>
                  <span className="text-[#808080] block text-[10px] uppercase">{t.searchGuests}</span>
                  <strong className="text-[#000000] font-medium">{activeInquiry.guestCount} {t.guestsLabel}</strong>
                </div>
                <div>
                  <span className="text-[#808080] block text-[10px] uppercase">{t.inquirySpace}</span>
                  <strong className="text-[#000000] font-medium truncate block">{activeInquiry.spaceSnapshot?.name?.[lang] || activeInquiry.spaceSnapshot?.name?.en}</strong>
                </div>
                <div>
                  <span className="text-[#808080] block text-[10px] uppercase">{t.inquiryPackage}</span>
                  <strong className="text-[#000000] font-semibold">{formatEGP(activeInquiry.packageSnapshot?.price, lang)}</strong>
                </div>
              </div>
            </div>

            {/* Message Stream */}
            <div className="p-5 overflow-y-auto flex-1 space-y-4 bg-[#e7e5e4]">
              {activeInquiry.messages?.map(msg => {
                const isClient = msg.senderRole === 'client'
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={msg.id}
                    className={`flex flex-col ${isClient ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 text-[10px] font-mono uppercase text-[#595855]">
                      <span>{msg.author}</span>
                      <span>•</span>
                      <span>{msg.timestamp}</span>
                    </div>

                    <div
                      className={`max-w-[85%] p-3.5 rounded-[9px] text-xs sm:text-sm leading-relaxed ${
                        isClient
                          ? 'bg-[#000000] text-[#ffffff]'
                          : 'bg-[#ffffff] text-[#000000] border border-[#dfdcd5]'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSend} className="p-4 border-t border-[#dfdcd5] bg-[#ebebeb] shrink-0">
              <div className="relative">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={lang === 'ar' ? 'اكتب ردك لمنسق القاعة...' : 'Type your message to venue coordinator...'}
                  className="w-full h-11 pl-4 pr-20 text-xs sm:text-sm rounded-[28.8px] bg-[#ffffff] border border-[#dfdcd5] text-[#000000] focus:outline-none focus:border-[#000000]"
                />
                <button
                  type="submit"
                  className="btn-pill-ink absolute inset-y-1.5 right-1.5 flex items-center gap-1.5 py-1 px-4 cursor-pointer text-xs"
                >
                  <Send className="w-3 h-3 text-[#ffffff]" />
                  <span>{lang === 'ar' ? 'إرسال' : 'Send'}</span>
                </button>
              </div>
            </form>

          </div>
        ) : (
          <div className="p-12 text-center text-xs font-mono text-[#595855]">
            No inquiries active.
          </div>
        )}

      </motion.div>

    </div>
  )
}
