import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { animate, stagger } from 'animejs'
import { 
  Sparkles, 
  Palette, 
  LayoutGrid, 
  Calculator, 
  FileCheck2, 
  Plus, 
  MessageCircle, 
  Users, 
  CheckCircle2, 
  Clock, 
  Tag,
  UserCheck,
  ShieldCheck,
  RotateCcw,
  Download
} from 'lucide-react'
import { formatEGP } from '../lib/utils'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { sound } from '@/lib/sound'
import Stepper, { Step } from '@/components/ui/Stepper'

export function FoliaPlannerSection({ lang, t }) {
  const [stepperKey, setStepperKey] = useState(0)

  // 1. Dream Board State
  const [selectedPalette, setSelectedPalette] = useState('emerald')
  const [comments, setComments] = useState([
    {
      id: 1,
      author: t.commentUser1,
      text: t.commentText1,
      time: '12m ago',
      avatar: 'S'
    },
    {
      id: 2,
      author: t.commentUser2,
      text: t.commentText2,
      time: 'Just now',
      avatar: 'K'
    }
  ])
  const [newCommentText, setNewCommentText] = useState('')

  const handleAddComment = (e) => {
    e.preventDefault()
    if (!newCommentText.trim()) return
    sound.tap()
    setComments(prev => [
      ...prev,
      {
        id: Date.now(),
        author: lang === 'ar' ? 'أنت' : 'You',
        text: newCommentText,
        time: 'Just now',
        avatar: 'Y'
      }
    ])
    setNewCommentText('')
  }

  // 2. Seating Chart State
  const [tables, setTables] = useState([
    {
      id: 'table-kosha',
      name: lang === 'ar' ? 'كوشة العروسين الملكية (VIP)' : 'Royal VIP Kosha Head Table',
      seats: 12,
      occupied: 12,
      type: 'vip',
      guests: [
        { name: lang === 'ar' ? 'سارة (العروس)' : 'Sarah (Bride)', meal: 'Standard' },
        { name: lang === 'ar' ? 'كريم (العريس)' : 'Karim (Groom)', meal: 'Standard' },
        { name: lang === 'ar' ? 'والد العروس' : 'Father of Bride', meal: 'Standard' },
        { name: lang === 'ar' ? 'والدة العروس' : 'Mother of Bride', meal: 'Vegetarian' },
        { name: lang === 'ar' ? 'والد العريس' : 'Father of Groom', meal: 'Gluten-Free' },
        { name: lang === 'ar' ? 'والدة العريس' : 'Mother of Groom', meal: 'Standard' },
      ]
    },
    {
      id: 'table-1',
      name: lang === 'ar' ? 'طاولة الأهل والأقارب (١)' : 'Family Circle (Table 1)',
      seats: 10,
      occupied: 10,
      type: 'round',
      guests: [
        { name: lang === 'ar' ? 'عم العروسة' : 'Uncle Omar', meal: 'Standard' },
        { name: lang === 'ar' ? 'خالة العروسة' : 'Aunt Mona', meal: 'Vegetarian' },
        { name: lang === 'ar' ? 'د. طارق المنصور' : 'Dr. Tarek', meal: 'Standard' },
      ]
    },
    {
      id: 'table-2',
      name: lang === 'ar' ? 'طاولة أصدقاء الجامعة (٢)' : 'University Friends (Table 2)',
      seats: 10,
      occupied: 8,
      type: 'round',
      guests: [
        { name: lang === 'ar' ? 'أحمد سمير' : 'Ahmed Samir', meal: 'Standard' },
        { name: lang === 'ar' ? 'نورهان زكي' : 'Nourhan Zaki', meal: 'Standard' },
        { name: lang === 'ar' ? 'مصطفى كمال' : 'Mostafa Kamal', meal: 'Vegetarian' },
      ]
    },
    {
      id: 'table-board',
      name: lang === 'ar' ? 'منصة المؤتمر / مجلس الإدارة' : 'Summit Plenary Executive Board',
      seats: 16,
      occupied: 14,
      type: 'boardroom',
      guests: [
        { name: lang === 'ar' ? 'الرئيس التنفيذي' : 'Chief Executive', meal: 'Standard' },
        { name: lang === 'ar' ? 'المتحدث الرئيسي' : 'Keynote Speaker', meal: 'Standard' },
        { name: lang === 'ar' ? 'رئيس الوفد' : 'Head of Delegation', meal: 'Gluten-Free' }
      ]
    }
  ])
  const [selectedTableId, setSelectedTableId] = useState('table-kosha')
  const currentTable = tables.find(t => t.id === selectedTableId) || tables[0]

  const guestsListRef = useRef(null)

  // AnimeJS Stagger animation on guest profile rows
  useEffect(() => {
    if (guestsListRef.current) {
      animate(guestsListRef.current.children, {
        opacity: [0, 1],
        translateX: [lang === 'ar' ? -16 : 16, 0],
        delay: stagger(45),
        duration: 320,
        ease: 'outQuart'
      })
    }
  }, [selectedTableId, lang])

  const handleAddTable = () => {
    sound.tap()
    const newId = `table-${Date.now()}`
    const newNum = tables.length + 1
    const newTable = {
      id: newId,
      name: lang === 'ar' ? `طاولة حفلات إضافية (${newNum})` : `Banquet Table ${newNum}`,
      seats: 10,
      occupied: 0,
      type: 'round',
      guests: []
    }
    setTables(prev => [...prev, newTable])
    setSelectedTableId(newId)
  }

  // 3. Smart Budget Allocator State with GSAP Number Tweening
  const [totalBudget, setTotalBudget] = useState(850000)
  const [allocations, setAllocations] = useState({
    venue: 240000,
    decor: 180000,
    catering: 220000,
    av: 95000,
    photo: 55000,
    hospitality: 30000
  })

  const totalAllocated = Object.values(allocations).reduce((a, b) => a + b, 0)
  const remainingBudget = totalBudget - totalAllocated

  const budgetDisplayRef = useRef(null)
  const prevBudgetRef = useRef(totalBudget)

  useEffect(() => {
    const obj = { val: prevBudgetRef.current }
    gsap.to(obj, {
      val: totalBudget,
      duration: 0.35,
      ease: 'power2.out',
      onUpdate: () => {
        if (budgetDisplayRef.current) {
          budgetDisplayRef.current.innerText = formatEGP(Math.round(obj.val), lang)
        }
      }
    })
    prevBudgetRef.current = totalBudget
  }, [totalBudget, lang])

  const updateAllocation = (category, value) => {
    setAllocations(prev => ({
      ...prev,
      [category]: Math.max(0, parseInt(value, 10) || 0)
    }))
  }

  // 4. Vendor & Invoices Tracker State
  const [invoices, setInvoices] = useState([
    {
      id: 'INV-2026-001',
      vendor: lang === 'ar' ? 'حديقة الزيتون الملكية' : 'The Olive Garden Estate',
      service: lang === 'ar' ? 'عربون تأكيد حجز القاعة' : 'Venue Reservation Deposit',
      amount: 145000,
      date: '2026-11-20',
      status: 'paid',
    },
    {
      id: 'INV-2026-002',
      vendor: lang === 'ar' ? 'ستوديو تصوير النيل السينمائي' : 'Nile Cinematography Studio',
      service: lang === 'ar' ? 'فريق الفيديو وتغطية الدرون' : 'Film Crew & 4K Drone Coverage',
      amount: 45000,
      date: '2026-11-28',
      status: 'pending',
    },
    {
      id: 'INV-2026-003',
      vendor: lang === 'ar' ? 'زهور الياسمين وكوشة كليوباترا' : 'Jasmine & Kosha Florals Cairo',
      service: lang === 'ar' ? 'تصميم الكوشة وممر الورد الطبيعي' : 'Kosha & Botanical Entrance Arch',
      amount: 85000,
      date: '2026-12-05',
      status: 'paid',
    }
  ])

  const toggleInvoiceStatus = (id, el) => {
    sound.tap()
    if (el) {
      animate(el, {
        scale: [1, 1.25, 1],
        duration: 350,
        ease: 'outElastic(1, .5)'
      })
    }

    setInvoices(prev => prev.map(inv => {
      if (inv.id === id) {
        return {
          ...inv,
          status: inv.status === 'paid' ? 'pending' : 'paid'
        }
      }
      return inv
    }))
  }

  const totalPaid = invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.amount, 0)
  const totalPending = invoices.filter(i => i.status === 'pending').reduce((sum, i) => sum + i.amount, 0)
  const totalSeated = tables.reduce((sum, tb) => sum + tb.occupied, 0)

  return (
    <section id="folia-suite" className="py-16 md:py-24 bg-[#c4c3b6]/20 dark:bg-[#121210] text-[#000000] dark:text-[#f5f5f3] relative overflow-hidden transition-colors border-y border-[#dfdcd5] dark:border-[#2e2d28]">
      
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04] pointer-events-none bg-[radial-gradient(currentColor_1px,transparent_1px)] [background-size:24px_24px]" />
      
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Headline */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e7e5e4] dark:bg-[#1c1b18] border border-[#dfdcd5] dark:border-[#2e2d28] text-[#595855] dark:text-[#a8a69e] text-xs font-mono uppercase tracking-widest mb-4 transition-colors">
            <Sparkles className="w-3.5 h-3.5 text-[#10b981]" />
            <span>{t.foliaSectionBadge}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-[54px] font-normal tracking-tight leading-[1.05] mb-4 text-[#000000] dark:text-[#f5f5f3] transition-colors">
            {t.foliaSectionTitle}
          </h2>

          <p className="text-sm sm:text-base text-[#595855] dark:text-[#a8a69e] leading-relaxed max-w-2xl mx-auto font-sans transition-colors">
            {t.foliaSectionSubtitle}
          </p>
        </div>

        {/* React Bits Stepper Component Driving Folia Planning */}
        <Stepper
          key={stepperKey}
          initialStep={1}
          indicator="numbers"
          orientation="horizontal"
          transition="slide"
          frame={true}
          radius={28}
          width="100%"
          backButtonText={lang === 'ar' ? 'السابق' : 'Back'}
          nextButtonText={lang === 'ar' ? 'متابعة الخطوة' : 'Continue'}
          completeButtonText={lang === 'ar' ? 'اعتماد المخطط الملكي' : 'Lock Master Plan'}
          onStepChange={() => sound.tap()}
          onFinalStepCompleted={() => sound.success()}
          className="w-full shadow-lg transition-colors"
          completedContent={
            /* Celebratory Master Plan Lock Card */
            <div className="bg-[#e7e5e4] dark:bg-[#1c1b18] rounded-3xl p-8 sm:p-12 border border-[#dfdcd5] dark:border-[#2e2d28] text-center max-w-3xl mx-auto space-y-6 transition-colors shadow-sm">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-200 dark:border-emerald-800">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#595855] dark:text-[#a8a69e] block mb-2">
                  {lang === 'ar' ? 'الاعتماد النهائي // ٢٠٢٦' : 'FINAL FOLIA CERTIFICATION // 2026'}
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-[#000000] dark:text-[#f5f5f3] font-normal">
                  {lang === 'ar' ? 'تم اعتماد وتثبيت المخطط الملكي لحفلكم' : 'Master Wedding Folia Successfully Locked'}
                </h3>
                <p className="text-xs sm:text-sm text-[#595855] dark:text-[#a8a69e] mt-2 max-w-lg mx-auto">
                  {lang === 'ar'
                    ? 'تم حفظ خريطة الطاولات، توزيع الميزانية، لوحة الألوان المعتمدة، وسجل فواتير الموردين وجاهزة للتصدير.'
                    : 'Seating assignments, EGP budget allocations, color swatches, and verified vendor schedules are locked.'}
                </p>
              </div>

              {/* Summary Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-[#dfdcd5]/40 dark:bg-[#282723]/60 border border-[#dfdcd5] dark:border-[#2e2d28] text-left rtl:text-right">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#595855] dark:text-[#a8a69e] block">{lang === 'ar' ? 'الضيوف الموزعين' : 'Seated Guests'}</span>
                  <span className="font-serif text-xl font-medium text-[#000000] dark:text-[#f5f5f3]">{totalSeated}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#595855] dark:text-[#a8a69e] block">{lang === 'ar' ? 'إجمالي الميزانية' : 'Target Budget'}</span>
                  <span className="font-serif text-xl font-medium text-[#000000] dark:text-[#f5f5f3]">{formatEGP(totalBudget, lang)}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#595855] dark:text-[#a8a69e] block">{lang === 'ar' ? 'العربونات المدفوعة' : 'Paid Invoices'}</span>
                  <span className="font-serif text-xl font-medium text-emerald-600 dark:text-emerald-400">{formatEGP(totalPaid, lang)}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#595855] dark:text-[#a8a69e] block">{lang === 'ar' ? 'المتبقي للتسوية' : 'Remaining'}</span>
                  <span className="font-serif text-xl font-medium text-[#000000] dark:text-[#f5f5f3]">{formatEGP(totalPending, lang)}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    sound.success()
                    alert(lang === 'ar' ? 'جارٍ تصدير ملف المخطط الملكي المعتمد بصيغة PDF...' : 'Exporting certified Master Wedding Folia (PDF)...')
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#000000] dark:bg-[#f5f5f3] text-white dark:text-[#0b0b0a] text-xs font-medium hover:bg-[#595855] dark:hover:bg-[#dfdcd5] transition-all cursor-pointer shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'تحميل وثيقة المخطط (PDF)' : 'Download Certified Folia'}</span>
                </button>

                <button
                  onClick={() => {
                    sound.tap()
                    setStepperKey(k => k + 1)
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#dfdcd5]/50 dark:bg-[#282723] text-[#000000] dark:text-[#f5f5f3] border border-[#dfdcd5] dark:border-[#2e2d28] text-xs font-medium hover:bg-[#dfdcd5] dark:hover:bg-[#2e2d28] transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'مراجعة وتعديل المخطط' : 'Review & Re-edit'}</span>
                </button>
              </div>
            </div>
          }
        >
          
          {/* STEP 1: VISUAL DREAM BOARD */}
          <Step 
            title={t.tabMoodboard} 
            description={lang === 'ar' ? 'لوحة الألوان والإلهام' : 'Visual Moodboard'}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-[#000000] dark:text-[#f5f5f3] pt-4">
              
              {/* Visual Canvas (8 Cols) */}
              <div className="lg:col-span-8 rounded-3xl bg-[#e7e5e4] dark:bg-[#1c1b18] border border-[#dfdcd5] dark:border-[#2e2d28] p-6 sm:p-8 shadow-sm transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#dfdcd5] dark:border-[#2e2d28]">
                  <div>
                    <h3 className="font-serif text-2xl font-normal text-[#000000] dark:text-[#f5f5f3]">
                      {t.moodboardTitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#595855] dark:text-[#a8a69e] mt-1 font-sans">
                      {t.moodboardSubtitle}
                    </p>
                  </div>

                  <div className="inline-block px-4 py-1.5 bg-[#dfdcd5]/60 dark:bg-[#282723] text-[#595855] dark:text-[#a8a69e] border border-[#dfdcd5] dark:border-[#2e2d28] rounded-full text-xs font-mono">
                    ✨ {t.stickerText3}
                  </div>
                </div>

                {/* Main Flatlay */}
                <div className="relative rounded-2xl overflow-hidden aspect-[16/9] mb-6 border border-[#dfdcd5] dark:border-[#2e2d28] shadow-inner">
                  <img
                    src="/folia_dreamboard_art.jpg"
                    alt="Folia Wedding Moodboard"
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-[#1c1b18]/85 backdrop-blur-md text-[#f5f5f3] text-xs font-mono flex items-center gap-1.5 shadow-sm border border-[#2e2d28]">
                    <Tag className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Cairo Nile Sunset Palette</span>
                  </div>
                </div>

                {/* Palette Selector Bar */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#dfdcd5]/40 dark:bg-[#282723]/60 border border-[#dfdcd5] dark:border-[#2e2d28] transition-colors">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#595855] dark:text-[#a8a69e] block mb-3">
                    {t.colorPaletteTitle}
                  </span>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: 'emerald', name: t.paletteEmerald, colors: ['#0b2e26', '#c5a880', '#eaf4f1'] },
                      { id: 'gilded', name: t.paletteGilded, colors: ['#1c1b18', '#d4af37', '#fbf6ee'] },
                      { id: 'lotus', name: t.paletteLotus, colors: ['#ffffff', '#dfdcd5', '#595855'] },
                      { id: 'azure', name: t.paletteAzure, colors: ['#1e40af', '#60a5fa', '#eff6ff'] },
                    ].map(pal => (
                      <button
                        key={pal.id}
                        onClick={(e) => {
                          sound.tap()
                          setSelectedPalette(pal.id)
                          animate(e.currentTarget, {
                            scale: [1, 1.05, 0.98, 1],
                            duration: 300,
                            ease: 'outElastic(1, .5)'
                          })
                        }}
                        className={`tap-bounce p-3 rounded-xl border text-left rtl:text-right transition-all cursor-pointer ${
                          selectedPalette === pal.id
                            ? 'border-[#000000] dark:border-[#f5f5f3] bg-white dark:bg-[#1c1b18] ring-1 ring-[#000000]/15 dark:ring-[#f5f5f3]/20 shadow-xs'
                            : 'border-[#dfdcd5] dark:border-[#2e2d28] bg-transparent hover:border-[#000000]/40 dark:hover:border-[#f5f5f3]/40'
                        }`}
                      >
                        <div className="flex gap-1.5 mb-2">
                          {pal.colors.map((c, i) => (
                            <span key={i} className="w-5 h-5 rounded-full border border-black/10 dark:border-white/10 shadow-xs" style={{ backgroundColor: c }} />
                          ))}
                        </div>
                        <span className="text-xs font-medium text-[#000000] dark:text-[#f5f5f3] block">
                          {pal.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Comment Stream (4 Cols) */}
              <div className="lg:col-span-4 rounded-3xl bg-[#e7e5e4] dark:bg-[#1c1b18] border border-[#dfdcd5] dark:border-[#2e2d28] p-6 sm:p-7 flex flex-col justify-between h-full min-h-[480px] shadow-sm transition-colors">
                <div>
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#dfdcd5] dark:border-[#2e2d28]">
                    <div className="flex items-center gap-2 text-[#000000] dark:text-[#f5f5f3] font-medium text-sm">
                      <MessageCircle className="w-4 h-4 text-[#595855] dark:text-[#a8a69e]" />
                      <span>
                        {lang === 'ar' ? 'ملاحظات الشريك والمنسق' : 'Partner & Planner Notes'}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono uppercase text-emerald-800 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                      Live
                    </span>
                  </div>

                  <div className="space-y-3 mb-6">
                    {comments.map(c => (
                      <div key={c.id} className="p-3.5 rounded-2xl bg-[#dfdcd5]/40 dark:bg-[#282723]/60 border border-[#dfdcd5] dark:border-[#2e2d28] transition-colors">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-[#000000] dark:text-[#f5f5f3] flex items-center gap-1.5">
                            <span className="w-5 h-5 rounded-full bg-[#000000] dark:bg-[#f5f5f3] text-white dark:text-[#0b0b0a] text-[10px] flex items-center justify-center font-bold">
                              {c.avatar}
                            </span>
                            {c.author}
                          </span>
                          <span className="text-[10px] font-mono text-[#595855] dark:text-[#a8a69e]">{c.time}</span>
                        </div>
                        <p className="text-xs text-[#595855] dark:text-[#a8a69e] leading-relaxed mt-1 font-sans">
                          {c.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleAddComment} className="pt-4 border-t border-[#dfdcd5] dark:border-[#2e2d28]">
                  <div className="relative">
                    <input
                      type="text"
                      value={newCommentText}
                      onChange={(e) => setNewCommentText(e.target.value)}
                      placeholder={lang === 'ar' ? 'أضف ملاحظة أو مقترح...' : 'Add a note or suggestion...'}
                      className="w-full h-11 pl-4 pr-16 rtl:pl-16 rtl:pr-4 text-xs rounded-full bg-white dark:bg-[#282723] text-[#000000] dark:text-[#f5f5f3] border border-[#dfdcd5] dark:border-[#2e2d28] focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                    />
                    <button
                      type="submit"
                      className="absolute inset-y-1 right-1 rtl:right-auto rtl:left-1 px-4 rounded-full bg-[#000000] dark:bg-[#f5f5f3] text-white dark:text-[#0b0b0a] text-xs font-medium cursor-pointer hover:bg-[#595855] dark:hover:bg-[#dfdcd5] transition-colors"
                    >
                      {lang === 'ar' ? 'إرسال' : 'Post'}
                    </button>
                  </div>
                </form>

              </div>

            </div>
          </Step>

          {/* STEP 2: INTERACTIVE SEATING CHART */}
          <Step 
            title={t.tabSeating} 
            description={lang === 'ar' ? 'مخطط الطاولات والكوشة' : 'Kosha & Seating'}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-[#000000] dark:text-[#f5f5f3] pt-4">
              <div className="lg:col-span-8 rounded-3xl bg-[#e7e5e4] dark:bg-[#1c1b18] border border-[#dfdcd5] dark:border-[#2e2d28] p-6 sm:p-8 shadow-sm transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#dfdcd5] dark:border-[#2e2d28]">
                  <div>
                    <h3 className="font-serif text-2xl font-normal text-[#000000] dark:text-[#f5f5f3]">
                      {t.seatingTitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#595855] dark:text-[#a8a69e] mt-1 font-sans">
                      {t.seatingSubtitle}
                    </p>
                  </div>

                  <button
                    onClick={handleAddTable}
                    className="tap-bounce inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#000000] dark:bg-[#f5f5f3] text-white dark:text-[#0b0b0a] text-xs font-medium shadow-xs hover:bg-[#595855] dark:hover:bg-[#dfdcd5] transition-all cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{t.addTable}</span>
                  </button>
                </div>

                {/* Surface Grid */}
                <div className="rounded-2xl bg-[#dfdcd5]/30 dark:bg-[#282723]/50 border border-[#dfdcd5] dark:border-[#2e2d28] p-6 min-h-[380px] flex flex-col justify-between transition-colors">
                  <div className="w-full max-w-sm mx-auto py-2 px-4 rounded-full bg-[#dfdcd5]/70 dark:bg-[#1c1b18] text-[#000000] dark:text-[#f5f5f3] text-center mb-8 border border-[#dfdcd5] dark:border-[#2e2d28] shadow-xs">
                    <span className="text-xs font-mono uppercase tracking-wider">
                      🏛️ {lang === 'ar' ? 'منصة المسرح الرئيسي // كوشة العروسين الملكية' : 'Main Stage // Royal Kosha Sanctuary'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                    {tables.map(table => {
                      const isSelected = table.id === selectedTableId
                      return (
                        <div
                          key={table.id}
                          onClick={() => {
                            sound.tap()
                            setSelectedTableId(table.id)
                          }}
                          className={`tap-bounce cursor-pointer p-4 rounded-2xl border transition-all text-center flex flex-col items-center justify-center ${
                            isSelected
                              ? 'bg-white dark:bg-[#1c1b18] border-[#000000] dark:border-[#f5f5f3] ring-2 ring-[#000000]/10 dark:ring-[#f5f5f3]/20 shadow-md'
                              : 'bg-white/60 dark:bg-[#282723]/60 border-[#dfdcd5] dark:border-[#2e2d28] hover:border-black/30 dark:hover:border-white/30'
                          }`}
                        >
                          <div className={`w-11 h-11 rounded-full flex items-center justify-center mb-2 shadow-xs ${
                            table.type === 'vip'
                              ? 'bg-[#000000] dark:bg-[#f5f5f3] text-white dark:text-[#0b0b0a]'
                              : 'bg-[#dfdcd5]/60 dark:bg-[#1c1b18] text-[#595855] dark:text-[#a8a69e]'
                          }`}>
                            <Users className="w-4 h-4" />
                          </div>

                          <span className="text-xs font-medium text-[#000000] dark:text-[#f5f5f3] line-clamp-1">
                            {table.name}
                          </span>

                          <span className="text-[11px] font-mono text-[#595855] dark:text-[#a8a69e] mt-1">
                            {table.occupied} / {table.seats} {t.guestsLabel}
                          </span>

                          <div className="w-full bg-[#dfdcd5] dark:bg-[#2e2d28] h-1.5 rounded-full mt-2.5 overflow-hidden">
                            <div 
                              className="bg-[#000000] dark:bg-[#f5f5f3] h-full rounded-full transition-all"
                              style={{ width: `${(table.occupied / table.seats) * 100}%` }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className="mt-8 pt-4 border-t border-[#dfdcd5] dark:border-[#2e2d28] flex items-center justify-between text-xs font-mono text-[#595855] dark:text-[#a8a69e]">
                    <span>{totalSeated} {lang === 'ar' ? 'ضيف موزعين' : 'Total Guests Seated'}</span>
                    <span>{tables.length} {lang === 'ar' ? 'طاولات مخصصة' : 'Tables Configured'}</span>
                  </div>
                </div>
              </div>

              {/* Table Profile Sidebar with AnimeJS Stagger */}
              <div className="lg:col-span-4 rounded-3xl bg-[#e7e5e4] dark:bg-[#1c1b18] border border-[#dfdcd5] dark:border-[#2e2d28] p-6 sm:p-7 flex flex-col justify-between min-h-[480px] shadow-sm transition-colors">
                <div>
                  <div className="pb-4 mb-4 border-b border-[#dfdcd5] dark:border-[#2e2d28]">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-[#595855] dark:text-[#a8a69e] block mb-1">
                      {lang === 'ar' ? 'تفاصيل المقاعد' : 'Table Profile'}
                    </span>
                    <h4 className="font-serif text-xl font-normal text-[#000000] dark:text-[#f5f5f3]">
                      {currentTable.name}
                    </h4>
                  </div>

                  <div ref={guestsListRef} className="space-y-2 mb-6">
                    {currentTable.guests?.map((guest, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-[#dfdcd5]/40 dark:bg-[#282723]/60 border border-[#dfdcd5] dark:border-[#2e2d28] text-xs">
                        <span className="font-medium text-[#000000] dark:text-[#f5f5f3] flex items-center gap-1.5">
                          <UserCheck className="w-3.5 h-3.5 text-[#595855] dark:text-[#a8a69e]" />
                          {guest.name}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white dark:bg-[#1c1b18] text-[#595855] dark:text-[#a8a69e] border border-[#dfdcd5] dark:border-[#2e2d28]">
                          {guest.meal}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    sound.tap()
                    const guestName = prompt(lang === 'ar' ? 'أدخل اسم الضيف الجديد:' : 'Enter new guest name:')
                    if (guestName) {
                      setTables(prev => prev.map(t => {
                        if (t.id === currentTable.id) {
                          return {
                            ...t,
                            occupied: t.occupied + 1,
                            guests: [...t.guests, { name: guestName, meal: 'Standard' }]
                          }
                        }
                        return t
                      }))
                    }
                  }}
                  className="w-full py-3 rounded-full bg-[#000000] dark:bg-[#f5f5f3] text-white dark:text-[#0b0b0a] font-medium text-xs tap-bounce flex items-center justify-center gap-2 cursor-pointer hover:bg-[#595855] dark:hover:bg-[#dfdcd5] transition-all shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'إضافة ضيف لهذه الطاولة' : 'Seat Guest at This Table'}</span>
                </button>
              </div>
            </div>
          </Step>

          {/* STEP 3: SMART BUDGET ALLOCATOR */}
          <Step 
            title={t.tabBudget} 
            description={lang === 'ar' ? 'حاسبة الميزانية الذكية' : 'Budget Allocator'}
          >
            <div className="rounded-3xl bg-[#e7e5e4] dark:bg-[#1c1b18] border border-[#dfdcd5] dark:border-[#2e2d28] p-6 sm:p-8 text-[#000000] dark:text-[#f5f5f3] shadow-sm transition-colors pt-4">
              <div className="max-w-3xl mb-8">
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#000000] dark:text-[#f5f5f3]">
                  {t.budgetTitle}
                </h3>
                <p className="text-xs sm:text-sm text-[#595855] dark:text-[#a8a69e] mt-1 font-sans">
                  {t.budgetSubtitle}
                </p>
              </div>

              {/* Target Budget Controller with GSAP Counter */}
              <div className="p-6 rounded-2xl bg-[#dfdcd5]/40 dark:bg-[#282723]/60 border border-[#dfdcd5] dark:border-[#2e2d28] mb-8 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-[#595855] dark:text-[#a8a69e]">
                      {t.totalBudgetLabel}
                    </span>
                    <div 
                      ref={budgetDisplayRef}
                      className="font-serif text-3xl sm:text-4xl font-normal text-[#000000] dark:text-[#f5f5f3] mt-1 tabular-nums"
                    >
                      {formatEGP(totalBudget, lang)}
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-xs">
                    <div>
                      <span className="text-[#595855] dark:text-[#a8a69e] block font-mono uppercase">{t.allocatedLabel}</span>
                      <span className="text-sm font-semibold text-[#000000] dark:text-[#f5f5f3] tabular-nums">{formatEGP(totalAllocated, lang)}</span>
                    </div>
                    <div className="h-8 w-px bg-[#dfdcd5] dark:bg-[#2e2d28]" />
                    <div>
                      <span className="text-[#595855] dark:text-[#a8a69e] block font-mono uppercase">{t.remainingLabel}</span>
                      <span className={`text-sm font-semibold tabular-nums ${remainingBudget >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600'}`}>
                        {formatEGP(remainingBudget, lang)}
                      </span>
                    </div>
                  </div>
                </div>

                <Slider
                  value={[totalBudget]}
                  min={200000}
                  max={3000000}
                  step={25000}
                  onValueChange={(vals) => {
                    sound.tap()
                    setTotalBudget(vals[0])
                  }}
                  className="w-full my-3"
                />

                <div className="w-full bg-[#dfdcd5] dark:bg-[#2e2d28] h-3 rounded-full mt-4 overflow-hidden flex shadow-inner">
                  <div className="bg-[#b38f28] h-full transition-all" style={{ width: `${(allocations.venue / totalBudget) * 100}%` }} title="Venue Hire" />
                  <div className="bg-[#8b5cf6] h-full transition-all" style={{ width: `${(allocations.decor / totalBudget) * 100}%` }} title="Kosha Decor" />
                  <div className="bg-[#10b981] h-full transition-all" style={{ width: `${(allocations.catering / totalBudget) * 100}%` }} title="Catering" />
                  <div className="bg-[#3b82f6] h-full transition-all" style={{ width: `${(allocations.av / totalBudget) * 100}%` }} title="Audio & Visual" />
                  <div className="bg-[#ec4899] h-full transition-all" style={{ width: `${(allocations.photo / totalBudget) * 100}%` }} title="Photo & Video" />
                </div>
              </div>

              {/* Sliders Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[
                  { key: 'venue', label: t.catVenueHire, color: '#b38f28', max: 1000000 },
                  { key: 'decor', label: t.catKoshaDecor, color: '#8b5cf6', max: 800000 },
                  { key: 'catering', label: t.catCatering, color: '#10b981', max: 1200000 },
                  { key: 'av', label: t.catAudioVisual, color: '#3b82f6', max: 400000 },
                  { key: 'photo', label: t.catPhotoVideo, color: '#ec4899', max: 250000 },
                  { key: 'hospitality', label: t.catHospitality, color: '#595855', max: 150000 },
                ].map(item => (
                  <div key={item.key} className="p-4 rounded-2xl bg-[#dfdcd5]/40 dark:bg-[#282723]/60 border border-[#dfdcd5] dark:border-[#2e2d28] transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-[#000000] dark:text-[#f5f5f3] flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                        <span>{item.label}</span>
                      </span>
                      <span className="text-xs font-mono font-semibold text-[#000000] dark:text-[#f5f5f3] tabular-nums">
                        {formatEGP(allocations[item.key], lang)}
                      </span>
                    </div>

                    <Slider
                      value={[allocations[item.key]]}
                      min={5000}
                      max={item.max}
                      step={5000}
                      onValueChange={(vals) => {
                        sound.tap()
                        updateAllocation(item.key, vals[0])
                      }}
                      className="w-full my-2"
                    />
                  </div>
                ))}
              </div>

            </div>
          </Step>

          {/* STEP 4: VENDOR & INVOICES */}
          <Step 
            title={t.tabVendors} 
            description={lang === 'ar' ? 'فواتير وعقود الموردين' : 'Invoices & Vault'}
          >
            <div className="rounded-3xl bg-[#e7e5e4] dark:bg-[#1c1b18] border border-[#dfdcd5] dark:border-[#2e2d28] p-6 sm:p-8 text-[#000000] dark:text-[#f5f5f3] shadow-sm transition-colors pt-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#dfdcd5] dark:border-[#2e2d28]">
                <div>
                  <h3 className="font-serif text-2xl font-normal text-[#000000] dark:text-[#f5f5f3]">
                    {t.vendorTrackerTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#595855] dark:text-[#a8a69e] mt-1 font-sans">
                    {t.vendorTrackerSubtitle}
                  </p>
                </div>

                <div className="px-4 py-1.5 rounded-full bg-[#dfdcd5]/60 dark:bg-[#282723] text-[#595855] dark:text-[#a8a69e] text-xs font-mono border border-[#dfdcd5] dark:border-[#2e2d28]">
                  INV-2026-001 • Egypt Operations Hub
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left rtl:text-right border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-[#dfdcd5] dark:border-[#2e2d28] text-[#595855] dark:text-[#a8a69e] text-[11px] font-mono uppercase tracking-wider">
                      <th className="py-3 px-4">{t.invoiceNumber}</th>
                      <th className="py-3 px-4">{t.invoiceVendor}</th>
                      <th className="py-3 px-4">{t.invoiceAmount}</th>
                      <th className="py-3 px-4">{t.invoiceDate}</th>
                      <th className="py-3 px-4">{t.invoiceStatus}</th>
                      <th className="py-3 px-4 text-right rtl:text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#dfdcd5] dark:divide-[#2e2d28]">
                    {invoices.map(inv => (
                      <tr key={inv.id} className="hover:bg-[#dfdcd5]/30 dark:hover:bg-[#282723]/40 transition-colors">
                        <td className="py-4 px-4 font-mono font-medium text-[#000000] dark:text-[#f5f5f3]">
                          {inv.id}
                        </td>
                        <td className="py-4 px-4 text-[#000000] dark:text-[#f5f5f3]">
                          <div className="font-medium">{inv.vendor}</div>
                          <span className="text-[11px] text-[#595855] dark:text-[#a8a69e]">{inv.service}</span>
                        </td>
                        <td className="py-4 px-4 font-serif font-medium text-[#000000] dark:text-[#f5f5f3] tabular-nums">
                          {formatEGP(inv.amount, lang)}
                        </td>
                        <td className="py-4 px-4 text-[#595855] dark:text-[#a8a69e] font-mono text-xs">{inv.date}</td>
                        <td className="py-4 px-4">
                          <Badge 
                            variant={inv.status === 'paid' ? 'emerald' : 'gold'}
                            pulse={inv.status !== 'paid'}
                          >
                            {inv.status === 'paid' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                            <span>{inv.status === 'paid' ? t.statusPaid : t.statusPending}</span>
                          </Badge>
                        </td>
                        <td className="py-4 px-4 text-right rtl:text-left">
                          <button
                            onClick={(e) => toggleInvoiceStatus(inv.id, e.currentTarget)}
                            className="tap-bounce text-[12px] font-medium text-[#000000] dark:text-[#f5f5f3] underline decoration-1 underline-offset-4 hover:opacity-75 cursor-pointer"
                          >
                            {lang === 'ar' ? 'تعديل الحالة' : 'Toggle Status'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Step>

        </Stepper>

      </div>
    </section>
  )
}
