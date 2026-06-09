// app/api/admin/products/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import connectDB from '@/lib/mongodb'
import Product from '@/models/Product'

// Reusable admin auth check
// TypeScript: returns the session or null — caller must handle null
async function requireAdmin() {
  const session = await auth()
  if (!session?.user || session.user.role !== 'admin') return null
  return session
}

export async function GET() {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  await connectDB()
  const products = await Product.find({}).sort({ createdAt: -1 })
  return NextResponse.json({ success: true, data: products })
}

export async function POST(request: NextRequest) {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  await connectDB()
  const body = await request.json()
  const product = await Product.create(body)
  return NextResponse.json({ success: true, data: product }, { status: 201 })
}