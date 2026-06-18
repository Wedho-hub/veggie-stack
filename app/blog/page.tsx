'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Clock, ArrowRight } from 'lucide-react'
import type { BlogPost, BlogCategory } from '@/types'
import PageHeader from '@/components/PageHeader'

const CATEGORIES: { key: BlogCategory | 'all'; label: string; color: string; activeColor: string }[] = [
  { key: 'all',           label: 'All',               color: 'text-gray-600',   activeColor: 'bg-gray-900 text-white' },
  { key: 'blog',          label: 'Blog',              color: 'text-green-700',  activeColor: 'bg-green-700 text-white' },
  { key: 'recipes',       label: 'Recipes',           color: 'text-orange-700', activeColor: 'bg-orange-600 text-white' },
  { key: 'nutrition',     label: 'Nutrition Guide',   color: 'text-blue-700',   activeColor: 'bg-blue-700 text-white' },
  { key: 'farm-stories',  label: 'Farm Stories',      color: 'text-amber-700',  activeColor: 'bg-amber-600 text-white' },
  { key: 'fitness',       label: 'Exercise & Fitness',color: 'text-purple-700', activeColor: 'bg-purple-700 text-white' },
]

const CAT_BADGE: Record<BlogCategory, string> = {
  blog:           'bg-green-100 text-green-700',
  recipes:        'bg-orange-100 text-orange-700',
  nutrition:      'bg-blue-100 text-blue-700',
  'farm-stories': 'bg-amber-100 text-amber-700',
  fitness:        'bg-purple-100 text-purple-700',
}

function readingTime(content: string) {
  return Math.max(1, Math.ceil(content.split(/\s+/).length / 200))
}

function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat('en-ZA', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(date))
}

function catLabel(cat?: BlogCategory) {
  return CATEGORIES.find((c) => c.key === cat)?.label ?? 'Blog'
}

function catBadge(cat?: BlogCategory): string {
  return cat ? CAT_BADGE[cat] : CAT_BADGE.blog
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState<BlogCategory | 'all'>('all')

  useEffect(() => {
    const url = active === 'all' ? '/api/blog' : `/api/blog?category=${active}`
    fetch(url)
      .then((r) => r.json())
      .then((d) => { setPosts(d.data ?? []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [active])

  const featured = posts.find((p) => p.featured) ?? posts[0]
  const rest = posts.filter((p) => p._id !== featured?._id)

  return (
    <div className="min-h-screen bg-stone-50">

      <PageHeader
        title="Fresh Reads"
        description="Recipes, farm stories, nutrition science and plant-based living — straight from Cape Town."
      />

      {/* Category tabs */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto pb-px scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => { setLoading(true); setPosts([]); setActive(cat.key) }}
                className={`shrink-0 px-4 py-2.5 text-sm font-semibold rounded-t-xl border-b-2 transition-all whitespace-nowrap ${
                  active === cat.key
                    ? 'border-green-600 text-green-700 bg-green-50'
                    : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-stone-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl h-80 animate-pulse" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <p className="text-5xl mb-4">📰</p>
            <p className="font-semibold text-lg">No posts in this category yet</p>
          </div>
        ) : (
          <>
            {/* ── FEATURED POST ── */}
            {featured && (
              <Link href={`/blog/${featured.slug}`} className="group block mb-12">
                <div className="bg-white rounded-3xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-2">
                  {/* Image / Emoji cover */}
                  <div className="relative h-72 lg:h-full min-h-80 overflow-hidden">
                    {featured.coverImage ? (
                      <Image
                        src={featured.coverImage}
                        alt={featured.title}
                        fill
                        loading="eager"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-linear-to-br from-green-600 to-emerald-400 flex items-center justify-center text-8xl">
                        {featured.coverEmoji ?? '🌱'}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-r from-transparent to-black/10" />
                    <span className="absolute top-4 left-4 text-xs font-bold uppercase tracking-widest bg-white/90 text-gray-700 px-3 py-1.5 rounded-full">
                      Featured
                    </span>
                  </div>

                  {/* Text */}
                  <div className="p-8 lg:p-10 flex flex-col justify-center">
                    <span className={`inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 w-fit ${catBadge(featured.category)}`}>
                      {catLabel(featured.category)}
                    </span>
                    <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight mb-4 group-hover:text-green-700 transition-colors">
                      {featured.title}
                    </h2>
                    {featured.excerpt && (
                      <p className="text-gray-500 leading-relaxed mb-6 text-base line-clamp-3">{featured.excerpt}</p>
                    )}
                    <div className="flex items-center justify-between text-sm text-gray-400 mt-auto">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-bold">
                          {featured.author[0]?.toUpperCase()}
                        </div>
                        <span className="font-medium text-gray-600">{featured.author}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1"><Clock size={13} />{readingTime(featured.content)} min</span>
                        <span>{formatDate(featured.publishedAt)}</span>
                      </div>
                    </div>
                    <div className="mt-6">
                      <span className="inline-flex items-center gap-2 text-green-600 font-semibold text-sm group-hover:gap-3 transition-all">
                        Read article <ArrowRight size={15} />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* ── GRID ── */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                {rest.map((post, index) => (
                  <Link
                    key={post._id}
                    href={`/blog/${post.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col"
                  >
                    {/* Cover */}
                    <div className="relative h-52 overflow-hidden shrink-0">
                      {post.coverImage ? (
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          loading={index < 3 ? 'eager' : 'lazy'}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-linear-to-br from-green-50 to-emerald-100 flex items-center justify-center text-6xl">
                          {post.coverEmoji ?? '🌱'}
                        </div>
                      )}
                    </div>

                    <div className="p-5 flex flex-col flex-1">
                      <span className={`inline-block text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-3 w-fit ${catBadge(post.category)}`}>
                        {catLabel(post.category)}
                      </span>

                      <h2 className="font-display font-extrabold text-gray-900 text-lg leading-snug mb-2 group-hover:text-green-700 transition-colors line-clamp-2 flex-1">
                        {post.title}
                      </h2>

                      {post.excerpt && (
                        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">
                          {post.excerpt}
                        </p>
                      )}

                      <div className="flex items-center justify-between text-xs text-gray-400 mt-auto pt-3 border-t border-stone-100">
                        <span className="font-medium text-gray-500">{post.author}</span>
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-0.5"><Clock size={11} />{readingTime(post.content)}m</span>
                          <span>{formatDate(post.publishedAt)}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
