'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const DURATION = 4000

interface Chip { emoji: string; label: string; meta: string }

interface Slide {
  id: string
  badge: string
  headlineTop: string
  headlineBottom: string
  description: string
  cta: { label: string; href: string }
  mobileEmoji: string
  mainEmoji: string
  chips: [Chip, Chip]
  gradient: string
  accent: string
  ctaBg: string
  ctaText: string
  glow: string
}

const slides: Slide[] = [
  {
    id: 'veg',
    badge: "Today's Harvest",
    headlineTop: 'Farm-Fresh Greens,',
    headlineBottom: 'Delivered by Lunch',
    description:
      'Hand-picked this morning from Stellenbosch farms. Order before 10am for same-day delivery across Cape Town.',
    cta: { label: 'Shop Vegetables', href: '/shop?category=vegetable' },
    mobileEmoji: '🥦',
    mainEmoji: '🥦',
    chips: [
      { emoji: '🥗', label: 'Mixed Salad Box', meta: 'R89' },
      { emoji: '🫑', label: 'Capsicum Pack', meta: 'R45' },
    ],
    gradient: 'linear-gradient(135deg,#052e16 0%,#14532d 55%,#15803d 100%)',
    accent: '#86efac',
    ctaBg: '#86efac',
    ctaText: '#052e16',
    glow: 'rgba(134,239,172,0.12)',
  },
  {
    id: 'fruit',
    badge: 'Seasonal Picks',
    headlineTop: 'Sun-Ripened Fruit',
    headlineBottom: 'From Elgin Valley',
    description:
      'Strawberries, blueberries and stone fruit — harvested yesterday, at your door before midday.',
    cta: { label: 'Shop Fruit', href: '/shop?category=fruit' },
    mobileEmoji: '🍓',
    mainEmoji: '🍓',
    chips: [
      { emoji: '🫐', label: 'Berry Punnet', meta: 'R65' },
      { emoji: '🍊', label: 'Citrus Box', meta: 'R79' },
    ],
    gradient: 'linear-gradient(135deg,#500724 0%,#9f1239 55%,#e11d48 100%)',
    accent: '#fda4af',
    ctaBg: '#fda4af',
    ctaText: '#500724',
    glow: 'rgba(253,164,175,0.12)',
  },
  {
    id: 'gadget',
    badge: 'Kitchen Gear',
    headlineTop: 'Professional Tools',
    headlineBottom: 'for Plant-Based Living',
    description:
      'NutriBullets, cold-press juicers and everything you need to blend, juice and thrive every morning.',
    cta: { label: 'Explore Gadgets', href: '/shop?category=gadget' },
    mobileEmoji: '⚡',
    mainEmoji: '🥤',
    chips: [
      { emoji: '⚡', label: 'NutriBullet Pro', meta: 'R1,299' },
      { emoji: '🫙', label: 'Mason Jar Set', meta: 'R149' },
    ],
    gradient: 'linear-gradient(135deg,#0f172a 0%,#1e3a5f 55%,#1d4ed8 100%)',
    accent: '#93c5fd',
    ctaBg: '#93c5fd',
    ctaText: '#0f172a',
    glow: 'rgba(147,197,253,0.12)',
  },
  {
    id: 'blog',
    badge: 'From the Blog',
    headlineTop: 'Plant-Based Living,',
    headlineBottom: 'Simplified',
    description:
      'Recipes, nutrition guides and stories from our Cape Town farms — updated every week for a healthier you.',
    cta: { label: 'Read the Blog', href: '/blog' },
    mobileEmoji: '📗',
    mainEmoji: '📗',
    chips: [
      { emoji: '🌿', label: 'Nutrition Guide', meta: 'New' },
      { emoji: '🫶', label: 'Farm Stories', meta: 'Weekly' },
    ],
    gradient: 'linear-gradient(135deg,#431407 0%,#9a3412 55%,#ea580c 100%)',
    accent: '#fdba74',
    ctaBg: '#fdba74',
    ctaText: '#431407',
    glow: 'rgba(253,186,116,0.12)',
  },
]

export default function FeaturedSlideshow() {
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)
  const [paused, setPaused] = useState(false)
  const [resetKey, setResetKey] = useState(0)

  // Manual navigation — also resets the advancement interval
  const goTo = useCallback((i: number) => {
    setActive(i)
    setResetKey(k => k + 1)
  }, [])

  const next = useCallback(() => {
    setActive(a => (a + 1) % slides.length)
    setResetKey(k => k + 1)
  }, [])

  const prev = useCallback(() => {
    setActive(a => (a - 1 + slides.length) % slides.length)
    setResetKey(k => k + 1)
  }, [])

  // Single interval drives both progress and slide advancement
  useEffect(() => {
    if (paused) return
    let elapsed = 0
    const id = setInterval(() => {
      elapsed += 60
      setProgress(Math.min(100, (elapsed / DURATION) * 100))
      if (elapsed >= DURATION) {
        elapsed = 0
        setProgress(0)
        setActive(a => (a + 1) % slides.length)
      }
    }, 60)
    return () => {
      clearInterval(id)
      setProgress(0)
    }
  }, [paused, resetKey])

  return (
    <section
      className="relative overflow-hidden slideshow-section"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Featured content carousel"
    >
      {/* ── Slides ── */}
      {slides.map((slide, i) => {
        const visible = i === active
        return (
          <div
            key={slide.id}
            aria-hidden={!visible || undefined}
            className={`slide-panel${visible ? ' is-active' : ''}`}
            style={{ '--slide-bg': slide.gradient } as React.CSSProperties}
          >
            {/* Subtle grain texture overlay */}
            <div className="absolute inset-0 opacity-5"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: '200px' }} />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
                style={{ minHeight: '540px', paddingTop: '4rem', paddingBottom: '5rem' }}>

                {/* ── Text ── */}
                <div className={`text-center lg:text-left${i % 2 !== 0 ? ' slide-swap' : ''}`}>
                  {/* Mobile emoji */}
                  <div className="lg:hidden text-7xl mb-6 leading-none">{slide.mobileEmoji}</div>

                  {/* Badge */}
                  <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6"
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      color: slide.accent,
                      border: `1px solid ${slide.accent}30`,
                      backdropFilter: 'blur(8px)',
                    }}>
                    {slide.badge}
                  </span>

                  {/* Headline */}
                  <h2 className="font-black text-white leading-tight mb-5"
                    style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1 }}>
                    {slide.headlineTop}
                    <br />
                    <span style={{ color: slide.accent }}>{slide.headlineBottom}</span>
                  </h2>

                  {/* Description */}
                  <p className="text-base sm:text-lg leading-relaxed mb-8 max-w-md mx-auto lg:mx-0"
                    style={{ color: 'rgba(255,255,255,0.7)' }}>
                    {slide.description}
                  </p>

                  {/* CTA */}
                  <Link href={slide.cta.href}
                    className="btn-cta inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-sm"
                    style={{ background: slide.ctaBg, color: slide.ctaText }}>
                    {slide.cta.label}
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>

                {/* ── Visual ── */}
                <div className="hidden lg:flex items-center justify-center">
                  <div className="relative" style={{ width: '320px', height: '320px' }}>

                    {/* Glow rings */}
                    {[0, 1, 2, 3].map(r => (
                      <div key={r} className="absolute rounded-full"
                        style={{
                          inset: `${r * 26}px`,
                          background: slide.glow,
                          border: `1px solid ${slide.accent}18`,
                        }} />
                    ))}

                    {/* Central emoji */}
                    <div className="absolute inset-0 flex items-center justify-center select-none"
                      style={{ fontSize: '7rem', lineHeight: 1, filter: 'drop-shadow(0 0 40px rgba(0,0,0,0.4))' }}>
                      {slide.mainEmoji}
                    </div>

                    {/* Floating chips */}
                    {slide.chips.map((chip, ci) => (
                      <div key={chip.label}
                        className="absolute flex items-center gap-2.5 rounded-2xl px-3.5 py-2.5"
                        style={{
                          background: 'rgba(255,255,255,0.1)',
                          border: '1px solid rgba(255,255,255,0.18)',
                          backdropFilter: 'blur(14px)',
                          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                          ...(ci === 0
                            ? { top: '-14px', right: '-18px' }
                            : { bottom: '-14px', left: '-18px' }),
                        }}>
                        <span style={{ fontSize: '1.4rem', lineHeight: 1 }}>{chip.emoji}</span>
                        <div>
                          <p className="font-semibold leading-none"
                            style={{ color: 'white', fontSize: '0.75rem' }}>{chip.label}</p>
                          <p className="font-bold leading-none mt-1"
                            style={{ color: slide.accent, fontSize: '0.75rem' }}>{chip.meta}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        )
      })}

      {/* ── Prev / Next ── */}
      <button type="button" onClick={prev} aria-label="Previous slide"
        className="icon-btn absolute flex items-center justify-center text-white"
        style={{
          left: '1rem',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '2.75rem',
          height: '2.75rem',
          borderRadius: '9999px',
          background: 'rgba(0,0,0,0.28)',
          backdropFilter: 'blur(6px)',
          border: '1px solid rgba(255,255,255,0.15)',
          zIndex: 10,
        }}>
        <ChevronLeft size={20} />
      </button>
      <button type="button" onClick={next} aria-label="Next slide"
        className="icon-btn absolute flex items-center justify-center text-white"
        style={{
          right: '1rem',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '2.75rem',
          height: '2.75rem',
          borderRadius: '9999px',
          background: 'rgba(0,0,0,0.28)',
          backdropFilter: 'blur(6px)',
          border: '1px solid rgba(255,255,255,0.15)',
          zIndex: 10,
        }}>
        <ChevronRight size={20} />
      </button>

      {/* ── Indicators ── */}
      <div className="absolute flex items-center justify-center gap-2"
        style={{ bottom: '1.75rem', left: 0, right: 0, zIndex: 10 }}>
        {slides.map((_, i) => (
          <button key={i} type="button" onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="relative rounded-full overflow-hidden"
            style={{
              height: '6px',
              width: i === active ? '2rem' : '6px',
              background: 'rgba(255,255,255,0.3)',
              transition: 'width 0.35s ease',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}>
            {i === active && (
              <span className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  width: `${progress}%`,
                  background: 'rgba(255,255,255,0.9)',
                  transition: 'width 60ms linear',
                }} />
            )}
          </button>
        ))}
      </div>

      {/* ── Slide counter ── */}
      <div className="absolute text-xs font-semibold"
        style={{
          bottom: '1.5rem',
          right: '1.5rem',
          color: 'rgba(255,255,255,0.4)',
          zIndex: 10,
          fontVariantNumeric: 'tabular-nums',
        }}>
        {String(active + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
      </div>
    </section>
  )
}
