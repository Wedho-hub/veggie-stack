import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import connectDB from '@/lib/mongodb'
import BlogPost from '@/models/BlogPost'

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
  const body = await request.json()

  const post = await BlogPost.findByIdAndUpdate(id, body, { returnDocument: 'after' })
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  return NextResponse.json({ success: true, data: post })
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  await connectDB()
  const { id } = await params
  await BlogPost.findByIdAndDelete(id)
  return NextResponse.json({ success: true })
}
