import PreHeader from '@/components/PreHeader'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getProjects, getSiteSettings, getNavPages } from '@/lib/queries'
import Image from 'next/image'
import styles from './page.module.css'

export const revalidate = 60

export async function generateMetadata() {
  const s = await getSiteSettings()
  return { title: s?.navLabels?.project || 'Dự án', description: s?.seoDescription || '' }
}

export default async function DuAnPage() {
  const [projects, s, navPages] = await Promise.all([getProjects(), getSiteSettings(), getNavPages()])
  const pp = s?.projectPage || {}

  return (
    <>
      <PreHeader s={s} />
      <Header s={s} navPages={navPages} />
      <main>
        <div className={styles.hero}>
          <div className={styles.heroBg} /><div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <div className="title-2" style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '0.5rem' }}>{pp.heroEyebrow || 'Sự Kiện'}</div>
            <h1 className="display-3" style={{ color: '#fff' }}>{pp.heroTitle || 'ẤN TƯỢNG HƠN'}</h1>
            {pp.heroDesc && <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, letterSpacing: '0.15em', marginTop: '0.5rem' }}>{pp.heroDesc}</p>}
          </div>
        </div>
        <section className={styles.projects}>
          <div className="container">
            {projects?.length > 0 ? (
              <div className={styles.grid}>
                {projects.map((p, i) => (
                  <a key={p._id} href={`/du-an/${p.slug}`} className={`${styles.card} ${i === 0 ? styles.cardFeatured : ''}`}>
                    <div className={styles.cardImg}>
                      {p.cover
                        ? <Image src={p.cover} alt={p.title} fill style={{ objectFit: 'cover', transition: 'transform 0.6s' }} sizes="(max-width:768px) 100vw, 50vw" />
                        : <div style={{ background: '#e8ddd5', width: '100%', height: '100%' }} />}
                      <div className={styles.cardOverlay} />
                    </div>
                    <div className={styles.cardInfo}>
                      {p.category && <div className={styles.cardCat}>{p.category}</div>}
                      <h2 className={styles.cardTitle}>{p.title}</h2>
                      {p.client && <div className={styles.cardClient}>{p.client}</div>}
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className={styles.empty}>
                <h2 className="display-3">{pp.comingSoon || 'Sắp ra mắt'}</h2>
                <p>{pp.comingSoonSub || 'Các dự án đang được cập nhật.'}</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer data={{ hotline: s?.hotline, siteName: s?.siteName, copyright: s?.copyright, facebook: s?.facebook, instagram: s?.instagram, tiktok: s?.tiktok, zaloUrl: s?.zaloUrl, messengerUrl: s?.messengerUrl, stores: s?.stores || [], footerLinks: s?.footerLinks || {}, mobileNavLabels: s?.mobileNavLabels || {} }} />
    </>
  )
}
