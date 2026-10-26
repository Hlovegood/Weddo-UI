import React, { useState } from 'react'
import { 
  BriefcaseBusiness, 
  Trash2, 
  CheckCircle2, 
  ShieldCheck, 
  Phone, 
  Lock, 
  Unlock
} from 'lucide-react'
import { sound } from '../lib/sound'
import { getAreaLabel } from '../data/venues'

export function VendorPortalPage({ venues, lang, t }) {
  const [selectedVenueId, setSelectedVenueId] = useState(venues[0]?.id || 'olive-garden')
  const currentVenue = venues.find(v => v.id === selectedVenueId) || venues[0]

  const [activeTab, setActiveTab] = useState('spaces') // 'spaces' | 'calendar' | 'inquiries' | 'docs'

  // Spaces state
  const [spaces, setSpaces] = useState([
    {
      id: 'grand-lawn',
      name: { en: 'The Royal Olive Lawn', ar: 'المسطح الأخضر الملكي' },
      capacity: 480,
      areaSqM: 1450,
      minSpend: 180000,
      isAcceptingInquiries: true
    },
    {
      id: 'andalusian-court',
      name: { en: 'Andalusian Courtyard', ar: 'الفناء الأندلسي المسقوف' },
      capacity: 150,
      areaSqM: 520,
      minSpend: 85000,
      isAcceptingInquiries: true
    },
    {
      id: 'glass-conservatory',
      name: { en: 'The Glass Conservatory', ar: 'الكونسرفتوار الزجاجي المعزول' },
      capacity: 320,
      areaSqM: 880,
      minSpend: 135000,
      isAcceptingInquiries: false
    }
  ])

  // Blocked dates state
  const [blockedDates, setBlockedDates] = useState([
    { spaceId: 'grand-lawn', spaceName: 'The Royal Olive Lawn', date: '2026-11-20', session: 'Evening Gala', reason: 'Royal Wedding Lock' },
    { spaceId: 'andalusian-court', spaceName: 'Andalusian Courtyard', date: '2026-12-05', session: 'Day Session', reason: 'Corporate Katb Ketab' },
    { spaceId: 'grand-lawn', spaceName: 'The Royal Olive Lawn', date: '2026-12-31', session: 'Evening Gala', reason: 'New Year Private Gala' }
  ])

  const [newBlockDate, setNewBlockDate] = useState('2026-11-28')
  const [newBlockSession, setNewBlockSession] = useState('Evening Gala (6 PM - 2 AM)')
  const [newBlockSpace, setNewBlockSpace] = useState('The Royal Olive Lawn')
  const [newBlockReason, setNewBlockReason] = useState('Confirmed Booking')

  // Inquiries Pipeline state
  const [pipelineInquiries, setPipelineInquiries] = useState([
    {
      id: 'inq-101',
      couple: 'Nour & Omar',
      date: '2026-11-20',
      session: 'Evening Gala',
      guests: 240,
      space: 'The Royal Olive Lawn',
      package: 'Royal Emerald Gala Experience (215,000 EGP)',
      status: 'tasting_scheduled',
      phone: '01012345678'
    },
    {
      id: 'inq-102',
      couple: 'Yasmine & Tarek',
      date: '2026-12-18',
      session: 'Day Katb Ketab',
      guests: 120,
      space: 'Andalusian Courtyard',
      package: 'Boutique Garden Hire (145,000 EGP)',
      status: 'under_review',
      phone: '01198765432'
    },
    {
      id: 'inq-103',
      couple: 'Farida & Sherif',
      date: '2027-01-15',
      session: 'Evening Gala',
      guests: 380,
      space: 'The Royal Olive Lawn',
      package: 'Sovereign Grand Ballroom Pass (320,000 EGP)',
      status: 'contract_sent',
      phone: '01234567890'
    }
  ])

  const handleToggleSpaceInquiries = (id) => {
    sound.tap()
    setSpaces(prev => prev.map(s => s.id === id ? { ...s, isAcceptingInquiries: !s.isAcceptingInquiries } : s))
  }

  const handleAddBlock = (e) => {
    e.preventDefault()
    sound.tap()
    setBlockedDates(prev => [
      ...prev,
      { spaceId: 'custom', spaceName: newBlockSpace, date: newBlockDate, session: newBlockSession, reason: newBlockReason }
    ])
  }

  const handleRemoveBlock = (idx) => {
    sound.pop()
    setBlockedDates(prev => prev.filter((_, i) => i !== idx))
  }

  const handleUpdateInquiryStatus = (id, newStatus) => {
    sound.success()
    setPipelineInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status: newStatus } : inq))
  }

  return (
    <div className="w-full pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-10 pb-8 border-b border-[#dfdcd5] dark:border-[#2e2d28] transition-colors">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3b82f6]/15 text-[#3b82f6] border border-[#3b82f6]/30 text-xs font-mono uppercase tracking-widest mb-4">
              <BriefcaseBusiness className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'بوابة مديري وملاك القاعات // ٢٠٢٦' : 'ESTATE OWNER & OPERATIONS PORTAL // 2026'}</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#000000] dark:text-[#f5f5f3] font-normal tracking-tight mb-3 transition-colors">
              {lang === 'ar' ? 'غرفة عمليات إدارة القاعة وحجوزات التذوق' : 'Estate Director & Operations Cockpit'}
            </h1>
            <p className="text-sm sm:text-base text-[#595855] dark:text-[#a8a69e] max-w-2xl font-sans leading-relaxed transition-colors">
              {lang === 'ar'
                ? 'إدارة متكاملة لمساحات القاعة، حظر وإتاحة التواريخ للحفلات المسائية، ومتابعة طلبات التذوق وتوقيع العقود المباشرة مع العرسان.'
                : 'Centralized workspace to control space availability, lock evening session dates, manage tasting appointments, and review compliance audits.'}
            </p>
          </div>

          {/* Active Venue Switcher */}
          <div className="bg-[#e7e5e4] dark:bg-[#1c1b18] p-4 rounded-2xl border border-[#dfdcd5] dark:border-[#2e2d28] shadow-sm shrink-0 transition-colors">
            <span className="block text-[10px] font-mono uppercase tracking-wider text-[#595855] dark:text-[#a8a69e] mb-1">
              {lang === 'ar' ? 'القاعة المُدارة حالياً' : 'Active Managed Estate'}
            </span>
            <select
              value={selectedVenueId}
              onChange={(e) => {
                sound.tap()
                setSelectedVenueId(e.target.value)
              }}
              className="text-sm font-serif font-medium text-[#000000] dark:text-[#f5f5f3] bg-transparent outline-none cursor-pointer [&>option]:bg-white dark:[&>option]:bg-[#1c1b18] dark:[&>option]:text-[#f5f5f3]"
            >
              {venues.map(v => (
                <option key={v.id} value={v.id}>
                  {v.name[lang] || v.name.en} ({getAreaLabel(v.area, lang)})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Metric Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#e7e5e4] dark:bg-[#1c1b18] p-5 rounded-2xl border border-[#dfdcd5] dark:border-[#2e2d28] shadow-2xs transition-colors">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#595855] dark:text-[#a8a69e] block mb-1">
            {lang === 'ar' ? 'المساحات النشطة' : 'Active Spaces'}
          </span>
          <span className="font-serif text-3xl font-medium text-[#000000] dark:text-[#f5f5f3]">3</span>
          <span className="text-xs text-[#10b981] block mt-1 font-medium">
            {lang === 'ar' ? 'جاهزة للحجز الفوري' : 'Open for season'}
          </span>
        </div>

        <div className="bg-[#e7e5e4] dark:bg-[#1c1b18] p-5 rounded-2xl border border-[#dfdcd5] dark:border-[#2e2d28] shadow-2xs transition-colors">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#595855] dark:text-[#a8a69e] block mb-1">
            {lang === 'ar' ? 'طلبات التذوق النشطة' : 'Tasting Pipeline'}
          </span>
          <span className="font-serif text-3xl font-medium text-[#000000] dark:text-[#f5f5f3]">{pipelineInquiries.length}</span>
          <span className="text-xs text-[#3b82f6] block mt-1 font-medium">
            {lang === 'ar' ? 'عرسان بانتظار الرد' : 'Active proposals'}
          </span>
        </div>

        <div className="bg-[#e7e5e4] dark:bg-[#1c1b18] p-5 rounded-2xl border border-[#dfdcd5] dark:border-[#2e2d28] shadow-2xs transition-colors">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#595855] dark:text-[#a8a69e] block mb-1">
            {lang === 'ar' ? 'الليالي المحجوزة' : 'Locked Gala Dates'}
          </span>
          <span className="font-serif text-3xl font-medium text-[#000000] dark:text-[#f5f5f3]">{blockedDates.length}</span>
          <span className="text-xs text-[#f59e0b] block mt-1 font-medium">
            {lang === 'ar' ? 'مغلقة في التقويم' : 'Calendar blocked'}
          </span>
        </div>

        <div className="bg-[#e7e5e4] dark:bg-[#1c1b18] p-5 rounded-2xl border border-[#dfdcd5] dark:border-[#2e2d28] shadow-2xs transition-colors">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#595855] dark:text-[#a8a69e] block mb-1">
            {lang === 'ar' ? 'حالة الاعتماد الأمني' : 'Audit Compliance'}
          </span>
          <div className="flex items-center gap-1.5 mt-1">
            <ShieldCheck className="w-5 h-5 text-[#10b981]" />
            <span className="font-serif text-lg font-medium text-[#10b981]">
              {lang === 'ar' ? 'معتمد رسمياً' : 'Fully Certified'}
            </span>
          </div>
          <span className="text-[10px] text-[#595855] dark:text-[#a8a69e] block mt-1 font-mono">
            Civil Defense 2026/27
          </span>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 border-b border-[#dfdcd5] dark:border-[#2e2d28] pb-3 mb-8 overflow-x-auto transition-colors">
        <button
          onClick={() => {
            sound.tap()
            setActiveTab('spaces')
          }}
          className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
            activeTab === 'spaces'
              ? 'bg-[#000000] dark:bg-[#f5f5f3] text-white dark:text-[#0b0b0a] shadow-sm'
              : 'bg-[#e7e5e4] dark:bg-[#1c1b18] text-[#595855] dark:text-[#a8a69e] hover:text-[#000000] dark:hover:text-[#f5f5f3] border border-[#dfdcd5] dark:border-[#2e2d28]'
          }`}
        >
          {lang === 'ar' ? 'المساحات والسعات' : 'Spaces & Capacities'}
        </button>
        <button
          onClick={() => {
            sound.tap()
            setActiveTab('calendar')
          }}
          className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
            activeTab === 'calendar'
              ? 'bg-[#000000] dark:bg-[#f5f5f3] text-white dark:text-[#0b0b0a] shadow-sm'
              : 'bg-[#e7e5e4] dark:bg-[#1c1b18] text-[#595855] dark:text-[#a8a69e] hover:text-[#000000] dark:hover:text-[#f5f5f3] border border-[#dfdcd5] dark:border-[#2e2d28]'
          }`}
        >
          {lang === 'ar' ? 'حظر المواعيد والتقويم' : 'Date Blackout & Calendar'}
        </button>
        <button
          onClick={() => {
            sound.tap()
            setActiveTab('inquiries')
          }}
          className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
            activeTab === 'inquiries'
              ? 'bg-[#000000] dark:bg-[#f5f5f3] text-white dark:text-[#0b0b0a] shadow-sm'
              : 'bg-[#e7e5e4] dark:bg-[#1c1b18] text-[#595855] dark:text-[#a8a69e] hover:text-[#000000] dark:hover:text-[#f5f5f3] border border-[#dfdcd5] dark:border-[#2e2d28]'
          }`}
        >
          {lang === 'ar' ? `طلبات التذوق (${pipelineInquiries.length})` : `Tasting Pipeline (${pipelineInquiries.length})`}
        </button>
        <button
          onClick={() => {
            sound.tap()
            setActiveTab('docs')
          }}
          className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
            activeTab === 'docs'
              ? 'bg-[#000000] dark:bg-[#f5f5f3] text-white dark:text-[#0b0b0a] shadow-sm'
              : 'bg-[#e7e5e4] dark:bg-[#1c1b18] text-[#595855] dark:text-[#a8a69e] hover:text-[#000000] dark:hover:text-[#f5f5f3] border border-[#dfdcd5] dark:border-[#2e2d28]'
          }`}
        >
          {lang === 'ar' ? 'وثائق التراخيص والأمان' : 'Licensing & Compliance'}
        </button>
      </div>

      {/* Tab 1: Spaces & Capacities */}
      {activeTab === 'spaces' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {spaces.map(sp => (
              <div key={sp.id} className="bg-[#e7e5e4] dark:bg-[#1c1b18] p-6 rounded-2xl border border-[#dfdcd5] dark:border-[#2e2d28] shadow-sm flex flex-col justify-between transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#595855] dark:text-[#a8a69e]">
                      {sp.areaSqM} m² • {sp.capacity} {lang === 'ar' ? 'ضيف' : 'guests'}
                    </span>
                    <button
                      onClick={() => handleToggleSpaceInquiries(sp.id)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider transition-colors ${
                        sp.isAcceptingInquiries 
                          ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400' 
                          : 'bg-red-100 dark:bg-rose-950/60 text-red-800 dark:text-rose-400'
                      }`}
                    >
                      {sp.isAcceptingInquiries ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                      <span>{sp.isAcceptingInquiries ? (lang === 'ar' ? 'متاح للحجز' : 'Open') : (lang === 'ar' ? 'موقوف مؤقتاً' : 'Paused')}</span>
                    </button>
                  </div>

                  <h3 className="font-serif text-xl font-medium text-[#000000] dark:text-[#f5f5f3] mb-2 transition-colors">
                    {sp.name[lang] || sp.name.en}
                  </h3>

                  <div className="space-y-2 text-xs text-[#595855] dark:text-[#a8a69e] pt-3 border-t border-[#dfdcd5] dark:border-[#2e2d28] transition-colors">
                    <div className="flex justify-between">
                      <span>{lang === 'ar' ? 'الحد الأدنى لإنفاق الباقة:' : 'Min Spend Rate:'}</span>
                      <span className="font-mono font-medium text-[#000000] dark:text-[#f5f5f3]">{sp.minSpend.toLocaleString()} EGP</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{lang === 'ar' ? 'السعة القصوى للعشاء:' : 'Seated Banquet Cap:'}</span>
                      <span className="font-mono font-medium text-[#000000] dark:text-[#f5f5f3]">{sp.capacity}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#dfdcd5] dark:border-[#2e2d28] flex items-center justify-between transition-colors">
                  <span className="text-[11px] text-[#595855] dark:text-[#a8a69e]">
                    {lang === 'ar' ? 'المولدات: صامتة ٢٥٠ ك.ف.أ' : 'Backup: 250 kVA Silent'}
                  </span>
                  <button
                    onClick={() => handleToggleSpaceInquiries(sp.id)}
                    className="text-xs font-medium text-[#000000] dark:text-[#f5f5f3] underline"
                  >
                    {sp.isAcceptingInquiries ? (lang === 'ar' ? 'إيقاف الحجز' : 'Pause Bookings') : (lang === 'ar' ? 'إعادة التفعيل' : 'Reactivate')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Date Blackout & Calendar */}
      {activeTab === 'calendar' && (
        <div className="space-y-8">
          <div className="bg-[#e7e5e4] dark:bg-[#1c1b18] p-6 sm:p-8 rounded-3xl border border-[#dfdcd5] dark:border-[#2e2d28] shadow-sm transition-colors">
            <h3 className="font-serif text-2xl text-[#000000] dark:text-[#f5f5f3] font-normal mb-1 transition-colors">
              {lang === 'ar' ? 'إضافة موعد محظور / ليلة محجوزة' : 'Lock a Date in Venue Calendar'}
            </h3>
            <p className="text-xs text-[#595855] dark:text-[#a8a69e] mb-6 transition-colors">
              {lang === 'ar'
                ? 'التواريخ المحظورة تظهر تلقائياً كـ (محجوزة بالكامل) للعملاء لمنع تضارب الحفلات.'
                : 'Locked dates appear as fully booked across customer discovery and inquiries.'}
            </p>

            <form onSubmit={handleAddBlock} className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-5 bg-[#dfdcd5]/40 dark:bg-[#282723]/60 rounded-2xl border border-[#dfdcd5] dark:border-[#2e2d28] mb-8 transition-colors">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-[#595855] dark:text-[#a8a69e] mb-1">
                  {lang === 'ar' ? 'التاريخ' : 'Date'}
                </label>
                <input
                  type="date"
                  value={newBlockDate}
                  onChange={(e) => setNewBlockDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#1c1b18] border border-[#dfdcd5] dark:border-[#2e2d28] text-xs text-black dark:text-[#f5f5f3] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-[#595855] dark:text-[#a8a69e] mb-1">
                  {lang === 'ar' ? 'الفترة' : 'Session'}
                </label>
                <select
                  value={newBlockSession}
                  onChange={(e) => setNewBlockSession(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#1c1b18] border border-[#dfdcd5] dark:border-[#2e2d28] text-xs text-black dark:text-[#f5f5f3] transition-colors [&>option]:bg-white dark:[&>option]:bg-[#1c1b18] dark:[&>option]:text-[#f5f5f3]"
                >
                  <option value="Evening Gala (6 PM - 2 AM)">Evening Gala (6 PM - 2 AM)</option>
                  <option value="Day Katb Ketab (11 AM - 4 PM)">Day Katb Ketab (11 AM - 4 PM)</option>
                  <option value="Full Day Exclusive Lock">Full Day Exclusive Lock</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-[#595855] dark:text-[#a8a69e] mb-1">
                  {lang === 'ar' ? 'المساحة' : 'Space'}
                </label>
                <select
                  value={newBlockSpace}
                  onChange={(e) => setNewBlockSpace(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#1c1b18] border border-[#dfdcd5] dark:border-[#2e2d28] text-xs text-black dark:text-[#f5f5f3] transition-colors [&>option]:bg-white dark:[&>option]:bg-[#1c1b18] dark:[&>option]:text-[#f5f5f3]"
                >
                  {spaces.map(s => (
                    <option key={s.id} value={s.name.en}>{s.name[lang] || s.name.en}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#000000] dark:bg-[#f5f5f3] text-white dark:text-[#0b0b0a] text-xs font-medium hover:bg-[#595855] dark:hover:bg-[#dfdcd5] transition-colors cursor-pointer"
                >
                  {lang === 'ar' ? 'حظر الموعد' : 'Lock Date'}
                </button>
              </div>
            </form>

            {/* List of blocked dates */}
            <div className="divide-y divide-[#dfdcd5] dark:divide-[#2e2d28] transition-colors">
              {blockedDates.map((b, idx) => (
                <div key={idx} className="py-3.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-semibold text-[#000000] dark:text-[#f5f5f3] bg-[#dfdcd5]/50 dark:bg-[#282723] px-2.5 py-1 rounded-md">
                      {b.date}
                    </span>
                    <div>
                      <span className="font-medium text-[#000000] dark:text-[#f5f5f3] block">{b.spaceName}</span>
                      <span className="text-[11px] text-[#595855] dark:text-[#a8a69e]">{b.session} • {b.reason}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveBlock(idx)}
                    className="p-1.5 text-red-600 dark:text-rose-400 hover:bg-red-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer"
                    title={lang === 'ar' ? 'إلغاء الحظر' : 'Unlock date'}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Tasting Pipeline */}
      {activeTab === 'inquiries' && (
        <div className="space-y-4">
          {pipelineInquiries.map(inq => (
            <div key={inq.id} className="bg-[#e7e5e4] dark:bg-[#1c1b18] p-6 rounded-2xl border border-[#dfdcd5] dark:border-[#2e2d28] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <h4 className="font-serif text-xl font-medium text-[#000000] dark:text-[#f5f5f3] transition-colors">
                    {inq.couple}
                  </h4>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider ${
                    inq.status === 'tasting_scheduled'
                      ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                      : inq.status === 'contract_sent'
                      ? 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                      : 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
                  }`}>
                    {inq.status === 'tasting_scheduled' ? (lang === 'ar' ? 'موعد تذوق مؤكد' : 'Tasting Scheduled') : inq.status === 'contract_sent' ? (lang === 'ar' ? 'عقد مرسل' : 'Contract Sent') : (lang === 'ar' ? 'قيد المراجعة' : 'Under Review')}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-[#595855] dark:text-[#a8a69e] transition-colors">
                  <span className="font-mono">{inq.date} ({inq.session})</span>
                  <span>•</span>
                  <span>{inq.guests} {lang === 'ar' ? 'ضيف' : 'guests'}</span>
                  <span>•</span>
                  <span className="font-medium text-[#000000] dark:text-[#f5f5f3]">{inq.space}</span>
                  <span>•</span>
                  <span className="text-[11px] font-mono text-[#595855] dark:text-[#a8a69e]">{inq.package}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`tel:${inq.phone}`}
                  className="px-3 py-1.5 rounded-lg border border-[#dfdcd5] dark:border-[#2e2d28] text-xs text-[#000000] dark:text-[#f5f5f3] hover:bg-black/5 dark:hover:bg-white/5 flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{inq.phone}</span>
                </a>
                <button
                  onClick={() => handleUpdateInquiryStatus(inq.id, 'tasting_scheduled')}
                  className="px-3 py-1.5 rounded-lg bg-[#000000] dark:bg-[#f5f5f3] text-white dark:text-[#0b0b0a] text-xs font-medium hover:bg-[#595855] dark:hover:bg-[#dfdcd5] transition-colors cursor-pointer"
                >
                  {lang === 'ar' ? 'تأكيد التذوق' : 'Confirm Tasting'}
                </button>
                <button
                  onClick={() => handleUpdateInquiryStatus(inq.id, 'contract_sent')}
                  className="px-3 py-1.5 rounded-lg bg-[#10b981] text-white text-xs font-medium hover:bg-[#059669] transition-colors cursor-pointer"
                >
                  {lang === 'ar' ? 'إرسال العقد' : 'Send Contract'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Licensing & Compliance */}
      {activeTab === 'docs' && (
        <div className="bg-[#e7e5e4] dark:bg-[#1c1b18] rounded-3xl p-8 border border-[#dfdcd5] dark:border-[#2e2d28] shadow-sm space-y-6 transition-colors">
          <h3 className="font-serif text-2xl text-[#000000] dark:text-[#f5f5f3] transition-colors">
            {lang === 'ar' ? 'سجل التراخيص والاعتمادات الرسمية' : 'Certified Hospitality Vault'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-[#dfdcd5]/30 dark:bg-[#282723]/60 border border-[#dfdcd5] dark:border-[#2e2d28] flex items-start gap-4 transition-colors">
              <ShieldCheck className="w-6 h-6 text-[#10b981] shrink-0" />
              <div>
                <h4 className="font-serif text-base text-[#000000] dark:text-[#f5f5f3] font-medium transition-colors">
                  {lang === 'ar' ? 'شهادة الحماية المدنية للإطفاء والطوارئ' : 'Civil Defense Emergency Egress Certificate'}
                </h4>
                <p className="text-xs text-[#595855] dark:text-[#a8a69e] mt-1 transition-colors">
                  {lang === 'ar' ? 'صالحة حتى أكتوبر ٢٠٢٧ • ممرات إخلاء بعرض ٤ أمتار' : 'Valid through Oct 2027 • 4.0m certified egress aisles'}
                </p>
                <span className="inline-block mt-2 font-mono text-[10px] text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded">
                  VERIFIED-EGY-2026-88
                </span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#dfdcd5]/30 dark:bg-[#282723]/60 border border-[#dfdcd5] dark:border-[#2e2d28] flex items-start gap-4 transition-colors">
              <CheckCircle2 className="w-6 h-6 text-[#10b981] shrink-0" />
              <div>
                <h4 className="font-serif text-base text-[#000000] dark:text-[#f5f5f3] font-medium transition-colors">
                  {lang === 'ar' ? 'ترخيص وزارة السياحة والآثار المصرية' : 'Ministry of Tourism Operational License'}
                </h4>
                <p className="text-xs text-[#595855] dark:text-[#a8a69e] mt-1 transition-colors">
                  {lang === 'ar' ? 'ترخيص سياحي درجة أولى لاستضافة الأفراح والفعاليات' : 'Class-A Egyptian venue permit for events and banqueting'}
                </p>
                <span className="inline-block mt-2 font-mono text-[10px] text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded">
                  MOT-CAI-EST-402
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
