// app/api/paypal/confirm/route.ts
import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Order from '@/models/Order'

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const { orderNumber, paypalOrderId } = await request.json()

    await Order.findOneAndUpdate(
      { orderNumber },
      {
        status: 'paid',
        paymentId: paypalOrderId,
        paidAt: new Date(),
      }
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Server error'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}