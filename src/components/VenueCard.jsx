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

  // 1. GSAP 3D Interactive Parallax Tilt on Mouse Move
  const handleMouseMove = (e) => {
    if (!cardRef.current) return
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
      className="group relative rounded-[9px] bg-[#e7e5e4] dark:bg-[#1c1b18] border border-[#dfdcd5] dark:border-[#2e2d28] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-[#000000]/[0.08] dark:hover:shadow-black/50 hover:border-[#000000] dark:hover:border-[#f5f5f3] will-change-transform"
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
            <Badge variant="live" pulse={true} className="shadow-md">
              <Sparkles className="w-3 h-3 text-[#dfdcd5]" />
              <span>{badgeText}</span>
            </Badge>
          ) : <div />}

          <div className="flex items-center gap-1.5">
            {/* Compare Toggle with Tooltip */}
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={handleCompareClick}
                  className={`tap-bounce p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${isCompared
                    ? 'bg-[#000000] text-white shadow-xs dark:bg-[#f5f5f3] dark:text-[#0b0b0a]'
                    : 'bg-white/85 text-[#000000] hover:bg-white dark:bg-[#1c1b18]/90 dark:text-[#f5f5f3] dark:hover:bg-[#282723]'
                    }`}
                >
                  <Scale className="w-4 h-4" />
                </motion.button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>{isCompared ? t.removeFromCompare : t.addToCompare}</p>
              </TooltipContent>
            </Tooltip>

            {/* Shortlist Heart with Tooltip */}
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={handleShortlistClick}
                  className={`tap-bounce p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${isShortlisted
                    ? 'bg-[#ffe4e6] text-[#e11d48] shadow-xs dark:bg-rose-950/80 dark:text-rose-400'
                    : 'bg-white/85 text-[#000000] hover:bg-white dark:bg-[#1c1b18]/90 dark:text-[#f5f5f3] dark:hover:bg-[#282723]'
                    }`}
                >
                  <Heart className={`w-4 h-4 ${isShortlisted ? 'fill-[#e11d48] text-[#e11d48]' : ''}`} />
                </motion.button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>{isShortlisted ? t.savedToShortlist : t.saveToShortlist}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Bottom Banner on Image: Area & Rating */}
        <div className="absolute bottom-3 inset-x-4 flex items-center justify-between text-white z-10">
          <div className="flex items-center gap-1.5 text-[12px] font-medium bg-[#000000]/80 dark:bg-[#121210]/90 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 dark:border-white/20 shadow-xs">
            <MapPin className="w-3.5 h-3.5 text-[#dfdcd5]" />
            <span className="truncate max-w-[170px]">{address}</span>
          </div>

          <div className="flex items-center gap-1 text-[12px] font-semibold bg-[#000000]/80 dark:bg-[#121210]/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 dark:border-white/20 shadow-xs">
            <Star className="w-3.5 h-3.5 text-[#f59e0b] fill-[#f59e0b]" />
            <span>{venue.rating}</span>
            <span className="text-white/60 font-normal">({venue.reviewsCount})</span>
          </div>
        </div>
      </div>

      {/* Card Content Area */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
        <div>
          {/* Title in Serif Davinci Playfair with HoverCard Live Inspection */}
          <HoverCard>
            <HoverCardTrigger asChild>
              <h3
                onClick={() => {
                  sound.pop()
                  onSelectDetails(venue)
                }}
                className="font-serif text-2xl font-normal tracking-[-0.02em] text-[#000000] dark:text-[#f5f5f3] hover:opacity-75 transition-opacity cursor-pointer leading-[1.2] mb-2.5 inline-block"
              >
                {name}
              </h3>
            </HoverCardTrigger>
            <HoverCardContent side="top" className="w-80">
              <div className="flex items-start gap-3">
                <img
                  src={venue.coverPhoto}
                  alt={name}
                  className="w-14 h-14 rounded-[8px] object-cover shrink-0 border border-[#dfdcd5] dark:border-[#2e2d28]"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-[11px] font-semibold tracking-wide uppercase text-emerald-700 dark:text-emerald-400">
                      {lang === 'ar' ? 'معتمد رسمياً' : 'Verified Partner'}
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-[#000000] dark:text-[#f5f5f3] truncate mt-0.5">{name}</h4>
                  <p className="text-[11px] text-[#595855] dark:text-[#a8a69e] flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3" />
                    <span>{lang === 'ar' ? 'متوسط الرد: ١٢ دقيقة' : 'Avg reply: ~12 mins'}</span>
                  </p>
                </div>
              </div>
              <div className="mt-3 pt-2.5 border-t border-[#dfdcd5] dark:border-[#2e2d28] text-[11px] text-[#595855] dark:text-[#a8a69e] grid grid-cols-2 gap-1.5">
                <span className="flex items-center gap-1">✓ {lang === 'ar' ? 'تصريح صوت معتمد' : 'Sound permit verified'}</span>
                <span className="flex items-center gap-1">✓ {lang === 'ar' ? 'فيلا تحضير للعروس' : 'Bridal suite access'}</span>
                <span className="flex items-center gap-1">✓ {lang === 'ar' ? 'خدمة فالي باركينج' : 'Valet parking included'}</span>
                <span className="flex items-center gap-1">✓ {lang === 'ar' ? 'تذوق مجاني للباقة' : 'Complimentary tasting'}</span>
              </div>
            </HoverCardContent>
          </HoverCard>

          {/* Body summary */}
          <p className="text-[14px] text-[#595855] dark:text-[#a8a69e] leading-[1.5] line-clamp-2 mb-5 font-sans">
            {summary}
          </p>

          {/* Spaces & Capacity Snapshot */}
          <div className="grid grid-cols-2 gap-2 p-3.5 rounded-[9px] bg-[#dfdcd5]/40 dark:bg-[#282723]/60 border border-[#dfdcd5] dark:border-[#2e2d28] mb-6">
            <div className="flex flex-col">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#595855] dark:text-[#a8a69e]">
                {lang === 'ar' ? 'المساحات' : 'Spaces'}
              </span>
              <span className="text-[13px] font-medium text-[#000000] dark:text-[#f5f5f3] flex items-center gap-1.5 mt-0.5">
                <Building2 className="w-3.5 h-3.5 text-[#000000] dark:text-[#f5f5f3]" />
                <span>{venue.spaces?.length} {lang === 'ar' ? 'مساحات مجهزة' : 'Named Spaces'}</span>
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#595855] dark:text-[#a8a69e]">
                {t.capacityUpTo}
              </span>
              <span className="text-[13px] font-medium text-[#000000] dark:text-[#f5f5f3] flex items-center gap-1.5 mt-0.5">
                <Users className="w-3.5 h-3.5 text-[#000000] dark:text-[#f5f5f3]" />
                <span>{maxCapacity} {t.guestsLabel}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Card Footer: Starting Price & Primary CTA */}
        <div className="pt-4 border-t border-[#dfdcd5] dark:border-[#2e2d28] flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-[11px] font-mono text-[#595855] dark:text-[#a8a69e] uppercase tracking-wider">
              {t.fromPrice}
            </span>
            <span className="text-[17px] font-serif font-normal tracking-tight text-[#000000] dark:text-[#f5f5f3]">
              {formatEGP(lowestPrice, lang)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                sound.pop()
                onSelectDetails(venue)
              }}
              className="tap-bounce px-3.5 py-2 rounded-[28.8px] text-xs font-medium bg-white dark:bg-[#282723] text-[#000000] dark:text-[#f5f5f3] hover:bg-[#dfdcd5] dark:hover:bg-[#34332e] border border-[#dfdcd5] dark:border-[#2e2d28] transition-colors cursor-pointer select-none"
            >
              {t.viewDetails}
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
                  className="tap-bounce btn-pill-ink dark:bg-[#f5f5f3] dark:text-[#0b0b0a] text-xs flex items-center gap-1 shadow-xs cursor-pointer select-none"
                >
                  <span>{t.quickInquire}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#ffffff] dark:text-[#0b0b0a]" />
                </motion.button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>{lang === 'ar' ? 'طلب موعد واستفسار مباشر' : 'Direct structured inquiry'}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

      </div>

    </motion.div>
  )
}
