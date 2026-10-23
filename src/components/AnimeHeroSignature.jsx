import React, { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { createTimeline } from 'animejs'
import { Sparkles, RotateCcw } from 'lucide-react'

// Motion variants for smooth and clean staggered revealing
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 22, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1]
    }
  }
}

export function AnimeHeroSignature({ lang = 'en' }) {
  const ring1Ref = useRef(null)
  const ring2Ref = useRef(null)
  const diamondRef = useRef(null)
  const sparklesRef = useRef(null)
  const timelineRef = useRef(null)

  const runAnimation = () => {
    // Reset monogram vector states smoothly
    if (ring1Ref.current) {
      ring1Ref.current.style.strokeDasharray = '400'
      ring1Ref.current.style.strokeDashoffset = '400'
    }
    if (ring2Ref.current) {
      ring2Ref.current.style.strokeDasharray = '400'
      ring2Ref.current.style.strokeDashoffset = '400'
    }
    if (diamondRef.current) {
      diamondRef.current.style.opacity = '0'
      diamondRef.current.style.transform = 'scale(0)'
    }

    try {
      const tl = createTimeline({
        defaults: {
          ease: 'outExpo'
        }
      })

      // Step 1: Draw interlocking gold wedding rings with graceful bezier easing
      tl.add(ring1Ref.current, {
        strokeDashoffset: [400, 0],
        duration: 1100,
        ease: 'inOutCubic'
      }, 50)

      tl.add(ring2Ref.current, {
        strokeDashoffset: [400, 0],
        duration: 1100,
        ease: 'inOutCubic'
      }, 250)

      // Step 2: Solitaire diamond crest blooms and settles
      if (diamondRef.current) {
        tl.add(diamondRef.current, {
          scale: [0, 1.25, 1],
          opacity: [0, 1],
          rotate: [-40, 0],
          duration: 750,
          ease: 'outBack'
        }, 750)
      }

      // Step 3: Delicate star sparkle bursts
      if (sparklesRef.current) {
        const dots = sparklesRef.current.querySelectorAll('.sparkle-dot')
        if (dots.length > 0) {
          tl.add(dots, {
            scale: [0, 1.2, 0],
            opacity: [0, 1, 0],
            translateY: [0, -18],
            delay: (el, i) => i * 85,
            duration: 850,
            ease: 'outQuad'
          }, 1050)
        }
      }

      timelineRef.current = tl
    } catch (err) {
      console.warn('Anime.js timeline initialized with fallback', err)
      if (ring1Ref.current) ring1Ref.current.style.strokeDashoffset = '0'
      if (ring2Ref.current) ring2Ref.current.style.strokeDashoffset = '0'
      if (diamondRef.current) {
        diamondRef.current.style.opacity = '1'
        diamondRef.current.style.transform = 'scale(1)'
      }
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      runAnimation()
    }, 120)
    return () => clearTimeout(timer)
  }, [lang])

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative flex flex-col items-center text-center max-w-4xl mx-auto px-4 pt-12 pb-4"
    >
      {/* Anime.js Signature Monogram: Interlocking Gold Rings & Diamond Sparkle */}
      <motion.div variants={itemVariants} className="relative mb-6 flex flex-col items-center">
        {/* Soft Ambient Champagne Halo behind Monogram */}
        <div className="absolute -inset-4 bg-[radial-gradient(ellipse_at_center,rgba(223,192,134,0.15)_0%,transparent_70%)] blur-2xl pointer-events-none" />

        <div className="relative w-28 h-20 flex items-center justify-center">
          <svg
            viewBox="0 0 160 110"
            className="w-full h-full drop-shadow-[0_0_18px_rgba(223,192,134,0.35)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="ringGold1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#faf5ec" />
                <stop offset="50%" stopColor="#dfc086" />
                <stop offset="100%" stopColor="#8c6b3e" />
              </linearGradient>
              <linearGradient id="ringGold2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="45%" stopColor="#ceab68" />
                <stop offset="100%" stopColor="#70522a" />
              </linearGradient>
              <radialGradient id="diamondGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="60%" stopColor="#dfc086" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#dfc086" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Left Wedding Ring with pre-set stroke dash to avoid flash */}
            <circle
              ref={ring1Ref}
              cx="60"
              cy="62"
              r="34"
              stroke="url(#ringGold1)"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeDasharray="400"
              strokeDashoffset="400"
            />

            {/* Right Wedding Ring Interlocked */}
            <circle
              ref={ring2Ref}
              cx="100"
              cy="62"
              r="34"
              stroke="url(#ringGold2)"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeDasharray="400"
              strokeDashoffset="400"
            />

            {/* Solitaire Diamond Crest on Left Ring */}
            <g
              ref={diamondRef}
              transform="translate(60, 26)"
              className="origin-center"
              style={{ opacity: 0, transform: 'scale(0)' }}
            >
              <circle cx="0" cy="0" r="14" fill="url(#diamondGlow)" opacity="0.7" />
              {/* Brilliant cut facet paths */}
              <polygon points="0,-12 10,-4 6,10 -6,10 -10,-4" fill="#ffffff" stroke="#cbb07a" strokeWidth="1.2" />
              <polygon points="0,-12 5,-4 0,10 -5,-4" fill="#fdfbf7" opacity="0.85" />
              <polygon points="-10,-4 0,-12 10,-4" fill="#ffffff" />
            </g>
          </svg>

          {/* Sparkle Particles Burst */}
          <div ref={sparklesRef} className="absolute inset-0 pointer-events-none">
            <span className="sparkle-dot absolute top-2 left-6 w-1.5 h-1.5 rounded-full bg-[#faecd2] shadow-sm shadow-[#faecd2]" />
            <span className="sparkle-dot absolute top-0 right-10 w-2 h-2 rounded-full bg-white shadow-sm shadow-[#dfc086]" />
            <span className="sparkle-dot absolute bottom-3 right-8 w-1.5 h-1.5 rounded-full bg-[#dfc086] shadow-sm shadow-[#dfc086]" />
            <span className="sparkle-dot absolute top-5 right-4 w-1 h-1 rounded-full bg-white shadow-sm shadow-white" />
          </div>
        </div>

        {/* Refined Anime.js Timeline Replay Trigger */}
        <button
          type="button"
          onClick={runAnimation}
          title={lang === 'ar' ? 'إعادة تشغيل حركة الشعار (Anime.js)' : 'Replay Monogram Signature (Anime.js)'}
          className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181513]/80 hover:bg-[#221d19] border border-[#27221e] hover:border-[#dfc086]/40 text-[11px] text-[#a89d91] hover:text-[#dfc086] transition-all cursor-pointer shadow-sm group select-none backdrop-blur-md"
        >
          <RotateCcw className="w-3 h-3 text-[#dfc086] group-hover:-rotate-90 transition-transform duration-300" />
          <span>{lang === 'ar' ? 'إعادة توقيع الشعار' : 'Replay Signature'}</span>
        </button>
      </motion.div>

      {/* Hero Badge */}
      <motion.div
        variants={itemVariants}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#dfc086]/25 bg-[#201b16]/70 text-[#dfc086] text-xs font-semibold tracking-wide uppercase mb-6 backdrop-blur-md shadow-sm"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#dfc086] animate-pulse" />
        <span>{lang === 'ar' ? 'منصة قاعات وأفراح القاهرة v0.7 — توثيق حقيقي' : 'Authentic Cairo Wedding Venues v0.7'}</span>
      </motion.div>

      {/* Main Headline */}
      <motion.h1
        variants={itemVariants}
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-[#fdfbf7] leading-[1.15] mb-6"
      >
        <span className="block text-[#fdfbf7]">
          {lang === 'ar' ? 'عالم ساحر من أرقى قاعات' : 'Unveil Cairo’s Most'}
        </span>
        <span className="block bg-gradient-to-r from-[#faf5eb] via-[#e2c993] to-[#c7a35e] bg-clip-text text-transparent pb-1">
          {lang === 'ar' ? 'وأفراح القاهرة الحقيقية' : 'Enchanting Wedding Venues'}
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        variants={itemVariants}
        className="text-[#d6cebf] text-base sm:text-lg md:text-xl max-w-2xl font-light leading-relaxed mb-4"
      >
        {lang === 'ar'
          ? 'وداعاً للصور الوهمية وتعتيم الأسعار. تصفح مساحات حقيقية وسعات موثقة، وقارن باقات الأسعار الاسترشادية الشفافة بين كورنيش النيل، التجمع الخامس، ومصر الجديدة.'
          : 'Zero generic placeholders. Explore verified Nile waterfront ballrooms, New Cairo open-air gardens, and Heliopolis heritage palaces with certified capacities and transparent guide rates.'}
      </motion.p>
    </motion.div>
  )
}
export default AnimeHeroSignature
