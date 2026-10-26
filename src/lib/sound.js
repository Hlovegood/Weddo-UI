// Apple Design WWDC: "Designing Audio-Haptic Experiences"
// Web Audio API synthesized micro-feedback for direct manipulation

class SoundEngine {
  constructor() {
    this.ctx = null
    this.enabled = true
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  toggle() {
    this.enabled = !this.enabled
    return this.enabled
  }

  // 1. Subtle tactile tap for buttons, sliders, tabs
  tap() {
    if (!this.enabled) return
    try {
      this.init()
      if (!this.ctx) return
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(420, this.ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(140, this.ctx.currentTime + 0.04)

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04)

      osc.connect(gain)
      gain.connect(this.ctx.destination)
      osc.start()
      osc.stop(this.ctx.currentTime + 0.04)
    } catch {
      // Audio autoplay policy fallback
    }
  }

  // 2. Crisp confirm chime for compare / shortlist / save
  success() {
    if (!this.enabled) return
    try {
      this.init()
      if (!this.ctx) return
      const now = this.ctx.currentTime
      const osc1 = this.ctx.createOscillator()
      const osc2 = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc1.type = 'sine'
      osc2.type = 'sine'
      osc1.frequency.setValueAtTime(523.25, now) // C5
      osc1.frequency.setValueAtTime(659.25, now + 0.06) // E5
      osc2.frequency.setValueAtTime(1046.5, now + 0.06) // C6

      gain.gain.setValueAtTime(0.05, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22)

      osc1.connect(gain)
      osc2.connect(gain)
      gain.connect(this.ctx.destination)

      osc1.start(now)
      osc2.start(now + 0.06)
      osc1.stop(now + 0.22)
      osc2.stop(now + 0.22)
    } catch {
      // Ignore audio error
    }
  }

  // 3. Soft pop for opening modals or drawers
  pop() {
    if (!this.enabled) return
    try {
      this.init()
      if (!this.ctx) return
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(260, this.ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(580, this.ctx.currentTime + 0.06)

      gain.gain.setValueAtTime(0.035, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06)

      osc.connect(gain)
      gain.connect(this.ctx.destination)
      osc.start()
      osc.stop(this.ctx.currentTime + 0.06)
    } catch {
      // Ignore audio error
    }
  }
}

export const sound = new SoundEngine()
