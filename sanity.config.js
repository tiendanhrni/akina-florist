import { defineConfig, definePlugin } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { media, mediaAssetSource } from 'sanity-plugin-media'
import { presentationTool } from 'sanity/presentation'
import { schemaTypes } from './sanity/schemas/all'
import StudioDashboard from './sanity/plugins/StudioDashboard'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'q3i5b990'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const previewSecret = process.env.SANITY_PREVIEW_SECRET || 'akina-preview-2025'

const previewUrl =
  typeof window !== 'undefined'
    ? window.location.hostname === 'localhost'
      ? 'http://localhost:3000'
      : 'https://akina-florist.vercel.app'
    : 'https://akina-florist.vercel.app'

// Plugin Dashboard trang chủ Studio
const dashboardPlugin = definePlugin({
  name: 'studio-dashboard',
  studio: {
    components: {
      // Thay trang chủ Studio = Dashboard tùy chỉnh
      navbar: undefined,
    },
  },
})

export default defineConfig({
  name: 'akina-florist',
  title: 'Akina Florist Admin',
  basePath: '/studio',
  projectId,
  dataset,

  // Trang chủ Studio = Dashboard
  studio: {
    components: {
      toolMenu: undefined,
    },
  },

  plugins: [
    // 🖥️ Presentation — Visual Editing
    presentationTool({
      name: 'presentation',
      title: '🖥️ Xem trước',
      previewUrl: {
        origin: previewUrl,
        preview: '/',
        draftMode: {
          enable: `/api/draft?secret=${previewSecret}`,
        },
      },
    }),

    // 📋 Structure — Quản lý nội dung
    structureTool({
      name: 'structure',
      title: '📋 Nội dung',
      structure: (S) =>
        S.list()
          .title('Quản trị nội dung')
          .items([

            // ── TỔNG QUAN ──
            S.listItem()
              .title('🏠 Trang chủ Studio')
              .icon(() => '🏠')
              .child(
                S.component(StudioDashboard)
                  .title('Trang chủ')
              ),

            S.divider(),

            // ── CÀI ĐẶT ──
            S.listItem()
              .title('⚙️ Cài đặt website')
              .icon(() => '⚙️')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
                  .title('Cài đặt website')
              ),

            S.divider(),

            // ── TRANG CHỦ ──
            S.listItem()
              .title('🖼️ Banner trang chủ')
              .icon(() => '🖼️')
              .child(S.documentTypeList('banner').title('Banner trang chủ')),

            S.listItem()
              .title('⭐ Vì sao được yêu thích')
              .icon(() => '⭐')
              .child(S.documentTypeList('whySection').title('Vì sao yêu thích')),

            S.listItem()
              .title('🏷️ Thương hiệu đồng hành')
              .icon(() => '🏷️')
              .child(S.documentTypeList('brand').title('Thương hiệu')),

            S.listItem()
              .title('📸 Gallery Instagram')
              .icon(() => '📸')
              .child(S.documentTypeList('gallery').title('Gallery')),

            S.divider(),

            // ── SẢN PHẨM ──
            S.listItem()
              .title('📂 Danh mục sản phẩm')
              .icon(() => '📂')
              .child(S.documentTypeList('category').title('Danh mục')),

            S.listItem()
              .title('🌸 Sản phẩm')
              .icon(() => '🌸')
              .child(
                S.documentTypeList('product')
                  .title('Sản phẩm')
                  .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
              ),

            S.divider(),

            // ── BLOG ──
            S.listItem()
              .title('✍️ Blog')
              .icon(() => '✍️')
              .child(
                S.list()
                  .title('Blog')
                  .items([
                    S.listItem()
                      .title('✅ Đã đăng')
                      .icon(() => '✅')
                      .child(
                        S.documentTypeList('blog')
                          .title('Bài đã đăng')
                          .filter('_type == "blog" && status == "published"')
                          .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                      ),
                    S.listItem()
                      .title('📝 Bản nháp')
                      .icon(() => '📝')
                      .child(
                        S.documentTypeList('blog')
                          .title('Bản nháp')
                          .filter('_type == "blog" && status == "draft"')
                      ),
                    S.listItem()
                      .title('📋 Tất cả bài viết')
                      .icon(() => '📋')
                      .child(
                        S.documentTypeList('blog')
                          .title('Tất cả bài viết')
                          .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                      ),
                  ])
              ),

            S.divider(),

            // ── CÁC TRANG KHÁC ──
            S.listItem()
              .title('👤 Trang giới thiệu')
              .icon(() => '👤')
              .child(S.documentTypeList('aboutPage').title('Giới thiệu')),

            S.listItem()
              .title('🎓 Workshop & Academy')
              .icon(() => '🎓')
              .child(S.documentTypeList('workshop').title('Workshop')),

            S.listItem()
              .title('📁 Dự án')
              .icon(() => '📁')
              .child(S.documentTypeList('project').title('Dự án')),
          ]),
    }),

    // 🖼️ Media Library — thư viện ảnh/video đầy đủ
    media({
      creditLine: {
        enabled: true,
        excludeSources: ['unsplash'],
      },
      maximumUploadSize: 50 * 1024 * 1024, // 50MB
    }),

    // 👁️ Vision — debug GROQ queries
    visionTool({ name: 'vision', title: '🔍 Debug' }),
  ],

  schema: { types: schemaTypes },

  // Tất cả ảnh đều chọn từ Media Library
  form: {
    image: {
      assetSources: (previousAssetSources) => previousAssetSources,
    },
    file: {
      assetSources: (previousAssetSources) => previousAssetSources,
    },
  },
})
