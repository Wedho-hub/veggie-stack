'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { ShoppingCart, Menu, X, User, LogOut, ChevronDown, LayoutDashboard } from 'lucide-react'
import { useCart } from '@/lib/cartContext'
import { useSession, signOut } from 'next-auth/react'

const navLinks = [
  { label: 'Shop', href: '/shop' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { state } = useCart()
  const { data: session, status } = useSession()

  return (
    <nav className="bg-white border-b border-green-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/logo.png"
              alt="Veggie Stack logo"
              width={36}
              height={36}
              className="group-hover:scale-110 transition-transform duration-300"
            />
            <span className="text-xl font-bold text-green-800 tracking-tight">
              Veggie<span className="text-green-500">Stack</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}
                className="nav-link text-sm font-medium text-gray-600 hover:text-green-600">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">

            {/* Cart */}
            <Link href="/cart" className="icon-btn relative p-2 text-gray-600 hover:text-green-600">
              <ShoppingCart size={22} />
              {state.totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-bounce">
                  {state.totalItems > 99 ? '99+' : state.totalItems}
                </span>
              )}
            </Link>

            {/* Auth */}
            {status === 'loading' ? (
              <div className="w-8 h-8 rounded-full bg-gray-100 animate-pulse" />
            ) : session ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="btn-pill flex items-center gap-2 bg-green-50 hover:bg-green-100 text-green-800 text-sm font-medium pl-3 pr-2 py-1.5 rounded-full"
                >
                  <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {session.user?.name?.[0]?.toUpperCase()}
                  </div>
                  <span className="hidden sm:block max-w-24 truncate">
                    {session.user?.name?.split(' ')[0]}
                  </span>
                  <ChevronDown size={14} className={`transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl border border-gray-100 shadow-lg py-2 z-50 animate-fade-scale-in">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-xs font-semibold text-gray-900 truncate">{session.user?.name}</p>
                      <p className="text-xs text-gray-400 truncate">{session.user?.email}</p>
                    </div>
                    {session.user?.role === 'admin' && (
                      <Link href="/admin" onClick={() => setUserMenuOpen(false)}
                        className="dropdown-item flex items-center gap-2 px-4 py-2 text-sm text-green-700 hover:bg-green-50 font-semibold">
                        <LayoutDashboard size={14} /> Admin Panel
                      </Link>
                    )}
                    <Link href="/account" onClick={() => setUserMenuOpen(false)}
                      className="dropdown-item flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-green-600">
                      <User size={14} /> My Account
                    </Link>
                    <Link href="/orders" onClick={() => setUserMenuOpen(false)}
                      className="dropdown-item flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-green-600">
                      <ShoppingCart size={14} /> My Orders
                    </Link>
                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <button type="button"
                        onClick={() => { setUserMenuOpen(false); signOut({ callbackUrl: '/' }) }}
                        className="dropdown-item flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 w-full">
                        <LogOut size={14} /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link href="/login"
                  className="nav-link text-sm font-medium text-gray-600 hover:text-green-600 px-3 py-1.5">
                  Sign In
                </Link>
                <Link href="/register"
                  className="btn-cta text-sm font-semibold bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-full">
                  Join Free
                </Link>
              </div>
            )}

            {/* Mobile toggle */}
            <button type="button" onClick={() => setMenuOpen(!menuOpen)}
              className="icon-btn md:hidden p-2 text-gray-600 hover:text-green-600"
              aria-label="Toggle menu">
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-green-100 px-4 py-3 flex flex-col gap-3 animate-slide-down">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
              className="link-nudge text-sm font-medium text-gray-700 hover:text-green-600 py-1">
              {link.label}
            </Link>
          ))}
          {!session && (
            <div className="flex gap-3 pt-2 border-t border-gray-100">
              <Link href="/login" onClick={() => setMenuOpen(false)}
                className="btn-ghost flex-1 text-center text-sm font-medium border border-gray-200 text-gray-700 py-2 rounded-full hover:border-green-300 hover:text-green-700">
                Sign In
              </Link>
              <Link href="/register" onClick={() => setMenuOpen(false)}
                className="btn-cta flex-1 text-center text-sm font-semibold bg-green-600 text-white py-2 rounded-full hover:bg-green-700">
                Join Free
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}
