// lib/seed.ts
// Run: DOTENV_CONFIG_PATH=".env.local" npx ts-node -r dotenv/config --skip-project lib/seed.ts
import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI as string

// All images are free-to-use from Unsplash (no attribution required under Unsplash licence).
// These are the kinds of shots you want for your own product photography —
// clean backgrounds, natural light, tight crop, vibrant colour.

const products = [
  // ── VEGETABLES ────────────────────────────────────────────────
  {
    name: 'Mixed Salad Box',
    description: 'Seasonal greens, rocket, spinach and watercress — harvested this morning from Stellenbosch farms.',
    price: 89,
    category: 'vegetable',
    inStock: true,
    farmOrigin: 'Stellenbosch',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=85&fit=crop&auto=format',
    tags: ['salad', 'greens', 'organic', 'fresh'],
  },
  {
    name: 'Baby Spinach 200g',
    description: 'Tender baby spinach leaves, triple washed and ready to eat.',
    price: 35,
    category: 'vegetable',
    inStock: true,
    farmOrigin: 'Philippi',
    imageUrl: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=800&q=85&fit=crop&auto=format',
    tags: ['spinach', 'salad', 'iron'],
  },
  {
    name: 'Rainbow Chard Bunch',
    description: 'Vibrant stems and dark leafy greens — rich in iron and magnesium.',
    price: 45,
    category: 'vegetable',
    inStock: true,
    farmOrigin: 'Noordhoek',
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=85&fit=crop&auto=format',
    tags: ['chard', 'leafy greens', 'iron'],
  },
  {
    name: 'Sweet Potato Pack x4',
    description: 'Garnet sweet potatoes from the Sandveld. High in beta-carotene and naturally sweet.',
    price: 55,
    category: 'vegetable',
    inStock: true,
    farmOrigin: 'Sandveld',
    imageUrl: 'https://images.unsplash.com/photo-1596097635121-14b38c5d7a27?w=800&q=85&fit=crop&auto=format',
    tags: ['sweet potato', 'beta-carotene', 'root veg'],
  },
  {
    name: 'Broccoli Crown',
    description: 'One large, dense broccoli crown from Elgin Valley. Blanch, roast or eat raw.',
    price: 42,
    category: 'vegetable',
    inStock: true,
    farmOrigin: 'Elgin Valley',
    imageUrl: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=800&q=85&fit=crop&auto=format',
    tags: ['broccoli', 'cruciferous', 'vitamin c'],
  },

  // ── FRUIT ─────────────────────────────────────────────────────
  {
    name: 'Cape Berry Punnet',
    description: 'Hand-picked strawberries, blueberries and raspberries from the Elgin Valley.',
    price: 65,
    category: 'fruit',
    inStock: true,
    farmOrigin: 'Elgin Valley',
    imageUrl: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=800&q=85&fit=crop&auto=format',
    tags: ['berries', 'fruit', 'antioxidants'],
  },
  {
    name: 'Hass Avocados x6',
    description: 'Creamy Hass avocados, perfectly ripened. From the Limpopo groves.',
    price: 75,
    category: 'fruit',
    inStock: true,
    farmOrigin: 'Limpopo',
    imageUrl: 'https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?w=800&q=85&fit=crop&auto=format',
    tags: ['avocado', 'healthy fats', 'popular'],
  },
  {
    name: 'Valencia Oranges x8',
    description: 'Sweet, juicy Valencia oranges perfect for fresh juice or eating out of hand.',
    price: 58,
    category: 'fruit',
    inStock: true,
    farmOrigin: 'Citrusdal',
    imageUrl: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=800&q=85&fit=crop&auto=format',
    tags: ['citrus', 'vitamin c', 'juice'],
  },
  {
    name: 'Medjool Dates 250g',
    description: 'Soft, caramel-sweet Medjool dates. Nature\'s energy food.',
    price: 95,
    category: 'fruit',
    inStock: true,
    farmOrigin: 'Northern Cape',
    imageUrl: 'https://images.unsplash.com/photo-1558818498-28c1e002b655?w=800&q=85&fit=crop&auto=format',
    tags: ['dates', 'energy', 'natural sugar'],
  },

  // ── GADGETS ───────────────────────────────────────────────────
  {
    name: 'NutriBullet Pro 900',
    description: 'High-speed blender for smoothies, nut milks and soups. 900W motor.',
    price: 1299,
    category: 'gadget',
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=800&q=85&fit=crop&auto=format',
    tags: ['blender', 'smoothies', 'kitchen'],
  },
  {
    name: 'Bamboo Cutting Board Set',
    description: 'Sustainably sourced bamboo boards in 3 sizes. Naturally antibacterial.',
    price: 349,
    category: 'gadget',
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=800&q=85&fit=crop&auto=format',
    tags: ['bamboo', 'eco', 'kitchen'],
  },
  {
    name: 'Cold Press Juicer',
    description: 'Slow masticating juicer — preserves enzymes and nutrients at low RPM.',
    price: 2199,
    category: 'gadget',
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1607532941433-304659e8198a?w=800&q=85&fit=crop&auto=format',
    tags: ['juicer', 'cold press', 'kitchen'],
  },

  // ── SUPPLEMENTS ───────────────────────────────────────────────
  {
    name: 'Organic Spirulina Powder',
    description: 'Pure spirulina, 250g. South African sourced, cold-processed. 60% protein by weight.',
    price: 180,
    category: 'supplement',
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1622484212935-b6ee9dbddfd4?w=800&q=85&fit=crop&auto=format',
    tags: ['spirulina', 'protein', 'superfood'],
  },
  {
    name: 'Moringa Leaf Capsules',
    description: '60 capsules of pure moringa leaf. Rich in iron, calcium and all essential amino acids.',
    price: 145,
    category: 'supplement',
    inStock: false,
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=85&fit=crop&auto=format',
    tags: ['moringa', 'vitamins', 'capsules'],
  },
  {
    name: 'Lion\'s Mane Mushroom Extract',
    description: 'Certified organic lion\'s mane extract powder. Brain health and focus support.',
    price: 220,
    category: 'supplement',
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1611921561969-b36bde6e9e3e?w=800&q=85&fit=crop&auto=format',
    tags: ['mushroom', 'brain health', 'nootropic'],
  },
]

const blogPosts = [
  {
    title: 'Why Farm-Direct Produce Tastes Better',
    slug: 'why-farm-direct-produce-tastes-better',
    excerpt: 'The difference between supermarket veg and farm-direct produce is more than just freshness — it changes the entire flavour profile of your cooking.',
    content: `When you buy vegetables from a supermarket, you're often eating produce that was harvested up to two weeks ago. Cold chain logistics, long transport routes and ripening agents strip food of its natural sugars and enzymes before it ever reaches your plate.\n\nAt Veggie Stack, we work directly with farms in Stellenbosch, Noordhoek, Philippi and the Elgin Valley. Most of our produce travels less than 80km and arrives at your door within 24 hours of harvest.\n\n## The Science of Freshness\n\nStudies show that vitamin C in spinach degrades by up to 75% within seven days of harvest at room temperature. Freshness isn't just about taste — it's about nutrition.\n\n## What to Look For\n\n- Bright, vibrant colour with no yellowing\n- Crisp texture — wilting is a sign of moisture loss\n- Earthy, natural aroma — not a chemical smell\n- Weight — fresh produce feels heavy for its size\n\nNext time you cook, try our Stellenbosch salad box alongside anything from a major retailer. The difference will be immediately obvious.`,
    author: 'Veggie Stack Team',
    coverEmoji: '🥬',
    coverImage: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1200&q=85&fit=crop&auto=format',
    category: 'farm-stories',
    featured: true,
    tags: ['farms', 'fresh', 'nutrition'],
  },
  {
    title: '5 Green Smoothies to Start Your Week',
    slug: '5-green-smoothies-to-start-your-week',
    excerpt: 'Packed with Cape-grown spinach, banana and spirulina — these five smoothies will change your Monday morning routine.',
    content: `Starting your day with a green smoothie is one of the highest-leverage habits you can build. Here are five of our favourites using ingredients available in our shop.\n\n## 1. The Cape Classic\n\nSpinach, banana, almond milk, a teaspoon of spirulina and a squeeze of lemon. Blend for 60 seconds. This is the entry-level green smoothie — sweet enough to mask the greens, nutritious enough to fuel your morning.\n\n## 2. Berry Boost\n\nOur Cape Berry Punnet forms the base here. Add spinach, coconut water and a frozen banana. High in antioxidants.\n\n## 3. Avocado Cream\n\nHalf a Hass avo, spinach, cucumber, lime juice and coconut water. Surprisingly filling and great for healthy fats.\n\n## 4. Moringa Morning\n\nBanana, mango, moringa powder, ginger and oat milk. Anti-inflammatory and energising.\n\n## 5. The Green Giant\n\nKale, celery, cucumber, green apple, lemon and ginger. Cold-pressed for maximum nutrients. Not for the faint-hearted.`,
    author: 'Yandisa Khumalo',
    coverEmoji: '🥤',
    coverImage: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=85&fit=crop&auto=format',
    category: 'recipes',
    featured: false,
    tags: ['recipes', 'smoothies', 'nutrition'],
  },
  {
    title: 'A Morning at Noordhoek Farm',
    slug: 'a-morning-at-noordhoek-farm',
    excerpt: 'We spent a morning with the Joubert family at their Noordhoek market garden to understand what goes into your weekly veg box.',
    content: `At 5:30am the Noordhoek valley is still dark. Pieter Joubert and his two farm workers are already in the chard beds, headlamps on, harvesting by hand.\n\n"The trick is to cut before the heat hits," Pieter says, snipping a rainbow chard stem at the base. "Once the sun comes up, the leaves start to respire and you lose that crispness."\n\n## Three Generations\n\nThe Joubert family has farmed this plot for three generations. They transitioned to chemical-free growing in 2018 — not because it was fashionable, but because the soil was telling them something.\n\n"We started seeing fewer earthworms," says his wife, Anri. "That's your early warning system right there."\n\n## From Soil to Your Kitchen\n\nBy 7am, the harvest is packed into our branded cooler boxes and loaded onto the Veggie Stack van. From soil to your kitchen in under 18 hours.\n\nThis is why we do what we do.`,
    author: 'Lebo Mokoena',
    coverEmoji: '🌾',
    coverImage: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=1200&q=85&fit=crop&auto=format',
    category: 'farm-stories',
    featured: false,
    tags: ['farms', 'stories', 'behind the scenes'],
  },
  {
    title: 'The Complete Guide to Plant Protein',
    slug: 'the-complete-guide-to-plant-protein',
    excerpt: 'Everything you need to know about hitting your protein targets on a fully plant-based diet — without supplements.',
    content: `One of the most common concerns people have when moving to a plant-based diet is protein. The question "but where do you get your protein?" never quite goes away. Here is the definitive answer.\n\n## Complete vs Incomplete Proteins\n\nAnimal proteins are "complete" — they contain all nine essential amino acids. Most plant proteins are "incomplete," but this is easily solved by eating a variety of sources throughout the day.\n\n## The Best Plant Protein Sources\n\n- Lentils: 18g per cooked cup\n- Chickpeas: 15g per cooked cup\n- Edamame: 17g per cup\n- Spirulina: 8g per tablespoon\n- Hemp seeds: 10g per 3 tablespoons\n- Pumpkin seeds: 9g per 30g serving\n\n## Practical Meal Planning\n\nA bowl of lentil dhal with a side of edamame and a spirulina smoothie will hit 40g of protein easily. You don't need to overthink it — eat a variety of whole plant foods and the protein takes care of itself.`,
    author: 'Dr Nompumelelo Dlamini',
    coverEmoji: '💪',
    coverImage: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=1200&q=85&fit=crop&auto=format',
    category: 'nutrition',
    featured: false,
    tags: ['protein', 'plant-based', 'nutrition guide'],
  },
]

async function seed() {
  console.log('🌱 Connecting to MongoDB...')
  await mongoose.connect(MONGODB_URI)
  console.log('✅ Connected. Seeding...')

  const ProductSchema = new mongoose.Schema({
    name: String, description: String, price: Number, category: String,
    imageUrl: { type: String, default: '' },
    inStock: { type: Boolean, default: true },
    farmOrigin: String, tags: [String],
  }, { timestamps: true })

  const BlogPostSchema = new mongoose.Schema({
    title: String, slug: String, excerpt: String, content: String,
    author: String,
    coverEmoji: { type: String, default: '🌱' },
    coverImage: { type: String, default: '' },
    category: { type: String, default: 'blog' },
    featured: { type: Boolean, default: false },
    tags: [String],
    publishedAt: { type: Date, default: Date.now },
  }, { timestamps: true })

  const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema)
  const BlogPost = mongoose.models.BlogPost || mongoose.model('BlogPost', BlogPostSchema)

  await Product.deleteMany({})
  await BlogPost.deleteMany({})

  await Product.insertMany(products)
  await BlogPost.insertMany(blogPosts)

  console.log(`🥦 Inserted ${products.length} products`)
  console.log(`📝 Inserted ${blogPosts.length} blog posts`)

  await mongoose.disconnect()
  console.log('✅ Done!')
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
