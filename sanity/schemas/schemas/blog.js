// sanity/schemas/blog.js
export default {
  name: 'blog',
  title: 'Bài viết Blog',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Tiêu đề bài viết',
      type: 'string',
      validation: Rule => Rule.required().min(10).max(100).error('Tiêu đề 10–100 ký tự'),
    },
    {
      name: 'slug',
      title: 'Đường dẫn URL',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
    },
    {
      name: 'status',
      title: 'Trạng thái',
      type: 'string',
      options: {
        list: [
          { title: '✅ Đã đăng', value: 'published' },
          { title: '📝 Bản nháp', value: 'draft' },
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
    },
    {
      name: 'coverImage',
      title: 'Ảnh bìa',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required().error('Bắt buộc có ảnh bìa'),
    },
    {
      name: 'excerpt',
      title: 'Tóm tắt bài viết',
      description: 'Hiển thị ở trang danh sách blog và SEO description (150–200 ký tự)',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.max(200),
    },
    {
      name: 'categories',
      title: 'Danh mục bài viết',
      type: 'array',
      of: [{
        type: 'string',
        options: {
          list: [
            { title: '🌸 Nghệ thuật cắm hoa', value: 'cam-hoa' },
            { title: '💐 Ý nghĩa các loài hoa', value: 'y-nghia-hoa' },
            { title: '🎉 Trang trí sự kiện', value: 'su-kien' },
            { title: '📖 Câu chuyện Akina', value: 'cau-chuyen' },
            { title: '💡 Tips & Tricks', value: 'tips' },
          ],
        },
      }],
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    },
    {
      name: 'author',
      title: 'Tác giả',
      type: 'string',
      initialValue: 'Akina Florist',
    },
    {
      name: 'publishedAt',
      title: 'Ngày đăng',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'body',
      title: 'Nội dung bài viết',
      type: 'array',
      of: [
        // Text blocks
        {
          type: 'block',
          styles: [
            { title: 'Đoạn văn', value: 'normal' },
            { title: 'Tiêu đề lớn (H2)', value: 'h2' },
            { title: 'Tiêu đề vừa (H3)', value: 'h3' },
            { title: 'Tiêu đề nhỏ (H4)', value: 'h4' },
            { title: 'Trích dẫn', value: 'blockquote' },
          ],
          lists: [
            { title: 'Danh sách chấm', value: 'bullet' },
            { title: 'Danh sách số', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'In đậm', value: 'strong' },
              { title: 'In nghiêng', value: 'em' },
              { title: 'Gạch chân', value: 'underline' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Liên kết',
                fields: [
                  { name: 'href', type: 'url', title: 'URL' },
                  { name: 'blank', type: 'boolean', title: 'Mở tab mới', initialValue: true },
                ],
              },
            ],
          },
        },
        // Image block
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Mô tả ảnh (alt text)' },
            { name: 'caption', type: 'string', title: 'Chú thích ảnh' },
          ],
        },
        // Video embed block
        {
          type: 'object',
          name: 'videoEmbed',
          title: '▶️ Video YouTube/Vimeo',
          fields: [
            { name: 'url', type: 'url', title: 'Link video (YouTube hoặc Vimeo)' },
            { name: 'caption', type: 'string', title: 'Chú thích' },
          ],
          preview: {
            select: { url: 'url' },
            prepare({ url }) {
              return { title: '▶️ Video', subtitle: url }
            },
          },
        },
        // Call to action block
        {
          type: 'object',
          name: 'callToAction',
          title: '🎯 Nút CTA',
          fields: [
            { name: 'text', type: 'string', title: 'Nội dung nút' },
            { name: 'url', type: 'string', title: 'Đường dẫn' },
            {
              name: 'style',
              type: 'string',
              title: 'Kiểu nút',
              options: {
                list: [
                  { title: 'Nút xanh (chính)', value: 'primary' },
                  { title: 'Nút viền', value: 'outline' },
                ],
              },
              initialValue: 'primary',
            },
          ],
          preview: {
            select: { text: 'text' },
            prepare({ text }) {
              return { title: `🎯 CTA: ${text}` }
            },
          },
        },
      ],
    },
    // SEO riêng cho từng bài
    {
      name: 'seoTitle',
      title: '🔍 SEO Title (để trống = dùng tiêu đề bài)',
      type: 'string',
    },
    {
      name: 'seoDescription',
      title: '🔍 SEO Description (để trống = dùng tóm tắt)',
      type: 'text',
      rows: 2,
    },
  ],

  orderings: [
    { title: 'Mới nhất', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
    { title: 'Cũ nhất', name: 'publishedAtAsc', by: [{ field: 'publishedAt', direction: 'asc' }] },
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author',
      media: 'coverImage',
      status: 'status',
      date: 'publishedAt',
    },
    prepare({ title, author, media, status, date }) {
      const statusIcon = status === 'published' ? '✅' : '📝'
      const dateStr = date ? new Date(date).toLocaleDateString('vi-VN') : ''
      return {
        title: `${statusIcon} ${title}`,
        subtitle: `${author || 'Akina Florist'} · ${dateStr}`,
        media,
      }
    },
  },
}
