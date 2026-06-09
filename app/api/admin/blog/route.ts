import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import connectDB from '@/lib/mongodb'
import BlogPost from '@/models/BlogPost'

async function requireAdmin() {
  const session = await auth()
  if (!session?.user || session.user.role !== 'admin') return null
  return session
}

export async function GET() {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  await connectDB()
  const posts = await BlogPost.find({}).sort({ publishedAt: -1 })
  return NextResponse.json({ success: true, data: posts })
}

export async function POST(request: NextRequest) {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  await connectDB()
  const body = await request.json()
  const post = await BlogPost.create(body)
  return NextResponse.json({ success: true, data: post }, { status: 201 })
}
