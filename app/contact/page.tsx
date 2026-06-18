'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react'

const SUBJECTS = [
  'General Inquiry',
  'Order Support',
  'Delivery Question',
  'Press & Media',
  'Partner With Us — Farm',
  'Become a Supplier',
]

const PARTNER_NOTE: Record<string, { note: string; href: string; label: string }> = {
  'Partner With Us — Farm': {
    note: 'For a faster response, use our dedicated farm partner form.',
    href: '/farms',
    label: 'Apply to Partner →',
  },
  'Become a Supplier': {
    note: 'For a faster response, use our dedicated supplier inquiry form.',
    href: '/suppliers',
    label: 'Submit Inquiry →',
  },
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: SUBJECTS[0], message: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) { setError('Please fill in all fields.'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) { const d = await res.json(); setError(d.error || 'Something went wrong.'); return }
      setSent(true)
    } catch {
      setError('Could not send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-stone-50">

      {/* Hero */}
      <div className="bg-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center text-center">
          <Link href="/" className="flex items-center gap-3 mb-8">
            <Image src="/logo.png" alt="Veggie Stack" width={52} height={52} className="drop-shadow-lg" />
            <span className="font-display text-2xl font-extrabold tracking-tight">
              Veggie<span className="text-green-300">Stack</span>
            </span>
          </Link>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold leading-tight mb-3">Get in Touch</h1>
          <p className="text-green-100 text-lg max-w-xl">
            Questions about your order, press inquiries, or just want to say hi — we&apos;d love to hear from you.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── LEFT: contact info ── */}
          <div className="space-y-5">

            <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-7">
              <h2 className="font-extrabold text-gray-900 text-lg mb-5">Contact Info</h2>
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center shrink-0">
                    <Mail size={18} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">Email</p>
                    <a href="mailto:hello@veggiestack.co.za" className="text-sm text-gray-700 hover:text-green-600 transition-colors font-medium">
                      hello@veggiestack.co.za
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center shrink-0">
                    <Phone size={18} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">Phone</p>
                    <a href="tel:+27210000000" className="text-sm text-gray-700 hover:text-green-600 transition-colors font-medium">
                      +27 21 000 0000
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">Location</p>
                    <p className="text-sm text-gray-700 font-medium">Cape Town, South Africa</p>
                    <p className="text-xs text-gray-400 mt-0.5">Delivery across the Western Cape</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-700 rounded-3xl p-7 text-white">
              <p className="text-xs font-bold uppercase tracking-widest text-green-200 mb-2">Delivery hours</p>
              <p className="font-extrabold text-2xl mb-1">Mon – Sat</p>
              <p className="text-green-100 text-sm">7:00 am – 6:00 pm</p>
              <div className="mt-5 text-sm text-green-100 space-y-1">
                <p>✓ Same-day for orders before 10 am</p>
                <p>✓ Free delivery on orders over R500</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-7">
              <p className="font-extrabold text-gray-900 mb-3">Follow us</p>
              <div className="flex gap-3">
                {[
                  { label: 'Instagram', href: '#', icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  )},
                  { label: 'Facebook', href: '#', icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  )},
                ].map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-9 h-9 bg-stone-100 hover:bg-green-600 hover:text-white text-gray-500 rounded-xl flex items-center justify-center transition-all"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: form ── */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-8">

              {sent ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-5">
                    <CheckCircle size={36} className="text-green-600" />
                  </div>
                  <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Message sent!</h2>
                  <p className="text-gray-500 max-w-sm">
                    Thanks for reaching out. We&apos;ll get back to you within 1–2 business days.
                  </p>
                  <button
                    type="button"
                    onClick={() => { setSent(false); setForm({ name: '', email: '', subject: SUBJECTS[0], message: '' }) }}
                    className="mt-8 text-green-600 font-semibold hover:underline text-sm"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-extrabold text-gray-900 mb-1">Send us a message</h2>
                  <p className="text-gray-500 text-sm mb-7">We read every message and reply within 1–2 business days.</p>

                  {error && (
                    <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3 mb-5">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="contact-name" className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
                        <input
                          id="contact-name"
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          placeholder="Jane Smith"
                          className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm bg-stone-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-email" className="block text-sm font-semibold text-gray-700 mb-1.5">Email address</label>
                        <input
                          id="contact-email"
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder="you@example.com"
                          className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm bg-stone-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contact-subject" className="block text-sm font-semibold text-gray-700 mb-1.5">Subject</label>
                      <select
                        id="contact-subject"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm bg-stone-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition appearance-none cursor-pointer"
                      >
                        {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
                      </select>
                      {PARTNER_NOTE[form.subject] && (
                        <p className="mt-2 text-sm text-green-700 bg-green-50 border border-green-100 rounded-xl px-4 py-2.5">
                          {PARTNER_NOTE[form.subject].note}{' '}
                          <Link href={PARTNER_NOTE[form.subject].href} className="font-semibold underline">
                            {PARTNER_NOTE[form.subject].label}
                          </Link>
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contact-message" className="block text-sm font-semibold text-gray-700 mb-1.5">Message</label>
                      <textarea
                        id="contact-message"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows={7}
                        placeholder="Tell us how we can help…"
                        className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm bg-stone-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-bold px-8 py-3.5 rounded-full transition-colors"
                    >
                      {loading ? 'Sending…' : <><Send size={16} /> Send Message</>}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
