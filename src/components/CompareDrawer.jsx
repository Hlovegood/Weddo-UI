import React from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { GradientButton } from './kokonutui/GradientButton'
import { X, Scale, Users, Trash2, Send, Check } from 'lucide-react'

export function CompareDrawer({
  isOpen,
  onClose,
  venues,
  lang = 'en',
  t,
  onRemoveCompare,
  onOpenInquiry
}) {
  if (!isOpen || venues.length === 0) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0a0908]/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-5xl bg-[#141211] border border-[#27221e] rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-6 border-b border-[#27221e] flex items-center justify-between bg-[#0d0c0b]/70">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#241e17] text-[#dfc086] border border-[#382d22]">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-[#f7f3eb]">{t.compareTitle}</h3>
                <p className="text-xs text-[#a89d91]">{t.compareSubtitle}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2.5 rounded-full bg-[#181513] text-[#d6cebf] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Table Container (Horizontal scroll on mobile) */}
          <div className="p-6 overflow-x-auto flex-1">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#27221e]">
                  <th className="py-4 px-4 text-[#a89d91] font-semibold uppercase tracking-wider w-1/4">
                    {lang === 'ar' ? 'المعيار' : 'Metric'}
                  </th>
                  {venues.map((venue) => (
                    <th key={venue.id} className="py-4 px-4 align-top">
                      <div className="space-y-2">
                        <div className="relative h-28 w-full rounded-xl overflow-hidden bg-stone-950">
                          <img
                            src={venue.coverPhoto}
                            alt={lang === 'ar' ? venue.name.ar : venue.name.en}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="font-serif font-bold text-[#f7f3eb] text-sm">
                            {lang === 'ar' ? venue.name.ar : venue.name.en}
                          </h4>
                          <button
                            type="button"
                            onClick={() => onRemoveCompare(venue.id)}
                            title={t.removeCompare}
                            className="text-[#73695e] hover:text-rose-400 p-1 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-[#27221e]">
                {/* Area Row */}
                <tr>
                  <td className="py-3 px-4 font-semibold text-[#a89d91]">{t.metricArea}</td>
                  {venues.map((v) => (
                    <td key={v.id} className="py-3 px-4 text-[#d6cebf]">
                      {lang === 'ar' ? v.address.ar : v.address.en}
                    </td>
                  ))}
                </tr>

                {/* Maximum Capacity */}
                <tr>
                  <td className="py-3 px-4 font-semibold text-[#a89d91]">{t.metricMaxCapacity}</td>
                  {venues.map((v) => {
                    const cap = Math.max(...v.spaces.map((s) => s.capacity))
                    return (
                      <td key={v.id} className="py-3 px-4 text-[#dfc086] font-bold font-mono text-sm">
                        {cap} {t.guests}
                      </td>
                    )
                  })}
                </tr>

                {/* Starting Rate */}
                <tr>
                  <td className="py-3 px-4 font-semibold text-[#a89d91]">{t.metricStartingRate}</td>
                  {venues.map((v) => {
                    const start = Math.min(...v.packages.map((p) => p.price))
                    return (
                      <td key={v.id} className="py-3 px-4 text-[#faecd2] font-bold font-serif text-sm">
                        {start.toLocaleString()} EGP
                      </td>
                    )
                  })}
                </tr>

                {/* Named Spaces */}
                <tr>
                  <td className="py-3 px-4 font-semibold text-[#a89d91]">{t.metricSpaces}</td>
                  {venues.map((v) => (
                    <td key={v.id} className="py-3 px-4 text-[#d6cebf] space-y-1">
                      {v.spaces.map((s) => (
                        <div key={s.id} className="flex items-center justify-between text-[11px] bg-[#181513] border border-[#28221d] px-2 py-1 rounded">
                          <span>{lang === 'ar' ? s.name.ar : s.name.en}</span>
                          <span className="text-[#dfc086] font-mono">({s.capacity})</span>
                        </div>
                      ))}
                    </td>
                  ))}
                </tr>

                {/* Guide Packages */}
                <tr>
                  <td className="py-3 px-4 font-semibold text-[#a89d91]">{t.metricPackages}</td>
                  {venues.map((v) => (
                    <td key={v.id} className="py-3 px-4 text-[#d6cebf] space-y-1">
                      {v.packages.map((p) => (
                        <div key={p.id} className="flex items-center justify-between text-[11px] bg-[#181513] border border-[#28221d] px-2 py-1 rounded">
                          <span>{lang === 'ar' ? p.name.ar : p.name.en}</span>
                          <span className="text-[#faecd2] font-semibold">{p.price.toLocaleString()} EGP</span>
                        </div>
                      ))}
                    </td>
                  ))}
                </tr>

                {/* Key Amenities */}
                <tr>
                  <td className="py-3 px-4 font-semibold text-[#a89d91]">{t.metricAmenities}</td>
                  {venues.map((v) => (
                    <td key={v.id} className="py-3 px-4 text-[#d6cebf]">
                      <div className="flex flex-wrap gap-1">
                        {v.amenities.map((a) => (
                          <span key={a} className="inline-block text-[10px] bg-[#1f1b18] text-[#dfc086] border border-[#332a22] px-2 py-0.5 rounded">
                            {t[`amenity_${a}`] || a}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Direct Action Row */}
                <tr>
                  <td className="py-4 px-4 font-semibold text-stone-400"></td>
                  {venues.map((v) => (
                    <td key={v.id} className="py-4 px-4">
                      <GradientButton
                        size="sm"
                        variant="primary"
                        icon={Send}
                        className="w-full text-xs"
                        onClick={() => {
                          onClose()
                          onOpenInquiry(v)
                        }}
                      >
                        {t.inquireNow}
                      </GradientButton>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
export default CompareDrawer
