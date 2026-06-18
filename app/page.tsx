import HeroSection from '@/components/HeroSection'
import HowItWorks from '@/components/HowItWorks'
import FeaturedCategories from '@/components/FeaturedCategories'
import PartnersStrip from '@/components/PartnersStrip'
import FeaturedSpotlights from '@/components/FeaturedSpotlights'
import HappyCustomers from '@/components/HappyCustomers'
import EmailCapture from '@/components/EmailCapture'
import type { Product } from '@/types'

async function getProducts(category: string): Promise<Product[]> {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'

  const res = await fetch(`${baseUrl}/api/products?category=${category}`, {
    cache: 'no-store',
  })

  if (!res.ok) return []

  const json = await res.json()
  return json.data
}

export default async function HomePage() {
  const [vegetables, fruit, gadgets] = await Promise.all([
    getProducts('vegetable'),
    getProducts('fruit'),
    getProducts('gadget'),
  ])

  return (
    <main>
      <HeroSection />
      <HowItWorks />
      <FeaturedCategories />
      <PartnersStrip />
      <FeaturedSpotlights vegetables={vegetables} fruit={fruit} gadgets={gadgets} />
      <HappyCustomers />
      <EmailCapture />
    </main>
  )
}
