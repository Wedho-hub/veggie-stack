'use client'

import { useState, useEffect } from 'react'
import type { OrderStatus, PaymentMethod, IOrderItem, IDeliveryAddress } from '@/models/Order'
import { RefreshCw } from 'lucide-react'

type OrderData = {
  _id: string
  orderNumber: string
  customerEmail: string
  items: IOrderItem[]
  deliveryAddress: IDeliveryAddress
  subtotal: number
  deliveryFee: number
  total: number
  status: OrderStatus
  paymentMethod: PaymentMethod
  paymentId?: string
  paidAt?: Date
  createdAt: Date
  updatedAt: Date
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(price)
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-ZA', {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
  }).format(new Date(date))
}

const ORDER_STATUSES: OrderStatus[] = [
  'pending', 'payment_initiated', 'paid',
  'processing', 'out_for_delivery', 'delivered',
  'cancelled', 'refunded',
]

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderData[]>([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<Record<string, boolean>>({})
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    let active = true

    fetch('/api/admin/orders')
      .then((res) => res.json())
      .then((data) => {
        if (active) {
          setOrders(data.data ?? [])
          setLoading(false)
        }
      })
      .catch(() => { if (active) setLoading(false) })

    return () => { active = false }
  }, [refreshKey])

  async function updateStatus(orderId: string, status: OrderStatus) {
    setUpdating((prev) => ({ ...prev, [orderId]: true }))

    await fetch(`/api/admin/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })

    setOrders((prev) =>
      prev.map((o) =>
        o._id === orderId ? { ...o, status } : o
      )
    )
    setUpdating((prev) => ({ ...prev, [orderId]: false }))
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Orders</h1>
          <p className="text-gray-400 text-sm mt-1">{orders.length} total orders</p>
        </div>
        <button
          type="button"
          onClick={() => { setLoading(true); setRefreshKey((k) => k + 1) }}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white border border-gray-700 hover:border-gray-500 px-4 py-2 rounded-xl transition-all"
        >
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-gray-800 rounded-2xl h-20 animate-pulse" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-gray-500">
          <p className="font-medium">No orders yet</p>
          <p className="text-sm mt-1">Orders will appear here once customers check out.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-5"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <span className="font-mono text-sm font-bold text-white">
                      {order.orderNumber}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatDate(order.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 truncate">{order.customerEmail}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {order.items.map((i) => `${i.name} ×${i.quantity}`).join(', ')}
                  </p>
                </div>

                <div className="text-right shrink-0 mr-4">
                  <p className="font-bold text-white">{formatPrice(order.total)}</p>
                  <p className="text-xs text-gray-500 capitalize mt-0.5">{order.paymentMethod}</p>
                </div>

                <div className="shrink-0">
                  <select
                    aria-label={`Order status for ${order.orderNumber}`}
                    value={order.status}
                    disabled={updating[order._id]}
                    onChange={(e) =>
                      updateStatus(order._id, e.target.value as OrderStatus)
                    }
                    className="bg-gray-800 border border-gray-700 text-white text-sm rounded-xl px-3 py-2 focus:outline-none focus:border-green-500 cursor-pointer disabled:opacity-50"
                  >
                    {ORDER_STATUSES.map((s) => (
                      <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>
                    ))}
                  </select>
                </div>

              </div>

              <div className="mt-3 pt-3 border-t border-gray-800 text-xs text-gray-500">
                📍 {order.deliveryAddress.fullName} · {order.deliveryAddress.street},{' '}
                {order.deliveryAddress.suburb}, {order.deliveryAddress.city},{' '}
                {order.deliveryAddress.postalCode}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
