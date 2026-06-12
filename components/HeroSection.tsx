'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Truck, Leaf, Shield } from 'lucide-react'

const trustBadges = [
  {
    icon: <Truck size={22} className="text-green-600" />,
    title: 'Same Day Delivery',
    description: 'Order before 10am for delivery today across Cape Town',
    delay: 'anim-delay-500',
  },
  {
    icon: <Leaf size={22} className="text-green-600" />,
    title: 'Farm Direct',
    description: 'Sourced fresh from Western Cape farms every morning',
    delay: 'anim-delay-600',
  },
  {
    icon: <Shield size={22} className="text-green-600" />,
    title: '100% Plant Based',
    description: 'Everything we sell supports a healthy, sustainable lifestyle',
    delay: 'anim-delay-700',
  },
]

const HERO_IMAGE_SRC =
  'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1920&q=85&fit=crop'

export default function HeroSection() {
  return (
    <section>
      <div className="relative min-h-140 md:min-h-160 flex items-center overflow-hidden bg-green-900">
        <Image
          src={HERO_IMAGE_SRC}
          alt="Fresh fruit and vegetables"
          fill loading="eager" sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-linear-to-r from-green-950/92 via-green-900/80 to-green-800/45" />
        <div className="absolute inset-0 bg-linear-to-t from-green-950/60 via-transparent to-transparent" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-2xl">

            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm animate-fade-in">
              <Leaf size={14} className="text-green-300" />
              Cape Town&apos;s Plant-Based Delivery
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6 text-white drop-shadow-sm animate-fade-up anim-delay-100">
              From the Farm.{' '}
              <span className="text-green-300">To Your Kitchen.</span>
            </h1>

            <p className="text-lg sm:text-xl text-green-100/90 mb-10 leading-relaxed max-w-xl animate-fade-up anim-delay-300">
              Fresh organic produce, plant-based essentials and healthy lifestyle gear —
              delivered to your door in Cape Town. No nonsense, just plants.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up anim-delay-500">
              <Link href="/shop"
                className="btn-cta inline-flex items-center justify-center gap-2 bg-white text-green-900 font-bold px-8 py-4 rounded-full shadow-lg hover:bg-green-50 group">
                Shop Fresh Produce
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link href="/blog"
                className="btn-ghost inline-flex items-center justify-center gap-2 border-2 border-white/30 bg-white/5 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-full hover:bg-white/15 hover:border-white/60">
                Read the Blog
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* Trust badges */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            {trustBadges.map((badge) => (
              <div key={badge.title}
                className={`flex items-start gap-4 py-6 px-4 md:px-8 animate-fade-up ${badge.delay}`}>
                <div className="shrink-0 w-10 h-10 bg-green-50 hover:bg-green-100 rounded-xl flex items-center justify-center card-lift">
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
