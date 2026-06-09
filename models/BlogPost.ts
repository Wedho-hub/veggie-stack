// models/BlogPost.ts
import mongoose, { Schema, Document, Model } from 'mongoose'

export type BlogCategory = 'blog' | 'recipes' | 'nutrition' | 'farm-stories' | 'fitness'

export interface IBlogPost extends Document {
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  coverEmoji: string
  coverImage?: string
  category: BlogCategory
  featured: boolean
  tags: string[]
  publishedAt: Date
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    // Slug is the URL-friendly version of the title
    // e.g. "How to Juice" becomes "how-to-juice"
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    coverEmoji: {
      type: String,
      default: '🌱',
    },
    coverImage: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      enum: ['blog', 'recipes', 'nutrition', 'farm-stories', 'fitness'],
      default: 'blog',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: [String],
      default: [],
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
)

const BlogPost: Model<IBlogPost> =
  mongoose.models.BlogPost ||
  mongoose.model<IBlogPost>('BlogPost', BlogPostSchema)

export default BlogPost