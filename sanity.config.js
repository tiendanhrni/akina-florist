import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { media, mediaAssetSource } from 'sanity-plugin-media'
import { presentationTool } from 'sanity/presentation'
import { schemaTypes } from './sanity/schemas/all'
import StudioDashboard from './sanity/plugins/StudioDashboard.jsx'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'q3i5b990'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const previewSecret = process.env.SANITY_PREVIEW_SECRET || 'akina-preview-2025'

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
    presentationTool({
      name: 'presentation',
      title: '🖥️ Xem trước',
      previewUrl: {
        origin: previewUrl,
        preview: '/',
        draftMode: { enable: `/api/draft?secret=${previewSecret}` },
      },
    }),

    structureTool({
      name: 'structure',
      title: '📋 Nội dung',
      structure: (S) =>
        S.list()
          .title('Quản trị nội dung')
          .items([

            // ── DASHBOARD ──
            S.listItem()
              .title('🏠 Trang chủ Studio')
              .icon(() => '🏠')
              .child(S.component(StudioDashboard).title('Trang chủ')),

            S.divider(),

            // ── CÀI ĐẶT ──
            S.listItem()
              .title('⚙️ Cài đặt website')
              .icon(() => '⚙️')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings').title('Cài đặt website')),

            S.divider(),

            // ── PAGE BUILDER ──
            S.listItem()
              .title('📄 Trang tùy chỉnh')
              .icon(() => '📄')
              .child(
                S.list()
                  .title('Trang tùy chỉnh')
                  .items([
                    S.listItem()
                      .title('✅ Đang hiển thị')
                      .icon(() => '✅')
                      .child(S.documentTypeList('page').title('Đang hiển thị').filter('_type == "page" && isPublished == true')),
                    S.listItem()
                      .title('📝 Bản nháp')
                      .icon(() => '📝')
                      .child(S.documentTypeList('page').title('Bản nháp').filter('_type == "page" && isPublished != true')),
                    S.listItem()
                      .title('➕ Tạo trang mới')
                      .icon(() => '➕')
                      .child(S.documentTypeList('page').title('Tất cả trang')),
                  ])
              ),

            S.divider(),

            // ── TRANG CHỦ ──
            S.listItem().title('🖼️ Banner trang chủ').icon(() => '🖼️').child(S.documentTypeList('banner').title('Banner')),
            S.listItem().title('⭐ Vì sao được yêu thích').icon(() => '⭐').child(S.documentTypeList('whySection').title('Vì sao yêu thích')),
            S.listItem().title('🏷️ Thương hiệu đồng hành').icon(() => '🏷️').child(S.documentTypeList('brand').title('Thương hiệu')),
            S.listItem().title('📸 Gallery Instagram').icon(() => '📸').child(S.documentTypeList('gallery').title('Gallery')),

            S.divider(),

            // ── SẢN PHẨM ──
            S.listItem().title('📂 Danh mục sản phẩm').icon(() => '📂').child(S.documentTypeList('category').title('Danh mục')),
            S.listItem().title('🌸 Sản phẩm').icon(() => '🌸').child(S.documentTypeList('product').title('Sản phẩm').defaultOrdering([{ field: '_createdAt', direction: 'desc' }])),

            S.divider(),

            // ── BLOG ──
            S.listItem()
              .title('📂 Danh mục Blog')
              .child(S.documentTypeList('blogCategory').title('Danh mục Blog')),
            S.listItem()
              .title('✍️ Blog')
              .icon(() => '✍️')
              .child(
                S.list().title('Blog').items([
                  S.listItem().title('✅ Đã đăng').icon(() => '✅').child(S.documentTypeList('blog').title('Đã đăng').filter('_type == "blog" && status == "published"').defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])),
                  S.listItem().title('📝 Bản nháp').icon(() => '📝').child(S.documentTypeList('blog').title('Bản nháp').filter('_type == "blog" && status == "draft"')),
                  S.listItem().title('📋 Tất cả').icon(() => '📋').child(S.documentTypeList('blog').title('Tất cả').defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])),
                ])
              ),

            S.divider(),

            // ── CÁC TRANG KHÁC ──
            S.listItem().title('👤 Trang giới thiệu').icon(() => '👤').child(S.documentTypeList('aboutPage').title('Giới thiệu')),
            S.listItem().title('🎓 Workshop & Academy').icon(() => '🎓').child(S.documentTypeList('workshop').title('Workshop')),
            S.listItem().title('📁 Dự án').icon(() => '📁').child(S.documentTypeList('project').title('Dự án')),
          ]),
    }),

    media({ maximumUploadSize: 50 * 1024 * 1024 }),
    visionTool({ name: 'vision', title: '🔍 Debug' }),
  ],

  schema: { types: schemaTypes },

  form: {
    image: { assetSources: (prev) => prev },
    file: { assetSources: (prev) => prev },
  },
})
