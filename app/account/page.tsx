// app/account/page.tsx
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import connectDB from '@/lib/mongodb'
import Order from '@/models/Order'
import User from '@/models/User'
import Link from 'next/link'
import OrderStatusBadge from '@/components/OrderStatusBadge'
import {
  User as UserIcon,
  ShoppingBag,
  ArrowRight,
  Mail,
  Calendar,
  Package,
} from 'lucide-react'
import type { IOrder } from '@/models/Order'
import type { IUser } from '@/models/User'
import PageHeader from '@/components/PageHeader'

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency', currency: 'ZAR',
  }).format(price)
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-ZA', {
    year: 'numeric', month: 'long', day: 'numeric',
  }).format(new Date(date))
}

// Fetch both user profile and recent orders in parallel
// TypeScript: Promise.all with typed tuple return
async function getAccountData(email: string): Promise<{
  user: IUser | null
  orders: IOrder[]
  totalSpent: number
}> {
  await connectDB()

  // Run both queries at the same time — faster than sequential awaits
  const [user, orders] = await Promise.all([
    User.findOne({ email }).lean() as unknown as IUser,
    Order.find({ customerEmail: email })
      .sort({ createdAt: -1 })
      .limit(5)
      .lean() as unknown as IOrder[],
  ])

  const totalSpent = orders
    .filter((o) => o.status !== 'cancelled' && o.status !== 'refunded')
    .reduce((sum, o) => sum + o.total, 0)

  return { user, orders, totalSpent }
}

export default async function AccountPage() {
  const session = await auth()

  if (!session?.user?.email) {
    redirect('/login?callbackUrl=/account')
  }

  const { user, orders, totalSpent } = await getAccountData(session.user.email)

  // Stats to display at the top
  const stats = [
    {
      label: 'Total Orders',
      value: orders.length,
      icon: <ShoppingBag size={20} className="text-green-600" />,
    },
    {
      label: 'Total Spent',
      value: formatPrice(totalSpent),
      icon: <Package size={20} className="text-green-600" />,
    },
    {
      label: 'Member Since',
      value: user?.createdAt ? formatDate(user.createdAt) : '—',
      icon: <Calendar size={20} className="text-green-600" />,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">

      <PageHeader
        title={`Hello, ${session.user.name?.split(' ')[0]}`}
        description={session.user.email ?? 'Manage your account and view your orders'}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4"
            >
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center shrink-0">
                {stat.icon}
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">{stat.label}</p>
                <p className="font-bold text-gray-900 text-base">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main grid — profile + recent orders */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── PROFILE CARD ── */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
                <UserIcon size={18} className="text-green-600" />
                Profile
              </h2>

              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">
                    Full Name
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    {session.user.name}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">
                    Email
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    {session.user.email}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">
                    Account Type
                  </p>
                  <span className="inline-flex items-center text-xs font-semibold bg-green-50 text-green-700 px-2.5 py-1 rounded-full capitalize">
                    {session.user.role || 'customer'}
                  </span>
                </div>
              </div>

              {/* We'll add edit profile functionality later */}
              <button className="w-full mt-6 border border-gray-200 hover:border-green-500 hover:text-green-600 text-gray-600 text-sm font-medium py-2.5 rounded-full transition-colors">
                Edit Profile
              </button>
            </div>

            {/* Quick links */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mt-4">
              <h2 className="font-bold text-gray-900 mb-4">Quick Links</h2>
              <div className="space-y-1">
                {[
                  { label: 'All My Orders', href: '/orders' },
                  { label: 'Shop Fresh Produce', href: '/shop?category=vegetable' },
                  { label: 'Browse the Blog', href: '/blog' },
                  { label: 'Delivery Info', href: '/delivery' },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center justify-between text-sm text-gray-600 hover:text-green-600 py-2 border-b border-gray-50 last:border-0 transition-colors group"
                  >
                    {link.label}
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* ── RECENT ORDERS ── */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-gray-900 flex items-center gap-2">
                  <ShoppingBag size={18} className="text-green-600" />
                  Recent Orders
                </h2>
                <Link
                  href="/orders"
                  className="text-sm text-green-600 font-medium hover:gap-2 inline-flex items-center gap-1 transition-all"
                >
                  View all <ArrowRight size={14} />
                </Link>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-10">
                  <ShoppingBag size={32} className="text-gray-200 mx-auto mb-3" />
                  <p className="text-gray-400 text-sm">No orders yet</p>
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-1.5 text-sm text-green-600 font-medium mt-3 hover:underline"
                  >
                    Start shopping <ArrowRight size={13} />
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((order) => (
                    <div
                      key={order._id.toString()}
                      className="border border-gray-100 rounded-xl p-4 hover:border-green-200 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div>
                          <p className="font-mono text-xs font-semibold text-gray-700">
                            {order.orderNumber}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            {formatDate(order.createdAt)}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="font-bold text-gray-900 text-sm">
                            {formatPrice(order.total)}
                          </p>
                          <div className="mt-1">
                            <OrderStatusBadge status={order.status} />
                          </div>
                        </div>
                      </div>

                      {/* Items summary */}
                      <p className="text-xs text-gray-500 line-clamp-1">
                        {order.items.map((item) =>
                          `${item.name} ×${item.quantity}`
                        ).join(', ')}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}