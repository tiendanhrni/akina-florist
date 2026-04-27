import PreHeader from '@/components/PreHeader'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getSiteSettings, getNavPages } from '@/lib/queries'
import styles from './page.module.css'

export const revalidate = 60

export async function generateMetadata() {
  const s = await getSiteSettings()
  return { title: s?.navLabels?.policy || 'Chinh sach', description: s?.seoDescription || '' }
}

const defaultPolicies = [
  { id: 'delivery', title: 'Chinh sach giao hang', content: ['Giao hang noi thanh TP.HCM trong vong 2 gio.', 'Mien phi giao hang cho don tu 500.000 VND trong ban kinh 10km.', 'Phi giao hang ngoai ban kinh: 15.000-30.000 VND.', 'Gui hinh anh san pham truoc khi giao.'] },
  { id: 'return', title: 'Chinh sach doi tra', content: ['Khong ho tro doi tra sau khi giao hang thanh cong.', 'Lien he trong vong 2 gio neu san pham bi hu hong.', 'Cam ket giong mau toi thieu 80%.'] },
  { id: 'payment', title: 'Phuong thuc thanh toan', content: ['Chuyen khoan ngan hang.', 'Tien mat khi nhan hang (COD).', 'Thanh toan qua MoMo, ZaloPay.'] },
  { id: 'privacy', title: 'Chinh sach bao mat', content: ['Thong tin khach hang duoc bao mat tuyet doi.', 'Khach hang co quyen yeu cau xoa thong tin bat cu luc nao.'] },
]

export default async function ChinhSachPage() {
  const [s, navPages] = await Promise.all([getSiteSettings(), getNavPages()])

  const rawPolicies = s?.policies
  const policies = rawPolicies && rawPolicies.length > 0
    ? rawPolicies.map(function(p) {
        return { id: p.id, title: p.title, content: p.content || [] }
      })
    : defaultPolicies

  const preHeaderData = {
    text: s?.preHeaderText,
    linkText: s?.preHeaderLinkText,
    linkUrl: s?.preHeaderLinkUrl
  }

  const footerData = {
    hotline: s?.hotline,
    siteName: s?.siteName,
    copyright: s?.copyright,
    facebook: s?.facebook,
    instagram: s?.instagram,
    tiktok: s?.tiktok,
    zaloUrl: s?.zaloUrl,
    messengerUrl: s?.messengerUrl,
    stores: s?.stores || [],
    footerLinks: s?.footerLinks || {},
    mobileNavLabels: s?.mobileNavLabels || {}
  }

  const navData = {
    siteName: s?.siteName,
    navLabels: s?.navLabels
  }

  return (
    <>
      <PreHeader data={preHeaderData} />
      <Header siteName={navData.siteName} navLabels={navData.navLabels} navPages={navPages || []} />
      <main>
        <div className={styles.hero}>
          <h1 className="display-3" style={{ color: '#fff' }}>{s?.navLabels?.policy || 'Chinh sach'}</h1>
        </div>
        <div className={styles.content}>
          <div className="container">
            <div className={styles.layout}>
              <nav className={styles.nav}>
                {policies.map(function(pol) {
                  return (
                    <a key={pol.id} href={'#' + pol.id} className={styles.navLink}>
                      {pol.title}
                    </a>
                  )
                })}
              </nav>
              <div className={styles.articles}>
                {policies.map(function(pol) {
                  return (
                    <article key={pol.id} id={pol.id} className={styles.article}>
                      <h2 className={styles.articleTitle}>{pol.title}</h2>
                      <ul className={styles.list}>
                        {pol.content.map(function(item, i) {
                          return <li key={i}>{item}</li>
                        })}
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
