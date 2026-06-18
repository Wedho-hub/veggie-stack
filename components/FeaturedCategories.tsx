import Link from 'next/link'
import Image from 'next/image'
import AnimateIn from '@/components/AnimateIn'

type CategoryName = 'fruit' | 'vegetable' | 'gadget' | 'supplement'

interface Category {
  name: CategoryName
  label: string
  description: string
  image: string
  href: string
  bg: string
  text: string
  emoji: string
  count: number
}

const categories: Category[] = [
  {
    name: 'fruit',
    label: 'Fresh Fruit',
    description: 'Seasonal picks from Western Cape orchards',
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=500&q=85&fit=crop&auto=format',
    href: '/shop?category=fruit',
    bg: 'bg-orange-50',
    text: 'text-orange-700',
    emoji: '🍓',
    count: 4,
  },
  {
    name: 'vegetable',
    label: 'Vegetables',
    description: 'Farm-direct, harvested this morning',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=85&fit=crop&auto=format',
    href: '/shop?category=vegetable',
    bg: 'bg-green-50',
    text: 'text-green-700',
    emoji: '🥦',
    count: 4,
  },
  {
    name: 'gadget',
    label: 'Kitchen Gear',
    description: 'Blenders, juicers and plant-based tools',
    image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=500&q=85&fit=crop&auto=format',
    href: '/shop?category=gadget',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    emoji: '🥤',
    count: 4,
  },
  {
    name: 'supplement',
    label: 'Supplements',
    description: 'Clean, plant-powered daily nutrition',
    image: 'https://images.unsplash.com/photo-1622484212935-b6ee9dbddfd4?w=500&q=85&fit=crop&auto=format',
    href: '/shop?category=supplement',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    emoji: '🌿',
    count: 4,
  },
]

export default function FeaturedCategories() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

      <AnimateIn className="mb-10">
        <h2 className="font-display text-3xl font-bold text-gray-900">Shop by Category</h2>
        <p className="text-gray-500 mt-2">Everything you need for a plant-powered life</p>
      </AnimateIn>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat, i) => (
          <AnimateIn key={cat.name} delay={i * 100}>
            <Link href={cat.href}
              className={`card-lift ${cat.bg} rounded-2xl overflow-hidden block h-full group border-2 border-transparent hover:border-green-400 transition-all duration-200`}>
              <div className="relative h-28 overflow-hidden">
                {/* Emoji fallback shown behind the image */}
                <div className="absolute inset-0 flex items-center justify-center text-4xl bg-gray-100">
                  {cat.emoji}
                </div>
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {/* "Browse →" overlay on hover */}
                <div className="absolute inset-0 bg-green-900/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span className="text-white font-bold text-sm">Browse →</span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-1">
                  <h3 className={`font-bold text-base ${cat.text}`}>{cat.label}</h3>
                  <span className="text-xs bg-white/80 text-gray-500 font-semibold px-2 py-0.5 rounded-full border border-gray-200">
                    {cat.count}
                  </span>
                </div>
                <p className="text-gray-500 text-sm leading-snug">{cat.description}</p>
              </div>
            </Link>
          </AnimateIn>
        ))}
      </div>

    </section>
  )
}
