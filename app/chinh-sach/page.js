import PreHeader from '@/components/PreHeader'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getSiteSettings, getNavPages } from '@/lib/queries'
import styles from './page.module.css'

export const revalidate = 60

export async function generateMetadata() {
  const s = await getSiteSettings()
  return { title: s?.navLabels?.policy || 'Chính sách', description: s?.seoDescription || '' }
}

const defaultPolicies = [
  { id: 'delivery', title: 'Chính sách giao hàng', content: ['Giao hàng nội thành TP.HCM trong vòng 2 giờ.', 'Miễn phí giao hàng cho đơn từ 500.000 VND trong bán kính 10km.', 'Phí giao hàng ngoài bán kính: 15.000–30.000 VND.', 'Gửi hình ảnh sản phẩm trước khi giao.'] },
  { id: 'return', title: 'Chính sách đổi trả', content: ['Không hỗ trợ đổi trả sau khi giao hàng thành công.', 'Liên hệ trong vòng 2 giờ nếu sản phẩm bị hư hỏng.', 'Cam kết giống mẫu tối thiểu 80%.'] },
  { id: 'payment', title: 'Phương thức thanh toán', content: ['Chuyển khoản ngân hàng.', 'Tiền mặt khi nhận hàng (COD).', 'Thanh toán qua MoMo, ZaloPay.'] },
  { id: 'privacy', title: 'Chính sách bảo mật', content: ['Thông tin khách hàng được bảo mật tuyệt đối.', 'Khách hàng có quyền yêu cầu xóa thông tin bất cứ lúc nào.'] },
]

export default async function ChinhSachPage() {
  const [s, navPages] = await Promise.all([getSiteSettings(), getNavPages()])
  const policies = s?.policies?.length > 0
    ? s.policies.map(function(p) { return { id: p.id, title: p.title, content: p.content || [] } })
    : defaultPolicies

  const preHeaderData = { text: s?.preHeaderText, linkText: s?.preHeaderLinkText, linkUrl: s?.preHeaderLinkUrl }
  const footerData = { hotline: s?.hotline, siteName: s?.siteName, copyright: s?.copyright, facebook: s?.facebook, instagram: s?.instagram, tiktok: s?.tiktok, zaloUrl: s?.zaloUrl, messengerUrl: s?.messengerUrl, stores: s?.stores || [], footerLinks: s?.footerLinks || {}, mobileNavLabels: s?.mobileNavLabels || {} }

  return (
    <>
      <PreHeader data={preHeaderData} />
      <Header siteName={s?.siteName} navLabels={s?.navLabels} navPages={navPages || []} />
      <main>
        <div className={styles.hero}>
          <h1 className="display-3" style={{ color: '#fff' }}>{s?.navLabels?.policy || 'Chính sách'}</h1>
        </div>
        <div className={styles.content}>
          <div className="container">
            <div className={styles.layout}>
              <nav className={styles.nav}>
                {policies.map(function(p) { return <a key={p.id} href={'#' + p.id} className={styles.navLink}>{p.title}</a> })}
              </nav>
              <div className={styles.articles}>
                {policies.map(function(p) {
                  return (
                    <article key={p.id} id={p.id} className={styles.article}>
                      <h2 className={styles.articleTitle}>{p.title}</h2>
                      <ul className={styles.list}>
                        {p.content.map(function(item, i) { return <li key={i}>{item}</li> })}
                      </ul>
                    </article>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer data={footerData} />
    </>
  )
}
