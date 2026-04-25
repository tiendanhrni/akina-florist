import PreHeader from '@/components/PreHeader'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import styles from './page.module.css'

export const metadata = {
  title: 'Chính sách - Akina Florist',
  description: 'Chính sách giao hàng, đổi trả và bảo mật của Akina Florist.',
}

const policies = [
  {
    id: 'delivery',
    title: 'Chính sách giao hàng',
    content: [
      'Akina Florist hỗ trợ giao hàng nội thành TP.HCM trong vòng 2 giờ kể từ khi xác nhận đơn hàng.',
      'Miễn phí giao hàng cho đơn từ 500.000 VND trong bán kính 10km.',
      'Phí giao hàng ngoài bán kính: 15.000 – 30.000 VND tùy khoảng cách.',
      'Giao hàng tỉnh thành khác: vui lòng liên hệ trực tiếp để được tư vấn.',
      'Chúng tôi sẽ gửi hình ảnh sản phẩm để khách hàng xác nhận trước khi giao.',
    ]
  },
  {
    id: 'return',
    title: 'Chính sách đổi trả',
    content: [
      'Do tính chất tươi sống của sản phẩm, Akina Florist không hỗ trợ đổi trả sau khi đã giao hàng thành công.',
      'Trường hợp sản phẩm không đúng mô tả hoặc bị hư hỏng trong quá trình vận chuyển, vui lòng liên hệ trong vòng 2 giờ sau khi nhận hàng.',
      'Akina cam kết giống mẫu tối thiểu 80% về bố cục và màu sắc.',
      'Trong trường hợp không đạt chất lượng, chúng tôi sẽ hoàn tiền hoặc giao lại sản phẩm.',
    ]
  },
  {
    id: 'payment',
    title: 'Phương thức thanh toán',
    content: [
      'Chuyển khoản ngân hàng: thông tin tài khoản sẽ được cung cấp khi đặt hàng.',
      'Tiền mặt khi nhận hàng (COD).',
      'Thanh toán qua MoMo, ZaloPay.',
      'Đối với đơn hàng lớn hoặc sự kiện, yêu cầu đặt cọc 50% để xác nhận.',
    ]
  },
  {
    id: 'privacy',
    title: 'Chính sách bảo mật',
    content: [
      'Thông tin cá nhân của khách hàng được bảo mật tuyệt đối và không chia sẻ với bên thứ ba.',
      'Chúng tôi chỉ sử dụng thông tin liên lạc để phục vụ đơn hàng và thông báo chương trình ưu đãi (nếu khách hàng đồng ý).',
      'Khách hàng có quyền yêu cầu xóa thông tin cá nhân bất cứ lúc nào.',
    ]
  },
]

export default function ChinhSachPage() {
  return (
    <>
      <PreHeader />
      <Header />
      <main>
        <div className={styles.hero}>
          <h1 className="display-3" style={{ color: '#fff' }}>Chính sách</h1>
        </div>
        <div className={styles.content}>
          <div className="container">
            <div className={styles.layout}>
              {/* Sidebar nav */}
              <nav className={styles.nav}>
                {policies.map(p => (
                  <a key={p.id} href={`#${p.id}`} className={styles.navLink}>{p.title}</a>
                ))}
              </nav>
              {/* Content */}
              <div className={styles.articles}>
                {policies.map(p => (
                  <article key={p.id} id={p.id} className={styles.article}>
                    <h2 className={styles.articleTitle}>{p.title}</h2>
                    <ul className={styles.list}>
                      {p.content.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
