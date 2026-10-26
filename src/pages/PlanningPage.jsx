import React, { useState } from 'react'
import { 
  Sparkles, 
  Plus, 
  MapPin
} from 'lucide-react'
import { FoliaPlannerSection } from '../components/FoliaPlannerSection'
import { sound } from '../lib/sound'

export function PlanningPage({ lang, t }) {
  const [activeSubView, setActiveSubView] = useState('suite') // 'suite' | 'timeline' | 'vendor-contracts'

  // Run of Show Schedule State
  const [timelineItems, setTimelineItems] = useState([
    {
      time: '16:00',
      title: { en: 'Bridal Villa Preparation & Hair Styling', ar: 'تجهيزات العروس في الفيلا وتصفيف الشعر' },
      location: { en: 'Bridal Villa & Suite 101', ar: 'فيلا العروس وجناح ١٠١' },
      status: 'confirmed',
      lead: 'Stylist & Bridal Coordinator'
    },
    {
      time: '18:00',
      title: { en: 'First Look & Garden Cinematic Photoshoot', ar: 'جلسة التصوير السينمائي الأولى في الحدائق' },
      location: { en: 'The Royal Olive Grove', ar: 'بستان الزيتون الملكي' },
      status: 'confirmed',
      lead: 'Director of Photography'
    },
    {
      time: '19:30',
      title: { en: 'Welcome Drinks & Live Classical Harp', ar: 'استقبال الضيوف وعزف القيثارة الكلاسيكية' },
      location: { en: 'The Sunset Courtyard', ar: 'فناء الغروب الإيطالي' },
      status: 'confirmed',
      lead: 'Hospitality Captain'
    },
    {
      time: '20:15',
      title: { en: 'Katb Ketab & Official Marriage Contract Ceremony', ar: 'مراسم عقد القران الرسمي والمأذون' },
      location: { en: 'The Glass Pavilion Altar', ar: 'محراب البافيليون الزجاجي' },
      status: 'in_progress',
      lead: 'Family Spokesperson'
    },
    {
      time: '21:00',
      title: { en: 'Grand Zaffa with Traditional Percussion & Drummers', ar: 'الزفة المصرية الكبرى وفرقة الطبول' },
      location: { en: 'Grand Lawn Grand Staircase', ar: 'درج المسطح الأخضر الرئيسي' },
      status: 'pending',
      lead: 'Zaffa Troupe Leader'
    },
    {
      time: '21:45',
      title: { en: 'First Dance & Cold Pyro Fireworks Display', ar: 'الرقصة الأولى والألعاب النارية الباردة' },
      location: { en: 'Central Marble Dance Floor', ar: 'حلبة الرقص الرخامية' },
      status: 'pending',
      lead: 'Lighting & FX Director'
    },
    {
      time: '22:15',
      title: { en: 'Royal Gala Banquet & Live Gourmet Stations', ar: 'بوفيه العشاء الملكي والمحطات الحية' },
      location: { en: 'Grand Banquet Colonnade', ar: 'رواق البوفيه الإمبراطوري' },
      status: 'pending',
      lead: 'Executive Chef & Maitre D'
    },
    {
      time: '23:45',
      title: { en: 'Cake Cutting & Dessert Presentation', ar: 'تقطيع التورتة الملكية واستعراض الحلويات' },
      location: { en: 'Royal Kosha Stage', ar: 'منصة الكوشة الملكية' },
      status: 'pending',
      lead: 'Pastry Chef'
    },
    {
      time: '00:15',
      title: { en: 'Late-Night DJ Set & After-Party Session', ar: 'فقرة الدي جي الصاخبة وحفل ما بعد منتصف الليل' },
      location: { en: 'Soundproof Glass Ballroom', ar: 'القاعة الزجاجية المعزولة صوتياً' },
      status: 'pending',
      lead: 'Resident DJ'
    }
  ])

  const [newItem, setNewItem] = useState({
    time: '20:00',
    titleEn: '',
    titleAr: '',
    locationEn: '',
    locationAr: ''
  })
  const [showAddForm, setShowAddForm] = useState(false)

  const handleAddTimeline = (e) => {
    e.preventDefault()
    if (!newItem.titleEn && !newItem.titleAr) return
    sound.tap()
    setTimelineItems(prev => [
      ...prev,
      {
        time: newItem.time,
        title: { en: newItem.titleEn || newItem.titleAr, ar: newItem.titleAr || newItem.titleEn },
        location: { en: newItem.locationEn || 'Main Estate', ar: newItem.locationAr || 'القاعة الرئيسية' },
        status: 'pending',
        lead: 'Event Planner'
      }
    ].sort((a, b) => a.time.localeCompare(b.time)))
    setNewItem({ time: '20:00', titleEn: '', titleAr: '', locationEn: '', locationAr: '' })
    setShowAddForm(false)
  }

  return (
    <div className="w-full pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Studio Header */}
      <div className="mb-10 pb-8 border-b border-[#dfdcd5] dark:border-[#2e2d28] transition-colors">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30 text-xs font-mono uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'ستوديو فوليا المعماري المتكامل' : 'FOLIA ARCHITECTURAL PLANNING SUITE'}</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#000000] dark:text-[#f5f5f3] font-normal tracking-tight mb-3 transition-colors">
              {lang === 'ar' ? 'منظومة تخطيط الأفراح والقمم' : 'Folia Event Planning Architecture'}
            </h1>
            <p className="text-sm sm:text-base text-[#595855] dark:text-[#a8a69e] max-w-2xl font-sans leading-relaxed transition-colors">
              {lang === 'ar'
                ? 'لوحة تحكم تفاعلية تضم مخطط الطاولات الذكي، لوحة الألوان والخامات، حاسبة الميزانية الديناميكية بالجنيه، وجدول المواعيد الزمني الدقيق.'
                : 'An all-in-one suite featuring interactive seating chart canvases, curated Mediterranean dream boards, dynamic EGP budget allocations, and run-of-show timeline maestri.'}
            </p>
          </div>

          {/* Sub-view Mode Switcher */}
          <div className="flex items-center bg-[#e7e5e4] dark:bg-[#1c1b18] p-1.5 rounded-2xl border border-[#dfdcd5] dark:border-[#2e2d28] shadow-sm shrink-0 transition-colors">
            <button
              onClick={() => {
                sound.tap()
                setActiveSubView('suite')
              }}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                activeSubView === 'suite'
                  ? 'bg-[#000000] dark:bg-[#f5f5f3] text-white dark:text-[#0b0b0a] shadow-sm'
                  : 'text-[#595855] dark:text-[#a8a69e] hover:text-[#000000] dark:hover:text-[#f5f5f3]'
              }`}
            >
              {lang === 'ar' ? 'الأدوات التفاعلية' : 'Interactive Suite'}
            </button>
            <button
              onClick={() => {
                sound.tap()
                setActiveSubView('timeline')
              }}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                activeSubView === 'timeline'
                  ? 'bg-[#000000] dark:bg-[#f5f5f3] text-white dark:text-[#0b0b0a] shadow-sm'
                  : 'text-[#595855] dark:text-[#a8a69e] hover:text-[#000000] dark:hover:text-[#f5f5f3]'
              }`}
            >
              {lang === 'ar' ? 'جدول المواعيد (Run-of-Show)' : 'Run of Show Maestro'}
            </button>
          </div>
        </div>
      </div>

      {activeSubView === 'suite' ? (
        /* The Full Folia Core Planning Suite */
        <div className="w-full">
          <FoliaPlannerSection lang={lang} t={t} />
        </div>
      ) : (
        /* The Run of Show Maestro View */
        <div className="space-y-8">
          <div className="bg-[#e7e5e4] dark:bg-[#1c1b18] rounded-3xl p-6 sm:p-8 border border-[#dfdcd5] dark:border-[#2e2d28] shadow-sm transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-[#dfdcd5] dark:border-[#2e2d28] gap-4 transition-colors">
              <div>
                <h3 className="font-serif text-2xl text-[#000000] dark:text-[#f5f5f3] font-normal mb-1 transition-colors">
                  {lang === 'ar' ? 'الجدول الزمني الدقيق لليلة العمر (Run-of-Show)' : 'Hour-by-Hour Master Timeline'}
                </h3>
                <p className="text-xs text-[#595855] dark:text-[#a8a69e] transition-colors">
                  {lang === 'ar'
                    ? 'توزيع دقيق لكل فقرة من لحظة وصول الماكيير حتى خروج آخر ضيف مع تحديد المسؤولين والموقع.'
                    : 'A calibrated execution schedule covering every milestone from bridal prep to late-night sendoff.'}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowAddForm(prev => !prev)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#000000] dark:bg-[#f5f5f3] text-white dark:text-[#0b0b0a] text-xs font-medium hover:bg-[#595855] dark:hover:bg-[#dfdcd5] transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'إضافة فقرة جديدة' : 'Add Milestone'}</span>
                </button>
              </div>
            </div>

            {/* Add Milestone Form */}
            {showAddForm && (
              <form onSubmit={handleAddTimeline} className="mb-8 p-5 bg-[#dfdcd5]/40 dark:bg-[#282723]/60 rounded-2xl border border-[#dfdcd5] dark:border-[#2e2d28] space-y-4 transition-colors">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-[#595855] dark:text-[#a8a69e] mb-1">
                      {lang === 'ar' ? 'التوقيت' : 'Time'}
                    </label>
                    <input
                      type="text"
                      value={newItem.time}
                      onChange={(e) => setNewItem({ ...newItem, time: e.target.value })}
                      placeholder="21:30"
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#1c1b18] border border-[#dfdcd5] dark:border-[#2e2d28] text-xs text-black dark:text-[#f5f5f3] transition-colors"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-[#595855] dark:text-[#a8a69e] mb-1">
                      {lang === 'ar' ? 'عنوان الفقرة' : 'Milestone Title'}
                    </label>
                    <input
                      type="text"
                      value={lang === 'ar' ? newItem.titleAr : newItem.titleEn}
                      onChange={(e) => {
                        if (lang === 'ar') setNewItem({ ...newItem, titleAr: e.target.value, titleEn: e.target.value })
                        else setNewItem({ ...newItem, titleEn: e.target.value, titleAr: e.target.value })
                      }}
                      placeholder={lang === 'ar' ? 'مثال: تقطيع التورتة الملكية' : 'e.g., Royal Cake Cutting'}
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#1c1b18] border border-[#dfdcd5] dark:border-[#2e2d28] text-xs text-black dark:text-[#f5f5f3] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-[#595855] dark:text-[#a8a69e] mb-1">
                      {lang === 'ar' ? 'الموقع بالقاعة' : 'Location / Zone'}
                    </label>
                    <input
                      type="text"
                      value={lang === 'ar' ? newItem.locationAr : newItem.locationEn}
                      onChange={(e) => {
                        if (lang === 'ar') setNewItem({ ...newItem, locationAr: e.target.value, locationEn: e.target.value })
                        else setNewItem({ ...newItem, locationEn: e.target.value, locationAr: e.target.value })
                      }}
                      placeholder={lang === 'ar' ? 'حلبة الرقص' : 'Dance Floor'}
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#1c1b18] border border-[#dfdcd5] dark:border-[#2e2d28] text-xs text-black dark:text-[#f5f5f3] transition-colors"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-3 py-1.5 rounded-lg border border-[#dfdcd5] dark:border-[#2e2d28] text-xs text-[#000000] dark:text-[#f5f5f3] hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-[#000000] dark:bg-[#f5f5f3] text-white dark:text-[#0b0b0a] text-xs font-medium hover:bg-[#595855] dark:hover:bg-[#dfdcd5] transition-colors cursor-pointer"
                  >
                    {lang === 'ar' ? 'حفظ الفقرة' : 'Save'}
                  </button>
                </div>
              </form>
            )}

            {/* Timeline Stream */}
            <div className="relative border-l-2 border-[#dfdcd5] dark:border-[#2e2d28] rtl:border-l-0 rtl:border-r-2 ml-4 rtl:ml-0 rtl:mr-4 pl-6 rtl:pl-0 rtl:pr-6 space-y-6 transition-colors">
              {timelineItems.map((item, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline dot */}
                  <span className={`absolute -left-[31px] rtl:-left-auto rtl:-right-[31px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-[#1c1b18] transition-all ${
                    item.status === 'confirmed' ? 'bg-[#10b981]' : item.status === 'in_progress' ? 'bg-[#f59e0b]' : 'bg-[#595855]'
                  }`} />

                  <div className="bg-[#dfdcd5]/30 dark:bg-[#282723]/60 p-4 rounded-2xl border border-[#dfdcd5] dark:border-[#2e2d28] hover:border-black/20 dark:hover:border-white/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-4">
                      <span className="font-mono text-sm font-semibold text-[#000000] dark:text-[#f5f5f3] bg-white dark:bg-[#1c1b18] px-2.5 py-1 rounded-lg border border-[#dfdcd5] dark:border-[#2e2d28] shadow-2xs">
                        {item.time}
                      </span>
                      <div>
                        <h4 className="font-serif text-base text-[#000000] dark:text-[#f5f5f3] font-medium transition-colors">
                          {item.title[lang] || item.title.en}
                        </h4>
                        <div className="flex items-center gap-3 text-xs text-[#595855] dark:text-[#a8a69e] mt-1 transition-colors">
                          <span className="inline-flex items-center gap-1 font-mono">
                            <MapPin className="w-3 h-3 text-[#595855] dark:text-[#a8a69e]" />
                            {item.location[lang] || item.location.en}
                          </span>
                          <span>•</span>
                          <span className="text-[11px]">
                            {lang === 'ar' ? `المشرف: ${item.lead}` : `Lead: ${item.lead}`}
                          </span>
                        </div>
                      </div>
                    </div>

                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider self-start sm:self-center ${
                      item.status === 'confirmed'
                        ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                        : item.status === 'in_progress'
                        ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
                        : 'bg-stone-200 dark:bg-[#282723] text-stone-700 dark:text-[#a8a69e]'
                    }`}>
                      {item.status === 'confirmed' ? (lang === 'ar' ? 'مؤكد' : 'Confirmed') : (lang === 'ar' ? 'قيد التنفيذ' : 'Queued')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
