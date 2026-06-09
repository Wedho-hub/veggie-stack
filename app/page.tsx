// app/page.tsx
import HeroSection from '@/components/HeroSection'
import FeaturedCategories from '@/components/FeaturedCategories'
import FeaturedProducts from '@/components/FeaturedProducts'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <FeaturedCategories />
      <FeaturedProducts />
    </main>
  )
}