import React from 'react'
import { 
  Building2, 
  Sparkles, 
  ShieldCheck, 
  CreditCard, 
  ArrowRight, 
  CheckCircle2, 
  Users,
  MapPin,
  Heart,
  Scale
} from 'lucide-react'
import { HeroSection } from '../components/HeroSection'
import { VenueCard } from '../components/VenueCard'
import { getAreaLabel } from '../data/venues'
import BorderGlow from '../components/ui/BorderGlow'

export function HomePage({
  venues,
  filters,
  setFilters,
  onResetFilters,
  shortlist,
  onToggleShortlist,
  compareIds,
  onToggleCompare,
  onSelectDetails,
  onQuickInquire,
  onNavigate,
  lang,
  t,
  theme,
  isPreloading = false
}) {
  const [currentTheme, setCurrentTheme] = React.useState(() => {
    if (theme) return theme
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark') || document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
    }
    return 'light'
  })

  React.useEffect(() => {
    if (theme) {
      setCurrentTheme(theme)
      return
    }
    if (typeof document === 'undefined') return
    const updateTheme = () => {
      const active = document.documentElement.classList.contains('dark') || document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
      setCurrentTheme(active)
    }
    updateTheme()
    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] })
    return () => observer.disconnect()
  }, [theme])

  const isDark = currentTheme === 'dark'
  const featuredVenues = venues.slice(0, 3)

  return (
    <div className="w-full">
      {/* 1. Hero Exhibition with Search Cockpit */}
      <HeroSection
        filters={filters}
        setFilters={setFilters}
        onResetFilters={onResetFilters}
        lang={lang}
        t={t}
        theme={currentTheme}
        isPreloading={isPreloading}
      />

      {/* 2. Bespoke Editorial Feature Launchpad */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-black/10 dark:border-white/10 gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#595855] dark:text-[#a8a69e] block mb-2">
              {lang === 'ar' ? 'أركان المنظومة الملكية' : 'PLATFORM ARCHITECTURE'}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#000000] dark:text-[#f5f5f3] font-normal tracking-tight">
              {lang === 'ar' ? 'استكشف المزايا المتخصصة في صفحات مخصصة' : 'Explore Dedicated Portals & In-Depth Features'}
            </h2>
          </div>
          <p className="text-sm text-[#595855] dark:text-[#a8a69e] max-w-md font-sans leading-relaxed">
            {lang === 'ar'
              ? 'تم تصميم كل ركن من منصة ويدو كأداة هندسية متكاملة تضمن أعلى معايير الفخامة والشفافية والتنظيم الدقيق.'
              : 'Every corner of the Weddo suite operates as a dedicated workspace engineered for transparency, royal aesthetics, and flawless execution.'}
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Venues Catalog */}
          <div 
            onClick={() => onNavigate('/venues')}
            className="group cursor-pointer bg-[#e7e5e4] dark:bg-[#1c1b18] p-6 sm:p-7 rounded-2xl border border-[#dfdcd5] dark:border-[#2e2d28] hover:border-black/30 dark:hover:border-white/30 shadow-sm hover:shadow-xl active:scale-[0.98] transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#c4c3b6]/50 dark:bg-[#282723] flex items-center justify-center text-[#000000] dark:text-[#f5f5f3] mb-5 group-hover:scale-110 group-hover:bg-[#000000] group-hover:text-[#ffffff] dark:group-hover:bg-[#f5f5f3] dark:group-hover:text-[#0b0b0a] transition-all duration-300">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#595855] dark:text-[#a8a69e] block mb-1">
                {lang === 'ar' ? 'الأرشيف المعماري' : 'ESTATE ARCHIVE'}
              </span>
              <h3 className="font-serif text-xl font-normal text-[#000000] dark:text-[#f5f5f3] mb-3 group-hover:translate-x-1 transition-transform">
                {lang === 'ar' ? 'دليل القاعات والقصور' : 'Venues & Estates Catalog'}
              </h3>
              <p className="text-xs text-[#595855] dark:text-[#a8a69e] leading-relaxed">
                {lang === 'ar'
                  ? 'تصفح أدق تفاصيل ومساحات وباقات ٨ من أرقى قصور وحدائق وقاعات المؤتمرات في القاهرة والإسكندرية.'
                  : 'Full catalog with multi-facet filters, 360° virtual tours, transparent EGP price bands, and direct tasting bookings.'}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#dfdcd5] dark:border-[#2e2d28] flex items-center justify-between text-xs font-medium text-[#000000] dark:text-[#f5f5f3]">
              <span>{lang === 'ar' ? 'عرض القاعات (٨)' : 'Explore All Venues'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform rtl:rotate-180" />
            </div>
          </div>

          {/* Card 2: Folia Planning Suite */}
          <div 
            onClick={() => onNavigate('/planning')}
            className="group cursor-pointer bg-[#e7e5e4] dark:bg-[#1c1b18] p-6 sm:p-7 rounded-2xl border border-[#dfdcd5] dark:border-[#2e2d28] hover:border-black/30 dark:hover:border-white/30 shadow-sm hover:shadow-xl active:scale-[0.98] transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#10b981]/15 flex items-center justify-center text-[#10b981] mb-5 group-hover:scale-110 group-hover:bg-[#10b981] group-hover:text-[#ffffff] transition-all duration-300">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#595855] dark:text-[#a8a69e] block mb-1">
                {lang === 'ar' ? 'ستوديو فوليا' : 'FOLIA STUDIO'}
              </span>
              <h3 className="font-serif text-xl font-normal text-[#000000] dark:text-[#f5f5f3] mb-3 group-hover:translate-x-1 transition-transform">
                {lang === 'ar' ? 'منظومة التخطيط التفاعلية' : 'Folia Planning Suite'}
              </h3>
              <p className="text-xs text-[#595855] dark:text-[#a8a69e] leading-relaxed">
                {lang === 'ar'
                  ? 'مخطط توزيع الطاولات والمقاعد، لوحة الإلهام البصري، مخصص الميزانية الذكي، وجدول إدارة الموردين في مكان واحد.'
                  : 'Interactive seating canvas, curated palette swatches, live EGP budget sliders, and vendor milestone tracking.'}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#dfdcd5] dark:border-[#2e2d28] flex items-center justify-between text-xs font-medium text-[#000000] dark:text-[#f5f5f3]">
              <span>{lang === 'ar' ? 'فتح الستوديو' : 'Launch Studio'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform rtl:rotate-180" />
            </div>
          </div>

          {/* Card 3: Pricing & Membership */}
          <div 
            onClick={() => onNavigate('/pricing')}
            className="group cursor-pointer bg-[#e7e5e4] dark:bg-[#1c1b18] p-6 sm:p-7 rounded-2xl border border-[#dfdcd5] dark:border-[#2e2d28] hover:border-black/30 dark:hover:border-white/30 shadow-sm hover:shadow-xl active:scale-[0.98] transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#f59e0b]/15 flex items-center justify-center text-[#f59e0b] mb-5 group-hover:scale-110 group-hover:bg-[#f59e0b] group-hover:text-[#ffffff] transition-all duration-300">
                <CreditCard className="w-6 h-6" />
              </div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#595855] dark:text-[#a8a69e] block mb-1">
                {lang === 'ar' ? 'الباقات الملكية' : 'MEMBERSHIP TIERS'}
              </span>
              <h3 className="font-serif text-xl font-normal text-[#000000] dark:text-[#f5f5f3] mb-3 group-hover:translate-x-1 transition-transform">
                {lang === 'ar' ? 'باقات الأسعار والخدمات' : 'Pricing & Pass Plans'}
              </h3>
              <p className="text-xs text-[#595855] dark:text-[#a8a69e] leading-relaxed">
                {lang === 'ar'
                  ? 'قارن بين باقات الحجز الملكية، إعفاءات رسوم الفلين، المساعد الشخصي، وضمان استرداد المقدمات في جدول مقارنة شفاف.'
                  : 'Transparent membership plans, fee waivers, private concierge support, and legal permit handling comparison.'}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#dfdcd5] dark:border-[#2e2d28] flex items-center justify-between text-xs font-medium text-[#000000] dark:text-[#f5f5f3]">
              <span>{lang === 'ar' ? 'مقارنة الباقات' : 'Compare Plans'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform rtl:rotate-180" />
            </div>
          </div>

          {/* Card 4: Safety & Compliance Hub */}
          <div 
            onClick={() => onNavigate('/compliance')}
            className="group cursor-pointer bg-[#e7e5e4] dark:bg-[#1c1b18] p-6 sm:p-7 rounded-2xl border border-[#dfdcd5] dark:border-[#2e2d28] hover:border-black/30 dark:hover:border-white/30 shadow-sm hover:shadow-xl active:scale-[0.98] transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#8b5cf6]/15 flex items-center justify-center text-[#8b5cf6] mb-5 group-hover:scale-110 group-hover:bg-[#8b5cf6] group-hover:text-[#ffffff] transition-all duration-300">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#595855] dark:text-[#a8a69e] block mb-1">
                {lang === 'ar' ? 'الأمان والتراخيص' : 'LEGAL & SAFETY'}
              </span>
              <h3 className="font-serif text-xl font-normal text-[#000000] dark:text-[#f5f5f3] mb-3 group-hover:translate-x-1 transition-transform">
                {lang === 'ar' ? 'مركز معايير السلامة' : 'Safety & Audit Hub'}
              </h3>
              <p className="text-xs text-[#595855] dark:text-[#a8a69e] leading-relaxed">
                {lang === 'ar'
                  ? 'دليل تراخيص وزارة السياحة، اشتراطات الحماية المدنية، محدد الديسيبل للصوت، ومولدات الطوارئ الإلزامية لكل قاعة.'
                  : 'Ministry of Tourism licensing checks, Civil Defense fire standards, decibel acoustic limits, and generator backup audits.'}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#dfdcd5] dark:border-[#2e2d28] flex items-center justify-between text-xs font-medium text-[#000000] dark:text-[#f5f5f3]">
              <span>{lang === 'ar' ? 'دليل المعايير' : 'View Standards'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform rtl:rotate-180" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Flagship Estates Preview */}
      <section className="py-20 border-t border-[#dfdcd5] dark:border-[#2e2d28] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#595855] dark:text-[#a8a69e] block mb-2">
                {lang === 'ar' ? 'مختارات الموسم' : 'CURATED HIGHLIGHTS'}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#000000] dark:text-[#f5f5f3] font-normal tracking-tight">
                {lang === 'ar' ? 'أبرز القصور والحدائق التراثية' : 'Flagship Heritage Estates & Ballrooms'}
              </h2>
            </div>
            <button
              onClick={() => onNavigate('/venues')}
              className="mt-4 md:mt-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#000000] dark:bg-[#f5f5f3] text-[#ffffff] dark:text-[#0b0b0a] text-xs font-medium hover:opacity-90 active:scale-95 min-h-[44px] transition-all cursor-pointer"
            >
              <span>{lang === 'ar' ? 'عرض الكتالوج الكامل (٨ قاعات)' : 'View Full Catalog (8 Venues)'}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredVenues.map((venue) => (
              <VenueCard
                key={venue.id}
                venue={venue}
                lang={lang}
                isShortlisted={shortlist?.includes(venue.id)}
                onToggleShortlist={onToggleShortlist}
                isCompared={compareIds?.includes(venue.id)}
                onToggleCompare={onToggleCompare}
                onSelectDetails={onSelectDetails}
                onQuickInquire={onQuickInquire}
                t={t}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Trust Manifesto & Egyptian Quality Pillars with Interactive BorderGlow */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-[#dfdcd5] dark:border-[#2e2d28]">
        <BorderGlow
          edgeSensitivity={30}
          glowColor={isDark ? "40 80 80" : "220 95 50"}
          backgroundColor={isDark ? '#1c1b18' : '#e7e5e4'}
          borderRadius={24}
          glowRadius={42}
          glowIntensity={isDark ? 1.1 : 1.3}
          coneSpread={25}
          animated={false}
          colors={isDark ? ['#d4af37', '#f472b6', '#38bdf8'] : ['#1e40af', '#2563eb', '#38bdf8']}
          className="transition-colors duration-300 shadow-xl border border-[#dfdcd5] dark:border-[#2e2d28]"
        >
          <div className="p-6 sm:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#10b981]/15 text-[#10b981] flex items-center justify-center shrink-0 transition-colors">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-lg text-[#000000] dark:text-[#f5f5f3] mb-1 transition-colors">
                    {lang === 'ar' ? 'أسعار إرشادية مباشرة' : 'Direct Transparent EGP Pricing'}
                  </h4>
                  <p className="text-xs text-[#595855] dark:text-[#a8a69e] leading-relaxed transition-colors">
                    {lang === 'ar'
                      ? 'لا عمولات وسيطة مخفية. جميع باقات القاعات معلنة بأسعارها المعتمدة رسمياً وشاملة تجهيزات الصوت والخدمة.'
                      : 'Zero broker markups. All venue packages feature certified pricing and explicit amenity breakdowns.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#3b82f6]/15 text-[#3b82f6] flex items-center justify-center shrink-0 transition-colors">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-lg text-[#000000] dark:text-[#f5f5f3] mb-1 transition-colors">
                    {lang === 'ar' ? 'تدقيق الحماية المدنية' : 'Civil Defense Fire Certified'}
                  </h4>
                  <p className="text-xs text-[#595855] dark:text-[#a8a69e] leading-relaxed transition-colors">
                    {lang === 'ar'
                      ? 'نراجع شخصياً مخارج الطوارئ وعروض الممرات والمولدات الكهربائية الصامتة لضمان أمان ليلتك.'
                      : 'Every venue undergoes rigorous physical inspections of emergency egress, fire suppression, and backup power.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#8b5cf6]/15 text-[#8b5cf6] flex items-center justify-center shrink-0 transition-colors">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-lg text-[#000000] dark:text-[#f5f5f3] mb-1 transition-colors">
                    {lang === 'ar' ? 'تنسيق جلسات التذوق' : 'Private Tasting Coordination'}
                  </h4>
                  <p className="text-xs text-[#595855] dark:text-[#a8a69e] leading-relaxed transition-colors">
                    {lang === 'ar'
                      ? 'حدد جلسة تذوق خاصة لقائمة الطعام في القاعة وقابل الشيف التنفيذي ومنسق الحفل قبل توقيع العقد.'
                      : 'Schedule private culinary tasting sessions with executive chefs before locking your contract.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </BorderGlow>
      </section>
    </div>
  )
}
