import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'q3i5b990'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // production: dùng CDN cho nhanh; nếu cần data realtime → false
  // token chỉ cần cho dữ liệu private hoặc draft preview.
  // Sanity public dataset KHÔNG cần token để fetch.
  token: process.env.SANITY_API_TOKEN || undefined,
  perspective: 'published',
})

const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}

export async function getSanityData(query, params = {}) {
  try {
    return await client.fetch(query, params, {
      // ISR: cache 60s ở Next.js layer
      next: { revalidate: 60 },
    })
  } catch (error) {
    console.error('Sanity fetch error:', error)
    return null
  }
}
