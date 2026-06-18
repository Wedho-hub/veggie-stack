'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Product } from '@/types'
import AnimateIn from '@/components/AnimateIn'

const mockProducts: Product[] = [
  {
    _id: '1',
    name: 'Mixed Salad Box',
    description: 'Seasonal greens, rocket, spinach — harvested this morning',
    price: 89,
    category: 'vegetable',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=85&fit=crop&auto=format',
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
    imageUrl: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=800&q=85&fit=crop&auto=format',
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
    imageUrl: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=800&q=85&fit=crop&auto=format',
    inStock: true,
    createdAt: new Date(),
  },
  {
    _id: '4',
    name: 'Organic Spirulina',
    description: 'Pure spirulina powder, 250g — South African sourced',
    price: 180,
    category: 'supplement',
    imageUrl: 'https://images.unsplash.com/photo-1622484212935-b6ee9dbddfd4?w=800&q=85&fit=crop&auto=format',
    inStock: false,
    createdAt: new Date(),
  },
]

const emojiMap: Record<string, string> = {
  fruit: '🍓',
  vegetable: '🥦',
  gadget: '🥤',
  supplement: '🌿',
}

function ProductCard({ product }: { product: Product }) {
  const formattedPrice = new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
  }).format(product.price)

  return (
    <div className="card-lift bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group flex flex-col h-full">

      <div className="relative bg-linear-to-br from-green-50 to-emerald-100 h-48 overflow-hidden">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl transition-transform duration-500 group-hover:scale-105">
            {emojiMap[product.category]}
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
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
        <p className="text-sm text-gray-500 mb-4 leading-snug line-clamp-2 flex-1">
          {product.description}
        </p>

        {product.farmOrigin && (
          <p className="text-xs text-gray-400 mb-3">📍 {product.farmOrigin}</p>
        )}

        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg font-bold text-gray-900">{formattedPrice}</span>
          <button
            type="button"
            disabled={!product.inStock}
            className="btn-cta flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none text-white text-sm font-medium px-4 py-2 rounded-full"
          >
            <ShoppingCart size={15} />
            Add
          </button>
        </div>
      </div>
    </div>
  )
}

export default function FeaturedProducts() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const scrollToIndex = useCallback((index: number) => {
    const el = scrollRef.current
    if (!el) return
    const child = el.children[index] as HTMLElement
    if (!child) return
    el.scrollTo({ left: child.offsetLeft, behavior: 'smooth' })
    setActiveIndex(index)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const handleScroll = () => {
      const children = Array.from(el.children) as HTMLElement[]
      let closest = 0
      let minDist = Infinity
      children.forEach((child, i) => {
        const dist = Math.abs(child.offsetLeft - el.scrollLeft)
        if (dist < minDist) { minDist = dist; closest = i }
      })
      setActiveIndex(closest)
    }

    el.addEventListener('scroll', handleScroll, { passive: true })
    return () => el.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="bg-gray-50 py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <AnimateIn className="flex items-center justify-between mb-8 px-4 sm:px-6 lg:px-8">
          <div>
            <h2 className="font-display text-3xl font-bold text-gray-900">Fresh Today</h2>
            <p className="text-gray-500 mt-1">Harvested this morning, at your door by lunch</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/shop"
              className="hidden sm:inline-flex items-center gap-1.5 text-green-600 font-semibold text-sm hover:text-green-700 transition-colors group">
              View all
              <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
            <div className="flex gap-2">
              <button type="button" aria-label="Previous product"
                onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
                disabled={activeIndex === 0}
                className="icon-btn w-9 h-9 rounded-full border-2 border-gray-200 hover:border-green-400 hover:text-green-600 disabled:opacity-30 disabled:transform-none flex items-center justify-center text-gray-500 transition-colors">
                <ChevronLeft size={16} />
              </button>
              <button type="button" aria-label="Next product"
                onClick={() => scrollToIndex(Math.min(mockProducts.length - 1, activeIndex + 1))}
                disabled={activeIndex === mockProducts.length - 1}
                className="icon-btn w-9 h-9 rounded-full border-2 border-gray-200 hover:border-green-400 hover:text-green-600 disabled:opacity-30 disabled:transform-none flex items-center justify-center text-gray-500 transition-colors">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </AnimateIn>

        {/* Scroll track */}
        <div
          ref={scrollRef}
          className="no-scrollbar flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 px-4 sm:px-6 lg:px-8"
        >
          {mockProducts.map((product) => (
            <div key={product._id} className="snap-start shrink-0 w-[80vw] sm:w-[45vw] lg:w-[calc(25%-15px)]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-5">
          {mockProducts.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex ? 'bg-green-500 w-6' : 'bg-gray-300 w-2 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
