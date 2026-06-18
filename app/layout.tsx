// app/layout.tsx
import type { Metadata } from 'next'
import { Fraunces, Plus_Jakarta_Sans, Caveat } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { CartProvider } from '@/lib/cartContext'
import SessionWrapper from '@/components/SessionWrapper'
import OrderCutoffBanner from '@/components/OrderCutoffBanner'
import WhatsAppButton from '@/components/WhatsAppButton'

const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces' })
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' })
const caveat = Caveat({ subsets: ['latin'], variable: '--font-caveat' })

export const metadata: Metadata = {
  title: 'Veggie Stack — Farm Fresh to Your Door',
  description: 'Plant-based food delivery in Cape Town. Fresh produce, healthy gadgets and lifestyle blog.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${jakarta.variable} ${caveat.variable} font-body bg-gray-50 text-gray-900`}>
        <SessionWrapper>
          <CartProvider>
            <OrderCutoffBanner />
            <Navbar />
            <main>{children}</main>
            <Footer />
            <WhatsAppButton />
          </CartProvider>
        </SessionWrapper>
      </body>
    </html>
  )
}