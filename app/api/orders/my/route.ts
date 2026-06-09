// app/api/orders/my/route.ts
import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import connectDB from '@/lib/mongodb'
import Order from '@/models/Order'

export async function GET() {
  try {
    // auth() on the server gives us the session directly
    // No need for useSession() — this is the server-side equivalent
    const session = await auth()

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
    }

    await connectDB()

    const orders = await Order.find({
      customerEmail: session.user.email,
    }).sort({ createdAt: -1 })

    return NextResponse.json({ success: true, data: orders })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}