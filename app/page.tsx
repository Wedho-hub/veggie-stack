import HeroSection from '@/components/HeroSection'
import HowItWorks from '@/components/HowItWorks'
import FeaturedCategories from '@/components/FeaturedCategories'
import FeaturedSlideshow from '@/components/FeaturedSlideshow'
import HappyCustomers from '@/components/HappyCustomers'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <HowItWorks />
      <FeaturedCategories />
      <FeaturedSlideshow />
      <HappyCustomers />
    </main>
  )
}