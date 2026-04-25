import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { media, mediaAssetSource } from 'sanity-plugin-media'
import { presentationTool } from 'sanity/presentation'
import { schemaTypes } from './sanity/schemas/all'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'q3i5b990'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const previewSecret = process.env.SANITY_PREVIEW_SECRET || 'akina-preview-2025'

// URL website để preview (production hoặc local)
const previewUrl =
  typeof window !== 'undefined'
    ? window.location.hostname === 'localhost'
      ? 'http://localhost:3000'
      : 'https://akina-florist.vercel.app'
    : 'https://akina-florist.vercel.app'

export default defineConfig({
  name: 'akina-florist',
  title: 'Akina Florist Admin',
  basePath: '/studio',
  projectId,
  dataset,

  plugins: [
    // 🖥️ Presentation Tool — Visual Editing chính
    presentationTool({
      previewUrl: {
        origin: previewUrl,
        preview: '/',
        draftMode: {
          enable: `/api/draft?secret=${previewSecret}`,
        },
      },
    }),

    structureTool({
      structure: (S) =>
        S.list()
          .title('Quản trị nội dung')
          .items([
            S.listItem()
              .title('🖼️ Banner trang chủ')
              .child(S.documentTypeList('banner').title('Banner')),
            S.listItem()
              .title('📂 Danh mục sản phẩm')
              .child(S.documentTypeList('category').title('Danh mục')),
            S.listItem()
              .title('🌸 Sản phẩm')
              .child(S.documentTypeList('product').title('Sản phẩm')),
            S.listItem()
              .title('⭐ Vì sao được yêu thích')
              .child(S.documentTypeList('whySection').title('Vì sao yêu thích')),
            S.listItem()
              .title('🏷️ Thương hiệu đồng hành')
              .child(S.documentTypeList('brand').title('Thương hiệu')),
            S.listItem()
              .title('📸 Gallery Instagram')
              .child(S.documentTypeList('gallery').title('Gallery')),
            S.listItem()
              .title('👤 Trang giới thiệu')
              .child(S.documentTypeList('aboutPage').title('Giới thiệu')),
            S.listItem()
              .title('🎓 Workshop & Academy')
              .child(S.documentTypeList('workshop').title('Workshop')),
            S.listItem()
              .title('📁 Dự án')
              .child(S.documentTypeList('project').title('Dự án')),
          ])
    }),

    visionTool(),
    media(),
  ],

  schema: {
    types: schemaTypes,
  },

  form: {
    image: {
      assetSources: (previousAssetSources) =>
        previousAssetSources.filter((s) => s !== mediaAssetSource),
    },
  },
})
