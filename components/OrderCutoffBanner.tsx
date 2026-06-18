'use client'

import { useEffect, useState } from 'react'
import { X, Truck } from 'lucide-react'

const STORAGE_KEY = 'veggiestack-cutoff-banner-dismissed'

export default function OrderCutoffBanner() {
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    function init() {
      if (sessionStorage.getItem(STORAGE_KEY) === 'true') return

      const now = new Date()
      const sast = new Date(now.getTime() + 2 * 60 * 60 * 1000)
      const cutoff = new Date(sast)
      cutoff.setUTCHours(10, 0, 0, 0)

      setMessage(
        sast.getTime() < cutoff.getTime()
          ? 'Order before 10:00am for same-day delivery across Cape Town.'
          : "Today's 10am cutoff has passed — orders placed now ship for delivery tomorrow."
      )
    }
    init()
  }, [])

  function dismiss() {
    setMessage(null)
    sessionStorage.setItem(STORAGE_KEY, 'true')
  }

  if (!message) return null

  return (
    <div className="relative bg-green-800 text-white text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-center gap-2 text-center">
        <Truck size={15} className="shrink-0 text-green-300" />
        <span className="font-medium">{message}</span>
      </div>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss banner"
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-green-200 hover:text-white transition-colors"
      >
        <X size={16} />
      </button>
    </div>
  )
}
