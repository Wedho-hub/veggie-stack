'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ClipboardCheck, Handshake, Truck, CheckCircle, Leaf } from 'lucide-react'

const PRODUCE_TYPES = ['Fruit', 'Vegetables', 'Herbs', 'Mixed / Other']

const steps = [
  {
    icon: <ClipboardCheck size={24} />,
    title: 'Apply',
    description: 'Tell us about your farm, what you grow, and how much you can supply weekly.',
  },
  {
    icon: <Handshake size={24} />,
    title: 'We Verify & Visit',
    description: 'Our team reviews your application and arranges a farm visit to confirm growing practices and capacity.',
  },
  {
    icon: <Truck size={24} />,
    title: 'Start Fulfilling Orders',
    description: 'Once onboarded, we collect your produce on a fixed schedule and you start earning from every box we pack.',
  },
]

const criteria = [
  'Located within the Western Cape, ideally within 2 hours of Cape Town',
  'Able to harvest and hand off produce on a consistent weekly schedule',
  'Sustainable or chemical-free growing practices preferred',
  'Willing to undergo a short onboarding visit and quality check',
]

const benefits = [
  'Guaranteed weekly off-take — know your volumes in advance',
  'Fair, transparent pricing with no big-retail listing fees',
  'Marketing exposure to VeggieStack\'s Cape Town customer base',
  'Flexible volumes that scale with your harvest',
]

export default function FarmsPage() {
  const [form, setForm] = useState({
    farmName: '', contactName: '', email: '', phone: '', location: '', produceType: PRODUCE_TYPES[0], weeklyVolume: '', message: '',
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
    if (!form.farmName || !form.contactName || !form.email || !form.phone || !form.location) {
      setError('Please fill in all required fields.')
      return
    }
    if (!emailValid) {
      setError('Please enter a valid email address.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/farms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) { const d = await res.json(); setError(d.error || 'Something went wrong.'); return }
      setSent(true)
    } catch {
      setError('Could not submit application. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-stone-50">

      {/* Hero */}
      <div className="relative bg-green-900 text-white overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=85&fit=crop&auto=format"
          alt="Farm rows at sunrise"
          fill loading="eager" sizes="100vw"
          className="object-cover object-center opacity-30"
        />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <Leaf size={14} className="text-green-300" /> For Farm Owners
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
            Partner With Us
          </h1>
          <p className="text-green-100 text-lg max-w-2xl mx-auto leading-relaxed">
            Grow it, we&apos;ll sell it. Join a network of Western Cape farms supplying fresh produce
            directly to Cape Town households — no big-retail listing fees, no middlemen.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* 3-step process */}
        <div className="mb-16">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-10">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <div key={step.title} className="card-lift bg-white rounded-3xl border border-stone-200 p-7 text-center">
                <div className="w-14 h-14 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  {step.icon}
                </div>
                <p className="text-xs font-bold text-green-600 mb-1">STEP {i + 1}</p>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Criteria + Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          <div className="bg-white rounded-3xl border border-stone-200 p-7">
            <h3 className="font-bold text-gray-900 text-lg mb-4">What We Look For</h3>
            <ul className="space-y-3">
              {criteria.map((c) => (
                <li key={c} className="flex gap-2.5 text-sm text-gray-600 leading-relaxed">
                  <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-green-800 rounded-3xl p-7 text-white">
            <h3 className="font-bold text-lg mb-4">Why Partner With VeggieStack</h3>
            <ul className="space-y-3">
              {benefits.map((b) => (
                <li key={b} className="flex gap-2.5 text-sm text-green-100 leading-relaxed">
                  <CheckCircle size={16} className="text-green-300 shrink-0 mt-0.5" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Intake form */}
        <div className="bg-white rounded-3xl border border-stone-200 p-8 max-w-2xl mx-auto">
          {sent ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-5">
                <CheckCircle size={36} className="text-green-600" />
              </div>
              <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Application received!</h2>
              <p className="text-gray-500 max-w-sm">
                Thanks for your interest in partnering with VeggieStack. Our sourcing team will review
                your application and be in touch within 3–5 business days.
              </p>
              <button
                type="button"
                onClick={() => { setSent(false); setForm({ farmName: '', contactName: '', email: '', phone: '', location: '', produceType: PRODUCE_TYPES[0], weeklyVolume: '', message: '' }) }}
                className="mt-8 text-green-600 font-semibold hover:underline text-sm"
              >
                Submit another application
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-extrabold text-gray-900 mb-1">Apply to Partner</h2>
              <p className="text-gray-500 text-sm mb-7">Tell us about your farm — it takes two minutes.</p>

              {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3 mb-5">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="farmName" className="block text-sm font-semibold text-gray-700 mb-1.5">Farm Name *</label>
                    <input id="farmName" name="farmName" value={form.farmName} onChange={handleChange} required
                      className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm bg-stone-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition" />
                  </div>
                  <div>
                    <label htmlFor="contactName" className="block text-sm font-semibold text-gray-700 mb-1.5">Contact Name *</label>
                    <input id="contactName" name="contactName" value={form.contactName} onChange={handleChange} required
                      className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm bg-stone-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="farm-email" className="block text-sm font-semibold text-gray-700 mb-1.5">Email *</label>
                    <input id="farm-email" type="email" name="email" value={form.email} onChange={handleChange} required
                      className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm bg-stone-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition" />
                  </div>
                  <div>
                    <label htmlFor="farm-phone" className="block text-sm font-semibold text-gray-700 mb-1.5">Phone *</label>
                    <input id="farm-phone" type="tel" name="phone" value={form.phone} onChange={handleChange} required
                      className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm bg-stone-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition" />
                  </div>
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-1.5">Farm Location (Town) *</label>
                  <input id="location" name="location" value={form.location} onChange={handleChange} required placeholder="e.g. Stellenbosch"
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm bg-stone-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="produceType" className="block text-sm font-semibold text-gray-700 mb-1.5">Primary Produce Type</label>
                    <select id="produceType" name="produceType" value={form.produceType} onChange={handleChange}
                      className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm bg-stone-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition appearance-none cursor-pointer">
                      {PRODUCE_TYPES.map((p) => <option key={p}>{p}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="weeklyVolume" className="block text-sm font-semibold text-gray-700 mb-1.5">Approx. Weekly Volume</label>
                    <input id="weeklyVolume" name="weeklyVolume" value={form.weeklyVolume} onChange={handleChange} placeholder="e.g. 200kg"
                      className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm bg-stone-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition" />
                  </div>
                </div>

                <div>
                  <label htmlFor="farm-message" className="block text-sm font-semibold text-gray-700 mb-1.5">Tell Us About Your Farm</label>
                  <textarea id="farm-message" name="message" value={form.message} onChange={handleChange} rows={5}
                    placeholder="Growing practices, certifications, harvest seasons…"
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm bg-stone-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition resize-none" />
                </div>

                <button type="submit" disabled={loading}
                  className="w-full sm:w-auto bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-bold px-8 py-3.5 rounded-full transition-colors">
                  {loading ? 'Submitting…' : 'Submit Application'}
                </button>
              </form>
            </>
          )}
        </div>

        <p className="text-center text-sm text-gray-500 mt-10">
          Supplying gadgets or supplements instead?{' '}
          <Link href="/suppliers" className="text-green-600 font-semibold hover:underline">Become a Supplier →</Link>
        </p>
      </div>
    </div>
  )
}
