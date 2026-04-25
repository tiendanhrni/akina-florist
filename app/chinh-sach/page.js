import PreHeader from '@/components/PreHeader'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getSiteSettings } from '@/lib/queries'
import styles from './page.module.css'

export const revalidate = 60
export async function generateMetadata() {
  return { title: 'Chính sách', description: 'Chính sách giao hàng, đổi trả và bảo mật của Akina Florist.' }
}

const defaultPolicies = [
  { id: 'delivery', title: 'Chính sách giao hàng', content: ['Giao hàng nội thành TP.HCM trong vòng 2 giờ.', 'Miễn phí giao hàng cho đơn từ 500.000 VND trong bán kính 10km.', 'Phí giao hàng ngoài bán kính: 15.000 – 30.000 VND tùy khoảng cách.', 'Giao hàng tỉnh thành khác: vui lòng liên hệ trực tiếp.', 'Gửi hình ảnh sản phẩm để khách hàng xác nhận trước khi giao.'] },
  { id: 'return', title: 'Chính sách đổi trả', content: ['Không hỗ trợ đổi trả sau khi đã giao hàng thành công do tính chất tươi sống.', 'Liên hệ trong vòng 2 giờ nếu sản phẩm bị hư hỏng trong vận chuyển.', 'Cam kết giống mẫu tối thiểu 80% về bố cục và màu sắc.', 'Sẽ hoàn tiền hoặc giao lại nếu không đạt chất lượng.'] },
  { id: 'payment', title: 'Phương thức thanh toán', content: ['Chuyển khoản ngân hàng.', 'Tiền mặt khi nhận hàng (COD).', 'Thanh toán qua MoMo, ZaloPay.', 'Đơn hàng lớn hoặc sự kiện yêu cầu đặt cọc 50%.'] },
  { id: 'privacy', title: 'Chính sách bảo mật', content: ['Thông tin cá nhân được bảo mật tuyệt đối và không chia sẻ với bên thứ ba.', 'Chỉ sử dụng thông tin để phục vụ đơn hàng và thông báo ưu đãi.', 'Khách hàng có quyền yêu cầu xóa thông tin bất cứ lúc nào.'] },
]

export default async function ChinhSachPage() {
  const s = await getSiteSettings()
  const policies = s?.policies?.length > 0
    ? s.policies.map(p => ({ id: p.id, title: p.title, content: p.content || [] }))
    : defaultPolicies

  return (
    <>
      <PreHeader s={s} />
      <Header />
      <main>
        <div className={styles.hero}>
          <h1 className="display-3" style={{ color: '#fff' }}>Chính sách</h1>
        </div>
        <div className={styles.content}>
          <div className="container">
            <div className={styles.layout}>
              <nav className={styles.nav}>
                {policies.map(p => <a key={p.id} href={`#${p.id}`} className={styles.navLink}>{p.title}</a>)}
              </nav>
              <div className={styles.articles}>
                {policies.map(p => (
                  <article key={p.id} id={p.id} className={styles.article}>
                    <h2 className={styles.articleTitle}>{p.title}</h2>
                    <ul className={styles.list}>
                      {p.content.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer s={s} />
    </>
  )
}
