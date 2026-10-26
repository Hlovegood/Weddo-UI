import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import gsap from 'gsap'
import { animate } from 'animejs'
import { 
  Heart, 
  Scale, 
  MessageSquare, 
  Globe, 
  Menu, 
  X, 
  ShieldCheck, 
  BriefcaseBusiness, 
  Search, 
  Building2, 
  Calendar,
  ChevronRight,
  ArrowUpRight,
  Trees,
  Landmark,
  LayoutGrid,
  Calculator,
  FileCheck2,
  Palette,
  UtensilsCrossed,
  User
} from 'lucide-react'
import { WeddoLogo } from './WeddoLogo'
import { SpotlightSearchModal } from './SpotlightSearchModal'
import { 
  NavigationMenu, 
  NavigationMenuList, 
  NavigationMenuItem, 
  NavigationMenuTrigger, 
  NavigationMenuContent, 
  NavigationMenuLink 
} from '@/components/ui/navigation-menu'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { Badge } from '@/components/ui/badge'
import { sound } from '@/lib/sound'

export function Navbar({
  lang,
  toggleLang,
  currentRole,
  setCurrentRole,
  shortlistCount,
  compareCount,
  inquiriesCount,
  venues = [],
  onOpenCompare,
  onOpenInquiries,
  onOpenShortlist,
  onOpenOwnerModal,
  onOpenAdminModal,
  onSelectDetails,
  t
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [spotlightOpen, setSpotlightOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const headerRef = useRef(null)
  const compareBadgeRef = useRef(null)
  const shortlistBadgeRef = useRef(null)
  const inquiriesBadgeRef = useRef(null)

  const featuredVenue = venues[0] || null

  // 1. Apple-style Scroll Detection & Elevation
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 15
      if (scrolled !== isScrolled) {
        setIsScrolled(scrolled)
        if (headerRef.current) {
          gsap.to(headerRef.current, {
            y: scrolled ? -2 : 0,
            duration: 0.35,
            ease: 'power2.out'
          })
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isScrolled])

  // 2. Keyboard Shortcut for Spotlight Search (Cmd/Ctrl + K) & Custom Event
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSpotlightOpen(prev => !prev)
      }
    }
    const handleCustomOpen = () => setSpotlightOpen(true)
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('open-spotlight', handleCustomOpen)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('open-spotlight', handleCustomOpen)
    }
  }, [])

  // 3. AnimeJS Notification Badge Bounce on Count Change
  useEffect(() => {
    if (compareBadgeRef.current && compareCount > 0) {
      animate(compareBadgeRef.current, {
        scale: [1, 1.45, 0.95, 1],
        rotate: [0, -10, 10, 0],
        duration: 500,
        ease: 'outElastic(1, .5)'
      })
    }
  }, [compareCount])

  useEffect(() => {
    if (shortlistBadgeRef.current && shortlistCount > 0) {
      animate(shortlistBadgeRef.current, {
        scale: [1, 1.45, 0.95, 1],
        rotate: [0, -10, 10, 0],
        duration: 500,
        ease: 'outElastic(1, .5)'
      })
    }
  }, [shortlistCount])

  useEffect(() => {
    if (inquiriesBadgeRef.current && inquiriesCount > 0) {
      animate(inquiriesBadgeRef.current, {
        scale: [1, 1.45, 0.95, 1],
        rotate: [0, -10, 10, 0],
        duration: 500,
        ease: 'outElastic(1, .5)'
      })
    }
  }, [inquiriesCount])

  return (
    <>
      <header 
        ref={headerRef}
        className={`sticky top-3 z-40 w-full px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
          isScrolled ? 'pt-0' : 'pt-1'
        }`}
      >
        <div 
          className={`max-w-[1240px] mx-auto rounded-[14px] px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4 transition-all duration-300 ${
            isScrolled
              ? 'bg-[#e7e5e4]/95 backdrop-blur-2xl border border-[#000000] shadow-xl shadow-black/5'
              : 'bg-[#e7e5e4]/85 backdrop-blur-xl border border-[#dfdcd5] shadow-xs'
          }`}
          style={{
            boxShadow: isScrolled
              ? '0 12px 30px -10px rgba(0,0,0,0.1), 0 1px 0 rgba(255,255,255,0.7) inset'
              : '0 4px 20px -5px rgba(0,0,0,0.05), 0 1px 0 rgba(255,255,255,0.5) inset'
          }}
        >
          
          {/* 1. Architectural Brandmark */}
          <a 
            href="#" 
            onClick={() => sound.tap()}
            className="flex items-center shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#000000] rounded-xl"
          >
            <WeddoLogo lang={lang} />
          </a>

          {/* 2. shadcn NavigationMenu (Custom Architectural Megamenu) */}
          <nav className="hidden lg:flex items-center justify-center">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                
                {/* MENU 1: Explore Venues & Estates */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    onPointerEnter={() => sound.tap()}
                    className="text-[13px] font-medium"
                  >
                    <span>{lang === 'ar' ? 'استكشاف القاعات' : 'Curated Venues'}</span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-4 p-5 md:w-[620px] lg:w-[720px] lg:grid-cols-[0.85fr_1.15fr] text-start">
                      
                      {/* Featured Spotlight Card */}
                      {featuredVenue && (
                        <div className="flex flex-col justify-between rounded-[10px] bg-[#dfdcd5]/50 border border-[#dfdcd5] p-4 overflow-hidden relative group">
                          <div>
                            <div className="relative aspect-[16/10] rounded-[8px] overflow-hidden mb-3 border border-[#dfdcd5]">
                              <img 
                                src={featuredVenue.coverPhoto} 
                                alt={featuredVenue.name[lang] || featuredVenue.name.en}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute top-2 left-2">
                                <Badge variant="live" pulse={true} className="text-[10px] py-0 px-2">
                                  {lang === 'ar' ? 'مميز هذا الموسم' : 'Featured Estate'}
                                </Badge>
                              </div>
                            </div>
                            <h4 className="font-serif text-lg font-normal text-[#000000] leading-snug">
                              {featuredVenue.name[lang] || featuredVenue.name.en}
                            </h4>
                            <p className="text-[12px] text-[#595855] leading-relaxed mt-1 line-clamp-2">
                              {featuredVenue.summary[lang] || featuredVenue.summary.en}
                            </p>
                          </div>

                          <button
                            onClick={() => {
                              sound.pop()
                              onSelectDetails(featuredVenue)
                            }}
                            className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#000000] hover:opacity-75 transition-opacity cursor-pointer"
                          >
                            <span>{lang === 'ar' ? 'عرض تفاصيل القاعة' : 'Inspect Venue Details'}</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}

                      {/* Collections & Categories Column */}
                      <div className="flex flex-col justify-between space-y-2">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono tracking-widest uppercase text-[#595855] block px-3 py-1">
                            {lang === 'ar' ? 'التصنيفات المعتمدة' : 'Verified Categories'}
                          </span>

                          <NavigationMenuLink asChild>
                            <a
                              href="#venues-catalog"
                              onClick={() => sound.tap()}
                              className="flex items-start gap-3 p-2.5 rounded-[8px] hover:bg-[#ffffff]/80 transition-colors group"
                            >
                              <div className="p-2 rounded-[6px] bg-[#dfdcd5] text-[#000000] shrink-0 mt-0.5">
                                <Landmark className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-[13px] font-medium text-[#000000] group-hover:text-black flex items-center gap-1">
                                  <span>{lang === 'ar' ? 'قصور تاريخية ومسطحات ملكية' : 'Historic Palaces & Royal Lawns'}</span>
                                </div>
                                <p className="text-[11px] text-[#595855] mt-0.5">
                                  {lang === 'ar' ? 'مساحات مفتوحة وإطلالات أثرية في الجيزة والقاهرة' : 'Expansive outdoor gardens & timeless heritage architecture'}
                                </p>
                              </div>
                            </a>
                          </NavigationMenuLink>

                          <NavigationMenuLink asChild>
                            <a
                              href="#venues-catalog"
                              onClick={() => sound.tap()}
                              className="flex items-start gap-3 p-2.5 rounded-[8px] hover:bg-[#ffffff]/80 transition-colors group"
                            >
                              <div className="p-2 rounded-[6px] bg-[#dfdcd5] text-[#000000] shrink-0 mt-0.5">
                                <Trees className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-[13px] font-medium text-[#000000] group-hover:text-black flex items-center gap-1">
                                  <span>{lang === 'ar' ? 'واجهات نيلية وقاعات فندقية ٥ نجوم' : 'Nile Waterfront & 5-Star Ballrooms'}</span>
                                </div>
                                <p className="text-[11px] text-[#595855] mt-0.5">
                                  {lang === 'ar' ? 'إطلالات بانورامية على كورنيش النيل والزمالك' : 'Panoramic river views, grand chandeliers & banquet kitchens'}
                                </p>
                              </div>
                            </a>
                          </NavigationMenuLink>

                          <NavigationMenuLink asChild>
                            <a
                              href="#venues-catalog"
                              onClick={() => sound.tap()}
                              className="flex items-start gap-3 p-2.5 rounded-[8px] hover:bg-[#ffffff]/80 transition-colors group"
                            >
                              <div className="p-2 rounded-[6px] bg-[#dfdcd5] text-[#000000] shrink-0 mt-0.5">
                                <Building2 className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-[13px] font-medium text-[#000000] group-hover:text-black flex items-center gap-1">
                                  <span>{lang === 'ar' ? 'فيلات تراثية وصالونات عقد قران' : 'Heritage Villas & Katb Ketab'}</span>
                                </div>
                                <p className="text-[11px] text-[#595855] mt-0.5">
                                  {lang === 'ar' ? 'أجواء عائلية راقية في المعادي والشيخ زايد' : 'Intimate family atmospheres with dedicated bridal villas'}
                                </p>
                              </div>
                            </a>
                          </NavigationMenuLink>
                        </div>

                        <div className="pt-2 border-t border-[#dfdcd5] px-3 flex items-center justify-between text-xs text-[#595855]">
                          <span>{lang === 'ar' ? '٦ قاعات معتمدة بأسعار الجنيه المصري' : '6 Certified Egyptian Venues in EGP'}</span>
                          <NavigationMenuLink asChild>
                            <a 
                              href="#venues-catalog"
                              className="font-semibold text-[#000000] hover:underline flex items-center gap-1"
                            >
                              <span>{lang === 'ar' ? 'كل المعروضات' : 'View All'}</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </a>
                          </NavigationMenuLink>
                        </div>
                      </div>

                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* MENU 2: Folia Planning Suite */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    onPointerEnter={() => sound.tap()}
                    className="text-[13px] font-medium"
                  >
                    <span>{lang === 'ar' ? 'أدوات التخطيط' : 'Planning Suite'}</span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid grid-cols-2 gap-3 p-5 md:w-[500px] text-start">
                      
                      <NavigationMenuLink asChild>
                        <a
                          href="#folia-suite"
                          onClick={() => sound.tap()}
                          className="p-3 rounded-[8px] hover:bg-[#ffffff]/80 transition-colors flex flex-col justify-between group"
                        >
                          <div className="p-2 rounded-[6px] bg-[#dfdcd5] text-[#000000] w-max mb-2">
                            <LayoutGrid className="w-4 h-4" />
                          </div>
                          <h5 className="text-[13px] font-medium text-[#000000] group-hover:text-black">
                            {lang === 'ar' ? 'مخطط مقاعد الضيوف' : 'Seating Chart'}
                          </h5>
                          <p className="text-[11px] text-[#595855] mt-1 leading-normal">
                            {lang === 'ar' ? 'توزيع الطاولات وكوشة العروسين وقوائم الوجبات' : 'Visual interactive floor plans & table guest assignments'}
                          </p>
                        </a>
                      </NavigationMenuLink>

                      <NavigationMenuLink asChild>
                        <a
                          href="#folia-suite"
                          onClick={() => sound.tap()}
                          className="p-3 rounded-[8px] hover:bg-[#ffffff]/80 transition-colors flex flex-col justify-between group"
                        >
                          <div className="p-2 rounded-[6px] bg-[#dfdcd5] text-[#000000] w-max mb-2">
                            <Palette className="w-4 h-4" />
                          </div>
                          <h5 className="text-[13px] font-medium text-[#000000] group-hover:text-black">
                            {lang === 'ar' ? 'لوحة الإلهام والألوان' : 'Dream Board'}
                          </h5>
                          <p className="text-[11px] text-[#595855] mt-1 leading-normal">
                            {lang === 'ar' ? 'تنسيق ألوان الزهور والديكور وتعليقات الفريق' : 'Curated palettes, decor swatches & shared team notes'}
                          </p>
                        </a>
                      </NavigationMenuLink>

                      <NavigationMenuLink asChild>
                        <a
                          href="#folia-suite"
                          onClick={() => sound.tap()}
                          className="p-3 rounded-[8px] hover:bg-[#ffffff]/80 transition-colors flex flex-col justify-between group"
                        >
                          <div className="p-2 rounded-[6px] bg-[#dfdcd5] text-[#000000] w-max mb-2">
                            <Calculator className="w-4 h-4" />
                          </div>
                          <h5 className="text-[13px] font-medium text-[#000000] group-hover:text-black">
                            {lang === 'ar' ? 'حاسبة الميزانية الذكية' : 'Smart Budget'}
                          </h5>
                          <p className="text-[11px] text-[#595855] mt-1 leading-normal">
                            {lang === 'ar' ? 'توزيع بنود الصرف بالجنيه المصري ومتابعة المتبقي' : 'Dynamic EGP category allocation & remaining limits'}
                          </p>
                        </a>
                      </NavigationMenuLink>

                      <NavigationMenuLink asChild>
                        <a
                          href="#folia-suite"
                          onClick={() => sound.tap()}
                          className="p-3 rounded-[8px] hover:bg-[#ffffff]/80 transition-colors flex flex-col justify-between group"
                        >
                          <div className="p-2 rounded-[6px] bg-[#dfdcd5] text-[#000000] w-max mb-2">
                            <FileCheck2 className="w-4 h-4" />
                          </div>
                          <h5 className="text-[13px] font-medium text-[#000000] group-hover:text-black">
                            {lang === 'ar' ? 'فواتير وعقود الموردين' : 'Vendor Hub'}
                          </h5>
                          <p className="text-[11px] text-[#595855] mt-1 leading-normal">
                            {lang === 'ar' ? 'إيصالات دفع العربون وجداول استحقاق الدفعات' : 'Deposit receipts, invoice ticketing & payment dates'}
                          </p>
                        </a>
                      </NavigationMenuLink>

                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* MENU 3: Portals & Memberships */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    onPointerEnter={() => sound.tap()}
                    className="text-[13px] font-medium"
                  >
                    <span>{lang === 'ar' ? 'بوابات المنظومة' : 'Portals & Pricing'}</span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="p-4 md:w-[380px] space-y-2 text-start">
                      
                      <div
                        onClick={() => {
                          sound.tap()
                          setCurrentRole('customer')
                        }}
                        className={`p-3 rounded-[8px] cursor-pointer transition-colors flex items-center justify-between ${
                          currentRole === 'customer' ? 'bg-[#000000] text-[#ffffff]' : 'hover:bg-[#ffffff]/80 text-[#000000]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-[6px] ${currentRole === 'customer' ? 'bg-white/20 text-white' : 'bg-[#dfdcd5] text-black'}`}>
                            <User className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-[13px] font-medium">
                              {lang === 'ar' ? 'بوابة العروسين والمخططين' : 'Couples & Planners Suite'}
                            </div>
                            <div className={`text-[11px] ${currentRole === 'customer' ? 'text-white/70' : 'text-[#595855]'}`}>
                              {lang === 'ar' ? 'تصفح القاعات وحفظ المفضلات وإرسال استفسارات الحجز' : 'Curate shortlists, compare estates & manage inquiries'}
                            </div>
                          </div>
                        </div>
                        {currentRole === 'customer' && (
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        )}
                      </div>

                      <div
                        onClick={() => {
                          sound.tap()
                          setCurrentRole('owner')
                          onOpenOwnerModal()
                        }}
                        className={`p-3 rounded-[8px] cursor-pointer transition-colors flex items-center justify-between ${
                          currentRole === 'owner' ? 'bg-[#000000] text-[#ffffff]' : 'hover:bg-[#ffffff]/80 text-[#000000]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-[6px] ${currentRole === 'owner' ? 'bg-white/20 text-white' : 'bg-[#dfdcd5] text-black'}`}>
                            <BriefcaseBusiness className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-[13px] font-medium">
                              {lang === 'ar' ? 'لوحة إدارة أصحاب القاعات' : 'Venue Owners Dashboard'}
                            </div>
                            <div className={`text-[11px] ${currentRole === 'owner' ? 'text-white/70' : 'text-[#595855]'}`}>
                              {lang === 'ar' ? 'إدارة التوافر ومواعيد التذوق وتحديث الأسعار' : 'Manage capacity, tasting slots & published EGP rates'}
                            </div>
                          </div>
                        </div>
                        {currentRole === 'owner' && (
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        )}
                      </div>

                      <div
                        onClick={() => {
                          sound.tap()
                          setCurrentRole('admin')
                          onOpenAdminModal()
                        }}
                        className={`p-3 rounded-[8px] cursor-pointer transition-colors flex items-center justify-between ${
                          currentRole === 'admin' ? 'bg-[#000000] text-[#ffffff]' : 'hover:bg-[#ffffff]/80 text-[#000000]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-[6px] ${currentRole === 'admin' ? 'bg-white/20 text-white' : 'bg-[#dfdcd5] text-black'}`}>
                            <ShieldCheck className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-[13px] font-medium">
                              {lang === 'ar' ? 'مركز التدقيق والتراخيص' : 'Auditing & Compliance Hub'}
                            </div>
                            <div className={`text-[11px] ${currentRole === 'admin' ? 'text-white/70' : 'text-[#595855]'}`}>
                              {lang === 'ar' ? 'فحص تراخيص المنشآت ومعايير السلامة والجودة' : 'Venue verification, hospitality standards & safety approvals'}
                            </div>
                          </div>
                        </div>
                        {currentRole === 'admin' && (
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        )}
                      </div>

                      <div className="pt-2 border-t border-[#dfdcd5] mt-1">
                        <NavigationMenuLink asChild>
                          <a
                            href="#pricing-plans"
                            onClick={() => sound.tap()}
                            className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-[#000000] hover:bg-[#ffffff]/60 rounded-[6px]"
                          >
                            <span>{lang === 'ar' ? 'عرض باقات اشتراك فوليا' : 'View Membership Plans'}</span>
                            <span className="text-[11px] text-[#595855] font-mono">2026 RATES →</span>
                          </a>
                        </NavigationMenuLink>
                      </div>

                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* 3. Right Utility Cluster (No Redundant Text) */}
          <div className="flex items-center gap-2 shrink-0">
            
            {/* Omni Search Button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => {
                    sound.pop()
                    setSpotlightOpen(true)
                  }}
                  className="tap-bounce flex items-center gap-2 px-3 py-1.5 rounded-full text-[13px] font-medium text-[#595855] hover:text-[#000000] bg-white/70 hover:bg-white border border-[#dfdcd5] hover:border-[#000000] transition-colors cursor-pointer select-none"
                >
                  <Search className="w-3.5 h-3.5 text-[#000000]" />
                  <span className="text-xs text-[#595855] hidden xl:inline">
                    {lang === 'ar' ? 'بحث...' : 'Search...'}
                  </span>
                  <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-[#dfdcd5]/60 text-[10px] font-mono text-[#000000]">
                    ⌘K
                  </kbd>
                </motion.button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>{lang === 'ar' ? 'بحث شامل وفوري (⌘K)' : 'Omni Search (⌘K)'}</p>
              </TooltipContent>
            </Tooltip>

            {/* Compare Pill */}
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => {
                    sound.pop()
                    onOpenCompare()
                  }}
                  className={`tap-bounce relative p-2 rounded-full border transition-colors cursor-pointer select-none ${
                    compareCount > 0
                      ? 'bg-[#000000] text-white border-[#000000]'
                      : 'bg-white/70 hover:bg-white text-[#595855] border-[#dfdcd5] hover:border-[#000000]'
                  }`}
                >
                  <Scale className="w-4 h-4" />
                  {compareCount > 0 && (
                    <span 
                      ref={compareBadgeRef}
                      className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 text-black text-[9px] font-mono font-bold flex items-center justify-center shadow-xs"
                    >
                      {compareCount}
                    </span>
                  )}
                </motion.button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>{lang === 'ar' ? `مقارنة القاعات (${compareCount})` : `Compare Venues (${compareCount})`}</p>
              </TooltipContent>
            </Tooltip>

            {/* Shortlist Heart Pill */}
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => {
                    sound.pop()
                    onOpenShortlist()
                  }}
                  className={`tap-bounce relative p-2 rounded-full border transition-colors cursor-pointer select-none ${
                    shortlistCount > 0
                      ? 'bg-[#ffe4e6] text-[#9f1239] border-[#fecdd3]'
                      : 'bg-white/70 hover:bg-white text-[#595855] border-[#dfdcd5] hover:border-[#000000]'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${shortlistCount > 0 ? 'fill-[#e11d48] text-[#e11d48]' : 'text-[#000000]'}`} />
                  {shortlistCount > 0 && (
                    <span 
                      ref={shortlistBadgeRef}
                      className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#e11d48] text-white text-[9px] font-mono font-bold flex items-center justify-center shadow-xs"
                    >
                      {shortlistCount}
                    </span>
                  )}
                </motion.button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>{lang === 'ar' ? `القاعات المفضلة (${shortlistCount})` : `Saved Shortlist (${shortlistCount})`}</p>
              </TooltipContent>
            </Tooltip>

            {/* Inquiries Messages Pill */}
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => {
                    sound.pop()
                    onOpenInquiries()
                  }}
                  className={`tap-bounce relative p-2 rounded-full border transition-colors cursor-pointer select-none ${
                    inquiriesCount > 0
                      ? 'bg-[#e7e5e4] text-[#000000] border-[#000000]'
                      : 'bg-white/70 hover:bg-white text-[#595855] border-[#dfdcd5] hover:border-[#000000]'
                  }`}
                >
                  <MessageSquare className="w-4 h-4 text-[#000000]" />
                  {inquiriesCount > 0 && (
                    <span 
                      ref={inquiriesBadgeRef}
                      className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#000000] text-white text-[9px] font-mono font-bold flex items-center justify-center shadow-xs"
                    >
                      {inquiriesCount}
                    </span>
                  )}
                </motion.button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>{lang === 'ar' ? `المحادثات والطلبات (${inquiriesCount})` : `Inquiries & Chats (${inquiriesCount})`}</p>
              </TooltipContent>
            </Tooltip>

            {/* Language Switcher Pill */}
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => {
                    sound.tap()
                    toggleLang()
                  }}
                  className="tap-bounce flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/70 hover:bg-white border border-[#dfdcd5] hover:border-[#000000] transition-colors cursor-pointer select-none text-[#000000]"
                >
                  <Globe className="w-3.5 h-3.5 text-[#000000]" />
                  <span>{lang === 'en' ? 'عربي' : 'EN'}</span>
                </motion.button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>{lang === 'en' ? 'التحويل إلى اللغة العربية' : 'Switch to English'}</p>
              </TooltipContent>
            </Tooltip>

            {/* Primary Action CTA: "Book a Tasting" / "حجز موعد تذوق" (Meaningful, Luxury, Non-redundant) */}
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              href="#venues-catalog"
              onClick={() => sound.success()}
              className="tap-bounce hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#000000] text-[#ffffff] text-xs font-medium hover:opacity-90 transition-opacity cursor-pointer select-none shadow-xs"
            >
              <UtensilsCrossed className="w-3.5 h-3.5 text-[#ffffff]" />
              <span>{lang === 'ar' ? 'حجز موعد تذوق' : 'Book a Tasting'}</span>
            </motion.a>

            {/* Mobile Hamburger Button */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => {
                sound.tap()
                setMobileMenuOpen(!mobileMenuOpen)
              }}
              className="lg:hidden tap-bounce p-2 rounded-full bg-white/80 border border-[#dfdcd5] text-[#000000] cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>

          </div>

        </div>

        {/* Mobile Accordion Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, scale: 0.98 }}
              animate={{ opacity: 1, height: 'auto', scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: 0.98 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="lg:hidden mt-3 max-w-[1240px] mx-auto bg-[#e7e5e4]/95 backdrop-blur-2xl border border-[#000000] rounded-[14px] p-5 shadow-2xl overflow-hidden text-start"
            >
              <div className="flex flex-col space-y-3">
                <a 
                  href="#venues-catalog"
                  onClick={() => {
                    sound.tap()
                    setMobileMenuOpen(false)
                  }}
                  className="flex items-center justify-between p-3 rounded-[8px] bg-white text-[14px] font-medium text-[#000000] border border-[#dfdcd5]"
                >
                  <span className="flex items-center gap-2">
                    <Landmark className="w-4 h-4 text-[#000000]" />
                    <span>{lang === 'ar' ? 'استكشاف القاعات والقصور' : 'Explore Venues & Palaces'}</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#595855]" />
                </a>

                <a 
                  href="#folia-suite"
                  onClick={() => {
                    sound.tap()
                    setMobileMenuOpen(false)
                  }}
                  className="flex items-center justify-between p-3 rounded-[8px] bg-white text-[14px] font-medium text-[#000000] border border-[#dfdcd5]"
                >
                  <span className="flex items-center gap-2">
                    <LayoutGrid className="w-4 h-4 text-[#000000]" />
                    <span>{lang === 'ar' ? 'أدوات فوليا لتخطيط الحدث' : 'Folia Planning Suite'}</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#595855]" />
                </a>

                <a 
                  href="#pricing-plans"
                  onClick={() => {
                    sound.tap()
                    setMobileMenuOpen(false)
                  }}
                  className="flex items-center justify-between p-3 rounded-[8px] bg-white text-[14px] font-medium text-[#000000] border border-[#dfdcd5]"
                >
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#000000]" />
                    <span>{lang === 'ar' ? 'الباقات وعضويات التخطيط' : 'Pricing & Memberships'}</span>
                  </span>
                  <Badge variant="live" className="text-[10px] py-0 px-2 bg-emerald-600 text-white border-none">
                    {lang === 'ar' ? 'وفر ٤٧٪' : 'Save 47%'}
                  </Badge>
                </a>

                {/* Role Switcher in Mobile Drawer */}
                <div className="pt-3 border-t border-[#dfdcd5]">
                  <span className="text-[11px] font-mono tracking-wider uppercase text-[#595855] block mb-2 px-1">
                    {lang === 'ar' ? 'بوابة النظام' : 'Portal Mode'}
                  </span>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <button
                      onClick={() => {
                        sound.tap()
                        setCurrentRole('customer')
                        setMobileMenuOpen(false)
                      }}
                      className={`p-2 rounded-[6px] text-center font-medium transition-colors ${
                        currentRole === 'customer' ? 'bg-[#000000] text-[#ffffff]' : 'bg-white text-[#000000] border border-[#dfdcd5]'
                      }`}
                    >
                      {lang === 'ar' ? 'العروسين' : 'Couples'}
                    </button>
                    <button
                      onClick={() => {
                        sound.tap()
                        setCurrentRole('owner')
                        setMobileMenuOpen(false)
                        onOpenOwnerModal()
                      }}
                      className={`p-2 rounded-[6px] text-center font-medium transition-colors ${
                        currentRole === 'owner' ? 'bg-[#000000] text-[#ffffff]' : 'bg-white text-[#000000] border border-[#dfdcd5]'
                      }`}
                    >
                      {lang === 'ar' ? 'أصحاب القاعات' : 'Estate Owners'}
                    </button>
                    <button
                      onClick={() => {
                        sound.tap()
                        setCurrentRole('admin')
                        setMobileMenuOpen(false)
                        onOpenAdminModal()
                      }}
                      className={`p-2 rounded-[6px] text-center font-medium transition-colors ${
                        currentRole === 'admin' ? 'bg-[#000000] text-[#ffffff]' : 'bg-white text-[#000000] border border-[#dfdcd5]'
                      }`}
                    >
                      {lang === 'ar' ? 'الإدارة' : 'Auditor'}
                    </button>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#dfdcd5] flex items-center gap-2">
                  <button
                    onClick={() => {
                      sound.pop()
                      setMobileMenuOpen(false)
                      onOpenCompare()
                    }}
                    className="flex-1 py-2 rounded-full bg-white text-[#000000] border border-[#dfdcd5] text-xs font-semibold flex items-center justify-center gap-1.5"
                  >
                    <Scale className="w-3.5 h-3.5" />
                    <span>{lang === 'ar' ? 'المقارنة' : 'Compare'} ({compareCount})</span>
                  </button>

                  <button
                    onClick={() => {
                      sound.pop()
                      setMobileMenuOpen(false)
                      onOpenInquiries()
                    }}
                    className="flex-1 py-2 rounded-full bg-[#000000] text-[#ffffff] text-xs font-semibold flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{lang === 'ar' ? 'الطلبات' : 'Inquiries'} ({inquiriesCount})</span>
                  </button>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spotlight Search Modal */}
      <SpotlightSearchModal
        isOpen={spotlightOpen}
        onClose={() => setSpotlightOpen(false)}
        venues={venues}
        onSelectVenue={(v) => {
          onSelectDetails(v)
        }}
        lang={lang}
        t={t}
      />
    </>
  )
}
