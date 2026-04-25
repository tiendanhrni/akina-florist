// sanity/schemas/page.js
// Page Builder — tạo trang tùy chỉnh với các block kéo thả

// ─── BLOCK DEFINITIONS ───────────────────────────────────────

const heroBlock = {
  type: 'object',
  name: 'heroBlock',
  title: '🎯 Hero — Ảnh/Video + Text + Nút',
  fields: [
    { name: 'heading', title: 'Tiêu đề lớn', type: 'string' },
    { name: 'subheading', title: 'Tiêu đề phụ', type: 'string' },
    { name: 'body', title: 'Đoạn mô tả', type: 'text', rows: 3 },
    {
      name: 'backgroundType',
      title: 'Nền',
      type: 'string',
      options: { list: [{ title: '🖼️ Ảnh', value: 'image' }, { title: '🎬 Video', value: 'video' }, { title: '🎨 Màu', value: 'color' }], layout: 'radio' },
      initialValue: 'image',
    },
    { name: 'backgroundImage', title: 'Ảnh nền', type: 'image', options: { hotspot: true } },
    { name: 'backgroundVideo', title: 'Video nền (URL .mp4)', type: 'url' },
    { name: 'backgroundColor', title: 'Màu nền (hex)', type: 'string', initialValue: '#577057' },
    {
      name: 'overlay',
      title: 'Độ tối overlay (0-1)',
      type: 'number',
      initialValue: 0.4,
      validation: Rule => Rule.min(0).max(1),
    },
    {
      name: 'textColor',
      title: 'Màu chữ',
      type: 'string',
      options: { list: [{ title: 'Trắng', value: '#ffffff' }, { title: 'Đen', value: '#1a1a1a' }, { title: 'Xanh lá', value: '#577057' }] },
      initialValue: '#ffffff',
    },
    {
      name: 'textAlign',
      title: 'Căn chỉnh text',
      type: 'string',
      options: { list: [{ title: 'Trái', value: 'left' }, { title: 'Giữa', value: 'center' }, { title: 'Phải', value: 'right' }] },
      initialValue: 'center',
    },
    {
      name: 'height',
      title: 'Chiều cao',
      type: 'string',
      options: { list: [{ title: 'Toàn màn hình', value: '100vh' }, { title: '80%', value: '80vh' }, { title: '60%', value: '60vh' }, { title: '40%', value: '40vh' }] },
      initialValue: '80vh',
    },
    {
      name: 'buttons',
      title: 'Các nút',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'text', title: 'Nội dung nút', type: 'string' },
          { name: 'url', title: 'Đường dẫn', type: 'string' },
          { name: 'style', title: 'Kiểu', type: 'string', options: { list: [{ title: 'Nút trắng', value: 'primary' }, { title: 'Nút viền trắng', value: 'outline' }, { title: 'Nút xanh', value: 'green' }] }, initialValue: 'primary' },
        ],
        preview: { select: { title: 'text' } },
      }],
    },
  ],
  preview: {
    select: { heading: 'heading', media: 'backgroundImage' },
    prepare({ heading, media }) { return { title: `🎯 Hero: ${heading || 'Chưa có tiêu đề'}`, media } },
  },
}

const textBlock = {
  type: 'object',
  name: 'textBlock',
  title: '📝 Text — Tiêu đề + Đoạn văn',
  fields: [
    { name: 'eyebrow', title: 'Eyebrow (text nhỏ phía trên)', type: 'string' },
    { name: 'heading', title: 'Tiêu đề', type: 'string' },
    {
      name: 'body',
      title: 'Nội dung',
      type: 'array',
      of: [{ type: 'block', styles: [{ title: 'Đoạn văn', value: 'normal' }, { title: 'H2', value: 'h2' }, { title: 'H3', value: 'h3' }, { title: 'Trích dẫn', value: 'blockquote' }], marks: { decorators: [{ title: 'Bold', value: 'strong' }, { title: 'Italic', value: 'em' }] } }],
    },
    {
      name: 'layout',
      title: 'Bố cục',
      type: 'string',
      options: { list: [{ title: 'Giữa trang', value: 'center' }, { title: 'Trái', value: 'left' }, { title: '2 cột', value: 'two-col' }] },
      initialValue: 'center',
    },
    { name: 'maxWidth', title: 'Chiều rộng tối đa', type: 'string', options: { list: [{ title: 'Hẹp (640px)', value: '640px' }, { title: 'Vừa (800px)', value: '800px' }, { title: 'Rộng (1100px)', value: '1100px' }, { title: 'Full', value: '100%' }] }, initialValue: '800px' },
    { name: 'paddingY', title: 'Khoảng cách trên dưới', type: 'string', options: { list: [{ title: 'Nhỏ', value: '2rem' }, { title: 'Vừa', value: '4rem' }, { title: 'Lớn', value: '6rem' }, { title: 'Rất lớn', value: '8rem' }] }, initialValue: '4rem' },
    { name: 'background', title: 'Màu nền', type: 'string', options: { list: [{ title: 'Trắng', value: '#ffffff' }, { title: 'Kem', value: '#faf8f5' }, { title: 'Xanh nhạt', value: '#f0f4f0' }, { title: 'Tối', value: '#1a1a1a' }] }, initialValue: '#ffffff' },
  ],
  preview: {
    select: { heading: 'heading' },
    prepare({ heading }) { return { title: `📝 Text: ${heading || 'Chưa có tiêu đề'}` } },
  },
}

const imageBlock = {
  type: 'object',
  name: 'imageBlock',
  title: '🖼️ Ảnh',
  fields: [
    {
      name: 'layout',
      title: 'Bố cục',
      type: 'string',
      options: { list: [{ title: '1 ảnh full width', value: 'full' }, { title: '1 ảnh căn giữa', value: 'centered' }, { title: '2 ảnh', value: 'two' }, { title: '3 ảnh', value: 'three' }, { title: 'Lưới 4 ảnh', value: 'four' }, { title: 'Mosaic (1 to + 2 nhỏ)', value: 'mosaic' }] },
      initialValue: 'full',
    },
    {
      name: 'images',
      title: 'Ảnh',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'image', title: 'Ảnh', type: 'image', options: { hotspot: true } },
          { name: 'alt', title: 'Mô tả ảnh', type: 'string' },
          { name: 'caption', title: 'Chú thích', type: 'string' },
          { name: 'link', title: 'Link khi click', type: 'string' },
        ],
        preview: { select: { media: 'image', title: 'alt' } },
      }],
    },
    { name: 'aspectRatio', title: 'Tỉ lệ ảnh', type: 'string', options: { list: [{ title: 'Vuông 1:1', value: '1/1' }, { title: 'Ngang 4:3', value: '4/3' }, { title: 'Ngang 16:9', value: '16/9' }, { title: 'Dọc 3:4', value: '3/4' }, { title: 'Tự nhiên', value: 'auto' }] }, initialValue: '4/3' },
    { name: 'gap', title: 'Khoảng cách giữa ảnh', type: 'string', options: { list: [{ title: 'Không', value: '0' }, { title: 'Nhỏ', value: '4px' }, { title: 'Vừa', value: '1rem' }, { title: 'Lớn', value: '2rem' }] }, initialValue: '4px' },
  ],
  preview: {
    select: { layout: 'layout', img: 'images.0.image' },
    prepare({ layout, img }) { return { title: `🖼️ Ảnh (${layout || 'full'})`, media: img } },
  },
}

const videoBlock = {
  type: 'object',
  name: 'videoBlock',
  title: '🎬 Video',
  fields: [
    { name: 'heading', title: 'Tiêu đề (tùy chọn)', type: 'string' },
    {
      name: 'videoType',
      title: 'Loại video',
      type: 'string',
      options: { list: [{ title: 'YouTube', value: 'youtube' }, { title: 'Link trực tiếp (.mp4)', value: 'direct' }, { title: 'Upload file', value: 'file' }] },
      initialValue: 'youtube',
    },
    { name: 'youtubeUrl', title: 'Link YouTube', type: 'url' },
    { name: 'directUrl', title: 'Link video trực tiếp (.mp4)', type: 'url' },
    { name: 'videoFile', title: 'Upload file video', type: 'file', options: { accept: 'video/mp4,video/webm' } },
    { name: 'autoplay', title: 'Tự phát (tắt tiếng)', type: 'boolean', initialValue: false },
    { name: 'loop', title: 'Lặp lại', type: 'boolean', initialValue: false },
    { name: 'caption', title: 'Chú thích', type: 'string' },
    { name: 'maxWidth', title: 'Chiều rộng tối đa', type: 'string', options: { list: [{ title: 'Full', value: '100%' }, { title: '900px', value: '900px' }, { title: '700px', value: '700px' }] }, initialValue: '100%' },
  ],
  preview: {
    select: { heading: 'heading', type: 'videoType' },
    prepare({ heading, type }) { return { title: `🎬 Video ${type === 'youtube' ? '(YouTube)' : ''}: ${heading || ''}` } },
  },
}

const ctaBlock = {
  type: 'object',
  name: 'ctaBlock',
  title: '🎯 CTA — Kêu gọi hành động',
  fields: [
    { name: 'heading', title: 'Tiêu đề', type: 'string' },
    { name: 'body', title: 'Mô tả', type: 'text', rows: 2 },
    {
      name: 'buttons',
      title: 'Các nút',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'text', title: 'Nội dung nút', type: 'string' },
          { name: 'url', title: 'Đường dẫn', type: 'string' },
          { name: 'style', title: 'Kiểu', type: 'string', options: { list: [{ title: 'Nút xanh', value: 'green' }, { title: 'Nút viền', value: 'outline' }, { title: 'Nút trắng', value: 'white' }] }, initialValue: 'green' },
        ],
        preview: { select: { title: 'text' } },
      }],
    },
    { name: 'background', title: 'Màu nền', type: 'string', options: { list: [{ title: 'Trắng', value: '#ffffff' }, { title: 'Xanh lá', value: '#577057' }, { title: 'Kem', value: '#faf8f5' }, { title: 'Tối', value: '#1a1a1a' }] }, initialValue: '#577057' },
    { name: 'textColor', title: 'Màu chữ', type: 'string', options: { list: [{ title: 'Trắng', value: '#ffffff' }, { title: 'Đen', value: '#1a1a1a' }] }, initialValue: '#ffffff' },
    { name: 'textAlign', title: 'Căn chỉnh', type: 'string', options: { list: [{ title: 'Giữa', value: 'center' }, { title: 'Trái', value: 'left' }] }, initialValue: 'center' },
  ],
  preview: {
    select: { heading: 'heading' },
    prepare({ heading }) { return { title: `🎯 CTA: ${heading || 'Chưa có tiêu đề'}` } },
  },
}

const imageTextBlock = {
  type: 'object',
  name: 'imageTextBlock',
  title: '📐 Ảnh + Text (2 cột)',
  fields: [
    { name: 'image', title: 'Ảnh', type: 'image', options: { hotspot: true } },
    { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
    { name: 'heading', title: 'Tiêu đề', type: 'string' },
    {
      name: 'body',
      title: 'Nội dung',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'buttons',
      title: 'Nút',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'text', title: 'Nội dung', type: 'string' },
          { name: 'url', title: 'Đường dẫn', type: 'string' },
          { name: 'style', title: 'Kiểu', type: 'string', options: { list: [{ title: 'Xanh', value: 'green' }, { title: 'Viền', value: 'outline' }] }, initialValue: 'outline' },
        ],
        preview: { select: { title: 'text' } },
      }],
    },
    { name: 'imagePosition', title: 'Vị trí ảnh', type: 'string', options: { list: [{ title: 'Trái', value: 'left' }, { title: 'Phải', value: 'right' }] }, initialValue: 'left' },
    { name: 'imageAspect', title: 'Tỉ lệ ảnh', type: 'string', options: { list: [{ title: 'Vuông', value: '1/1' }, { title: 'Dọc 4:5', value: '4/5' }, { title: 'Ngang 4:3', value: '4/3' }] }, initialValue: '4/5' },
    { name: 'background', title: 'Màu nền', type: 'string', options: { list: [{ title: 'Trắng', value: '#ffffff' }, { title: 'Kem', value: '#faf8f5' }, { title: 'Xanh nhạt', value: '#f0f4f0' }] }, initialValue: '#ffffff' },
  ],
  preview: {
    select: { heading: 'heading', media: 'image' },
    prepare({ heading, media }) { return { title: `📐 Ảnh+Text: ${heading || ''}`, media } },
  },
}

const productsBlock = {
  type: 'object',
  name: 'productsBlock',
  title: '🌸 Sản phẩm nổi bật',
  fields: [
    { name: 'heading', title: 'Tiêu đề section', type: 'string', initialValue: 'Sản phẩm nổi bật' },
    { name: 'subheading', title: 'Phụ đề', type: 'string' },
    {
      name: 'productSource',
      title: 'Nguồn sản phẩm',
      type: 'string',
      options: { list: [{ title: 'Bán chạy nhất', value: 'bestseller' }, { title: 'Mới nhất', value: 'latest' }, { title: 'Chọn thủ công', value: 'manual' }] },
      initialValue: 'bestseller',
    },
    {
      name: 'products',
      title: 'Sản phẩm (nếu chọn thủ công)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
    },
    { name: 'limit', title: 'Số sản phẩm hiển thị', type: 'number', initialValue: 4 },
    { name: 'columns', title: 'Số cột', type: 'number', options: { list: [{ title: '2 cột', value: 2 }, { title: '3 cột', value: 3 }, { title: '4 cột', value: 4 }] }, initialValue: 4 },
    { name: 'showViewAll', title: 'Hiện nút Xem tất cả', type: 'boolean', initialValue: true },
    { name: 'viewAllUrl', title: 'URL nút Xem tất cả', type: 'string', initialValue: '/san-pham' },
  ],
  preview: {
    select: { heading: 'heading', source: 'productSource' },
    prepare({ heading, source }) { return { title: `🌸 Sản phẩm: ${heading || ''} (${source})` } },
  },
}

const galleryBlock = {
  type: 'object',
  name: 'galleryBlock',
  title: '📸 Gallery',
  fields: [
    { name: 'heading', title: 'Tiêu đề', type: 'string' },
    {
      name: 'images',
      title: 'Ảnh',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'image', title: 'Ảnh', type: 'image', options: { hotspot: true } },
          { name: 'alt', title: 'Mô tả', type: 'string' },
          { name: 'caption', title: 'Chú thích', type: 'string' },
          { name: 'link', title: 'Link', type: 'string' },
        ],
        preview: { select: { media: 'image', title: 'caption' } },
      }],
    },
    { name: 'columns', title: 'Số cột', type: 'number', options: { list: [{ title: '2', value: 2 }, { title: '3', value: 3 }, { title: '4', value: 4 }, { title: '5', value: 5 }] }, initialValue: 3 },
    { name: 'gap', title: 'Khoảng cách', type: 'string', options: { list: [{ title: 'Không', value: '0' }, { title: 'Nhỏ', value: '4px' }, { title: 'Vừa', value: '1rem' }] }, initialValue: '4px' },
  ],
  preview: {
    select: { heading: 'heading' },
    prepare({ heading }) { return { title: `📸 Gallery: ${heading || ''}` } },
  },
}

const dividerBlock = {
  type: 'object',
  name: 'dividerBlock',
  title: '➖ Khoảng cách / Đường kẻ',
  fields: [
    { name: 'type', title: 'Loại', type: 'string', options: { list: [{ title: 'Khoảng trống', value: 'space' }, { title: 'Đường kẻ', value: 'line' }] }, initialValue: 'space' },
    { name: 'size', title: 'Kích thước', type: 'string', options: { list: [{ title: 'Nhỏ (2rem)', value: '2rem' }, { title: 'Vừa (4rem)', value: '4rem' }, { title: 'Lớn (6rem)', value: '6rem' }, { title: 'Rất lớn (10rem)', value: '10rem' }] }, initialValue: '4rem' },
    { name: 'lineColor', title: 'Màu đường kẻ', type: 'string', initialValue: 'rgba(0,0,0,0.08)' },
  ],
  preview: {
    select: { type: 'type', size: 'size' },
    prepare({ type, size }) { return { title: `➖ ${type === 'line' ? 'Đường kẻ' : 'Khoảng trống'} (${size})` } },
  },
}

const contactBlock = {
  type: 'object',
  name: 'contactBlock',
  title: '📞 Liên hệ / Form',
  fields: [
    { name: 'heading', title: 'Tiêu đề', type: 'string', initialValue: 'Liên hệ với chúng tôi' },
    { name: 'body', title: 'Mô tả', type: 'text', rows: 2 },
    { name: 'showPhone', title: 'Hiện số điện thoại', type: 'boolean', initialValue: true },
    { name: 'showZalo', title: 'Hiện Zalo', type: 'boolean', initialValue: true },
    { name: 'showMessenger', title: 'Hiện Messenger', type: 'boolean', initialValue: true },
    { name: 'showMap', title: 'Hiện bản đồ Google Maps', type: 'boolean', initialValue: false },
    { name: 'mapEmbedUrl', title: 'Link nhúng Google Maps', type: 'url' },
    { name: 'background', title: 'Màu nền', type: 'string', options: { list: [{ title: 'Trắng', value: '#ffffff' }, { title: 'Kem', value: '#faf8f5' }, { title: 'Xanh nhạt', value: '#f0f4f0' }] }, initialValue: '#faf8f5' },
  ],
  preview: {
    select: { heading: 'heading' },
    prepare({ heading }) { return { title: `📞 Liên hệ: ${heading}` } },
  },
}

// ─── PAGE SCHEMA ───────────────────────────────────────

export default {
  name: 'page',
  title: 'Trang tùy chỉnh',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Tên trang',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Đường dẫn URL',
      description: 'Ví dụ: "lien-he" → akina-florist.vercel.app/trang/lien-he',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
    },
    {
      name: 'isPublished',
      title: 'Hiển thị',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'showInNav',
      title: 'Hiện trong menu navigation',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'navLabel',
      title: 'Tên hiển thị trong menu',
      type: 'string',
    },
    // SEO
    { name: 'seoTitle', title: '🔍 SEO Title', type: 'string' },
    { name: 'seoDescription', title: '🔍 SEO Description', type: 'text', rows: 2 },
    { name: 'ogImage', title: '🔍 Ảnh chia sẻ', type: 'image' },

    // ─── PAGE BLOCKS ───
    {
      name: 'blocks',
      title: '📦 Các khối nội dung',
      description: 'Thêm, xóa, kéo thả để sắp xếp các khối. Mỗi khối là 1 section trên trang.',
      type: 'array',
      of: [
        heroBlock,
        textBlock,
        imageBlock,
        videoBlock,
        imageTextBlock,
        productsBlock,
        galleryBlock,
        ctaBlock,
        dividerBlock,
        contactBlock,
      ],
    },
  ],

  preview: {
    select: { title: 'title', slug: 'slug', published: 'isPublished' },
    prepare({ title, slug, published }) {
      return {
        title: `${published ? '✅' : '📝'} ${title}`,
        subtitle: `/trang/${slug?.current || ''}`,
      }
    },
  },
}
