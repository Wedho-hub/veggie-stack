'use client'

import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, X, Check, PackageSearch } from 'lucide-react'
import Image from 'next/image'
import type { IProduct } from '@/models/Product'
import type { Category } from '@/types'
import ImageUpload from '@/components/admin/ImageUpload'

const CATEGORIES: Category[] = ['fruit', 'vegetable', 'gadget', 'supplement']

type ProductForm = {
  name: string
  description: string
  price: number
  category: Category
  inStock: boolean
  farmOrigin: string
  tags: string[]
  imageUrl: string
}

const emptyForm: ProductForm = {
  name: '',
  description: '',
  price: 0,
  category: 'vegetable',
  inStock: true,
  farmOrigin: '',
  tags: [],
  imageUrl: '',
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(price)
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<IProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<ProductForm>(emptyForm)
  const [saving, setSaving] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    let active = true

    fetch('/api/admin/products')
      .then((res) => res.json())
      .then((data) => {
        if (active) {
          setProducts(data.data ?? [])
          setLoading(false)
        }
      })
      .catch(() => { if (active) setLoading(false) })

    return () => { active = false }
  }, [refreshKey])

  function openCreateForm() {
    setForm(emptyForm)
    setEditingId(null)
    setShowForm(true)
  }

  function openEditForm(product: IProduct) {
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      inStock: product.inStock,
      farmOrigin: product.farmOrigin ?? '',
      tags: product.tags ?? [],
      imageUrl: product.imageUrl ?? '',
    })
    setEditingId(product._id.toString())
    setShowForm(true)
  }

  async function handleSave() {
    setSaving(true)
    const url = editingId ? `/api/admin/products/${editingId}` : '/api/admin/products'
    const method = editingId ? 'PATCH' : 'POST'

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    setShowForm(false)
    setSaving(false)
    setLoading(true)
    setRefreshKey((k) => k + 1)
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this product?')) return
    await fetch(`/api/admin/products/${id}`, { method: 'DELETE' })
    setProducts((prev) => prev.filter((p) => p._id.toString() !== id))
  }

  function handleTagInput(value: string) {
    const tags = value.split(',').map((t) => t.trim()).filter(Boolean)
    setForm((prev) => ({ ...prev, tags }))
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Products</h1>
          <p className="text-gray-400 text-sm mt-1">{products.length} products</p>
        </div>
        <button
          type="button"
          onClick={openCreateForm}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
        >
          <Plus size={16} />
          Add Product
        </button>
      </div>

      {/* Product form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
              <h2 className="font-bold text-white">
                {editingId ? 'Edit Product' : 'New Product'}
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

            <div className="p-6 space-y-4">

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Image</label>
                <ImageUpload
                  value={form.imageUrl}
                  onChange={(url) => setForm((p) => ({ ...p, imageUrl: url }))}
                />
              </div>

              <div>
                <label htmlFor="p-name" className="block text-xs font-medium text-gray-400 mb-1">Name</label>
                <input
                  id="p-name"
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-500"
                  placeholder="Product name"
                />
              </div>

              <div>
                <label htmlFor="p-desc" className="block text-xs font-medium text-gray-400 mb-1">Description</label>
                <textarea
                  id="p-desc"
                  value={form.description}
                  onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                  rows={3}
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-500 resize-none"
                  placeholder="Product description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="p-price" className="block text-xs font-medium text-gray-400 mb-1">Price (ZAR)</label>
                  <input
                    id="p-price"
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm((p) => ({ ...p, price: parseFloat(e.target.value) }))}
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-500"
                  />
                </div>
                <div>
                  <label htmlFor="p-category" className="block text-xs font-medium text-gray-400 mb-1">Category</label>
                  <select
                    id="p-category"
                    value={form.category}
                    onChange={(e) => setForm((p) => ({ ...p, category: e.target.value as Category }))}
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-500"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="p-farm" className="block text-xs font-medium text-gray-400 mb-1">Farm Origin (optional)</label>
                <input
                  id="p-farm"
                  value={form.farmOrigin}
                  onChange={(e) => setForm((p) => ({ ...p, farmOrigin: e.target.value }))}
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-500"
                  placeholder="e.g. Stellenbosch"
                />
              </div>

              <div>
                <label htmlFor="p-tags" className="block text-xs font-medium text-gray-400 mb-1">Tags (comma separated)</label>
                <input
                  id="p-tags"
                  value={form.tags.join(', ')}
                  onChange={(e) => handleTagInput(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-500"
                  placeholder="organic, fresh, salad"
                />
              </div>

              <div className="flex items-center justify-between bg-gray-800 rounded-xl px-4 py-3">
                <span className="text-sm text-gray-300">In Stock</span>
                <button
                  type="button"
                  aria-label="Toggle in stock"
                  onClick={() => setForm((p) => ({ ...p, inStock: !p.inStock }))}
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    form.inStock ? 'bg-green-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      form.inStock ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

            </div>

            <div className="flex gap-3 px-6 py-4 border-t border-gray-800">
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
                disabled={saving || !form.name || !form.description}
                className="flex-1 bg-green-600 hover:bg-green-500 disabled:bg-gray-700 disabled:text-gray-500 text-white text-sm font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {saving ? 'Saving...' : (
                  <>
                    <Check size={16} />
                    {editingId ? 'Save Changes' : 'Create Product'}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Products table */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-800 rounded-2xl h-16 animate-pulse" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-gray-500">
          <PackageSearch size={48} className="mb-4 opacity-40" />
          <p className="font-medium">No products yet</p>
          <p className="text-sm mt-1">Click &ldquo;Add Product&rdquo; to create your first one.</p>
        </div>
      ) : (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                {['', 'Product', 'Category', 'Price', 'Stock', 'Tags', ''].map((h, i) => (
                  <th
                    key={i}
                    className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {products.map((product) => (
                <tr key={product._id.toString()} className="hover:bg-gray-800/50 transition-colors">
                  <td className="pl-4 py-3 w-14">
                    {product.imageUrl ? (
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-800 shrink-0">
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-600 text-xs shrink-0">
                        No img
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-white">{product.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{product.description}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-full capitalize">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-white">
                    {formatPrice(product.price)}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      product.inStock
                        ? 'bg-green-900/50 text-green-400'
                        : 'bg-red-900/50 text-red-400'
                    }`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {(product.tags ?? []).slice(0, 2).map((tag) => (
                        <span key={tag} className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 justify-end">
                      <button
                        type="button"
                        aria-label={`Edit ${product.name}`}
                        onClick={() => openEditForm(product)}
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        type="button"
                        aria-label={`Delete ${product.name}`}
                        onClick={() => handleDelete(product._id.toString())}
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
