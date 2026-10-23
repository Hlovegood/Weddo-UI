import React, { useState } from 'react'
import { SpotlightCard } from './SpotlightCard'
import { TiltCard } from './TiltCard'
import { ShinyText } from './ShinyText'
import { 
  Sparkles, 
  MapPin, 
  Users, 
  Check, 
  ArrowRight, 
  Scale, 
  Heart, 
  Eye, 
  Send,
  Building
} from 'lucide-react'

export const SHOWCASE_VENUES = [
  {
    id: 'olive-garden',
    name: 'The Olive Garden Estate',
    nameAr: 'حديقة الزيتون الملكية',
    area: 'New Cairo / 90th St.',
    areaAr: 'القاهرة الجديدة / شارع التسعين',
    type: 'Open-Air Estate & Lawn',
    image: '/venue_olive_garden.jpg',
    capacity: 'Up to 450 Guests',
    price: 'From 135,000 EGP',
    rating: 4.92,
    badge: 'Most Popular Garden',
    highlights: ['Royal Olive Lawn (450 cap)', 'Andalusian Paved Court (140 cap)', 'Valet Parking for 120 Vehicles'],
    description: 'An exclusive open-air estate enveloped in lush olive groves, candlelit fountain promenades, and private bridal villas.'
  },
  {
    id: 'nile-salon',
    name: 'Nile Grand Panorama & Salon',
    nameAr: 'صالون النيل البانورامي والقاعة الكبرى',
    area: 'Garden City / Nile Corniche',
    areaAr: 'جاردن سيتي / كورنيش النيل',
    type: 'Waterfront Ballroom',
    image: '/venue_nile_salon.jpg',
    capacity: 'Up to 650 Guests',
    price: 'From 165,000 EGP',
    rating: 4.98,
    badge: 'Signature Nile View',
    highlights: ['Imperial Ballroom (650 cap)', 'River Breeze Terrace (180 cap)', 'Private VIP Yacht Dock'],
    description: 'Panoramic floor-to-ceiling river vistas of the eternal Nile river with grand crystal chandeliers and private docking pier.'
  },
  {
    id: 'azure-court',
    name: 'Azure Heritage Palace & Court',
    nameAr: 'ساحة أزور وقصر هيليوبوليس التراثي',
    area: 'Heliopolis / Korba',
    areaAr: 'مصر الجديدة / الكوربة التاريخية',
    type: 'Heritage Palace & Arches',
    image: '/venue_azure_court.jpg',
    capacity: 'Up to 280 Guests',
    price: 'From 150,000 EGP',
    rating: 4.88,
    badge: 'Belgian Revival Heritage',
    highlights: ['Sandstone Arches Court (280 cap)', 'Private Korba Entrance', 'Hand-Painted Ceiling Frescoes'],
    description: 'Romantic Belgian revival palace in historic Korba with warm honey sandstone arches and secluded jasmine courtyards.'
  }
]

export function CuratedVenuesShowcase({
  onSelectVenue,
  onOpenInquiry,
  className = ''
}) {
  const [shortlisted, setShortlisted] = useState(['olive-garden'])
  const [comparing, setComparing] = useState(['olive-garden', 'nile-salon'])
  const [activeTab, setActiveTab] = useState('all')

  const toggleShortlist = (id) => {
    setShortlisted((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const toggleCompare = (id) => {
    setComparing((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : prev.length < 3 ? [...prev, id] : prev
    )
  }

  return (
    <section className={`py-20 px-4 max-w-7xl mx-auto ${className}`} id="curated-venues">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#dfc086]/10 border border-[#dfc086]/25 text-[#dfc086] text-xs font-semibold mb-3">
            <Building className="w-3.5 h-3.5" />
            <span>Curated Cairo Venue Collection</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#f7f3eb]">
            Cairo’s Authenticated Sanctuaries
          </h2>
          <p className="text-[#a89d91] text-sm sm:text-base mt-2 max-w-2xl">
            Direct space capacity records, certified guide packages, and honest market guidance without middleman commissions.
          </p>
        </div>

        {/* Shortlist Counter Pill */}
        <div className="flex items-center gap-3">
          {comparing.length > 0 && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#241e17] border border-[#382d22] text-[#dfc086] text-xs">
              <Scale className="w-3.5 h-3.5" />
              <span>{comparing.length} / 3 in Compare</span>
            </div>
          )}

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-rose-950/40 border border-rose-800/40 text-rose-300 text-xs">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>{shortlisted.length} Shortlisted</span>
          </div>
        </div>
      </div>

      {/* Grid of 3D Tilt Spotlight Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {SHOWCASE_VENUES.map((venue) => {
          const isLiked = shortlisted.includes(venue.id)
          const isComp = comparing.includes(venue.id)

          return (
            <TiltCard key={venue.id} maxTilt={6} scale={1.01} className="h-full">
              <SpotlightCard className="h-full flex flex-col justify-between">
                <div>
                  {/* Photo Banner with Badge */}
                  <div className="relative h-60 w-full overflow-hidden rounded-t-2xl bg-stone-950 group">
                    <img
                      src={venue.image}
                      alt={venue.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141211] via-transparent to-black/30" />

                    {/* Badge */}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#141211]/85 border border-[#dfc086]/30 text-[10px] font-bold text-[#dfc086] backdrop-blur-md">
                      {venue.badge}
                    </div>

                    {/* Heart Shortlist Button */}
                    <button
                      type="button"
                      onClick={() => toggleShortlist(venue.id)}
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
                        isLiked
                          ? 'bg-rose-950/80 text-rose-400 border border-rose-700/50'
                          : 'bg-[#141211]/80 text-[#a89d91] hover:text-[#f7f3eb] border border-[#27221e]'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                    </button>

                    {/* Area & Rating */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-[#d6cebf]">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#dfc086]" />
                        <span>{venue.area}</span>
                      </span>
                      <span className="flex items-center gap-1 font-bold text-[#dfc086]">
                        ★ {venue.rating}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-serif font-bold text-[#f7f3eb] group-hover:text-[#dfc086] transition-colors">
                        {venue.name}
                      </h3>
                      <p className="text-xs text-[#a89d91] mt-1.5 leading-relaxed">
                        {venue.description}
                      </p>
                    </div>

                    {/* Key Highlights */}
                    <div className="space-y-1.5 pt-2 border-t border-[#27221e]">
                      {venue.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-[#d6cebf]">
                          <Check className="w-3.5 h-3.5 text-[#dfc086] shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Price and Capacity */}
                    <div className="flex items-center justify-between pt-3 border-t border-[#27221e]">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-[#8e8377] uppercase tracking-wider">Guide Rate</span>
                        <span className="text-sm font-bold font-serif text-[#dfc086]">{venue.price}</span>
                      </div>

                      <div className="flex flex-col text-right">
                        <span className="text-[10px] text-[#8e8377] uppercase tracking-wider">Capacity</span>
                        <span className="text-xs font-semibold text-[#f7f3eb]">{venue.capacity}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-6 pt-0 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => toggleCompare(venue.id)}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                      isComp
                        ? 'bg-[#241e17] border-[#dfc086] text-[#dfc086]'
                        : 'bg-[#181513] border-[#27221e] text-[#a89d91] hover:text-[#f7f3eb]'
                    }`}
                  >
                    <Scale className="w-3.5 h-3.5" />
                    <span>{isComp ? 'Comparing' : 'Compare'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenInquiry?.(venue)}
                    className="py-2 px-3 rounded-xl bg-gradient-to-r from-[#dfc086] to-[#ceab68] text-[#0e0d0c] text-xs font-bold flex items-center justify-center gap-1.5 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-md shadow-[#ceab68]/15"
                  >
                    <span>Inquire Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </SpotlightCard>
            </TiltCard>
          )
        })}
      </div>
    </section>
  )
}

export default CuratedVenuesShowcase
