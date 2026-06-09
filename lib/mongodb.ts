// lib/mongodb.ts
// Same pattern you know from Node — just typed

import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI as string

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in .env.local')
}

// This caches the connection so Next.js doesn't open
// a new DB connection on every hot reload in development
let cached = (global as any).mongoose || { conn: null, promise: null }

async function connectDB() {
  if (cached.conn) return cached.conn

  cached.promise = cached.promise || mongoose.connect(MONGODB_URI)
  cached.conn = await cached.promise
  return cached.conn
}

export default connectDB