// app/api/admin/orders/route.ts
import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import connectDB from '@/lib/mongodb'
import Order from '@/models/Order'

async function requireAdmin() {
  const session = await auth()
  if (!session?.user || session.user.role !== 'admin') return null
  return session
}

export async function GET() {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  await connectDB()
  const orders = await Order.find({}).sort({ createdAt: -1 })
  return NextResponse.json({ success: true, data: orders })
}