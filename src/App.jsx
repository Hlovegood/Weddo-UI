import React, { useState, useRef, useCallback, useEffect } from 'react'
import { SpatialWalkthroughScene, WALKTHROUGH_CHAPTERS } from './components/walkthrough/SpatialWalkthroughScene'
import { SpatialDynamicIsland } from './components/walkthrough/SpatialDynamicIsland'
import { SpatialChapterDock } from './components/walkthrough/SpatialChapterDock'
import { SpatialFeatureCard } from './components/walkthrough/SpatialFeatureCard'
import { CairoSearchDrawer } from './components/walkthrough/CairoSearchDrawer'
import { InteractiveCompareDrawer } from './components/reactbits/InteractiveCompareDrawer'
import { DirectInquiryModal } from './components/reactbits/DirectInquiryModal'

export default function App() {
  // Active Chapter Index (0 to 6)
  const [activeChapterIndex, setActiveChapterIndex] = useState(0)
  
  // Atmosphere Mode: 'golden' (Cairo Golden Hour) | 'sunrise' (Peach Dew) | 'midnight' (Midnight Gala)
  const [atmosphere, setAtmosphere] = useState('golden')
  
  // Perspective Mode: 'couple' | 'owner' | 'admin'
  const [perspective, setPerspective] = useState('couple')

  // Auto-tour state
  const [isAutoTouring, setIsAutoTouring] = useState(false)
  const [isUserOrbiting, setIsUserOrbiting] = useState(false)

  // Modals & Drawers
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isCompareOpen, setIsCompareOpen] = useState(false)
  const [compareIds, setCompareIds] = useState(['olive-garden', 'nile-salon'])
  const [isInquiryOpen, setIsInquiryOpen] = useState(false)
  const [selectedInquiryVenue, setSelectedInquiryVenue] = useState(null)

  // Ambient Luxury Audio (Web Audio API crystal chime)
  const [isMuted, setIsMuted] = useState(true)
  const audioCtxRef = useRef(null)

  // Toggle ambient audio with gentle chord
  const toggleAudio = () => {
    if (isMuted) {
      try {
        if (!audioCtxRef.current) {
          const AudioContext = window.AudioContext || window.webkitAudioContext
          audioCtxRef.current = new AudioContext()
        }
        if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume()
        }
        const ctx = audioCtxRef.current
        const chord = [523.25, 659.25, 783.99, 1046.50, 1318.51] // C5, E5, G5, C6, E6
        chord.forEach((freq, idx) => {
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()
          osc.type = 'sine'
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12)
          gain.gain.setValueAtTime(0.0001, ctx.currentTime + idx * 0.12)
          gain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + idx * 0.12 + 0.04)
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.12 + 2.2)
          osc.connect(gain)
          gain.connect(ctx.destination)
          osc.start(ctx.currentTime + idx * 0.12)
          osc.stop(ctx.currentTime + idx * 0.12 + 2.4)
        })
        setIsMuted(false)
      } catch (e) {
        console.warn('AudioContext requires user gesture', e)
        setIsMuted(false)
      }
    } else {
      setIsMuted(true)
    }
  }

  // Play subtle feedback click on chapter change
  const playChapterTick = useCallback(() => {
    if (isMuted || !audioCtxRef.current) return
    try {
      const ctx = audioCtxRef.current
      if (ctx.state === 'suspended') ctx.resume()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(980, ctx.currentTime)
      gain.gain.setValueAtTime(0.015, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.1)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.12)
    } catch (e) {
      // Audio fallback
    }
  }, [isMuted])

  const handleChapterSelect = (index) => {
    setActiveChapterIndex(index)
    playChapterTick()
  }

  const handleToggleCompare = (id) => {
    setCompareIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : prev.length < 3 ? [...prev, id] : prev
    )
  }

  const currentChapter = WALKTHROUGH_CHAPTERS[activeChapterIndex] || WALKTHROUGH_CHAPTERS[0]

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-[#08090b] text-[#f7f3eb] font-sans select-none">
      {/* 1. Fullscreen Living 3D Spatial Walkthrough Scene (rec_room_wedding.glb) */}
      <SpatialWalkthroughScene
        activeChapterIndex={activeChapterIndex}
        onChapterSelect={handleChapterSelect}
        atmosphere={atmosphere}
        isAutoTouring={isAutoTouring}
        onUserOrbitChange={setIsUserOrbiting}
      />

      {/* 2. Apple-Style Floating Dynamic Island HUD at Top */}
      <SpatialDynamicIsland
        activeChapterIndex={activeChapterIndex}
        onChapterSelect={handleChapterSelect}
        atmosphere={atmosphere}
        onAtmosphereChange={setAtmosphere}
        isMuted={isMuted}
        onToggleAudio={toggleAudio}
        compareCount={compareIds.length}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpenInquiry={() => setIsInquiryOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        activePerspective={perspective}
        onPerspectiveChange={setPerspective}
      />

      {/* 3. Floating Interactive Feature Card (README features & simulations) */}
      <SpatialFeatureCard
        activeChapterIndex={activeChapterIndex}
        onOpenInquiry={() => setIsInquiryOpen(true)}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* 4. Apple-Style Bottom Scrubber Dock with Auto-Tour & Navigation */}
      <SpatialChapterDock
        activeChapterIndex={activeChapterIndex}
        onChapterSelect={handleChapterSelect}
        isAutoTouring={isAutoTouring}
        onToggleAutoTour={() => setIsAutoTouring(!isAutoTouring)}
      />

      {/* 5. Cairo Area, Date & Budget Search Drawer */}
      <CairoSearchDrawer
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        compareIds={compareIds}
        onToggleCompare={handleToggleCompare}
        onFlyToVenue={(venue) => {
          handleChapterSelect(1)
        }}
        onOpenInquiry={() => {
          setIsSearchOpen(false)
          setIsInquiryOpen(true)
        }}
      />

      {/* 6. Side-by-Side Venue Comparison Drawer */}
      <InteractiveCompareDrawer
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        compareIds={compareIds}
        onRemoveCompare={(id) => setCompareIds((prev) => prev.filter((i) => i !== id))}
        onOpenInquiry={() => {
          setIsCompareOpen(false)
          setIsInquiryOpen(true)
        }}
      />

      {/* 7. Direct 1-on-1 Inquiry Modal with Frozen Price Snapshot */}
      <DirectInquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        stopData={currentChapter}
        onSubmitSuccess={() => {
          setTimeout(() => {
            setIsInquiryOpen(false)
          }, 1500)
        }}
      />
    </div>
  )
}

export { App }
