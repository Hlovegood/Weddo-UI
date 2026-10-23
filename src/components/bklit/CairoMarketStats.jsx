import React, { useState } from 'react'
import { cairoMarketSeasonalData, marketVelocityByArea } from '../../data/venues'
import { TrendingUp, Clock, Calendar, BarChart3, ShieldCheck, Info } from 'lucide-react'

export function CairoMarketStats({ lang = 'en' }) {
  const [hoveredIndex, setHoveredIndex] = useState(9) // Default to October (Peak Nile/Autumn season)
  const activeData = cairoMarketSeasonalData[hoveredIndex] || cairoMarketSeasonalData[9]

  // Chart coordinate calculations
  const maxPrice = 250000
  const minPrice = 110000
  const width = 640
  const height = 220
  const paddingX = 40
  const paddingY = 30

  const points = cairoMarketSeasonalData.map((d, i) => {
    const x = paddingX + (i / (cairoMarketSeasonalData.length - 1)) * (width - 2 * paddingX)
    const normalizedPrice = (d.avgPrice - minPrice) / (maxPrice - minPrice)
    const y = height - paddingY - normalizedPrice * (height - 2 * paddingY)
    return { x, y, data: d, index: i }
  })

  // SVG path generation
  const pathD = points.reduce((acc, pt, i) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`
    // Smooth bezier curve
    const prev = points[i - 1]
    const cx1 = prev.x + (pt.x - prev.x) / 2
    const cy1 = prev.y
    const cx2 = prev.x + (pt.x - prev.x) / 2
    const cy2 = pt.y
    return `${acc} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${pt.x} ${pt.y}`
  }, '')

  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`

  return (
    <section className="relative py-16 px-4 max-w-7xl mx-auto" id="market-intelligence">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#dfc086]/25 bg-[#dfc086]/10 text-[#dfc086] text-xs font-medium mb-3">
            <BarChart3 className="w-3.5 h-3.5 text-[#dfc086]" />
            <span>@bklit Cairo Wedding Market Index</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#fdfbf7]">
            {lang === 'ar' ? 'مؤشرات سوق قاعات وأفراح القاهرة' : 'Cairo Wedding Market Intelligence'}
          </h2>
          <p className="text-[#a89d91] text-sm sm:text-base mt-2 max-w-2xl">
            {lang === 'ar'
              ? 'بيانات تحليلية حقيقية لمواسم الزفاف، وتذبذب أسعار الباقات الاسترشادية وسرعة نفاد التواريخ في النيل والتجمع ومصر الجديدة.'
              : 'Actionable data on seasonal pricing trends, booking demand peaks, and venue calendar velocity across Cairo’s premier wedding destinations.'}
          </p>
        </div>

        {/* Live Indicator Pill */}
        <div className="flex items-center gap-2 bg-[#141211] border border-[#27221e] px-4 py-2 rounded-xl text-xs text-[#d6cebf] self-start md:self-auto shadow-inner">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span>{lang === 'ar' ? 'تحديث حي: موسم خريف 2026/2027' : 'Live Index: 2026/2027 Season'}</span>
        </div>
      </div>

      {/* KPI Stats Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#151312]/85 border border-[#27221e] rounded-2xl p-5 backdrop-blur-sm hover:border-[#dfc086]/30 transition-all">
          <div className="flex items-center justify-between text-[#a89d91] mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">
              {lang === 'ar' ? 'ذروة موسم الخريف' : 'Autumn Peak Rate'}
            </span>
            <TrendingUp className="w-4 h-4 text-[#dfc086]" />
          </div>
          <div className="text-2xl font-bold font-serif text-[#faecd2]">235,000 EGP</div>
          <div className="text-xs text-emerald-400/90 mt-1 flex items-center gap-1">
            <span>+18.4%</span>
            <span className="text-[#8e8377]">{lang === 'ar' ? 'عن أسعار الصيف' : 'vs summer low'}</span>
          </div>
        </div>

        <div className="bg-[#151312]/85 border border-[#27221e] rounded-2xl p-5 backdrop-blur-sm hover:border-[#dfc086]/30 transition-all">
          <div className="flex items-center justify-between text-[#a89d91] mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">
              {lang === 'ar' ? 'سرعة الرد والاستجابة' : 'Avg Coordinator Reply'}
            </span>
            <Clock className="w-4 h-4 text-[#dfc086]" />
          </div>
          <div className="text-2xl font-bold font-serif text-[#f7f3eb]">3.2 {lang === 'ar' ? 'ساعات' : 'Hours'}</div>
          <div className="text-xs text-[#8e8377] mt-1">
            {lang === 'ar' ? 'للطلبات والاستفسارات المكتملة' : 'for structured inquiries'}
          </div>
        </div>

        <div className="bg-[#151312]/85 border border-[#27221e] rounded-2xl p-5 backdrop-blur-sm hover:border-[#dfc086]/30 transition-all">
          <div className="flex items-center justify-between text-[#a89d91] mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">
              {lang === 'ar' ? 'فترة الحجز المسبق' : 'Advance Lead Time'}
            </span>
            <Calendar className="w-4 h-4 text-[#dfc086]" />
          </div>
          <div className="text-2xl font-bold font-serif text-[#f7f3eb]">5.8 {lang === 'ar' ? 'أشهر' : 'Months'}</div>
          <div className="text-xs text-[#8e8377] mt-1">
            {lang === 'ar' ? 'لتأمين تواريخ عطلات نهاية الأسبوع' : 'to secure prime weekend dates'}
          </div>
        </div>

        <div className="bg-[#151312]/85 border border-[#27221e] rounded-2xl p-5 backdrop-blur-sm hover:border-[#dfc086]/30 transition-all">
          <div className="flex items-center justify-between text-[#a89d91] mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">
              {lang === 'ar' ? 'موثوقية الأسعار' : 'Direct Guide Pricing'}
            </span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-serif text-emerald-400">100% {lang === 'ar' ? 'شفاف' : 'Direct'}</div>
          <div className="text-xs text-[#8e8377] mt-1">
            {lang === 'ar' ? 'بدون عمولات خفية للوسطاء' : 'no hidden middleman fees'}
          </div>
        </div>
      </div>

      {/* Main Chart Card + Scrubber (Bklit UI Area Chart @bklit/area-chart) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#151312]/90 border border-[#28221d] rounded-2xl p-6 relative overflow-hidden backdrop-blur-md">
          {/* Active Data Header Scrubber Readout */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-[#28221d]">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#dfc086]">
                {lang === 'ar' ? 'الشهر المختار' : 'Scrubber Selected'}
              </span>
              <div className="text-2xl font-bold font-serif text-[#f7f3eb] flex items-center gap-3">
                <span>{lang === 'ar' ? activeData.monthAr : activeData.month}</span>
                <span className="text-sm font-sans font-normal text-[#8e8377]">({activeData.season})</span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs text-[#8e8377] uppercase tracking-wider">
                {lang === 'ar' ? 'متوسط سعر الباقة' : 'Average Package Rate'}
              </span>
              <div className="text-2xl font-bold text-[#faecd2] font-serif">
                {activeData.avgPrice.toLocaleString()} EGP
              </div>
            </div>

            <div className="bg-[#1e1a17] border border-[#332a22] px-3.5 py-1.5 rounded-xl text-xs">
              <span className="text-[#a89d91]">{lang === 'ar' ? 'مؤشر الطلب: ' : 'Demand Index: '}</span>
              <span className="font-bold text-[#dfc086]">{activeData.demand}%</span>
            </div>
          </div>

          {/* SVG Area Chart with interactive points */}
          <div className="relative w-full overflow-x-auto">
            <svg
              viewBox={`0 0 ${width} ${height}`}
              className="w-full h-52 sm:h-64 overflow-visible select-none"
            >
              <defs>
                <linearGradient id="bklitAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#dfc086" stopOpacity="0.32" />
                  <stop offset="60%" stopColor="#dfc086" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#dfc086" stopOpacity="0.0" />
                </linearGradient>
                <pattern id="bklitGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
                </pattern>
              </defs>

              {/* Grid Background */}
              <rect width={width} height={height} fill="url(#bklitGrid)" />

              {/* Horizontal Reference Lines */}
              <line x1={paddingX} y1={paddingY} x2={width - paddingX} y2={paddingY} stroke="rgba(255, 255, 255, 0.06)" strokeDasharray="3 3" />
              <line x1={paddingX} y1={height / 2} x2={width - paddingX} y2={height / 2} stroke="rgba(255, 255, 255, 0.06)" strokeDasharray="3 3" />
              <line x1={paddingX} y1={height - paddingY} x2={width - paddingX} y2={height - paddingY} stroke="rgba(255, 255, 255, 0.12)" />

              {/* Area Path */}
              <path d={areaD} fill="url(#bklitAreaGrad)" />

              {/* Stroke Line */}
              <path
                d={pathD}
                fill="none"
                stroke="#dfc086"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="drop-shadow-[0_0_8px_rgba(223,192,134,0.30)]"
              />

              {/* Active Scrubber Vertical Bar */}
              {points[hoveredIndex] && (
                <line
                  x1={points[hoveredIndex].x}
                  y1={paddingY}
                  x2={points[hoveredIndex].x}
                  y2={height - paddingY}
                  stroke="#dfc086"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
              )}

              {/* Interactive Data Nodes */}
              {points.map((pt, idx) => {
                const isHovered = hoveredIndex === idx
                return (
                  <g
                    key={idx}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onClick={() => setHoveredIndex(idx)}
                  >
                    {/* Hover hotspot */}
                    <circle cx={pt.x} cy={pt.y} r="18" fill="transparent" />
                    {/* Visual node */}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isHovered ? '6' : '3.5'}
                      fill={isHovered ? '#ffffff' : '#dfc086'}
                      stroke="#141211"
                      strokeWidth="2"
                      className="transition-all duration-150"
                    />
                    {/* Month Label */}
                    <text
                      x={pt.x}
                      y={height - 8}
                      textAnchor="middle"
                      fontSize="10"
                      fill={isHovered ? '#dfc086' : '#73695e'}
                      fontWeight={isHovered ? 'bold' : 'normal'}
                    >
                      {lang === 'ar' ? pt.data.monthAr : pt.data.month}
                    </text>
                  </g>
                )
              })}
            </svg>
          </div>

          {/* Month Highlight Callout */}
          <div className="mt-4 flex items-center gap-2.5 text-xs text-[#ebd8b7] bg-[#221c17]/60 border border-[#362b21] p-3 rounded-xl">
            <Info className="w-4 h-4 text-[#dfc086] shrink-0" />
            <span>
              <strong>{lang === 'ar' ? 'توصية الخبراء: ' : 'Cairo Seasonal Insight: '}</strong>
              {activeData.highlight}
            </span>
          </div>
        </div>

        {/* Cairo Area Velocity Index */}
        <div className="bg-[#151312]/90 border border-[#28221d] rounded-2xl p-6 flex flex-col justify-between backdrop-blur-md">
          <div>
            <h3 className="text-lg font-serif font-bold text-[#f7f3eb] mb-2">
              {lang === 'ar' ? 'مؤشر سرعة حجز المناطق' : 'Cairo Area Booking Velocity'}
            </h3>
            <p className="text-xs text-[#8e8377] mb-6">
              {lang === 'ar'
                ? 'نسبة نفاد تواريخ عطلات نهاية الأسبوع خلال مواسم الذروة.'
                : 'Weekend date conflict rate and booking pace over the current calendar year.'}
            </p>

            <div className="space-y-5">
              {marketVelocityByArea.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-[#dcd5cc]">
                      {lang === 'ar' ? item.areaAr : item.area}
                    </span>
                    <span className="font-bold text-[#dfc086]">{item.velocity}%</span>
                  </div>
                  {/* Progress Track */}
                  <div className="h-2 w-full bg-[#201c19] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#dfc086] via-[#ceab68] to-[#be9850] rounded-full transition-all duration-500"
                      style={{ width: `${item.velocity}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#73695e]">
                    <span>{item.priceTier}</span>
                    <span>{item.avgDaysAdvance} {lang === 'ar' ? 'يوم مقدماً' : 'days ahead'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-stone-800/80 text-xs text-stone-400">
            {lang === 'ar'
              ? 'يتم تحديث المؤشرات دورياً وفقاً لاستفسارات الزوار وحجوزات منسقي القاعات المعتمدين.'
              : 'Aggregated anonymously from verified inquiry dates and space availability updates across Cairo.'}
          </div>
        </div>
      </div>
    </section>
  )
}
export default CairoMarketStats
