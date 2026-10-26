import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { WeddoLogo } from './WeddoLogo'

export function Preloader({ onComplete, lang = 'en' }) {
  const [percent, setPercent] = useState(0)
  const [statusText, setStatusText] = useState('01 / Cataloging Royal Nile & Estate Venues')
  const [isExiting, setIsExiting] = useState(false)
  
  const containerRef = useRef(null)
  const contentRef = useRef(null)
  const barRef = useRef(null)
  const tlRef = useRef(null)
  const exitingRef = useRef(false)

  const steps = [
    { p: 18, textEn: '01 / Cataloging Royal Nile & Estate Venues', textAr: '٠١ / فهرسة القصور النيلية والمنتجعات' },
    { p: 48, textEn: '02 / Indexing Giza Pyramids & Open Lawns', textAr: '٠٢ / تجهيز أفق الأهرامات والمساحات المفتوحة' },
    { p: 78, textEn: '03 / Calibrating High-Tech Summit Plenary Halls', textAr: '٠٣ / معايرة قاعات المؤتمرات والقمم الذكية' },
    { p: 100, textEn: '04 / Exhibition Ready • Cairo, Egypt', textAr: '٠٤ / اكتمل المعرض • القاهرة، مصر' },
  ]

  const handleExit = () => {
    if (exitingRef.current) return
    exitingRef.current = true
    setIsExiting(true)

    if (tlRef.current) {
      tlRef.current.kill()
    }

    // Awwwards-style architectural curtain wipe
    const exitTl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete()
      }
    })

    exitTl
      .to(contentRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.45,
        ease: 'power3.in'
      })
      .to(containerRef.current, {
        yPercent: -100,
        duration: 0.85,
        ease: 'power4.inOut'
      }, '-=0.15')
  }

  useEffect(() => {
    const counterObj = { val: 0 }

    tlRef.current = gsap.timeline({
      onUpdate: () => {
        const current = Math.round(counterObj.val)
        setPercent(current)
        
        // update status text based on progress
        if (current < 35) {
          setStatusText(lang === 'ar' ? steps[0].textAr : steps[0].textEn)
        } else if (current < 70) {
          setStatusText(lang === 'ar' ? steps[1].textAr : steps[1].textEn)
        } else if (current < 95) {
          setStatusText(lang === 'ar' ? steps[2].textAr : steps[2].textEn)
        } else {
          setStatusText(lang === 'ar' ? steps[3].textAr : steps[3].textEn)
        }
      },
      onComplete: () => {
        handleExit()
      }
    })

    // Smooth progress counter tween
    tlRef.current.to(counterObj, {
      val: 100,
      duration: 1.8,
      ease: 'power2.inOut',
    })

    return () => {
      if (tlRef.current) tlRef.current.kill()
    }
  }, [lang])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col justify-between bg-[#c4c3b6] text-[#000000] p-6 sm:p-12 select-none overflow-hidden"
      style={{ willChange: 'transform' }}
    >
      {/* Top Meta Bar */}
      <div ref={contentRef} className="flex items-center justify-between text-xs font-mono tracking-widest uppercase border-b border-[#000000]/15 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#000000]" />
          <span className="font-semibold">WEDDO • EGYPT VENUES ARCHIVE</span>
        </div>

        <div className="hidden sm:block text-[#595855]">
          VOL. 2026 // CAIRO • GIZA • NEW CAIRO
        </div>

        <button
          onClick={handleExit}
          className="text-xs uppercase underline tracking-wider hover:opacity-60 transition-opacity cursor-pointer"
        >
          {lang === 'ar' ? 'تخطي ↗' : 'Skip Intro ↗'}
        </button>
      </div>

      {/* Center Monumental Display Wordmark */}
      <div className="my-auto py-12 flex flex-col items-center text-center">
        {/* Ceremonial Brand Monogram Seal */}
        <div className="mb-5 animate-pulse">
          <WeddoLogo iconOnly={true} size="lg" />
        </div>

        <div className="overflow-hidden mb-4">
          <h1 className="font-serif text-6xl sm:text-8xl md:text-9xl font-normal tracking-[-0.04em] leading-[0.88] text-[#000000]">
            Weddo
          </h1>
        </div>

        <p className="font-serif italic text-base sm:text-xl text-[#595855] max-w-lg mb-8">
          {lang === 'ar' 
            ? 'معرض معماري لأرقى قصور الأفراح الملكية وقاعات المؤتمرات والقمم'
            : 'An architectural exhibition of royal wedding estates & plenary summits.'
          }
        </p>

        {/* Large Monospace Percentage Counter */}
        <div className="font-mono text-5xl sm:text-7xl font-light tracking-tighter text-[#000000] tabular-nums">
          {percent < 10 ? `0${percent}` : percent}%
        </div>
      </div>

      {/* Bottom Progress & Status Bar */}
      <div className="pt-6 border-t border-[#000000]/15 space-y-3">
        {/* Hairline Progress Indicator */}
        <div className="w-full bg-[#dfdcd5] h-[2px] overflow-hidden">
          <div
            ref={barRef}
            className="h-full bg-[#000000] transition-all duration-75 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-mono text-[#595855] gap-2">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#000000] animate-pulse" />
            <span>{statusText}</span>
          </div>

          <div className="tracking-widest uppercase text-[11px]">
            {lang === 'ar' ? 'مستوحى من المعارض المعمارية الكلاسيكية' : 'Renaissance Gallery Standard'}
          </div>
        </div>
      </div>
    </div>
  )
}
