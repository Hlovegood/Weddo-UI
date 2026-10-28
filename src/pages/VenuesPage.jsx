import React, { useState, useMemo } from 'react'
import { 
  Sparkles, 
  Building2, 
  Trees, 
  Landmark, 
  Presentation, 
  RotateCcw,
  ArrowUpDown,
  Search,
  LayoutGrid,
  List,
  Scale,
  Heart,
  ShieldCheck
} from 'lucide-react'
import { VenueCard } from '../components/VenueCard'
import { sound } from '../lib/sound'
import { getAreaLabel } from '../data/venues'
import BorderGlow from '../components/ui/BorderGlow'

export function VenuesPage({
  venues,
  filters,
  setFilters,
  onResetFilters,
  shortlist,
  onToggleShortlist,
  compareIds,
  onToggleCompare,
  onSelectDetails,
  onQuickInquire,
  onOpenCompare,
  lang,
  t
}) {
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedArea, setSelectedArea] = useState('all')
  const [selectedBudget, setSelectedBudget] = useState('all')
  const [selectedCapacity, setSelectedCapacity] = useState('all')
  const [viewMode, setViewMode] = useState('grid') // 'grid' | 'list'
  const [sortBy, setSortBy] = useState('featured')

  const areas = [
    { id: 'all', label: lang === 'ar' ? 'كافة المناطق' : 'All Regions' },
    { id: 'new-cairo', label: lang === 'ar' ? 'القاهرة الجديدة والتجمع' : 'New Cairo & Katameya' },
    { id: 'sheikh-zayed', label: lang === 'ar' ? 'الشيخ زايد وأكتوبر' : 'Sheikh Zayed & 6th Oct' },
    { id: 'zamalek', label: lang === 'ar' ? 'الزمالك وضفاف النيل' : 'Zamalek & Nile' },
    { id: 'alexandria', label: lang === 'ar' ? 'الإسكندرية والساحل' : 'Alexandria Waterfront' }
  ]

  const categoryTabs = [
    { id: 'all', label: lang === 'ar' ? 'كافة المعروضات' : 'All Venues', icon: Sparkles },
    { id: 'wedding', label: lang === 'ar' ? 'أفراح وعقد قران' : 'Weddings & Katb Ketab', icon: Landmark },
    { id: 'conference', label: lang === 'ar' ? 'مؤتمرات وقمم دولية' : 'Conferences & Summits', icon: Presentation },
    { id: 'garden', label: lang === 'ar' ? 'حدائق ومساحات مفتوحة' : 'Open-Air Lawns', icon: Trees },
    { id: 'ballroom', label: lang === 'ar' ? 'قاعات كبرى وفندقية' : 'Grand Ballrooms', icon: Building2 },
  ]

  const filteredVenues = useMemo(() => {
    return venues.filter(venue => {
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase()
        const nameEn = venue.name?.en?.toLowerCase() || ''
        const nameAr = venue.name?.ar?.toLowerCase() || ''
        const areaEn = venue.area?.en?.toLowerCase() || ''
        const areaAr = venue.area?.ar?.toLowerCase() || ''
        if (!nameEn.includes(query) && !nameAr.includes(query) && !areaEn.includes(query) && !areaAr.includes(query)) {
          return false
        }
      }

      // Area filter
      if (selectedArea !== 'all') {
        const vArea = venue.area?.en?.toLowerCase() || ''
        if (selectedArea === 'new-cairo' && !vArea.includes('cairo') && !vArea.includes('tagamoa')) return false
        if (selectedArea === 'sheikh-zayed' && !vArea.includes('zayed') && !vArea.includes('october')) return false
        if (selectedArea === 'zamalek' && !vArea.includes('zamalek') && !vArea.includes('nile')) return false
        if (selectedArea === 'alexandria' && !vArea.includes('alexandria')) return false
      }

      // Category tab
      if (activeTab === 'wedding' && venue.category !== 'wedding') return false
      if (activeTab === 'conference' && venue.category !== 'conference') return false
      if (activeTab === 'garden' && venue.kind !== 'garden') return false
      if (activeTab === 'ballroom' && venue.kind !== 'ballroom') return false

      // Capacity band
      if (selectedCapacity !== 'all') {
        const maxCap = venue.spaces?.reduce((max, s) => s.capacity > max ? s.capacity : max, 0) || venue.capacityMax || 0
        if (selectedCapacity === 'intimate' && maxCap > 150) return false
        if (selectedCapacity === 'medium' && (maxCap < 150 || maxCap > 350)) return false
        if (selectedCapacity === 'grand' && (maxCap < 350 || maxCap > 600)) return false
        if (selectedCapacity === 'royal' && maxCap < 600) return false
      }

      // Budget band
      if (selectedBudget !== 'all') {
        const lowest = venue.packages?.reduce((min, p) => p.price < min ? p.price : min, venue.packages[0]?.price || 0)
        if (selectedBudget === 'under150k' && lowest > 150000) return false
        if (selectedBudget === '150k-300k' && (lowest < 150000 || lowest > 300000)) return false
        if (selectedBudget === 'above300k' && lowest < 300000) return false
      }

      return true
    }).sort((a, b) => {
      if (sortBy === 'price_asc') {
        const minA = a.packages?.reduce((m, p) => p.price < m ? p.price : m, a.packages[0]?.price || 0)
        const minB = b.packages?.reduce((m, p) => p.price < m ? p.price : m, b.packages[0]?.price || 0)
        return minA - minB
      }
      if (sortBy === 'price_desc') {
        const minA = a.packages?.reduce((m, p) => p.price < m ? p.price : m, a.packages[0]?.price || 0)
        const minB = b.packages?.reduce((m, p) => p.price < m ? p.price : m, b.packages[0]?.price || 0)
        return minB - minA
      }
      if (sortBy === 'capacity') {
        const capA = a.spaces?.reduce((m, s) => s.capacity > m ? s.capacity : m, 0) || a.capacityMax || 0
        const capB = b.spaces?.reduce((m, s) => s.capacity > m ? s.capacity : m, 0) || b.capacityMax || 0
        return capB - capA
      }
      return 0
    })
  }, [venues, searchQuery, selectedArea, activeTab, selectedCapacity, selectedBudget, sortBy])

  const handleResetAll = () => {
    sound.tap()
    setSearchQuery('')
    setSelectedArea('all')
    setActiveTab('all')
    setSelectedCapacity('all')
    setSelectedBudget('all')
    setSortBy('featured')
    onResetFilters?.()
  }

  return (
    <div className="w-full pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="mb-10 pb-8 border-b border-[#dfdcd5] dark:border-[#2e2d28] transition-colors">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e7e5e4] dark:bg-[#1c1b18] border border-[#dfdcd5] dark:border-[#2e2d28] text-xs font-mono uppercase tracking-widest text-[#595855] dark:text-[#a8a69e] mb-4 transition-colors">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
              <span>{lang === 'ar' ? 'الأرشيف المعماري الحي // ٢٠٢٦' : 'LIVE ARCHITECTURAL ARCHIVE // 2026'}</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#000000] dark:text-[#f5f5f3] font-normal tracking-tight mb-3 transition-colors">
              {lang === 'ar' ? 'كتالوج القاعات والقصور الملكية' : 'Curated Venues & Estates Catalog'}
            </h1>
            <p className="text-sm sm:text-base text-[#595855] dark:text-[#a8a69e] max-w-2xl font-sans leading-relaxed transition-colors">
              {lang === 'ar'
                ? 'استكشف مواصفات المساحات، باقات الأسعار المعتمدة بالجنيه المصري، وتفاصيل الأمان لـ ٨ من أندر القصور والحدائق وقاعات المؤتمرات.'
                : 'Inspect certified space capacities, verified EGP package guide prices, and architectural floorplans for Egypt’s most revered wedding estates.'}
            </p>
          </div>

          {/* Quick Stats Pill (Container above the search cockpit) with Interactive BorderGlow */}
          <BorderGlow
            edgeSensitivity={30}
            borderRadius={16}
            glowRadius={35}
            glowIntensity={1.2}
            coneSpread={28}
            animated={true}
            className="shrink-0 transition-colors shadow-sm"
          >
            <div className="flex items-center gap-4 p-4">
              <div className="text-center px-3 border-r border-[#dfdcd5] dark:border-[#2e2d28] rtl:border-r-0 rtl:border-l">
                <span className="block font-serif text-2xl font-medium text-[#000000] dark:text-[#f5f5f3]">{venues.length}</span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#595855] dark:text-[#a8a69e]">{lang === 'ar' ? 'قاعات مفحوصة' : 'Estates'}</span>
              </div>
              <div className="text-center px-3 border-r border-[#dfdcd5] dark:border-[#2e2d28] rtl:border-r-0 rtl:border-l">
                <span className="block font-serif text-2xl font-medium text-[#10b981]">100%</span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#595855] dark:text-[#a8a69e]">{lang === 'ar' ? 'حماية مدنية' : 'Safety Certified'}</span>
              </div>
              <div className="text-center px-3">
                <span className="block font-serif text-2xl font-medium text-[#000000] dark:text-[#f5f5f3]">0</span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#595855] dark:text-[#a8a69e]">{lang === 'ar' ? 'عمولات وسيط' : 'Broker Fees'}</span>
              </div>
            </div>
          </BorderGlow>
        </div>
      </div>

      {/* Control Cockpit Bar */}
      <div className="bg-[#ffffff] dark:bg-[#1c1b18] rounded-2xl p-4 sm:p-6 border border-black/10 dark:border-white/10 shadow-sm mb-8 space-y-4 transition-colors">
        {/* Row 1: Search & Sort & View Mode */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#595855] dark:text-[#a8a69e] absolute left-3.5 top-1/2 -translate-y-1/2 rtl:left-auto rtl:right-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'ar' ? 'ابحث باسم القاعة، المساحة، أو المنطقة (مثل: الزيتون، النيل، زايد)...' : 'Search by estate name, space, or area (e.g. Olive Garden, Nile, Zayed)...'}
              className="w-full pl-10 pr-4 rtl:pl-4 rtl:pr-10 py-2.5 rounded-xl bg-[#dfdcd5]/30 dark:bg-[#282723] border border-black/10 dark:border-white/10 text-sm placeholder:text-[#595855]/60 dark:placeholder:text-[#a8a69e]/60 text-[#000000] dark:text-[#f5f5f3] outline-none focus:border-black dark:focus:border-white transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 rtl:right-auto rtl:left-3 text-xs text-[#595855] dark:text-[#a8a69e] hover:text-[#000000] dark:hover:text-[#f5f5f3]"
              >
                ✕
              </button>
            )}
          </div>

          {/* Controls Right */}
          <div className="flex items-center gap-3">
            {/* Sort Select */}
            <div className="flex items-center gap-2 bg-[#dfdcd5]/30 dark:bg-[#282723] px-3 py-2 rounded-xl border border-black/10 dark:border-white/10 text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#595855] dark:text-[#a8a69e]" />
              <select
                value={sortBy}
                onChange={(e) => {
                  sound.tap()
                  setSortBy(e.target.value)
                }}
                className="bg-transparent text-xs font-medium text-[#000000] dark:text-[#f5f5f3] outline-none cursor-pointer"
              >
                <option value="featured">{lang === 'ar' ? 'المميزة أولاً' : 'Featured First'}</option>
                <option value="price_asc">{lang === 'ar' ? 'السعر: من الأقل' : 'Price: Low to High'}</option>
                <option value="price_desc">{lang === 'ar' ? 'السعر: من الأعلى' : 'Price: High to Low'}</option>
                <option value="capacity">{lang === 'ar' ? 'السعة: الأكبر' : 'Max Capacity'}</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-[#dfdcd5]/30 dark:bg-[#282723] p-1 rounded-xl border border-black/10 dark:border-white/10">
              <button
                onClick={() => {
                  sound.tap()
                  setViewMode('grid')
                }}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-[#000000] dark:bg-[#f5f5f3] text-[#ffffff] dark:text-[#0b0b0a]' : 'text-[#595855] dark:text-[#a8a69e] hover:text-[#000000] dark:hover:text-[#f5f5f3]'
                }`}
                title={lang === 'ar' ? 'عرض شبكي' : 'Grid View'}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  sound.tap()
                  setViewMode('list')
                }}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-[#000000] dark:bg-[#f5f5f3] text-[#ffffff] dark:text-[#0b0b0a]' : 'text-[#595855] dark:text-[#a8a69e] hover:text-[#000000] dark:hover:text-[#f5f5f3]'
                }`}
                title={lang === 'ar' ? 'عرض تفصيلي' : 'Blueprint List View'}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Reset button */}
            {(searchQuery || selectedArea !== 'all' || activeTab !== 'all' || selectedCapacity !== 'all' || selectedBudget !== 'all') && (
              <button
                onClick={handleResetAll}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-50 dark:bg-rose-950/40 text-red-700 dark:text-rose-400 hover:bg-red-100 dark:hover:bg-rose-950/60 border border-red-200 dark:border-rose-900/40 text-xs font-medium transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'إعادة ضبط' : 'Reset'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Row 2: Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
          {categoryTabs.map(tab => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => {
                  sound.tap()
                  setActiveTab(tab.id)
                }}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#000000] dark:bg-[#f5f5f3] text-[#ffffff] dark:text-[#0b0b0a] shadow-sm'
                    : 'bg-[#dfdcd5]/40 dark:bg-[#282723] text-[#595855] dark:text-[#a8a69e] hover:text-[#000000] dark:hover:text-[#f5f5f3] hover:bg-[#dfdcd5] dark:hover:bg-[#34332e]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Row 3: Sub-filters (Area, Capacity, Budget) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-black/5 dark:border-white/5">
          {/* Region filter */}
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-[#595855] dark:text-[#a8a69e] mb-1">
              {lang === 'ar' ? 'المنطقة الجغرافية' : 'Region'}
            </label>
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="w-full text-xs bg-[#dfdcd5]/30 dark:bg-[#282723] border border-black/10 dark:border-white/10 rounded-lg px-2.5 py-1.5 text-[#000000] dark:text-[#f5f5f3] outline-none"
            >
              {areas.map(a => (
                <option key={a.id} value={a.id} className="dark:bg-[#1c1b18] dark:text-[#f5f5f3]">{a.label}</option>
              ))}
            </select>
          </div>

          {/* Capacity filter */}
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-[#595855] dark:text-[#a8a69e] mb-1">
              {lang === 'ar' ? 'سعة الضيوف' : 'Guest Capacity'}
            </label>
            <select
              value={selectedCapacity}
              onChange={(e) => setSelectedCapacity(e.target.value)}
              className="w-full text-xs bg-[#dfdcd5]/30 dark:bg-[#282723] border border-black/10 dark:border-white/10 rounded-lg px-2.5 py-1.5 text-[#000000] dark:text-[#f5f5f3] outline-none"
            >
              <option value="all" className="dark:bg-[#1c1b18] dark:text-[#f5f5f3]">{lang === 'ar' ? 'كافة السعات' : 'Any Capacity'}</option>
              <option value="intimate" className="dark:bg-[#1c1b18] dark:text-[#f5f5f3]">{lang === 'ar' ? 'حميمة (أقل من ١٥٠ ضيف)' : 'Intimate (<150 guests)'}</option>
              <option value="medium" className="dark:bg-[#1c1b18] dark:text-[#f5f5f3]">{lang === 'ar' ? 'متوسطة (١٥٠ - ٣٥٠ ضيف)' : 'Medium (150-350 guests)'}</option>
              <option value="grand" className="dark:bg-[#1c1b18] dark:text-[#f5f5f3]">{lang === 'ar' ? 'كبرى (٣٥٠ - ٦٠٠ ضيف)' : 'Grand (350-600 guests)'}</option>
              <option value="royal" className="dark:bg-[#1c1b18] dark:text-[#f5f5f3]">{lang === 'ar' ? 'ملكية (أكثر من ٦٠٠ ضيف)' : 'Royal (600+ guests)'}</option>
            </select>
          </div>

          {/* Budget filter */}
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-[#595855] dark:text-[#a8a69e] mb-1">
              {lang === 'ar' ? 'النطاق المالي للباقة' : 'Package Budget (EGP)'}
            </label>
            <select
              value={selectedBudget}
              onChange={(e) => setSelectedBudget(e.target.value)}
              className="w-full text-xs bg-[#dfdcd5]/30 dark:bg-[#282723] border border-black/10 dark:border-white/10 rounded-lg px-2.5 py-1.5 text-[#000000] dark:text-[#f5f5f3] outline-none"
            >
              <option value="all" className="dark:bg-[#1c1b18] dark:text-[#f5f5f3]">{lang === 'ar' ? 'كافة الميزانيات' : 'Any Budget'}</option>
              <option value="under150k" className="dark:bg-[#1c1b18] dark:text-[#f5f5f3]">{lang === 'ar' ? 'أقل من ١٥٠,٠٠٠ ج.م' : 'Under 150,000 EGP'}</option>
              <option value="150k-300k" className="dark:bg-[#1c1b18] dark:text-[#f5f5f3]">{lang === 'ar' ? '١٥٠,٠٠٠ - ٣٠٠,٠٠٠ ج.م' : '150,000 – 300,000 EGP'}</option>
              <option value="above300k" className="dark:bg-[#1c1b18] dark:text-[#f5f5f3]">{lang === 'ar' ? 'أكثر من ٣٠٠,٠٠٠ ج.م' : '300,000+ EGP'}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <span className="font-mono text-xs text-[#595855] dark:text-[#a8a69e]">
          {lang === 'ar'
            ? `عرض ${filteredVenues.length} من أصل ${venues.length} قاعة معتمدة`
            : `Showing ${filteredVenues.length} of ${venues.length} certified estates`}
        </span>

        {compareIds.length > 0 && (
          <button
            onClick={onOpenCompare}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#000000] dark:bg-[#f5f5f3] text-white dark:text-[#0b0b0a] text-xs font-medium hover:bg-[#595855] dark:hover:bg-[#dfdcd5] transition-colors"
          >
            <Scale className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? `مقارنة القاعات (${compareIds.length})` : `Compare Estates (${compareIds.length})`}</span>
          </button>
        )}
      </div>

      {/* Venues Display */}
      {filteredVenues.length === 0 ? (
        <div className="bg-[#e7e5e4] dark:bg-[#1c1b18] rounded-2xl p-12 text-center border border-[#dfdcd5] dark:border-[#2e2d28] transition-colors">
          <Building2 className="w-12 h-12 text-[#595855] dark:text-[#a8a69e] mx-auto mb-4 opacity-40" />
          <h3 className="font-serif text-2xl text-[#000000] dark:text-[#f5f5f3] mb-2">
            {lang === 'ar' ? 'لم يتم العثور على قاعات مطابقة' : 'No Estates Match Your Filter Criteria'}
          </h3>
          <p className="text-xs text-[#595855] dark:text-[#a8a69e] max-w-md mx-auto mb-6">
            {lang === 'ar'
              ? 'جرّب توسيع النطاق الجغرافي أو المالي، أو اضغط على زر إعادة الضبط لمشاهدة جميع القاعات.'
              : 'Try widening your budget range, changing the geographic region, or clearing the search keyword.'}
          </p>
          <button
            onClick={handleResetAll}
            className="px-5 py-2 rounded-full bg-[#000000] dark:bg-[#f5f5f3] text-white dark:text-[#0b0b0a] text-xs font-medium hover:bg-[#595855] dark:hover:bg-[#dfdcd5] transition-colors"
          >
            {lang === 'ar' ? 'عرض كافة القاعات' : 'Show All Venues'}
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* Grid View: 2 Columns of Rich VenueCards */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredVenues.map((venue, idx) => (
            <VenueCard
              key={venue.id}
              venue={venue}
              index={idx}
              isShortlisted={shortlist.includes(venue.id)}
              onToggleShortlist={() => onToggleShortlist(venue.id)}
              isCompared={compareIds.includes(venue.id)}
              onToggleCompare={() => onToggleCompare(venue.id)}
              onSelectDetails={() => onSelectDetails(venue)}
              onQuickInquire={(spaceId, pkgId) => onQuickInquire(venue, spaceId, pkgId)}
              lang={lang}
              t={t}
            />
          ))}
        </div>
      ) : (
        /* List / Blueprint Mode: High Density Table View */
        <div className="bg-[#e7e5e4] dark:bg-[#1c1b18] rounded-2xl border border-[#dfdcd5] dark:border-[#2e2d28] overflow-hidden shadow-sm transition-colors">
          <div className="overflow-x-auto">
            <table className="w-full text-left rtl:text-right text-xs">
              <thead className="bg-[#dfdcd5]/60 dark:bg-[#282723] text-[#595855] dark:text-[#a8a69e] font-mono uppercase text-[10px] tracking-wider border-b border-[#dfdcd5] dark:border-[#2e2d28]">
                <tr>
                  <th className="py-3 px-4">{lang === 'ar' ? 'القاعة والمعلم' : 'Estate'}</th>
                  <th className="py-3 px-4">{lang === 'ar' ? 'المنطقة' : 'Area'}</th>
                  <th className="py-3 px-4">{lang === 'ar' ? 'السعة القصوى' : 'Max Capacity'}</th>
                  <th className="py-3 px-4">{lang === 'ar' ? 'المساحات' : 'Spaces'}</th>
                  <th className="py-3 px-4">{lang === 'ar' ? 'يبدأ من' : 'Starting Rate'}</th>
                  <th className="py-3 px-4">{lang === 'ar' ? 'الأمان' : 'Safety Audit'}</th>
                  <th className="py-3 px-4 text-center">{lang === 'ar' ? 'إجراءات' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#dfdcd5] dark:divide-[#2e2d28]">
                {filteredVenues.map((venue) => {
                  const lowestPrice = venue.packages?.reduce((min, p) => p.price < min ? p.price : min, venue.packages?.[0]?.price || 0) || 0
                  const isCompared = compareIds?.includes(venue.id)
                  const isShortlisted = shortlist?.includes(venue.id)
                  const maxCap = venue.spaces?.reduce((max, s) => s.capacity > max ? s.capacity : max, 0) || 0
                  const venueName = venue.name?.[lang] || venue.name?.en || ''
                  const venueSummary = venue.summary?.[lang] || venue.summary?.en || ''
                  const areaLabel = getAreaLabel(venue.area, lang)

                  return (
                    <tr key={venue.id} className="hover:bg-[#dfdcd5]/30 dark:hover:bg-[#282723]/50 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={venue.coverPhoto || '/venue_olive_garden.jpg'}
                            alt={venueName}
                            className="w-12 h-10 object-cover rounded-lg border border-[#dfdcd5] dark:border-[#2e2d28] shrink-0"
                          />
                          <div>
                            <span className="font-serif text-sm font-medium text-[#000000] dark:text-[#f5f5f3] block">
                              {venueName}
                            </span>
                            <span className="text-[11px] text-[#595855] dark:text-[#a8a69e] line-clamp-1">
                              {venueSummary}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-[11px] text-[#595855] dark:text-[#a8a69e]">
                        {areaLabel}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-mono font-medium text-[#000000] dark:text-[#f5f5f3]">
                          {maxCap} {lang === 'ar' ? 'ضيف' : 'guests'}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-md bg-[#dfdcd5] dark:bg-[#282723] text-[10px] font-mono text-[#595855] dark:text-[#a8a69e]">
                          {venue.spaces?.length || 0} {lang === 'ar' ? 'مساحات' : 'spaces'}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-serif text-sm font-semibold text-[#000000] dark:text-[#f5f5f3]">
                          {lowestPrice.toLocaleString()} <span className="text-[10px] font-mono">EGP</span>
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>{lang === 'ar' ? 'معتمد' : 'Verified'}</span>
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => onToggleCompare(venue.id)}
                            className={`p-1.5 rounded-lg border text-xs transition-colors ${
                              isCompared 
                                ? 'bg-black text-white border-black dark:bg-[#f5f5f3] dark:text-black dark:border-[#f5f5f3]' 
                                : 'border-black/20 dark:border-white/15 text-[#595855] dark:text-[#a8a69e] hover:bg-black/5 dark:hover:bg-white/5'
                            }`}
                            title={lang === 'ar' ? 'مقارنة' : 'Compare'}
                          >
                            <Scale className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onToggleShortlist(venue.id)}
                            className={`p-1.5 rounded-lg border text-xs transition-colors ${
                              isShortlisted 
                                ? 'bg-rose-500 text-white border-rose-500 dark:bg-rose-950/80 dark:text-rose-400 dark:border-rose-800' 
                                : 'border-black/20 dark:border-white/15 text-[#595855] dark:text-[#a8a69e] hover:bg-black/5 dark:hover:bg-white/5'
                            }`}
                            title={lang === 'ar' ? 'حفظ' : 'Shortlist'}
                          >
                            <Heart className={`w-3.5 h-3.5 ${isShortlisted ? 'fill-current' : ''}`} />
                          </button>
                          <button
                            onClick={() => onSelectDetails(venue)}
                            className="px-2.5 py-1 rounded-lg bg-[#000000] text-white text-[11px] font-medium hover:bg-[#595855] dark:bg-[#282723] dark:text-[#f5f5f3] dark:hover:bg-[#34332e] transition-colors"
                          >
                            {lang === 'ar' ? 'معاينة' : 'Inspect'}
                          </button>
                          <button
                            onClick={() => onQuickInquire(venue)}
                            className="px-2.5 py-1 rounded-lg border border-black/20 dark:border-white/20 text-[11px] font-medium text-[#000000] dark:text-[#f5f5f3] hover:bg-black hover:text-white dark:hover:bg-[#f5f5f3] dark:hover:text-black transition-colors"
                          >
                            {lang === 'ar' ? 'حجز' : 'Book'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
