// app/order-confirmed/page.tsx
'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { Suspense } from 'react'

function OrderConfirmedContent() {
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get('order')

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10 max-w-md w-full text-center">

        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={36} className="text-green-600" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Order Confirmed! 🥦
        </h1>
        <p className="text-gray-500 mb-6">
          Thanks for your order. We&apos;ll have your fresh produce packed and
          on its way shortly.
        </p>

        {orderNumber && (
          <div className="bg-gray-50 rounded-xl px-5 py-3 mb-6 inline-block">
            <p className="text-xs text-gray-400 mb-0.5">Order number</p>
            <p className="font-bold text-gray-900 font-mono">{orderNumber}</p>
          </div>
        )}

        <p className="text-sm text-gray-500 mb-8">
          A confirmation email will be sent to you shortly.
          Same-day delivery for orders placed before 10am.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full transition-colors"
          >
            Continue Shopping
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center gap-2 border border-gray-200 text-gray-600 hover:border-green-500 hover:text-green-600 font-semibold px-6 py-3 rounded-full transition-colors"
          >
            Read the Blog
          </Link>
        </div>

      </div>
    </div>
  )
}

export default function OrderConfirmedPage() {
  return (
    <Suspense>
      <OrderConfirmedContent />
    </Suspense>
  )
}