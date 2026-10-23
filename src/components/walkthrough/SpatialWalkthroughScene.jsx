import React, { useEffect, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Sparkles, Eye, Compass, RotateCcw, AlertCircle } from 'lucide-react'

export const WALKTHROUGH_CHAPTERS = [
  {
    id: 'search-discovery',
    chapterNumber: '01',
    title: 'Cairo Area & Date Discovery',
    subtitle: 'Search All Cairo Zones with Date & Budget',
    tag: 'Verified Cairo Registry',
    summary: 'Search all Cairo areas (New Cairo, Garden City, Zamalek, Heliopolis, Giza Plateau) with date, guest band, and budget filters. Unknown availability is never claimed as available; venues with all spaces blocked on both sessions are automatically excluded.',
    camera: {
      position: { x: -22, y: 14, z: 40 },
      target: { x: 0, y: 7, z: 0 }
    },
    hotspot: { x: -12, y: 6, z: 15, label: 'Grand Entryway' },
    featuresKey: 'discovery'
  },
  {
    id: 'capacity-simulation',
    chapterNumber: '02',
    title: 'Space & Capacity Simulator',
    subtitle: 'Named Spaces & Real Seating Topologies',
    tag: 'Dynamic Space Planning',
    summary: 'Explore named spaces with real architectural capacities (50 to 650+ guests). Test custom seating configurations, round banquet tables, and verified aisle clearances to ensure your guest count fits comfortably.',
    camera: {
      position: { x: 0, y: 10, z: 26 },
      target: { x: 0, y: 6, z: -8 }
    },
    hotspot: { x: 0, y: 4, z: 2, label: 'Ceremony Aisle & Stage' },
    featuresKey: 'capacity'
  },
  {
    id: 'guide-pricing',
    chapterNumber: '03',
    title: 'Certified Guide Pricing',
    subtitle: 'Itemized Packages & Inclusions',
    tag: 'Transparent Rate Cards',
    summary: 'Review itemized packages (Boutique, Royal Celebration, Imperial Gala) with frozen guide pricing and transparent inclusions. What you review here matches the verified vendor contract with zero hidden agency markups.',
    camera: {
      position: { x: 20, y: 12, z: 12 },
      target: { x: 4, y: 6, z: -10 }
    },
    hotspot: { x: 10, y: 5, z: -2, label: 'Crystal Atrium Reception' },
    featuresKey: 'pricing'
  },
  {
    id: 'date-locking',
    chapterNumber: '04',
    title: '3-Year Verified Date Locking',
    subtitle: 'Day & Evening Slots with Audit Stamps',
    tag: 'Immutable Availability Calendar',
    summary: 'Direct date availability up to 3 calendar years ahead. Every slot supports Day vs. Evening sessions with immutable actor & timestamp logging. Blocked dates cannot be double-booked by unauthorized third parties.',
    camera: {
      position: { x: -24, y: 12, z: -10 },
      target: { x: -4, y: 6, z: 2 }
    },
    hotspot: { x: -14, y: 5, z: -4, label: 'Promenade Veranda' },
    featuresKey: 'dates'
  },
  {
    id: 'inquiries-snapshots',
    chapterNumber: '05',
    title: 'Structured Inquiries & Snapshots',
    subtitle: 'Permanent Price Lock & Private Conversation',
    tag: 'Frozen Snapshot Guarantee',
    summary: 'Submit direct 1-on-1 inquiries with permanently locked price and space snapshots. Private encrypted conversation thread with 200 message ceiling and immediate vendor concierge notification.',
    camera: {
      position: { x: -8, y: 15, z: -25 },
      target: { x: 0, y: 8, z: -4 }
    },
    hotspot: { x: -4, y: 7, z: -12, label: 'VIP Bridal Lounge' },
    featuresKey: 'inquiries'
  },
  {
    id: 'vendor-team-rbac',
    chapterNumber: '06',
    title: 'Vendor Operations & Team RBAC',
    subtitle: 'Granular Edit, Reply & Both Permissions',
    tag: 'Granular Role Management',
    summary: 'Venue owners manage up to 8 named spaces and 8 packages, and delegate operations to team members with granular Edit, Reply, or Both permissions. Salted scrypt encryption and session rotation built-in.',
    camera: {
      position: { x: 26, y: 16, z: -16 },
      target: { x: 6, y: 7, z: 4 }
    },
    hotspot: { x: 14, y: 8, z: -6, label: 'Executive Operations Suite' },
    featuresKey: 'vendor'
  },
  {
    id: 'admin-reviews-audit',
    chapterNumber: '07',
    title: 'Admin Reviews & Governance',
    subtitle: 'Stale-Write Rejection & Integrity Checks',
    tag: 'Operator Review Desk',
    summary: 'Operator verification desk with versioned publication controls, change reason codes, media safety boundaries, and SQLite WAL automated database integrity checkpoints.',
    camera: {
      position: { x: 0, y: 30, z: 44 },
      target: { x: 0, y: 9, z: 0 }
    },
    hotspot: { x: 0, y: 14, z: 8, label: 'Aerial Overview Vantage' },
    featuresKey: 'admin'
  }
]

export function SpatialWalkthroughScene({
  activeChapterIndex = 0,
  onChapterSelect,
  atmosphere = 'golden', // 'golden' | 'sunrise' | 'midnight'
  isAutoTouring = false,
  onUserOrbitChange
}) {
  const mountRef = useRef(null)
  const [loadProgress, setLoadProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [loadError, setLoadError] = useState(null)
  const [hotspotScreenCoords, setHotspotScreenCoords] = useState([])
  const [isUserOrbiting, setIsUserOrbiting] = useState(false)

  // References for Three.js instance
  const sceneRef = useRef(null)
  const cameraRef = useRef(null)
  const rendererRef = useRef(null)
  const controlsRef = useRef(null)
  const lightsRef = useRef({})
  const modelRef = useRef(null)
  const targetCamPosRef = useRef(new THREE.Vector3())
  const targetLookAtRef = useRef(new THREE.Vector3())
  const activeChapterRef = useRef(activeChapterIndex)
  const isOrbitingRef = useRef(false)

  activeChapterRef.current = activeChapterIndex

  // Setup Three.js Scene, Camera, Lights and Controls
  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const width = container.clientWidth || window.innerWidth
    const height = container.clientHeight || window.innerHeight

    // 1. Scene
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.2, 500)
    const initialChapter = WALKTHROUGH_CHAPTERS[0]
    camera.position.set(
      initialChapter.camera.position.x,
      initialChapter.camera.position.y,
      initialChapter.camera.position.z
    )
    targetCamPosRef.current.copy(camera.position)
    targetLookAtRef.current.set(
      initialChapter.camera.target.x,
      initialChapter.camera.target.y,
      initialChapter.camera.target.z
    )
    camera.lookAt(targetLookAtRef.current)
    cameraRef.current = camera

    // 3. Renderer with high dynamic range and filmiic tone mapping
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance'
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.05
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // 4. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.maxPolarAngle = Math.PI / 2 - 0.02 // Prevent going under the floor
    controls.minDistance = 2
    controls.maxDistance = 120
    controls.target.copy(targetLookAtRef.current)
    controlsRef.current = controls

    // Detect user manual orbit vs programmatic flythrough
    const handleStartOrbit = () => {
      isOrbitingRef.current = true
      setIsUserOrbiting(true)
      onUserOrbitChange?.(true)
    }
    controls.addEventListener('start', handleStartOrbit)

    // 5. Lighting Environment Setup
    const ambientLight = new THREE.AmbientLight(0xfff3e0, 1.2)
    scene.add(ambientLight)

    const hemiLight = new THREE.HemisphereLight(0xfff8ee, 0x1a1614, 0.8)
    scene.add(hemiLight)

    const sunLight = new THREE.DirectionalLight(0xffeedd, 2.4)
    sunLight.position.set(30, 45, 25)
    sunLight.castShadow = true
    sunLight.shadow.mapSize.width = 2048
    sunLight.shadow.mapSize.height = 2048
    sunLight.shadow.camera.near = 0.5
    sunLight.shadow.camera.far = 150
    const d = 40
    sunLight.shadow.camera.left = -d
    sunLight.shadow.camera.right = d
    sunLight.shadow.camera.top = d
    sunLight.shadow.camera.bottom = -d
    sunLight.shadow.bias = -0.0005
    scene.add(sunLight)

    // Secondary soft fill light
    const fillLight = new THREE.DirectionalLight(0xcfd9df, 0.8)
    fillLight.position.set(-25, 20, -25)
    scene.add(fillLight)

    // Warm architectural accent spotlights
    const spotAltar = new THREE.SpotLight(0xffdf99, 3.5, 35, Math.PI / 4, 0.4)
    spotAltar.position.set(0, 18, 0)
    spotAltar.target.position.set(0, 0, -5)
    scene.add(spotAltar)
    scene.add(spotAltar.target)

    lightsRef.current = { ambientLight, hemiLight, sunLight, fillLight, spotAltar }

    // 6. Ground Reflection Disc / Terrace base
    const floorGeo = new THREE.PlaneGeometry(160, 160)
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x0c0b0a,
      roughness: 0.65,
      metalness: 0.2
    })
    const floorMesh = new THREE.Mesh(floorGeo, floorMat)
    floorMesh.rotation.x = -Math.PI / 2
    floorMesh.position.y = -0.05
    floorMesh.receiveShadow = true
    scene.add(floorMesh)

    // Subtle background fog
    scene.fog = new THREE.FogExp2(0x0a0908, 0.008)

    // 7. Load GLB Model (rec_room_wedding.glb)
    const loader = new GLTFLoader()
    const glbUrl = '/assets/rec_room_wedding.glb'

    loader.load(
      glbUrl,
      (gltf) => {
        const model = gltf.scene

        // Compute bounding box and center perfectly at origin with ground at y=0
        const box = new THREE.Box3().setFromObject(model)
        const center = new THREE.Vector3()
        box.getCenter(center)

        model.position.x = -center.x
        model.position.y = -box.min.y
        model.position.z = -center.z

        // Enable shadows and enhance materials
        model.traverse((node) => {
          if (node.isMesh) {
            node.castShadow = true
            node.receiveShadow = true
            if (node.material) {
              node.material.roughness = Math.max(0.25, node.material.roughness || 0.5)
              node.material.envMapIntensity = 1.0
            }
          }
        })

        scene.add(model)
        modelRef.current = model
        setIsLoaded(true)
        setLoadProgress(100)
      },
      (xhr) => {
        if (xhr.total > 0) {
          const percent = Math.round((xhr.loaded / xhr.total) * 100)
          setLoadProgress(percent)
        } else {
          // Approximate calculation for streamed bytes (90.6 MB total)
          const approximateTotal = 90668556
          const percent = Math.min(99, Math.round((xhr.loaded / approximateTotal) * 100))
          setLoadProgress(percent)
        }
      },
      (error) => {
        console.error('Failed to load wedding venue 3D model:', error)
        setLoadError('Unable to load high-res 3D model geometry. WebGL fallback active.')
      }
    )

    // 8. Animation & Render Loop
    let animationFrameId
    const clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      const delta = clock.getDelta()

      // Smooth camera transition towards current chapter target
      if (!isOrbitingRef.current) {
        camera.position.lerp(targetCamPosRef.current, 0.04)
        controls.target.lerp(targetLookAtRef.current, 0.04)
      }

      controls.update()

      // Compute screen positions of chapter hotspots for interactive pins
      const projected = WALKTHROUGH_CHAPTERS.map((ch, idx) => {
        const vec = new THREE.Vector3(ch.hotspot.x, ch.hotspot.y, ch.hotspot.z)
        vec.project(camera)
        const isBehind = vec.z > 1
        const x = (vec.x * 0.5 + 0.5) * (mountRef.current?.clientWidth || window.innerWidth)
        const y = (-(vec.y * 0.5) + 0.5) * (mountRef.current?.clientHeight || window.innerHeight)
        return {
          id: ch.id,
          index: idx,
          label: ch.hotspot.label,
          chapterNumber: ch.chapterNumber,
          x,
          y,
          visible: !isBehind && vec.z < 1
        }
      })
      setHotspotScreenCoords(projected)

      renderer.render(scene, camera)
    }

    animate()

    // 9. Resize Listener
    const handleResize = () => {
      if (!mountRef.current || !renderer || !camera) return
      const w = mountRef.current.clientWidth || window.innerWidth
      const h = mountRef.current.clientHeight || window.innerHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      controls.removeEventListener('start', handleStartOrbit)
      controls.dispose()
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [onUserOrbitChange])

  // Update target camera position whenever active chapter changes
  useEffect(() => {
    const chapter = WALKTHROUGH_CHAPTERS[activeChapterIndex]
    if (!chapter || !cameraRef.current || !controlsRef.current) return

    targetCamPosRef.current.set(
      chapter.camera.position.x,
      chapter.camera.position.y,
      chapter.camera.position.z
    )
    targetLookAtRef.current.set(
      chapter.camera.target.x,
      chapter.camera.target.y,
      chapter.camera.target.z
    )

    // Reset user orbiting flag so camera swoops to the new chapter
    isOrbitingRef.current = false
    setIsUserOrbiting(false)
    onUserOrbitChange?.(false)
  }, [activeChapterIndex, onUserOrbitChange])

  // Apply atmosphere lighting changes
  useEffect(() => {
    const lights = lightsRef.current
    const scene = sceneRef.current
    if (!lights.ambientLight || !scene) return

    if (atmosphere === 'golden') {
      // Warm Cairo Golden Hour
      scene.background = new THREE.Color(0x0e0d0c)
      scene.fog.color = new THREE.Color(0x0e0d0c)
      lights.ambientLight.color.setHex(0xffe6c2)
      lights.ambientLight.intensity = 1.3
      lights.hemiLight.color.setHex(0xffebd2)
      lights.hemiLight.groundColor.setHex(0x1a1614)
      lights.sunLight.color.setHex(0xffd599)
      lights.sunLight.intensity = 2.6
      lights.spotAltar.color.setHex(0xffdf99)
    } else if (atmosphere === 'sunrise') {
      // Soft Peach Dew Sunrise
      scene.background = new THREE.Color(0x0a0c10)
      scene.fog.color = new THREE.Color(0x0a0c10)
      lights.ambientLight.color.setHex(0xfce4ec)
      lights.ambientLight.intensity = 1.2
      lights.hemiLight.color.setHex(0xfff0f5)
      lights.hemiLight.groundColor.setHex(0x111620)
      lights.sunLight.color.setHex(0xffcdd2)
      lights.sunLight.intensity = 2.2
      lights.spotAltar.color.setHex(0xf48fb1)
    } else if (atmosphere === 'midnight') {
      // Deep Indigo Midnight Gala
      scene.background = new THREE.Color(0x050608)
      scene.fog.color = new THREE.Color(0x050608)
      lights.ambientLight.color.setHex(0x7986cb)
      lights.ambientLight.intensity = 0.7
      lights.hemiLight.color.setHex(0x9fa8da)
      lights.hemiLight.groundColor.setHex(0x07090e)
      lights.sunLight.color.setHex(0xc5cae9)
      lights.sunLight.intensity = 1.2
      lights.spotAltar.color.setHex(0xffd54f)
      lights.spotAltar.intensity = 4.5
    }
  }, [atmosphere])

  // Reset Camera to Chapter Preset
  const handleResetCamera = () => {
    isOrbitingRef.current = false
    setIsUserOrbiting(false)
    onUserOrbitChange?.(false)
    const chapter = WALKTHROUGH_CHAPTERS[activeChapterIndex]
    if (chapter) {
      targetCamPosRef.current.set(
        chapter.camera.position.x,
        chapter.camera.position.y,
        chapter.camera.position.z
      )
      targetLookAtRef.current.set(
        chapter.camera.target.x,
        chapter.camera.target.y,
        chapter.camera.target.z
      )
    }
  }

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-[#08090b] select-none">
      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Loading Overlay */}
      {!isLoaded && !loadError && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#08090b] text-[#f7f3eb] p-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#dfc086] via-[#ceab68] to-[#9e7a3d] p-0.5 shadow-2xl shadow-[#ceab68]/30 mb-8 animate-pulse">
            <div className="w-full h-full bg-[#0e0d0c] rounded-[14px] flex items-center justify-center">
              <span className="font-serif font-black text-2xl text-[#dfc086]">W</span>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-[#f7f3eb] mb-2 text-center">
            Initializing Weddo 3D Spatial Walkthrough
          </h2>
          <p className="text-xs sm:text-sm text-[#a89d91] max-w-md text-center mb-6">
            Loading Cairo Wedding Pavilion geometry & architectural lightmaps (90.6 MB)...
          </p>

          {/* Progress Bar */}
          <div className="w-72 max-w-full h-2 rounded-full bg-[#1e1b17] overflow-hidden p-0.5 border border-[#382d22]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#ceab68] to-[#dfc086] transition-all duration-300 shadow-sm shadow-[#dfc086]"
              style={{ width: `${Math.max(8, loadProgress)}%` }}
            />
          </div>

          <div className="mt-3 font-mono text-xs text-[#dfc086] flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>{loadProgress}% Synchronized</span>
          </div>
        </div>
      )}

      {/* Error Banner if loading failed */}
      {loadError && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl bg-rose-950/80 border border-rose-500/40 text-rose-200 text-xs backdrop-blur-xl flex items-center gap-2 shadow-2xl">
          <AlertCircle className="w-4 h-4 text-rose-400" />
          <span>{loadError}</span>
        </div>
      )}

      {/* 3D-to-2D Interactive Hotspot Pins */}
      {isLoaded &&
        hotspotScreenCoords.map((pt) => {
          if (!pt.visible) return null
          const isCurrent = pt.index === activeChapterIndex
          return (
            <button
              key={pt.id}
              type="button"
              onClick={() => onChapterSelect(pt.index)}
              style={{
                left: `${pt.x}px`,
                top: `${pt.y}px`,
                transform: 'translate(-50%, -100%)'
              }}
              className="absolute pointer-events-auto group cursor-pointer z-20 transition-transform duration-200 hover:scale-110"
            >
              <div
                className={`relative px-2.5 py-1 rounded-full text-[10px] font-semibold border backdrop-blur-md shadow-xl transition-all flex items-center gap-1.5 ${
                  isCurrent
                    ? 'bg-[#dfc086] text-[#0e0d0c] border-[#faecd2] shadow-[#dfc086]/40 scale-105'
                    : 'bg-[#141211]/85 text-[#f7f3eb] border-[#dfc086]/30 hover:border-[#dfc086] hover:bg-[#201c18]'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isCurrent ? 'bg-[#0e0d0c]' : 'bg-[#dfc086] animate-ping'
                  }`}
                />
                <span className="font-mono text-[9px]">CH.{pt.chapterNumber}</span>
                <span>{pt.label}</span>
              </div>
              {/* Stem line */}
              <div
                className={`w-0.5 h-3 mx-auto ${
                  isCurrent ? 'bg-[#dfc086]' : 'bg-[#dfc086]/40'
                }`}
              />
            </button>
          )
        })}

      {/* Reset Camera Pill when User Free Orbits */}
      {isUserOrbiting && (
        <button
          type="button"
          onClick={handleResetCamera}
          className="fixed bottom-28 left-1/2 -translate-x-1/2 z-30 px-3.5 py-1.5 rounded-full bg-[#181512]/90 border border-[#dfc086]/40 text-[#dfc086] text-xs font-semibold backdrop-blur-xl flex items-center gap-2 shadow-2xl hover:bg-[#261f18] transition-all cursor-pointer animate-fade-in"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Snap Back to Chapter View</span>
        </button>
      )}
    </div>
  )
}
