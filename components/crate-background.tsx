"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"

export function CrateBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true

    // Scene
    const scene = new THREE.Scene()

    // Camera
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.set(0, 0, 6)

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambient)

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2)
    dirLight.position.set(5, 8, 5)
    dirLight.castShadow = true
    scene.add(dirLight)

    const fillLight = new THREE.DirectionalLight(0xe87a2a, 0.3)
    fillLight.position.set(-4, -2, -4)
    scene.add(fillLight)

    const pointLight = new THREE.PointLight(0xf0a050, 0.5)
    pointLight.position.set(0, 4, 0)
    scene.add(pointLight)

    // Model
    let crateGroup: THREE.Group | null = null
    const loader = new GLTFLoader()
    loader.load(
      "/models/plastic_crate.glb",
      (gltf) => {
        crateGroup = new THREE.Group()
        crateGroup.add(gltf.scene)
        crateGroup.scale.set(2.4, 2.4, 2.4)
        crateGroup.position.set(0, 0, 0)
        scene.add(crateGroup)
      },
      undefined,
      (err) => console.log("[v0] GLB load error:", err)
    )

    // Scroll tracking
    let scrollY = 0
    const handleScroll = () => { scrollY = window.scrollY }
    window.addEventListener("scroll", handleScroll, { passive: true })

    // Resize handling
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener("resize", handleResize)

    // Animation loop
    let animId: number
    const animate = () => {
      animId = requestAnimationFrame(animate)

      if (crateGroup) {
        const maxScroll = document.body.scrollHeight - window.innerHeight
        const progress = maxScroll > 0 ? scrollY / maxScroll : 0

        crateGroup.rotation.y = progress * Math.PI * 4
        crateGroup.rotation.x = progress * Math.PI * 1.5
        crateGroup.position.y = -progress * 2.5
        crateGroup.rotation.z = Math.sin(Date.now() * 0.001) * 0.04
      }

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
      renderer.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  )
}
