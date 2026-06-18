'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { Eye, EyeOff } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()

  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      })

      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Registration failed'); setLoading(false); return }

      const result = await signIn('credentials', { email: form.email, password: form.password, redirect: false })
      if (result?.error) { router.push('/login'); return }

      router.push('/')
      router.refresh()
    } catch {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 flex">

      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-green-800 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute top-10 left-10 w-48 h-48 rounded-full bg-white/5" />
        <div className="absolute bottom-16 right-8 w-64 h-64 rounded-full bg-white/5" />
        <div className="absolute top-1/2 left-1/3 w-32 h-32 rounded-full bg-green-600/30" />
        <div className="relative text-center text-white max-w-xs">
          <Link href="/" className="inline-flex flex-col items-center gap-3 mb-10">
            <Image src="/logo.png" alt="Veggie Stack" width={80} height={80} className="drop-shadow-xl" />
            <span className="font-display text-3xl font-extrabold tracking-tight">
              Veggie<span className="text-green-300">Stack</span>
            </span>
          </Link>
          <p className="text-green-100 text-lg leading-relaxed">
            Join thousands of Cape Town households eating fresher, greener, better.
          </p>
          <div className="mt-10 space-y-3 text-left">
            {['🚚 Same-day delivery in Cape Town', '🌿 100% plant-based selection', '🥕 Direct from local farms'].map((b) => (
              <div key={b} className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2.5 text-sm text-green-50">
                {b}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2">
              <Image src="/logo.png" alt="Veggie Stack" width={40} height={40} />
              <span className="font-display text-2xl font-extrabold text-green-800">
                Veggie<span className="text-green-500">Stack</span>
              </span>
            </Link>
          </div>

          <h1 className="font-display text-3xl font-extrabold text-gray-900 mb-1">Create your account</h1>
          <p className="text-gray-500 mb-8">Fresh produce at your door, starting today</p>

          <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-8">

            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3 mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="reg-name" className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
                <input
                  id="reg-name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Jane Smith"
                  className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition bg-stone-50"
                />
              </div>

              <div>
                <label htmlFor="reg-email" className="block text-sm font-semibold text-gray-700 mb-1.5">Email address</label>
                <input
                  id="reg-email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition bg-stone-50"
                />
              </div>

              <div>
                <label htmlFor="reg-password" className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <input
                    id="reg-password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    placeholder="Min. 8 characters"
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition bg-stone-50 pr-11"
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="reg-confirm" className="block text-sm font-semibold text-gray-700 mb-1.5">Confirm Password</label>
                <input
                  id="reg-confirm"
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Repeat your password"
                  className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition bg-stone-50"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-bold py-3.5 rounded-full transition-colors mt-2"
              >
                {loading ? 'Creating account…' : 'Create Account'}
              </button>
            </form>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-green-600 font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
