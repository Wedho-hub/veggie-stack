// app/api/products/route.ts
// This IS your backend. No Express needed.
// Next.js turns this file into a real HTTP endpoint at /api/products

import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Product from '@/models/Product'

// TypeScript: this tells Next.js this is a GET handler
// NextRequest gives us typed access to query params, headers etc.
export async function GET(request: NextRequest) {
  try {
    await connectDB()

    // Pull query params from the URL
    // e.g. /api/products?category=fruit&inStock=true
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const inStock = searchParams.get('inStock')

    // Build the query object dynamically
    // TypeScript: Record<string, unknown> means an object with
    // string keys and any values — flexible but still typed
    const query: Record<string, unknown> = {}

    if (category) query.category = category
    if (inStock === 'true') query.inStock = true

    const products = await Product.find(query).sort({ createdAt: -1 })

    return NextResponse.json(
      { success: true, data: products },
      { status: 200 }
    )
  } catch (error) {
    // TypeScript: error is 'unknown' type by default — we cast it
    const message = error instanceof Error ? error.message : 'Server error'
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    )
  }
}

// POST handler — add a new product
export async function POST(request: NextRequest) {
  try {
    await connectDB()

    // Parse the JSON body — next.js gives us this typed
    const body = await request.json()
    const product = await Product.create(body)

    return NextResponse.json(
      { success: true, data: product },
      { status: 201 }
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Server error'
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    )
  }
}