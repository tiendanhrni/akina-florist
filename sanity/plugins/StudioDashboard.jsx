// sanity/plugins/StudioDashboard.jsx
// Trang chủ Studio — hiển thị shortcuts và hướng dẫn nhanh

const QUICK_LINKS = [
  { icon: '⚙️', label: 'Cài đặt website', desc: 'Hotline, địa chỉ, SEO, video...', href: '/studio/intent/edit/id=siteSettings;type=siteSettings/' },
  { icon: '🖼️', label: 'Banner trang chủ', desc: 'Thêm/sửa ảnh slider', href: '/studio/structure/banner' },
  { icon: '🌸', label: 'Thêm sản phẩm mới', desc: 'Upload ảnh, điền giá...', href: '/studio/intent/create/type=product/' },
  { icon: '📂', label: 'Danh mục sản phẩm', desc: 'Quản lý các loại hoa', href: '/studio/structure/category' },
  { icon: '✍️', label: 'Viết bài Blog', desc: 'Tạo bài viết mới', href: '/studio/intent/create/type=blog/' },
  { icon: '🖼️', label: 'Thư viện ảnh', desc: 'Upload và quản lý media', href: '/studio/media' },
  { icon: '🎓', label: 'Workshop', desc: 'Thêm khóa học mới', href: '/studio/structure/workshop' },
  { icon: '📁', label: 'Dự án', desc: 'Thêm dự án sự kiện', href: '/studio/structure/project' },
]

const GUIDES = [
  {
    icon: '1️⃣',
    title: 'Thêm sản phẩm',
    steps: ['Vào 📂 Danh mục → tạo danh mục trước', 'Vào 🌸 Sản phẩm → New document', 'Điền tên, giá, upload ảnh', 'Chọn đúng Danh mục', 'Bấm Publish ✅'],
  },
  {
    icon: '2️⃣',
    title: 'Thay ảnh Banner',
    steps: ['Vào 🖼️ Banner trang chủ', 'Click vào banner cần sửa', 'Upload ảnh mới (Desktop + Mobile)', 'Bấm Publish ✅', 'Đợi ~60 giây để website cập nhật'],
  },
  {
    icon: '3️⃣',
    title: 'Viết bài Blog',
    steps: ['Vào ✍️ Blog → New document', 'Điền tiêu đề → Slug tự động', 'Upload ảnh bìa', 'Viết nội dung (hỗ trợ tiêu đề, danh sách, ảnh...)', 'Chuyển trạng thái → Đã đăng → Publish ✅'],
  },
  {
    icon: '4️⃣',
    title: 'Visual Editing',
    steps: ['Vào tab Presentation (menu trên cùng)', 'Bật toggle Edit (góc trái)', 'Click vào bất kỳ phần nào trên website', 'Sửa bên phải → Publish ✅'],
  },
]

export default function StudioDashboard() {
  return (
    <div style={{
      maxWidth: 1100,
      margin: '0 auto',
      padding: '2.5rem 1.5rem',
      fontFamily: 'system-ui, sans-serif',
    }}>
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ fontSize: 28, fontWeight: 700, color: '#1a1a1a', marginBottom: 4 }}>
          🌸 Akina Florist Admin
        </div>
        <div style={{ fontSize: 14, color: '#666' }}>
          Chào mừng! Chọn mục cần quản lý hoặc xem hướng dẫn bên dưới.
        </div>
      </div>

      {/* Quick Links */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#577057', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
          Truy cập nhanh
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '0.75rem',
        }}>
          {QUICK_LINKS.map(link => (
            <a key={link.label} href={link.href} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem',
              padding: '1rem',
              background: '#fff',
              border: '1px solid #e8e8e8',
              borderRadius: 8,
              textDecoration: 'none',
              color: 'inherit',
              transition: 'all 0.15s',
              cursor: 'pointer',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#577057'
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(87,112,87,0.12)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#e8e8e8'
                e.currentTarget.style.boxShadow = 'none'
              }}>
              <span style={{ fontSize: 22 }}>{link.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a', marginBottom: 2 }}>{link.label}</div>
                <div style={{ fontSize: 11, color: '#888' }}>{link.desc}</div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Guides */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#577057', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
          Hướng dẫn nhanh
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '0.75rem' }}>
          {GUIDES.map(guide => (
            <div key={guide.title} style={{
              padding: '1.25rem',
              background: '#f9fdf9',
              border: '1px solid #e0ebe0',
              borderRadius: 8,
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#1a1a1a', marginBottom: '0.75rem' }}>
                {guide.icon} {guide.title}
              </div>
              <ol style={{ paddingLeft: '1.25rem', margin: 0 }}>
                {guide.steps.map((step, i) => (
                  <li key={i} style={{ fontSize: 12, color: '#555', marginBottom: 4, lineHeight: 1.5 }}>{step}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>

      {/* Info bar */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
        padding: '1rem 1.25rem',
        background: '#f0f4f0',
        borderRadius: 8,
        fontSize: 12,
        color: '#555',
      }}>
        <span>💡 Sau khi Publish, đợi tối đa <strong>60 giây</strong> để website cập nhật</span>
        <span>·</span>
        <span>🌐 Website: <a href="https://akina-florist.vercel.app" target="_blank" rel="noreferrer" style={{ color: '#577057' }}>akina-florist.vercel.app</a></span>
        <span>·</span>
        <span>🔍 Visual Editing: Tab <strong>Presentation</strong> → bật <strong>Edit</strong></span>
      </div>
    </div>
  )
}
