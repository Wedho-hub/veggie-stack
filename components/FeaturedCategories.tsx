// components/FeaturedCategories.tsx
import Link from 'next/link'

// TypeScript: a union type — category can ONLY be one of these exact strings
type CategoryName = 'fruit' | 'vegetable' | 'gadget' | 'supplement'

interface Category {
  name: CategoryName
  label: string
  description: string
  emoji: string
  href: string
  bg: string
  text: string
}

const categories: Category[] = [
  {
    name: 'fruit',
    label: 'Fresh Fruit',
    description: 'Seasonal picks from Western Cape orchards',
    emoji: '🍓',
    href: '/shop?category=fruit',
    bg: 'bg-orange-50 hover:bg-orange-100',
    text: 'text-orange-700',
  },
  {
    name: 'vegetable',
    label: 'Vegetables',
    description: 'Farm-direct, harvested this morning',
    emoji: '🥦',
    href: '/shop?category=vegetable',
    bg: 'bg-green-50 hover:bg-green-100',
    text: 'text-green-700',
  },
  {
    name: 'gadget',
    label: 'Kitchen Gear',
    description: 'Blenders, juicers and plant-based tools',
    emoji: '🥤',
    href: '/shop?category=gadget',
    bg: 'bg-blue-50 hover:bg-blue-100',
    text: 'text-blue-700',
  },
  {
    name: 'supplement',
    label: 'Supplements',
    description: 'Clean, plant-powered daily nutrition',
    emoji: '🌿',
    href: '/shop?category=supplement',
    bg: 'bg-emerald-50 hover:bg-emerald-100',
    text: 'text-emerald-700',
  },
]

export default function FeaturedCategories() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

      {/* Section header */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
        <p className="text-gray-500 mt-2">Everything you need for a plant-powered life</p>
      </div>

      {/* Category grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={cat.href}
            className={`${cat.bg} rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md group`}
          >
            <span className="text-4xl block mb-4">{cat.emoji}</span>
            <h3 className={`font-bold text-base ${cat.text} mb-1`}>{cat.label}</h3>
            <p className="text-gray-500 text-sm leading-snug">{cat.description}</p>
          </Link>
        ))}
      </div>

    </section>
  )
}