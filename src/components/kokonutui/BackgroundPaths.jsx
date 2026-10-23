import React, { useEffect, useRef } from 'react'
import { motion } from 'motion/react'

export function BackgroundPaths({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId
    let width = (canvas.width = canvas.offsetWidth)
    let height = (canvas.height = canvas.offsetHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
    }

    window.addEventListener('resize', handleResize)

    // Ribbons layers with soft champagne silk palette
    const layers = [
      { count: 5, speed: 0.0005, amp: 70, wavelength: 0.0016, color: 'rgba(223, 192, 134, 0.08)', width: 1.2 },
      { count: 4, speed: 0.0008, amp: 90, wavelength: 0.0012, color: 'rgba(240, 230, 214, 0.06)', width: 1.8 },
      { count: 4, speed: 0.0003, amp: 110, wavelength: 0.0009, color: 'rgba(206, 171, 104, 0.05)', width: 2.2 },
      { count: 3, speed: 0.0010, amp: 55, wavelength: 0.0020, color: 'rgba(255, 250, 240, 0.04)', width: 1 }
    ]

    let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.targetX = e.clientX - rect.left
      mouse.targetY = e.clientY - rect.top
    }

    window.addEventListener('mousemove', handleMouseMove)

    let time = 0

    const render = () => {
      time += 1
      mouse.x += (mouse.targetX - mouse.x) * 0.04
      mouse.y += (mouse.targetY - mouse.y) * 0.04

      ctx.clearRect(0, 0, width, height)

      layers.forEach((layer, layerIdx) => {
        ctx.strokeStyle = layer.color
        ctx.lineWidth = layer.width

        for (let i = 0; i < layer.count; i++) {
          ctx.beginPath()
          const yOffset = (height / (layer.count + 1)) * (i + 1)
          const phaseOffset = i * 0.8 + layerIdx * 1.4

          for (let x = 0; x <= width; x += 12) {
            // Bezier wave calculation with mouse gravity
            const dx = x - mouse.x
            const dy = yOffset - mouse.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            const influence = Math.max(0, 1 - dist / 300) * 45

            const wave = Math.sin(x * layer.wavelength + time * layer.speed + phaseOffset) * layer.amp
            const y = yOffset + wave - influence * (dy > 0 ? 1 : -1)

            if (x === 0) {
              ctx.moveTo(x, y)
            } else {
              ctx.lineTo(x, y)
            }
          }
          ctx.stroke()
        }
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-80"
        style={{
          maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 80%)'
        }}
      />
    </motion.div>
  )
}
export default BackgroundPaths
