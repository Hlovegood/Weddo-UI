import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { WeddoLogo } from './WeddoLogo'
import { sound } from '../lib/sound'

export const ROUTE_METADATA = {
  home: {
    code: '00 // MONUMENTAL EXHIBITION',
    badgeEn: 'Sovereign Venues Exhibition',
    badgeAr: 'المعرض المعماري الرئيسي',
    titleEn: 'Egypt’s Sovereign Estates & Royal Ballrooms',
    titleAr: 'أرقى قصور وأفراح مصر التاريخية وقاعات المؤتمرات',
    descEn: 'Architectural exhibition of 8 certified palaces, Nile salons, and conference estates.',
    descAr: 'معرض معماري لـ ٨ من أندر القصور التراثية والحدائق وقاعات المؤتمرات.'
  },
  venues: {
    code: '01 // ARCHITECTURAL ARCHIVE',
    badgeEn: 'Certified Venues & Estates Catalog',
    badgeAr: 'كتالوج القاعات والقصور الملكية',
    titleEn: 'Curated Venues & Estates Catalog',
    titleAr: 'كتالوج القاعات والقصور الملكية المعتمدة',
    descEn: 'Inspect certified space capacities, verified EGP package guide prices, and floorplans.',
    descAr: 'استكشف مواصفات المساحات، باقات الأسعار المعتمدة بالجنيه، وتفاصيل الأمان.'
  },
  planning: {
    code: '02 // FOLIA PLANNING SUITE',
    badgeEn: 'Folia Architecture & Run-of-Show',
    badgeAr: 'ستوديو فوليا المعماري المتكامل',
    titleEn: 'Folia Event Planning Architecture',
    titleAr: 'منظومة تخطيط وتنظيم ليلة العمر',
    descEn: 'Interactive dream boards, seating chart canvas, and dynamic budget allocation.',
    descAr: 'مخطط الطاولات الذكي، لوحة الألوان والخامات، وحاسبة الميزانية الديناميكية بالجنيه.'
  },
  pricing: {
    code: '03 // TRANSPARENT EGP PRICING',
    badgeEn: 'Official Rate Cards & Direct ROI',
    badgeAr: 'باقات الأسعار المعتمدة وحاسبة العائد',
    titleEn: 'Transparent EGP Pricing & ROI Engine',
    titleAr: 'باقات الأسعار المعتمدة وحاسبة التوفير المالي',
    descEn: 'Certified venue pricing bands without hidden broker commissions or markups.',
    descAr: 'تسعير إرشادي مباشر بالجنيه المصري لكل قاعة بدون عمولات وسيطة مخفية.'
  },
  'vendor-ops': {
    code: '04 // ESTATE OPERATIONS PORTAL',
    badgeEn: 'Hospitality Management & Blackout Engine',
    badgeAr: 'بوابة إدارة القاعات والعمليات',
    titleEn: 'Estate Operations & Management Hub',
    titleAr: 'بوابة إدارة القاعات والعمليات الميدانية',
    descEn: 'Active spaces capacity management, date lockouts, and tasting pipelines.',
    descAr: 'إدارة مساحات القاعة، حظر المواعيد المحجوزة، وتتبع طلبات جلسات التذوق.'
  },
  compliance: {
    code: '05 // CIVIL DEFENSE & SAFETY',
    badgeEn: 'Five Pillars of Hospitality Safety',
    badgeAr: 'ميثاق الأمان والسلامة والتراخيص',
    titleEn: 'The Five Pillars of Egyptian Wedding Safety',
    titleAr: 'ميثاق الأمان والسلامة للأفراح المصرية',
    descEn: 'Public audit verification, MOT license validation, and noise curfew guidelines.',
    descAr: 'فاحص الاعتماد الميداني، تراخيص وزارة السياحة، ومحاكي محدد الديسيبل للصوت.'
  }
}

export function NavigationPreloader({
  isActive,
  targetRoute = 'home',
  lang = 'en',
  theme = 'light',
  onHalfway,
  onComplete
}) {
  const containerRef = useRef(null)
  const curtainRef = useRef(null)
  const contentRef = useRef(null)
  const progressBarRef = useRef(null)
  const progressTextRef = useRef(null)

  const meta = ROUTE_METADATA[targetRoute] || ROUTE_METADATA.home

  useEffect(() => {
    if (!isActive) return

    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
    const curtain = curtainRef.current
    const content = contentRef.current
    const bar = progressBarRef.current
    const progressText = progressTextRef.current

    if (!curtain || !content) {
      onHalfway?.()
      onComplete?.()
      return
    }

    // Play subtle navigation acoustic feedback
    try {
      sound.tap()
    } catch {
      // Ignore if audio is muted or blocked
    }

    if (reducedMotion) {
      // Fast accessibility fallback: 120ms fade
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete?.()
        }
      })
      tl.to(curtain, { opacity: 1, duration: 0.1 })
        .call(() => onHalfway?.())
        .to(curtain, { opacity: 0, duration: 0.15, delay: 0.05 })
      return () => tl.kill()
    }

    // Full Awwwards / Apple-grade architectural curtain transition
    const counterObj = { val: 0 }
    const tl = gsap.timeline()

    // 1. Initial setup
    gsap.set(curtain, { yPercent: -100, opacity: 1 })
    gsap.set(content, { opacity: 0, y: 18 })
    if (bar) gsap.set(bar, { scaleX: 0, transformOrigin: lang === 'ar' ? 'right center' : 'left center' })

    // 2. Wipe in: Curtain slides down into view
    tl.to(curtain, {
      yPercent: 0,
      duration: 0.34,
      ease: 'power3.inOut'
    })
    .to(content, {
      opacity: 1,
      y: 0,
      duration: 0.22,
      ease: 'power2.out'
    }, '-=0.14')

    // Progress bar fill & counter
    if (bar) {
      tl.to(bar, {
        scaleX: 1,
        duration: 0.28,
        ease: 'power2.inOut'
      }, '-=0.2')
    }

    tl.to(counterObj, {
      val: 100,
      duration: 0.28,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (progressText) {
          progressText.innerText = `${Math.round(counterObj.val)}%`
        }
      }
    }, '-=0.28')

    // 3. Halfway mark: Route swaps underneath & scroll resets
    tl.call(() => {
      onHalfway?.()
    })

    // Brief dwell for DOM paint & visual weight
    tl.to({}, { duration: 0.12 })

    // 4. Wipe out: Content fades and curtain pulls upward
    tl.to(content, {
      opacity: 0,
      y: -18,
      duration: 0.2,
      ease: 'power2.in'
    })
    .to(curtain, {
      yPercent: -100,
      duration: 0.38,
      ease: 'power4.inOut'
    }, '-=0.08')
    .call(() => {
      onComplete?.()
    })

    return () => {
      tl.kill()
    }
  }, [isActive, targetRoute, lang])

  if (!isActive) return null

  const isDark = theme === 'dark'

  return (
    <div
      ref={containerRef}
      aria-live="polite"
      aria-label={lang === 'ar' ? 'جارٍ تحميل الصفحة المعمارية...' : 'Loading architectural exhibit...'}
      className="fixed inset-0 z-[99999] pointer-events-auto select-none overflow-hidden"
    >
      {/* The Architectural Curtain Canvas */}
      <div
        ref={curtainRef}
        className={`w-full h-full flex flex-col justify-between p-6 sm:p-12 relative overflow-hidden transition-colors ${
          isDark ? 'bg-[#121210] text-[#f5f5f3]' : 'bg-[#c4c3b6] text-[#000000]'
        }`}
        style={{ willChange: 'transform' }}
      >
        {/* Subtle Architectural Grid Texture */}
        <div 
          aria-hidden="true" 
          className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(currentColor_1px,transparent_1px)] [background-size:24px_24px]" 
        />

        {/* Top Hairline Accent Line */}
        <div className={`absolute top-0 inset-x-0 h-[1px] ${isDark ? 'bg-[#2e2d28]' : 'bg-[#dfdcd5]'}`} />
        <div className={`absolute bottom-0 inset-x-0 h-[1px] ${isDark ? 'bg-[#2e2d28]' : 'bg-[#dfdcd5]'}`} />

        {/* Inner Content Cluster */}
        <div ref={contentRef} className="w-full h-full flex flex-col justify-between relative z-10 max-w-5xl mx-auto">
          
          {/* Top Meta Bar */}
          <div className={`flex items-center justify-between text-xs font-mono uppercase tracking-widest pb-4 border-b ${
            isDark ? 'border-[#2e2d28] text-[#a8a69e]' : 'border-[#dfdcd5] text-[#595855]'
          }`}>
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
              <span className="font-semibold">{meta.code}</span>
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <span className="opacity-60">ARCHIVE VOL. 2026 //</span>
              <span className="font-semibold">{lang === 'ar' ? 'القاهرة • الجيزة • الإسكندرية' : 'CAIRO • GIZA • ALEX'}</span>
            </div>

            <div ref={progressTextRef} className="font-mono text-sm font-semibold tabular-nums text-current">
              0%
            </div>
          </div>

          {/* Center Stage: Monogram Seal & Incoming Exhibit Typography */}
          <div className="my-auto py-8 flex flex-col items-center text-center max-w-2xl mx-auto">
            
            {/* Ceremonial Monogram Seal */}
            <div className="mb-6 transform hover:scale-105 transition-transform">
              <WeddoLogo iconOnly={true} size="md" dark={isDark} />
            </div>

            {/* Exhibit Monospace Category Badge */}
            <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-wider mb-4 border ${
              isDark 
                ? 'bg-[#1c1b18] border-[#2e2d28] text-[#a8a69e]' 
                : 'bg-[#e7e5e4] border-[#dfdcd5] text-[#595855]'
            }`}>
              <span>{lang === 'ar' ? meta.badgeAr : meta.badgeEn}</span>
            </div>

            {/* Display Headline */}
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-[-0.035em] leading-[1.05] mb-4 text-current">
              {lang === 'ar' ? meta.titleAr : meta.titleEn}
            </h2>

            {/* Editorial Description */}
            <p className={`text-xs sm:text-sm font-sans max-w-lg leading-relaxed ${
              isDark ? 'text-[#a8a69e]' : 'text-[#595855]'
            }`}>
              {lang === 'ar' ? meta.descAr : meta.descEn}
            </p>
          </div>

          {/* Bottom Precision Hairline Progress Bar */}
          <div className="pt-4 space-y-2">
            <div className={`w-full h-[2px] overflow-hidden ${isDark ? 'bg-[#282723]' : 'bg-[#dfdcd5]'}`}>
              <div
                ref={progressBarRef}
                className={`h-full ${isDark ? 'bg-[#f5f5f3]' : 'bg-[#000000]'}`}
              />
            </div>
            <div className={`flex items-center justify-between text-[10px] font-mono uppercase tracking-wider ${
              isDark ? 'text-[#a8a69e]/80' : 'text-[#595855]/80'
            }`}>
              <span>{lang === 'ar' ? 'الانتقال بين صالات المعرض الملكي...' : 'Switching architectural gallery salons...'}</span>
              <span>WEDDO ARCHIVE</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default NavigationPreloader
