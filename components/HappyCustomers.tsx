import AnimateIn from '@/components/AnimateIn'

const testimonials = [
  {
    quote: "The freshest produce I've ever had delivered. My family has eaten more vegetables this month than the entire last year. The salad box is incredible.",
    name: 'Naledi M.',
    location: 'Gardens, Cape Town',
    orders: '30+ orders',
    initials: 'NM',
    color: 'bg-green-600',
  },
  {
    quote: "Ordered at 8am, produce arrived by 11:30am — still dewy from the field. The berry punnet was extraordinary. Won't buy from a supermarket again.",
    name: 'James F.',
    location: 'Sea Point',
    orders: '12 orders',
    initials: 'JF',
    color: 'bg-sky-600',
  },
  {
    quote: "The spirulina and the NutriBullet combo changed my mornings completely. Having everything delivered makes healthy living so much easier.",
    name: 'Fatima K.',
    location: 'Observatory',
    orders: '18 orders',
    initials: 'FK',
    color: 'bg-purple-600',
  },
  {
    quote: "I switched from the big grocery chains six months ago and haven't looked back. The greens are always vibrant and the delivery is reliably on time.",
    name: 'Thabo M.',
    location: 'Woodstock',
    orders: '22 orders',
    initials: 'TM',
    color: 'bg-teal-600',
  },
  {
    quote: "Brilliant service from the first order. The box arrived perfectly packed with a little recipe card inside. My kids actually enjoy eating vegetables now!",
    name: 'Sarah L.',
    location: 'Claremont',
    orders: '8 orders',
    initials: 'SL',
    color: 'bg-rose-600',
  },
  {
    quote: "VeggieStack has become part of my weekly rhythm. Consistent quality, fair prices and the team is always responsive. I recommend them to everyone I know.",
    name: 'Amira P.',
    location: 'Salt River',
    orders: '45 orders',
    initials: 'AP',
    color: 'bg-amber-600',
  },
]

function StarRow() {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-amber-400">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function HappyCustomers() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <AnimateIn className="text-center mb-14">
          <span className="inline-block bg-amber-50 text-amber-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Real Reviews
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Our Customers Love It
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto mb-5">
            Hundreds of Cape Town families trust Veggie Stack for their weekly produce.
          </p>
          <div className="inline-flex items-center gap-3 bg-amber-50 border border-amber-100 px-4 py-2 rounded-full">
            <StarRow />
            <span className="text-sm font-semibold text-gray-800">4.9</span>
            <span className="text-sm text-gray-500">from 200+ happy customers</span>
            <span className="text-xs text-amber-600 font-semibold">⭐ Verified via Google</span>
          </div>
        </AnimateIn>

        {/* Cards — 3 col desktop, 1 col mobile = 2 rows */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <AnimateIn key={t.name} delay={i * 100}>
              <div className="card-lift bg-gray-50 rounded-3xl p-7 border border-gray-100 flex flex-col h-full">

                {/* Open quote */}
                <div className="font-accent text-6xl leading-none text-green-300 mb-1 select-none">&ldquo;</div>

                <p className="font-accent text-xl text-gray-700 leading-relaxed mb-6 flex-1">{t.quote}</p>

                <StarRow />

                {/* Customer identity */}
                <div className="flex items-center gap-3 mt-4">
                  <div className={`w-10 h-10 ${t.color} text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0`}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.location} · {t.orders}</p>
                  </div>
                  <span className="ml-auto text-xs text-green-600 font-semibold whitespace-nowrap">⭐ Verified</span>
                </div>

              </div>
            </AnimateIn>
          ))}
        </div>

      </div>
    </section>
  )
}
