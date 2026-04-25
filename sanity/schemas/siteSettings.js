export default {
  name: 'siteSettings',
  title: 'Cài đặt website',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  groups: [
    { name: 'general',  title: '⚙️ Chung & Navigation' },
    { name: 'contact',  title: '📞 Liên hệ & Footer' },
    { name: 'homepage', title: '🏠 Trang chủ' },
    { name: 'shop',     title: '🛍️ Trang Đặt hoa & Sản phẩm' },
    { name: 'about',    title: '👤 Giới thiệu' },
    { name: 'other',    title: '📄 Trang khác' },
    { name: 'seo',      title: '🔍 SEO' },
  ],
  fields: [

    // ═══════════════════════════════════════════════════
    // ⚙️ CHUNG
    // ═══════════════════════════════════════════════════
    { name: 'siteName', title: 'Tên thương hiệu', type: 'string', group: 'general', initialValue: 'AKINA FLORIST' },
    { name: 'logo', title: 'Logo (ảnh — nếu không dùng sẽ hiện tên chữ)', type: 'image', group: 'general', options: { hotspot: true } },
    { name: 'favicon', title: 'Favicon (ảnh vuông 32×32px)', type: 'image', group: 'general' },

    // Navigation labels
    {
      name: 'navLabels',
      title: 'Tên menu Navigation',
      type: 'object',
      group: 'general',
      fields: [
        { name: 'shop',      title: 'Menu: Đặt hoa',           type: 'string', initialValue: 'Đặt hoa' },
        { name: 'about',     title: 'Menu: Giới thiệu',        type: 'string', initialValue: 'Giới thiệu' },
        { name: 'workshop',  title: 'Menu: Workshop & Academy', type: 'string', initialValue: 'Workshop & Academy' },
        { name: 'blog',      title: 'Menu: Blog',              type: 'string', initialValue: 'Blog' },
        { name: 'project',   title: 'Menu: Dự án',             type: 'string', initialValue: 'Dự án' },
        { name: 'policy',    title: 'Menu: Chính sách',        type: 'string', initialValue: 'Chính sách' },
      ],
    },

    // ═══════════════════════════════════════════════════
    // 📞 LIÊN HỆ & FOOTER
    // ═══════════════════════════════════════════════════
    { name: 'hotline',       title: 'Số hotline',        type: 'string', group: 'contact', initialValue: '0933 486 388' },
    { name: 'zaloUrl',       title: 'Link Zalo',         type: 'url',    group: 'contact' },
    { name: 'messengerUrl',  title: 'Link Messenger',    type: 'url',    group: 'contact' },
    { name: 'facebook',      title: 'Link Facebook',     type: 'url',    group: 'contact' },
    { name: 'instagram',     title: 'Link Instagram',    type: 'url',    group: 'contact' },
    { name: 'tiktok',        title: 'Link TikTok',       type: 'url',    group: 'contact' },
    {
      name: 'stores', title: 'Danh sách cửa hàng', type: 'array', group: 'contact',
      of: [{
        type: 'object',
        fields: [
          { name: 'address', title: 'Địa chỉ',           type: 'string' },
          { name: 'mapUrl',  title: 'Link Google Maps',  type: 'url' },
        ],
        preview: { select: { title: 'address' } },
      }],
    },
    { name: 'copyright', title: 'Text copyright', type: 'string', group: 'contact', initialValue: '©AKINA FLORIST 2025. ALL RIGHT RESERVED.' },

    // Footer nav labels
    {
      name: 'footerLinks',
      title: 'Tên link ở Footer',
      type: 'object',
      group: 'contact',
      fields: [
        { name: 'about',    title: 'Về thương hiệu', type: 'string', initialValue: 'VỀ AKINA FLORIST' },
        { name: 'shop',     title: 'Đặt hoa',        type: 'string', initialValue: 'ĐẶT HOA' },
        { name: 'project',  title: 'Dự án',          type: 'string', initialValue: 'DỰ ÁN' },
        { name: 'workshop', title: 'Workshop',        type: 'string', initialValue: 'WORKSHOP' },
        { name: 'policy',   title: 'Chính sách',     type: 'string', initialValue: 'CHÍNH SÁCH' },
      ],
    },
    // Mobile nav labels
    {
      name: 'mobileNavLabels',
      title: 'Tên menu Mobile (bottom bar)',
      type: 'object',
      group: 'contact',
      fields: [
        { name: 'home',     title: 'Trang chủ', type: 'string', initialValue: 'Trang chủ' },
        { name: 'shop',     title: 'Đặt hoa',   type: 'string', initialValue: 'Đặt hoa' },
        { name: 'contact',  title: 'Liên hệ',   type: 'string', initialValue: 'Liên hệ' },
        { name: 'workshop', title: 'Workshop',   type: 'string', initialValue: 'Workshop' },
        { name: 'menu',     title: 'Menu',       type: 'string', initialValue: 'Menu' },
      ],
    },

    // ═══════════════════════════════════════════════════
    // 🏠 TRANG CHỦ
    // ═══════════════════════════════════════════════════
    { name: 'preHeaderText',     title: '📢 Thanh thông báo — Nội dung', type: 'string', group: 'homepage', initialValue: 'Miễn phí giao hàng nội thành HCM' },
    { name: 'preHeaderLinkText', title: '📢 Thanh thông báo — Text nút', type: 'string', group: 'homepage', initialValue: 'XEM THÊM' },
    { name: 'preHeaderLinkUrl',  title: '📢 Thanh thông báo — URL nút',  type: 'string', group: 'homepage', initialValue: '/chinh-sach' },

    {
      name: 'homeVideo', title: '🎬 Video trang chủ', type: 'object', group: 'homepage',
      fields: [
        { name: 'videoFile',   title: 'Upload video (.mp4, ≤50MB)',          type: 'file',  options: { accept: 'video/mp4,video/webm' } },
        { name: 'videoUrl',    title: 'Hoặc paste link video trực tiếp',     type: 'url' },
        { name: 'posterImage', title: 'Ảnh hiển thị khi video chưa load',   type: 'image', options: { hotspot: true } },
      ],
    },

    { name: 'storyHeading',    title: '📖 Story — Tiêu đề lớn (màu xanh)', type: 'string', group: 'homepage', initialValue: 'Câu chuyện' },
    { name: 'storySubheading', title: '📖 Story — Tiêu đề phụ',            type: 'string', group: 'homepage', initialValue: 'Akina gửi đến bạn' },
    {
      name: 'storyParagraphs', title: '📖 Story — Các đoạn văn', type: 'array', group: 'homepage',
      of: [{ type: 'text', rows: 3 }],
    },
    { name: 'whySectionTitle', title: '⭐ Tiêu đề "Vì sao được yêu thích"', type: 'string', group: 'homepage', initialValue: 'Vì sao Akina được yêu thích?' },

    // ═══════════════════════════════════════════════════
    // 🛍️ TRANG ĐẶT HOA & SẢN PHẨM
    // ═══════════════════════════════════════════════════
    { name: 'shopPageTitle',    title: '🛍️ Trang Đặt hoa — Tiêu đề hero',    type: 'string', group: 'shop', initialValue: 'Thiết kế' },
    { name: 'shopPageSubtitle', title: '🛍️ Trang Đặt hoa — Phụ đề hero',     type: 'string', group: 'shop', initialValue: 'Độc bản' },
    { name: 'shopPageIntro',    title: '🛍️ Trang Đặt hoa — Đoạn giới thiệu', type: 'text', rows: 3, group: 'shop' },

    // Trang chi tiết sản phẩm
    {
      name: 'productPage',
      title: '🌸 Trang chi tiết sản phẩm',
      type: 'object',
      group: 'shop',
      fields: [
        { name: 'orderBtnText',     title: 'Text nút Đặt hàng',    type: 'string', initialValue: 'Đặt hàng ngay' },
        { name: 'consultBtnText',   title: 'Text nút Tư vấn',      type: 'string', initialValue: 'Nhắn tin tư vấn' },
        { name: 'shipmentLabel',    title: 'Label: Thông tin giao hàng',  type: 'string', initialValue: 'Thông tin giao hàng' },
        { name: 'usageLabel',       title: 'Label: Cách sử dụng hoa',     type: 'string', initialValue: 'Cách sử dụng hoa nhà Akina' },
        { name: 'noteLabel',        title: 'Label: Lưu ý',                type: 'string', initialValue: 'Lưu ý' },
        { name: 'relatedTitle',     title: 'Tiêu đề "Sản phẩm liên quan"', type: 'string', initialValue: 'bạn sẽ thích' },
        { name: 'relatedSubtitle',  title: 'Phụ đề sản phẩm liên quan',   type: 'string', initialValue: 'Những thiết kế' },
        { name: 'priceLabel',       title: 'Nhãn khi không có giá',        type: 'string', initialValue: 'Liên hệ' },
        { name: 'backToShop',       title: 'Text nút Quay lại',            type: 'string', initialValue: 'Quay lại' },
        { name: 'notFoundText',     title: 'Text khi không tìm thấy SP',   type: 'string', initialValue: 'Không tìm thấy sản phẩm' },
      ],
    },

    // Trang danh mục sản phẩm
    {
      name: 'categoryPage',
      title: '📂 Trang danh mục sản phẩm',
      type: 'object',
      group: 'shop',
      fields: [
        { name: 'emptyText',    title: 'Text khi danh mục trống', type: 'string', initialValue: 'Chưa có sản phẩm trong danh mục này.' },
        { name: 'emptySubtext', title: 'Text phụ khi trống',      type: 'string', initialValue: 'Vui lòng quay lại sau hoặc khám phá các danh mục khác.' },
      ],
    },

    // ═══════════════════════════════════════════════════
    // 👤 GIỚI THIỆU
    // ═══════════════════════════════════════════════════
    {
      name: 'aboutIntro',    title: '👤 Trang Giới thiệu — Đoạn intro',  type: 'array',  group: 'about',
      of: [{ type: 'text', rows: 3 }],
    },
    { name: 'founderRole',  title: '👤 Chức danh founder',               type: 'string', group: 'about', initialValue: 'Founder of Akina Florist' },
    {
      name: 'founderQuote', title: '👤 Lời founder',                      type: 'array',  group: 'about',
      of: [{ type: 'text', rows: 3 }],
    },
    {
      name: 'coreValues',   title: '👤 Giá trị cốt lõi',                 type: 'array',  group: 'about',
      of: [{
        type: 'object',
        fields: [
          { name: 'title',       title: 'Tên giá trị', type: 'string' },
          { name: 'description', title: 'Mô tả',       type: 'text',   rows: 3 },
        ],
        preview: { select: { title: 'title' } },
      }],
    },
    {
      name: 'valuesSection',
      title: '👤 Tiêu đề phần Giá trị cốt lõi',
      type: 'object',
      group: 'about',
      fields: [
        { name: 'eyebrow',  title: 'Chữ nhỏ phía trên', type: 'string', initialValue: 'Giá trị' },
        { name: 'heading',  title: 'Tiêu đề chính',     type: 'string', initialValue: 'Cốt Lõi' },
      ],
    },

    // ═══════════════════════════════════════════════════
    // 📄 TRANG KHÁC
    // ═══════════════════════════════════════════════════

    // Workshop
    { name: 'workshopIntro', title: '🎓 Trang Workshop — Đoạn giới thiệu', type: 'text', rows: 3, group: 'other' },
    {
      name: 'workshopPage',
      title: '🎓 Trang Workshop — Text & Labels',
      type: 'object',
      group: 'other',
      fields: [
        { name: 'heroTitle',       title: 'Tiêu đề hero',          type: 'string', initialValue: 'Học Viên' },
        { name: 'heroEyebrow',     title: 'Eyebrow hero',           type: 'string', initialValue: 'Sản phẩm' },
        { name: 'infoLabel',       title: 'Label thông tin KH',    type: 'string', initialValue: 'THÔNG TIN KHÓA HỌC' },
        { name: 'durationLabel',   title: 'Label thời lượng',      type: 'string', initialValue: 'Thời lượng:' },
        { name: 'scheduleLabel',   title: 'Label lịch học',        type: 'string', initialValue: 'Lịch học:' },
        { name: 'studentsLabel',   title: 'Label số học viên',     type: 'string', initialValue: 'Số lượng:' },
        { name: 'priceLabel',      title: 'Label học phí',         type: 'string', initialValue: 'Học phí:' },
        { name: 'registerBtn',     title: 'Text nút Đăng ký',      type: 'string', initialValue: 'Đăng ký ngay' },
        { name: 'comingSoon',      title: 'Text khi chưa có KH',   type: 'string', initialValue: 'Sắp ra mắt' },
        { name: 'comingSoonSub',   title: 'Text phụ khi chưa có',  type: 'string', initialValue: 'Các khóa học mới đang được chuẩn bị.' },
        { name: 'contactBtn',      title: 'Text nút Liên hệ',      type: 'string', initialValue: 'Liên hệ ngay' },
      ],
    },

    // Dự án
    {
      name: 'projectPage',
      title: '📁 Trang Dự án — Text & Labels',
      type: 'object',
      group: 'other',
      fields: [
        { name: 'heroTitle',    title: 'Tiêu đề hero',         type: 'string', initialValue: 'ẤN TƯỢNG HƠN' },
        { name: 'heroEyebrow',  title: 'Eyebrow hero',          type: 'string', initialValue: 'Sự Kiện' },
        { name: 'heroDesc',     title: 'Mô tả hero',            type: 'string', initialValue: 'NHỜ NHỮNG BÔNG HOA TÔ ĐIỂM' },
        { name: 'comingSoon',   title: 'Text khi chưa có DA',   type: 'string', initialValue: 'Sắp ra mắt' },
        { name: 'comingSoonSub',title: 'Text phụ khi chưa có',  type: 'string', initialValue: 'Các dự án đang được cập nhật.' },
      ],
    },

    // Blog
    {
      name: 'blogPage',
      title: '✍️ Trang Blog — Text & Labels',
      type: 'object',
      group: 'other',
      fields: [
        { name: 'heroTitle',     title: 'Tiêu đề hero',             type: 'string', initialValue: 'Nhật ký hoa' },
        { name: 'heroEyebrow',   title: 'Eyebrow hero',              type: 'string', initialValue: 'Câu chuyện' },
        { name: 'filterAll',     title: 'Filter: Tất cả',           type: 'string', initialValue: 'Tất cả' },
        { name: 'defaultAuthor', title: 'Tác giả mặc định',         type: 'string', initialValue: 'Akina Florist' },
        { name: 'comingSoon',    title: 'Text khi chưa có bài',     type: 'string', initialValue: 'Sắp ra mắt' },
        { name: 'comingSoonSub', title: 'Text phụ khi chưa có',     type: 'string', initialValue: 'Các bài viết đang được chuẩn bị. Hãy quay lại sau!' },
        // Blog detail
        { name: 'orderCTA',      title: 'CTA sidebar: Tiêu đề',     type: 'string', initialValue: 'Đặt hoa ngay' },
        { name: 'orderCTADesc',  title: 'CTA sidebar: Mô tả',       type: 'text', rows: 2, initialValue: 'Liên hệ Akina Florist để được tư vấn và đặt hoa theo yêu cầu.' },
        { name: 'callBtn',       title: 'CTA sidebar: Text nút gọi', type: 'string', initialValue: 'Gọi ngay' },
        { name: 'shopBtn',       title: 'CTA sidebar: Text nút SP',  type: 'string', initialValue: 'Xem sản phẩm' },
        { name: 'relatedTitle',  title: 'Tiêu đề bài liên quan',    type: 'string', initialValue: 'Bài viết liên quan' },
        { name: 'relatedEyebrow',title: 'Eyebrow bài liên quan',    type: 'string', initialValue: 'Có thể bạn thích' },
        { name: 'shareLabel',    title: 'Label Chia sẻ',            type: 'string', initialValue: 'Chia sẻ:' },
      ],
    },

    // Chính sách
    {
      name: 'policies', title: '📋 Trang Chính sách', type: 'array', group: 'other',
      of: [{
        type: 'object',
        fields: [
          { name: 'id',      title: 'ID (không dấu, không space)',  type: 'string' },
          { name: 'title',   title: 'Tiêu đề',                     type: 'string' },
          { name: 'content', title: 'Nội dung',                    type: 'array', of: [{ type: 'text', rows: 2 }] },
        ],
        preview: { select: { title: 'title' } },
      }],
    },

    // 404 page
    {
      name: 'notFoundPage',
      title: '🚫 Trang 404',
      type: 'object',
      group: 'other',
      fields: [
        { name: 'heading',    title: 'Tiêu đề',       type: 'string', initialValue: 'Trang không tồn tại' },
        { name: 'body',       title: 'Mô tả',         type: 'string', initialValue: 'Trang bạn tìm kiếm có thể đã bị xóa hoặc không tồn tại.' },
        { name: 'backBtn',    title: 'Text nút về trang chủ', type: 'string', initialValue: 'Về trang chủ' },
      ],
    },

    // ═══════════════════════════════════════════════════
    // 🔍 SEO
    // ═══════════════════════════════════════════════════
    { name: 'seoTitle',           title: 'Title mặc định',                          type: 'string', group: 'seo', initialValue: 'Câu chuyện của hoa & lá - Akina Florist' },
    { name: 'seoDescription',     title: 'Description mặc định',                    type: 'text',   group: 'seo', rows: 2 },
    { name: 'seoKeywords',        title: 'Keywords (cách nhau bởi dấu phẩy)',       type: 'string', group: 'seo' },
    { name: 'ogImage',            title: 'Ảnh chia sẻ mạng xã hội (1200×630px)',   type: 'image',  group: 'seo', options: { hotspot: true } },
    { name: 'googleVerification', title: 'Google Search Console verification code', type: 'string', group: 'seo' },
    { name: 'googleAnalyticsId',  title: 'Google Analytics ID (G-XXXXXXXXXX)',      type: 'string', group: 'seo' },
  ],

  preview: {
    prepare() { return { title: '⚙️ Cài đặt website' } },
  },
}
