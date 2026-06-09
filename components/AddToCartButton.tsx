'use client'

import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/lib/cartContext'
import type { Product } from '@/types'

interface AddToCartButtonProps {
  product: Product
  size?: 'sm' | 'md'
}

export default function AddToCartButton({ product, size = 'md' }: AddToCartButtonProps) {
  const { addItem } = useCart()

  const isSmall = size === 'sm'

  return (
    <button
      type="button"
      disabled={!product.inStock}
      onClick={() => addItem(product)}
      className={`flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-200 disabled:cursor-not-allowed text-white font-medium rounded-full transition-colors duration-200 ${
        isSmall ? 'text-sm px-4 py-2' : 'text-base px-5 py-2.5'
      }`}
    >
      <ShoppingCart size={isSmall ? 15 : 18} />
      Add
    </button>
  )
}
