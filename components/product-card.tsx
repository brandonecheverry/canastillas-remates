import { ArrowUpRight } from "lucide-react"

interface ProductCardProps {
  title: string
  description: string
  icon: React.ReactNode
  specs?: string[]
}

export function ProductCard({ title, description, icon, specs }: ProductCardProps) {
  return (
    <div className="group bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
      <div className="flex items-start justify-between mb-4">
        <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
          {icon}
        </div>
        <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-colors">
          <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
        </div>
      </div>

      <h3 className="font-serif text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-4">{description}</p>

      {specs && specs.length > 0 && (
        <div className="pt-4 border-t border-border">
          <ul className="space-y-1">
            {specs.map((spec, index) => (
              <li key={index} className="text-xs text-muted-foreground">
                {spec}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
