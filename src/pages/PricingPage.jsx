import React, { useState } from 'react'
import { 
  Check, 
  Crown
} from 'lucide-react'
import { PricingSection } from '../components/PricingSection'

export function PricingPage({ lang, t }) {
  const [calculatorGuests, setCalculatorGuests] = useState(250)
  const [calculatorBudget, setCalculatorBudget] = useState(350000)

  // Calculations
  const estimatedBrokerCommission = Math.round(calculatorBudget * 0.12)
  const estimatedCorkageSavings = Math.round(calculatorGuests * 180)
  const totalEstimatedSavings = estimatedBrokerCommission + estimatedCorkageSavings

  const comparisonFeatures = [
    {
      category: lang === 'ar' ? 'البحث والمعاينة' : 'Discovery & Inspection',
      items: [
        {
          name: lang === 'ar' ? 'تصفح كافة القاعات والقصور المعتمدة' : 'Access to all certified venues & estates',
          free: true,
          monthly: true,
          annual: true
        },
        {
          name: lang === 'ar' ? 'أداة مقارنة القاعات جنباً إلى جنب' : 'Side-by-side estate comparison engine',
          free: true,
          monthly: true,
          annual: true
        },
        {
          name: lang === 'ar' ? 'جولات افتراضية ثلاثية الأبعاد ٣٦٠°' : '360° Virtual Twin architectural tours',
          free: false,
          monthly: true,
          annual: true
        }
      ]
    },
    {
      category: lang === 'ar' ? 'أدوات التخطيط (Folia)' : 'Folia Planning Suite',
      items: [
        {
          name: lang === 'ar' ? 'مخطط الطاولات والمقاعد التفاعلي' : 'Interactive Seating Chart & table assigner',
          free: false,
          monthly: true,
          annual: true
        },
        {
          name: lang === 'ar' ? 'لوحة الألوان والإلهام البصري' : 'Dream Board & Mediterranean palettes',
          free: false,
          monthly: true,
          annual: true
        },
        {
          name: lang === 'ar' ? 'مخصص الميزانية الذكي بالجنيه' : 'Dynamic EGP budget allocation sliders',
          free: false,
          monthly: true,
          annual: true
        },
        {
          name: lang === 'ar' ? 'جدول المواعيد الزمني (Run-of-Show)' : 'Hour-by-hour Run-of-Show timeline maestro',
          free: false,
          monthly: false,
          annual: true
        }
      ]
    },
    {
      category: lang === 'ar' ? 'الضمانات والتنسيق الحصري' : 'Guarantees & VIP Concierge',
      items: [
        {
          name: lang === 'ar' ? 'ضمان الأسعار المباشرة بدون عمولات' : 'Direct pricing guarantee (0% broker fee)',
          free: true,
          monthly: true,
          annual: true
        },
        {
          name: lang === 'ar' ? 'تنسيق جلسات التذوق مع الشيف التنفيذي' : 'Private culinary tasting coordination',
          free: false,
          monthly: true,
          annual: true
        },
        {
          name: lang === 'ar' ? 'إعفاء رسوم الفلين وتصاريح المشروبات' : 'Corkage fee waiver & permit assistance',
          free: false,
          monthly: false,
          annual: true
        },
        {
          name: lang === 'ar' ? 'تأمين استرداد وتأجيل الموعد لـ ٦ أشهر' : '6-Month date postponement guarantee',
          free: false,
          monthly: false,
          annual: true
        },
        {
          name: lang === 'ar' ? 'منسق زفاف شخصي عبر الواتساب' : 'Dedicated VIP WhatsApp wedding concierge',
          free: false,
          monthly: false,
          annual: true
        }
      ]
    }
  ]

  return (
    <div className="w-full pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-10 pb-8 border-b border-[#dfdcd5] dark:border-[#2e2d28] transition-colors">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f59e0b]/15 text-[#f59e0b] border border-[#f59e0b]/30 text-xs font-mono uppercase tracking-widest mb-4">
            <Crown className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'عضويات وباقات ويدو // ٢٠٢٦' : 'WEDDO MEMBERSHIP PASSES // 2026'}</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#000000] dark:text-[#f5f5f3] font-normal tracking-tight mb-4 transition-colors">
            {lang === 'ar' ? 'باقات حجز واضحة بدون عمولات خفية' : 'Transparent Pricing for Unforgettable Celebrations'}
          </h1>
          <p className="text-sm sm:text-base text-[#595855] dark:text-[#a8a69e] font-sans leading-relaxed transition-colors">
            {lang === 'ar'
              ? 'اختر مستوى التخطيط الذي يناسب حجم مناسبتك. من المعاينة المجانية الدائمة إلى باقة التخطيط الملكية المتكاملة مع إعفاءات الرسوم.'
              : 'Choose the depth of planning architecture you need. From free couple discovery to full annual passes with corkage waivers and concierge support.'}
          </p>
        </div>
      </div>

      {/* Core Pricing Cards & FAQs */}
      <PricingSection lang={lang} t={t} />

      {/* Interactive Savings & ROI Calculator */}
      <section className="mt-16 bg-[#e7e5e4] dark:bg-[#1c1b18] rounded-3xl p-8 sm:p-12 border border-[#dfdcd5] dark:border-[#2e2d28] shadow-sm transition-colors">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="font-mono text-xs uppercase tracking-widest text-[#595855] dark:text-[#a8a69e] block mb-2">
              {lang === 'ar' ? 'حاسبة القيمة الموفرة' : 'ROI & SAVINGS CALCULATOR'}
            </span>
            <h3 className="font-serif text-3xl text-[#000000] dark:text-[#f5f5f3] font-normal transition-colors">
              {lang === 'ar' ? 'كم توفر عند الحجز والتخطيط عبر ويدو؟' : 'How Much Does WEDDO Save You?'}
            </h3>
            <p className="text-xs text-[#595855] dark:text-[#a8a69e] mt-2 transition-colors">
              {lang === 'ar'
                ? 'قارن بين تكلفة الوسطاء وسماسرة الأفراح التقليديين وبين الحجز المباشر بالأسعار الإرشادية المعتمدة.'
                : 'See the empirical savings generated by eliminating traditional broker markups and leveraging group corkage waivers.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#dfdcd5]/40 dark:bg-[#282723]/60 p-6 sm:p-8 rounded-2xl border border-[#dfdcd5] dark:border-[#2e2d28] transition-colors">
            {/* Controls */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-[#595855] dark:text-[#a8a69e]">{lang === 'ar' ? 'عدد الضيوف المتوقع' : 'Expected Guests'}</span>
                  <span className="font-bold text-[#000000] dark:text-[#f5f5f3]">{calculatorGuests} {lang === 'ar' ? 'ضيف' : 'guests'}</span>
                </div>
                <input
                  type="range"
                  min="80"
                  max="800"
                  step="10"
                  value={calculatorGuests}
                  onChange={(e) => setCalculatorGuests(Number(e.target.value))}
                  className="w-full accent-black dark:accent-[#f5f5f3] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-[#595855] dark:text-[#a8a69e]">{lang === 'ar' ? 'ميزانية القاعة والضيافة المقدرة' : 'Estimated Venue Budget'}</span>
                  <span className="font-bold text-[#000000] dark:text-[#f5f5f3]">{calculatorBudget.toLocaleString()} EGP</span>
                </div>
                <input
                  type="range"
                  min="100000"
                  max="1000000"
                  step="25000"
                  value={calculatorBudget}
                  onChange={(e) => setCalculatorBudget(Number(e.target.value))}
                  className="w-full accent-black dark:accent-[#f5f5f3] cursor-pointer"
                />
              </div>
            </div>

            {/* Savings Callout Display */}
            <div className="bg-[#000000] dark:bg-[#141412] text-[#ffffff] rounded-2xl p-6 text-center space-y-4 border border-transparent dark:border-[#2e2d28]">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block">
                {lang === 'ar' ? 'إجمالي الوفورات التقديرية' : 'Estimated Direct Savings'}
              </span>
              <div className="font-serif text-4xl sm:text-5xl font-medium tracking-tight text-white">
                ~{totalEstimatedSavings.toLocaleString()} <span className="text-base font-sans font-normal">EGP</span>
              </div>
              <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-4 text-start rtl:text-right text-xs">
                <div>
                  <span className="text-white/60 block text-[10px]">{lang === 'ar' ? 'إلغاء عمولة الوسيط (١٢٪)' : 'Broker fees avoided'}</span>
                  <span className="font-mono font-medium text-emerald-300">+{estimatedBrokerCommission.toLocaleString()} EGP</span>
                </div>
                <div>
                  <span className="text-white/60 block text-[10px]">{lang === 'ar' ? 'توفير رسوم الفلين وتصاريح المشروبات' : 'Corkage fee waivers'}</span>
                  <span className="font-mono font-medium text-emerald-300">+{estimatedCorkageSavings.toLocaleString()} EGP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature-by-Feature Detailed Comparison Table */}
      <section className="mt-16 bg-[#e7e5e4] dark:bg-[#1c1b18] rounded-3xl p-6 sm:p-10 border border-[#dfdcd5] dark:border-[#2e2d28] shadow-sm transition-colors">
        <div className="mb-8">
          <span className="font-mono text-xs uppercase tracking-widest text-[#595855] dark:text-[#a8a69e] block mb-2">
            {lang === 'ar' ? 'جدول المقارنة الدقيق' : 'DETAILED FEATURE MATRIX'}
          </span>
          <h3 className="font-serif text-3xl text-[#000000] dark:text-[#f5f5f3] font-normal transition-colors">
            {lang === 'ar' ? 'مقارنة شاملة بين الباقات' : 'Side-by-Side Pass Comparison'}
          </h3>
        </div>

        <div className="overflow-x-auto -mx-2 px-2">
          <table className="w-full min-w-[540px] text-xs text-left rtl:text-right border-collapse">
            <thead>
              <tr className="border-b border-[#dfdcd5] dark:border-[#2e2d28] font-serif text-sm sm:text-base text-[#000000] dark:text-[#f5f5f3]">
                <th className="py-4 px-4 font-normal sticky left-0 rtl:left-auto rtl:right-0 bg-[#e7e5e4] dark:bg-[#1c1b18] z-10 min-w-[180px] sm:min-w-[220px] shadow-[2px_0_6px_-2px_rgba(0,0,0,0.05)] rtl:shadow-[-2px_0_6px_-2px_rgba(0,0,0,0.05)]">
                  {lang === 'ar' ? 'الميزة والخدمة' : 'Feature / Amenity'}
                </th>
                <th className="py-4 px-3 sm:px-4 text-center font-normal min-w-[100px]">{lang === 'ar' ? 'المعاينة المجانية' : 'Discovery (0 EGP)'}</th>
                <th className="py-4 px-3 sm:px-4 text-center font-normal min-w-[100px]">{lang === 'ar' ? 'فوليا شهري' : 'Monthly Pass'}</th>
                <th className="py-4 px-3 sm:px-4 text-center font-normal bg-[#dfdcd5]/40 dark:bg-[#282723] rounded-t-xl text-black dark:text-[#f5f5f3] min-w-[120px]">
                  {lang === 'ar' ? 'الباقة السنوية (الأكثر طلباً)' : 'Annual Pass'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#dfdcd5] dark:divide-[#2e2d28]">
              {comparisonFeatures.map((sec, secIdx) => (
                <React.Fragment key={secIdx}>
                  <tr className="bg-[#dfdcd5]/30 dark:bg-[#282723]/50">
                    <td colSpan={4} className="py-2.5 px-4 font-mono text-[10px] uppercase tracking-wider text-[#595855] dark:text-[#a8a69e] font-semibold sticky left-0 rtl:left-auto rtl:right-0 bg-[#dfdcd5]/30 dark:bg-[#282723]/50 z-10">
                      {sec.category}
                    </td>
                  </tr>
                  {sec.items.map((item, itemIdx) => (
                    <tr key={itemIdx} className="hover:bg-[#dfdcd5]/20 dark:hover:bg-[#282723]/30 transition-colors">
                      <td className="py-3 px-4 text-[#000000] dark:text-[#f5f5f3] font-medium sticky left-0 rtl:left-auto rtl:right-0 bg-[#e7e5e4] dark:bg-[#1c1b18] z-10 shadow-[2px_0_6px_-2px_rgba(0,0,0,0.05)] rtl:shadow-[-2px_0_6px_-2px_rgba(0,0,0,0.05)]">
                        {item.name}
                      </td>
                      <td className="py-3 px-3 sm:px-4 text-center">
                        {item.free ? (
                          <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mx-auto" />
                        ) : (
                          <span className="text-[#595855]/40 dark:text-[#a8a69e]/40">—</span>
                        )}
                      </td>
                      <td className="py-3 px-3 sm:px-4 text-center">
                        {item.monthly ? (
                          <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mx-auto" />
                        ) : (
                          <span className="text-[#595855]/40 dark:text-[#a8a69e]/40">—</span>
                        )}
                      </td>
                      <td className="py-3 px-3 sm:px-4 text-center bg-[#dfdcd5]/30 dark:bg-[#282723] font-medium">
                        {item.annual ? (
                          <Check className="w-4 h-4 text-emerald-700 dark:text-emerald-400 mx-auto stroke-[2.5]" />
                        ) : (
                          <span className="text-[#595855]/40 dark:text-[#a8a69e]/40">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
