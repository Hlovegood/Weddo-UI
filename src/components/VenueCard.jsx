import React, { useRef } from 'react'
import { motion } from 'motion/react'
import gsap from 'gsap'
import { animate } from 'animejs'
import {
  Heart,
  Scale,
  Users,
  MapPin,
  Sparkles,
  ArrowUpRight,
  Star,
  Building2,
  Clock,
  ShieldCheck
} from 'lucide-react'
import { formatEGP } from '@/lib/utils'
import { sound } from '@/lib/sound'
import { toast } from '@/components/ui/sonner'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card'
import { Badge } from '@/components/ui/badge'

export function VenueCard({
  venue,
  lang,
  isShortlisted,
  onToggleShortlist,
  isCompared,
  onToggleCompare,
  onSelectDetails,
  onQuickInquire,
  t
}) {
  const cardRef = useRef(null)

  const name = venue.name[lang] || venue.name.en
  const summary = venue.summary[lang] || venue.summary.en
  const badgeText = venue.badge?.[lang] || venue.badge?.en
  const address = venue.address?.[lang] || venue.address?.en

  const lowestPrice = venue.packages?.reduce((min, p) => p.price < min ? p.price : min, venue.packages[0]?.price || 0)
  const maxCapacity = venue.spaces?.reduce((max, s) => s.capacity > max ? s.capacity : max, 0)

  // 1. GSAP 3D Interactive Parallax Tilt on Mouse Move (Desktop Only - avoids mobile scroll jank)
  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    if (typeof window !== 'undefined' && !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    // Apple TV-style subtle physical tilt
    const rotateX = -(y / (rect.height / 2)) * 4.5
    const rotateY = (x / (rect.width / 2)) * 4.5

    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      duration: 0.25,
      ease: 'power1.out'
    })
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out'
    })
  }

  // 2. AnimeJS Micro-interaction on Action Click
  const triggerButtonPop = (el) => {
    if (el) {
      animate(el, {
        scale: [1, 1.35, 0.95, 1],
        rotate: [0, -12, 12, 0],
        duration: 450,
        ease: 'outElastic(1, .5)'
      })
    }
  }

  const handleCompareClick = (e) => {
    e.stopPropagation()
    triggerButtonPop(e.currentTarget)
    sound.tap()
    onToggleCompare(venue.id)
    if (!isCompared) {
      sound.success()
      toast(lang === 'ar' ? 'أُضيفت القاعة للمقارنة' : 'Added to Venue Comparison', {
        description: name,
        action: {
          label: lang === 'ar' ? 'تراجع' : 'Undo',
          onClick: () => onToggleCompare(venue.id),
        },
      })
    }
  }

  const handleShortlistClick = (e) => {
    e.stopPropagation()
    triggerButtonPop(e.currentTarget)
    sound.tap()
    onToggleShortlist(venue.id)
    if (!isShortlisted) {
      sound.success()
      toast(lang === 'ar' ? 'حُفظت في قائمتك المفضلة' : 'Saved to Your Shortlist', {
        description: name,
        action: {
          label: lang === 'ar' ? 'تراجع' : 'Undo',
          onClick: () => onToggleShortlist(venue.id),
        },
      })
    }
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ type: 'spring', damping: 25, stiffness: 280 }}
      whileHover={{ y: -6 }}
      className="group relative rounded-[9px] bg-[#e7e5e4] dark:bg-[#1c1b18] border border-[#dfdcd5] dark:border-[#2e2d28] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-[#000000]/[0.08] dark:hover:shadow-black/50 hover:border-[#000000] dark:hover:border-[#f5f5f3] will-change-transform @container"
      style={{ transformStyle: 'preserve-3d' }}
    >

      {/* Cover Image & Overlays */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#faf8f5] dark:bg-[#121210]">
        <img
          src={venue.coverPhoto}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/75 via-[#000000]/15 to-transparent" />

        {/* Top Badges & Actions */}
        <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
          {badgeText ? (
            <Badge variant="live" pulse={true} className="shadow-md rtl:tracking-normal rtl:font-sans">
              <Sparkles className="w-3 h-3 text-[#dfdcd5] shrink-0" />
              <span>{badgeText}</span>
            </Badge>
          ) : <div />}

          <div className="flex items-center gap-2 sm:gap-1.5">
            {/* Compare Toggle with Tooltip */}
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={handleCompareClick}
                  aria-label={isCompared ? t.removeFromCompare : t.addToCompare}
                  className={`tap-bounce w-9 h-9 sm:w-8 sm:h-8 flex items-center justify-center rounded-full backdrop-blur-md transition-all cursor-pointer ${isCompared
                    ? 'bg-[#000000] text-white shadow-xs dark:bg-[#f5f5f3] dark:text-[#0b0b0a]'
                    : 'bg-white/85 text-[#000000] hover:bg-white dark:bg-[#1c1b18]/90 dark:text-[#f5f5f3] dark:hover:bg-[#282723]'
                    }`}
                >
                  <Scale className="w-4 h-4 shrink-0" />
                </motion.button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p className="rtl:font-sans">{isCompared ? t.removeFromCompare : t.addToCompare}</p>
              </TooltipContent>
            </Tooltip>

            {/* Shortlist Heart with Tooltip */}
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={handleShortlistClick}
                  aria-label={isShortlisted ? t.savedToShortlist : t.saveToShortlist}
                  className={`tap-bounce w-9 h-9 sm:w-8 sm:h-8 flex items-center justify-center rounded-full backdrop-blur-md transition-all cursor-pointer ${isShortlisted
                    ? 'bg-[#ffe4e6] text-[#e11d48] shadow-xs dark:bg-rose-950/80 dark:text-rose-400'
                    : 'bg-white/85 text-[#000000] hover:bg-white dark:bg-[#1c1b18]/90 dark:text-[#f5f5f3] dark:hover:bg-[#282723]'
                    }`}
                >
                  <Heart className={`w-4 h-4 shrink-0 ${isShortlisted ? 'fill-[#e11d48] text-[#e11d48]' : ''}`} />
                </motion.button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p className="rtl:font-sans">{isShortlisted ? t.savedToShortlist : t.saveToShortlist}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Bottom Banner on Image: Area & Rating with BiDi Protection */}
        <div className="absolute bottom-3 inset-x-4 flex items-center justify-between text-white z-10 gap-2">
          <div className="flex items-center gap-1.5 text-[12px] font-medium bg-[#000000]/80 dark:bg-[#121210]/90 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 dark:border-white/20 shadow-xs min-w-0 max-w-[65%]">
            <MapPin className="w-3.5 h-3.5 text-[#dfdcd5] shrink-0" />
            <span className="truncate rtl:font-sans">{address}</span>
          </div>

          <div className="flex items-center gap-1 text-[12px] font-semibold bg-[#000000]/80 dark:bg-[#121210]/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 dark:border-white/20 shadow-xs shrink-0">
            <Star className="w-3.5 h-3.5 text-[#f59e0b] fill-[#f59e0b] shrink-0" />
            <span>
              {lang === 'ar'
                ? venue.rating.toLocaleString('ar-EG', { minimumFractionDigits: 1, maximumFractionDigits: 2 })
                : venue.rating}
            </span>
            <span className="text-white/70 font-normal font-sans" dir="ltr">
              <bdi>({lang === 'ar' ? venue.reviewsCount.toLocaleString('ar-EG') : venue.reviewsCount})</bdi>
            </span>
          </div>
        </div>
      </div>

      {/* Card Content Area */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
        <div>
          {/* Title in Serif with HoverCard Live Inspection */}
          <HoverCard>
            <HoverCardTrigger asChild>
              <h3
                onClick={() => {
                  sound.pop()
                  onSelectDetails(venue)
                }}
                className="font-serif text-2xl font-normal tracking-[-0.02em] rtl:tracking-normal rtl:leading-[1.35] text-[#000000] dark:text-[#f5f5f3] hover:opacity-75 transition-opacity cursor-pointer leading-[1.2] mb-2.5 inline-block"
              >
                {name}
              </h3>
            </HoverCardTrigger>
            <HoverCardContent side="top" className="w-80 rtl:text-right">
              <div className="flex items-start gap-3">
                <img
                  src={venue.coverPhoto}
                  alt={name}
                  className="w-14 h-14 rounded-[8px] object-cover shrink-0 border border-[#dfdcd5] dark:border-[#2e2d28]"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span className="text-[11px] font-semibold tracking-wide uppercase rtl:tracking-normal rtl:normal-case text-emerald-700 dark:text-emerald-400">
                      {lang === 'ar' ? 'معتمد رسمياً' : 'Verified Partner'}
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-[#000000] dark:text-[#f5f5f3] truncate mt-0.5">{name}</h4>
                  <p className="text-[11px] text-[#595855] dark:text-[#a8a69e] flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3 shrink-0" />
                    <span>{lang === 'ar' ? 'متوسط الرد: ١٢ دقيقة' : 'Avg reply: ~12 mins'}</span>
                  </p>
                </div>
              </div>
              <div className="mt-3 pt-2.5 border-t border-[#dfdcd5] dark:border-[#2e2d28] text-[11px] text-[#595855] dark:text-[#a8a69e] grid grid-cols-2 gap-1.5">
                <span className="flex items-center gap-1">✓ {lang === 'ar' ? 'تصريح صوت معتمد' : 'Sound permit verified'}</span>
                <span className="flex items-center gap-1">✓ {lang === 'ar' ? 'فيلا تحضير للعروس' : 'Bridal suite access'}</span>
                <span className="flex items-center gap-1">✓ {lang === 'ar' ? 'خدمة صف سيارات' : 'Valet parking included'}</span>
                <span className="flex items-center gap-1">✓ {lang === 'ar' ? 'تذوق مجاني للباقة' : 'Complimentary tasting'}</span>
              </div>
            </HoverCardContent>
          </HoverCard>

          {/* Body summary */}
          <p className="text-[14px] text-[#595855] dark:text-[#a8a69e] leading-[1.5] rtl:leading-[1.7] rtl:text-[13.5px] line-clamp-2 mb-5 font-sans">
            {summary}
          </p>

          {/* Spaces & Capacity Snapshot */}
          <div className="grid grid-cols-2 gap-2 p-3.5 rounded-[9px] bg-[#dfdcd5]/40 dark:bg-[#282723]/60 border border-[#dfdcd5] dark:border-[#2e2d28] mb-6">
            <div className="flex flex-col">
              <span className="text-[11px] font-mono rtl:font-sans uppercase rtl:normal-case tracking-wider rtl:tracking-normal text-[#595855] dark:text-[#a8a69e]">
                {lang === 'ar' ? 'المساحات' : 'Spaces'}
              </span>
              <span className="text-[13px] font-medium text-[#000000] dark:text-[#f5f5f3] flex items-center gap-1.5 mt-0.5">
                <Building2 className="w-3.5 h-3.5 text-[#000000] dark:text-[#f5f5f3] shrink-0" />
                <span className="truncate">
                  {lang === 'ar'
                    ? (venue.spaces?.length === 1
                        ? 'مساحة مجهزة واحدة'
                        : venue.spaces?.length === 2
                          ? 'مساحتان مجهزتان'
                          : `${venue.spaces?.length.toLocaleString('ar-EG')} مساحات مجهزة`)
                    : `${venue.spaces?.length} Named Spaces`}
                </span>
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-[11px] font-mono rtl:font-sans uppercase rtl:normal-case tracking-wider rtl:tracking-normal text-[#595855] dark:text-[#a8a69e]">
                {t.capacityUpTo}
              </span>
              <span className="text-[13px] font-medium text-[#000000] dark:text-[#f5f5f3] flex items-center gap-1.5 mt-0.5">
                <Users className="w-3.5 h-3.5 text-[#000000] dark:text-[#f5f5f3] shrink-0" />
                <span className="truncate">
                  {lang === 'ar'
                    ? `${maxCapacity.toLocaleString('ar-EG')} ${t.guestsLabel}`
                    : `${maxCapacity.toLocaleString('en-US')} ${t.guestsLabel}`}
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Card Footer: Starting Price & Primary CTA */}
        <div className="pt-4 border-t border-[#dfdcd5] dark:border-[#2e2d28] flex flex-col @[440px]:flex-row @[440px]:items-center justify-between gap-3">
          {/* Price Block: Spans row on narrow cards; stacks vertically on wide cards */}
          <div className="flex items-baseline justify-between @[440px]:flex-col @[440px]:justify-start @[440px]:items-start min-w-0">
            <span className="text-[11px] font-mono rtl:font-sans text-[#595855] dark:text-[#a8a69e] uppercase rtl:normal-case tracking-wider rtl:tracking-normal">
              {lang === 'ar' ? 'تبدأ الباقات من' : 'Starting from'}
            </span>
            <span className="text-[16px] sm:text-[17px] font-serif rtl:font-sans font-semibold sm:font-normal tracking-tight rtl:tracking-normal text-[#000000] dark:text-[#f5f5f3] whitespace-nowrap">
              {formatEGP(lowestPrice, lang)}
            </span>
          </div>

          {/* Action Buttons: 2-column balanced grid on narrow cards; inline auto-width on wide cards */}
          <div className="grid grid-cols-2 @[440px]:flex items-center gap-2 shrink-0">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                sound.pop()
                onSelectDetails(venue)
              }}
              className="tap-bounce px-3 sm:px-3.5 py-2 min-h-[38px] rounded-[28.8px] text-[11px] sm:text-xs font-medium bg-white dark:bg-[#282723] text-[#000000] dark:text-[#f5f5f3] hover:bg-[#dfdcd5] dark:hover:bg-[#34332e] border border-[#dfdcd5] dark:border-[#2e2d28] transition-colors cursor-pointer select-none whitespace-nowrap flex items-center justify-center text-center"
            >
              {lang === 'ar' ? 'التفاصيل' : 'Details'}
            </motion.button>

            {/* Primary Request Date Action */}
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    sound.pop()
                    onQuickInquire(venue)
                  }}
                  className="tap-bounce btn-pill-ink dark:bg-[#f5f5f3] dark:text-[#0b0b0a] text-[11px] sm:text-xs min-h-[38px] px-3.5 sm:px-4 flex items-center justify-center gap-1.5 shadow-xs cursor-pointer select-none whitespace-nowrap group/cta"
                >
                  <span>{lang === 'ar' ? 'طلب حجز' : 'Request Date'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#ffffff] dark:text-[#0b0b0a] rtl:-scale-x-100 transition-transform duration-200 group-hover/cta:translate-x-0.5 rtl:group-hover/cta:-translate-x-0.5 group-hover/cta:-translate-y-0.5 shrink-0" />
                </motion.button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p className="rtl:font-sans">{lang === 'ar' ? 'طلب موعد واستفسار مباشر' : 'Direct structured inquiry'}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

      </div>

    </motion.div>
  )
}
