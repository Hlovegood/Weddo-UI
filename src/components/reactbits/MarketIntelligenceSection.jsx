import React, { useState } from 'react'
import { SpotlightCard } from './SpotlightCard'
import { ShinyText } from './ShinyText'
import { TrendingUp, Clock, BarChart3, ShieldCheck, Calendar, Sparkles, MapPin } from 'lucide-react'

const seasonalData = [
  { month: 'Jan', avgPrice: 155000, demand: 'Medium', note: 'Winter Indoor Ballroom Season' },
  { month: 'Feb', avgPrice: 165000, demand: 'High', note: 'Valentine & Winter Gala Peak' },
  { month: 'Mar', avgPrice: 145000, demand: 'Medium', note: 'Ramadan Transition (Select Venues)' },
  { month: 'Apr', avgPrice: 195000, demand: 'Peak', note: 'Spring Open-Air Season Begins' },
  { month: 'May', avgPrice: 215000, demand: 'Very High', note: 'Prime Garden & Lawn Weather' },
  { month: 'Jun', avgPrice: 175000, demand: 'Medium', note: 'Early Summer Breeze' },
  { month: 'Jul', avgPrice: 135000, demand: 'Moderate', note: 'Summer Nile Evening Deals' },
  { month: 'Aug', avgPrice: 125000, demand: 'Moderate', note: 'Summer Off-Peak Best Pricing' },
  { month: 'Sep', avgPrice: 185000, demand: 'High', note: 'Late Summer Garden Re-Opening' },
  { month: 'Oct', avgPrice: 245000, demand: 'Super Peak', note: 'Cairo Wedding Season Zenith' },
  { month: 'Nov', avgPrice: 235000, demand: 'Super Peak', note: 'Nile & New Cairo Peak Lead Time' },
  { month: 'Dec', avgPrice: 220000, demand: 'High', note: 'New Year Eve & Holiday Galas' }
]

export function MarketIntelligenceSection({ className = '' }) {
  const [hoveredIndex, setHoveredIndex] = useState(9) // Default to October peak
  const activeMonth = seasonalData[hoveredIndex] || seasonalData[9]

  // Chart coordinate mapping
  const width = 640
  const height = 180
  const paddingX = 30
  const paddingY = 25
  const minPrice = 110000
  const maxPrice = 260000

  const points = seasonalData.map((d, i) => {
    const x = paddingX + (i / (seasonalData.length - 1)) * (width - 2 * paddingX)
    const normalizedPrice = (d.avgPrice - minPrice) / (maxPrice - minPrice)
    const y = height - paddingY - normalizedPrice * (height - 2 * paddingY)
    return { x, y, data: d, index: i }
  })

  const pathD = points.reduce((acc, pt, i) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`
    const prev = points[i - 1]
    const cx1 = prev.x + (pt.x - prev.x) / 2
    const cy1 = prev.y
    const cx2 = prev.x + (pt.x - prev.x) / 2
    const cy2 = pt.y
    return `${acc} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${pt.x} ${pt.y}`
  }, '')

  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`

  return (
    <section className={`py-20 px-4 max-w-7xl mx-auto border-t border-[#231e1a] ${className}`} id="market-intelligence">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#dfc086]/10 border border-[#dfc086]/25 text-[#dfc086] text-xs font-semibold mb-3">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Cairo Wedding Market Intelligence Index</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#f7f3eb]">
            Market Velocity & Seasonal Curves
          </h2>
          <p className="text-[#a89d91] text-sm sm:text-base mt-2 max-w-2xl">
            Live analytics on seasonal package price fluctuations, booking lead-times, and calendar velocity across Cairo’s premier wedding zones.
          </p>
        </div>

        {/* Live Index Badge */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#141211] border border-[#27221e] text-xs text-[#d6cebf]">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span>2026/2027 Season Verified Records</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Interactive SVG Seasonal Curve */}
        <div className="lg:col-span-2">
          <SpotlightCard className="p-6 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#dfc086] uppercase tracking-wider">
                  <TrendingUp className="w-4 h-4 text-[#dfc086]" />
                  <span>Annual Cairo Guide Price Curve (EGP)</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#a89d91]">Selected Month: <b>{activeMonth.month}</b></span>
                  <span className="text-sm font-bold font-serif text-[#dfc086] block">
                    {activeMonth.avgPrice.toLocaleString()} EGP avg
                  </span>
                </div>
              </div>

              {/* Responsive SVG Chart */}
              <div className="relative w-full aspect-[640/180] my-4">
                <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#dfc086" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#dfc086" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Shaded Area */}
                  <path d={areaD} fill="url(#curveGradient)" />

                  {/* Bezier Line */}
                  <path d={pathD} fill="none" stroke="#dfc086" strokeWidth="2.5" strokeLinecap="round" />

                  {/* Interactive Nodes */}
                  {points.map((pt) => {
                    const isHovered = pt.index === hoveredIndex
                    return (
                      <g
                        key={pt.index}
                        onMouseEnter={() => setHoveredIndex(pt.index)}
                        className="cursor-pointer"
                      >
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={isHovered ? 7 : 4}
                          fill={isHovered ? '#fff' : '#dfc086'}
                          stroke="#141211"
                          strokeWidth="2"
                          className="transition-all duration-150"
                        />
                      </g>
                    )
                  })}
                </svg>
              </div>

              {/* Month Pills */}
              <div className="grid grid-cols-12 gap-1 text-center font-mono text-[10px] text-[#8e8377] pt-2 border-t border-[#27221e]">
                {seasonalData.map((d, i) => (
                  <button
                    key={d.month}
                    type="button"
                    onClick={() => setHoveredIndex(i)}
                    className={`py-1 rounded transition-colors cursor-pointer ${
                      i === hoveredIndex ? 'bg-[#dfc086] text-[#0e0d0c] font-bold' : 'hover:text-[#f7f3eb]'
                    }`}
                  >
                    {d.month}
                  </button>
                ))}
              </div>
            </div>

            {/* Note box */}
            <div className="mt-4 p-3 rounded-xl bg-[#181513] border border-[#2e261f] flex items-center justify-between text-xs">
              <span className="text-[#a89d91]">Season Insight:</span>
              <span className="text-[#dfc086] font-medium">{activeMonth.note}</span>
            </div>
          </SpotlightCard>
        </div>

        {/* Cairo Area Velocity Breakdown */}
        <div className="space-y-4">
          <SpotlightCard className="p-6 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#dfc086] uppercase tracking-wider">
              <Clock className="w-4 h-4 text-[#dfc086]" />
              <span>Area Booking Lead-Times</span>
            </div>

            <div className="space-y-3 text-xs">
              {[
                { area: 'Garden City & Nile Corniche', lead: '8 – 12 Months', note: 'Strict water taxi & terrace demand' },
                { area: 'Zamalek Island Waterfront', lead: '7 – 10 Months', note: 'High private reception velocity' },
                { area: 'New Cairo Open-Air Lawns', lead: '5 – 8 Months', note: 'Peak spring & autumn open-air bookings' },
                { area: 'Heliopolis Heritage Palaces', lead: '6 – 9 Months', note: 'Limited historical estate calendar' },
              ].map((item, i) => (
                <div key={i} className="p-3 rounded-xl bg-[#181513] border border-[#27221e] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#f7f3eb]">{item.area}</span>
                    <span className="text-[#dfc086] font-mono font-bold text-[11px]">{item.lead}</span>
                  </div>
                  <div className="text-[10px] text-[#8e8377]">{item.note}</div>
                </div>
              ))}
            </div>
          </SpotlightCard>

          <SpotlightCard className="p-5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#241e17] text-[#dfc086] flex items-center justify-center shrink-0 border border-[#382d22]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-xs">
              <div className="font-bold text-[#f7f3eb]">Price-Lock Guarantee</div>
              <div className="text-[10px] text-[#8e8377]">
                Quotes submitted on Weddo are immutable snapshots to protect your wedding budget.
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  )
}

export default MarketIntelligenceSection
