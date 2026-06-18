import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import mongoose, { Schema, Model } from 'mongoose'
import { notifyAdmin } from '@/lib/email'

interface ISupplierApplication {
  companyName: string
  contactName: string
  email: string
  phone: string
  category: string
  website?: string
  message?: string
  createdAt: Date
}

const SupplierApplicationSchema = new Schema<ISupplierApplication>(
  {
    companyName: String,
    contactName: String,
    email: String,
    phone: String,
    category: String,
    website: String,
    message: String,
  },
  { timestamps: true }
)

const SupplierApplication: Model<ISupplierApplication> =
  mongoose.models.SupplierApplication || mongoose.model<ISupplierApplication>('SupplierApplication', SupplierApplicationSchema)

export async function POST(request: NextRequest) {
  try {
    const { companyName, contactName, email, phone, category, website, message } = await request.json()

    if (!companyName || !contactName || !email || !phone || !category) {
      return NextResponse.json({ error: 'Please fill in all required fields' }, { status: 400 })
    }

    await connectDB()
    await SupplierApplication.create({ companyName, contactName, email, phone, category, website, message })

    await notifyAdmin({
      subject: `Supplier Inquiry: ${companyName}`,
      replyTo: email,
      html: `
        <p><strong>Company:</strong> ${companyName} (${category})</p>
        <p><strong>Contact:</strong> ${contactName} &lt;${email}&gt; · ${phone}</p>
        ${website ? `<p><strong>Website:</strong> <a href="${website}">${website}</a></p>` : ''}
        ${message ? `<hr/><p>${(message as string).replace(/\n/g, '<br/>')}</p>` : ''}
      `,
    })

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Server error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
