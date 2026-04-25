import './globals.css'
import { draftMode } from 'next/headers'
import FloatButtons from '@/components/FloatButtons'
import DraftModeBanner from '@/components/DraftModeBanner'
import VisualEditingComponent from '@/components/VisualEditing'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://akina-florist.vercel.app'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Câu chuyện của hoa & lá - Akina Florist',
  description: 'Akina được lấy cảm hứng từ hoa. Mỗi bó hoa tại Akina Florist là một tác phẩm nghệ thuật độc đáo, mang đến những câu chuyện và cảm xúc riêng biệt.',
  keywords: 'hoa, đặt hoa, hoa tươi, hoa nhập khẩu, akina florist',
  openGraph: {
    title: 'Câu chuyện của hoa & lá - Akina Florist',
    description: 'Akina được lấy cảm hứng từ hoa. Mỗi bó hoa tại Akina Florist là một tác phẩm nghệ thuật độc đáo.',
    type: 'website',
    locale: 'vi_VN',
  },
}

export default async function RootLayout({ children }) {
  const { isEnabled: isDraftMode } = await draftMode()
  return (
    <html lang="vi">
      <body>
        {isDraftMode && <DraftModeBanner />}
        {children}
        <FloatButtons />
        {isDraftMode && <VisualEditingComponent />}
      </body>
    </html>
  )
}
