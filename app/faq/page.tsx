'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import PageHeader from '@/components/PageHeader'

const FAQS: { question: string; answer: React.ReactNode }[] = [
  {
    question: 'What areas do you deliver to?',
    answer: (
      <>
        We deliver across the Cape Town metro, from the City Bowl and Atlantic Seaboard through to the
        Southern Suburbs. See the full suburb list and check your address on our{' '}
        <Link href="/delivery" className="text-green-600 font-semibold hover:underline">Delivery page</Link>.
      </>
    ),
  },
  {
    question: 'What time do I need to order by for same-day delivery?',
    answer:
      'Order before 10am SAST and your box will be delivered the same day, usually by lunchtime. Orders placed after 10am are delivered the next day.',
  },
  {
    question: 'How much does delivery cost?',
    answer:
      'Delivery is free on all orders over R500. Orders under R500 incur a flat delivery fee of R50. Full breakdown on our Delivery page.',
  },
  {
    question: 'Where does your produce come from?',
    answer:
      'Everything is sourced directly from partner farms across the Western Cape — including Stellenbosch, Noordhoek, Philippi and the Elgin Valley — usually harvested within 24 hours of delivery.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major debit and credit cards via PayFast and PayPal, processed securely at checkout.',
  },
  {
    question: "What if I'm not happy with my order?",
    answer: (
      <>
        Let us know within 24 hours of delivery and we&apos;ll replace the item or refund you — no
        questions asked for quality issues with perishables. Read the full policy on our{' '}
        <Link href="/refunds" className="text-green-600 font-semibold hover:underline">Refunds page</Link>{' '}
        or reach out via our <Link href="/contact" className="text-green-600 font-semibold hover:underline">Contact page</Link>.
      </>
    ),
  },
  {
    question: 'Can my farm or business partner with VeggieStack?',
    answer: (
      <>
        Yes! We&apos;re always looking for new growers and suppliers. If you run a farm, visit{' '}
        <Link href="/farms" className="text-green-600 font-semibold hover:underline">Partner With Us</Link>{' '}
        — if you supply kitchen gear or supplements, visit{' '}
        <Link href="/suppliers" className="text-green-600 font-semibold hover:underline">Become a Supplier</Link>.
      </>
    ),
  },
]

export default function FaqPage() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="min-h-screen bg-stone-50">
      <PageHeader
        title="Frequently Asked Questions"
        description="Everything you need to know about ordering, delivery and partnering with VeggieStack."
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = open === i
            return (
              <div key={faq.question} className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 text-left px-6 py-5"
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-green-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 text-gray-500 text-sm leading-relaxed animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500 mb-3">Still have questions?</p>
          <Link href="/contact" className="text-green-600 font-semibold hover:underline">
            Get in touch with our team →
          </Link>
        </div>
      </div>
    </div>
  )
}
