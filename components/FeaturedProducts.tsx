// components/FeaturedProducts.tsx
import Link from 'next/link'
import { ShoppingCart, ArrowRight } from 'lucide-react'

// Importing our shared type from types/index.ts
// This is the TypeScript payoff — one definition, used everywhere
import type { Product } from '@/types'

// Temporary hardcoded products — we'll replace with real DB data later
// TypeScript: Product[] means this must be an array of Product objects
const mockProducts: Product[] = [
  {
    _id: '1',
    name: 'Mixed Salad Box',
    description: 'Seasonal greens, rocket, spinach — harvested this morning',
    price: 89,
    category: 'vegetable',
    imageUrl: '',
    inStock: true,
    farmOrigin: 'Stellenbosch',
    createdAt: new Date(),
  },
  {
    _id: '2',
    name: 'Cape Berry Punnet',
    description: 'Strawberries, blueberries and raspberries, locally grown',
    price: 65,
    category: 'fruit',
    imageUrl: '',
    inStock: true,
    farmOrigin: 'Elgin Valley',
    createdAt: new Date(),
  },
  {
    _id: '3',
    name: 'NutriBullet Pro',
    description: 'High-speed blender for smoothies, soups and nut milks',
    price: 1299,
    category: 'gadget',
    imageUrl: '',
    inStock: true,
    createdAt: new Date(),
  },
  {
    _id: '4',
    name: 'Organic Spirulina',
    description: 'Pure spirulina powder, 250g — South African sourced',
    price: 180,
    category: 'supplement',
    imageUrl: '',
    inStock: false,
    createdAt: new Date(),
  },
]

// TypeScript: defining props for a child component
interface ProductCardProps {
  product: Product
}

// A small internal component — we'll extract this into its own file later
function ProductCard({ product }: ProductCardProps) {

  // Format price in South African Rand
  const formattedPrice = new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
  }).format(product.price)

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 overflow-hidden group">

      {/* Product image placeholder */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-100 h-48 flex items-center justify-center text-5xl">
        {product.category === 'fruit' && '🍓'}
        {product.category === 'vegetable' && '🥦'}
        {product.category === 'gadget' && '🥤'}
        {product.category === 'supplement' && '🌿'}
      </div>

      {/* Card body */}
      <div className="p-5">

        {/* Category tag + stock badge */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-green-600 uppercase tracking-wide">
            {product.category}
          </span>
          {!product.inStock && (
            <span className="text-xs bg-red-50 text-red-500 px-2 py-0.5 rounded-full font-medium">
              Out of stock
            </span>
          )}
        </div>

        <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-4 leading-snug line-clamp-2">
          {product.description}
        </p>

        {product.farmOrigin && (
          <p className="text-xs text-gray-400 mb-3">📍 {product.farmOrigin}</p>
        )}

        {/* Price + Add to cart */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">{formattedPrice}</span>
          <button
            disabled={!product.inStock}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-200 disabled:cursor-not-allowed text-white text-sm font-medium px-4 py-2 rounded-full transition-colors duration-200"
          >
            <ShoppingCart size={15} />
            Add
          </button>
        </div>

      </div>
    </div>
  )
}

// Main exported component
export default function FeaturedProducts() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Fresh Today</h2>
            <p className="text-gray-500 mt-2">Harvested this morning, at your door by lunch</p>
          </div>
          <Link
            href="/shop"
            className="hidden sm:inline-flex items-center gap-2 text-green-600 font-semibold text-sm hover:gap-3 transition-all duration-200"
          >
            View all <ArrowRight size={16} />
          </Link>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

      </div>
    </section>
  )
}