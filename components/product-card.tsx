import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

interface ProductCardProps {
  title: string
  description: string
  icon: React.ReactNode
  specs?: string[]
  image?: string
}

export function ProductCard({ title, description, icon, specs, image }: ProductCardProps) {
  return (
    <div className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
      {image ? (
        <div className="relative h-48 bg-muted/50">
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain p-4"
          />
        </div>
      ) : (
        <div className="h-48 bg-muted/30 flex items-center justify-center">
          <div className="w-20 h-20 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
            {icon}
          </div>
        </div>
      )}

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-serif text-xl font-semibold text-foreground">{title}</h3>
          <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-colors flex-shrink-0">
            <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
          </div>
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed mb-4">{description}</p>

        {specs && specs.length > 0 && (
          <div className="pt-4 border-t border-border">
            <ul className="space-y-1">
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
