import PreHeader from '@/components/PreHeader'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getSanityData } from '@/lib/sanity'
import Image from 'next/image'
import styles from './page.module.css'

export const revalidate = 60

export const metadata = {
  title: 'Workshop & Academy - Akina Florist',
  description: 'Tham gia các khóa học cắm hoa tại Akina Florist. Khám phá khả năng sáng tạo của bản thân.',
}

async function getWorkshops() {
  return getSanityData(`*[_type == "workshop"] | order(_createdAt desc) {
    _id, title, description, duration, price, schedule, maxStudents,
    "slug": slug.current,
    "image": image.asset->url
  }`)
}

export default async function WorkshopPage() {
  const workshops = await getWorkshops()

  return (
    <>
      <PreHeader />
      <Header />
      <main>
        <div className={styles.hero}>
          <div className={styles.heroBg} />
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <div className="title-2" style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '1rem' }}>Sản phẩm</div>
            <h1 className="display-3" style={{ color: '#fff' }}>Học Viên</h1>
          </div>
        </div>

        <section className={styles.intro}>
          <div className="container">
            <p>Tham gia workshop cắm hoa tại Akina Florist để khám phá khả năng sáng tạo của bản thân và mang về những bó hoa độc đáo, đồng thời kết nối với những người có cùng đam mê.</p>
          </div>
        </section>

        <section className={styles.workshops}>
          <div className="container">
            {workshops && workshops.length > 0 ? (
              <div className={styles.grid}>
                {workshops.map(w => (
                  <div key={w._id} className={styles.card}>
                    <div className={styles.cardImg}>
                      {w.image ? (
                        <Image src={w.image} alt={w.title} fill style={{ objectFit: 'cover', transition: 'transform 0.5s' }} sizes="600px" />
                      ) : (
                        <div style={{ background: '#d5e0d8', width: '100%', height: '100%' }} />
                      )}
                    </div>
                    <div className={styles.cardInfo}>
                      <div className="title-2" style={{ color: '#577057', marginBottom: '0.5rem' }}>THÔNG TIN VỀ KHÓA HỌC</div>
                      <h2 className={styles.cardTitle}>{w.title}</h2>
                      <div className={styles.meta}>
                        {w.duration && <div><span>Thời lượng:</span> {w.duration}</div>}
                        {w.schedule && <div><span>Lịch học:</span> {w.schedule}</div>}
                        {w.maxStudents && <div><span>Số lượng:</span> {w.maxStudents} học viên</div>}
                        {w.price && <div><span>Học phí:</span> {new Intl.NumberFormat('vi-VN').format(w.price)} VND</div>}
                      </div>
                      <a href="tel:0933486388" className="btn-green" style={{ display: 'inline-block', marginTop: '1.5rem' }}>
                        Đăng ký ngay
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.empty}>
                <h2 className="display-3">Sắp ra mắt</h2>
                <p>Các khóa học mới đang được chuẩn bị. Liên hệ với chúng tôi để được thông báo sớm nhất.</p>
                <a href="tel:0933486388" className="btn-outline" style={{ display: 'inline-block', marginTop: '2rem' }}>
                  Liên hệ ngay
                </a>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
