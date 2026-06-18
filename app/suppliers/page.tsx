'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Blocks, FileCheck2, Megaphone, CheckCircle, Package } from 'lucide-react'

const CATEGORIES = ['Kitchen Gear', 'Supplements', 'Both']

const partnershipModel = [
  {
    icon: <Blocks size={22} className="text-green-600" />,
    title: 'Wholesale or Consignment',
    description: 'Supply stock upfront or on consignment — whichever model fits your business best.',
  },
  {
    icon: <Megaphone size={22} className="text-green-600" />,
    title: 'We List & Market It',
    description: 'Your products get a dedicated listing in our shop, featured in spotlights and our weekly newsletter.',
  },
  {
    icon: <Package size={22} className="text-green-600" />,
    title: 'You Fulfil or We Hold Stock',
    description: 'Choose to drop-ship orders directly, or let our Cape Town hub hold and dispatch stock for you.',
  },
]

const requirements = [
  'Valid South African business registration',
  'NRCS compliance certification for electrical kitchen appliances',
  'Health/safety certification and ingredient disclosure for supplements',
  'Ability to meet agreed minimum order quantities and lead times',
]

export default function SuppliersPage() {
  const [form, setForm] = useState({
    companyName: '', contactName: '', email: '', phone: '', category: CATEGORIES[0], website: '', message: '',
  })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    if (!form.companyName || !form.contactName || !form.email || !form.phone) {
      setError('Please fill in all required fields.')
      return
    }
    if (!emailValid) {
      setError('Please enter a valid email address.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/suppliers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) { const d = await res.json(); setError(d.error || 'Something went wrong.'); return }
      setSent(true)
    } catch {
      setError('Could not submit inquiry. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-stone-50">

      {/* Hero */}
      <div className="relative bg-gray-900 text-white overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&q=85&fit=crop&auto=format"
          alt="Kitchen gadgets and supplements"
          fill loading="eager" sizes="100vw"
          className="object-cover object-center opacity-25"
        />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <Package size={14} className="text-green-300" /> For Gadget & Supplement Importers
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
            Become a Supplier
          </h1>
          <p className="text-gray-200 text-lg max-w-2xl mx-auto leading-relaxed">
            Get your kitchen gear or plant-based supplements in front of thousands of health-conscious
            Cape Town households shopping with VeggieStack every week.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {['🥤 Blenders & Juicers', '🍱 Storage & Prep Tools', '🌿 Powders & Greens', '💊 Capsules & Tablets'].map((c) => (
            <span key={c} className="bg-white border border-stone-200 text-gray-700 text-sm font-semibold px-5 py-2.5 rounded-full">
              {c}
            </span>
          ))}
        </div>

        {/* Partnership model */}
        <div className="mb-16">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-10">Our Partnership Model</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {partnershipModel.map((p) => (
              <div key={p.title} className="card-lift bg-white rounded-3xl border border-stone-200 p-7">
                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center mb-4">
                  {p.icon}
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{p.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Requirements */}
        <div className="bg-gray-900 rounded-3xl p-8 text-white mb-16">
          <div className="flex items-center gap-3 mb-5">
            <FileCheck2 size={22} className="text-green-300" />
            <h3 className="font-bold text-lg">What You&apos;ll Need</h3>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {requirements.map((r) => (
              <li key={r} className="flex gap-2.5 text-sm text-gray-300 leading-relaxed">
                <CheckCircle size={16} className="text-green-400 shrink-0 mt-0.5" />
                {r}
              </li>
            ))}
          </ul>
        </div>

        {/* Inquiry form */}
        <div className="bg-white rounded-3xl border border-stone-200 p-8 max-w-2xl mx-auto">
          {sent ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-5">
                <CheckCircle size={36} className="text-green-600" />
              </div>
              <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Inquiry received!</h2>
              <p className="text-gray-500 max-w-sm">
                Thanks for your interest in supplying VeggieStack. Our partnerships team will review your
                inquiry and be in touch within 3–5 business days.
              </p>
              <button
                type="button"
                onClick={() => { setSent(false); setForm({ companyName: '', contactName: '', email: '', phone: '', category: CATEGORIES[0], website: '', message: '' }) }}
                className="mt-8 text-green-600 font-semibold hover:underline text-sm"
              >
                Submit another inquiry
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-extrabold text-gray-900 mb-1">Supplier Inquiry</h2>
              <p className="text-gray-500 text-sm mb-7">Tell us about your products — it takes two minutes.</p>

              {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3 mb-5">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-semibold text-gray-700 mb-1.5">Company Name *</label>
                    <input id="companyName" name="companyName" value={form.companyName} onChange={handleChange} required
                      className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm bg-stone-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition" />
                  </div>
                  <div>
                    <label htmlFor="supplier-contactName" className="block text-sm font-semibold text-gray-700 mb-1.5">Contact Name *</label>
                    <input id="supplier-contactName" name="contactName" value={form.contactName} onChange={handleChange} required
                      className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm bg-stone-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="supplier-email" className="block text-sm font-semibold text-gray-700 mb-1.5">Email *</label>
                    <input id="supplier-email" type="email" name="email" value={form.email} onChange={handleChange} required
                      className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm bg-stone-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition" />
                  </div>
                  <div>
                    <label htmlFor="supplier-phone" className="block text-sm font-semibold text-gray-700 mb-1.5">Phone *</label>
                    <input id="supplier-phone" type="tel" name="phone" value={form.phone} onChange={handleChange} required
                      className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm bg-stone-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-1.5">Product Category</label>
                    <select id="category" name="category" value={form.category} onChange={handleChange}
                      className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm bg-stone-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition appearance-none cursor-pointer">
                      {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="website" className="block text-sm font-semibold text-gray-700 mb-1.5">Website / Catalog Link</label>
                    <input id="website" name="website" value={form.website} onChange={handleChange} placeholder="https://"
                      className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm bg-stone-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition" />
                  </div>
                </div>

                <div>
                  <label htmlFor="supplier-message" className="block text-sm font-semibold text-gray-700 mb-1.5">Tell Us About Your Products</label>
                  <textarea id="supplier-message" name="message" value={form.message} onChange={handleChange} rows={5}
                    placeholder="Product range, certifications, minimum order quantities…"
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm bg-stone-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition resize-none" />
                </div>

                <button type="submit" disabled={loading}
                  className="w-full sm:w-auto bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-bold px-8 py-3.5 rounded-full transition-colors">
                  {loading ? 'Submitting…' : 'Submit Inquiry'}
                </button>
              </form>
            </>
          )}
        </div>

        <p className="text-center text-sm text-gray-500 mt-10">
          Run a farm instead?{' '}
          <Link href="/farms" className="text-green-600 font-semibold hover:underline">Partner With Us →</Link>
        </p>
      </div>
    </div>
  )
}
