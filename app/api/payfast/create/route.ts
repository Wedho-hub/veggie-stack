// app/api/payfast/create/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { buildPayFastUrl } from '@/lib/payfast'

export async function POST(request: NextRequest) {
  try {
    const { orderNumber, amount, email, name, itemName } = await request.json()

    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'

    const url = buildPayFastUrl({
      merchant_id: process.env.PAYFAST_MERCHANT_ID!,
      merchant_key: process.env.PAYFAST_MERCHANT_KEY!,
      passphrase: process.env.PAYFAST_PASSPHRASE || undefined,
      return_url: `${baseUrl}/order-confirmed?order=${orderNumber}`,
      cancel_url: `${baseUrl}/checkout`,
      notify_url: `${baseUrl}/api/payfast/notify`,
      name_first: name.split(' ')[0],
      email_address: email,
      m_payment_id: orderNumber,
      amount: parseFloat(amount).toFixed(2),
      item_name: itemName,
    })

    return NextResponse.json({ url })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}