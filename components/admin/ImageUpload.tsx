'use client'

import { useState, useRef } from 'react'
import { Upload, X, ImageIcon } from 'lucide-react'
import Image from 'next/image'

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setError('')
    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Upload failed')
        return
      }

      onChange(data.url)
    } catch {
      setError('Upload failed. Please try again.')
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  function handleRemove() {
    onChange('')
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div>
      {value ? (
        <div className="relative w-full h-48 rounded-xl overflow-hidden border border-gray-700 group">
          <Image
            src={value}
            alt="Product image"
            fill
            sizes="(max-width: 640px) 100vw, 512px"
            className="object-cover"
          />
          <button
            type="button"
            aria-label="Remove image"
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-red-600 hover:bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          aria-label="Upload product image"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-full h-48 border-2 border-dashed border-gray-700 hover:border-green-500 rounded-xl flex flex-col items-center justify-center gap-3 text-gray-400 hover:text-green-400 transition-all disabled:opacity-50"
        >
          {uploading ? (
            <>
              <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-sm">Uploading...</span>
            </>
          ) : (
            <>
              <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center">
                <ImageIcon size={24} />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium">Click to upload image</p>
                <p className="text-xs text-gray-500 mt-1">JPG, PNG, WebP · Max 5MB</p>
              </div>
              <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full text-xs">
                <Upload size={12} />
                Choose file
              </div>
            </>
          )}
        </button>
      )}

      {error && (
        <p className="text-xs text-red-400 mt-2">{error}</p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        aria-label="Upload product image file"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  )
}
