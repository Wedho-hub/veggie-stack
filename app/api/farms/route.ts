import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import mongoose, { Schema, Model } from 'mongoose'
import { notifyAdmin } from '@/lib/email'

interface IFarmApplication {
  farmName: string
  contactName: string
  email: string
  phone: string
  location: string
  produceType: string
  weeklyVolume?: string
  message?: string
  createdAt: Date
}

const FarmApplicationSchema = new Schema<IFarmApplication>(
  {
    farmName: String,
    contactName: String,
    email: String,
    phone: String,
    location: String,
    produceType: String,
    weeklyVolume: String,
    message: String,
  },
  { timestamps: true }
)

const FarmApplication: Model<IFarmApplication> =
  mongoose.models.FarmApplication || mongoose.model<IFarmApplication>('FarmApplication', FarmApplicationSchema)

export async function POST(request: NextRequest) {
  try {
    const { farmName, contactName, email, phone, location, produceType, weeklyVolume, message } = await request.json()

    if (!farmName || !contactName || !email || !phone || !location || !produceType) {
      return NextResponse.json({ error: 'Please fill in all required fields' }, { status: 400 })
    }

    await connectDB()
    await FarmApplication.create({ farmName, contactName, email, phone, location, produceType, weeklyVolume, message })

    await notifyAdmin({
      subject: `Farm Partner Application: ${farmName}`,
      replyTo: email,
      html: `
        <p><strong>Farm:</strong> ${farmName}</p>
        <p><strong>Contact:</strong> ${contactName} &lt;${email}&gt; · ${phone}</p>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Produce:</strong> ${produceType}${weeklyVolume ? ` · ${weeklyVolume}/week` : ''}</p>
        ${message ? `<hr/><p>${(message as string).replace(/\n/g, '<br/>')}</p>` : ''}
      `,
    })

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Server error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
