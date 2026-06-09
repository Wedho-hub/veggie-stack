// lib/cloudinary.ts
import { v2 as cloudinary } from 'cloudinary'

// Configure once — reused across all server-side uploads
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export default cloudinary

// TypeScript: typed return shape for upload results
export interface UploadResult {
  url: string
  publicId: string
  width: number
  height: number
}

// Upload a file buffer to Cloudinary
// Used by the API route when receiving image uploads
export async function uploadImage(
  buffer: Buffer,
  folder: string = 'veggie-stack/products'
): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder,
          transformation: [
            // Auto-crop to square, good quality, auto format (webp on modern browsers)
            { width: 800, height: 800, crop: 'fill', gravity: 'auto' },
            { quality: 'auto', fetch_format: 'auto' },
          ],
        },
        (error, result) => {
          if (error || !result) {
            reject(error || new Error('Upload failed'))
            return
          }
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
            width: result.width,
            height: result.height,
          })
        }
      )
      .end(buffer)
  })
}