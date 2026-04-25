import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'q3i5b990'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

// Client published — dùng cho website public
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
  stega: {
    // Bật stega encoding để Visual Editing biết click vào đâu
    enabled: true,
    studioUrl: '/studio',
  },
})

// Client preview — dùng khi đang ở Draft Mode (Visual Editing)
export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  perspective: 'previewDrafts',
  stega: {
    enabled: true,
    studioUrl: '/studio',
  },
})

const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}

// Tự động chọn client phù hợp dựa vào draft mode
export async function getSanityData(query, params = {}) {
  try {
    // Kiểm tra draft mode (chỉ chạy được ở server)
    let isDraft = false
    try {
      const { draftMode } = await import('next/headers')
      const draft = await draftMode()
      isDraft = draft.isEnabled
    } catch {
      // Client side hoặc không hỗ trợ → dùng published
    }

    const activeClient = isDraft ? previewClient : client

    return await activeClient.fetch(query, params, {
      next: { revalidate: isDraft ? 0 : 60 },
    })
  } catch (error) {
    console.error('Sanity fetch error:', error)
    return null
  }
}
