import React from 'react'
import { X, Scale, Users, Check, Trash2, Send, DollarSign, Building } from 'lucide-react'
import { SHOWCASE_VENUES } from './CuratedVenuesShowcase'

export function InteractiveCompareDrawer({
  isOpen,
  onClose,
  compareIds = [],
  onRemoveCompare,
  onOpenInquiry
}) {
  if (!isOpen) return null

  const venues = SHOWCASE_VENUES.filter((v) => compareIds.includes(v.id))

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#08090b]/85 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-5xl rounded-3xl bg-[#141211] border border-[#dfc086]/30 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-[#27221e] flex items-center justify-between bg-[#0e0d0c]/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#241e17] text-[#dfc086] border border-[#382d22]">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-[#f7f3eb]">
                Side-by-Side Venue Comparison
              </h3>
              <p className="text-xs text-[#a89d91]">
                Compare authentic capacities, guide pricing, and venue policies across Cairo.
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

        {/* Comparison Table */}
        <div className="p-6 overflow-x-auto flex-1">
          {venues.length === 0 ? (
            <div className="py-12 text-center text-xs text-[#8e8377]">
              No venues selected for comparison. Click "Compare" on venue cards to add up to 3 venues.
            </div>
          ) : (
            <div className="min-w-[680px] grid grid-cols-4 gap-4">
              {/* Feature Labels Column */}
              <div className="space-y-4 pt-32 text-xs font-semibold text-[#a89d91]">
                <div className="py-2.5 border-b border-[#27221e]">Primary Area</div>
                <div className="py-2.5 border-b border-[#27221e]">Venue Category</div>
                <div className="py-2.5 border-b border-[#27221e]">Maximum Capacity</div>
                <div className="py-2.5 border-b border-[#27221e]">Starting Guide Package</div>
                <div className="py-2.5 border-b border-[#27221e]">Curfew / Session</div>
                <div className="py-2.5 border-b border-[#27221e]">Dedicated Bridal Suite</div>
                <div className="py-2.5 border-b border-[#27221e]">Valet Parking</div>
                <div className="py-2.5">Action</div>
              </div>

              {/* Venue Columns */}
              {venues.map((venue) => (
                <div key={venue.id} className="space-y-4 rounded-2xl bg-[#181513]/60 border border-[#27221e] p-4 text-xs">
                  {/* Photo & Header */}
                  <div>
                    <div className="relative h-24 w-full rounded-xl overflow-hidden mb-2 bg-stone-900">
                      <img src={venue.image} alt={venue.name} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => onRemoveCompare(venue.id)}
                        className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/60 text-white hover:text-rose-400 transition-colors"
                        title="Remove from comparison"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="font-serif font-bold text-sm text-[#f7f3eb] truncate">{venue.name}</div>
                  </div>

                  <div className="py-2.5 border-b border-[#27221e] text-[#d6cebf] font-medium">{venue.area}</div>
                  <div className="py-2.5 border-b border-[#27221e] text-[#d6cebf]">{venue.type}</div>
                  <div className="py-2.5 border-b border-[#27221e] font-bold text-[#dfc086]">{venue.capacity}</div>
                  <div className="py-2.5 border-b border-[#27221e] font-mono text-[#dfc086]">{venue.price}</div>
                  <div className="py-2.5 border-b border-[#27221e] text-[#d6cebf]">02:00 AM (Music till 01:30 AM)</div>
                  <div className="py-2.5 border-b border-[#27221e] text-emerald-400 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Included
                  </div>
                  <div className="py-2.5 border-b border-[#27221e] text-emerald-400 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> 120 Vehicles
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        onClose()
                        onOpenInquiry(venue)
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-[#dfc086] to-[#ceab68] text-[#0e0d0c] font-bold text-xs flex items-center justify-center gap-1 hover:scale-[1.02] transition-transform cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Inquire</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default InteractiveCompareDrawer
