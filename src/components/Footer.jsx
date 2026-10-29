import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { HelpCircle, X, Send, RotateCcw } from 'lucide-react'
import { WeddoLogo } from './WeddoLogo'

export function Footer({ lang, t, onReplayPreloader }) {
  const [supportModalOpen, setSupportModalOpen] = useState(false)
  const [supportSubject, setSupportSubject] = useState('')
  const [supportMessage, setSupportMessage] = useState('')
  const [supportSent, setSupportSent] = useState(false)

  const handleSendSupport = (e) => {
    e.preventDefault()
    setSupportSent(true)
    setTimeout(() => {
      setSupportSent(false)
      setSupportModalOpen(false)
      setSupportSubject('')
      setSupportMessage('')
    }, 2000)
  }

  return (
    <footer className="bg-[#c4c3b6] dark:bg-[#121210] border-t border-[#dfdcd5] dark:border-[#2e2d28] pt-16 pb-12 transition-colors text-[#000000] dark:text-[#f5f5f3]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#dfdcd5] dark:border-[#2e2d28]">
          
          {/* Col 1: Brand & Egypt Identity */}
          <div className="md:col-span-1 space-y-4">
            <WeddoLogo size="default" lang={lang} />

            <p className="text-[14px] text-[#595855] dark:text-[#a8a69e] leading-relaxed font-sans">
              {t.brandTagline}
            </p>

            <div className="text-[11px] text-[#000000] dark:text-[#f5f5f3] font-mono tracking-wider uppercase flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#000000] dark:bg-[#f5f5f3]" />
              <span>CAIRO • GIZA • NEW CAIRO • RED SEA</span>
            </div>

            {/* Replay Preloader Button */}
            {onReplayPreloader && (
              <button
                onClick={onReplayPreloader}
                className="inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-[#595855] dark:text-[#a8a69e] hover:text-[#000000] dark:hover:text-[#f5f5f3] underline underline-offset-4 cursor-pointer pt-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'إعادة عرض شاشة البداية ↺' : 'Replay Gallery Intro ↺'}</span>
              </button>
            )}
          </div>

          {/* Col 2: Top Egyptian Areas */}
          <div className="space-y-3 font-medium">
            <h4 className="text-[12px] font-mono uppercase tracking-widest text-[#000000] dark:text-[#f5f5f3]">
              {lang === 'ar' ? 'مناطق مصر الأكثر طلباً' : 'Premier Egyptian Areas'}
            </h4>
            <ul className="space-y-2 text-[13px] text-[#595855] dark:text-[#a8a69e]">
              <li><a href="#/venues" className="hover:text-[#000000] dark:hover:text-[#f5f5f3] transition-colors">{lang === 'ar' ? 'التجمع الخامس والقاهرة الجديدة' : 'New Cairo / 5th Settlement'}</a></li>
              <li><a href="#/venues" className="hover:text-[#000000] dark:hover:text-[#f5f5f3] transition-colors">{lang === 'ar' ? 'كورنيش النيل وجاردن سيتي' : 'Nile Corniche & Garden City'}</a></li>
              <li><a href="#/venues" className="hover:text-[#000000] dark:hover:text-[#f5f5f3] transition-colors">{lang === 'ar' ? 'هضبة الأهرامات والجيزة' : 'Pyramids Plateau & Giza'}</a></li>
              <li><a href="#/venues" className="hover:text-[#000000] dark:hover:text-[#f5f5f3] transition-colors">{lang === 'ar' ? 'الشيخ زايد ومدينة ٦ أكتوبر' : 'Sheikh Zayed & 6th of October'}</a></li>
              <li><a href="#/venues" className="hover:text-[#000000] dark:hover:text-[#f5f5f3] transition-colors">{lang === 'ar' ? 'كورنيش الإسكندرية والساحل' : 'Alexandria Waterfront & Corniche'}</a></li>
            </ul>
          </div>

          {/* Col 3: Dedicated Feature Pages */}
          <div className="space-y-3 font-medium">
            <h4 className="text-[12px] font-mono uppercase tracking-widest text-[#000000] dark:text-[#f5f5f3]">
              {lang === 'ar' ? 'صفحات المنظومة' : 'Platform Portals'}
            </h4>
            <ul className="space-y-2 text-[13px] text-[#595855] dark:text-[#a8a69e]">
              <li><a href="#/venues" className="hover:text-[#000000] dark:hover:text-[#f5f5f3] transition-colors">{lang === 'ar' ? 'أرشيف القاعات والقصور' : 'Venues Catalog'}</a></li>
              <li><a href="#/planning" className="hover:text-[#000000] dark:hover:text-[#f5f5f3] transition-colors">{lang === 'ar' ? 'ستوديو فوليا ومخطط المقاعد' : 'Folia Planning Suite'}</a></li>
              <li><a href="#/pricing" className="hover:text-[#000000] dark:hover:text-[#f5f5f3] transition-colors">{lang === 'ar' ? 'باقات الأسعار والعضويات' : 'Pricing & Pass Plans'}</a></li>
              <li><a href="#/vendor-ops" className="hover:text-[#000000] dark:hover:text-[#f5f5f3] transition-colors">{lang === 'ar' ? 'بوابة مديري وملاك القاعات' : 'Estate Operations Portal'}</a></li>
              <li><a href="#/compliance" className="hover:text-[#000000] dark:hover:text-[#f5f5f3] transition-colors">{lang === 'ar' ? 'معايير الأمان والتراخيص' : 'Safety & Audit Hub'}</a></li>
            </ul>
          </div>

          {/* Col 4: Local Support & Trust */}
          <div className="space-y-3">
            <h4 className="text-[12px] font-mono uppercase tracking-widest text-[#000000] dark:text-[#f5f5f3]">
              {lang === 'ar' ? 'الدعم وخدمة العملاء' : 'Local Concierge & Desk'}
            </h4>
            <p className="text-[13px] text-[#595855] dark:text-[#a8a69e] leading-relaxed font-sans">
              {lang === 'ar' ? 'فريق دعم محلي لمساعدتك في استفسارات القاعات وتأكيد الحجوزات.' : 'Local gallery concierge support for venue inquiries and booking assistance.'}
            </p>
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => setSupportModalOpen(true)}
              className="tap-bounce inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[28.8px] bg-[#e7e5e4] dark:bg-[#1c1b18] text-xs font-sans font-medium text-[#000000] dark:text-[#f5f5f3] hover:bg-[#dfdcd5] dark:hover:bg-[#282723] border border-[#dfdcd5] dark:border-[#2e2d28] transition-colors cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5 text-[#000000] dark:text-[#f5f5f3]" />
              <span>{lang === 'ar' ? 'تواصل مع الدعم المحلي' : 'Contact Local Support'}</span>
            </motion.button>
          </div>

        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#595855] dark:text-[#a8a69e]">
          <p className="text-center sm:text-left">
            {t.footerDisclaimer}
          </p>
          <p className="text-center sm:text-right shrink-0">
            {t.footerCopyright}
          </p>
        </div>

      </div>

      {/* Support Ticket Modal */}
      <AnimatePresence>
        {supportModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSupportModalOpen(false)} 
              className="fixed inset-0 bg-[#000000]/60 backdrop-blur-xs" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md rounded-[9px] bg-[#e7e5e4] dark:bg-[#1c1b18] border border-[#dfdcd5] dark:border-[#2e2d28] p-6 sm:p-7 z-10 shadow-2xl text-[#000000] dark:text-[#f5f5f3]"
            >
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#dfdcd5] dark:border-[#2e2d28]">
                <h3 className="font-serif text-xl font-normal text-[#000000] dark:text-[#f5f5f3]">
                  {lang === 'ar' ? 'تذكرة دعم محلي' : 'Local Concierge Ticket'}
                </h3>
                <button 
                  onClick={() => setSupportModalOpen(false)} 
                  className="p-1 rounded-full text-[#595855] dark:text-[#a8a69e] hover:bg-[#dfdcd5] dark:hover:bg-[#282723] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {supportSent ? (
                <div className="py-8 text-center text-xs text-[#000000] dark:text-[#f5f5f3] font-mono space-y-2">
                  <div className="text-base font-semibold">✓ {lang === 'ar' ? 'تم تسجيل التذكرة بنجاح في النظام المحلي!' : 'Ticket logged in the gallery register!'}</div>
                  <div className="text-[#595855] dark:text-[#a8a69e] font-normal">{lang === 'ar' ? 'يمكن متابعة الرد عبر المشرف المحلي.' : 'A local concierge will review your message.'}</div>
                </div>
              ) : (
                <form onSubmit={handleSendSupport} className="space-y-4">
                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-[#000000] dark:text-[#f5f5f3] block mb-1">
                      {lang === 'ar' ? 'موضوع الاستفسار' : 'Subject'}
                    </label>
                    <input
                      type="text"
                      required
                      value={supportSubject}
                      onChange={(e) => setSupportSubject(e.target.value)}
                      placeholder={lang === 'ar' ? 'استفسار عن إتاحة قاعة أو باقة...' : 'Venue inquiry, package clarification...'}
                      className="w-full h-11 sm:h-10 px-3 text-base sm:text-xs rounded-[6px] bg-[#ffffff] dark:bg-[#282723] border border-[#dfdcd5] dark:border-[#2e2d28] text-[#000000] dark:text-[#f5f5f3] focus:outline-none focus:border-[#000000] dark:focus:border-[#f5f5f3]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-[#000000] dark:text-[#f5f5f3] block mb-1">
                      {lang === 'ar' ? 'الرسالة' : 'Message'}
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={supportMessage}
                      onChange={(e) => setSupportMessage(e.target.value)}
                      placeholder={lang === 'ar' ? 'اكتب تفاصيل استفسارك...' : 'Describe how we can assist you...'}
                      className="w-full p-3 text-base sm:text-xs rounded-[6px] bg-[#ffffff] dark:bg-[#282723] border border-[#dfdcd5] dark:border-[#2e2d28] text-[#000000] dark:text-[#f5f5f3] focus:outline-none focus:border-[#000000] dark:focus:border-[#f5f5f3]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-pill-ink dark:bg-[#f5f5f3] dark:text-[#0b0b0a] w-full py-2.5 flex items-center justify-center gap-2 tap-bounce cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5 text-[#ffffff] dark:text-[#0b0b0a]" />
                    <span>{lang === 'ar' ? 'إرسال التذكرة' : 'Submit Ticket'}</span>
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  )
}
