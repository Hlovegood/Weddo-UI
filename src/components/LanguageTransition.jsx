import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Globe } from 'lucide-react'
import { sound } from '../lib/sound'

export function LanguageTransition({
  isActive,
  currentLang = 'en',
  targetLang = 'ar',
  theme = 'light',
  onHalfway,
  onComplete
}) {
  const containerRef = useRef(null)
  const curtainRef = useRef(null)
  const contentRef = useRef(null)
  const progressBarRef = useRef(null)
  const globeIconRef = useRef(null)

  const isRunningRef = useRef(false)
  const onHalfwayRef = useRef(onHalfway)
  onHalfwayRef.current = onHalfway
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete
  const targetLangRef = useRef(targetLang)
  targetLangRef.current = targetLang

  useEffect(() => {
    if (!isActive) {
      isRunningRef.current = false
      return
    }

    if (isRunningRef.current) return
    isRunningRef.current = true

    const container = containerRef.current
    const curtain = curtainRef.current
    const content = contentRef.current
    const bar = progressBarRef.current
    const globe = globeIconRef.current

    if (!container || !curtain) {
      onHalfwayRef.current?.()
      onCompleteRef.current?.()
      isRunningRef.current = false
      return
    }

    const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Play subtle acoustic pop feedback
    try {
      sound.pop()
    } catch {}

    if (reducedMotion) {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(container, { display: 'none' })
          isRunningRef.current = false
          onCompleteRef.current?.()
        }
      })
      gsap.set(container, { display: 'flex' })
      tl.to(curtain, { opacity: 1, duration: 0.12 })
        .call(() => onHalfwayRef.current?.())
        .to(curtain, { opacity: 0, duration: 0.14, delay: 0.04 })
      return () => {
        isRunningRef.current = false
        tl.kill()
      }
    }

    // Directional spatial physics:
    // Switching to Arabic (RTL): Curtain sweeps from Right to Left (100% -> 0% -> -100%)
    // Switching to English (LTR): Curtain sweeps from Left to Right (-100% -> 0% -> 100%)
    const isEnteringRTL = targetLangRef.current === 'ar'
    const initialX = isEnteringRTL ? 100 : -100
    const exitX = isEnteringRTL ? -100 : 100

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(container, { display: 'none' })
        isRunningRef.current = false
        onCompleteRef.current?.()
      }
    })

    // 1. Initial setup
    gsap.set(container, { display: 'flex', pointerEvents: 'auto' })
    gsap.set(curtain, { xPercent: initialX, opacity: 1 })
    gsap.set(content, { opacity: 0, scale: 0.92, y: 14 })
    if (bar) gsap.set(bar, { scaleX: 0, transformOrigin: isEnteringRTL ? 'right center' : 'left center' })
    if (globe) gsap.set(globe, { rotation: 0, scale: 0.85 })

    // 2. Wipe in: Curtain sweeps across the screen along the reading direction
    tl.to(curtain, {
      xPercent: 0,
      duration: 0.32,
      ease: 'power3.inOut'
    })
    // Animate content reveal
    .to(content, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.22,
      ease: 'power2.out'
    }, '-=0.16')
    // Spin globe emblem
    .to(globe, {
      rotation: isEnteringRTL ? -360 : 360,
      scale: 1,
      duration: 0.36,
      ease: 'power2.out'
    }, '-=0.22')
    // Hairline progress bar sweep
    .to(bar, {
      scaleX: 1,
      duration: 0.24,
      ease: 'power2.inOut'
    }, '-=0.2')
    // Halfway mark: trigger actual language & direction state flip
    .call(() => {
      onHalfwayRef.current?.()
      try {
        sound.success()
      } catch {}
    })
    // Brief hold for visual apprehension
    .to({}, { duration: 0.08 })
    // Fade out center content slightly before exit
    .to(content, {
      opacity: 0,
      scale: 0.96,
      duration: 0.16,
      ease: 'power2.in'
    })
    // Curtain exits along the directional path
    .to(curtain, {
      xPercent: exitX,
      duration: 0.34,
      ease: 'power3.inOut'
    }, '-=0.08')

    return () => {
      isRunningRef.current = false
      tl.kill()
    }
  }, [isActive])

  return (
    <div
      ref={containerRef}
      aria-hidden={!isActive}
      className={`fixed inset-0 z-[9999] hidden items-center justify-center select-none overflow-hidden ${
        isActive ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      {/* Full-bleed Directional Curtain */}
      <div
        ref={curtainRef}
        className={`absolute inset-0 w-full h-full flex flex-col items-center justify-center shadow-2xl ${
          theme === 'dark' 
            ? 'bg-[#121210] text-[#f5f5f3] border-x border-[#282723]' 
            : 'bg-[#c4c3b6] text-[#1c1b18] border-x border-[#dfdcd5]'
        }`}
      >
        {/* Subtle Architectural Texture Vignette */}
        <div className="absolute inset-0 bg-radial from-transparent via-black/5 dark:via-black/25 to-black/20 dark:to-black/50 pointer-events-none" />

        {/* Central Typographic Medallion */}
        <div
          ref={contentRef}
          className={`relative z-10 max-w-md w-full mx-auto px-6 py-8 rounded-3xl flex flex-col items-center text-center backdrop-blur-2xl border shadow-2xl ${
            theme === 'dark'
              ? 'bg-[#181715]/90 border-white/15 text-[#f5f5f3]'
              : 'bg-[#ffffff]/90 border-[#dfdcd5] text-[#1c1b18]'
          }`}
        >
          {/* Animated Globe Emblem with Gold Halo */}
          <div
            ref={globeIconRef}
            className="w-16 h-16 rounded-full flex items-center justify-center mb-4 relative shadow-lg bg-gradient-to-br from-[#d4af37]/20 via-transparent to-[#d4af37]/10 border border-[#d4af37]/40"
          >
            <Globe className="w-8 h-8 text-[#d4af37]" />
            <div className="absolute inset-0 rounded-full border border-[#d4af37] animate-ping opacity-25" />
          </div>

          {/* Morphing Language Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono tracking-wider font-semibold uppercase mb-3 bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/15">
            <span className={currentLang === 'en' ? 'text-[#d4af37]' : 'opacity-70'}>EN</span>
            <span className="text-[#d4af37] font-bold">⇄</span>
            <span className={currentLang === 'ar' ? 'text-[#d4af37]' : 'opacity-70'}>العربية</span>
          </div>

          {/* Display Headline in Davinci Serif */}
          <h3 className="font-serif text-2xl sm:text-3xl font-normal leading-tight mb-2 tracking-tight">
            {targetLang === 'ar' ? 'العربية • لغة الأصالة والتراث' : 'English • Sovereign Heritage'}
          </h3>

          {/* Editorial Subline */}
          <p className="text-xs sm:text-sm opacity-80 font-sans max-w-xs leading-relaxed mb-6">
            {targetLang === 'ar'
              ? 'جارٍ تحويل الواجهة والمنظومة المعمارية لقصور مصر التاريخية'
              : 'Switching platform architecture to English'}
          </p>

          {/* Gold Hairline Progress Bar */}
          <div className="w-48 h-1 rounded-full bg-black/10 dark:bg-white/15 overflow-hidden relative">
            <div
              ref={progressBarRef}
              className="w-full h-full bg-gradient-to-r from-[#d4af37] via-[#f3e8c8] to-[#d4af37] shadow-[0_0_8px_#d4af37]"
            />
          </div>

          {/* Fine Print Protocol Badge */}
          <span className="mt-4 text-[10px] font-mono uppercase tracking-widest text-[#d4af37] opacity-90">
            {targetLang === 'ar' ? 'المنظومة المعمارية الملكية' : 'Sovereign Architectural Protocol'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default LanguageTransition
