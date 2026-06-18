import Link from 'next/link'
import { Leaf, Truck, Shield, Heart, Users, MapPin, ArrowRight } from 'lucide-react'
import PageHeader from '@/components/PageHeader'

const values = [
  {
    icon: <Leaf size={22} className="text-green-600" />,
    title: 'Farm Direct',
    description: 'We work hand-in-hand with growers across the Western Cape — Stellenbosch, Noordhoek, Philippi and the Elgin Valley — cutting out the middlemen so produce reaches you within a day of harvest.',
  },
  {
    icon: <Truck size={22} className="text-green-600" />,
    title: 'Same-Day, Every Day',
    description: 'Order before 10am and your box arrives by lunchtime. No subscriptions, no lock-in — just fresh food when you need it.',
  },
  {
    icon: <Shield size={22} className="text-green-600" />,
    title: '100% Plant-Based',
    description: 'Every product we stock — from produce to supplements to kitchen gear — supports a healthy, sustainable, plant-powered lifestyle.',
  },
  {
    icon: <Heart size={22} className="text-green-600" />,
    title: 'Community First',
    description: 'We back small Western Cape farms and local suppliers, helping them reach more households without the overhead of retail.',
  },
]

const stats = [
  { value: '200+', label: 'Happy customers' },
  { value: '16+', label: 'Products in store' },
  { value: '4+', label: 'Partner farms' },
  { value: '<10h', label: 'Farm to door' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <PageHeader
        title="About VeggieStack"
        description="Cape Town's plant-based delivery service — born from a love of fresh food, local farms and doing fewer things, better."
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-20">
          <div>
            <span className="inline-block bg-green-100 text-green-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
              Our Story
            </span>
            <h2 className="font-display text-3xl font-bold text-gray-900 mb-4">
              We started with one question: why does it take a week for fresh food to reach our kitchens?
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              VeggieStack began in Cape Town with a simple idea — connect local, plant-based households
              directly to the farms and suppliers around them. No long cold-chains, no produce sitting in
              a warehouse for a week before it reaches a shelf.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Today we deliver fresh fruit, vegetables, kitchen gear and supplements across the Cape Town
              metro — sourced from partner farms and suppliers who share our standards for quality and
              sustainability.
            </p>
          </div>
          <div className="bg-green-800 rounded-3xl p-10 text-white">
            <div className="grid grid-cols-2 gap-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-3xl font-extrabold text-green-300">{s.value}</p>
                  <p className="text-green-100 text-sm mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-gray-900 mb-3">What We Stand For</h2>
            <p className="text-gray-500 max-w-xl mx-auto">The principles behind every box we pack.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v) => (
              <div key={v.title} className="card-lift bg-white rounded-3xl border border-stone-200 p-7">
                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center mb-4">
                  {v.icon}
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-linear-to-br from-green-700 to-green-900 rounded-3xl p-10 sm:p-14 text-center text-white">
          <Users size={32} className="mx-auto text-green-300 mb-4" />
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">Grow with us</h2>
          <p className="text-green-100 max-w-lg mx-auto mb-8">
            Whether you&apos;re shopping for your weekly box, farming in the Western Cape, or distributing
            plant-based products — there&apos;s a place for you at VeggieStack.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop"
              className="btn-cta inline-flex items-center justify-center gap-2 bg-white text-green-900 font-bold px-8 py-3.5 rounded-full">
              Shop Now <ArrowRight size={16} />
            </Link>
            <Link href="/farms"
              className="btn-ghost inline-flex items-center justify-center gap-2 border-2 border-white/30 bg-white/5 text-white font-semibold px-8 py-3.5 rounded-full hover:bg-white/15">
              <MapPin size={16} /> Partner With Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
