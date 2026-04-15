import Image from "next/image"

interface ProductCardProps {
  title: string
  description: string
  icon: React.ReactNode
  specs?: string[]
  image?: string
}

export function ProductCard({ title, description, icon, specs, image }: ProductCardProps) {
  return (
    <div className="group bg-white border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Orange top accent */}
      <div className="h-1.5 bg-primary w-full" />

      {image ? (
        <div className="relative h-48 bg-muted/40">
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : (
        <div className="h-48 bg-muted/20 flex items-center justify-center">
          <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
            {icon}
          </div>
        </div>
      )}

      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
            {icon}
          </div>
          <h3 className="font-black text-foreground text-lg leading-tight">{title}</h3>
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed mb-4">{description}</p>

        {specs && specs.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {specs.map((spec, index) => (
              <span
                key={index}
                className="text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded-full font-medium"
              >
                {spec}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
