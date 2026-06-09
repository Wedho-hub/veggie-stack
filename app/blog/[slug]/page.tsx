import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Clock, Calendar, Tag } from 'lucide-react'
import type { BlogPost, BlogCategory } from '@/types'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

const CATEGORY_CONFIG: Record<BlogCategory, { label: string; color: string; bg: string }> = {
  blog:           { label: 'Blog',              color: 'text-green-700',  bg: 'bg-green-100' },
  recipes:        { label: 'Recipes',           color: 'text-orange-700', bg: 'bg-orange-100' },
  nutrition:      { label: 'Nutrition Guide',   color: 'text-blue-700',   bg: 'bg-blue-100' },
  'farm-stories': { label: 'Farm Stories',      color: 'text-amber-700',  bg: 'bg-amber-100' },
  fitness:        { label: 'Exercise & Fitness',color: 'text-purple-700', bg: 'bg-purple-100' },
}

async function getPost(slug: string): Promise<BlogPost | null> {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
  const res = await fetch(`${baseUrl}/api/blog/${slug}`, { cache: 'no-store' })
  if (!res.ok) return null
  return (await res.json()).data
}

function readingTime(content: string): number {
  return Math.max(1, Math.ceil(content.split(/\s+/).length / 200))
}

function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('en-ZA', {
    year: 'numeric', month: 'long', day: 'numeric',
  }).format(new Date(date))
}

function renderContent(content: string) {
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  let listBuffer: string[] = []
  let key = 0

  function flushList() {
    if (listBuffer.length === 0) return
    elements.push(
      <ul key={key++} className="list-disc list-outside ml-6 space-y-1.5 my-5 text-gray-700 text-lg leading-relaxed">
        {listBuffer.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    )
    listBuffer = []
  }

  for (const raw of lines) {
    const line = raw.trim()

    if (line.startsWith('# ')) {
      flushList()
      elements.push(<h2 key={key++} className="text-3xl font-bold text-gray-900 mt-12 mb-4 leading-tight">{line.slice(2)}</h2>)
    } else if (line.startsWith('## ')) {
      flushList()
      elements.push(<h3 key={key++} className="text-2xl font-bold text-gray-900 mt-10 mb-3 leading-tight">{line.slice(3)}</h3>)
    } else if (line.startsWith('### ')) {
      flushList()
      elements.push(<h4 key={key++} className="text-xl font-semibold text-gray-800 mt-8 mb-2">{line.slice(4)}</h4>)
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      listBuffer.push(line.slice(2))
    } else if (line === '') {
      flushList()
    } else {
      flushList()
      elements.push(
        <p key={key++} className="text-gray-700 text-lg leading-[1.8] mb-5">{line}</p>
      )
    }
  }
  flushList()
  return elements
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center">
          <p className="text-5xl mb-4">🌿</p>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Post not found</h1>
          <Link href="/blog" className="text-green-600 hover:underline font-medium">
            ← Back to the journal
          </Link>
        </div>
      </div>
    )
  }

  const cat = post.category ? CATEGORY_CONFIG[post.category] : CATEGORY_CONFIG.blog
  const mins = readingTime(post.content)

  return (
    <div className="min-h-screen bg-stone-50">

      {/* ── HERO ── */}
      {post.coverImage ? (
        <div className="relative h-[55vh] min-h-[380px] w-full overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 px-6 pb-10 max-w-4xl mx-auto w-full">
            <span className={`inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 ${cat.bg} ${cat.color}`}>
              {cat.label}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight mb-4 drop-shadow">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="text-white/80 text-lg leading-relaxed max-w-2xl">{post.excerpt}</p>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-green-900 via-green-800 to-emerald-700 text-white">
          <div className="max-w-4xl mx-auto px-6 py-20 text-center">
            <div className="text-7xl mb-6 drop-shadow-lg">{post.coverEmoji ?? '🌱'}</div>
            <span className={`inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-5 ${cat.bg} ${cat.color}`}>
              {cat.label}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight mb-4">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="text-green-100 text-lg max-w-2xl mx-auto leading-relaxed">{post.excerpt}</p>
            )}
          </div>
        </div>
      )}

      {/* ── ARTICLE METADATA BAR ── */}
      <div className="border-b border-stone-200 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-4 flex flex-wrap items-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-1.5">
            <div className="w-7 h-7 rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
              {post.author[0]?.toUpperCase()}
            </div>
            <span className="font-medium text-gray-700">{post.author}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar size={14} />
            {formatDate(post.publishedAt)}
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={14} />
            {mins} min read
          </div>
          {(post.tags ?? []).length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap">
              <Tag size={14} />
              {(post.tags ?? []).map((tag) => (
                <span key={tag} className="bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full text-xs">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── ARTICLE BODY ── */}
      <div className="max-w-4xl mx-auto px-6 py-14">
        <div className="max-w-2xl mx-auto">

          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-green-600 transition-colors mb-10 font-medium"
          >
            <ArrowLeft size={15} />
            Back to the journal
          </Link>

          {/* Body copy */}
          <article>
            {renderContent(post.content)}
          </article>

          {/* Divider + author card */}
          <div className="mt-16 pt-10 border-t border-stone-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center text-lg font-bold shrink-0">
                {post.author[0]?.toUpperCase()}
              </div>
              <div>
                <p className="font-bold text-gray-900">{post.author}</p>
                <p className="text-sm text-gray-500 mt-0.5">
                  Veggie Stack · Plant-based living from Cape Town
                </p>
              </div>
            </div>
          </div>

          {/* Back to journal */}
          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-7 py-3 rounded-full transition-colors"
            >
              ← More from the journal
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}
