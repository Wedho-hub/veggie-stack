'use client'

import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, X, Check, FileText, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import ImageUpload from '@/components/admin/ImageUpload'

type BlogCategory = 'blog' | 'recipes' | 'nutrition' | 'farm-stories' | 'fitness'

const CATEGORIES: { value: BlogCategory; label: string }[] = [
  { value: 'blog',          label: 'Blog' },
  { value: 'recipes',       label: 'Recipes' },
  { value: 'nutrition',     label: 'Nutrition Guide' },
  { value: 'farm-stories',  label: 'Farm Stories' },
  { value: 'fitness',       label: 'Exercise & Fitness' },
]

type BlogForm = {
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  coverEmoji: string
  coverImage: string
  category: BlogCategory
  featured: boolean
  tags: string[]
  publishedAt: string
}

type PostData = {
  _id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  coverEmoji: string
  coverImage?: string
  category?: BlogCategory
  featured?: boolean
  tags: string[]
  publishedAt: string
}

function slugify(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-ZA', {
    year: 'numeric', month: 'short', day: 'numeric',
  }).format(new Date(date))
}

const emptyForm = (author: string): BlogForm => ({
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  author,
  coverEmoji: '🌱',
  coverImage: '',
  category: 'blog',
  featured: false,
  tags: [],
  publishedAt: new Date().toISOString().slice(0, 10),
})

export default function AdminBlogPage() {
  const { data: session } = useSession()
  const [posts, setPosts] = useState<PostData[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<BlogForm>(emptyForm(''))
  const [saving, setSaving] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const [guideOpen, setGuideOpen] = useState(false)

  const authorName = session?.user?.name ?? ''

  useEffect(() => {
    let active = true
    fetch('/api/admin/blog')
      .then((r) => r.json())
      .then((data) => { if (active) { setPosts(data.data ?? []); setLoading(false) } })
      .catch(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [refreshKey])

  function openCreateForm() {
    setForm(emptyForm(authorName))
    setEditingId(null)
    setShowForm(true)
  }

  function openEditForm(post: PostData) {
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      coverEmoji: post.coverEmoji ?? '🌱',
      coverImage: post.coverImage ?? '',
      category: post.category ?? 'blog',
      featured: post.featured ?? false,
      tags: post.tags ?? [],
      publishedAt: post.publishedAt
        ? new Date(post.publishedAt).toISOString().slice(0, 10)
        : new Date().toISOString().slice(0, 10),
    })
    setEditingId(post._id)
    setShowForm(true)
  }

  function handleTitleChange(value: string) {
    setForm((prev) => ({
      ...prev,
      title: value,
      slug: editingId ? prev.slug : slugify(value),
    }))
  }

  async function handleSave() {
    if (!form.title || !form.excerpt || !form.content || !form.author) return
    setSaving(true)
    const url = editingId ? `/api/admin/blog/${editingId}` : '/api/admin/blog'
    const method = editingId ? 'PATCH' : 'POST'

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        tags: form.tags,
        publishedAt: new Date(form.publishedAt),
      }),
    })

    setShowForm(false)
    setSaving(false)
    setLoading(true)
    setRefreshKey((k) => k + 1)
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this post? This cannot be undone.')) return
    await fetch(`/api/admin/blog/${id}`, { method: 'DELETE' })
    setPosts((prev) => prev.filter((p) => p._id !== id))
  }

  const canSave = !saving && !!form.title && !!form.excerpt && !!form.content && !!form.author

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Blog Posts</h1>
          <p className="text-gray-400 text-sm mt-1">{posts.length} posts</p>
        </div>
        <button
          type="button"
          onClick={openCreateForm}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
        >
          <Plus size={16} />
          New Post
        </button>
      </div>

      {/* Post form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-2xl my-8">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 sticky top-0 bg-gray-900 rounded-t-2xl z-10">
              <h2 className="font-bold text-white">
                {editingId ? 'Edit Post' : 'New Post'}
              </h2>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-5">

              {/* Cover image */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Cover Image</label>
                <ImageUpload
                  value={form.coverImage}
                  onChange={(url) => setForm((p) => ({ ...p, coverImage: url }))}
                />
              </div>

              {/* Title */}
              <div>
                <label htmlFor="b-title" className="block text-xs font-medium text-gray-400 mb-1">Title <span className="text-red-400">*</span></label>
                <input
                  id="b-title"
                  value={form.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-500"
                  placeholder="Post title"
                />
              </div>

              {/* Slug */}
              <div>
                <label htmlFor="b-slug" className="block text-xs font-medium text-gray-400 mb-1">
                  Slug <span className="text-gray-600 font-normal">(auto-generated, editable)</span>
                </label>
                <input
                  id="b-slug"
                  value={form.slug}
                  onChange={(e) => setForm((p) => ({ ...p, slug: slugify(e.target.value) }))}
                  className="w-full bg-gray-800 border border-gray-700 text-gray-300 rounded-xl px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-green-500"
                  placeholder="post-url-slug"
                />
              </div>

              {/* Excerpt */}
              <div>
                <label htmlFor="b-excerpt" className="block text-xs font-medium text-gray-400 mb-1">Excerpt <span className="text-red-400">*</span></label>
                <textarea
                  id="b-excerpt"
                  value={form.excerpt}
                  onChange={(e) => setForm((p) => ({ ...p, excerpt: e.target.value }))}
                  rows={2}
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-500 resize-none"
                  placeholder="Short description shown on the blog listing page"
                />
              </div>

              {/* Category + Featured */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="b-category" className="block text-xs font-medium text-gray-400 mb-1">Category</label>
                  <select
                    id="b-category"
                    value={form.category}
                    onChange={(e) => setForm((p) => ({ ...p, category: e.target.value as BlogCategory }))}
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-500"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col justify-end">
                  <div className="flex items-center justify-between bg-gray-800 rounded-xl px-4 py-2.5">
                    <span className="text-sm text-gray-300">Featured post</span>
                    <button
                      type="button"
                      aria-label="Toggle featured"
                      onClick={() => setForm((p) => ({ ...p, featured: !p.featured }))}
                      className={`w-11 h-6 rounded-full transition-colors relative ${form.featured ? 'bg-green-600' : 'bg-gray-600'}`}
                    >
                      <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${form.featured ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Content with formatting guide */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="b-content" className="block text-xs font-medium text-gray-400">Content <span className="text-red-400">*</span></label>
                  <button
                    type="button"
                    onClick={() => setGuideOpen((o) => !o)}
                    className="flex items-center gap-1 text-xs text-gray-500 hover:text-green-400 transition-colors"
                  >
                    Formatting guide
                    <ChevronDown size={13} className={`transition-transform ${guideOpen ? 'rotate-180' : ''}`} />
                  </button>
                </div>
                {guideOpen && (
                  <div className="bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 mb-2 font-mono text-xs text-gray-300 space-y-1 leading-relaxed">
                    <p><span className="text-green-400"># Heading 1</span> — large section title</p>
                    <p><span className="text-green-400">## Heading 2</span> — sub-section</p>
                    <p><span className="text-green-400">### Heading 3</span> — smaller heading</p>
                    <p><span className="text-green-400">- Item</span> — bullet list item</p>
                    <p><span className="text-gray-400">Regular text</span> — paragraph (blank line = new paragraph)</p>
                  </div>
                )}
                <textarea
                  id="b-content"
                  value={form.content}
                  onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
                  rows={12}
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-500 resize-y font-mono"
                  placeholder={'## Introduction\n\nWrite your opening paragraph here.\n\n## Main Section\n\n- First bullet point\n- Second bullet point\n\nContinue with more paragraphs...'}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Author */}
                <div>
                  <label htmlFor="b-author" className="block text-xs font-medium text-gray-400 mb-1">Author <span className="text-red-400">*</span></label>
                  <input
                    id="b-author"
                    value={form.author}
                    onChange={(e) => setForm((p) => ({ ...p, author: e.target.value }))}
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-500"
                    placeholder="Author name"
                  />
                </div>

                {/* Cover emoji */}
                <div>
                  <label htmlFor="b-emoji" className="block text-xs font-medium text-gray-400 mb-1">Cover Emoji <span className="text-gray-600 font-normal">(fallback)</span></label>
                  <input
                    id="b-emoji"
                    value={form.coverEmoji}
                    onChange={(e) => setForm((p) => ({ ...p, coverEmoji: e.target.value }))}
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-500"
                    placeholder="🌱"
                    maxLength={4}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Tags */}
                <div>
                  <label htmlFor="b-tags" className="block text-xs font-medium text-gray-400 mb-1">Tags <span className="text-gray-600 font-normal">(comma separated)</span></label>
                  <input
                    id="b-tags"
                    value={form.tags.join(', ')}
                    onChange={(e) => {
                      const tags = e.target.value.split(',').map((t) => t.trim()).filter(Boolean)
                      setForm((p) => ({ ...p, tags }))
                    }}
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-500"
                    placeholder="nutrition, recipes, tips"
                  />
                </div>

                {/* Published date */}
                <div>
                  <label htmlFor="b-date" className="block text-xs font-medium text-gray-400 mb-1">Publish Date</label>
                  <input
                    id="b-date"
                    type="date"
                    value={form.publishedAt}
                    onChange={(e) => setForm((p) => ({ ...p, publishedAt: e.target.value }))}
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-500"
                  />
                </div>
              </div>

            </div>

            <div className="flex gap-3 px-6 py-4 border-t border-gray-800 sticky bottom-0 bg-gray-900 rounded-b-2xl">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 border border-gray-700 text-gray-300 hover:text-white text-sm font-medium py-2.5 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={!canSave}
                className="flex-1 bg-green-600 hover:bg-green-500 disabled:bg-gray-700 disabled:text-gray-500 text-white text-sm font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {saving ? 'Saving...' : (
                  <>
                    <Check size={16} />
                    {editingId ? 'Save Changes' : 'Publish Post'}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Posts list */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-800 rounded-2xl h-20 animate-pulse" />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-gray-500">
          <FileText size={48} className="mb-4 opacity-40" />
          <p className="font-medium">No posts yet</p>
          <p className="text-sm mt-1">Click &ldquo;New Post&rdquo; to publish your first article.</p>
        </div>
      ) : (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                {['', 'Title', 'Author', 'Tags', 'Published', ''].map((h, i) => (
                  <th key={i} className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {posts.map((post) => (
                <tr key={post._id} className="hover:bg-gray-800/50 transition-colors">
                  {/* Cover thumbnail */}
                  <td className="pl-4 py-3 w-14">
                    {post.coverImage ? (
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-800 shrink-0">
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-xl shrink-0">
                        {post.coverEmoji ?? '🌱'}
                      </div>
                    )}
                  </td>

                  <td className="px-4 py-3">
                    <p className="font-medium text-white line-clamp-1">{post.title}</p>
                    <p className="text-xs text-gray-500 font-mono mt-0.5">/{post.slug}</p>
                  </td>

                  <td className="px-4 py-3 text-gray-400 text-xs">{post.author}</td>

                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {(post.tags ?? []).slice(0, 2).map((tag) => (
                        <span key={tag} className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">
                    {formatDate(post.publishedAt)}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 justify-end">
                      <button
                        type="button"
                        aria-label={`Edit ${post.title}`}
                        onClick={() => openEditForm(post)}
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        type="button"
                        aria-label={`Delete ${post.title}`}
                        onClick={() => handleDelete(post._id)}
                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-all"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
