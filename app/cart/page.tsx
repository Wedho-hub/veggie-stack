// app/cart/page.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '@/lib/cartContext'
import PageHeader from '@/components/PageHeader'

const categoryEmoji: Record<string, string> = {
  fruit: '🍓',
  vegetable: '🥦',
  gadget: '🥤',
  supplement: '🌿',
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
  }).format(price)
}

export default function CartPage() {
  const { state, removeItem, increment, decrement, clearCart } = useCart()

  // Empty cart state
  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-6">🛒</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
          <p className="text-gray-500 mb-8">Add some fresh produce to get started</p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-full transition-colors"
          >
            Browse the Shop
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    )
  }

  // Delivery fee logic
  const deliveryFee = state.totalPrice >= 500 ? 0 : 65
  const orderTotal = state.totalPrice + deliveryFee

  return (
    <div className="min-h-screen bg-gray-50">

      <PageHeader
        title="Your Cart"
        description={`${state.totalItems} item${state.totalItems !== 1 ? 's' : ''} ready for checkout`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── CART ITEMS ── */}
          <div className="flex-1 space-y-4">

            {/* Clear cart button */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={clearCart}
                className="text-sm text-red-400 hover:text-red-600 transition-colors flex items-center gap-1.5"
              >
                <Trash2 size={14} />
                Clear cart
              </button>
            </div>

            {/* Item rows */}
            {state.items.map(({ product, quantity }) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl border border-gray-100 p-5 flex gap-5 items-center shadow-sm"
              >
                {/* Thumbnail */}
                <div className="relative w-16 h-16 rounded-xl bg-linear-to-br from-green-50 to-emerald-100 flex items-center justify-center text-2xl shrink-0 overflow-hidden">
                  {product.imageUrl ? (
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  ) : (
                    categoryEmoji[product.category]
                  )}
                </div>

                {/* Product info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{product.name}</h3>
                  <p className="text-sm text-gray-500 capitalize">{product.category}</p>
                  {product.farmOrigin && (
                    <p className="text-xs text-gray-400">📍 {product.farmOrigin}</p>
                  )}
                </div>

                {/* Quantity controls */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => decrement(product._id)}
                    aria-label="Decrease quantity"
                    className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:border-green-500 hover:text-green-600 transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-6 text-center font-semibold text-gray-900">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => increment(product._id)}
                    aria-label="Increase quantity"
                    className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:border-green-500 hover:text-green-600 transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Line price */}
                <div className="text-right shrink-0 w-24">
                  <p className="font-bold text-gray-900">
                    {formatPrice(product.price * quantity)}
                  </p>
                  <p className="text-xs text-gray-400">
                    {formatPrice(product.price)} each
                  </p>
                </div>

                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => removeItem(product._id)}
                  className="p-2 text-gray-300 hover:text-red-500 transition-colors shrink-0"
                  aria-label="Remove item"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* ── ORDER SUMMARY ── */}
          <div className="w-full lg:w-80 shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
              <h2 className="font-bold text-gray-900 text-lg mb-5 flex items-center gap-2">
                <ShoppingBag size={20} className="text-green-600" />
                Order Summary
              </h2>

              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal ({state.totalItems} items)</span>
                  <span>{formatPrice(state.totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Delivery</span>
                  <span className={deliveryFee === 0 ? 'text-green-600 font-medium' : ''}>
                    {deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}
                  </span>
                </div>
                {deliveryFee > 0 && (
                  <p className="text-xs text-gray-400">
                    Add {formatPrice(500 - state.totalPrice)} more for free delivery
                  </p>
                )}
                <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-gray-900">
                  <span>Total</span>
                  <span>{formatPrice(orderTotal)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-full transition-colors duration-200 flex items-center justify-center gap-2"
              >
                Proceed to Checkout
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/shop"
                className="block text-center text-sm text-gray-500 hover:text-green-600 mt-4 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}