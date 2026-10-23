import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowUp } from 'lucide-react'

export function ScrollToTop({ lang = 'en' }) {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)))
      }

      if (window.scrollY > 320) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  // Circular progress calculation
  const radius = 18
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className={`fixed bottom-6 ${
            lang === 'ar' ? 'left-6' : 'right-6'
          } z-40 flex items-center gap-2 group select-none`}
        >
          <button
            type="button"
            onClick={scrollToTop}
            aria-label={lang === 'ar' ? 'الرجوع لأعلى الصفحة' : 'Scroll to top'}
            className="relative w-12 h-12 rounded-full bg-[#141211]/90 hover:bg-[#1a1715] border border-[#2c2621] hover:border-[#dfc086]/50 shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-md flex items-center justify-center transition-all duration-300 cursor-pointer group-hover:scale-105 active:scale-95"
          >
            {/* Circular Progress SVG */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 44 44">
              <circle
                cx="22"
                cy="22"
                r={radius}
                className="stroke-[#27221e]"
                strokeWidth="2"
                fill="none"
              />
              <circle
                cx="22"
                cy="22"
                r={radius}
                className="stroke-[#dfc086] transition-all duration-150 ease-out"
                strokeWidth="2.5"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="none"
              />
            </svg>

            {/* Arrow icon */}
            <ArrowUp className="w-4 h-4 text-[#dfc086] group-hover:-translate-y-0.5 transition-transform duration-200" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
export default ScrollToTop
