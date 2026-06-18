import HeroSection from '@/components/HeroSection'
import HowItWorks from '@/components/HowItWorks'
import FeaturedCategories from '@/components/FeaturedCategories'
import PartnersStrip from '@/components/PartnersStrip'
import FeaturedSpotlights from '@/components/FeaturedSpotlights'
import HappyCustomers from '@/components/HappyCustomers'
import EmailCapture from '@/components/EmailCapture'
import connectDB from '@/lib/mongodb'
import ProductModel from '@/models/Product'
import type { Product, Category } from '@/types'

async function getProductsByCategory(category: Category): Promise<Product[]> {
  try {
    await connectDB()
    const docs = await ProductModel.find({ category }).sort({ createdAt: -1 }).lean()
    return JSON.parse(JSON.stringify(docs)) as Product[]
  } catch {
    return []
  }
}

export default async function HomePage() {
  const [vegetables, fruit, gadgets] = await Promise.all([
    getProductsByCategory('vegetable'),
    getProductsByCategory('fruit'),
    getProductsByCategory('gadget'),
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
