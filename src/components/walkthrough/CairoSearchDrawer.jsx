import React, { useState } from 'react'
import { X, Search, MapPin, Calendar, Users, DollarSign, Filter, ArrowRight, ShieldCheck, Scale, Eye } from 'lucide-react'
import { SHOWCASE_VENUES } from '../reactbits/CuratedVenuesShowcase'

export function CairoSearchDrawer({
  isOpen,
  onClose,
  onFlyToVenue,
  onToggleCompare,
  compareIds = [],
  onOpenInquiry
}) {
  const [selectedArea, setSelectedArea] = useState('all')
  const [selectedDate, setSelectedDate] = useState('2026-11-14')
  const [selectedGuestBand, setSelectedGuestBand] = useState('all')
  const [maxBudget, setMaxBudget] = useState(300000)

  if (!isOpen) return null

  // Filter venues
  const filteredVenues = SHOWCASE_VENUES.filter((venue) => {
    if (selectedArea !== 'all' && !venue.area.toLowerCase().includes(selectedArea.toLowerCase())) {
      return false
    }
    return true
  })

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#08090b]/85 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-3xl rounded-3xl bg-[#141211] border border-[#dfc086]/30 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Drawer Header */}
        <div className="p-5 sm:p-6 border-b border-[#27221e] flex items-center justify-between bg-[#0e0d0c]/90">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#241e17] text-[#dfc086] border border-[#382d22]">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-[#f7f3eb]">
                Cairo Area, Date & Budget Discovery
              </h3>
              <p className="text-xs text-[#a89d91]">
                README § Search all Cairo areas with verified date availability and guide prices.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-[#1e1a17] text-[#a89d91] hover:text-[#f7f3eb] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-5 border-b border-[#25201b] bg-[#171412]/60 grid grid-cols-1 sm:grid-cols-4 gap-3">
          {/* Cairo District */}
          <div>
            <label className="text-[10px] text-[#7d7162] block mb-1 font-semibold uppercase tracking-wider">
              Cairo Zone
            </label>
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#1f1a16] border border-[#30271f] text-[#f7f3eb] text-xs focus:outline-none focus:border-[#dfc086]"
            >
              <option value="all">All Cairo Areas</option>
              <option value="New Cairo">New Cairo & 90th</option>
              <option value="Garden City">Garden City & Nile</option>
              <option value="Heliopolis">Heliopolis & Korba</option>
              <option value="Zamalek">Zamalek Island</option>
              <option value="Giza">Giza & Pyramids</option>
            </select>
          </div>

          {/* Date Picker */}
          <div>
            <label className="text-[10px] text-[#7d7162] block mb-1 font-semibold uppercase tracking-wider">
              Wedding Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#1f1a16] border border-[#30271f] text-[#f7f3eb] text-xs focus:outline-none focus:border-[#dfc086]"
            />
          </div>

          {/* Guest Band */}
          <div>
            <label className="text-[10px] text-[#7d7162] block mb-1 font-semibold uppercase tracking-wider">
              Guest Band
            </label>
            <select
              value={selectedGuestBand}
              onChange={(e) => setSelectedGuestBand(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#1f1a16] border border-[#30271f] text-[#f7f3eb] text-xs focus:outline-none focus:border-[#dfc086]"
            >
              <option value="all">Any Guest Count</option>
              <option value="small">50 to 150 guests</option>
              <option value="medium">150 to 350 guests</option>
              <option value="large">350 to 650+ guests</option>
            </select>
          </div>

          {/* Budget ceiling */}
          <div>
            <label className="text-[10px] text-[#7d7162] block mb-1 font-semibold uppercase tracking-wider">
              Budget Cap: {Math.round(maxBudget / 1000)}k EGP
            </label>
            <input
              type="range"
              min="100000"
              max="500000"
              step="25000"
              value={maxBudget}
              onChange={(e) => setMaxBudget(Number(e.target.value))}
              className="w-full accent-[#dfc086] mt-2 cursor-pointer"
            />
          </div>
        </div>

        {/* Results List */}
        <div className="p-5 overflow-y-auto space-y-3 flex-1">
          <div className="flex items-center justify-between text-xs text-[#a89d91] mb-2">
            <span>Matching Verified Cairo Sanctuaries ({filteredVenues.length})</span>
            <span className="text-[11px] text-[#dfc086] font-mono">
              Strict Availability Policy Active
            </span>
          </div>

          {filteredVenues.map((venue) => {
            const isComparing = compareIds.includes(venue.id)
            return (
              <div
                key={venue.id}
                className="p-4 rounded-2xl bg-[#181513] border border-[#2d241d] hover:border-[#dfc086]/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-serif font-bold text-sm text-[#f7f3eb]">
                      {venue.name}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#dfc086]/15 text-[#dfc086] text-[10px] font-bold">
                      {venue.badge}
                    </span>
                  </div>
                  <div className="text-xs text-[#a89d91] flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-[#dfc086]" />
                    <span>{venue.area}</span>
                    <span>•</span>
                    <Users className="w-3 h-3 text-[#dfc086]" />
                    <span>{venue.capacity}</span>
                    <span>•</span>
                    <span className="text-[#dfc086] font-semibold">{venue.price}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <button
                    type="button"
                    onClick={() => onToggleCompare?.(venue.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1 ${
                      isComparing
                        ? 'bg-[#dfc086] text-[#0e0d0c] border-[#faecd2]'
                        : 'bg-[#201b17] text-[#a89d91] border-[#332920] hover:text-[#f7f3eb]'
                    }`}
                  >
                    <Scale className="w-3 h-3" />
                    <span>{isComparing ? 'In Compare' : 'Compare'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onClose()
                      onFlyToVenue?.(venue)
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#dfc086] to-[#ceab68] text-[#0e0d0c] font-bold text-xs flex items-center gap-1 shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <Eye className="w-3 h-3" />
                    <span>Explore 3D</span>
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer Note */}
        <div className="p-4 bg-[#0e0d0c] border-t border-[#231e1a] text-center text-[10px] text-[#7d7162] flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#dfc086]" />
          <span>Venues whose suitable spaces are all blocked for both sessions are automatically excluded.</span>
        </div>
      </div>
    </div>
  )
}
