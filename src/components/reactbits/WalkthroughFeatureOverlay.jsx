import React, { useState } from 'react'
import { SpotlightCard } from './SpotlightCard'
import { ShinyText } from './ShinyText'
import { 
  CheckCircle2, 
  Sparkles, 
  Users, 
  DollarSign, 
  Calendar, 
  MessageSquare, 
  ShieldCheck, 
  ArrowRight,
  Sliders,
  Layers,
  ChevronRight,
  Send,
  Building
} from 'lucide-react'

export function WalkthroughFeatureOverlay({
  currentStop,
  onOpenInquiry,
  className = ''
}) {
  // Widget states for each stop to make the website alive (not a PDF!)
  const [guestCount, setGuestCount] = useState(250)
  const [selectedTier, setSelectedTier] = useState('celebration')
  const [activeAddons, setActiveAddons] = useState(['valet', 'generator'])
  const [selectedArea, setSelectedArea] = useState('new-cairo')

  // Pricing calculations
  const tierPrices = {
    essential: 135000,
    celebration: 195000,
    royal: 260000
  }
  const addonPrices = {
    valet: 12000,
    generator: 8000,
    fireworks: 18000,
    drone: 15000
  }
  const basePrice = tierPrices[selectedTier] || 195000
  const addonsTotal = activeAddons.reduce((sum, key) => sum + (addonPrices[key] || 0), 0)
  const calculatedEstimate = basePrice + addonsTotal

  const toggleAddon = (key) => {
    setActiveAddons((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Active Stop Feature Header */}
      <SpotlightCard className="p-6">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#dfc086]/10 border border-[#dfc086]/25 text-[#dfc086] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{currentStop.badge}</span>
          </div>
          <span className="text-xs font-mono text-[#a89d91]">Stop {currentStop.stopNumber}</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#f7f3eb] mb-2">
          {currentStop.title}
        </h3>
        <p className="text-xs sm:text-sm text-[#d6cebf] leading-relaxed mb-6">
          {currentStop.description}
        </p>

        {/* Dynamic Metric Badges */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#27221e]">
          {currentStop.metrics.map((m, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-[10px] text-[#a89d91] uppercase tracking-wider">{m.label}</span>
              <span className="text-xs sm:text-sm font-bold font-serif text-[#dfc086] mt-0.5">{m.value}</span>
            </div>
          ))}
        </div>
      </SpotlightCard>

      {/* STOP 1: Interactive Area Radar Widget */}
      {currentStop.id === 'arch' && (
        <SpotlightCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#dfc086] uppercase tracking-wider">
              <Building className="w-4 h-4 text-[#dfc086]" />
              <span>Explore Cairo Areas in 3D</span>
            </div>
            <span className="text-[11px] text-emerald-400 font-mono">100% Certified</span>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4">
            {[
              { id: 'new-cairo', name: 'New Cairo & 90th', count: '14 Venues' },
              { id: 'garden-city', name: 'Nile Corniche', count: '9 Venues' },
              { id: 'zamalek', name: 'Zamalek Island', count: '6 Venues' },
              { id: 'heliopolis', name: 'Heliopolis Korba', count: '8 Venues' },
            ].map((area) => (
              <button
                key={area.id}
                type="button"
                onClick={() => setSelectedArea(area.id)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedArea === area.id
                    ? 'bg-[#241e17] border-[#dfc086] text-[#f7f3eb]'
                    : 'bg-[#181513]/60 border-[#27221e] text-[#a89d91] hover:border-[#dfc086]/40'
                }`}
              >
                <div className="text-xs font-bold text-[#f7f3eb]">{area.name}</div>
                <div className="text-[10px] text-[#dfc086]">{area.count}</div>
              </button>
            ))}
          </div>

          <p className="text-[11px] text-[#8e8377] flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#dfc086] shrink-0" />
            <span>Zero phantom venues policy: Every venue has authenticated land records & capacities.</span>
          </p>
        </SpotlightCard>
      )}

      {/* STOP 2: Live Guest Capacity & Layout Simulator */}
      {currentStop.id === 'lawn' && (
        <SpotlightCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#dfc086] uppercase tracking-wider">
              <Sliders className="w-4 h-4 text-[#dfc086]" />
              <span>Interactive Seating Simulator</span>
            </div>
            <span className="text-sm font-bold font-serif text-[#dfc086]">{guestCount} Guests</span>
          </div>

          {/* Range Slider */}
          <div className="space-y-2 mb-5">
            <input
              type="range"
              min="60"
              max="650"
              step="10"
              value={guestCount}
              onChange={(e) => setGuestCount(Number(e.target.value))}
              className="w-full accent-[#dfc086] cursor-pointer bg-[#27221e] rounded-lg h-2"
            />
            <div className="flex justify-between text-[10px] text-[#8e8377] font-mono">
              <span>60 Intimate</span>
              <span>250 Medium</span>
              <span>450 Grand</span>
              <span>650 Royal</span>
            </div>
          </div>

          {/* Dynamic Recommendation based on slider */}
          <div className="p-3.5 rounded-xl bg-[#1a1715] border border-[#2e261f] space-y-2 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#f7f3eb]">Recommended Architectural Layout:</span>
              <span className="text-[10px] uppercase font-bold text-[#dfc086]">
                {guestCount <= 120 ? 'Intimate Amphitheater' : guestCount <= 350 ? 'Bespoke Banquet Gala' : 'Imperial Dual-Lawn Flow'}
              </span>
            </div>
            <div className="text-[11px] text-[#a89d91]">
              {guestCount <= 120
                ? 'Ceremony circle under eucalyptus canopy with 12 round lounge tables and central runway.'
                : guestCount <= 350
                ? 'Standard 10-top round banquet seating with 4-metre wide bridal procession corridor.'
                : 'Expands into the secondary Andalusian court with synchronous audiovisual streaming.'}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] text-[#d6cebf]">
            <div className="p-2 rounded-lg bg-[#0e0d0c]/70 border border-[#27221e]">
              Required Lawn Footprint: <b>{Math.round(guestCount * 2.4)} m²</b>
            </div>
            <div className="p-2 rounded-lg bg-[#0e0d0c]/70 border border-[#27221e]">
              Valet Capacity: <b>{Math.ceil(guestCount / 2.5)} Cars</b>
            </div>
          </div>
        </SpotlightCard>
      )}

      {/* STOP 3: Live Instant Package Quote Estimator */}
      {currentStop.id === 'atrium' && (
        <SpotlightCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#dfc086] uppercase tracking-wider">
              <DollarSign className="w-4 h-4 text-[#dfc086]" />
              <span>Live Contract Estimator</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-[#a89d91] block">Estimated Total</span>
              <span className="text-base font-bold font-serif text-[#dfc086]">
                {calculatedEstimate.toLocaleString()} EGP
              </span>
            </div>
          </div>

          {/* Package Tier Tabs */}
          <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-[#0e0d0c] border border-[#27221e] mb-4">
            {[
              { id: 'essential', label: 'Boutique', price: '135K' },
              { id: 'celebration', label: 'Royal Emerald', price: '195K' },
              { id: 'royal', label: 'Imperial Gala', price: '260K' }
            ].map((tier) => (
              <button
                key={tier.id}
                type="button"
                onClick={() => setSelectedTier(tier.id)}
                className={`py-2 px-1 text-center rounded-lg transition-all cursor-pointer ${
                  selectedTier === tier.id
                    ? 'bg-[#241e17] text-[#dfc086] font-bold shadow-sm border border-[#382d22]'
                    : 'text-[#8e8377] hover:text-[#d6cebf]'
                }`}
              >
                <div className="text-xs">{tier.label}</div>
                <div className="text-[10px] text-[#dfc086]">{tier.price}</div>
              </button>
            ))}
          </div>

          {/* Add-ons Checklist */}
          <div className="space-y-2 mb-4">
            <span className="text-[11px] font-semibold text-[#a89d91] block">Custom Inclusions & Permits:</span>
            {[
              { id: 'valet', label: 'Valet Service (120 vehicles)', price: '12,000 EGP' },
              { id: 'generator', label: 'Redundant Power Auto-Switch', price: '8,000 EGP' },
              { id: 'fireworks', label: 'Cold Firework & Sparkular Permit', price: '18,000 EGP' },
              { id: 'drone', label: 'Licensed Aerial Cinematography', price: '15,000 EGP' }
            ].map((addon) => {
              const isChecked = activeAddons.includes(addon.id)
              return (
                <button
                  key={addon.id}
                  type="button"
                  onClick={() => toggleAddon(addon.id)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs transition-colors cursor-pointer ${
                    isChecked
                      ? 'bg-[#241e17]/80 border-[#dfc086]/50 text-[#f7f3eb]'
                      : 'bg-[#181513]/40 border-[#27221e] text-[#8e8377]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                      isChecked ? 'bg-[#dfc086] border-[#dfc086] text-[#0e0d0c]' : 'border-[#382d22]'
                    }`}>
                      {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </span>
                    <span>{addon.label}</span>
                  </div>
                  <span className="font-mono text-[11px] text-[#dfc086]">+{addon.price}</span>
                </button>
              )
            })}
          </div>

          <button
            type="button"
            onClick={() => onOpenInquiry?.({ ...currentStop, calculatedEstimate })}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#dfc086] to-[#ceab68] text-[#0e0d0c] font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-[#ceab68]/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Lock In This Guide Quote Snapshot</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </SpotlightCard>
      )}

      {/* STOP 4: Date Availability & Velocity Matrix */}
      {currentStop.id === 'terrace' && (
        <SpotlightCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#dfc086] uppercase tracking-wider">
              <Calendar className="w-4 h-4 text-[#dfc086]" />
              <span>Certified Availability Calendar</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono">Live Sync</span>
          </div>

          <div className="space-y-2.5 mb-5">
            {[
              { date: 'Friday, 14 Nov 2026', session: 'Evening Reception', status: 'Available', color: 'emerald' },
              { date: 'Thursday, 31 Dec 2026', session: 'New Year Eve Gala', status: 'Blocked (Annual Gala)', color: 'rose' },
              { date: 'Friday, 16 Apr 2027', session: 'Spring Blossom Evening', status: 'Available (Hold 48h)', color: 'amber' },
            ].map((slot, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-xl bg-[#181513]/80 border border-[#27221e] text-xs"
              >
                <div>
                  <div className="font-bold text-[#f7f3eb]">{slot.date}</div>
                  <div className="text-[10px] text-[#a89d91]">{slot.session}</div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                  slot.color === 'emerald'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : slot.color === 'rose'
                    ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                    : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                }`}>
                  {slot.status}
                </span>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-[#8e8377] flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#dfc086] shrink-0" />
            <span>Blocks are stamped with operator signature to prevent duplicate commitments.</span>
          </p>
        </SpotlightCard>
      )}

      {/* STOP 5: Direct Owner Inquiries & Private Conversation */}
      {currentStop.id === 'suite' && (
        <SpotlightCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#dfc086] uppercase tracking-wider">
              <MessageSquare className="w-4 h-4 text-[#dfc086]" />
              <span>Direct Concierge Communication</span>
            </div>
            <span className="text-[10px] text-[#dfc086] font-mono">Zero Broker Fees</span>
          </div>

          <div className="space-y-3 p-3.5 rounded-xl bg-[#181513] border border-[#27221e] mb-5 text-xs">
            <div className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-full bg-[#241e17] text-[#dfc086] flex items-center justify-center font-bold text-[10px] shrink-0">
                W
              </div>
              <div className="p-2.5 rounded-xl bg-[#241e17] text-[#f7f3eb] text-xs">
                Congratulations! When you inquire through Weddo, your selected package rate and guest count are snapshot-locked. No surprise inflation on the contract day.
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpenInquiry?.(currentStop)}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#dfc086] to-[#ceab68] text-[#0e0d0c] font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-[#ceab68]/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Draft Direct Venue Inquiry</span>
          </button>
        </SpotlightCard>
      )}
    </div>
  )
}

export default WalkthroughFeatureOverlay
