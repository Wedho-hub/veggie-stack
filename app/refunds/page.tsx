import Link from 'next/link'
import { Leaf, Package, Clock3, RotateCcw } from 'lucide-react'
import PageHeader from '@/components/PageHeader'

const policies = [
  {
    icon: <Leaf size={22} className="text-green-600" />,
    title: 'Fresh Produce (Fruit & Vegetables)',
    points: [
      'Report any quality issue within 24 hours of delivery via our Contact page, with a photo where possible.',
      'We will offer a free replacement on your next order or a full refund — no questions asked.',
      'Because produce is perishable, we cannot accept physical returns of fruit or vegetables.',
    ],
  },
  {
    icon: <Package size={22} className="text-green-600" />,
    title: 'Kitchen Gear (Gadgets)',
    points: [
      'Unopened, unused items may be returned within 7 days of delivery for a full refund.',
      'Defective gadgets are covered by the manufacturer warranty — contact us and we will coordinate a replacement or repair.',
      'Original packaging and proof of purchase are required for all gadget returns.',
    ],
  },
  {
    icon: <RotateCcw size={22} className="text-green-600" />,
    title: 'Supplements',
    points: [
      'Unopened supplements may be returned within 7 days of delivery for a full refund.',
      'Opened supplements can only be refunded if the product was faulty or damaged on arrival.',
    ],
  },
  {
    icon: <Clock3 size={22} className="text-green-600" />,
    title: 'Order Cancellations',
    points: [
      'Orders can be cancelled free of charge any time before the 10am same-day cutoff.',
      'Orders already picked or dispatched cannot be cancelled, but the policies above still apply if something is wrong on arrival.',
    ],
  },
]

export default function RefundsPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <PageHeader title="Refunds & Returns" description="Fresh food and quality you can trust — here's exactly what happens if something isn't right." />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {policies.map((p) => (
            <div key={p.title} className="bg-white rounded-3xl border border-stone-200 p-7">
              <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center mb-4">
                {p.icon}
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-3">{p.title}</h3>
              <ul className="space-y-2">
                {p.points.map((pt) => (
                  <li key={pt} className="flex gap-2 text-gray-600 text-sm leading-relaxed">
                    <span className="text-green-500 mt-0.5">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-green-800 rounded-3xl p-8 sm:p-10 text-white text-center">
          <h2 className="font-display text-2xl font-bold mb-3">How to Request a Refund</h2>
          <p className="text-green-100 max-w-xl mx-auto mb-6 text-sm leading-relaxed">
            Send us a message via our Contact page with your order number and a short description (and
            photo, if relevant). We respond within 1–2 business days, and approved refunds are returned
            to your original payment method within 5–7 business days.
          </p>
          <Link href="/contact"
            className="btn-cta inline-flex items-center justify-center gap-2 bg-white text-green-900 font-bold px-8 py-3.5 rounded-full">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  )
}
