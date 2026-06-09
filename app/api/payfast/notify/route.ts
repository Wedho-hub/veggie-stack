// app/api/payfast/notify/route.ts
// PayFast POSTs to this URL after every payment
// We verify the signature and update the order status

import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Order from '@/models/Order'
import { generatePayFastSignature } from '@/lib/payfast'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    // Convert FormData to plain object
    const data: Record<string, string> = {}
    formData.forEach((value, key) => {
      data[key] = value.toString()
    })

    // Verify the signature to confirm this is genuinely from PayFast
    const receivedSignature = data.signature
    const passphrase = process.env.PAYFAST_PASSPHRASE

    const expectedSignature = generatePayFastSignature(data, passphrase || undefined)

    if (receivedSignature !== expectedSignature) {
      console.error('PayFast signature mismatch')
      return new NextResponse('Invalid signature', { status: 400 })
    }

    // Only update if payment was actually completed
    if (data.payment_status === 'COMPLETE') {
      await connectDB()

      await Order.findOneAndUpdate(
        { orderNumber: data.m_payment_id },
        {
          status: 'paid',
          paymentId: data.pf_payment_id,
          paidAt: new Date(),
        }
      )
    }

    // PayFast expects a 200 response
    return new NextResponse('OK', { status: 200 })
  } catch (error) {
    console.error('PayFast notify error:', error)
    return new NextResponse('Server error', { status: 500 })
  }
}