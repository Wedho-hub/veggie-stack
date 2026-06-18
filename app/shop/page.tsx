// app/shop/page.tsx
// This runs on the SERVER — no 'use client' needed
// Next.js fetches the data at request time, great for SEO

import Link from 'next/link'
import { SlidersHorizontal } from 'lucide-react'
import type { Product } from '@/types'
import AddToCartButton from '@/components/AddToCartButton'
import Image from 'next/image'
import PageHeader from '@/components/PageHeader'
import DeliveryProgressBanner from '@/components/DeliveryProgressBanner'

// TypeScript: typing the props Next.js passes to page components
// searchParams gives us access to ?category=fruit in the URL
interface ShopPageProps {
  searchParams: Promise<{ category?: string }>
}

// Emoji map — TypeScript record type maps category keys to strings
const categoryEmoji: Record<string, string> = {
  fruit: '🍓',
  vegetable: '🥦',
  gadget: '🥤',
  supplement: '🌿',
}

// Server-side data fetch — runs on the server, never exposed to browser
async function getProducts(category?: string): Promise<Product[]> {
  const params = category ? `?category=${category}` : ''

  // In Next.js server components we use the absolute URL
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'

  const res = await fetch(`${baseUrl}/api/products${params}`, {
    // No caching — always fresh data
    cache: 'no-store',
  })

  if (!res.ok) return []

  const json = await res.json()
  return json.data
}

// Format price in ZAR
function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
  }).format(price)
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const { category } = await searchParams
  const products = await getProducts(category)

  const categories = [
    { value: undefined, label: 'All Products' },
    { value: 'fruit', label: '🍓 Fruit' },
    { value: 'vegetable', label: '🥦 Vegetables' },
    { value: 'gadget', label: '🥤 Kitchen Gear' },
    { value: 'supplement', label: '🌿 Supplements' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">

      <PageHeader
        title={category
          ? `${categoryEmoji[category] ?? ''} ${category.charAt(0).toUpperCase() + category.slice(1)}`
          : 'Shop Fresh Produce'}
        description={`${products.length} product${products.length !== 1 ? 's' : ''} available — sourced fresh from Western Cape farms`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── SIDEBAR FILTERS ── */}
          <aside className="w-full lg:w-56 shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <SlidersHorizontal size={16} className="text-gray-500" />
                <span className="font-semibold text-sm text-gray-700">Filter</span>
              </div>
              <ul className="space-y-1">
                {categories.map((cat) => {
                  const isActive = category === cat.value ||
                    (!category && cat.value === undefined)
                  return (
                    <li key={cat.label}>
                      <Link
                        href={cat.value ? `/shop?category=${cat.value}` : '/shop'}
                        className={`block text-sm px-3 py-2 rounded-xl transition-colors duration-150 ${
                          isActive
                            ? 'bg-green-50 text-green-700 font-semibold'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {cat.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </aside>

          {/* ── PRODUCT GRID ── */}
          <div className="flex-1">
            <DeliveryProgressBanner />
            {products.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-4xl mb-4">🌱</p>
                <p className="text-gray-500">No products found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product, index) => (
                  <div
                    key={product._id}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 overflow-hidden"
                  >
                    {/* Image area */}
<div className="relative h-48 bg-linear-to-br from-green-50 to-emerald-100 flex items-center justify-center text-5xl overflow-hidden">
  {product.imageUrl ? (
    <Image
      src={product.imageUrl}
      alt={product.name}
      fill
      loading={index < 3 ? 'eager' : 'lazy'}
      className="object-cover"
    />
  ) : (
    categoryEmoji[product.category] ?? '📦'
  )}
</div>

                    {/* Card body */}
                    <div className="p-5">
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

                      <h2 className="font-semibold text-gray-900 mb-1">{product.name}</h2>
                      <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-snug">
                        {product.description}
                      </p>

                      {product.farmOrigin && (
                        <p className="text-xs text-gray-400 mb-3">
                          📍 {product.farmOrigin}
                        </p>
                      )}

                      {/* Tags */}
                      {product.tags && product.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {product.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-gray-900">
                          {formatPrice(product.price)}
                        </span>
                        <AddToCartButton product={product} size="sm" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}