import React, { useState } from 'react'
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  Users, 
  DollarSign, 
  CheckCircle2, 
  ChevronRight, 
  ShieldCheck, 
  Lock, 
  ArrowRight, 
  Sliders, 
  Send, 
  Building, 
  Plus, 
  Trash2, 
  Clock, 
  Eye, 
  FileText, 
  MessageSquare, 
  UserCheck, 
  Minimize2, 
  Maximize2 
} from 'lucide-react'
import { SpotlightCard } from '../reactbits/SpotlightCard'
import { ShinyText } from '../reactbits/ShinyText'
import { WALKTHROUGH_CHAPTERS } from './SpatialWalkthroughScene'

export function SpatialFeatureCard({
  activeChapterIndex = 0,
  onOpenInquiry,
  onOpenCompare,
  onOpenSearch,
  className = ''
}) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const currentChapter = WALKTHROUGH_CHAPTERS[activeChapterIndex] || WALKTHROUGH_CHAPTERS[0]

  // Chapter 1: Capacity Simulator state
  const [guestCount, setGuestCount] = useState(250)
  const tablesNeeded = Math.ceil(guestCount / 10)
  const aisleSpan = guestCount > 350 ? '3.5 Metres' : '2.8 Metres'
  const danceFloor = `${Math.round(guestCount * 0.45)} m²`

  // Chapter 2: Pricing Package state
  const [selectedTier, setSelectedTier] = useState('celebration')
  const [activeAddons, setActiveAddons] = useState(['valet', 'generator'])
  const tierPrices = { essential: 135000, celebration: 195000, royal: 260000 }
  const addonPrices = { valet: 12000, generator: 8000, fireworks: 18000, drone: 15000 }
  const basePrice = tierPrices[selectedTier] || 195000
  const addonsTotal = activeAddons.reduce((sum, key) => sum + (addonPrices[key] || 0), 0)
  const totalPrice = basePrice + addonsTotal

  const toggleAddon = (key) => {
    setActiveAddons((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    )
  }

  // Chapter 3: Date Block state
  const [activeDate, setActiveDate] = useState('2026-11-14')
  const [activeSession, setActiveSession] = useState('Evening')
  const [blockedDates, setBlockedDates] = useState([
    { date: '2026-11-14', session: 'Evening', reason: 'Royal Gala Held', actor: 'Owner Tarek H.' },
    { date: '2026-12-31', session: 'All Day', reason: 'New Year Private Reception', actor: 'Owner Tarek H.' }
  ])

  const isCurrentSlotBlocked = blockedDates.some(
    (b) => b.date === activeDate && (b.session === activeSession || b.session === 'All Day')
  )

  const toggleDateBlock = () => {
    if (isCurrentSlotBlocked) {
      setBlockedDates((prev) => prev.filter((b) => !(b.date === activeDate && b.session === activeSession)))
    } else {
      setBlockedDates((prev) => [
        ...prev,
        { date: activeDate, session: activeSession, reason: 'Client Private Lock', actor: 'Verified Staff' }
      ])
    }
  }

  // Chapter 5: Vendor Team state
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: 'Sarah M.', role: 'Lead Wedding Coordinator', permission: 'Both' },
    { id: 2, name: 'Kareem N.', role: 'Operations & Facilities', permission: 'Edit' },
    { id: 3, name: 'Nour H.', role: 'Client Concierge', permission: 'Reply' }
  ])
  const [newMemberName, setNewMemberName] = useState('')
  const [newMemberPermission, setNewMemberPermission] = useState('Reply')

  const handleAddTeamMember = (e) => {
    e.preventDefault()
    if (!newMemberName.trim()) return
    setTeamMembers((prev) => [
      ...prev,
      { id: Date.now(), name: newMemberName, role: 'Associate Staff', permission: newMemberPermission }
    ])
    setNewMemberName('')
  }

  // Chapter 6: Admin Audit state
  const [auditDecision, setAuditDecision] = useState(null)

  return (
    <aside
      className={`fixed top-20 sm:top-24 left-3 sm:left-6 z-30 w-[calc(100vw-1.5rem)] sm:w-[420px] transition-all duration-300 ${
        isCollapsed ? 'h-auto' : 'max-h-[calc(100vh-8.5rem)]'
      } ${className}`}
    >
      <SpotlightCard className="overflow-hidden border border-[#dfc086]/25 bg-[#12100f]/85 backdrop-blur-2xl shadow-2xl p-0 flex flex-col">
        {/* Header Bar with Chapter Title & Collapse Button */}
        <div className="p-4 sm:p-5 border-b border-[#28221c] flex items-center justify-between bg-[#171412]/60">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs font-bold text-[#dfc086] px-2 py-0.5 rounded-md bg-[#2a221a] border border-[#3d3124]">
              CH.{currentChapter.chapterNumber}
            </span>
            <div>
              <h2 className="text-sm sm:text-base font-serif font-bold text-[#f7f3eb] leading-tight">
                {currentChapter.title}
              </h2>
              <p className="text-[10px] text-[#a89d91]">{currentChapter.subtitle}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg bg-[#201b17] text-[#a89d91] hover:text-[#f7f3eb] border border-[#332920] transition-colors cursor-pointer"
            title={isCollapsed ? 'Expand Details' : 'Minimize Panel'}
          >
            {isCollapsed ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Collapsed State Summary */}
        {isCollapsed && (
          <div className="p-3 text-[11px] text-[#a89d91] flex items-center justify-between">
            <span>{currentChapter.tag}</span>
            <span className="text-[#dfc086] text-[10px]">Click expand to test interactive tools</span>
          </div>
        )}

        {/* Expanded Interactive Body */}
        {!isCollapsed && (
          <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs">
            {/* Chapter Summary Text */}
            <p className="text-[#b8ad9f] leading-relaxed text-xs">
              {currentChapter.summary}
            </p>

            {/* ----------------- CHAPTER 0: SEARCH & DISCOVERY ----------------- */}
            {currentChapter.featuresKey === 'discovery' && (
              <div className="space-y-3 pt-2 border-t border-[#25201b]">
                <div className="flex items-center justify-between">
                  <span className="text-[#d6cebf] font-semibold text-xs flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#dfc086]" />
                    Cairo Registry Filter
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
                    3 Certified Venues
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-xl bg-[#181513] border border-[#2d241d]">
                    <span className="text-[10px] text-[#7d7162] block">Zone</span>
                    <span className="font-semibold text-[#f7f3eb] text-xs">New Cairo & 90th</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#181513] border border-[#2d241d]">
                    <span className="text-[10px] text-[#7d7162] block">Guest Band</span>
                    <span className="font-semibold text-[#f7f3eb] text-xs">150 to 450 guests</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-[#1c1815] border border-[#382d22] text-[11px] text-[#d6cebf] space-y-1">
                  <div className="flex items-center gap-1.5 text-[#dfc086] font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>README Availability Guarantee</span>
                  </div>
                  <p className="text-[10px] text-[#9c9183]">
                    Unknown availability is never claimed as available. Fully blocked spaces on both sessions are automatically omitted.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onOpenSearch}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#dfc086] to-[#ceab68] text-[#0e0d0c] font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-[#ceab68]/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Launch Comprehensive Cairo Search</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* ----------------- CHAPTER 1: CAPACITY SIMULATOR ----------------- */}
            {currentChapter.featuresKey === 'capacity' && (
              <div className="space-y-3 pt-2 border-t border-[#25201b]">
                <div className="flex items-center justify-between">
                  <span className="text-[#d6cebf] font-semibold text-xs flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-[#dfc086]" />
                    Interactive Guest Slider
                  </span>
                  <span className="font-mono text-sm font-bold text-[#dfc086]">
                    {guestCount} Guests
                  </span>
                </div>

                <input
                  type="range"
                  min="60"
                  max="650"
                  step="10"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full accent-[#dfc086] cursor-pointer"
                />

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded-xl bg-[#181513] border border-[#2d241d]">
                    <span className="text-[10px] text-[#7d7162] block">Tables</span>
                    <span className="font-serif font-bold text-[#f7f3eb] text-sm">{tablesNeeded}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#181513] border border-[#2d241d]">
                    <span className="text-[10px] text-[#7d7162] block">Aisle Span</span>
                    <span className="font-serif font-bold text-[#f7f3eb] text-sm">{aisleSpan}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#181513] border border-[#2d241d]">
                    <span className="text-[10px] text-[#7d7162] block">Dance Floor</span>
                    <span className="font-serif font-bold text-[#dfc086] text-sm">{danceFloor}</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-[#181513] border border-[#2d241d] text-[11px] text-[#b8ad9f]">
                  <span className="text-emerald-400 font-bold block mb-0.5">✓ Metric Clearance Confirmed</span>
                  <span>Allows 1.8m perimeter service lanes around banquet tables with zero bottleneck at the bridal entrance.</span>
                </div>
              </div>
            )}

            {/* ----------------- CHAPTER 2: GUIDE PRICING ----------------- */}
            {currentChapter.featuresKey === 'pricing' && (
              <div className="space-y-3 pt-2 border-t border-[#25201b]">
                <div className="text-[11px] font-semibold text-[#d6cebf]">Select Base Guide Package</div>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'essential', label: 'Boutique', price: '135k' },
                    { id: 'celebration', label: 'Royal', price: '195k' },
                    { id: 'royal', label: 'Imperial', price: '260k' }
                  ].map((tier) => (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setSelectedTier(tier.id)}
                      className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                        selectedTier === tier.id
                          ? 'bg-[#261f18] border-[#dfc086] text-[#faecd2]'
                          : 'bg-[#181513] border-[#2d241d] text-[#8e8377]'
                      }`}
                    >
                      <span className="block text-[11px] font-bold">{tier.label}</span>
                      <span className="text-[10px] text-[#dfc086]">{tier.price} EGP</span>
                    </button>
                  ))}
                </div>

                <div className="text-[11px] font-semibold text-[#d6cebf] pt-1">Optional Inclusions</div>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { id: 'valet', label: 'Valet Crew (+12k)' },
                    { id: 'generator', label: 'Generator (+8k)' },
                    { id: 'fireworks', label: 'Fireworks (+18k)' },
                    { id: 'drone', label: 'Drone Rig (+15k)' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleAddon(item.id)}
                      className={`p-2 rounded-xl text-left border text-[10px] transition-all cursor-pointer flex items-center justify-between ${
                        activeAddons.includes(item.id)
                          ? 'bg-amber-500/15 border-[#dfc086] text-[#faecd2]'
                          : 'bg-[#181513] border-[#2d241d] text-[#7d7162]'
                      }`}
                    >
                      <span>{item.label}</span>
                      <span className="font-bold">{activeAddons.includes(item.id) ? '✓' : '+'}</span>
                    </button>
                  ))}
                </div>

                <div className="p-3 rounded-xl bg-gradient-to-br from-[#241e17] to-[#171412] border border-[#dfc086]/35 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#a89d91] block">Calculated Guide Rate</span>
                    <span className="font-mono text-base font-bold text-[#dfc086]">
                      {totalPrice.toLocaleString()} EGP
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onOpenInquiry()}
                    className="px-3 py-1.5 rounded-lg bg-[#dfc086] text-[#0e0d0c] font-bold text-xs hover:bg-[#ebd4a5] transition-colors cursor-pointer"
                  >
                    Lock Quote
                  </button>
                </div>
              </div>
            )}

            {/* ----------------- CHAPTER 3: 3-YEAR DATE LOCKING ----------------- */}
            {currentChapter.featuresKey === 'dates' && (
              <div className="space-y-3 pt-2 border-t border-[#25201b]">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-[#7d7162] block mb-1">Target Date</label>
                    <input
                      type="date"
                      value={activeDate}
                      onChange={(e) => setActiveDate(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-xl bg-[#181513] border border-[#2d241d] text-[#f7f3eb] text-xs focus:outline-none focus:border-[#dfc086]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-[#7d7162] block mb-1">Session Slot</label>
                    <select
                      value={activeSession}
                      onChange={(e) => setActiveSession(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-xl bg-[#181513] border border-[#2d241d] text-[#f7f3eb] text-xs focus:outline-none focus:border-[#dfc086]"
                    >
                      <option value="Day">Day Session (11 AM)</option>
                      <option value="Evening">Evening Reception (6 PM)</option>
                    </select>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#181513] border border-[#2d241d] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#7d7162] block">Current Slot Status</span>
                    <span className={`font-semibold text-xs ${isCurrentSlotBlocked ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {isCurrentSlotBlocked ? '🔒 Blocked (Unavailable)' : '✓ Open for Direct Inquiry'}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={toggleDateBlock}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                      isCurrentSlotBlocked
                        ? 'bg-rose-500/20 border-rose-500/40 text-rose-300 hover:bg-rose-500/30'
                        : 'bg-[#2a221a] border-[#dfc086]/50 text-[#dfc086] hover:bg-[#352b21]'
                    }`}
                  >
                    {isCurrentSlotBlocked ? 'Release Block' : 'Simulate Block'}
                  </button>
                </div>

                <div className="text-[10px] text-[#7d7162] font-mono">
                  Up to 2,000 entries supported. Actor & timestamp recorded on SQLite WAL backend.
                </div>
              </div>
            )}

            {/* ----------------- CHAPTER 4: INQUIRIES & SNAPSHOTS ----------------- */}
            {currentChapter.featuresKey === 'inquiries' && (
              <div className="space-y-3 pt-2 border-t border-[#25201b]">
                <div className="p-3 rounded-xl bg-[#181513] border border-[#2d241d] space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[#dfc086] font-semibold text-xs">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Frozen Price Snapshot Guarantee</span>
                  </div>
                  <p className="text-[11px] text-[#a89d91]">
                    Submitting an inquiry permanently locks the venue, space, and package guide price into your thread snapshot. Future price increases will not alter this rate.
                  </p>
                </div>

                {/* Sample Private Chat Thread Snippet */}
                <div className="p-3 rounded-xl bg-[#141210] border border-[#261f19] space-y-2">
                  <div className="text-[10px] text-[#7d7162] flex items-center justify-between">
                    <span>Private Thread #INQ-8821</span>
                    <span className="text-emerald-400">● Active</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#1f1a16] text-[11px] text-[#d6cebf]">
                    <span className="text-[#dfc086] font-bold block text-[10px]">Concierge Tarek:</span>
                    "Welcome Sarah! Your requested date 2026-11-14 is currently on hold for your review. We can host a private tasting this Friday."
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenInquiry()}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#dfc086] to-[#ceab68] text-[#0e0d0c] font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-[#ceab68]/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Open Structured Inquiry Form</span>
                </button>
              </div>
            )}

            {/* ----------------- CHAPTER 5: VENDOR TEAM RBAC ----------------- */}
            {currentChapter.featuresKey === 'vendor' && (
              <div className="space-y-3 pt-2 border-t border-[#25201b]">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-[#d6cebf]">Vendor Team Access</span>
                  <span className="text-[#dfc086] font-mono">3 / 8 Members</span>
                </div>

                <div className="space-y-1.5">
                  {teamMembers.map((member) => (
                    <div
                      key={member.id}
                      className="p-2 rounded-xl bg-[#181513] border border-[#2d241d] flex items-center justify-between"
                    >
                      <div>
                        <span className="font-semibold text-[#f7f3eb] block text-xs">{member.name}</span>
                        <span className="text-[10px] text-[#7d7162]">{member.role}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-[#2a221a] text-[#dfc086] border border-[#3e3225] text-[10px] font-bold">
                        {member.permission}
                      </span>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleAddTeamMember} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Staff email or name..."
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    className="flex-1 px-2.5 py-1.5 rounded-xl bg-[#181513] border border-[#2d241d] text-[#f7f3eb] text-xs focus:outline-none focus:border-[#dfc086]"
                  />
                  <select
                    value={newMemberPermission}
                    onChange={(e) => setNewMemberPermission(e.target.value)}
                    className="px-2 py-1.5 rounded-xl bg-[#181513] border border-[#2d241d] text-[#dfc086] text-xs focus:outline-none"
                  >
                    <option value="Reply">Reply</option>
                    <option value="Edit">Edit</option>
                    <option value="Both">Both</option>
                  </select>
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-xl bg-[#dfc086] text-[#0e0d0c] font-bold text-xs hover:bg-[#ebd4a5] transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            )}

            {/* ----------------- CHAPTER 6: ADMIN AUDIT ----------------- */}
            {currentChapter.featuresKey === 'admin' && (
              <div className="space-y-3 pt-2 border-t border-[#25201b]">
                <div className="p-3 rounded-xl bg-[#181513] border border-[#2d241d] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#f7f3eb]">Listing Revision v3.2</span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-[#dfc086] text-[10px] font-bold border border-amber-500/30">
                      Pending Review
                    </span>
                  </div>
                  <p className="text-[10px] text-[#9c9183]">
                    Changes: Updated Glasshouse max capacity from 400 to 450; added backup generator inclusion to Imperial Gala.
                  </p>
                </div>

                {auditDecision ? (
                  <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs text-center font-semibold">
                    ✓ Revision {auditDecision}: Public catalog updated with version lock protection.
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setAuditDecision('Approved & Published')}
                      className="py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors cursor-pointer shadow-sm"
                    >
                      Approve & Publish
                    </button>
                    <button
                      type="button"
                      onClick={() => setAuditDecision('Changes Requested')}
                      className="py-2 rounded-xl bg-[#261f18] hover:bg-[#332a21] text-[#dfc086] border border-[#3d3225] font-semibold text-xs transition-colors cursor-pointer"
                    >
                      Request Changes
                    </button>
                  </div>
                )}

                <div className="text-[10px] text-[#7d7162] space-y-0.5 font-mono">
                  <div>Database: SQLite WAL Mode (Healthy)</div>
                  <div>Operator CLI: scripts/admin-access.mjs</div>
                </div>
              </div>
            )}
          </div>
        )}
      </SpotlightCard>
    </aside>
  )
}
