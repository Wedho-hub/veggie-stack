import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import BlogPost from '@/models/BlogPost'

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const tag = searchParams.get('tag')
    const featuredOnly = searchParams.get('featured') === 'true'

    const query: Record<string, unknown> = {}
    if (category) query.category = category
    if (tag) query.tags = tag
    if (featuredOnly) query.featured = true

    const posts = await BlogPost.find(query).sort({ publishedAt: -1 })
    return NextResponse.json({ success: true, data: posts }, { status: 200 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Server error'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
