import React, { useState } from 'react'
import { 
  ShieldCheck, 
  Volume2, 
  Zap, 
  Flame, 
  UtensilsCrossed, 
  Car, 
  CheckCircle2, 
  Download, 
  BadgeCheck
} from 'lucide-react'
import { sound } from '../lib/sound'
import { getAreaLabel } from '../data/venues'

export function CompliancePage({ venues, lang, t }) {
  const [selectedVenueId, setSelectedVenueId] = useState(venues[0]?.id || 'olive-garden')
  const currentVenue = venues.find(v => v.id === selectedVenueId) || venues[0]

  const [decibelSlider, setDecibelSlider] = useState(85)

  const pillars = [
    {
      id: 'civil-defense',
      icon: Flame,
      color: '#ef4444',
      title: { en: 'Civil Defense & Fire Egress Mandates', ar: 'اشتراطات الحماية المدنية ومسارات الإخلاء' },
      standards: [
        { en: 'Minimum 4.0-meter clear unobstructed emergency corridors', ar: 'ممرات طوارئ بعرض لا يقل عن ٤ أمتار خالية من أي كراسي أو ديكور' },
        { en: 'Illuminated photoluminescent exit signage with battery backup', ar: 'لوحات مخارج طوارئ مضيئة ذاتياً تعمل حتى في انقطاع التيار' },
        { en: 'Dedicated on-site Class-A fire marshal and water mist systems', ar: 'تواجد فرد إطفاء معتمد مع طفايات ضباب مائي مخصصة للخيام والأقمشة' },
        { en: 'Flame-retardant certification for all Kosha fabric drapes and floral arches', ar: 'شهادة مقاومة الحريق للأقمشة والستائر والزهور المجففة' }
      ]
    },
    {
      id: 'acoustics',
      icon: Volume2,
      color: '#8b5cf6',
      title: { en: 'Acoustic Decibel Limits & Noise Ordinances', ar: 'معايير الديسيبل والهدوء السكني المحيط' },
      standards: [
        { en: 'Maximum 85 dBA continuous sound pressure after 23:00 PM', ar: 'حد أقصى ٨٥ ديسيبل بعد الساعة ١١ مساءً في حدائق الشيخ زايد والتجمع' },
        { en: 'Directional cardioid subwoofers aimed away from residential compounds', ar: 'توجيه سماعات الباس بتقنية كاردويد بعيداً عن الكومباوندات السكنية' },
        { en: 'Double-glazed soundproof glass ballrooms for post-midnight celebrations', ar: 'قاعات زجاجية معزولة بجدار مزدوج لحفلات ما بعد منتصف الليل حتى الفجر' },
        { en: 'Automated digital decibel logging sensors with local district compliance', ar: 'أجهزة قياس وتسجيل مستوى الصوت المتصلة بحي التجمع والشيخ زايد' }
      ]
    },
    {
      id: 'power',
      icon: Zap,
      color: '#f59e0b',
      title: { en: 'Auxiliary Dual-Generator Redundancy', ar: 'ازدواجية المولدات الكهربائية الصامتة (ATS)' },
      standards: [
        { en: 'Dedicated silent diesel generator (min. 250 kVA) on active standby', ar: 'مولد ديزل صامت بقدرة لا تقل عن ٢٥٠ ك.ف.أ على وضع الاستعداد' },
        { en: 'Automatic Transfer Switch (ATS) restoring power within 4 seconds', ar: 'مفتاح تحويل أوتوماتيكي ينقل الحمل الكهربائي في أقل من ٤ ثوانٍ' },
        { en: 'Independent power line for sound/lighting separate from kitchen refrigeration', ar: 'فصل دوائر الإضاءة والصوت تماماً عن دوائر طهي وتبريد البوفيه' },
        { en: 'On-site electrical certified engineer throughout the entire gala event', ar: 'مهندس كهرباء مناوب متواجد داخل غرفة التحكم طوال فترة الفرح' }
      ]
    },
    {
      id: 'hygiene',
      icon: UtensilsCrossed,
      color: '#10b981',
      title: { en: 'HACCP Food Safety & Cold Chain Logistics', ar: 'سلامة الغذاء وسلسلة التبريد (HACCP)' },
      standards: [
        { en: 'Thermo-controlled refrigerated transport for meats, dairy and pastries', ar: 'سيارات نقل مبردة ومراقبة حرارياً لنقل اللحوم والحلويات والقشطة' },
        { en: 'Sanitary stainless-steel plating stations with warm bain-marie wells', ar: 'محطات إعداد استانلس ستيل مع أواني حمام مائي ساخن لحفظ حرارة الطعام' },
        { en: 'Valid Ministry of Health sanitary certificates for all banquet staff', ar: 'شهادات صحية سارية من وزارة الصحة لكافة أفراد طاقم الخدمة' },
        { en: 'Retained 48-hour culinary sample archives for quality control', ar: 'حفظ عينات مرجعية من كافة أطباق البوفيه لمدة ٤٨ ساعة للفحص' }
      ]
    },
    {
      id: 'logistics',
      icon: Car,
      color: '#3b82f6',
      title: { en: 'Valet Flow & Perimeter Chauffeur Security', ar: 'لوجستيات صف السيارات وأمن المداخل' },
      standards: [
        { en: 'Multi-lane arrival portico preventing roadside congestion', ar: 'ممر وصول متعدد الحارات يمنع التكدس المروري على الطرق الرئيسية' },
        { en: 'Paved, illuminated parking spaces holding 100% of guest vehicles', ar: 'ساحات انتظار مرصوفة ومضاءة تستوعب ١٠٠٪ من سيارات الضيوف' },
        { en: 'Barcoded electronic valet tickets with lost-ticket tracking', ar: 'تذاكر باركود إلكترونية لخدمة الفاليه مع كاميرات مراقبة للمركبات' },
        { en: 'Private VIP chauffeur staging area with driver refreshment facilities', ar: 'استراحة خاصة للسائقين مع مرافق ضيافة لضمان جاهزيتهم الفورية' }
      ]
    }
  ]

  return (
    <div className="w-full pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-10 pb-8 border-b border-[#dfdcd5] dark:border-[#2e2d28] transition-colors">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8b5cf6]/15 text-[#8b5cf6] border border-[#8b5cf6]/30 text-xs font-mono uppercase tracking-widest mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'معايير الأمان والتراخيص الرسمية // ٢٠٢٦' : 'SAFETY, AUDITING & HOSPITALITY STANDARDS // 2026'}</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#000000] dark:text-[#f5f5f3] font-normal tracking-tight mb-3 transition-colors">
              {lang === 'ar' ? 'ميثاق الأمان والسلامة للأفراح المصرية' : 'The Five Pillars of Egyptian Wedding Safety'}
            </h1>
            <p className="text-sm sm:text-base text-[#595855] dark:text-[#a8a69e] max-w-2xl font-sans leading-relaxed transition-colors">
              {lang === 'ar'
                ? 'لا يتم إدراج أي قاعة على منصة ويدو إلا بعد الفحص الميداني الدقيق لمخارج الحريق، المولدات الاحتياطية، أجهزة قياس الديسيبل، وتراخيص وزارة السياحة.'
                : 'Every estate listed on WEDDO undergoes rigorous on-site audits validating Civil Defense egress, dual ATS generators, acoustic decibel compliance, and HACCP cold chains.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.success()
                alert(lang === 'ar' ? 'جارٍ تحميل دليل معايير ويدو للأمان ٢٠٢٦ (PDF)...' : 'Downloading WEDDO Safety Standards Whitepaper (PDF)...')
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#000000] dark:bg-[#f5f5f3] text-white dark:text-[#0b0b0a] text-xs font-medium hover:bg-[#595855] dark:hover:bg-[#dfdcd5] transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'تحميل دليل المعايير (PDF)' : 'Download Whitepaper'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* The 5 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {pillars.map((pillar) => {
          const Icon = pillar.icon
          return (
            <div
              key={pillar.id}
              className="bg-[#e7e5e4] dark:bg-[#1c1b18] rounded-3xl p-7 border border-[#dfdcd5] dark:border-[#2e2d28] shadow-sm flex flex-col justify-between transition-colors"
            >
              <div>
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: `${pillar.color}15`, color: pillar.color }}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-normal text-[#000000] dark:text-[#f5f5f3] mb-4 transition-colors">
                  {pillar.title[lang] || pillar.title.en}
                </h3>
                <ul className="space-y-3">
                  {pillar.standards.map((std, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-[#595855] dark:text-[#a8a69e] leading-relaxed transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
                      <span>{std[lang] || std.en}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-[#dfdcd5] dark:border-[#2e2d28] flex items-center justify-between text-[11px] font-mono text-[#595855] dark:text-[#a8a69e] transition-colors">
                <span>MANDATORY STANDARD</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-semibold">100% AUDITED</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Interactive Venue Verification Checker */}
      <section className="bg-[#e7e5e4] dark:bg-[#1c1b18] rounded-3xl p-8 sm:p-12 border border-[#dfdcd5] dark:border-[#2e2d28] shadow-sm mb-16 transition-colors">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="font-mono text-xs uppercase tracking-widest text-[#595855] dark:text-[#a8a69e] block mb-2">
              {lang === 'ar' ? 'فاحص الاعتماد الميداني' : 'PUBLIC VERIFICATION AUDIT'}
            </span>
            <h3 className="font-serif text-3xl text-[#000000] dark:text-[#f5f5f3] font-normal transition-colors">
              {lang === 'ar' ? 'تحقق من الموقف الأمني والتراخيص لأي قاعة' : 'Verify Venue Audit Status & Permits'}
            </h3>
            <p className="text-xs text-[#595855] dark:text-[#a8a69e] mt-2 transition-colors">
              {lang === 'ar'
                ? 'اختر القاعة من القائمة للاطلاع على رقم ترخيص وزارة السياحة، تاريخ الفحص الأخير، وتصاريح الصوت.'
                : 'Inspect current Ministry of Tourism serials, physical audit timestamps, and certified decibel curfews.'}
            </p>
          </div>

          <div className="bg-[#dfdcd5]/40 dark:bg-[#282723]/60 p-6 sm:p-8 rounded-2xl border border-[#dfdcd5] dark:border-[#2e2d28] space-y-6 transition-colors">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#595855] dark:text-[#a8a69e] mb-2">
                {lang === 'ar' ? 'اختر القاعة المراد فحصها:' : 'Select Venue To Verify:'}
              </label>
              <select
                value={selectedVenueId}
                onChange={(e) => {
                  sound.tap()
                  setSelectedVenueId(e.target.value)
                }}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#1c1b18] border border-[#dfdcd5] dark:border-[#2e2d28] text-sm font-serif font-medium text-black dark:text-[#f5f5f3] outline-none cursor-pointer [&>option]:bg-white dark:[&>option]:bg-[#1c1b18] dark:[&>option]:text-[#f5f5f3] transition-colors"
              >
                {venues.map(v => (
                  <option key={v.id} value={v.id}>
                    {v.name[lang] || v.name.en} — {getAreaLabel(v.area, lang)}
                  </option>
                ))}
              </select>
            </div>

            {/* Verification Sheet */}
            <div className="bg-white dark:bg-[#1c1b18] rounded-2xl p-6 border border-[#dfdcd5] dark:border-[#2e2d28] space-y-4 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#dfdcd5] dark:border-[#2e2d28] gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <BadgeCheck className="w-5 h-5 text-[#10b981]" />
                    <h4 className="font-serif text-xl font-medium text-black dark:text-[#f5f5f3] transition-colors">
                      {currentVenue.name[lang] || currentVenue.name.en}
                    </h4>
                  </div>
                  <span className="text-xs text-[#595855] dark:text-[#a8a69e] font-mono mt-0.5 block">
                    {getAreaLabel(currentVenue.area, lang)} • {currentVenue.spaces?.length || 0} Certified Spaces
                  </span>
                </div>

                <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 text-xs font-mono font-medium border border-emerald-200 dark:border-emerald-800 self-start sm:self-center">
                  AUDIT GRADE: A+ PLATINUM
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-3 bg-[#dfdcd5]/30 dark:bg-[#282723]/70 rounded-xl border border-[#dfdcd5]/50 dark:border-[#2e2d28]">
                  <span className="text-[10px] font-mono uppercase text-[#595855] dark:text-[#a8a69e] block">Ministry Tourism Permit</span>
                  <span className="font-mono font-semibold text-black dark:text-[#f5f5f3] mt-1 block">MOT-CAI-2026-0814</span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400">Active & Verified</span>
                </div>

                <div className="p-3 bg-[#dfdcd5]/30 dark:bg-[#282723]/70 rounded-xl border border-[#dfdcd5]/50 dark:border-[#2e2d28]">
                  <span className="text-[10px] font-mono uppercase text-[#595855] dark:text-[#a8a69e] block">Civil Defense Certificate</span>
                  <span className="font-mono font-semibold text-black dark:text-[#f5f5f3] mt-1 block">CDF-GIZ-88219-B</span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400">Inspected Oct 2026</span>
                </div>

                <div className="p-3 bg-[#dfdcd5]/30 dark:bg-[#282723]/70 rounded-xl border border-[#dfdcd5]/50 dark:border-[#2e2d28]">
                  <span className="text-[10px] font-mono uppercase text-[#595855] dark:text-[#a8a69e] block">Outdoor Decibel Curfew</span>
                  <span className="font-mono font-semibold text-black dark:text-[#f5f5f3] mt-1 block">00:00 AM (Midnight)</span>
                  <span className="text-[10px] text-blue-600 dark:text-blue-400">Ballroom 03:00 AM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Decibel Noise Gauge Simulator */}
      <section className="bg-[#e7e5e4] dark:bg-[#1c1b18] rounded-3xl p-8 sm:p-12 border border-[#dfdcd5] dark:border-[#2e2d28] shadow-sm transition-colors">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="font-mono text-xs uppercase tracking-widest text-[#595855] dark:text-[#a8a69e] block mb-2">
              {lang === 'ar' ? 'محاكي ديسيبل الصوت' : 'LIVE ACOUSTIC GAUGE'}
            </span>
            <h3 className="font-serif text-3xl text-[#000000] dark:text-[#f5f5f3] font-normal transition-colors">
              {lang === 'ar' ? 'فهم مستويات الصوت المسموحة في الأفراح' : 'Understanding Egyptian Outdoor Decibel Limits'}
            </h3>
          </div>

          <div className="space-y-6 bg-[#dfdcd5]/40 dark:bg-[#282723]/60 p-6 sm:p-8 rounded-2xl border border-[#dfdcd5] dark:border-[#2e2d28] transition-colors">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-[#595855] dark:text-[#a8a69e]">{lang === 'ar' ? 'مستوى الصوت التجريبي:' : 'Simulated Sound Pressure:'}</span>
              <span className="text-2xl font-serif font-bold text-black dark:text-[#f5f5f3]">{decibelSlider} dBA</span>
            </div>

            <input
              type="range"
              min="65"
              max="115"
              value={decibelSlider}
              onChange={(e) => setDecibelSlider(Number(e.target.value))}
              className="w-full accent-black dark:accent-[#f5f5f3] cursor-pointer"
            />

            <div className="flex justify-between text-[11px] font-mono text-[#595855] dark:text-[#a8a69e]">
              <span>70 dB (Dinner & Harp)</span>
              <span className="text-amber-700 dark:text-amber-400 font-semibold">85 dB (Katb Ketab & Speech)</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-semibold">95 dB (Zaffa Drums)</span>
              <span className="text-red-700 dark:text-red-400 font-semibold">105+ dB (Late Night DJ)</span>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-[#1c1b18] border border-[#dfdcd5] dark:border-[#2e2d28] text-xs text-[#595855] dark:text-[#a8a69e] leading-relaxed transition-colors">
              {decibelSlider <= 75 && (
                <p>
                  <strong className="text-black dark:text-[#f5f5f3]">{lang === 'ar' ? 'مستوى هادئ للضيافة:' : 'Ambient Hospitality Level:'}</strong>{' '}
                  {lang === 'ar' ? 'مناسب لفترة استقبال الضيوف وموسيقى العود والقيثارة الكلاسيكية بدون أي إزعاج.' : 'Ideal for guest arrivals, violin/harp performances, and dinner service.'}
                </p>
              )}
              {decibelSlider > 75 && decibelSlider <= 88 && (
                <p>
                  <strong className="text-amber-800 dark:text-amber-400">{lang === 'ar' ? 'الحد المعتمد بعد ١١ مساءً:' : 'Certified Residential Curfew Limit (85 dB):'}</strong>{' '}
                  {lang === 'ar' ? 'هذا هو الحد الأقصى القانوني المسموح به في الحدائق المفتوحة بعد الساعة ١١ مساءً لضمان عدم تعرض الحفل للمخالفات.' : 'Maximum permitted outdoor limit after 23:00 in Sheikh Zayed and New Cairo to prevent district shutdown.'}
                </p>
              )}
              {decibelSlider > 88 && decibelSlider <= 98 && (
                <p>
                  <strong className="text-emerald-800 dark:text-emerald-400">{lang === 'ar' ? 'طاقة الزفة المصرية:' : 'Grand Zaffa & Entrance Level:'}</strong>{' '}
                  {lang === 'ar' ? 'مستوى صوت طبيعي أثناء موكب الزفة واستعراض الطبول المسموح به حتى الساعة ١١:٠٠ مساءً في الحدائق.' : 'Permitted for the peak 45-minute Zaffa procession before residential quiet hours.'}
                </p>
              )}
              {decibelSlider > 98 && (
                <p>
                  <strong className="text-red-800 dark:text-red-400">{lang === 'ar' ? 'إلزامي: الانتقال للقاعة الزجاجية المعزولة:' : 'Mandatory Indoor Ballroom Transition:'}</strong>{' '}
                  {lang === 'ar' ? 'يتطلب هذا المستوى نقل فقرة الدي جي الصاخبة إلى القاعة المعزولة صوتياً ذات الزجاج المزدوج لحماية الضيوف والجيران.' : 'Audio at this level must transition inside the double-glazed soundproof ballroom.'}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
