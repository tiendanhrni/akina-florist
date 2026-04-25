// sanity/schemas/siteSettings.js
export default {
  name: 'siteSettings',
  title: 'Cài đặt website',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  groups: [
    { name: 'general', title: '⚙️ Chung' },
    { name: 'homepage', title: '🏠 Trang chủ' },
    { name: 'contact', title: '📞 Liên hệ & Footer' },
    { name: 'pages', title: '📄 Các trang' },
    { name: 'seo', title: '🔍 SEO' },
  ],
  fields: [

    // ═══════════════════════════════════
    // ⚙️ CHUNG
    // ═══════════════════════════════════
    {
      name: 'siteName',
      title: 'Tên thương hiệu',
      type: 'string',
      group: 'general',
      initialValue: 'AKINA FLORIST',
    },
    {
      name: 'logo',
      title: 'Logo (nếu dùng ảnh thay text)',
      type: 'image',
      group: 'general',
      options: { hotspot: true },
    },
    {
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      group: 'general',
    },

    // ═══════════════════════════════════
    // 📞 LIÊN HỆ & FOOTER
    // ═══════════════════════════════════
    {
      name: 'hotline',
      title: 'Số hotline',
      type: 'string',
      group: 'contact',
      initialValue: '0933 486 388',
    },
    {
      name: 'zaloUrl',
      title: 'Link Zalo',
      type: 'url',
      group: 'contact',
    },
    {
      name: 'messengerUrl',
      title: 'Link Messenger',
      type: 'url',
      group: 'contact',
    },
    {
      name: 'facebook',
      title: 'Link Facebook',
      type: 'url',
      group: 'contact',
    },
    {
      name: 'instagram',
      title: 'Link Instagram',
      type: 'url',
      group: 'contact',
    },
    {
      name: 'tiktok',
      title: 'Link TikTok',
      type: 'url',
      group: 'contact',
    },
    {
      name: 'stores',
      title: 'Danh sách cửa hàng',
      type: 'array',
      group: 'contact',
      of: [{
        type: 'object',
        fields: [
          { name: 'address', title: 'Địa chỉ', type: 'string' },
          { name: 'mapUrl', title: 'Link Google Maps', type: 'url' },
        ],
        preview: { select: { title: 'address' } },
      }],
    },
    {
      name: 'copyright',
      title: 'Text copyright',
      type: 'string',
      group: 'contact',
      initialValue: '©AKINA FLORIST 2025. ALL RIGHT RESERVED.',
    },

    // ═══════════════════════════════════
    // 🏠 TRANG CHỦ
    // ═══════════════════════════════════
    {
      name: 'preHeaderText',
      title: '📢 Thanh thông báo — Nội dung',
      type: 'string',
      group: 'homepage',
      initialValue: 'Miễn phí giao hàng nội thành HCM',
    },
    {
      name: 'preHeaderLinkText',
      title: '📢 Thanh thông báo — Text nút',
      type: 'string',
      group: 'homepage',
      initialValue: 'XEM THÊM',
    },
    {
      name: 'preHeaderLinkUrl',
      title: '📢 Thanh thông báo — URL nút',
      type: 'string',
      group: 'homepage',
      initialValue: '/chinh-sach',
    },
    {
      name: 'homeVideo',
      title: '🎬 Video trang chủ',
      type: 'object',
      group: 'homepage',
      fields: [
        {
          name: 'videoFile',
          title: 'Upload video (.mp4, khuyên dùng cho file ≤50MB)',
          type: 'file',
          options: { accept: 'video/mp4,video/webm' },
        },
        {
          name: 'videoUrl',
          title: 'Hoặc paste link video trực tiếp (.mp4)',
          description: 'Dùng khi video quá nặng — upload lên Google Drive hoặc Cloudinary rồi lấy link trực tiếp',
          type: 'url',
        },
        {
          name: 'posterImage',
          title: 'Ảnh hiển thị khi video chưa load',
          type: 'image',
          options: { hotspot: true },
        },
      ],
    },
    {
      name: 'storyHeading',
      title: '📖 Story — Tiêu đề lớn (màu xanh)',
      type: 'string',
      group: 'homepage',
      initialValue: 'Câu chuyện',
    },
    {
      name: 'storySubheading',
      title: '📖 Story — Tiêu đề phụ',
      type: 'string',
      group: 'homepage',
      initialValue: 'Akina gửi đến bạn',
    },
    {
      name: 'storyParagraphs',
      title: '📖 Story — Các đoạn văn',
      type: 'array',
      group: 'homepage',
      of: [{ type: 'text', rows: 3 }],
    },
    {
      name: 'whySectionTitle',
      title: '⭐ Tiêu đề phần "Vì sao được yêu thích"',
      type: 'string',
      group: 'homepage',
      initialValue: 'Vì sao Akina được yêu thích?',
    },

    // ═══════════════════════════════════
    // 📄 CÁC TRANG
    // ═══════════════════════════════════
    {
      name: 'shopPageTitle',
      title: '🛍️ Trang Đặt hoa — Tiêu đề hero',
      type: 'string',
      group: 'pages',
      initialValue: 'Thiết kế',
    },
    {
      name: 'shopPageSubtitle',
      title: '🛍️ Trang Đặt hoa — Phụ đề hero',
      type: 'string',
      group: 'pages',
      initialValue: 'Độc bản',
    },
    {
      name: 'shopPageIntro',
      title: '🛍️ Trang Đặt hoa — Đoạn giới thiệu',
      type: 'text',
      rows: 3,
      group: 'pages',
    },
    {
      name: 'aboutIntro',
      title: '👤 Trang Giới thiệu — Đoạn intro',
      type: 'array',
      group: 'pages',
      of: [{ type: 'text', rows: 3 }],
    },
    {
      name: 'founderRole',
      title: '👤 Trang Giới thiệu — Chức danh founder',
      type: 'string',
      group: 'pages',
      initialValue: 'Founder of Akina Florist',
    },
    {
      name: 'founderQuote',
      title: '👤 Trang Giới thiệu — Lời founder',
      type: 'array',
      group: 'pages',
      of: [{ type: 'text', rows: 3 }],
    },
    {
      name: 'coreValues',
      title: '👤 Trang Giới thiệu — Giá trị cốt lõi',
      type: 'array',
      group: 'pages',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Tên giá trị', type: 'string' },
          { name: 'description', title: 'Mô tả', type: 'text', rows: 3 },
        ],
        preview: { select: { title: 'title' } },
      }],
    },
    {
      name: 'workshopIntro',
      title: '🎓 Trang Workshop — Đoạn giới thiệu',
      type: 'text',
      rows: 3,
      group: 'pages',
    },
    {
      name: 'policies',
      title: '📋 Trang Chính sách',
      type: 'array',
      group: 'pages',
      of: [{
        type: 'object',
        fields: [
          { name: 'id', title: 'ID (không dấu, không space)', type: 'string' },
          { name: 'title', title: 'Tiêu đề', type: 'string' },
          { name: 'content', title: 'Nội dung', type: 'array', of: [{ type: 'text', rows: 2 }] },
        ],
        preview: { select: { title: 'title' } },
      }],
    },

    // ═══════════════════════════════════
    // 🔍 SEO
    // ═══════════════════════════════════
    {
      name: 'seoTitle',
      title: 'Title mặc định',
      type: 'string',
      group: 'seo',
      initialValue: 'Câu chuyện của hoa & lá - Akina Florist',
    },
    {
      name: 'seoDescription',
      title: 'Description mặc định',
      type: 'text',
      rows: 2,
      group: 'seo',
    },
    {
      name: 'seoKeywords',
      title: 'Keywords (cách nhau bởi dấu phẩy)',
      type: 'string',
      group: 'seo',
    },
    {
      name: 'ogImage',
      title: 'Ảnh chia sẻ mạng xã hội (1200×630px)',
      type: 'image',
      group: 'seo',
      options: { hotspot: true },
    },
    {
      name: 'googleVerification',
      title: 'Google Search Console verification code',
      type: 'string',
      group: 'seo',
    },
  ],

  preview: {
    prepare() {
      return { title: '⚙️ Cài đặt website' }
    },
  },
}
