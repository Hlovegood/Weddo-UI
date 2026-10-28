import React, { useState, useRef, useEffect, useMemo } from 'react'
import { motion } from 'motion/react'
import { 
  ArrowRight, 
  ArrowUpRight,
  Sparkles, 
  Compass, 
  ChevronRight, 
  ChevronLeft,
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
    image: '/venue_olive_garden.jpg',
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
    image: '/venue_nile_salon.jpg',
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
    image: '/venue_pyramids_terrace.jpg',
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
    image: '/venue_summit_ballroom.jpg',
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
    image: '/venue_azure_court.jpg',
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
    image: '/hero_wedding_cairo.jpg',
    tagEn: 'Imperial Palace',
    tagAr: 'قصر إمبراطوري',
    featuresEn: ['Gilded Ballrooms', 'Nile Promenade', 'Private Helipad'],
    featuresAr: ['قاعات مذهبة', 'شرفة نيلية', 'مهبط طائرات']
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
  t
}) {
  const [activeEstateIndex, setActiveEstateIndex] = useState(0)

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

  // Desktop Horizontal Cursor Drag-to-Scroll State
  const scrollContainerRef = useRef(null)
  const isDraggingRef = useRef(false)
  const startXRef = useRef(0)
  const scrollLeftRef = useRef(0)
  const hasMovedRef = useRef(false)
  const [isGrabbing, setIsGrabbing] = useState(false)

  const isProgrammaticScrollRef = useRef(false)
  const programmaticTimeoutRef = useRef(null)

  // Mobile & Scroll Snap Detection: updates active card index indicator
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    let rafId
    const handleScroll = () => {
      if (isProgrammaticScrollRef.current) return
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        if (isProgrammaticScrollRef.current) return
        const cards = container.children
        if (!cards || cards.length === 0) return
        const containerRect = container.getBoundingClientRect()
        const containerCenter = containerRect.left + containerRect.width / 2

        let closestIdx = 0
        let minDiff = Infinity

        for (let i = 0; i < cards.length; i++) {
          const cardRect = cards[i].getBoundingClientRect()
          const cardCenter = cardRect.left + cardRect.width / 2
          const diff = Math.abs(containerCenter - cardCenter)
          if (diff < minDiff) {
            minDiff = diff
            closestIdx = i
          }
        }

        if (closestIdx !== activeEstateIndex) {
          setActiveEstateIndex(closestIdx)
        }
      })
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      cancelAnimationFrame(rafId)
      container.removeEventListener('scroll', handleScroll)
    }
  }, [activeEstateIndex])

  // Desktop Mouse Drag Handlers
  const handlePointerDown = (e) => {
    if (isMobile) return
    if (e.button !== 0 && e.pointerType === 'mouse') return
    const container = scrollContainerRef.current
    if (!container) return

    isDraggingRef.current = true
    hasMovedRef.current = false
    startXRef.current = e.pageX - container.offsetLeft
    scrollLeftRef.current = container.scrollLeft
    setIsGrabbing(true)

    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch {}
  }

  const handlePointerMove = (e) => {
    if (isMobile || !isDraggingRef.current) return
    const container = scrollContainerRef.current
    if (!container) return

    const x = e.pageX - container.offsetLeft
    const distance = x - startXRef.current

    if (Math.abs(distance) > 5) {
      hasMovedRef.current = true
    }

    container.scrollLeft = scrollLeftRef.current - distance * 1.3
  }

  const handlePointerUp = (e) => {
    if (isMobile) return
    isDraggingRef.current = false
    setIsGrabbing(false)
    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {}

    if (hasMovedRef.current) {
      // Find and highlight closest card after manual mouse drag
      const container = scrollContainerRef.current
      if (!container) return
      const cards = container.children
      if (!cards || cards.length === 0) return
      const containerRect = container.getBoundingClientRect()
      const containerCenter = containerRect.left + containerRect.width / 2

      let closestIdx = 0
      let minDiff = Infinity
      for (let i = 0; i < cards.length; i++) {
        const cardRect = cards[i].getBoundingClientRect()
        const cardCenter = cardRect.left + cardRect.width / 2
        const diff = Math.abs(containerCenter - cardCenter)
        if (diff < minDiff) {
          minDiff = diff
          closestIdx = i
        }
      }
      scrollToCardIndex(closestIdx)
    }
  }

  // Card Selection & Scroll To Card (Highlights & Centers the Card)
  const handleCardClick = (idx) => {
    if (hasMovedRef.current) return
    scrollToCardIndex(idx)
  }

  const scrollToCardIndex = (idx) => {
    sound.tap()
    setActiveEstateIndex(idx)

    // Lock programmatic scroll to prevent interim scroll events from overriding highlight
    isProgrammaticScrollRef.current = true
    clearTimeout(programmaticTimeoutRef.current)
    programmaticTimeoutRef.current = setTimeout(() => {
      isProgrammaticScrollRef.current = false
    }, 600)

    const container = scrollContainerRef.current
    if (!container) return
    const cards = container.children
    if (cards && cards[idx]) {
      const card = cards[idx]
      const containerRect = container.getBoundingClientRect()
      const cardRect = card.getBoundingClientRect()
      const delta = (cardRect.left - containerRect.left) - (containerRect.width - cardRect.width) / 2
      if (Math.abs(delta) > 1) {
        container.scrollBy({ left: delta, behavior: 'smooth' })
      }
    }
  }

  // Direction Button Handlers: Navigate and highlight previous/next venue
  const handlePrevVenue = () => {
    const total = HERO_FEATURED_ESTATES.length
    const prevIdx = activeEstateIndex <= 0 ? total - 1 : activeEstateIndex - 1
    scrollToCardIndex(prevIdx)
  }

  const handleNextVenue = () => {
    const total = HERO_FEATURED_ESTATES.length
    const nextIdx = (activeEstateIndex + 1) % total
    scrollToCardIndex(nextIdx)
  }

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
            <span>
              {lang === 'ar' ? 'أرقى قصور وأفراح مصر التاريخية' : 'Unforgettable Royal Egyptian'}
            </span>
            <br />
            <span className="italic font-normal text-[#1c1b18]/90 dark:text-white/95">
              {lang === 'ar' ? 'وقاعات القمم والمؤتمرات' : 'Wedding & Summit Experience'}
            </span>
          </h1>

          {/* Clean Editorial Subline */}
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-[#595855] dark:text-white/85 max-w-2xl mx-auto font-sans leading-relaxed transition-colors duration-300">
            {lang === 'ar'
              ? 'دليلك المعتمد لأندر القصور الملكية وشرفات النيل وقاعات المؤتمرات بأسعار مباشرة بالجنيه وتأمين الحماية المدنية.'
              : 'Curated royal Nile ballrooms, historic Giza terraces, and executive summit auditoriums with verified direct EGP rates.'}
          </p>
        </div>

        {/* 3. Bottom Hero Content: Full-Width Architectural Folio */}
        <div className="relative z-20 w-full max-w-full mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 mt-auto flex flex-col">
          
          {/* Top Toolbar: Label + Pagination Dots + Desktop Scroll Arrows */}
          <div className="flex items-center justify-between mb-2 px-2 sm:px-4">
            
            {/* Title & Folio Count */}
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#1c1b18] dark:text-white/95 font-medium transition-colors">
                {lang === 'ar' ? 'معرض القصور الملكية المعمارية' : 'Sovereign Venues Folio'}
              </span>
              <span className="text-[10px] sm:text-xs text-[#d4af37] font-mono px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/15">
                {activeEstateIndex + 1} / {HERO_FEATURED_ESTATES.length}
              </span>
            </div>

            {/* Controls: Interactive Pagination Dots + Desktop Arrow Buttons */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Interactive Pagination Dots with accessible touch targets */}
              <div className="flex items-center gap-0.5 px-2 py-1 rounded-full bg-white/60 dark:bg-black/40 backdrop-blur-md border border-[#dfdcd5] dark:border-white/15 shadow-xs transition-colors">
                {HERO_FEATURED_ESTATES.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    onClick={() => scrollToCardIndex(dotIdx)}
                    aria-label={`Go to estate ${dotIdx + 1}`}
                    className="p-1 flex items-center justify-center cursor-pointer transition-transform active:scale-90"
                  >
                    <span className={`block transition-all duration-300 rounded-full ${
                      activeEstateIndex === dotIdx 
                        ? (isDark 
                            ? 'w-4 sm:w-5 h-2 bg-[#d4af37] shadow-[0_0_8px_#d4af37]' 
                            : 'w-4 sm:w-5 h-2 bg-[#2563eb] shadow-[0_0_8px_rgba(37,99,235,0.7)]')
                        : 'w-2 h-2 bg-black/25 dark:bg-white/40 hover:bg-black/50 dark:hover:bg-white/70'
                    }`} />
                  </button>
                ))}
              </div>

              {/* Direction Arrow Buttons: Directly changes and highlights selected venue */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={handlePrevVenue}
                  aria-label={lang === 'ar' ? 'عرض القصر السابق وتحديده' : 'Highlight previous estate'}
                  title={lang === 'ar' ? 'عرض القصر السابق وتحديده' : 'Highlight previous estate'}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/80 dark:bg-black/45 hover:bg-white dark:hover:bg-black/75 backdrop-blur-md border border-[#dfdcd5] dark:border-white/25 text-[#1c1b18] dark:text-white flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-sm"
                >
                  <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 rtl:rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={handleNextVenue}
                  aria-label={lang === 'ar' ? 'عرض القصر التالي وتحديده' : 'Highlight next estate'}
                  title={lang === 'ar' ? 'عرض القصر التالي وتحديده' : 'Highlight next estate'}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/80 dark:bg-black/45 hover:bg-white dark:hover:bg-black/75 backdrop-blur-md border border-[#dfdcd5] dark:border-white/25 text-[#1c1b18] dark:text-white flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-sm"
                >
                  <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 rtl:rotate-180" />
                </button>
              </div>

            </div>
          </div>

          {/* Venues Carousel: Expanded Full-Width Container with generous breathing room for glow & shadow */}
          <div
            ref={scrollContainerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className={`flex items-stretch gap-4 sm:gap-6 overflow-x-auto pt-6 pb-9 sm:pt-7 sm:pb-10 select-none scrollbar-none transition-all px-3 sm:px-5 lg:px-8 ${
              isMobile 
                ? 'snap-x snap-mandatory scroll-smooth' 
                : (isGrabbing ? 'cursor-grabbing' : 'cursor-grab')
            }`}
            style={{
              scrollBehavior: isGrabbing ? 'auto' : 'smooth',
              WebkitOverflowScrolling: 'touch',
              scrollPaddingLeft: isMobile ? '20px' : '32px',
              scrollPaddingRight: isMobile ? '20px' : '32px'
            }}
          >
            {HERO_FEATURED_ESTATES.map((estate, idx) => {
              const isActive = activeEstateIndex === idx
              return (
                <BorderGlow
                  key={estate.id}
                  active={isActive}
                  glowColor={venueGlowColor}
                  colors={venueGlowColors}
                  borderRadius={24}
                  glowRadius={isDark ? 22 : (isMobile ? 22 : 25)}
                  glowIntensity={isDark ? (isMobile ? 1.15 : 1.1) : (isActive ? 1.6 : 1.25)}
                  coneSpread={isDark ? 24 : 26}
                  edgeSensitivity={isDark ? 30 : 20}
                  backgroundColor="#12100d"
                  style={{
                    scrollSnapAlign: isMobile ? 'center' : 'none'
                  }}
                  className={`relative shrink-0 select-none transition-all duration-300 ${
                    isMobile
                      ? 'w-[75vw] max-w-[285px] h-[385px] xs:h-[405px] sm:h-[420px]'
                      : 'w-[265px] sm:w-[285px] md:w-[310px] lg:w-[335px] xl:w-[350px] h-[385px] sm:h-[405px] md:h-[420px] lg:h-[435px]'
                  } ${
                    isActive 
                      ? (isDark 
                          ? 'ring-2 ring-[#d4af37] shadow-[0_12px_28px_-6px_rgba(0,0,0,0.85),0_0_18px_rgba(212,175,55,0.35)] z-10' 
                          : 'ring-2 ring-[#2563eb] shadow-[0_12px_28px_-6px_rgba(0,0,0,0.2),0_0_16px_rgba(37,99,235,0.7),0_0_24px_rgba(37,99,235,0.35)] z-10')
                      : (isDark
                          ? 'opacity-100 shadow-[0_8px_20px_-4px_rgba(0,0,0,0.5)] hover:-translate-y-1'
                          : 'opacity-100 shadow-[0_8px_20px_-4px_rgba(0,0,0,0.12)] hover:shadow-[0_10px_24px_-4px_rgba(0,0,0,0.18),0_0_14px_rgba(37,99,235,0.35)] hover:-translate-y-1')
                  }`}
                  onClick={() => handleCardClick(idx)}
                >
                  {/* Inner Card Presentation - 100% Solid Opaque Foundation */}
                  <div className="relative w-full h-full rounded-[inherit] overflow-hidden flex flex-col justify-between group pointer-events-auto bg-[#12100d]">
                    
                    {/* Solid Opaque Base Underlay */}
                    <div className="absolute inset-0 bg-[#12100d] pointer-events-none" />

                    {/* Dimmed Card Thumbnail Image - highlighted card is illuminated */}
                    <img
                      src={estate.image}
                      alt={lang === 'ar' ? estate.titleAr : estate.titleEn}
                      draggable={false}
                      className={`absolute inset-0 w-full h-full object-cover object-center ${
                        isActive ? 'brightness-[0.82]' : 'brightness-[0.66]'
                      } group-hover:brightness-[0.84] group-hover:scale-105 transition-all duration-500 pointer-events-none select-none`}
                    />

                    {/* Cinematic Ambient Dimming Scrim Layer */}
                    <div className={`absolute inset-0 ${
                      isActive ? 'bg-black/25' : 'bg-black/42'
                    } group-hover:bg-black/20 transition-colors duration-300 pointer-events-none`} />

                    {/* Top Floating Glass Meta Bar */}
                    <div className="relative z-10 p-3 sm:p-3.5 flex items-center justify-between gap-1.5 pointer-events-none">
                      {/* Location Badge */}
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/85 backdrop-blur-md border border-white/20 text-[9px] sm:text-[10px] font-sans font-medium text-white shadow-md">
                        <MapPin className="w-3 h-3 text-[#d4af37]" />
                        <span>{lang === 'ar' ? estate.districtAr : estate.districtEn}</span>
                      </span>

                      {/* Guest Capacity Badge */}
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/85 backdrop-blur-md border border-white/20 text-[9px] sm:text-[10px] font-mono text-white/95 shadow-md">
                        <Users className="w-3 h-3 text-[#10b981]" />
                        <span>{estate.capacity}</span>
                      </span>
                    </div>

                    {/* Bottom Dark Gradient Overlay with Architectural Details */}
                    <div className="relative z-10 bg-gradient-to-t from-[#12100d] via-[#12100d]/92 to-transparent flex flex-col justify-end p-3.5 sm:p-4 pt-12 text-white">
                      
                      {/* Category Pill Tag & Star Rating */}
                      <div className="flex items-center justify-between mb-1.5">
                        <Badge 
                          variant="secondary"
                          className="text-[9px] font-mono tracking-wider uppercase bg-white/20 backdrop-blur-md text-white border-white/20 px-2 py-0.2"
                        >
                          {lang === 'ar' ? estate.tagAr : estate.tagEn}
                        </Badge>

                        <div className="flex items-center gap-1 text-[11px] font-semibold text-white drop-shadow-xs">
                          <Star className="w-3 h-3 fill-[#d4af37] text-[#d4af37]" />
                          <span>{estate.rating}</span>
                          <span className="text-white/60 text-[9px]">({estate.reviewsCount})</span>
                        </div>
                      </div>

                      {/* Card Title in Davinci Serif Display Font */}
                      <h4 className="font-serif text-base sm:text-lg font-normal text-white leading-tight mb-1 truncate drop-shadow-md">
                        {lang === 'ar' ? estate.titleAr : estate.titleEn}
                      </h4>

                      {/* Architectural Highlight Caption */}
                      <p className="text-[11px] text-white/80 line-clamp-2 leading-relaxed mb-2.5">
                        {lang === 'ar' ? estate.subtitleAr : estate.subtitleEn}
                      </p>

                      {/* Micro Feature Tags */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {(lang === 'ar' ? estate.featuresAr : estate.featuresEn).slice(0, 3).map((feat, fIdx) => (
                          <span
                            key={fIdx}
                            className="text-[9px] font-sans px-2 py-0.5 rounded-full bg-white/10 text-white/90 border border-white/15"
                          >
                            {feat}
                          </span>
                        ))}
                      </div>

                      {/* Price Tag in EGP & Theme-Contrasting Explore Button */}
                      <div className="text-xs font-mono font-semibold text-white flex items-center justify-between border-t border-white/15 pt-2.5">
                        <div className="flex flex-col">
                          <span className="text-white text-sm sm:text-base font-bold">{formatEGP(estate.price, lang)}</span>
                          <span className="text-[9px] text-white/60 font-sans font-normal">
                            {lang === 'ar' ? 'سعر مباشر معتمد بالجنيه' : 'Verified Direct Rate'}
                          </span>
                        </div>

                        {/* Theme-Adaptive Contrasting Explore Button:
                            Light Mode: Crisp Paper White with dark charcoal text & subtle border
                            Dark Mode: Luminous Royal Egyptian Gold (#d4af37) with obsidian black text */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            scrollToSearch()
                          }}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full font-semibold text-[11px] transition-all duration-200 active:scale-95 shadow-md cursor-pointer bg-[#ffffff] text-[#1c1b18] hover:bg-[#1c1b18] hover:text-[#ffffff] border border-black/15 dark:bg-[#d4af37] dark:text-[#121210] dark:border-transparent dark:hover:bg-[#ffffff] dark:hover:text-[#000000] dark:shadow-[0_0_14px_rgba(212,175,55,0.4)]"
                        >
                          <span>{lang === 'ar' ? 'استكشف' : 'Explore'}</span>
                          <ArrowUpRight className="w-3 h-3 rtl:rotate-90" />
                        </button>
                      </div>

                    </div>

                  </div>
                </BorderGlow>
              )
            })}
          </div>

          {/* Mobile Gestural Swipe Affordance */}
          <div className="sm:hidden flex items-center justify-center gap-2 -mt-2 mb-2 text-[11px] font-mono text-[#595855] dark:text-white/75 tracking-wider">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/60 dark:bg-black/40 backdrop-blur-md border border-[#dfdcd5] dark:border-white/10 shadow-xs">
              <Sparkles className="w-3 h-3 text-[#d4af37]" />
              <span>{lang === 'ar' ? 'اسحب باللمس لتصفح القاعات' : 'Swipe to explore estates'}</span>
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
