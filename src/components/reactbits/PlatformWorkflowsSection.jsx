import React, { useState } from 'react'
import { SpotlightCard } from './SpotlightCard'
import { ShinyText } from './ShinyText'
import { 
  Users, 
  Briefcase, 
  ShieldCheck, 
  CheckCircle2, 
  Plus, 
  Lock, 
  Calendar, 
  FileText, 
  ArrowRight,
  Sparkles
} from 'lucide-react'

export function PlatformWorkflowsSection({
  onOpenInquiry,
  className = ''
}) {
  const [activeTab, setActiveTab] = useState('couple') // 'couple' | 'owner' | 'admin'
  const [ownerDates, setOwnerDates] = useState([
    { date: '2026-11-14', session: 'Evening', space: 'The Royal Olive Lawn', reason: 'Private Maintenance' },
    { date: '2026-12-31', session: 'All Day', space: 'Imperial Nile Ballroom', reason: 'Annual Gala Reserved' }
  ])
  const [newDate, setNewDate] = useState('2027-04-18')

  const handleAddBlock = (e) => {
    e.preventDefault()
    if (!newDate) return
    setOwnerDates((prev) => [
      ...prev,
      { date: newDate, session: 'Evening Reception', space: 'The Royal Olive Lawn', reason: 'Client Private Hold' }
    ])
    setNewDate('')
  }

  return (
    <section className={`py-20 px-4 max-w-7xl mx-auto border-t border-[#231e1a] ${className}`} id="platform-architecture">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#dfc086]/10 border border-[#dfc086]/25 text-[#dfc086] text-xs font-semibold mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Weddo Platform Architecture & Governance</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#f7f3eb]">
          Three Connected Perspectives
        </h2>
        <p className="text-[#a89d91] text-sm sm:text-base mt-2">
          Designed for authentic operational trust: couples get verified pricing, owners manage dates & spaces, and operators audit every publication.
        </p>

        {/* Perspective Switcher Tabs */}
        <div className="inline-flex p-1 rounded-2xl bg-[#141211] border border-[#27221e] mt-6 shadow-inner">
          <button
            type="button"
            onClick={() => setActiveTab('couple')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'couple'
                ? 'bg-[#241e17] text-[#dfc086] border border-[#382d22] shadow-sm'
                : 'text-[#8e8377] hover:text-[#d6cebf]'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>1. Couple Experience</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('owner')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'owner'
                ? 'bg-[#241e17] text-[#dfc086] border border-[#382d22] shadow-sm'
                : 'text-[#8e8377] hover:text-[#d6cebf]'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>2. Venue Owner Operations</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('admin')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'admin'
                ? 'bg-[#241e17] text-[#dfc086] border border-[#382d22] shadow-sm'
                : 'text-[#8e8377] hover:text-[#d6cebf]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>3. Operator Admin Review</span>
          </button>
        </div>
      </div>

      {/* Interactive Perspective Panels */}
      <div className="max-w-4xl mx-auto">
        {activeTab === 'couple' && (
          <SpotlightCard className="p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#241e17] text-[#dfc086] flex items-center justify-center border border-[#382d22]">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-[#f7f3eb]">
                  The Couple Experience
                </h3>
                <p className="text-xs text-[#a89d91]">
                  Discover, compare, and freeze pricing without hidden fees or unauthorized markups.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#181513] border border-[#27221e] space-y-2">
                <span className="text-xs font-bold text-[#f7f3eb] block">01. Certified Capacities</span>
                <p className="text-[11px] text-[#a89d91]">
                  Every space lists real guest limits measured in person, avoiding overcrowded banquet halls.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#181513] border border-[#27221e] space-y-2">
                <span className="text-xs font-bold text-[#f7f3eb] block">02. Side-by-Side Compare</span>
                <p className="text-[11px] text-[#a89d91]">
                  Evaluate up to 3 venues at once with matching specs: sound curfews, bridal suites, and valet caps.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#181513] border border-[#27221e] space-y-2">
                <span className="text-xs font-bold text-[#f7f3eb] block">03. Immutable Inquiries</span>
                <p className="text-[11px] text-[#a89d91]">
                  Submit inquiries with snapshot guarantees. The vendor receives your chosen package and rate.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#1a1715] border border-[#2e261f] flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-[#d6cebf]">
                Ready to experience an authentic 3D walk through Cairo’s top estates?
              </span>
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('walkthrough-centerpiece')
                  el?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="py-2 px-4 rounded-xl bg-gradient-to-r from-[#dfc086] to-[#ceab68] text-[#0e0d0c] font-bold text-xs flex items-center gap-1.5 shrink-0 hover:scale-105 transition-transform cursor-pointer"
              >
                <span>Launch 3D Walkthrough</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </SpotlightCard>
        )}

        {activeTab === 'owner' && (
          <SpotlightCard className="p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#241e17] text-[#dfc086] flex items-center justify-center border border-[#382d22]">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-[#f7f3eb]">
                  Venue Owner Operations & Date Locks
                </h3>
                <p className="text-xs text-[#a89d91]">
                  Manage 1–8 named spaces, 1–8 packages, photo uploads, and 3-year verified date blocks.
                </p>
              </div>
            </div>

            {/* Interactive Date Lock Demo */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#dfc086]">Live Date Block Registry (3-Year Horizon):</span>
                <span className="text-[10px] text-[#8e8377] font-mono">{ownerDates.length} Active Blocks</span>
              </div>

              <div className="space-y-2">
                {ownerDates.map((block, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-[#181513] border border-[#27221e] text-xs">
                    <div className="flex items-center gap-2">
                      <Lock className="w-3.5 h-3.5 text-amber-400" />
                      <span className="font-bold text-[#f7f3eb]">{block.date}</span>
                      <span className="text-[#a89d91]">({block.session})</span>
                    </div>
                    <span className="text-[11px] text-[#dfc086] font-medium">{block.reason}</span>
                  </div>
                ))}
              </div>

              {/* Add New Block Simulator */}
              <form onSubmit={handleAddBlock} className="flex gap-2 pt-2">
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-[#0e0d0c] border border-[#27221e] text-xs text-[#f7f3eb] focus:border-[#dfc086] focus:outline-none flex-1"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#241e17] text-[#dfc086] border border-[#382d22] text-xs font-semibold flex items-center gap-1.5 hover:bg-[#2e261f] transition-colors cursor-pointer shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Record Date Block</span>
                </button>
              </form>
            </div>

            <p className="text-[11px] text-[#8e8377] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#dfc086] shrink-0" />
              <span>Photos uploaded through the portal undergo automatic client-side EXIF stripping with a 40-asset local ceiling.</span>
            </p>
          </SpotlightCard>
        )}

        {activeTab === 'admin' && (
          <SpotlightCard className="p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#241e17] text-[#dfc086] flex items-center justify-center border border-[#382d22]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-[#f7f3eb]">
                  Operator Admin Review & Audit
                </h3>
                <p className="text-xs text-[#a89d91]">
                  Version checking rejects stale writes and preserves live listings until approvals pass.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { title: 'The Olive Garden — Space Addition', space: 'Andalusian Courtyard (Cap: 140)', status: 'Approved & Live' },
                { title: 'Nile Grand Panorama — Package Revision', space: 'Pharaohs Crown (260K EGP)', status: 'Verified Audit Passed' },
                { title: 'Azure Heritage Palace — Photoset Submission', space: '8 Belgian Revival Photos', status: 'Metadata Scrubbed' },
              ].map((sub, i) => (
                <div key={i} className="flex items-center justify-between p-3.5 rounded-xl bg-[#181513] border border-[#27221e] text-xs">
                  <div>
                    <div className="font-bold text-[#f7f3eb]">{sub.title}</div>
                    <div className="text-[11px] text-[#a89d91]">{sub.space}</div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-[10px]">
                    {sub.status}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-[#8e8377] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#dfc086] shrink-0" />
              <span>Inquiry spaces cannot be deleted or downscaled below active guest counts.</span>
            </p>
          </SpotlightCard>
        )}
      </div>
    </section>
  )
}

export default PlatformWorkflowsSection
