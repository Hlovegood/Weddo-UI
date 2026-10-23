import React, { useState } from 'react'
import { Sparkles, Scale, Heart, MessageSquare, Globe, User, Shield, Briefcase, Menu, X } from 'lucide-react'

export function Navbar({
  lang = 'en',
  onToggleLang,
  t,
  shortlistCount = 0,
  compareCount = 0,
  inquiriesCount = 0,
  onOpenCompare,
  onOpenInquiries,
  onOpenOwnerPortal,
  onOpenAdminReview,
  currentRole,
  onChangeRole
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#25201b] bg-[#0e0d0c]/85 backdrop-blur-xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#dfc086] via-[#ceab68] to-[#9e7a3d] p-0.5 shadow-md shadow-[#ceab68]/15 group-hover:shadow-[#ceab68]/30 transition-shadow">
              <div className="w-full h-full bg-[#0e0d0c] rounded-[10px] flex items-center justify-center">
                <span className="font-serif font-black text-xl text-[#dfc086] tracking-tighter">W</span>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-tight text-[#f7f3eb] flex items-center gap-1">
                {t.brandName}
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#dfc086] mb-2" />
              </span>
              <span className="text-[10px] uppercase tracking-wider text-[#a89d91] font-medium -mt-1 hidden sm:block">
                {t.brandTagline}
              </span>
            </div>
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-[#d6cebf]">
          <a
            href="#weddo-sanctuary"
            className="hover:text-[#faecd2] transition-colors flex items-center gap-1.5 text-[#dfc086]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#dfc086]" />
            <span>{lang === 'ar' ? 'الملاذ الملكي 3D' : '3D Sanctuary'}</span>
          </a>

          <a
            href="#venues-catalog"
            className="hover:text-[#faecd2] transition-colors flex items-center gap-1.5"
          >
            <span>{t.navVenues}</span>
          </a>

          <button
            type="button"
            onClick={onOpenCompare}
            className="hover:text-[#faecd2] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Scale className="w-3.5 h-3.5 text-[#dfc086]" />
            <span>{t.navCompare}</span>
            {compareCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-[#241e17] text-[#dfc086] text-[10px] font-bold border border-[#382d22]">
                {compareCount}
              </span>
            )}
          </button>

          <a
            href="#market-intelligence"
            className="hover:text-[#faecd2] transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#dfc086]" />
            <span>{t.navMarket}</span>
          </a>

          <button
            type="button"
            onClick={onOpenInquiries}
            className="hover:text-[#faecd2] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#dfc086]" />
            <span>{t.navInquiries}</span>
            {inquiriesCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                {inquiriesCount}
              </span>
            )}
          </button>
        </nav>

        {/* Right Actions: Role Selector, Shortlist, Lang Toggle */}
        <div className="flex items-center gap-3">
          {/* Role Mode Dropdown */}
          <div className="hidden sm:flex items-center gap-1.5 bg-[#141211] border border-[#27221e] rounded-xl p-1 text-xs">
            <button
              type="button"
              onClick={() => onChangeRole('customer')}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                currentRole === 'customer'
                  ? 'bg-[#241e17] text-[#dfc086] font-semibold border border-[#382d22]'
                  : 'text-[#8e8377] hover:text-[#d6cebf]'
              }`}
            >
              <User className="w-3 h-3" />
              <span>{t.roleCustomer}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onChangeRole('owner')
                onOpenOwnerPortal()
              }}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                currentRole === 'owner'
                  ? 'bg-[#241e17] text-[#dfc086] font-semibold border border-[#382d22]'
                  : 'text-[#8e8377] hover:text-[#d6cebf]'
              }`}
            >
              <Briefcase className="w-3 h-3" />
              <span>{t.roleOwner}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onChangeRole('admin')
                onOpenAdminReview()
              }}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                currentRole === 'admin'
                  ? 'bg-[#241e17] text-[#dfc086] font-semibold border border-[#382d22]'
                  : 'text-[#8e8377] hover:text-[#d6cebf]'
              }`}
            >
              <Shield className="w-3 h-3" />
              <span>{t.roleAdmin}</span>
            </button>
          </div>

          {/* Shortlist Badge Button */}
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('venues-catalog')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            title={t.navShortlist}
            className="relative p-2.5 rounded-xl bg-[#141211] border border-[#27221e] text-[#d6cebf] hover:text-rose-300 hover:border-rose-400/40 transition-colors cursor-pointer"
          >
            <Heart className={`w-4 h-4 ${shortlistCount > 0 ? 'fill-rose-300 text-rose-300' : ''}`} />
            {shortlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                {shortlistCount}
              </span>
            )}
          </button>

          {/* Apple-grade Bilingual Switcher */}
          <button
            type="button"
            onClick={onToggleLang}
            title={lang === 'en' ? 'التحويل للعربية (Switch to Arabic)' : 'Switch to English (التحويل للإنجليزية)'}
            aria-label={lang === 'en' ? 'Switch to Arabic' : 'Switch to English'}
            className="group relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#151312]/90 border border-[#2e2720] hover:border-[#dfc086]/50 shadow-inner backdrop-blur-md transition-all duration-200 cursor-pointer active:scale-95"
          >
            <Globe className="w-3.5 h-3.5 text-[#dfc086] group-hover:rotate-45 transition-transform duration-300" />
            <span className="text-xs font-semibold tracking-wide text-[#fdfbf7]">
              {lang === 'en' ? 'العربية' : 'English'}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#dfc086] animate-pulse" />
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-[#141211] border border-[#27221e] text-[#d6cebf]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden p-4 bg-[#0e0d0c] border-b border-[#27221e] space-y-3 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-[#27221e]">
            <span className="text-[#a89d91] font-medium">{lang === 'ar' ? 'اللغة' : 'Language'}</span>
            <button
              type="button"
              onClick={() => {
                onToggleLang()
                setMobileMenuOpen(false)
              }}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1a1714] border border-[#dfc086]/40 text-xs font-semibold text-[#dfc086]"
            >
              <Globe className="w-3 h-3 text-[#dfc086]" />
              <span>{lang === 'en' ? 'العربية' : 'English'}</span>
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <a
              href="#weddo-sanctuary"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg text-[#dfc086] hover:bg-[#181513] hover:text-[#fdfbf7] flex items-center gap-2 transition-colors font-medium"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'الملاذ الملكي 3D' : '3D Sanctuary'}</span>
            </a>
            <a
              href="#venues-catalog"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg text-[#d6cebf] hover:bg-[#181513] hover:text-[#fdfbf7] transition-colors"
            >
              {t.navVenues}
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false)
                onOpenCompare()
              }}
              className="p-2 rounded-lg text-[#d6cebf] hover:bg-[#181513] hover:text-[#fdfbf7] text-left flex items-center justify-between transition-colors"
            >
              <span>{t.navCompare}</span>
              {compareCount > 0 && <span className="text-[#dfc086] font-bold">({compareCount})</span>}
            </button>
            <a
              href="#market-intelligence"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg text-[#d6cebf] hover:bg-[#181513] hover:text-[#fdfbf7] transition-colors"
            >
              {t.navMarket}
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false)
                onOpenInquiries()
              }}
              className="p-2 rounded-lg text-[#d6cebf] hover:bg-[#181513] hover:text-[#fdfbf7] text-left flex items-center justify-between transition-colors"
            >
              <span>{t.navInquiries}</span>
              {inquiriesCount > 0 && <span className="text-emerald-400 font-bold">({inquiriesCount})</span>}
            </button>
          </div>

          <div className="pt-2 border-t border-[#27221e] flex gap-2">
            <button
              type="button"
              onClick={() => {
                onChangeRole('owner')
                onOpenOwnerPortal()
                setMobileMenuOpen(false)
              }}
              className="flex-1 py-2 text-center rounded-lg bg-[#181513] border border-[#27221e] text-[#d6cebf] hover:text-[#fdfbf7] hover:border-[#dfc086]/40 transition-colors"
            >
              {t.roleOwner}
            </button>
            <button
              type="button"
              onClick={() => {
                onChangeRole('admin')
                onOpenAdminReview()
                setMobileMenuOpen(false)
              }}
              className="flex-1 py-2 text-center rounded-lg bg-[#181513] border border-[#27221e] text-[#d6cebf] hover:text-[#fdfbf7] hover:border-[#dfc086]/40 transition-colors"
            >
              {t.roleAdmin}
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
export default Navbar
