import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Product } from '@/types'
import AddToCartButton from '@/components/AddToCartButton'

interface FeaturedSpotlightsProps {
  vegetables: Product[]
  fruit: Product[]
  gadgets: Product[]
}

const categoryEmoji: Record<string, string> = {
  fruit: '🍓',
  vegetable: '🥦',
  gadget: '🥤',
  supplement: '🌿',
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(price)
}

function ProductCard({ product, dark }: { product: Product; dark: boolean }) {
  return (
    <div className={`rounded-3xl overflow-hidden ${dark ? 'bg-white/10 border border-white/15' : 'bg-white border border-stone-200 shadow-sm'}`}>
      <div className="relative h-40 bg-linear-to-br from-green-50 to-emerald-100 flex items-center justify-center text-5xl overflow-hidden">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, 240px"
            className="object-cover"
          />
        ) : (
          categoryEmoji[product.category] ?? '📦'
        )}
      </div>
      <div className="p-5">
        <h3 className={`font-bold mb-1 ${dark ? 'text-white' : 'text-gray-900'}`}>{product.name}</h3>
        <p className={`text-sm mb-4 line-clamp-2 leading-snug ${dark ? 'text-white/60' : 'text-gray-500'}`}>
          {product.description}
        </p>
        <div className="flex items-center justify-between gap-2">
          <span className={`font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>{formatPrice(product.price)}</span>
          <AddToCartButton product={product} size="sm" />
        </div>
      </div>
    </div>
  )
}

type Theme = 'green' | 'cream' | 'dark'

interface Spotlight {
  id: string
  badge: string
  heading: string
  description: string
  cta: { label: string; href: string }
  products: Product[]
  theme: Theme
  reverse?: boolean
}

const bgClass: Record<Theme, string> = {
  green: 'bg-linear-to-br from-green-950 via-green-900 to-green-800 text-white',
  cream: 'bg-stone-50 text-gray-900',
  dark: 'bg-gray-950 text-white',
}

const badgeClass: Record<Theme, string> = {
  green: 'bg-white/10 border border-white/20 text-green-200',
  cream: 'bg-green-100 text-green-700',
  dark: 'bg-white/10 border border-white/20 text-green-300',
}

const ctaClass: Record<Theme, string> = {
  green: 'bg-white text-green-900',
  cream: 'bg-green-600 text-white hover:bg-green-700',
  dark: 'bg-white text-gray-900',
}

export default function FeaturedSpotlights({ vegetables, fruit, gadgets }: FeaturedSpotlightsProps) {
  const sections: Spotlight[] = [
    {
      id: 'harvest',
      badge: "Today's Harvest",
      heading: 'Farm-Fresh Greens, Delivered by Lunch',
      description: 'Hand-picked this morning from Stellenbosch farms. Order before 10am for same-day delivery across Cape Town.',
      cta: { label: 'Shop Vegetables', href: '/shop?category=vegetable' },
      products: vegetables,
      theme: 'green',
    },
    {
      id: 'fruit',
      badge: 'Sun-Ripened Fruit',
      heading: 'Sweet, Seasonal Picks From Elgin Valley',
      description: 'Berries, citrus and stone fruit — harvested at peak ripeness and delivered before midday.',
      cta: { label: 'Shop Fruit', href: '/shop?category=fruit' },
      products: fruit,
      theme: 'cream',
      reverse: true,
    },
    {
      id: 'gear',
      badge: 'Kitchen Gear',
      heading: 'Professional Tools for Plant-Based Living',
      description: 'NutriBullets, cold-press juicers and everything you need to blend, juice and thrive every morning.',
      cta: { label: 'Explore Gadgets', href: '/shop?category=gadget' },
      products: gadgets,
      theme: 'dark',
    },
  ]

  return (
    <div>
      {sections.map((s) => (
        <section key={s.id} className={bgClass[s.theme]}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

              <div className={s.reverse ? 'lg:order-2' : ''}>
                <span className={`inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5 ${badgeClass[s.theme]}`}>
                  {s.badge}
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold leading-tight mb-4">
                  {s.heading}
                </h2>
                <p className={`text-base sm:text-lg leading-relaxed mb-8 max-w-md ${s.theme === 'cream' ? 'text-gray-600' : 'text-white/70'}`}>
                  {s.description}
                </p>
                <Link href={s.cta.href}
                  className={`btn-cta inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-sm ${ctaClass[s.theme]}`}>
                  {s.cta.label}
                  <ArrowRight size={16} />
                </Link>
              </div>

              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-5 ${s.reverse ? 'lg:order-1' : ''}`}>
                {s.products.slice(0, 2).map((p) => (
                  <ProductCard key={p._id} product={p} dark={s.theme !== 'cream'} />
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}
