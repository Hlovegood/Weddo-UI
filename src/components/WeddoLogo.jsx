import React, { useRef } from 'react'
import { animate } from 'animejs'

export function WeddoLogo({ 
  className = '', 
  dark = false, 
  iconOnly = false, 
  size = 'default',
  lang = 'en' 
}) {
  const iconSizes = {
    sm: 'w-7 h-7',
    default: 'w-9 h-9',
    lg: 'w-12 h-12',
  }

  const textSizes = {
    sm: 'text-base',
    default: 'text-lg',
    lg: 'text-2xl',
  }

  const iconRef = useRef(null)

  const handleMouseEnter = () => {
    if (iconRef.current) {
      animate(iconRef.current, {
        scale: [1, 1.1, 1],
        rotate: [0, -4, 4, 0],
        duration: 500,
        ease: 'outElastic(1, .6)'
      })
    }
  }

  const colorClass = dark ? 'text-[#ffffff]' : 'text-[#000000] dark:text-[#f5f5f3]'

  return (
    <div 
      onMouseEnter={handleMouseEnter}
      className={`inline-flex items-center gap-2.5 cursor-pointer select-none group ${className}`}
    >
      {/* Renaissance Gallery Circled Monogram Mark */}
      <div 
        ref={iconRef}
        className={`${iconSizes[size]} flex items-center justify-center shrink-0 transition-transform duration-300 will-change-transform ${colorClass}`}
        aria-hidden="true"
      >
        <svg 
          viewBox="0 0 256 256" 
          className="w-full h-full" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="currentColor" fillRule="evenodd">
            {/* Outer Renaissance Gallery Monoline Ring */}
            <path d="M128,16 A112,112 0 1,0 128,240 A112,112 0 1,0 128,16 Z M128,24 A104,104 0 1,1 128,232 A104,104 0 1,1 128,24 Z" />
            
            {/* Top Architectural Entablature Serifs */}
            <rect x="56" y="69" width="30" height="5" rx="1.5" />
            <rect x="113" y="69" width="32" height="5" rx="1.5" />
            <rect x="172" y="69" width="28" height="5" rx="1.5" />
            
            {/* Left Roman Downstroke (Strict 75.0° Angle) */}
            <polygon points="66,74 80,74 109,182 95,182" />
            {/* Left Hairline Upstroke (Strict 105.0° Angle) */}
            <polygon points="98,182 103,182 132,74 127,74" />
            {/* Bottom Left Plinth Foot */}
            <rect x="91" y="182" width="20" height="4" rx="1" />

            {/* Center Overlapping Roman Downstroke (Strict 75.0° Angle) */}
            <polygon points="121,74 135,74 164,182 150,182" />
            {/* Right Hairline Upstroke (Strict 105.0° Angle) */}
            <polygon points="153,182 158,182 187,74 182,74" />
            {/* Bottom Right Plinth Foot */}
            <rect x="146" y="182" width="20" height="4" rx="1" />
          </g>
        </svg>
      </div>

      {!iconOnly && (
        <div className="flex flex-col text-start">
          <span 
            className={`font-serif ${textSizes[size]} font-normal tracking-[-0.03em] leading-tight transition-colors ${
              dark ? 'text-[#ffffff]' : 'text-[#000000] dark:text-[#f5f5f3]'
            }`}
          >
            WEDDO
          </span>
          <span className="text-[10px] tracking-wider uppercase font-mono text-[#595855] dark:text-[#a8a69e]">
            {lang === 'ar' ? 'قصور وقاعات مصر' : 'Venues & Estates'}
          </span>
        </div>
      )}
    </div>
  )
}
