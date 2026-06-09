// app/api/orders/route.ts
import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Order from '@/models/Order'
import { generateOrderNumber } from '@/lib/payfast'

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const body = await request.json()

    const {
      customerEmail,
      items,
      deliveryAddress,
      subtotal,
      deliveryFee,
      total,
      paymentMethod,
    } = body

    // Create order in DB with 'pending' status
    const order = await Order.create({
      orderNumber: generateOrderNumber(),
      customerEmail,
      items,
      deliveryAddress,
      subtotal,
      deliveryFee,
      total,
      paymentMethod,
      status: 'pending',
    })

    return NextResponse.json(
      { success: true, data: order },
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