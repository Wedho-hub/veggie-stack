// app/api/admin/orders/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import connectDB from '@/lib/mongodb'
import Order from '@/models/Order'
import type { OrderStatus } from '@/models/Order'

async function requireAdmin() {
  const session = await auth()
  if (!session?.user || session.user.role !== 'admin') return null
  return session
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  await connectDB()
  const { id } = await params
  const { status }: { status: OrderStatus } = await request.json()

  const validStatuses: OrderStatus[] = [
    'pending', 'payment_initiated', 'paid',
    'processing', 'out_for_delivery', 'delivered',
    'cancelled', 'refunded',
  ]

  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
  }

  const order = await Order.findByIdAndUpdate(
    id,
    { status },
    { returnDocument: 'after' }
  )

  if (!order) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ success: true, data: order })
}