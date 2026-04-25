import PreHeader from '@/components/PreHeader'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getWorkshops, getSiteSettings, getNavPages } from '@/lib/queries'
import Image from 'next/image'
import styles from './page.module.css'

export const revalidate = 60

export async function generateMetadata() {
  const s = await getSiteSettings()
  return { title: s?.navLabels?.workshop || 'Workshop & Academy', description: s?.workshopIntro || s?.seoDescription || '' }
}

export default async function WorkshopPage() {
  const [workshops, s, navPages] = await Promise.all([getWorkshops(), getSiteSettings(), getNavPages()])
  const wp = s?.workshopPage || {}
  const hotline = s?.hotline || '0933 486 388'

  return (
    <>
      <PreHeader s={s} />
      <Header s={s} navPages={navPages} />
      <main>
        <div className={styles.hero}>
          <div className={styles.heroBg} /><div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <div className="title-2" style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '1rem' }}>{wp.heroEyebrow || 'Sản phẩm'}</div>
            <h1 className="display-3" style={{ color: '#fff' }}>{wp.heroTitle || 'Học Viên'}</h1>
          </div>
        </div>
        {s?.workshopIntro && (
          <section className={styles.intro}><div className="container"><p>{s.workshopIntro}</p></div></section>
        )}
        <section className={styles.workshops}>
          <div className="container">
            {workshops?.length > 0 ? (
              <div className={styles.grid}>
                {workshops.map(w => (
                  <div key={w._id} className={styles.card}>
                    <div className={styles.cardImg}>
                      {w.image
                        ? <Image src={w.image} alt={w.title} fill style={{ objectFit: 'cover', transition: 'transform 0.5s' }} sizes="600px" />
                        : <div style={{ background: '#d5e0d8', width: '100%', height: '100%' }} />}
                    </div>
                    <div className={styles.cardInfo}>
                      <div className="title-2" style={{ color: '#577057', marginBottom: '0.5rem' }}>{wp.infoLabel || 'THÔNG TIN KHÓA HỌC'}</div>
                      <h2 className={styles.cardTitle}>{w.title}</h2>
                      <div className={styles.meta}>
                        {w.duration    && <div><span>{wp.durationLabel || 'Thời lượng:'}</span> {w.duration}</div>}
                        {w.schedule    && <div><span>{wp.scheduleLabel || 'Lịch học:'}</span> {w.schedule}</div>}
                        {w.maxStudents && <div><span>{wp.studentsLabel || 'Số lượng:'}</span> {w.maxStudents} học viên</div>}
                        {w.price       && <div><span>{wp.priceLabel || 'Học phí:'}</span> {new Intl.NumberFormat('vi-VN').format(w.price)} VND</div>}
                      </div>
                      <a href={`tel:${hotline.replace(/\s/g, '')}`} className="btn-green" style={{ display: 'inline-block', marginTop: '1.5rem' }}>
                        {wp.registerBtn || 'Đăng ký ngay'}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.empty}>
                <h2 className="display-3">{wp.comingSoon || 'Sắp ra mắt'}</h2>
                <p>{wp.comingSoonSub || 'Các khóa học mới đang được chuẩn bị.'}</p>
                <a href={`tel:${hotline.replace(/\s/g, '')}`} className="btn-outline" style={{ display: 'inline-block', marginTop: '2rem' }}>
                  {wp.contactBtn || 'Liên hệ ngay'}
                </a>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer s={s} />
    </>
  )
}
