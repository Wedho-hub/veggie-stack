// types/index.ts

export type Category = 'fruit' | 'vegetable' | 'gadget' | 'supplement'

export interface Product {
  _id: string
  name: string
  description: string
  price: number
  category: Category        // TypeScript enforces only these 4 values
  imageUrl: string
  inStock: boolean
  farmOrigin?: string
  tags?: string[]
  createdAt: Date
}

export type BlogCategory = 'blog' | 'recipes' | 'nutrition' | 'farm-stories' | 'fitness'

export interface BlogPost {
  _id: string
  title: string
  slug: string
  excerpt?: string
  content: string
  coverEmoji?: string
  coverImage?: string
  category?: BlogCategory
  featured?: boolean
  author: string
  tags: string[]
  publishedAt: Date
}

export interface CartItem {
  product: Product
  quantity: number
}

// ── AUTH TYPES ────────────────────────────────────────────────

export type UserRole = 'customer' | 'admin'

export interface AppUser {
  _id: string
  name: string
  email: string
  role: UserRole
  createdAt: Date
}