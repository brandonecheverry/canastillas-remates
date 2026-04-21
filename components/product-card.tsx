"use client"

import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { useRef } from "react"

interface ProductCardProps {
  title: string
  description: string
  icon: React.ReactNode
  specs?: string[]
  image?: string
}

export function ProductCard({ title, description, icon, specs, image }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const rotateX = ((y - cy) / cy) * -8
    const rotateY = ((x - cx) / cx) * 8
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0)"
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group bg-card border border-border rounded-2xl overflow-hidden transition-all duration-200 cursor-pointer"
      style={{ transformStyle: "preserve-3d", transition: "transform 0.15s ease, box-shadow 0.3s ease" }}
      onMouseEnter={() => {
        if (cardRef.current) {
          cardRef.current.style.boxShadow = "0 20px 60px hsl(28 90% 55% / 0.2), 0 0 0 1px hsl(28 90% 55% / 0.3)"
        }
      }}
    >
      {/* Image area */}
      <div className="relative h-52 bg-muted/20 overflow-hidden">
        {image ? (
          <>
            <Image
              src={image}
              alt={title}
              fill
              className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
          </>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
              {icon}
            </div>
          </div>
        )}

        {/* Top-right badge */}
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-primary/0 border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300">
          <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
        </div>
      </div>

      {/* Content */}
      <div className="p-5" style={{ transform: "translateZ(20px)" }}>
        <h3 className="font-serif text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">{description}</p>

        {specs && specs.length > 0 && (
          <div className="pt-4 border-t border-border/50">
            <ul className="space-y-1.5">
              {specs.map((spec, index) => (
                <li key={index} className="text-xs text-muted-foreground flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                  {spec}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
