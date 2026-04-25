import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { mediaPlugin } from 'sanity-plugin-media'
import { schemaTypes } from './sanity/schemas/all'

export default defineConfig({
  name: 'akina-florist',
  title: 'Akina Florist Admin',
  projectId: 'q3i5b990',
  dataset: 'production',
  plugins: [
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
    mediaPlugin(),
  ],
  schema: {
    types: schemaTypes,
  },
})
