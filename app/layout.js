import './globals.css'
import { draftMode } from 'next/headers'
import FloatButtons from '@/components/FloatButtons'
import DraftModeBanner from '@/components/DraftModeBanner'
import VisualEditingComponent from '@/components/VisualEditing'
import { getSiteSettings } from '@/lib/queries'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://akina-florist.vercel.app'

export async function generateMetadata() {
  const s = await getSiteSettings()
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: s?.seoTitle || 'Câu chuyện của hoa & lá - Akina Florist', template: `%s - ${s?.siteName || 'Akina Florist'}` },
    description: s?.seoDescription || 'Akina được lấy cảm hứng từ hoa. Mỗi bó hoa tại Akina Florist là một tác phẩm nghệ thuật độc đáo.',
    keywords: s?.seoKeywords || 'hoa, đặt hoa, hoa tươi, hoa nhập khẩu, akina florist',
    verification: s?.googleVerification ? { google: s.googleVerification } : undefined,
    openGraph: {
      title: s?.seoTitle || 'Câu chuyện của hoa & lá - Akina Florist',
      description: s?.seoDescription || 'Mỗi bó hoa tại Akina Florist là một tác phẩm nghệ thuật độc đáo.',
      type: 'website',
      locale: 'vi_VN',
      images: s?.ogImage ? [{ url: s.ogImage, width: 1200, height: 630 }] : [],
    },
  }
}

export default async function RootLayout({ children }) {
  const [{ isEnabled: isDraftMode }, s] = await Promise.all([
    draftMode(),
    getSiteSettings(),
  ])

  return (
    <html lang="vi">
      <body>
        {isDraftMode && <DraftModeBanner />}
        {children}
        <FloatButtons s={s} />
        {isDraftMode && <VisualEditingComponent />}
      </body>
    </html>
  )
}
