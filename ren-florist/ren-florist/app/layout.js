import './globals.css'

export const metadata = {
  title: 'Câu chuyện của hoa & lá - Ren Florist',
  description: 'Ren được lấy cảm hứng từ hoa. Mỗi bó hoa tại Ren Florist là một tác phẩm nghệ thuật độc đáo, mang đến những câu chuyện và cảm xúc riêng biệt.',
  keywords: 'hoa, đặt hoa, hoa tươi, hoa nhập khẩu',
}

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  )
}
