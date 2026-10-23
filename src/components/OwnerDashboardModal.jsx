import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { GradientButton } from './kokonutui/GradientButton'
import { X, Briefcase, Plus, Calendar, ShieldCheck, Lock, Check, Layers, Tag } from 'lucide-react'

export function OwnerDashboardModal({
  isOpen,
  onClose,
  venues,
  lang = 'en',
  t
}) {
  const [selectedVenue, setSelectedVenue] = useState(venues[0] || null)
  const [blockedDates, setBlockedDates] = useState([
    { date: '2026-11-14', session: 'Evening', space: 'The Royal Olive Lawn', reason: 'Private Maintenance' },
    { date: '2026-12-31', session: 'All Day', space: 'Imperial Nile Ballroom', reason: 'Annual Gala Reserved' }
  ])
  const [newBlockDate, setNewBlockDate] = useState('2026-11-20')
  const [newBlockReason, setNewBlockReason] = useState('Venue Maintenance')

  if (!isOpen) return null

  const handleAddBlock = (e) => {
    e.preventDefault()
    if (!newBlockDate) return
    setBlockedDates([
      ...blockedDates,
      {
        date: newBlockDate,
        session: 'Evening',
        space: selectedVenue?.spaces[0]?.name[lang] || selectedVenue?.spaces[0]?.name.en,
        reason: newBlockReason
      }
    ])
  }

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
          className="relative w-full max-w-4xl bg-[#141211] border border-[#27221e] rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-6 border-b border-[#27221e] flex items-center justify-between bg-[#0e0d0c]/80 shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#dfc086]/15 text-[#dfc086]">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-[#fdfbf7]">{t.ownerTitle}</h3>
                <p className="text-xs text-[#a89d91]">{t.ownerSubtitle}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2.5 rounded-full bg-[#1e1a17] text-[#a89d91] hover:text-[#fdfbf7] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
            {/* Venue Selector */}
            <div className="flex items-center gap-3">
              <label className="text-[#d6cebf] font-semibold">{lang === 'ar' ? 'القاعة التي تديرها:' : 'Managed Listing:'}</label>
              <select
                value={selectedVenue?.id}
                onChange={(e) => setSelectedVenue(venues.find((v) => v.id === e.target.value) || venues[0])}
                className="bg-[#0e0d0c] border border-[#27221e] rounded-xl px-3 py-1.5 text-[#fdfbf7] focus:outline-none focus:border-[#dfc086]/60 focus:ring-1 focus:ring-[#dfc086]/20"
              >
                {venues.map((v) => (
                  <option key={v.id} value={v.id}>
                    {lang === 'ar' ? v.name.ar : v.name.en}
                  </option>
                ))}
              </select>
            </div>

            {/* Spaces & Packages Management */}
            {selectedVenue && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Spaces List */}
                <div className="p-4 rounded-2xl bg-[#0e0d0c]/50 border border-[#27221e] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#fdfbf7] flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-[#dfc086]" />
                      <span>{t.manageSpaces}</span>
                    </span>
                    <button type="button" className="text-[#dfc086] hover:text-[#faecd2] transition-colors cursor-pointer">
                      {t.addSpace}
                    </button>
                  </div>
                  <div className="space-y-2">
                    {selectedVenue.spaces.map((space) => (
                      <div key={space.id} className="p-2.5 rounded-xl bg-[#181513] border border-[#27221e] flex items-center justify-between">
                        <div>
                          <div className="font-medium text-[#fdfbf7]">{lang === 'ar' ? space.name.ar : space.name.en}</div>
                          <div className="text-[10px] text-[#a89d91]">{lang === 'ar' ? space.type.ar : space.type.en}</div>
                        </div>
                        <span className="font-mono text-[#dfc086]">{space.capacity} {t.guests}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Packages List */}
                <div className="p-4 rounded-2xl bg-[#0e0d0c]/50 border border-[#27221e] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#fdfbf7] flex items-center gap-1.5">
                      <Tag className="w-4 h-4 text-[#dfc086]" />
                      <span>{t.managePackages}</span>
                    </span>
                    <button type="button" className="text-[#dfc086] hover:text-[#faecd2] transition-colors cursor-pointer">
                      {t.addPackage}
                    </button>
                  </div>
                  <div className="space-y-2">
                    {selectedVenue.packages.map((pkg) => (
                      <div key={pkg.id} className="p-2.5 rounded-xl bg-[#181513] border border-[#27221e] flex items-center justify-between">
                        <div>
                          <div className="font-medium text-[#fdfbf7]">{lang === 'ar' ? pkg.name.ar : pkg.name.en}</div>
                          <div className="text-[10px] text-[#a89d91]">{pkg.inclusions.length} {lang === 'ar' ? 'مشتملات معتمدة' : 'inclusions'}</div>
                        </div>
                        <span className="font-serif font-bold text-[#dfc086]">{pkg.price.toLocaleString()} EGP</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Date Blocking Tool (from README.md Manage Dates) */}
            <div className="p-5 rounded-2xl bg-[#0e0d0c]/50 border border-[#27221e] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-[#fdfbf7] text-sm flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[#dfc086]" />
                    <span>{t.availabilityBlocks}</span>
                  </h4>
                  <p className="text-[11px] text-[#a89d91] mt-1">{t.blockDateNotice}</p>
                </div>
              </div>

              {/* Add Block Form */}
              <form onSubmit={handleAddBlock} className="flex flex-wrap items-center gap-3 pt-2">
                <input
                  type="date"
                  value={newBlockDate}
                  onChange={(e) => setNewBlockDate(e.target.value)}
                  className="bg-[#181513] border border-[#27221e] rounded-xl px-3 py-2 text-[#fdfbf7] focus:outline-none focus:border-[#dfc086]/60 focus:ring-1 focus:ring-[#dfc086]/20"
                />
                <input
                  type="text"
                  value={newBlockReason}
                  onChange={(e) => setNewBlockReason(e.target.value)}
                  placeholder={lang === 'ar' ? 'سبب الحظر (صيانة / حفل خاص)' : 'Reason (Maintenance / Private)'}
                  className="bg-[#181513] border border-[#27221e] rounded-xl px-3 py-2 text-[#fdfbf7] focus:outline-none focus:border-[#dfc086]/60 focus:ring-1 focus:ring-[#dfc086]/20 placeholder-[#786e64]"
                />
                <GradientButton type="submit" size="sm" variant="secondary" icon={Lock}>
                  {t.blockDate}
                </GradientButton>
              </form>

              {/* Blocked dates table */}
              <div className="space-y-2 pt-2">
                {blockedDates.map((block, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-[#181513] border border-red-900/30 flex items-center justify-between text-[#d6cebf]">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-400" />
                      <strong className="text-[#fdfbf7]">{block.date}</strong>
                      <span className="text-[#786e64]">({block.session})</span>
                      <span className="text-[#a89d91]">- {block.reason}</span>
                    </div>
                    <span className="text-[10px] text-[#dfc086] bg-[#0e0d0c] px-2 py-0.5 rounded border border-[#27221e]">
                      {block.space}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
export default OwnerDashboardModal
