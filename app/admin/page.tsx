// app/admin/page.tsx
import { auth } from '@/auth'
import connectDB from '@/lib/mongodb'
import Order from '@/models/Order'
import Product from '@/models/Product'
import User from '@/models/User'
import { ShoppingBag, Package, Users, TrendingUp } from 'lucide-react'
import type { IOrder } from '@/models/Order'

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency', currency: 'ZAR',
  }).format(price)
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-ZA', {
    month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  }).format(new Date(date))
}

// TypeScript: typed return shape for dashboard stats
interface DashboardStats {
  totalOrders: number
  totalRevenue: number
  totalProducts: number
  totalCustomers: number
  recentOrders: IOrder[]
}

async function getDashboardStats(): Promise<DashboardStats> {
  await connectDB()

  const [orders, totalProducts, totalCustomers] = await Promise.all([
    Order.find({}).sort({ createdAt: -1 }).lean() as unknown as IOrder[],
    Product.countDocuments(),
    User.countDocuments({ role: 'customer' }),
  ])

  const paidOrders = orders.filter(
    (o) => o.status !== 'cancelled' && o.status !== 'pending'
  )

  const totalRevenue = paidOrders.reduce((sum, o) => sum + o.total, 0)

  return {
    totalOrders: orders.length,
    totalRevenue,
    totalProducts,
    totalCustomers,
    recentOrders: orders.slice(0, 8),
  }
}

export default async function AdminDashboard() {
  const session = await auth()
  const stats = await getDashboardStats()

  const statCards = [
    {
      label: 'Total Orders',
      value: stats.totalOrders,
      icon: <ShoppingBag size={22} className="text-blue-400" />,
      bg: 'bg-blue-500/10 border-blue-500/20',
    },
    {
      label: 'Revenue',
      value: formatPrice(stats.totalRevenue),
      icon: <TrendingUp size={22} className="text-green-400" />,
      bg: 'bg-green-500/10 border-green-500/20',
    },
    {
      label: 'Products',
      value: stats.totalProducts,
      icon: <Package size={22} className="text-orange-400" />,
      bg: 'bg-orange-500/10 border-orange-500/20',
    },
    {
      label: 'Customers',
      value: stats.totalCustomers,
      icon: <Users size={22} className="text-purple-400" />,
      bg: 'bg-purple-500/10 border-purple-500/20',
    },
  ]

  return (
    <div className="p-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">
          Welcome back, {session?.user?.name?.split(' ')[0]}
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-10">
        {statCards.map((card) => (
          <div
            key={card.label}
            className={`border rounded-2xl p-5 ${card.bg}`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                {card.label}
              </span>
              {card.icon}
            </div>
            <p className="text-2xl font-bold text-white">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Recent orders table */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-800">
          <h2 className="font-bold text-white">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                {['Order', 'Customer', 'Items', 'Total', 'Status', 'Date'].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {stats.recentOrders.map((order) => (
                <tr key={order._id.toString()} className="hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-gray-300">
                    {order.orderNumber}
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    {order.customerEmail}
                  </td>
                  <td className="px-6 py-4 text-gray-400">
                    {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                  </td>
                  <td className="px-6 py-4 font-semibold text-white">
                    {formatPrice(order.total)}
                  </td>
                  <td className="px-6 py-4">
                    <StatusPill status={order.status} />
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-xs">
                    {formatDate(order.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}

// Small inline component — no need for a separate file
function StatusPill({ status }: { status: string }) {
  const colours: Record<string, string> = {
    pending: 'bg-gray-700 text-gray-300',
    payment_initiated: 'bg-yellow-900/50 text-yellow-400',
    paid: 'bg-green-900/50 text-green-400',
    processing: 'bg-blue-900/50 text-blue-400',
    out_for_delivery: 'bg-orange-900/50 text-orange-400',
    delivered: 'bg-emerald-900/50 text-emerald-400',
    cancelled: 'bg-red-900/50 text-red-400',
    refunded: 'bg-purple-900/50 text-purple-400',
  }
  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${colours[status] ?? 'bg-gray-700 text-gray-300'}`}>
      {status.replace('_', ' ')}
    </span>
  )
}