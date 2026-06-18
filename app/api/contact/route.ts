import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import mongoose, { Schema, Model } from 'mongoose'
import { notifyAdmin } from '@/lib/email'

interface IContact {
  name: string
  email: string
  subject: string
  message: string
  createdAt: Date
}

const ContactSchema = new Schema<IContact>(
  { name: String, email: String, subject: String, message: String },
  { timestamps: true }
)

const Contact: Model<IContact> =
  mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema)

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email and message are required' }, { status: 400 })
    }

    await connectDB()
    await Contact.create({ name, email, subject, message })

    await notifyAdmin({
      subject: `New Contact: ${subject}`,
      replyTo: email,
      html: `
        <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr/>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
    })

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Server error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
