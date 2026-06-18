'use client'

import { useState } from 'react'
import { Search, Clock, Truck, CheckCircle, XCircle } from 'lucide-react'
import PageHeader from '@/components/PageHeader'

const SUBURBS = [
  'Gardens', 'Sea Point', 'Green Point', 'Camps Bay', 'Tamboerskloof', 'Vredehoek',
  'Woodstock', 'Salt River', 'Observatory', 'Mowbray', 'Rondebosch', 'Newlands',
  'Claremont', 'Wynberg', 'Plumstead', 'Diep River', 'Constantia', 'Tokai',
  'Muizenberg', 'Fish Hoek', 'Noordhoek', 'Hout Bay', 'Milnerton', 'Table View',
  'Century City', 'Pinelands', 'Goodwood', 'Parow', 'Bellville', 'Durbanville',
  'Stellenbosch', 'Somerset West',
]

const feeTiers = [
  { range: 'Orders under R500', fee: 'R50 flat delivery fee' },
  { range: 'Orders over R500', fee: 'Free delivery', highlight: true },
]

export default function DeliveryPage() {
  const [query, setQuery] = useState('')

  const filtered = query.trim()
    ? SUBURBS.filter((s) => s.toLowerCase().includes(query.trim().toLowerCase()))
    : SUBURBS

  const found = query.trim().length > 0

  return (
    <div className="min-h-screen bg-stone-50">
      <PageHeader
        title="Delivery Areas & Hours"
        description="Same-day delivery across Cape Town — check your suburb, fees and cutoff times below."
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Hours + fee tiers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-14">
          <div className="bg-white rounded-3xl border border-stone-200 p-7">
            <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center mb-4">
              <Clock size={22} className="text-green-600" />
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">Delivery Hours</h3>
            <p className="text-gray-600 text-sm">Monday – Saturday, 7:00am – 6:00pm</p>
            <p className="text-gray-500 text-sm mt-2">
              Order before <span className="font-semibold text-green-700">10:00am</span> for same-day
              delivery. Orders placed after 10am are delivered the next day.
            </p>
          </div>
          <div className="bg-white rounded-3xl border border-stone-200 p-7">
            <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center mb-4">
              <Truck size={22} className="text-green-600" />
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">Delivery Fees</h3>
            <ul className="space-y-2">
              {feeTiers.map((t) => (
                <li key={t.range} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{t.range}</span>
                  <span className={`font-semibold ${t.highlight ? 'text-green-600' : 'text-gray-800'}`}>{t.fee}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Suburb lookup */}
        <div className="bg-white rounded-3xl border border-stone-200 p-8">
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-1">Check Your Suburb</h2>
          <p className="text-gray-500 text-sm mb-6">Search to confirm we deliver to your area.</p>

          <div className="relative mb-6 max-w-md">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type your suburb…"
              className="w-full border border-stone-200 rounded-xl pl-11 pr-4 py-3 text-sm bg-stone-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
          </div>

          {found && filtered.length === 0 ? (
            <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 border border-red-100 rounded-xl px-4 py-3">
              <XCircle size={16} />
              We don&apos;t currently deliver to &ldquo;{query}&rdquo;. We&apos;re expanding — check back soon!
            </div>
          ) : found && filtered.length > 0 ? (
            <div className="flex items-center gap-2 text-green-700 text-sm bg-green-50 border border-green-100 rounded-xl px-4 py-3 mb-6">
              <CheckCircle size={16} />
              Good news — we deliver to {filtered.length} matching suburb{filtered.length > 1 ? 's' : ''}.
            </div>
          ) : null}

          <div className="flex flex-wrap gap-2">
            {filtered.map((s) => (
              <span key={s} className="text-sm font-medium text-green-700 bg-green-50 border border-green-100 px-4 py-2 rounded-full">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
