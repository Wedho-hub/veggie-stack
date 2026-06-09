// app/layout.tsx
import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { CartProvider } from '@/lib/cartContext'
import SessionWrapper from '@/components/SessionWrapper'

const geist = Geist({ subsets: ['latin'] })

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
      <body className={`${geist.className} bg-gray-50 text-gray-900`}>
        <SessionWrapper>
          <CartProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </CartProvider>
        </SessionWrapper>
      </body>
    </html>
  )
}