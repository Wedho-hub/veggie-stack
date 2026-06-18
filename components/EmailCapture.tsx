'use client'

import { useState } from 'react'
import { CheckCircle } from 'lucide-react'

export default function EmailCapture() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!valid) {
      setError('Please enter a valid email address.')
      return
    }
    setError('')
    setSubmitted(true)
  }

  return (
    <section className="bg-linear-to-br from-green-600 to-green-800 py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        {submitted ? (
          <div className="flex flex-col items-center py-6">
            <CheckCircle size={40} className="mb-4" />
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold mb-2">You&apos;re in! 🎉</h2>
            <p className="text-green-100">Check your inbox for your R50 discount code.</p>
          </div>
        ) : (
          <>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold mb-3">
              Get R50 Off Your First Box 🌿
            </h2>
            <p className="text-green-100 mb-7">
              Join our list for fresh deals, recipes and first access to seasonal boxes.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError('') }}
                placeholder="your@email.com"
                required
                className="flex-1 bg-white/95 text-gray-900 placeholder:text-gray-400 text-sm px-5 py-3.5 rounded-full focus:outline-none focus:ring-2 focus:ring-white transition"
              />
              <button
                type="submit"
                className="btn-cta bg-white text-green-800 font-bold text-sm px-7 py-3.5 rounded-full whitespace-nowrap"
              >
                Claim My Discount
              </button>
            </form>
            {error && <p className="text-amber-200 text-sm mt-3">{error}</p>}
            <p className="text-green-200 text-xs mt-5">
              No spam, ever. Unsubscribe anytime. Discount applies to first orders over R250.
            </p>
          </>
        )}
      </div>
    </section>
  )
}
