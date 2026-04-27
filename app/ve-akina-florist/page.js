import PreHeader from '@/components/PreHeader'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhySection from '@/components/WhySection'
import { getAboutPage, getWhySection, getSiteSettings, getNavPages } from '@/lib/queries'
import styles from './page.module.css'
import Image from 'next/image'

export const revalidate = 60

export async function generateMetadata() {
  const s = await getSiteSettings()
  return { title: s?.navLabels?.about || 'Về Akina Florist', description: s?.seoDescription || '' }
}

const defaultIntro = ['Akina được lấy cảm hứng từ hoa sen trong tiếng Nhật.', 'Hoa không chỉ là hoa, mà còn là ngôn ngữ của cảm xúc.', 'Akina mong muốn biến những khoảnh khắc cuộc sống trở nên đặc biệt hơn.']
const defaultQuote = ['Tôi luôn tin rằng, hoa có khả năng làm cho cuộc sống trở nên tươi đẹp hơn.', 'Mỗi ngày, tôi tìm kiếm những nguồn cảm hứng mới từ thiên nhiên và cuộc sống.']
const defaultValues = [
  { title: 'Chuyên nghiệp', description: 'Kỹ thuật, thẩm mỹ và trải nghiệm khách hàng đặt lên hàng đầu.' },
  { title: 'Sáng tạo', description: 'Mỗi thiết kế là một ngôn ngữ thị giác riêng.' },
  { title: 'Tận tâm', description: 'Đặt trái tim vào từng bó hoa, từng thiết kế.' },
  { title: 'Bền vững', description: 'Sử dụng nguồn hoa tươi chất lượng, thân thiện với môi trường.' },
]

export default async function AboutPage() {
  const [about, whyItems, s, navPages] = await Promise.all([
    getAboutPage(), getWhySection(), getSiteSettings(), getNavPages(),
  ])
  const introParagraphs = s?.aboutIntro?.length > 0 ? s.aboutIntro : defaultIntro
  const founderQuote = s?.founderQuote?.length > 0 ? s.founderQuote : defaultQuote
  const founderRole = s?.founderRole || 'Founder of Akina Florist'
  const coreValues = s?.coreValues?.length > 0 ? s.coreValues : defaultValues
  const vs = s?.valuesSection || {}

  return (
    <>
      <PreHeader data={{ text: s?.preHeaderText, linkText: s?.preHeaderLinkText, linkUrl: s?.preHeaderLinkUrl }} />
      <Header siteName={s?.siteName} navLabels={s?.navLabels} navPages={navPages} />
      <main>
        <section className={styles.hero}>
          {about?.heroImageUrl
            ? <Image src={about.heroImageUrl} alt={s?.siteName || 'Akina Florist'} fill style={{ objectFit: 'cover' }} priority sizes="100vw" />
            : <div className={styles.heroBg} />}
          <div className={styles.heroOverlay} />
        </section>
        <section className={styles.intro}>
          <div className="container">
            <div className={styles.introGrid}>
              <div className={styles.introLogo}><div className={styles.logoText}>{s?.siteName || 'AKINA FLORIST'}</div></div>
              <div className={styles.introText}>{introParagraphs.map((p, i) => <p key={i}>{p}</p>)}</div>
            </div>
          </div>
        </section>
        <section className={styles.founder}>
          <div className="container">
            <div className={styles.founderGrid}>
              <div className={styles.founderImg}>
                {about?.founderImageUrl
                  ? <Image src={about.founderImageUrl} alt={about.founderName || 'Founder'} fill style={{ objectFit: 'cover' }} sizes="50vw" />
                  : <div className={styles.founderImgPlaceholder} />}
              </div>
              <div className={styles.founderInfo}>
                <div className={styles.founderRole}>{founderRole}</div>
                <div className={styles.founderQuote}>{founderQuote.map((p, i) => <p key={i}>{p}</p>)}</div>
                <div className={styles.founderName}>{about?.founderName || ''}</div>
              </div>
            </div>
          </div>
        </section>
        <WhySection items={whyItems || []} s={s} />
        <section className={styles.values}>
          <div className="container">
            <div className={styles.valuesHead}>
              <div className="title-2" style={{ color: '#577057', opacity: 0.7, marginBottom: '0.25rem' }}>{vs.eyebrow || 'Giá trị'}</div>
              <h2 className="display-3">{vs.heading || 'Cốt Lõi'}</h2>
            </div>
            <div className={styles.valuesGrid}>
              {coreValues.map((v, i) => (
                <div key={i} className={styles.valueCard}>
                  <div className={styles.valueNum}>{String(i + 1).padStart(2, '0')}</div>
                  <h3 className={styles.valueTitle}>{v.title}</h3>
                  <p className={styles.valueDesc}>{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer data={{ hotline: s?.hotline, siteName: s?.siteName, copyright: s?.copyright, facebook: s?.facebook, instagram: s?.instagram, tiktok: s?.tiktok, zaloUrl: s?.zaloUrl, messengerUrl: s?.messengerUrl, stores: s?.stores || [], footerLinks: s?.footerLinks || {}, mobileNavLabels: s?.mobileNavLabels || {} }} />
    </>
  )
}
