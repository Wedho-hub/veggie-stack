'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  FileText,
  Store,
  LogOut,
  ChevronRight,
} from 'lucide-react'
import { signOut } from 'next-auth/react'

interface SidebarLink {
  label: string
  href: string
  icon: React.ReactNode
}

const sidebarLinks: SidebarLink[] = [
  { label: 'Dashboard', href: '/admin', icon: <LayoutDashboard size={18} /> },
  { label: 'Orders', href: '/admin/orders', icon: <ShoppingBag size={18} /> },
  { label: 'Products', href: '/admin/products', icon: <Package size={18} /> },
  { label: 'Blog', href: '/admin/blog', icon: <FileText size={18} /> },
  { label: 'Customers', href: '/admin/customers', icon: <Users size={18} /> },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-56 shrink-0 bg-gray-900 border-r border-gray-800 flex flex-col min-h-screen">

      {/* Logo */}
      <div className="px-5 py-5 border-b border-gray-800">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="Veggie Stack"
            width={28}
            height={28}
            className="shrink-0"
          />
          <span className="text-sm font-bold text-white">
            Veggie<span className="text-green-400">Stack</span>
          </span>
        </Link>
        <span className="text-xs text-gray-500 mt-1 block">Admin Panel</span>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {sidebarLinks.map((link) => {
          const isActive =
            link.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(link.href)

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                isActive
                  ? 'bg-green-600 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                {link.icon}
                {link.label}
              </div>
              {isActive && <ChevronRight size={14} />}
            </Link>
          )
        })}
      </nav>

      {/* Bottom: view store + sign out */}
      <div className="px-3 py-4 border-t border-gray-800 space-y-1">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-all"
        >
          <Store size={18} />
          View Store
        </Link>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: '/' })}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:bg-red-900/30 hover:text-red-400 transition-all"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>

    </aside>
  )
}
