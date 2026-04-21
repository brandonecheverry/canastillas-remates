"use client"

import { useRef, useEffect, useState, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF, Environment } from "@react-three/drei"
import * as THREE from "three"

function CrateModel({ scrollY }: { scrollY: number }) {
  const { scene } = useGLTF("/models/plastic_crate.glb")
  const ref = useRef<THREE.Group>(null)

  // Animate on each frame based on scrollY
  useFrame(() => {
    if (!ref.current) return

    const progress = scrollY / (document.body.scrollHeight - window.innerHeight || 1)

    // Rotate on Y and X axes as user scrolls
    ref.current.rotation.y = progress * Math.PI * 4
    ref.current.rotation.x = progress * Math.PI * 1.5

    // Float up as user scrolls down
    ref.current.position.y = -progress * 2.5

    // Subtle idle wobble
    ref.current.rotation.z = Math.sin(Date.now() * 0.001) * 0.04
  })

  return (
    <group ref={ref} scale={[2.4, 2.4, 2.4]} position={[0, 0, 0]}>
      <primitive object={scene} />
    </group>
  )
}

function Scene({ scrollY }: { scrollY: number }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
      <directionalLight position={[-4, -2, -4]} intensity={0.3} color="#e87a2a" />
      <pointLight position={[0, 4, 0]} intensity={0.5} color="#f0a050" />
      <Environment preset="studio" />
      <Suspense fallback={null}>
        <CrateModel scrollY={scrollY} />
      </Suspense>
    </>
  )
}

export function CrateBackground() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <Scene scrollY={scrollY} />
      </Canvas>
    </div>
  )
}

useGLTF.preload("/models/plastic_crate.glb")
