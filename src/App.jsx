import React, { useState, useEffect } from 'react'
import { initialVenues } from './data/venues'
import { translations } from './data/translations'

// Navigation: BubbleMenu from React Bits
import BubbleMenu from './components/BubbleMenu/BubbleMenu'
import { WeddoLogo } from './components/WeddoLogo'

// Dedicated Pages
import { HomePage } from './pages/HomePage'
import { VenuesPage } from './pages/VenuesPage'
import { PlanningPage } from './pages/PlanningPage'
import { PricingPage } from './pages/PricingPage'
import { VendorPortalPage } from './pages/VendorPortalPage'
import { CompliancePage } from './pages/CompliancePage'

// Global Elements
import { Footer } from './components/Footer'
import { Preloader } from './components/Preloader'
import { NavigationPreloader } from './components/NavigationPreloader'
import { LanguageTransition } from './components/LanguageTransition'
import { AnimatedThemeToggler } from './components/ui/animated-theme-toggler'

// Modals & Drawers
import { VenueDetailsModal } from './components/VenueDetailsModal'
import { CompareDrawer } from './components/CompareDrawer'
import { InquiryModal } from './components/InquiryModal'
import { InquiriesConversationDrawer } from './components/InquiriesConversationDrawer'
import { OwnerDashboardModal } from './components/OwnerDashboardModal'
import { AdminReviewModal } from './components/AdminReviewModal'
import { SpotlightSearchModal } from './components/SpotlightSearchModal'

// Icons & UI Primitives
import { Globe, Sun, Moon } from 'lucide-react'
import { TooltipProvider } from './components/ui/tooltip'
import { Toaster, toast } from './components/ui/sonner'
import { sound } from './lib/sound'

export default function App() {
  // --- 1. Language & Localization ---
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('weddo_lang') || 'en'
  })
  const t = translations[lang] || translations.en

  const [langTransition, setLangTransition] = useState({
    active: false,
    targetLang: lang === 'en' ? 'ar' : 'en'
  })

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    localStorage.setItem('weddo_lang', lang)
  }, [lang])

  const toggleLang = () => {
    if (langTransition.active) return
    sound.tap()
    const nextLang = lang === 'en' ? 'ar' : 'en'
    setLangTransition({
      active: true,
      targetLang: nextLang
    })
  }

  // --- 2. Dark & Light Mode Theme ---
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('weddo_theme') || 'light'
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
      root.setAttribute('data-theme', 'dark')
      document.body.classList.add('dark')
      document.body.style.backgroundColor = '#121210'
    } else {
      root.classList.remove('dark')
      root.setAttribute('data-theme', 'light')
      document.body.classList.remove('dark')
      document.body.style.backgroundColor = '#c4c3b6'
    }
    localStorage.setItem('weddo_theme', theme)
  }, [theme])

  const toggleTheme = () => {
    sound.tap()
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  // --- 2. Client-Side Hash Routing & Custom Navigation Preloader ---
  const getInitialRoute = () => {
    const hash = window.location.hash.replace(/^#\/?/, '').split('?')[0]
    return hash || 'home'
  }

  const [currentRoute, setCurrentRoute] = useState(getInitialRoute)
  const [navTransition, setNavTransition] = useState({
    active: false,
    targetRoute: 'home'
  })

  // Trigger the custom between-pages preloader
  const triggerPageTransition = (target) => {
    const clean = target.replace(/^#?\/?/, '') || 'home'
    if (clean === currentRoute && !navTransition.active) return
    setNavTransition({
      active: true,
      targetRoute: clean
    })
  }

  const navigateTo = (route) => {
    const clean = route.replace(/^#?\/?/, '') || 'home'
    if (clean === currentRoute) return
    triggerPageTransition(clean)
  }

  // Intercept browser hash changes (Back/Forward navigation)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '').split('?')[0] || 'home'
      if (hash !== currentRoute && !navTransition.active) {
        triggerPageTransition(hash)
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [currentRoute, navTransition.active])

  // Global anchor click interceptor for href="#/..." navigation links
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#/"]')
      if (anchor) {
        const href = anchor.getAttribute('href')
        const target = href.replace(/^#\/?/, '').split('?')[0] || 'home'
        if (target !== currentRoute) {
          e.preventDefault()
          triggerPageTransition(target)
        }
      }
    }
    document.addEventListener('click', handleAnchorClick)
    return () => document.removeEventListener('click', handleAnchorClick)
  }, [currentRoute, navTransition.active])

  // --- 3. Venues Catalog Data ---
  const [venues, setVenues] = useState(initialVenues)

  // --- 4. Filters State ---
  const [filters, setFilters] = useState({
    area: 'all',
    category: 'all',
    date: '',
    guests: 'all',
    budget: 'all'
  })

  const handleResetFilters = () => {
    setFilters({
      area: 'all',
      category: 'all',
      date: '',
      guests: 'all',
      budget: 'all'
    })
  }

  // --- 5. Shortlist (Persisted in localStorage) ---
  const [shortlist, setShortlist] = useState(() => {
    try {
      const saved = localStorage.getItem('weddo_shortlist')
      return saved ? JSON.parse(saved) : ['olive-garden', 'nile-salon']
    } catch {
      return ['olive-garden', 'nile-salon']
    }
  })

  useEffect(() => {
    localStorage.setItem('weddo_shortlist', JSON.stringify(shortlist))
  }, [shortlist])

  const handleToggleShortlist = (venueId) => {
    setShortlist(prev => 
      prev.includes(venueId) ? prev.filter(id => id !== venueId) : [...prev, venueId]
    )
  }

  // --- 6. Compare Venues (Temporary in tab, max 3) ---
  const [compareIds, setCompareIds] = useState(['olive-garden', 'summit-center-zayed'])

  const handleToggleCompare = (venueId) => {
    setCompareIds(prev => {
      if (prev.includes(venueId)) {
        sound.tap()
        return prev.filter(id => id !== venueId)
      }
      if (prev.length >= 3) {
        sound.pop()
        toast.error(lang === 'ar' ? 'يمكنك مقارنة ٣ قاعات كحد أقصى في المرة الواحدة' : 'You can compare a maximum of 3 venues simultaneously.')
        return prev
      }
      sound.success()
      return [...prev, venueId]
    })
  }

  const handleRemoveFromCompare = (venueId) => {
    setCompareIds(prev => prev.filter(id => id !== venueId))
  }

  const handleClearCompare = () => {
    setCompareIds([])
  }

  // --- 7. Inquiries & Messages State ---
  const [inquiries, setInquiries] = useState([
    {
      id: 'inq-olive-sample',
      venueId: 'olive-garden',
      venueName: { en: 'The Olive Garden Estate', ar: 'حديقة الزيتون الملكية' },
      date: '2026-11-20',
      session: 'evening',
      guestCount: 240,
      spaceSnapshot: {
        id: 'grand-lawn',
        name: { en: 'The Royal Olive Lawn', ar: 'المسطح الأخضر الملكي' },
        capacity: 480
      },
      packageSnapshot: {
        id: 'celebration',
        name: { en: 'Royal Emerald Gala Experience', ar: 'تجربة الزمرد الملكية الشاملة' },
        price: 215000,
        currency: 'EGP'
      },
      contactName: 'Nour & Omar',
      contactPhone: '01012345678',
      status: 'under_review',
      createdAt: '2026-10-23T14:20:00Z',
      messages: [
        {
          id: 'm-sample-1',
          senderRole: 'client',
          author: 'Nour & Omar',
          text: 'We are planning our wedding reception for late November. Does the package include the private dressing villa for the whole afternoon?',
          timestamp: '2:15 PM'
        },
        {
          id: 'm-sample-2',
          senderRole: 'venue',
          author: 'The Olive Garden Coordinator',
          text: 'Hello Nour! Yes, the Royal Emerald Gala includes full-day exclusive access to both the bridal villa and groom lounge from 11:00 AM. We look forward to welcoming you for an on-site tasting.',
          timestamp: '2:40 PM'
        }
      ]
    }
  ])

  const handleAddInquiry = (newInquiry) => {
    sound.success()
    setInquiries(prev => [newInquiry, ...prev])
    toast.success(lang === 'ar' ? 'تم إرسال طلب الحجز بنجاح' : 'Inquiry Sent Successfully', {
      description: lang === 'ar' ? 'سيتواصل معك منسق القاعة خلال ١٥ دقيقة لمراجعة الموعد والتفاصيل.' : 'The venue coordinator will contact you within ~15 minutes.'
    })
  }

  const handleSendReply = (inquiryId, replyText) => {
    setInquiries(prev => prev.map(inq => {
      if (inq.id === inquiryId) {
        return {
          ...inq,
          messages: [
            ...inq.messages,
            {
              id: `m-${Date.now()}`,
              senderRole: 'client',
              author: inq.contactName || (lang === 'ar' ? 'أنت' : 'You'),
              text: replyText,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]
        }
      }
      return inq
    }))
  }

  // --- 8. Modals & Drawers Visibility ---
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [selectedDetailsVenue, setSelectedDetailsVenue] = useState(null)

  const [isCompareOpen, setIsCompareOpen] = useState(false)
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false)
  const [selectedInquiryVenue, setSelectedInquiryVenue] = useState(null)
  const [defaultInquirySpaceId, setDefaultInquirySpaceId] = useState('')
  const [defaultInquiryPackageId, setDefaultInquiryPackageId] = useState('')

  const [isInquiriesDrawerOpen, setIsInquiriesDrawerOpen] = useState(false)
  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false)
  const [isOwnerModalOpen, setIsOwnerModalOpen] = useState(false)
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false)

  const handleOpenDetails = (venue) => {
    setSelectedDetailsVenue(venue)
    setIsDetailsModalOpen(true)
  }

  const handleQuickInquire = (venue, spaceId = '', packageId = '') => {
    setSelectedInquiryVenue(venue)
    setDefaultInquirySpaceId(spaceId)
    setDefaultInquiryPackageId(packageId)
    setIsInquiryModalOpen(true)
  }

  // Spotlight Keyboard Shortcut (⌘K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsSpotlightOpen(prev => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const [showPreloader, setShowPreloader] = useState(() => {
    return !sessionStorage.getItem('weddo_preloader_seen')
  })

  // --- 9. BubbleMenu Items Definition ---
  const bubbleMenuItems = [
    {
      label: lang === 'ar' ? 'الرئيسية' : 'Home',
      subtitle: lang === 'ar' ? 'المعرض والبحث الذكي' : 'Exhibition & Search',
      href: '#/',
      ariaLabel: 'Home Exhibition',
      rotation: -6,
      subtitleColorDark: '#fbbf24', // Luminous Warm Gold
      hoverStyles: {
        bgColor: theme === 'dark' ? '#2e2c26' : '#000000',
        textColor: '#ffffff'
      },
      onClick: () => navigateTo('/')
    },
    {
      label: lang === 'ar' ? 'القاعات والقصور' : 'Venues Catalog',
      subtitle: lang === 'ar' ? 'أرشيف القاعات التراثية (٨)' : '8 Hand-Curated Estates',
      href: '#/venues',
      ariaLabel: 'Curated Venues Catalog',
      rotation: 6,
      subtitleColorDark: '#34d399', // Mint Emerald
      hoverStyles: {
        bgColor: theme === 'dark' ? '#064e3b' : '#10b981',
        textColor: '#ffffff'
      },
      onClick: () => navigateTo('/venues')
    },
    {
      label: lang === 'ar' ? 'ستوديو التخطيط' : 'Planning Suite',
      subtitle: lang === 'ar' ? 'المقاعد والميزانية بالجنيه' : 'Seating & Smart Budget',
      href: '#/planning',
      ariaLabel: 'Folia Planning Suite',
      rotation: -5,
      subtitleColorDark: '#38bdf8', // Sky Azure
      hoverStyles: {
        bgColor: theme === 'dark' ? '#0c4a6e' : '#f59e0b',
        textColor: '#ffffff'
      },
      onClick: () => navigateTo('/planning')
    },
    {
      label: lang === 'ar' ? 'باقات الأسعار' : 'Pricing & Pass',
      subtitle: lang === 'ar' ? 'العضويات وإعفاءات الرسوم' : 'Memberships & Waivers',
      href: '#/pricing',
      ariaLabel: 'Pricing & Membership',
      rotation: 5,
      subtitleColorDark: '#f472b6', // Coral Rose
      hoverStyles: {
        bgColor: theme === 'dark' ? '#881337' : '#ef4444',
        textColor: '#ffffff'
      },
      onClick: () => navigateTo('/pricing')
    },
    {
      label: lang === 'ar' ? 'بوابة الملاك' : 'Estate Operations',
      subtitle: lang === 'ar' ? 'المساحات ومواعيد التذوق' : 'Spaces & Tasting Pipeline',
      href: '#/vendor-ops',
      ariaLabel: 'Venue Owner Portal',
      rotation: -6,
      subtitleColorDark: '#a78bfa', // Royal Iris
      hoverStyles: {
        bgColor: theme === 'dark' ? '#4c1d95' : '#3b82f6',
        textColor: '#ffffff'
      },
      onClick: () => navigateTo('/vendor-ops')
    },
    {
      label: lang === 'ar' ? 'الأمان والتراخيص' : 'Safety & Audit',
      subtitle: lang === 'ar' ? 'الحماية المدنية ومحدد الديسيبل' : 'Civil Defense & Decibels',
      href: '#/compliance',
      ariaLabel: 'Safety & Compliance Hub',
      rotation: 6,
      subtitleColorDark: '#4ade80', // Certified Spring Green
      hoverStyles: {
        bgColor: theme === 'dark' ? '#14532d' : '#8b5cf6',
        textColor: '#ffffff'
      },
      onClick: () => navigateTo('/compliance')
    }
  ]

  // Top Nav Right Utilities for BubbleMenu:
  // 1. Language Toggle with Globe icon (replacing text)
  // 2. Dark & Light Mode Toggle placed directly next to the Bubble Menu CTA
  const navExtras = (
    <>
      {/* 1. Language Changing Button with Globe icon & Spring Micro-Feedback */}
      <button
        onClick={toggleLang}
        type="button"
        className="bubble w-12 h-12 rounded-full flex items-center justify-center text-[#000000] dark:text-[#f5f5f3] hover:scale-105 active:scale-95 transition-all cursor-pointer relative group"
        title={lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
        aria-label={lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
      >
        <Globe className={`w-5 h-5 transition-transform duration-500 ease-out ${langTransition.active ? 'rotate-180 scale-110 text-[#d4af37]' : 'group-hover:rotate-45'}`} />
      </button>

      {/* 2. Magic UI Animated Theme Toggler next to the Bubble Menu CTA */}
      <AnimatedThemeToggler
        theme={theme}
        onThemeChange={(nextTheme) => {
          setTheme(nextTheme)
        }}
        duration={500}
        variant="circle"
        className="bubble w-12 h-12 rounded-full flex items-center justify-center text-[#000000] dark:text-[#f5f5f3] hover:scale-105 active:scale-95 transition-all cursor-pointer"
        title={
          theme === 'dark'
            ? (lang === 'ar' ? 'تفعيل الوضع النهاري' : 'Switch to Light Mode')
            : (lang === 'ar' ? 'تفعيل الوضع الليلي' : 'Switch to Dark Mode')
        }
        aria-label={
          theme === 'dark'
            ? (lang === 'ar' ? 'تفعيل الوضع النهاري' : 'Switch to Light Mode')
            : (lang === 'ar' ? 'تفعيل الوضع الليلي' : 'Switch to Dark Mode')
        }
      >
        {theme === 'dark' ? (
          <Sun className="w-5 h-5 text-amber-300 transition-transform duration-300 hover:rotate-45" />
        ) : (
          <Moon className="w-5 h-5 text-[#000000] transition-transform duration-300 hover:-rotate-12" />
        )}
      </AnimatedThemeToggler>
    </>
  )

  return (
    <TooltipProvider delayDuration={150}>
      <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-[#121210] text-[#f5f5f3] selection:bg-[#ffffff] selection:text-[#000000]' : 'bg-[#c4c3b6] text-[#000000] selection:bg-[#000000] selection:text-[#ffffff]'} relative overflow-x-hidden font-sans transition-colors duration-300`}>
        
        {/* 0. Renaissance Gallery Initial Preloader */}
        {showPreloader && (
          <Preloader
            lang={lang}
            onComplete={() => {
              sessionStorage.setItem('weddo_preloader_seen', 'true')
              setShowPreloader(false)
            }}
          />
        )}

        {/* 0.1 Custom Between-Pages Navigation Preloader */}
        <NavigationPreloader
          isActive={navTransition.active}
          targetRoute={navTransition.targetRoute}
          lang={lang}
          theme={theme}
          onHalfway={() => {
            window.location.hash = `#/${navTransition.targetRoute === 'home' ? '' : navTransition.targetRoute}`
            setCurrentRoute(navTransition.targetRoute)
            window.scrollTo({ top: 0, behavior: 'instant' })
          }}
          onComplete={() => {
            setNavTransition(prev => ({ ...prev, active: false }))
          }}
        />

        {/* 0.2 Custom Directional Language Change Transition */}
        <LanguageTransition
          isActive={langTransition.active}
          currentLang={lang}
          targetLang={langTransition.targetLang}
          theme={theme}
          onHalfway={() => {
            const next = langTransition.targetLang
            setLang(next)
            document.documentElement.lang = next
            document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr'
            localStorage.setItem('weddo_lang', next)
          }}
          onComplete={() => {
            setLangTransition(prev => ({ ...prev, active: false }))
          }}
        />

        {/* 1. Global Navigation Bar: React Bits BubbleMenu Component */}
        <BubbleMenu
          logo={
            <div 
              onClick={() => navigateTo('/')} 
              className="cursor-pointer"
              title="Weddo - Renaissance Luxury Venues"
            >
              <WeddoLogo lang={lang} size="sm" dark={theme === 'dark'} />
            </div>
          }
          items={bubbleMenuItems}
          menuAriaLabel={lang === 'ar' ? 'تبديل القائمة الرئيسية' : 'Toggle main navigation menu'}
          menuBg={theme === 'dark' ? '#1c1b18' : '#e7e5e4'}
          menuContentColor={theme === 'dark' ? '#f5f5f3' : '#000000'}
          useFixedPosition={true}
          animationEase="back.out(1.5)"
          animationDuration={0.48}
          staggerDelay={0.08}
          navExtras={navExtras}
          onItemSelect={(item) => navigateTo(item.href)}
        />

        {/* 2. Active Route Page View */}
        <main className="flex-1 w-full">
          {currentRoute === 'home' || currentRoute === '' || currentRoute === '/' ? (
            <HomePage
              venues={venues}
              filters={filters}
              setFilters={setFilters}
              onResetFilters={handleResetFilters}
              shortlist={shortlist}
              onToggleShortlist={handleToggleShortlist}
              compareIds={compareIds}
              onToggleCompare={handleToggleCompare}
              onSelectDetails={handleOpenDetails}
              onQuickInquire={handleQuickInquire}
              onNavigate={navigateTo}
              lang={lang}
              t={t}
              theme={theme}
              isPreloading={showPreloader || navTransition.active}
            />
          ) : currentRoute === 'venues' ? (
            <VenuesPage
              venues={venues}
              filters={filters}
              setFilters={setFilters}
              onResetFilters={handleResetFilters}
              shortlist={shortlist}
              onToggleShortlist={handleToggleShortlist}
              compareIds={compareIds}
              onToggleCompare={handleToggleCompare}
              onSelectDetails={handleOpenDetails}
              onQuickInquire={handleQuickInquire}
              onOpenCompare={() => setIsCompareOpen(true)}
              lang={lang}
              t={t}
              theme={theme}
            />
          ) : currentRoute === 'planning' ? (
            <PlanningPage
              lang={lang}
              t={t}
            />
          ) : currentRoute === 'pricing' ? (
            <PricingPage
              lang={lang}
              t={t}
            />
          ) : currentRoute === 'vendor-ops' ? (
            <VendorPortalPage
              venues={venues}
              lang={lang}
              t={t}
            />
          ) : currentRoute === 'compliance' ? (
            <CompliancePage
              venues={venues}
              lang={lang}
              t={t}
            />
          ) : (
            <HomePage
              venues={venues}
              filters={filters}
              setFilters={setFilters}
              onResetFilters={handleResetFilters}
              shortlist={shortlist}
              onToggleShortlist={handleToggleShortlist}
              compareIds={compareIds}
              onToggleCompare={handleToggleCompare}
              onSelectDetails={handleOpenDetails}
              onQuickInquire={handleQuickInquire}
              onNavigate={navigateTo}
              lang={lang}
              t={t}
              theme={theme}
              isPreloading={showPreloader || navTransition.active}
            />
          )}
        </main>

        {/* 3. Footer */}
        <Footer
          lang={lang}
          t={t}
          onReplayPreloader={() => setShowPreloader(true)}
        />

        {/* --- Global Modals & Drawers --- */}

        {/* Venue Details Modal */}
        <VenueDetailsModal
          venue={selectedDetailsVenue}
          isOpen={isDetailsModalOpen}
          onClose={() => {
            setIsDetailsModalOpen(false)
            setSelectedDetailsVenue(null)
          }}
          onOpenInquiry={handleQuickInquire}
          lang={lang}
          t={t}
        />

        {/* Compare Drawer */}
        <CompareDrawer
          compareIds={compareIds}
          venues={venues}
          isOpen={isCompareOpen}
          onClose={() => setIsCompareOpen(false)}
          onRemoveFromCompare={handleRemoveFromCompare}
          onClearCompare={handleClearCompare}
          onOpenInquiry={handleQuickInquire}
          lang={lang}
          t={t}
        />

        {/* Structured Inquiry Modal */}
        <InquiryModal
          venue={selectedInquiryVenue}
          defaultSpaceId={defaultInquirySpaceId}
          defaultPackageId={defaultInquiryPackageId}
          isOpen={isInquiryModalOpen}
          onClose={() => {
            setIsInquiryModalOpen(false)
            setSelectedInquiryVenue(null)
          }}
          onSubmitInquiry={handleAddInquiry}
          lang={lang}
          t={t}
        />

        {/* Inquiries & Conversation Messages Drawer */}
        <InquiriesConversationDrawer
          inquiries={inquiries}
          isOpen={isInquiriesDrawerOpen}
          onClose={() => setIsInquiriesDrawerOpen(false)}
          onSendReply={handleSendReply}
          lang={lang}
          t={t}
        />

        {/* Spotlight Search Modal */}
        <SpotlightSearchModal
          isOpen={isSpotlightOpen}
          onClose={() => setIsSpotlightOpen(false)}
          venues={venues}
          onSelectVenue={(v) => {
            setIsSpotlightOpen(false)
            handleOpenDetails(v)
          }}
          lang={lang}
          t={t}
        />

        {/* Venue Owner Operations Dashboard (Modal Trigger) */}
        <OwnerDashboardModal
          venue={venues[0]}
          isOpen={isOwnerModalOpen}
          onClose={() => setIsOwnerModalOpen(false)}
          lang={lang}
          t={t}
        />

        {/* Operator & Admin Review Modal */}
        <AdminReviewModal
          isOpen={isAdminModalOpen}
          onClose={() => setIsAdminModalOpen(false)}
          lang={lang}
          t={t}
        />

        {/* Sonner Toast Notifications Container */}
        <Toaster />

      </div>
    </TooltipProvider>
  )
}
