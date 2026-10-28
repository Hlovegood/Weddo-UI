import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, BriefcaseBusiness, Plus, Calendar, Save, Trash2, Building2, CheckCircle2 } from 'lucide-react'
import { formatEGP } from '../lib/utils'

export function OwnerDashboardModal({
  venue,
  isOpen,
  onClose,
  lang,
  t
}) {
  if (!isOpen) return null

  const [activeTab, setActiveTab] = useState('spaces')
  
  const [spaces, setSpaces] = useState(venue?.spaces || [
    {
      id: 'grand-lawn',
      name: { en: 'The Royal Olive Lawn', ar: 'المسطح الأخضر الملكي' },
      capacity: 480,
      type: { en: 'Open-Air Amphitheater Lawn', ar: 'حديقة مفتوحة مدرجة' },
      isAcceptingInquiries: true
    },
    {
      id: 'andalusian-court',
      name: { en: 'Andalusian Courtyard', ar: 'الفناء الأندلسي المسقوف' },
      capacity: 150,
      type: { en: 'Paved Courtyard', ar: 'فناء رخامي بنوافير' },
      isAcceptingInquiries: true
    }
  ])

  const [packages, setPackages] = useState(venue?.packages || [
    {
      id: 'essential',
      name: { en: 'Boutique Garden Hire', ar: 'باقة الحديقة الحصرية' },
      price: 145000,
      currency: 'EGP'
    },
    {
      id: 'celebration',
      name: { en: 'Royal Emerald Gala Experience', ar: 'تجربة الزمرد الملكية الشاملة' },
      price: 215000,
      currency: 'EGP'
    }
  ])

  const [blockedDates, setBlockedDates] = useState([
    { spaceId: 'grand-lawn', date: '2026-11-20', session: 'evening', actor: 'Owner', timestamp: '2026-10-18 14:32' },
    { spaceId: 'andalusian-court', date: '2026-12-05', session: 'day', actor: 'Owner', timestamp: '2026-10-19 09:15' },
  ])

  const [newBlockDate, setNewBlockDate] = useState('2026-12-25')
  const [newBlockSession, setNewBlockSession] = useState('evening')
  const [newBlockSpaceId, setNewBlockSpaceId] = useState(spaces[0]?.id || '')

  const handleAddBlock = () => {
    setBlockedDates(prev => [
      ...prev,
      {
        spaceId: newBlockSpaceId,
        date: newBlockDate,
        session: newBlockSession,
        actor: 'Venue Owner (You)',
        timestamp: new Date().toLocaleString()
      }
    ])
  }

  const handleRemoveBlock = (idx) => {
    setBlockedDates(prev => prev.filter((_, i) => i !== idx))
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
        className="relative w-full max-w-4xl rounded-[12px] sm:rounded-[9px] bg-[#e7e5e4] dark:bg-[#1c1b18] border border-[#dfdcd5] dark:border-[#2e2d28] overflow-hidden z-10 flex flex-col max-h-[92vh] sm:max-h-[90vh] shadow-2xl text-[#000000] dark:text-[#f5f5f3]"
      >
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-[#dfdcd5] dark:border-[#2e2d28] flex items-center justify-between shrink-0 bg-[#ebebeb] dark:bg-[#141412]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-[#dfdcd5] dark:bg-[#282723] text-[#000000] dark:text-[#f5f5f3]">
              <BriefcaseBusiness className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#000000] dark:text-[#f5f5f3]">
                {t.ownerTitle}
              </h3>
              <p className="text-xs font-mono uppercase text-[#595855] dark:text-[#a8a69e]">
                {t.ownerSubtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#595855] dark:text-[#a8a69e] hover:bg-[#dfdcd5] dark:hover:bg-[#282723] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Segmented Pill Tabs */}
        <div className="flex items-center border-b border-[#dfdcd5] dark:border-[#2e2d28] px-4 sm:px-6 bg-[#ebebeb] dark:bg-[#141412] shrink-0 overflow-x-auto scrollbar-none flex-nowrap">
          <button
            onClick={() => setActiveTab('spaces')}
            className={`py-3 px-3 sm:px-4 text-xs font-mono uppercase tracking-wider border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'spaces'
                ? 'border-[#000000] dark:border-[#f5f5f3] text-[#000000] dark:text-[#f5f5f3] font-semibold'
                : 'border-transparent text-[#595855] dark:text-[#a8a69e] hover:text-[#000000] dark:hover:text-[#f5f5f3]'
            }`}
          >
            {t.ownerTabSpaces}
          </button>
          <button
            onClick={() => setActiveTab('packages')}
            className={`py-3 px-3 sm:px-4 text-xs font-mono uppercase tracking-wider border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'packages'
                ? 'border-[#000000] dark:border-[#f5f5f3] text-[#000000] dark:text-[#f5f5f3] font-semibold'
                : 'border-transparent text-[#595855] dark:text-[#a8a69e] hover:text-[#000000] dark:hover:text-[#f5f5f3]'
            }`}
          >
            {t.ownerTabPackages}
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            className={`py-3 px-3 sm:px-4 text-xs font-mono uppercase tracking-wider border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'calendar'
                ? 'border-[#000000] dark:border-[#f5f5f3] text-[#000000] dark:text-[#f5f5f3] font-semibold'
                : 'border-transparent text-[#595855] dark:text-[#a8a69e] hover:text-[#000000] dark:hover:text-[#f5f5f3]'
            }`}
          >
            {t.ownerTabCalendar}
          </button>
        </div>

        {/* Body Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: Spaces Configuration */}
          {activeTab === 'spaces' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono uppercase text-[#595855] dark:text-[#a8a69e]">
                  {lang === 'ar' ? 'المساحات المعمارية النشطة' : 'Active Spaces & Capacities'}
                </span>

                <button
                  onClick={() => {
                    const newSpace = {
                      id: `space-${Date.now()}`,
                      name: { en: 'New Banquet Hall', ar: 'قاعة جديدة' },
                      capacity: 200,
                      type: { en: 'Indoor Ballroom', ar: 'قاعة داخلية' },
                      isAcceptingInquiries: true
                    }
                    setSpaces(prev => [...prev, newSpace])
                  }}
                  className="tap-bounce flex items-center gap-1.5 px-3 py-1.5 rounded-[28.8px] bg-[#000000] dark:bg-[#f5f5f3] text-[#ffffff] dark:text-[#0b0b0a] text-xs font-mono uppercase cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'إضافة مساحة جديدة' : 'Add Space'}</span>
                </button>
              </div>

              {spaces.map(space => (
                <div key={space.id} className="p-4 rounded-[9px] bg-[#ebebeb] dark:bg-[#282723]/60 border border-[#dfdcd5] dark:border-[#2e2d28] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-serif text-lg font-normal text-[#000000] dark:text-[#f5f5f3]">
                      {space.name[lang] || space.name.en}
                    </h4>
                    <span className="text-xs font-mono text-[#595855] dark:text-[#a8a69e] uppercase">
                      {space.type[lang] || space.type.en} • {space.capacity} {t.guestsLabel}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono uppercase text-[#595855] dark:text-[#a8a69e]">
                      {space.isAcceptingInquiries ? 'Accepting' : 'Paused'}
                    </span>
                    <button
                      onClick={() => setSpaces(prev => prev.filter(s => s.id !== space.id))}
                      className="p-1.5 text-[#595855] dark:text-[#a8a69e] hover:text-[#000000] dark:hover:text-[#f5f5f3] cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: Packages Configuration */}
          {activeTab === 'packages' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono uppercase text-[#595855] dark:text-[#a8a69e]">
                  {lang === 'ar' ? 'باقات الأسعار المعتمدة' : 'Official Published Packages'}
                </span>
              </div>

              {packages.map(pkg => (
                <div key={pkg.id} className="p-4 rounded-[9px] bg-[#ebebeb] dark:bg-[#282723]/60 border border-[#dfdcd5] dark:border-[#2e2d28] flex items-center justify-between gap-4">
                  <div>
                    <h4 className="font-serif text-lg font-normal text-[#000000] dark:text-[#f5f5f3]">
                      {pkg.name[lang] || pkg.name.en}
                    </h4>
                    <span className="text-xs font-mono text-[#595855] dark:text-[#a8a69e]">
                      {formatEGP(pkg.price, lang)}
                    </span>
                  </div>

                  <button
                    onClick={() => setPackages(prev => prev.filter(p => p.id !== pkg.id))}
                    className="p-1.5 text-[#595855] dark:text-[#a8a69e] hover:text-[#000000] dark:hover:text-[#f5f5f3] cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: Blocked Dates Calendar */}
          {activeTab === 'calendar' && (
            <div className="space-y-4">
              <div className="p-4 rounded-[9px] bg-[#ebebeb] dark:bg-[#282723]/60 border border-[#dfdcd5] dark:border-[#2e2d28] space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#000000] dark:text-[#f5f5f3]">
                  {lang === 'ar' ? 'حظر موعد لمنع استلام استفسارات' : 'Block Date from Public Inquiries'}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="date"
                    value={newBlockDate}
                    onChange={(e) => setNewBlockDate(e.target.value)}
                    className="h-10 px-3 text-base sm:text-xs rounded-[6px] bg-[#ffffff] dark:bg-[#1c1b18] border border-[#dfdcd5] dark:border-[#2e2d28] text-[#000000] dark:text-[#f5f5f3]"
                  />

                  <select
                    value={newBlockSession}
                    onChange={(e) => setNewBlockSession(e.target.value)}
                    className="h-10 px-3 text-base sm:text-xs rounded-[6px] bg-[#ffffff] dark:bg-[#1c1b18] border border-[#dfdcd5] dark:border-[#2e2d28] text-[#000000] dark:text-[#f5f5f3] cursor-pointer"
                  >
                    <option value="day">{t.sessionDay}</option>
                    <option value="evening">{t.sessionEvening}</option>
                    <option value="full_day">{lang === 'ar' ? 'اليوم بالكامل' : 'Full Day'}</option>
                  </select>

                  <button
                    onClick={handleAddBlock}
                    className="btn-pill-ink dark:bg-[#f5f5f3] dark:text-[#0b0b0a] min-h-[40px] text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{lang === 'ar' ? 'إضافة الحظر' : 'Apply Block'}</span>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono uppercase text-[#595855] dark:text-[#a8a69e] block">
                  {lang === 'ar' ? 'المواعيد المحظورة حالياً' : 'Current Active Block Records'}
                </span>

                {blockedDates.map((block, idx) => (
                  <div key={idx} className="p-3 rounded-[9px] bg-[#ebebeb] dark:bg-[#282723]/60 border border-[#dfdcd5] dark:border-[#2e2d28] flex items-center justify-between text-xs font-mono">
                    <div>
                      <strong className="text-[#000000] dark:text-[#f5f5f3]">{block.date}</strong> ({block.session}) • <span className="text-[#595855] dark:text-[#a8a69e]">{block.actor}</span>
                    </div>
                    <button
                      onClick={() => handleRemoveBlock(idx)}
                      className="p-1.5 text-[#595855] dark:text-[#a8a69e] hover:text-[#000000] dark:hover:text-[#f5f5f3] cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-[#dfdcd5] dark:border-[#2e2d28] bg-[#ebebeb] dark:bg-[#141412] flex items-center justify-between shrink-0">
          <span className="text-xs font-mono uppercase text-[#595855] dark:text-[#a8a69e]">
            WEDDO OPERATOR CONSOLE
          </span>

          <button
            onClick={onClose}
            className="btn-pill-ink dark:bg-[#f5f5f3] dark:text-[#0b0b0a] px-6 py-2 min-h-[40px] tap-bounce cursor-pointer text-xs"
          >
            <span>{t.modalClose}</span>
          </button>
        </div>

      </motion.div>

    </div>
  )
}
