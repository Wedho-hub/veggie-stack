// models/Product.ts
import mongoose, { Schema, Document, Model } from 'mongoose'
import type { Category } from '@/types'

// TypeScript + Mongoose pattern:
// We extend Document (Mongoose's base type) with our own Product fields
// This gives us full type safety on every DB operation
export interface IProduct extends Document {
  name: string
  description: string
  price: number
  category: Category
  imageUrl: string
  inStock: boolean
  farmOrigin?: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    category: {
      type: String,
      required: true,
      // Mongoose enforces these values at the DB level too
      enum: ['fruit', 'vegetable', 'gadget', 'supplement'],
    },
    imageUrl: {
      type: String,
      default: '',
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    farmOrigin: {
      type: String,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    // This automatically adds createdAt and updatedAt fields
    timestamps: true,
  }
)

// This pattern prevents Next.js hot reload from creating
// duplicate models — you'll hit this bug without it
const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema)

export default Product