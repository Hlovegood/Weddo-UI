import React, { useRef, useState } from 'react'

export function CardSpotlight({
  children,
  className = '',
  spotlightColor = 'rgba(223, 192, 134, 0.11)',
  radius = 280
}) {
  const divRef = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = (e) => {
    if (!divRef.current) return
    const rect = divRef.current.getBoundingClientRect()
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  const handleMouseEnter = () => {
    setOpacity(1)
  }

  const handleMouseLeave = () => {
    setOpacity(0)
  }

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-2xl border border-[#27231f] bg-[#141211]/90 backdrop-blur-md transition-all duration-300 hover:border-[#dfc086]/35 hover:shadow-2xl hover:shadow-black/60 ${className}`}
    >
      {/* Dynamic spotlight layer */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10"
        style={{
          opacity,
          background: `radial-gradient(${radius}px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`
        }}
      />
      {/* Content wrapper */}
      <div className="relative z-20 h-full">{children}</div>
    </div>
  )
}
export default CardSpotlight
