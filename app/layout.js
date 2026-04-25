import './globals.css'

export const metadata = {
  title: 'Câu chuyện của hoa & lá - Akina Florist',
  description: 'Akina được lấy cảm hứng từ hoa. Mỗi bó hoa tại Akina Florist là một tác phẩm nghệ thuật độc đáo, mang đến những câu chuyện và cảm xúc riêng biệt.',
  keywords: 'hoa, đặt hoa, hoa tươi, hoa nhập khẩu',
}

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  )
}
