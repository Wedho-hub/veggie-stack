'use client'

import { useCart } from '@/lib/cartContext'

const FREE_DELIVERY_THRESHOLD = 500

// Static strings so Tailwind v4 content-scanner picks them all up at build time
const PROGRESS_WIDTHS = [
  'w-0',      'w-[5%]',  'w-[10%]', 'w-[15%]', 'w-[20%]',
  'w-[25%]',  'w-[30%]', 'w-[35%]', 'w-[40%]', 'w-[45%]',
  'w-1/2',    'w-[55%]', 'w-[60%]', 'w-[65%]', 'w-[70%]',
  'w-[75%]',  'w-[80%]', 'w-[85%]', 'w-[90%]', 'w-[95%]',
  'w-full',
]

export default function DeliveryProgressBanner() {
  const { state } = useCart()

  const total = state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const remaining = Math.max(0, FREE_DELIVERY_THRESHOLD - total)
  const progressPct = Math.min(100, (total / FREE_DELIVERY_THRESHOLD) * 100)
  const widthClass = PROGRESS_WIDTHS[Math.round(progressPct / 5)]

  if (total === 0) {
    return (
      <div className="bg-green-50 border border-green-100 rounded-2xl px-5 py-3.5 mb-6 text-sm text-green-800 font-medium">
        🚚 Spend R500 or more for <strong>free delivery</strong> across Cape Town.
      </div>
    )
  }

  if (remaining === 0) {
    return (
      <div className="bg-green-600 text-white rounded-2xl px-5 py-3.5 mb-6 text-sm font-semibold">
        🎉 You&apos;ve unlocked <strong>free delivery!</strong>
      </div>
    )
  }

  return (
    <div className="bg-green-50 border border-green-100 rounded-2xl px-5 py-4 mb-6">
      <p className="text-sm text-green-800 font-medium mb-2">
        🚚 Add <strong>R{remaining.toFixed(2)}</strong> more for free delivery
      </p>
      <div className="h-2 bg-green-200 rounded-full overflow-hidden">
        <div className={`h-2 bg-green-600 rounded-full transition-all duration-500 ${widthClass}`} />
      </div>
    </div>
  )
}
