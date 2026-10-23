import React, { useEffect, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { 
  Play, 
  Pause, 
  Sun, 
  Sunset, 
  Moon, 
  RotateCcw, 
  Maximize2, 
  Sparkles, 
  Compass, 
  Eye, 
  Layers, 
  ChevronRight, 
  ChevronLeft 
} from 'lucide-react'

// Define the 5 core walkthrough camera stops matching the 3D building geometry
// Transformed size: X ~27.6m, Y ~5.0m, Z ~10.8m, centered at (0, 0, 0)
export const WALKTHROUGH_STOPS = [
  {
    id: 'arch',
    stopNumber: '01',
    title: 'The Grand Arch Portal',
    subtitle: 'Verified Cairo Venue Discovery',
    badge: 'Curated Venues & 3D Walkthroughs',
    description: 'Every venue in Weddo is personally surveyed with true architectural dimensions. Zero stock photos or fictitious layouts.',
    metrics: [
      { label: 'Cairo Areas', value: '7 Prime Zones' },
      { label: 'Real Capacities', value: '50 to 650+' },
      { label: 'Verified Listings', value: '100% Certified' }
    ],
    camera: {
      position: new THREE.Vector3(-14, 3.8, 11),
      target: new THREE.Vector3(-4, 2.2, 0)
    },
    hotspot: { x: -6, y: 3.2, z: 2 }
  },
  {
    id: 'lawn',
    stopNumber: '02',
    title: 'Ceremony Lawn & Aisle',
    subtitle: 'Space Capacity & Layout Simulator',
    badge: 'Dynamic Space Planning',
    description: 'Explore seating topologies from intimate 80-guest katb-ketab to 450-guest gala dinners with real aisle clearances.',
    metrics: [
      { label: 'Aisle Span', value: '28 Metres' },
      { label: 'Lawn Capacity', value: '450 Guests' },
      { label: 'Stage Canopy', value: 'Included' }
    ],
    camera: {
      position: new THREE.Vector3(0, 3.2, 9.5),
      target: new THREE.Vector3(0, 1.8, -1.5)
    },
    hotspot: { x: 0, y: 1.5, z: 1 }
  },
  {
    id: 'atrium',
    stopNumber: '03',
    title: 'Glasshouse Crystal Atrium',
    subtitle: 'Certified Guide Pricing & Inclusions',
    badge: 'Transparent Package Rates',
    description: 'Compare itemized packages with frozen guide pricing. What you review here matches the verified vendor contract.',
    metrics: [
      { label: 'Boutique Garden', value: '135,000 EGP' },
      { label: 'Royal Emerald', value: '195,000 EGP' },
      { label: 'Imperial Gala', value: '260,000 EGP' }
    ],
    camera: {
      position: new THREE.Vector3(7.5, 3.6, 5),
      target: new THREE.Vector3(3.5, 2.0, -1)
    },
    hotspot: { x: 4.5, y: 2.5, z: -1 }
  },
  {
    id: 'terrace',
    stopNumber: '04',
    title: 'Sunset Riverfront Promenade',
    subtitle: '3-Year Verified Date Locking',
    badge: 'Live Availability Calendar',
    description: 'Direct date availability with immutable actor logging. Blocked dates cannot be double-booked by unauthorized agents.',
    metrics: [
      { label: 'Horizon Span', value: '3 Calendar Years' },
      { label: 'Autumn Nile Peak', value: '94% Velocity' },
      { label: 'Session Slots', value: 'Day / Evening' }
    ],
    camera: {
      position: new THREE.Vector3(13.5, 4.2, 9),
      target: new THREE.Vector3(5.5, 1.8, 0)
    },
    hotspot: { x: 9, y: 2.0, z: 2 }
  },
  {
    id: 'suite',
    stopNumber: '05',
    title: 'VIP Bridal Suite & Terrace',
    subtitle: 'Direct 1-on-1 Structured Inquiries',
    badge: 'Zero Markup Communication',
    description: 'Submit inquiries directly to certified venue owners with price-locked snapshots and private real-time message tracking.',
    metrics: [
      { label: 'Response Target', value: '< 4 Hours' },
      { label: 'Direct Pricing', value: 'No Commission' },
      { label: 'Private Thread', value: 'Encrypted' }
    ],
    camera: {
      position: new THREE.Vector3(-4, 5.0, 4.8),
      target: new THREE.Vector3(-1.2, 3.2, 0)
    },
    hotspot: { x: -3, y: 3.8, z: 1 }
  }
]

export function VenueWalkthroughCanvas({
  activeStopIndex = 0,
  onStopChange,
  onOpenInquiry,
  atmosphere = 'golden', // 'golden' | 'sunrise' | 'midnight'
  onAtmosphereChange,
  className = ''
}) {
  const containerRef = useRef(null)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isPlayingAutoTour, setIsPlayingAutoTour] = useState(false)
  const [hotspotPositions, setHotspotPositions] = useState([])
  const [showHotspots, setShowHotspots] = useState(true)

  // Three.js internal references
  const sceneRef = useRef(null)
  const cameraRef = useRef(null)
  const rendererRef = useRef(null)
  const controlsRef = useRef(null)
  const lightsRef = useRef({})
  const modelGroupRef = useRef(null)
  const targetCamPosRef = useRef(WALKTHROUGH_STOPS[0].camera.position.clone())
  const targetLookAtRef = useRef(WALKTHROUGH_STOPS[0].camera.target.clone())
  const autoTourTimerRef = useRef(null)

  // Initialize Three.js scene
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const width = container.clientWidth
    const height = container.clientHeight

    // Scene & Fog
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 200)
    camera.position.copy(WALKTHROUGH_STOPS[0].camera.position)
    cameraRef.current = camera

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: true
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.target.copy(WALKTHROUGH_STOPS[0].camera.target)
    controls.maxPolarAngle = Math.PI / 2 - 0.04 // Don't dip below floor
    controls.minDistance = 2.5
    controls.maxDistance = 42
    controls.enablePan = true
    controlsRef.current = controls

    // Ambient Lighting
    const ambientLight = new THREE.AmbientLight(0xfff1db, 0.7)
    scene.add(ambientLight)

    // Hemisphere Light
    const hemiLight = new THREE.HemisphereLight(0xfff3df, 0x181412, 0.8)
    scene.add(hemiLight)

    // Sun / Key Directional Light
    const dirLight = new THREE.DirectionalLight(0xffe6b8, 2.4)
    dirLight.position.set(18, 24, 16)
    dirLight.castShadow = true
    dirLight.shadow.mapSize.width = 2048
    dirLight.shadow.mapSize.height = 2048
    dirLight.shadow.camera.near = 0.5
    dirLight.shadow.camera.far = 80
    dirLight.shadow.camera.left = -22
    dirLight.shadow.camera.right = 22
    dirLight.shadow.camera.top = 22
    dirLight.shadow.camera.bottom = -22
    dirLight.shadow.bias = -0.0004
    scene.add(dirLight)

    // Secondary Accent Rim Light
    const rimLight = new THREE.DirectionalLight(0xdfc086, 1.2)
    rimLight.position.set(-16, 12, -18)
    scene.add(rimLight)

    // Interior Warm Glow Light
    const interiorGlow = new THREE.PointLight(0xffb86c, 2.2, 18, 1.5)
    interiorGlow.position.set(0, 3.2, 0)
    scene.add(interiorGlow)

    lightsRef.current = {
      ambient: ambientLight,
      hemi: hemiLight,
      dir: dirLight,
      rim: rimLight,
      interior: interiorGlow
    }

    // Ground Plane with luxury radial fade
    const groundGeo = new THREE.PlaneGeometry(160, 160)
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x0a0908,
      roughness: 0.85,
      metalness: 0.2
    })
    const ground = new THREE.Mesh(groundGeo, groundMat)
    ground.rotation.x = -Math.PI / 2
    ground.position.y = -0.01
    ground.receiveShadow = true
    scene.add(ground)

    // Architectural Pedestal Ring
    const ringGeo = new THREE.RingGeometry(18, 18.25, 64)
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xdfc086,
      transparent: true,
      opacity: 0.22,
      side: THREE.DoubleSide
    })
    const pedestalRing = new THREE.Mesh(ringGeo, ringMat)
    pedestalRing.rotation.x = -Math.PI / 2
    pedestalRing.position.y = 0.01
    scene.add(pedestalRing)

    // Load the 3D GLB Model
    const modelGroup = new THREE.Group()
    scene.add(modelGroup)
    modelGroupRef.current = modelGroup

    const loader = new GLTFLoader()
    const glbUrl = '/assets/wedding_venue.glb'

    loader.load(
      glbUrl,
      (gltf) => {
        const root = gltf.scene

        // Measure bounding box to center accurately
        const box = new THREE.Box3().setFromObject(root)
        const center = box.getCenter(new THREE.Vector3())
        const size = box.getSize(new THREE.Vector3())

        // Align model center and floor at y=0
        root.position.x = -center.x
        root.position.y = -box.min.y
        root.position.z = -center.z

        // Traverse meshes to refine materials and enable shadows
        root.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true
            child.receiveShadow = true

            if (child.material) {
              child.material.roughness = Math.min(child.material.roughness || 0.5, 0.65)
              child.material.metalness = Math.max(child.material.metalness || 0.1, 0.18)
              // Warm golden tint enhancement
              if (child.material.color) {
                child.material.color.multiplyScalar(1.05)
              }
              child.material.needsUpdate = true
            }
          }
        })

        modelGroup.add(root)
        setIsLoaded(true)
      },
      (xhr) => {
        if (xhr.total > 0) {
          const pct = Math.round((xhr.loaded / xhr.total) * 100)
          setLoadingProgress(pct)
        } else {
          setLoadingProgress(65)
        }
      },
      (error) => {
        console.error('Failed to load wedding venue GLB:', error)
        setIsLoaded(true) // Dismiss blocker even on error
      }
    )

    // Animation Render Loop
    let animationFrameId
    const clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      const delta = clock.getDelta()

      // Smooth camera interpolation toward target position (Apple fluid spring feel)
      if (cameraRef.current && controlsRef.current) {
        cameraRef.current.position.lerp(targetCamPosRef.current, 0.045)
        controlsRef.current.target.lerp(targetLookAtRef.current, 0.045)
        controlsRef.current.update()
      }

      // Subtle slow ambient floating rotation when not interacting
      if (modelGroupRef.current && !controls.state) {
        // very gentle subtle sway
        pedestalRing.rotation.z += 0.001
      }

      // Project 3D hotspots to 2D screen positions for DOM overlay
      if (cameraRef.current && containerRef.current) {
        const positions = WALKTHROUGH_STOPS.map((stop, index) => {
          const pos = new THREE.Vector3(stop.hotspot.x, stop.hotspot.y, stop.hotspot.z)
          pos.project(cameraRef.current)
          
          const isBehind = pos.z > 1
          const x = (pos.x * 0.5 + 0.5) * container.clientWidth
          const y = (-(pos.y * 0.5) + 0.5) * container.clientHeight

          return { index, id: stop.id, x, y, visible: !isBehind }
        })
        setHotspotPositions(positions)
      }

      renderer.render(scene, camera)
    }

    animate()

    // Handle Window Resize
    const handleResize = () => {
      if (!container || !renderer || !camera) return
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
      controls.dispose()
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  // Update Atmosphere Lighting & Mood
  useEffect(() => {
    const lights = lightsRef.current
    const scene = sceneRef.current
    const renderer = rendererRef.current
    if (!lights.ambient || !scene || !renderer) return

    if (atmosphere === 'golden') {
      // Golden Hour Warmth
      scene.background = new THREE.Color(0x0e0d0b)
      scene.fog = new THREE.FogExp2(0x0e0d0b, 0.016)
      lights.ambient.color.setHex(0xffecc7)
      lights.ambient.intensity = 0.8
      lights.hemi.color.setHex(0xffe2b0)
      lights.hemi.groundColor.setHex(0x1a120c)
      lights.dir.color.setHex(0xffd58c)
      lights.dir.intensity = 2.6
      lights.dir.position.set(20, 22, 14)
      lights.rim.color.setHex(0xdfc086)
      lights.rim.intensity = 1.4
      lights.interior.color.setHex(0xffa953)
      lights.interior.intensity = 2.4
      renderer.toneMappingExposure = 1.25
    } else if (atmosphere === 'sunrise') {
      // Sunrise Peach & Dew
      scene.background = new THREE.Color(0x0c0d12)
      scene.fog = new THREE.FogExp2(0x0c0d12, 0.018)
      lights.ambient.color.setHex(0xfce7df)
      lights.ambient.intensity = 0.9
      lights.hemi.color.setHex(0xf5d3c8)
      lights.hemi.groundColor.setHex(0x0b1017)
      lights.dir.color.setHex(0xffded1)
      lights.dir.intensity = 2.2
      lights.dir.position.set(-16, 18, 18)
      lights.rim.color.setHex(0xe8c5b8)
      lights.rim.intensity = 1.1
      lights.interior.color.setHex(0xffcbab)
      lights.interior.intensity = 1.6
      renderer.toneMappingExposure = 1.15
    } else if (atmosphere === 'midnight') {
      // Midnight Gala Architectural Lighting
      scene.background = new THREE.Color(0x050608)
      scene.fog = new THREE.FogExp2(0x050608, 0.02)
      lights.ambient.color.setHex(0x2d3a4d)
      lights.ambient.intensity = 0.45
      lights.hemi.color.setHex(0x1e2a3c)
      lights.hemi.groundColor.setHex(0x06070a)
      lights.dir.color.setHex(0x8ba6cf)
      lights.dir.intensity = 1.1
      lights.dir.position.set(12, 28, -12)
      lights.rim.color.setHex(0xdfc086)
      lights.rim.intensity = 2.2
      lights.interior.color.setHex(0xffbf69)
      lights.interior.intensity = 3.6
      renderer.toneMappingExposure = 1.05
    }
  }, [atmosphere])

  // Fly Camera to Active Stop
  const goToStop = useCallback((index) => {
    const stop = WALKTHROUGH_STOPS[index]
    if (!stop) return

    targetCamPosRef.current.copy(stop.camera.position)
    targetLookAtRef.current.copy(stop.camera.target)

    if (onStopChange) {
      onStopChange(index)
    }
  }, [onStopChange])

  // React to external activeStopIndex changes
  useEffect(() => {
    goToStop(activeStopIndex)
  }, [activeStopIndex, goToStop])

  // Auto-Tour Player
  useEffect(() => {
    if (isPlayingAutoTour) {
      autoTourTimerRef.current = setInterval(() => {
        onStopChange((prev) => (prev + 1) % WALKTHROUGH_STOPS.length)
      }, 7500)
    } else {
      clearInterval(autoTourTimerRef.current)
    }
    return () => clearInterval(autoTourTimerRef.current)
  }, [isPlayingAutoTour, onStopChange])

  const currentStop = WALKTHROUGH_STOPS[activeStopIndex] || WALKTHROUGH_STOPS[0]

  return (
    <div className={`relative w-full h-full min-h-[580px] lg:min-h-[720px] rounded-3xl overflow-hidden border border-[#27221e] bg-[#08090b] shadow-2xl select-none ${className}`}>
      {/* Three.js Canvas Container */}
      <div ref={containerRef} className="absolute inset-0 cursor-grab active:cursor-grabbing" />

      {/* Loading Overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#08090b]/95 backdrop-blur-xl transition-opacity duration-500">
          <div className="relative w-20 h-20 mb-6 flex items-center justify-center">
            {/* Spinning Golden Ring */}
            <svg className="w-full h-full -rotate-90 animate-spin" viewBox="0 0 50 50">
              <circle
                cx="25"
                cy="25"
                r="21"
                className="stroke-[#241e17]"
                strokeWidth="2.5"
                fill="none"
              />
              <circle
                cx="25"
                cy="25"
                r="21"
                className="stroke-[#dfc086]"
                strokeWidth="2.5"
                strokeDasharray="131"
                strokeDashoffset={131 - (loadingProgress / 100) * 131}
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <Sparkles className="w-6 h-6 text-[#dfc086] absolute" />
          </div>
          <span className="font-serif text-lg font-bold text-[#f7f3eb] tracking-wide mb-1">
            Loading Architectural Sanctuary
          </span>
          <span className="text-xs text-[#a89d91]">
            14.6 MB High-Fidelity 3D Wedding Estate • {loadingProgress}%
          </span>
        </div>
      )}

      {/* 3D Hotspot Pins Projected on Screen */}
      {showHotspots && isLoaded && hotspotPositions.map((pos) => {
        if (!pos.visible) return null
        const isActive = pos.index === activeStopIndex
        return (
          <button
            key={pos.id}
            type="button"
            onClick={() => onStopChange(pos.index)}
            style={{
              transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
            }}
            className={`absolute z-10 p-1.5 rounded-full transition-all duration-300 group cursor-pointer ${
              isActive 
                ? 'scale-125' 
                : 'hover:scale-110 opacity-75 hover:opacity-100'
            }`}
          >
            <span className="relative flex h-6 w-6 items-center justify-center">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isActive ? 'bg-[#dfc086]' : 'bg-[#a89d91]'
              }`} />
              <span className={`relative inline-flex rounded-full h-4 w-4 border-2 border-[#0e0d0c] items-center justify-center text-[8px] font-bold ${
                isActive 
                  ? 'bg-gradient-to-tr from-[#dfc086] to-[#fff] text-[#0e0d0c] shadow-[0_0_15px_rgba(223,192,134,0.8)]' 
                  : 'bg-[#27221e] text-[#dfc086]'
              }`}>
                {pos.index + 1}
              </span>
            </span>

            {/* Tooltip on Hover */}
            <span className="absolute left-1/2 -top-8 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-md bg-[#141211]/90 border border-[#dfc086]/30 text-[10px] text-[#f7f3eb] font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg backdrop-blur-md">
              {WALKTHROUGH_STOPS[pos.index].title}
            </span>
          </button>
        )
      })}

      {/* Top Floating Controls Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        {/* Left: Active Camera Stop Badge */}
        <div className="pointer-events-auto flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-[#141211]/85 border border-[#27221e] backdrop-blur-xl shadow-lg">
          <div className="w-2.5 h-2.5 rounded-full bg-[#dfc086] animate-pulse" />
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#dfc086]">
              Walkthrough Tour • {currentStop.stopNumber} of 05
            </span>
            <span className="text-xs font-serif font-bold text-[#f7f3eb] -mt-0.5">
              {currentStop.title}
            </span>
          </div>
        </div>

        {/* Right: Lighting Mood Atmosphere Selector & Auto-Tour */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Atmosphere Toggles */}
          <div className="flex items-center p-1 rounded-2xl bg-[#141211]/85 border border-[#27221e] backdrop-blur-xl shadow-lg">
            <button
              type="button"
              onClick={() => onAtmosphereChange('golden')}
              title="Golden Hour Atmosphere"
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                atmosphere === 'golden'
                  ? 'bg-[#241e17] text-[#dfc086] shadow-sm'
                  : 'text-[#8e8377] hover:text-[#d6cebf]'
              }`}
            >
              <Sunset className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onAtmosphereChange('sunrise')}
              title="Sunrise Velvet Atmosphere"
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                atmosphere === 'sunrise'
                  ? 'bg-[#241e17] text-[#e8a598] shadow-sm'
                  : 'text-[#8e8377] hover:text-[#d6cebf]'
              }`}
            >
              <Sun className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onAtmosphereChange('midnight')}
              title="Midnight Gala Atmosphere"
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                atmosphere === 'midnight'
                  ? 'bg-[#1b2333] text-[#8ba6cf] shadow-sm'
                  : 'text-[#8e8377] hover:text-[#d6cebf]'
              }`}
            >
              <Moon className="w-4 h-4" />
            </button>
          </div>

          {/* Auto-Play Tour Button */}
          <button
            type="button"
            onClick={() => setIsPlayingAutoTour(!isPlayingAutoTour)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl border text-xs font-semibold backdrop-blur-xl transition-all cursor-pointer shadow-lg ${
              isPlayingAutoTour
                ? 'bg-[#dfc086] text-[#0e0d0c] border-[#dfc086]'
                : 'bg-[#141211]/85 text-[#dfc086] border-[#27221e] hover:border-[#dfc086]/50'
            }`}
          >
            {isPlayingAutoTour ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span className="hidden sm:inline">Pause Tour</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span className="hidden sm:inline">Auto-Fly Tour</span>
              </>
            )}
          </button>

          {/* Toggle Pins Visibility */}
          <button
            type="button"
            onClick={() => setShowHotspots(!showHotspots)}
            title="Toggle 3D Hotspot Pins"
            className={`p-2 rounded-2xl border backdrop-blur-xl transition-all cursor-pointer shadow-lg ${
              showHotspots
                ? 'bg-[#141211]/85 text-[#dfc086] border-[#27221e]'
                : 'bg-[#141211]/50 text-[#8e8377] border-[#27221e]'
            }`}
          >
            <Compass className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Floating Director's Navigation Dock */}
      <div className="absolute bottom-5 left-4 right-4 z-20 flex flex-col sm:flex-row items-center justify-between gap-3 pointer-events-none">
        {/* Left & Right Step Buttons */}
        <div className="pointer-events-auto flex items-center gap-1.5">
          <button
            type="button"
            onClick={() =>
              onStopChange((activeStopIndex - 1 + WALKTHROUGH_STOPS.length) % WALKTHROUGH_STOPS.length)
            }
            className="w-10 h-10 rounded-2xl bg-[#141211]/90 hover:bg-[#201b17] border border-[#27221e] text-[#dfc086] flex items-center justify-center transition-all cursor-pointer shadow-xl backdrop-blur-xl hover:scale-105 active:scale-95"
            aria-label="Previous Stop"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => onStopChange((activeStopIndex + 1) % WALKTHROUGH_STOPS.length)}
            className="w-10 h-10 rounded-2xl bg-[#141211]/90 hover:bg-[#201b17] border border-[#27221e] text-[#dfc086] flex items-center justify-center transition-all cursor-pointer shadow-xl backdrop-blur-xl hover:scale-105 active:scale-95"
            aria-label="Next Stop"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Center: Walkthrough Stops Pill Carousel */}
        <div className="pointer-events-auto flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#141211]/90 border border-[#27221e] backdrop-blur-2xl shadow-2xl max-w-full overflow-x-auto">
          {WALKTHROUGH_STOPS.map((stop, i) => {
            const isSelected = i === activeStopIndex
            return (
              <button
                key={stop.id}
                type="button"
                onClick={() => onStopChange(i)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#dfc086] to-[#ceab68] text-[#0e0d0c] font-bold shadow-md shadow-[#dfc086]/20'
                    : 'text-[#a89d91] hover:text-[#f7f3eb] hover:bg-[#1f1a16]'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-[#0e0d0c]' : 'bg-[#dfc086]/50'}`} />
                <span className="font-serif">{stop.stopNumber}</span>
                <span className="hidden md:inline">{stop.title.split(' ')[1] || stop.title}</span>
              </button>
            )
          })}
        </div>

        {/* Right: Direct Inquiry / Tour Action */}
        <div className="pointer-events-auto hidden sm:block">
          <button
            type="button"
            onClick={() => onOpenInquiry?.(currentStop)}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#dfc086] via-[#ceab68] to-[#9e7a3d] text-[#0e0d0c] text-xs font-bold tracking-wide flex items-center gap-2 shadow-lg shadow-[#ceab68]/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Book Private Tour</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default VenueWalkthroughCanvas
