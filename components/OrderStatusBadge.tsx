// components/OrderStatusBadge.tsx
import type { OrderStatus } from '@/models/Order'

interface OrderStatusBadgeProps {
  status: OrderStatus
}

// TypeScript: Record maps every possible OrderStatus to a style object
// If you add a new status to the union type and forget to add it here,
// TypeScript will underline it red immediately
const statusConfig: Record<OrderStatus, { label: string; classes: string; emoji: string }> = {
  pending: {
    label: 'Pending',
    emoji: '🕐',
    classes: 'bg-gray-100 text-gray-600',
  },
  payment_initiated: {
    label: 'Payment Processing',
    emoji: '💳',
    classes: 'bg-yellow-50 text-yellow-700',
  },
  paid: {
    label: 'Paid',
    emoji: '✅',
    classes: 'bg-green-50 text-green-700',
  },
  processing: {
    label: 'Being Packed',
    emoji: '📦',
    classes: 'bg-blue-50 text-blue-700',
  },
  out_for_delivery: {
    label: 'Out for Delivery',
    emoji: '🚚',
    classes: 'bg-orange-50 text-orange-700',
  },
  delivered: {
    label: 'Delivered',
    emoji: '🎉',
    classes: 'bg-emerald-50 text-emerald-700',
  },
  cancelled: {
    label: 'Cancelled',
    emoji: '❌',
    classes: 'bg-red-50 text-red-600',
  },
  refunded: {
    label: 'Refunded',
    emoji: '↩️',
    classes: 'bg-purple-50 text-purple-600',
  },
}

export default function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const config = statusConfig[status]
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${config.classes}`}>
      <span>{config.emoji}</span>
      {config.label}
    </span>
  )
}