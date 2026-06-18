import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import AnimateIn from '@/components/AnimateIn'

const steps = [
  {
    number: '01',
    emoji: '🛒',
    title: 'Browse the Market',
    description: 'Shop our daily selection of farm-fresh produce, plant-based essentials, and kitchen gear.',
  },
  {
    number: '02',
    emoji: '⏰',
    title: 'Order Before 10am',
    description: 'Place your order in the morning to guarantee same-day delivery across Cape Town.',
  },
  {
    number: '03',
    emoji: '📦',
    title: 'We Pack It Fresh',
    description: 'Our team hand-packs your order using produce harvested that same morning from partner farms.',
  },
  {
    number: '04',
    emoji: '🚐',
    title: 'Delivered by Lunch',
    description: 'Your order arrives at your door fresh, chilled, and ready to eat — no subscription needed.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-gray-50/60 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <AnimateIn className="text-center mb-14">
          <span className="inline-block bg-green-100 text-green-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Simple as that
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            From Farm to Your Door in 4 Steps
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            No subscription. No hassle. Just fresh, plant-based goodness delivered the same day.
          </p>
        </AnimateIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {steps.map((step, i) => (
            <AnimateIn key={step.number} delay={i * 110}>
              <div className="card-lift relative bg-white rounded-3xl border border-gray-100 p-7 group h-full overflow-hidden">
                <span className="absolute -bottom-3 -right-1 text-8xl font-black text-gray-50 select-none leading-none pointer-events-none">
                  {step.number}
                </span>
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-5 relative z-10 text-3xl transition-transform duration-300 group-hover:scale-110">
                  {step.emoji}
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2 relative z-10">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed relative z-10">{step.description}</p>
              </div>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn className="text-center" delay={440}>
          <Link href="/shop"
            className="btn-cta inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-full shadow-lg group">
            Start Shopping
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </AnimateIn>

      </div>
    </section>
  )
}
