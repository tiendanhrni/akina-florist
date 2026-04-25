import Link from 'next/link'
import PreHeader from '@/components/PreHeader'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function NotFound() {
  return (
    <>
      <PreHeader />
      <Header />
      <main style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '4rem 2rem' }}>
        <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(80px, 15vw, 160px)', fontWeight: 300, opacity: 0.08, lineHeight: 1 }}>404</div>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 300, marginTop: '-2rem', marginBottom: '1rem' }}>Trang không tồn tại</h1>
        <p style={{ fontSize: '14px', opacity: 0.5, marginBottom: '2rem' }}>Trang bạn tìm kiếm có thể đã bị xóa hoặc không tồn tại.</p>
        <Link href="/" style={{ display: 'inline-block', padding: '12px 32px', border: '1px solid #1a1a1a', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', transition: 'all 0.3s' }}>
          Về trang chủ
        </Link>
      </main>
      <Footer />
    </>
  )
}
