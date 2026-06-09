'use client'

import Link from 'next/link'
import Image from 'next/image'

import { ArrowRight, Truck, Leaf, Shield } from 'lucide-react'

interface TrustBadge {
  icon: React.ReactNode
  title: string
  description: string
}

const trustBadges: TrustBadge[] = [
  {
    icon: <Truck size={22} className="text-green-600" />,
    title: 'Same Day Delivery',
    description: 'Order before 10am for delivery today across Cape Town',
  },
  {
    icon: <Leaf size={22} className="text-green-600" />,
    title: 'Farm Direct',
    description: 'Sourced fresh from Western Cape farms every morning',
  },
  {
    icon: <Shield size={22} className="text-green-600" />,
    title: '100% Plant Based',
    description: 'Everything we sell supports a healthy, sustainable lifestyle',
  },
]

// Free Unsplash photo — colourful fresh produce flatlay (no attribution required)
// Swap for your own image any time: local /public/hero-bg.jpg or a Cloudinary URL
const HERO_IMAGE_SRC =
  'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1920&q=85&fit=crop'

export default function HeroSection() {
  return (
    <section>

      {/* ── MAIN HERO BANNER ── */}
      <div className="relative min-h-140 md:min-h-160 flex items-center overflow-hidden bg-green-900">

        {/* Background image — fills the entire banner */}
        <Image
          src={HERO_IMAGE_SRC}
          alt="Fresh fruit and vegetables"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Gradient overlay — blends the image into the brand colour
            Left side is nearly opaque (readable text) → right side lets the image breathe */}
        <div className="absolute inset-0 bg-linear-to-r from-green-950/92 via-green-900/80 to-green-800/45" />

        {/* Subtle bottom vignette for depth */}
        <div className="absolute inset-0 bg-linear-to-t from-green-950/60 via-transparent to-transparent" />

        {/* Hero content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-2xl">

            {/* Badge */}
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
              <Leaf size={14} className="text-green-300" />
              Cape Town&apos;s Plant-Based Delivery
            </span>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6 text-white drop-shadow-sm">
              From the Farm.{' '}
              <span className="text-green-300">
                To Your Kitchen.
              </span>
            </h1>

            {/* Sub-heading */}
            <p className="text-lg sm:text-xl text-green-100/90 mb-10 leading-relaxed max-w-xl">
              Fresh organic produce, plant-based essentials and healthy lifestyle gear —
              delivered to your door in Cape Town. No nonsense, just plants.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 bg-white text-green-900 font-bold px-8 py-4 rounded-full hover:bg-green-50 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Shop Fresh Produce
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/30 bg-white/5 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-full hover:bg-white/15 hover:border-white/50 transition-all duration-200"
              >
                Read the Blog
              </Link>
            </div>

          </div>
        </div>


      </div>

      {/* ── TRUST BADGES STRIP ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            {trustBadges.map((badge) => (
              <div
                key={badge.title}
                className="flex items-start gap-4 py-6 px-4 md:px-8"
              >
                <div className="shrink-0 w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                  {badge.icon}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{badge.title}</p>
                  <p className="text-gray-500 text-sm mt-0.5 leading-snug">{badge.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  )
}
