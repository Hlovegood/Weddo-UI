import React, { useState, useRef, useEffect, useMemo } from 'react'
import { motion } from 'motion/react'
import { 
  ArrowRight, 
  ArrowUpRight,
  Sparkles, 
  Compass, 
  CheckCircle2,
  MapPin,
  Users,
  Search,
  Star,
  Award,
  CalendarCheck
} from 'lucide-react'
import { SearchCockpit } from './SearchCockpit'
import BorderGlow from './ui/BorderGlow'
import GridMotion from './ui/GridMotion'
import CircularGallery from './ui/CircularGallery'
import { TextAnimate } from './ui/text-animate'
import { Badge } from './ui/badge'
import { sound } from '../lib/sound'
import { formatEGP } from '../lib/utils'

export const HERO_FEATURED_ESTATES = [
  {
    id: 'olive',
    venueId: 'olive-garden',
    titleEn: 'The Olive Garden Estate',
    titleAr: 'حدائق الزيتون الملكية',
    subtitleEn: 'Century-old olive groves & private climate glasshouses',
    subtitleAr: 'حدائق زيتون معمرة وأجنحة ملكية وصوبة زجاجية مكيفة',
    locationEn: 'New Cairo • North 90th',
    locationAr: 'التجمع الخامس • التسعين الشمالي',
    districtEn: 'New Cairo',
    districtAr: 'التجمع الخامس',
    capacity: 850,
    price: 185000,
    rating: '4.98',
    reviewsCount: 42,
    safetyEn: '100% Civil Defense',
    safetyAr: 'حماية مدنية معتمدة',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80&auto=format&fit=crop',
    tagEn: 'Botanical Estate',
    tagAr: 'حديقة ملكية',
    featuresEn: ['Open-Air Lawn', 'Glasshouse', 'No Curfew'],
    featuresAr: ['مساحة مفتوحة', 'قاعة زجاجية', 'بدون حظر']
  },
  {
    id: 'nile',
    venueId: 'nile-waterfront',
    titleEn: 'Grand Nile Waterfront',
    titleAr: 'صالون النيل الملكي الإمبراطوري',
    subtitleEn: 'Panoramic Nile salons & sunset private yacht marina',
    subtitleAr: 'صالونات نيلية بانورامية ومرسى يخوت خاص لحفلات الغروب',
    locationEn: 'Zamalek • Nile Corniche',
    locationAr: 'الزمالك • كورنيش النيل',
    districtEn: 'Zamalek',
    districtAr: 'الزمالك',
    capacity: 650,
    price: 240000,
    rating: '4.97',
    reviewsCount: 58,
    safetyEn: 'MOT Licensed',
    safetyAr: 'ترخيص وزارة السياحة',
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200&q=80&auto=format&fit=crop',
    tagEn: 'Royal Ballroom',
    tagAr: 'قاعة ملكية',
    featuresEn: ['Panoramic Nile', 'Bridal Suite', 'Yacht Dock'],
    featuresAr: ['إطلالة نيلية', 'جناح العروس', 'مرسى يخوت']
  },
  {
    id: 'pyramids',
    venueId: 'pyramids-terrace',
    titleEn: 'Pyramids Heritage Terrace',
    titleAr: 'شرفة الأهرامات التراثية',
    subtitleEn: 'Direct Giza monument vista & concert acoustic amphitheater',
    subtitleAr: 'إطلالة أثرية كبرى خالية من العوائق ومسرح صوت وضوء متكامل',
    locationEn: 'Pyramids Plateau Road',
    locationAr: 'طريق هضبة الأهرامات • الجيزة',
    districtEn: 'Giza Plateau',
    districtAr: 'هضبة الأهرامات',
    capacity: 1200,
    price: 310000,
    rating: '4.99',
    reviewsCount: 36,
    safetyEn: 'Drone Certified',
    safetyAr: 'تصريح تصوير درون',
    image: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?w=1200&q=80&auto=format&fit=crop',
    tagEn: 'Monumental Heritage',
    tagAr: 'أفق تاريخي',
    featuresEn: ['Pyramids View', '1,200 Capacity', 'Acoustic Stage'],
    featuresAr: ['إطلالة الأهرامات', 'سعة ١,٢٠٠', 'مسرح صوتي']
  },
  {
    id: 'summit',
    venueId: 'summit-ballroom',
    titleEn: 'Summit Plenary Ballroom',
    titleAr: 'قاعة القمم الدبلوماسية',
    subtitleEn: 'Acoustic timber wave ceilings & curved 8K LED convention suites',
    subtitleAr: 'أسقف خشبية عازلة للصوت وشاشات منحنية 8K للمؤتمرات الدولية',
    locationEn: 'Sheikh Zayed • West Cairo',
    locationAr: 'الشيخ زايد • غرب القاهرة',
    districtEn: 'Sheikh Zayed',
    districtAr: 'الشيخ زايد',
    capacity: 1500,
    price: 290000,
    rating: '4.95',
    reviewsCount: 64,
    safetyEn: 'UN Compliant',
    safetyAr: 'معايير قمم دولية',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=80&auto=format&fit=crop',
    tagEn: 'Executive Summit',
    tagAr: 'مؤتمرات وقمم',
    featuresEn: ['Curved 8K LED', 'Hybrid Audio', 'VIP Lounges'],
    featuresAr: ['شاشات 8K', 'صوتيات هجينة', 'قاعات كبار الزوار']
  },
  {
    id: 'azure',
    venueId: 'azure-court',
    titleEn: 'Azure Fountain Court',
    titleAr: 'فناء اللازورد والنوافير الملكية',
    subtitleEn: 'Marble colonnades, cascading water mirrors & private bridal suites',
    subtitleAr: 'أعمدة رخامية تاريخية ونوافير متدرجة وجناح عروس إمبراطوري',
    locationEn: 'Heliopolis • Al Korba',
    locationAr: 'مصر الجديدة • الكوربة',
    districtEn: 'Heliopolis',
    districtAr: 'الكوربة',
    capacity: 450,
    price: 165000,
    rating: '4.93',
    reviewsCount: 29,
    safetyEn: 'Historic Heritage',
    safetyAr: 'تراث معماري محمي',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&q=80&auto=format&fit=crop',
    tagEn: 'Fountain Promenade',
    tagAr: 'فناء ملكي',
    featuresEn: ['Water Cascades', 'Colonnade Lawn', 'Valet Parking'],
    featuresAr: ['شلالات رخامية', 'أعمدة أثرية', 'خدمة صف سيارات']
  },
  {
    id: 'royal',
    venueId: 'royal-cairo',
    titleEn: 'The Royal Cairo Grand Palace',
    titleAr: 'قصر القاهرة الملكي التاريخي',
    subtitleEn: 'Gilded 19th-century salon ballrooms & imperial Nile gardens',
    subtitleAr: 'صالونات مذهبة من القرن التاسع عشر وحدائق ملكية مطلة على النيل',
    locationEn: 'Garden City • Nile Corniche',
    locationAr: 'جاردن سيتي • كورنيش النيل',
    districtEn: 'Garden City',
    districtAr: 'جاردن سيتي',
    capacity: 900,
    price: 340000,
    rating: '4.99',
    reviewsCount: 71,
    safetyEn: 'Diplomatic Protocol',
    safetyAr: 'بروتوكول دبلوماسي',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=80&auto=format&fit=crop',
    tagEn: 'Imperial Palace',
    tagAr: 'قصر إمبراطوري',
    featuresEn: ['Gilded Ballrooms', 'Nile Promenade', 'Private Helipad'],
    featuresAr: ['قاعات مذهبة', 'شرفة نيلية', 'مهبط طائرات']
  },
  {
    id: 'citadel',
    venueId: 'citadel-pavilion',
    titleEn: 'Citadel Royal Pavilion',
    titleAr: 'جناح القلعة الأثري الملكي',
    subtitleEn: 'Historic citadel stone arches & elevated city panoramas',
    subtitleAr: 'أقواس حجرية تاريخية وإطلالات ساحرة على معالم القاهرة القديمة',
    locationEn: 'Old Cairo • Citadel Road',
    locationAr: 'مصر القديمة • طريق القلعة',
    districtEn: 'Citadel',
    districtAr: 'القلعة',
    capacity: 750,
    price: 275000,
    rating: '4.96',
    reviewsCount: 48,
    safetyEn: 'Antiquities Certified',
    safetyAr: 'تصريح وزارة الآثار',
    image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=1200&q=80&auto=format&fit=crop',
    tagEn: 'Stone Pavilion',
    tagAr: 'صرح تاريخي',
    featuresEn: ['Historic Arches', 'Panoramic City View', 'Banquet Hall'],
    featuresAr: ['أقواس تاريخية', 'إطلالة بانورامية', 'قاعة مأدبة']
  },
  {
    id: 'orangery',
    venueId: 'royal-orangery',
    titleEn: 'Royal Orangery & Imperial Gardens',
    titleAr: 'حدائق البرتقال الملكية والواحة',
    subtitleEn: 'Illuminated botanical promenades & imperial glasshouse ballrooms',
    subtitleAr: 'ممرات نباتية مضيئة وصالات زجاجية إمبراطورية للأفراح الراقية',
    locationEn: 'El Gouna • Red Sea Coast',
    locationAr: 'الجونة • ساحل البحر الأحمر',
    districtEn: 'El Gouna',
    districtAr: 'الجونة',
    capacity: 550,
    price: 320000,
    rating: '4.97',
    reviewsCount: 53,
    safetyEn: 'Resort Certified',
    safetyAr: 'ترخيص منتجع سياحي',
    image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=1200&q=80&auto=format&fit=crop',
    tagEn: 'Coastal Oasis',
    tagAr: 'واحة ساحلية',
    featuresEn: ['Botanical Glasshouse', 'Sea Breeze', 'Private Villa'],
    featuresAr: ['صوبة نباتية', 'نسيم بحري', 'فيلا خاصة']
  }
]

// Curated items for GridMotion matching Weddo's Egyptian Royal Estates & Renaissance Exhibition aesthetic
export const GRID_MOTION_ITEMS = [
  // 1. Imperial Cairo Grand Palace
  '/hero_wedding_cairo.jpg',
  // 2. Botanical Olive Groves
  '/venue_olive_garden.jpg',
  // 3. Typographic Badge 1 (English)
  <div key="badge-1" className="flex flex-col items-center justify-center p-3 text-center select-none w-full h-full">
    <span className="font-mono text-[9px] uppercase tracking-widest text-[#d4af37] mb-1 font-semibold">01 // IMPERIAL</span>
    <span className="font-serif text-xs sm:text-sm font-medium leading-tight">The Royal Cairo Grand Palace</span>
    <span className="text-[10px] opacity-75 mt-0.5 font-sans">Garden City • Nile Corniche</span>
  </div>,
  // 4. Grand Nile Waterfront Ballrooms
  '/venue_nile_salon.jpg',
  // 5. Pyramids Heritage Terrace
  '/venue_pyramids_terrace.jpg',
  // 6. Classical Renaissance Art / Folia
  '/folia_dreamboard_art.jpg',
  // 7. Typographic Badge 2 (Arabic)
  <div key="badge-2" className="flex flex-col items-center justify-center p-3 text-center select-none w-full h-full" dir="rtl">
    <span className="font-mono text-[9px] uppercase tracking-widest text-[#10b981] mb-1 font-semibold">معتمد رسمياً</span>
    <span className="font-serif text-xs sm:text-sm font-medium leading-tight">صالون النيل الملكي الإمبراطوري</span>
    <span className="text-[10px] opacity-75 mt-0.5 font-sans">الزمالك • كورنيش النيل</span>
  </div>,
  // 8. Summit Plenary Ballroom
  '/venue_summit_ballroom.jpg',
  // 9. Azure Fountain Court
  '/venue_azure_court.jpg',
  // 10. Luxury Grand Crystal Chandelier Ballroom
  'https://images.unsplash.com/photo-1544077960-604201fe74bc?w=720&q=75&auto=format&fit=crop',
  // 11. Typographic Badge 3 (English)
  <div key="badge-3" className="flex flex-col items-center justify-center p-3 text-center select-none w-full h-full">
    <span className="font-mono text-[9px] uppercase tracking-widest text-[#3b82f6] mb-1 font-semibold">03 // HERITAGE</span>
    <span className="font-serif text-xs sm:text-sm font-medium leading-tight">Pyramids Monument Vista</span>
    <span className="text-[10px] opacity-75 mt-0.5 font-sans">Giza Plateau Amphitheater</span>
  </div>,
  // 12. Royal Botanical Glasshouse Pavilion
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=720&q=75&auto=format&fit=crop',
  // 13. Palace Banquet Table & Candlelight Salon
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=720&q=75&auto=format&fit=crop',
  // 14. Typographic Badge 4 (Arabic)
  <div key="badge-4" className="flex flex-col items-center justify-center p-3 text-center select-none w-full h-full" dir="rtl">
    <span className="font-mono text-[9px] uppercase tracking-widest text-[#d4af37] mb-1 font-semibold">١٠٠٪ حماية مدنية</span>
    <span className="font-serif text-xs sm:text-sm font-medium leading-tight">أرقى قصور مصر التاريخية</span>
    <span className="text-[10px] opacity-75 mt-0.5 font-sans">تسعير مباشر بالجنيه المصري</span>
  </div>,
  // 15. Classical Marble Colonnades
  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=720&q=75&auto=format&fit=crop',
  // 16. Sunset Nile Waterfront Celebration
  'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=720&q=75&auto=format&fit=crop',
]

export function HeroSection({
  filters,
  setFilters,
  onResetFilters,
  lang,
  t,
  theme,
  isPreloading = false
}) {
  const [activeEstateIndex, setActiveEstateIndex] = useState(0)

  // Animation synchronization: ensures hero typography animates only after preloader finishes
  const [animationReady, setAnimationReady] = useState(() => !isPreloading)
  const [animationCycle, setAnimationCycle] = useState(0)

  useEffect(() => {
    if (isPreloading) {
      setAnimationReady(false)
    } else {
      // 100ms breathing room after preloader curtain wipe completes to synchronize render & paint
      const timer = setTimeout(() => {
        setAnimationReady(true)
        setAnimationCycle(prev => prev + 1)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [isPreloading])

  // Mobile Device & Accessibility Detection
  const [isMobile, setIsMobile] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Dynamic Theme Detection (Light & Dark)
  const [currentTheme, setCurrentTheme] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
    }
    return 'light'
  })

  useEffect(() => {
    const checkViewportAndTheme = () => {
      const mobile = window.innerWidth < 768 || (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches)
      setIsMobile(mobile)
      setPrefersReducedMotion(typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      const isDark = document.documentElement.classList.contains('dark')
      setCurrentTheme(isDark ? 'dark' : 'light')
    }
    checkViewportAndTheme()

    const themeObserver = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains('dark')
      setCurrentTheme(isDark ? 'dark' : 'light')
    })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] })

    window.addEventListener('resize', checkViewportAndTheme, { passive: true })
    return () => {
      themeObserver.disconnect()
      window.removeEventListener('resize', checkViewportAndTheme)
    }
  }, [])

  // 3D CircularGallery Ref & Mapped Items
  const galleryRef = useRef(null)

  const circularGalleryItems = useMemo(() => {
    return HERO_FEATURED_ESTATES.map((estate) => {
      const isArabic = lang === 'ar'
      const title = isArabic ? estate.titleAr : estate.titleEn
      const district = isArabic ? estate.districtAr : estate.districtEn
      const subtitle = isArabic ? estate.subtitleAr : estate.subtitleEn
      const priceText = formatEGP(estate.price, lang)
      const capText = isArabic ? `سعة ${estate.capacity}` : `Capacity ${estate.capacity}`
      return {
        image: estate.image,
        text: title,
        description: `${district} • ${capText} • ${priceText} — ${subtitle}`,
        alt: title,
        estate
      }
    })
  }, [lang])

  const activeEstate = HERO_FEATURED_ESTATES[activeEstateIndex] || HERO_FEATURED_ESTATES[0]

  const scrollToSearch = () => {
    sound.tap()
    const el = document.getElementById('search-cockpit-anchor')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const isDark = currentTheme === 'dark'

  // Dynamic Theme-Contrasting BorderGlow Colors:
  // Dark Theme: Radiant Luminous Egyptian Gold & Warm Amber against dark onyx backdrop
  // Light Theme: Royal Egyptian Sapphire Blue (#2563eb / #1d4ed8) - Complementary 5.5:1 contrast against light linen backdrop
  const venueGlowColor = isDark ? '45 94 65' : '220 95 50'
  const venueGlowColors = isDark 
    ? ['#fbe8a6', '#d4af37', '#e5c158', '#b38728'] 
    : ['#1e40af', '#2563eb', '#38bdf8', '#0284c7', '#1d4ed8']

  return (
    <section className="relative w-full overflow-hidden bg-[#c4c3b6] dark:bg-[#121210] transition-colors duration-500 pb-16">
      
      {/* =========================================================================
          100% FULL-WIDTH CINEMATIC HERO WITH GRIDMOTION DYNAMIC BACKGROUND
          ========================================================================= */}
      <div className="relative w-full overflow-hidden min-h-[780px] sm:min-h-[840px] lg:min-h-[920px] flex flex-col justify-between pt-24 sm:pt-28 lg:pt-32 pb-10 sm:pb-14 lg:pb-16">
        
        {/* 1. Full-Bleed GridMotion Animated Background Wall */}
        <div className="absolute inset-0 w-full h-full overflow-hidden select-none">
          <GridMotion
            items={GRID_MOTION_ITEMS}
            rows={isMobile ? 3 : 4}
            aspectRatio={1.38}
            gap={16}
            radius={18}
            angle={-8}
            tilt={10}
            speed={prefersReducedMotion ? 0 : (isMobile ? 12 : 18)}
            direction="alternate"
            parallax={0.35}
            spotlight={0.65}
            dim={currentTheme === 'dark' ? 0.35 : 0.25}
            fade={0.5}
            grayscale={false}
            theme={currentTheme}
            className="w-full h-full"
          />

          {/* Dual-Theme Atmospheric Scrims: Guarantees WCAG AAA contrast for headlines, chips, and foreground cards */}
          <div className="absolute inset-0 bg-[#c4c3b6]/78 dark:bg-[#121210]/84 pointer-events-none transition-colors duration-500" />
          <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#c4c3b6] via-[#c4c3b6]/75 to-transparent dark:from-[#121210] dark:via-[#121210]/75 dark:to-transparent pointer-events-none transition-colors duration-500" />
          <div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-[#c4c3b6] via-[#c4c3b6]/90 to-transparent dark:from-[#121210] dark:via-[#121210]/90 dark:to-transparent pointer-events-none transition-colors duration-500" />
        </div>

        {/* 2. Monumental Centered Headline */}
        <div className="relative z-20 my-auto text-center max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          
          {/* Monumental Display Headline in Davinci Serif */}
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-[72px] font-normal text-[#1c1b18] dark:text-white tracking-[-0.03em] leading-[1.12] drop-shadow-sm transition-colors duration-300">
            {animationReady ? (
              <TextAnimate
                key={`hero-title-1-${lang}-${animationCycle}`}
                by="word"
                animation="blurInUp"
                duration={0.4}
                startOnView={false}
                once={true}
                as="span"
                className="inline-block"
              >
                {lang === 'ar' ? 'أرقى قصور وأفراح مصر التاريخية' : 'Unforgettable Royal Egyptian'}
              </TextAnimate>
            ) : (
              <span className="inline-block opacity-0 select-none pointer-events-none">
                {lang === 'ar' ? 'أرقى قصور وأفراح مصر التاريخية' : 'Unforgettable Royal Egyptian'}
              </span>
            )}
            <br />
            {animationReady ? (
              <TextAnimate
                key={`hero-title-2-${lang}-${animationCycle}`}
                by="word"
                animation="blurInUp"
                delay={0.18}
                duration={0.4}
                startOnView={false}
                once={true}
                as="span"
                className="italic font-normal text-[#1c1b18]/90 dark:text-white/95 inline-block"
              >
                {lang === 'ar' ? 'وقاعات القمم والمؤتمرات' : 'Wedding & Summit Experience'}
              </TextAnimate>
            ) : (
              <span className="italic font-normal text-[#1c1b18]/90 dark:text-white/95 inline-block opacity-0 select-none pointer-events-none">
                {lang === 'ar' ? 'وقاعات القمم والمؤتمرات' : 'Wedding & Summit Experience'}
              </span>
            )}
          </h1>

          {/* Clean Editorial Subline */}
          {animationReady ? (
            <TextAnimate
              key={`hero-sub-${lang}-${animationCycle}`}
              by="word"
              animation="fadeIn"
              delay={0.36}
              duration={0.6}
              startOnView={false}
              once={true}
              as="p"
              className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-[#595855] dark:text-white/85 max-w-2xl mx-auto font-sans leading-relaxed transition-colors duration-300"
            >
              {lang === 'ar'
                ? 'دليلك المعتمد لأندر القصور الملكية وشرفات النيل وقاعات المؤتمرات بأسعار مباشرة بالجنيه وتأمين الحماية المدنية.'
                : 'Curated royal Nile ballrooms, historic Giza terraces, and executive summit auditoriums with verified direct EGP rates.'}
            </TextAnimate>
          ) : (
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-[#595855] dark:text-white/85 max-w-2xl mx-auto font-sans leading-relaxed transition-colors duration-300 opacity-0 select-none pointer-events-none">
              {lang === 'ar'
                ? 'دليلك المعتمد لأندر القصور الملكية وشرفات النيل وقاعات المؤتمرات بأسعار مباشرة بالجنيه وتأمين الحماية المدنية.'
                : 'Curated royal Nile ballrooms, historic Giza terraces, and executive summit auditoriums with verified direct EGP rates.'}
            </p>
          )}
        </div>

        {/* 3. Bottom Hero Content: Full-Width Architectural Folio */}
        <div className="relative z-20 w-full max-w-full mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 mt-auto flex flex-col">
          
          {/* CircularGallery 3D Venues Arc */}
          <div className="relative w-full h-[430px] xs:h-[460px] sm:h-[500px] md:h-[530px] lg:h-[560px] my-1 overflow-hidden select-none">
            <CircularGallery
              ref={galleryRef}
              items={circularGalleryItems}
              bend={isMobile ? 2.2 : 2.8}
              textColor={isDark ? '#f5f5f3' : '#1c1b18'}
              borderRadius={0.06}
              scrollEase={0.06}
              scrollSpeed={isMobile ? 1.8 : 2}
              itemSize={isMobile ? 0.88 : 0.94}
              itemAspect={0.76}
              gap={0.24}
              wave={prefersReducedMotion ? 0 : (isMobile ? 0.5 : 1)}
              fadeEdges={0.14}
              shadow={0.3}
              snap={true}
              autoScroll={0}
              openOnClick={true}
              font={lang === 'ar' ? 'bold 22px "Amiri", "Almarai", serif' : 'bold 22px "Playfair Display", Georgia, serif'}
              onActiveChange={(index) => setActiveEstateIndex(index)}
              onItemClick={(item, index) => {
                sound.tap();
                setActiveEstateIndex(index);
              }}
              className="w-full h-full"
            />
          </div>

          {/* Active Estate Highlight Floating Glass Bar */}
          {activeEstate && (
            <div className="mt-1 sm:mt-2 flex items-center justify-between gap-3 px-4 py-2 sm:px-6 sm:py-2.5 rounded-2xl bg-white/70 dark:bg-black/55 backdrop-blur-xl border border-[#dfdcd5] dark:border-white/15 shadow-md max-w-4xl mx-auto w-full transition-all duration-300">
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                <span className={`shrink-0 w-2.5 h-2.5 rounded-full ${isDark ? 'bg-[#d4af37] shadow-[0_0_8px_#d4af37]' : 'bg-[#2563eb] shadow-[0_0_8px_rgba(37,99,235,0.7)]'}`} />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h5 className="font-serif text-sm sm:text-base font-medium text-[#1c1b18] dark:text-white truncate">
                      {lang === 'ar' ? activeEstate.titleAr : activeEstate.titleEn}
                    </h5>
                    <span className="hidden xs:inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-[#595855] dark:text-white/80">
                      <MapPin className="w-2.5 h-2.5 text-[#d4af37]" />
                      <span>{lang === 'ar' ? activeEstate.districtAr : activeEstate.districtEn}</span>
                    </span>
                    <span className="hidden md:inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-[#10b981]">
                      <Users className="w-2.5 h-2.5" />
                      <span>{activeEstate.capacity}</span>
                    </span>
                  </div>
                  <p className="text-[11px] text-[#595855] dark:text-white/70 truncate hidden sm:block">
                    {lang === 'ar' ? activeEstate.subtitleAr : activeEstate.subtitleEn}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
                <div className="text-right rtl:text-left">
                  <span className="font-mono text-xs sm:text-sm font-bold text-[#1c1b18] dark:text-white block">
                    {formatEGP(activeEstate.price, lang)}
                  </span>
                  <span className="text-[9px] text-[#595855] dark:text-white/60 block">
                    {lang === 'ar' ? 'سعر مباشر بالجنيه' : 'Direct EGP Rate'}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={scrollToSearch}
                  className="inline-flex items-center gap-1 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-semibold text-xs transition-all duration-200 active:scale-95 shadow-md cursor-pointer bg-[#ffffff] text-[#1c1b18] hover:bg-[#1c1b18] hover:text-[#ffffff] border border-black/15 dark:bg-[#d4af37] dark:text-[#121210] dark:border-transparent dark:hover:bg-[#ffffff] dark:hover:text-[#000000] dark:shadow-[0_0_14px_rgba(212,175,55,0.4)]"
                >
                  <span>{lang === 'ar' ? 'استكشف' : 'Explore'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 rtl:rotate-90" />
                </button>
              </div>
            </div>
          )}

          {/* Gestural Swipe / Drag Affordance */}
          <div className="flex items-center justify-center gap-2 mt-2 text-[11px] font-mono text-[#595855] dark:text-white/75 tracking-wider">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/60 dark:bg-black/40 backdrop-blur-md border border-[#dfdcd5] dark:border-white/10 shadow-xs">
              <Sparkles className="w-3 h-3 text-[#d4af37]" />
              <span>{lang === 'ar' ? 'اسحب باللمس أو الماوس لتدوير القصور ثلاثية الأبعاد • اضغط للتكبير' : 'Drag to rotate 3D gallery • Click card to expand'}</span>
            </span>
          </div>
        </div>

      </div>

      {/* =========================================================================
          SEARCH COCKPIT INTEGRATION (Positioned Underneath 100% Panoramic Hero)
          ========================================================================= */}
      <div 
        id="search-cockpit-anchor" 
        className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 relative z-30"
      >
        <BorderGlow
          edgeSensitivity={26}
          glowColor={isDark ? "40 80 80" : "220 95 50"}
          backgroundColor={isDark ? '#181715' : '#ffffff'}
          borderRadius={24}
          glowRadius={36}
          glowIntensity={isDark ? 1.1 : 1.3}
          coneSpread={26}
          animated={false}
          colors={isDark ? ['#d4af37', '#f59e0b', '#10b981'] : ['#1e40af', '#2563eb', '#38bdf8']}
          className="w-full shadow-2xl transition-all"
        >
          <SearchCockpit
            filters={filters}
            setFilters={setFilters}
            onReset={onResetFilters}
            lang={lang}
            t={t}
          />
        </BorderGlow>
      </div>

    </section>
  )
}

export default HeroSection
