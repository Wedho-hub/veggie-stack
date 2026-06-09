// app/orders/page.tsx
// Server component — reads session and fetches orders on the server
// No loading state needed, data arrives with the HTML

import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import connectDB from '@/lib/mongodb'
import Order from '@/models/Order'
import OrderStatusBadge from '@/components/OrderStatusBadge'
import { ArrowRight, ShoppingBag } from 'lucide-react'
import type { IOrder } from '@/models/Order'
import PageHeader from '@/components/PageHeader'

// Format ZAR price
function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
  }).format(price)
}

// Format date nicely
function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-ZA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

// Server-side data fetch — runs before the page renders
async function getUserOrders(email: string): Promise<IOrder[]> {
  await connectDB()
  // TypeScript: lean() returns plain objects instead of Mongoose documents
  // We cast to IOrder[] since lean strips the Document methods
  const orders = await Order.find({ customerEmail: email })
    .sort({ createdAt: -1 })
    .lean() as unknown as IOrder[]
  return orders
}

export default async function OrdersPage() {
  const session = await auth()

  // Double-check auth — middleware handles this but belt-and-suspenders
  if (!session?.user?.email) {
    redirect('/login?callbackUrl=/orders')
  }

  const orders = await getUserOrders(session.user.email)

  return (
    <div className="min-h-screen bg-gray-50">

      <PageHeader
        title="My Orders"
        description={`${orders.length} order${orders.length !== 1 ? 's' : ''} placed — track and manage your deliveries`}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Empty state */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center">
            <ShoppingBag size={40} className="text-gray-300 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              No orders yet
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              When you place an order, it will appear here.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2.5 rounded-full transition-colors text-sm"
            >
              Start Shopping
              <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id.toString()}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
              >
                {/* Order header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 border-b border-gray-100">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-bold text-gray-900 font-mono text-sm">
                        {order.orderNumber}
                      </span>
                      <OrderStatusBadge status={order.status} />
                    </div>
                    <p className="text-xs text-gray-400">
                      Placed {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900 text-lg">
                      {formatPrice(order.total)}
                    </p>
                    <p className="text-xs text-gray-400 capitalize">
                      {order.paymentMethod} ·{' '}
                      {order.deliveryFee === 0 ? 'Free delivery' : formatPrice(order.deliveryFee) + ' delivery'}
                    </p>
                  </div>
                </div>

                {/* Order items */}
                <div className="px-6 py-4">
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between text-sm"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">
                            {item.category === 'fruit' && '🍓'}
                            {item.category === 'vegetable' && '🥦'}
                            {item.category === 'gadget' && '🥤'}
                            {item.category === 'supplement' && '🌿'}
                          </span>
                          <span className="text-gray-700">{item.name}</span>
                          <span className="text-gray-400">× {item.quantity}</span>
                        </div>
                        <span className="font-medium text-gray-900">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery address */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                  <p className="text-xs text-gray-400 mb-1 font-medium uppercase tracking-wide">
                    Delivery Address
                  </p>
                  <p className="text-sm text-gray-600">
                    {order.deliveryAddress.fullName} ·{' '}
                    {order.deliveryAddress.street},{' '}
                    {order.deliveryAddress.suburb},{' '}
                    {order.deliveryAddress.city},{' '}
                    {order.deliveryAddress.postalCode}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}