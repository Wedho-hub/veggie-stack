import Link from 'next/link'
import { Handshake, ArrowRight } from 'lucide-react'
import AnimateIn from '@/components/AnimateIn'

const partners = [
  'Joubert Family Farm · Noordhoek',
  'Stellenbosch Growers Co-op',
  'Elgin Valley Orchards',
  'Philippi Fresh Fields',
  'Citrusdal Grove Estates',
]

export default function PartnersStrip() {
  return (
    <section className="bg-green-50 border-y border-green-100 py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimateIn>
          <span className="inline-flex items-center gap-2 bg-white text-green-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 border border-green-200">
            <Handshake size={14} /> Farm & Supplier Partners
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Grown and Supplied by People We Trust
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto mb-8">
            Every box is sourced from a growing network of Western Cape farms and plant-based suppliers.
          </p>
        </AnimateIn>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {partners.map((p) => (
            <span key={p} className="bg-white border border-green-200 text-green-800 text-sm font-semibold px-5 py-2.5 rounded-full shadow-sm">
              {p}
            </span>
          ))}
        </div>

        <Link href="/farms" className="inline-flex items-center gap-2 text-green-700 font-semibold hover:underline">
          Become a partner farm <ArrowRight size={15} />
        </Link>
      </div>
    </section>
  )
}
