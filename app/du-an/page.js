import PreHeader from '@/components/PreHeader'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getSanityData } from '@/lib/sanity'
import Image from 'next/image'
import styles from './page.module.css'

export const metadata = {
  title: 'Dự án - Akina Florist',
  description: 'Khám phá các dự án trang trí hoa sự kiện của Akina Florist.',
}

async function getProjects() {
  return getSanityData(`*[_type == "project"] | order(date desc) {
    _id, title, client, category, date,
    "slug": slug.current,
    "cover": coverImage.asset->url
  }`)
}

export default async function DuAnPage() {
  const projects = await getProjects()

  return (
    <>
      <PreHeader />
      <Header />
      <main>
        <div className={styles.hero}>
          <div className={styles.heroBg} />
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <div className="title-2" style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '0.5rem' }}>Sự Kiện</div>
            <h1 className="display-3" style={{ color: '#fff' }}>ẤN TƯỢNG HƠN</h1>
            <p className={styles.heroDesc}>NHỜ NHỮNG BÔNG HOA TÔ ĐIỂM</p>
          </div>
        </div>

        <section className={styles.projects}>
          <div className="container">
            {projects && projects.length > 0 ? (
              <div className={styles.grid}>
                {projects.map((p, i) => (
                  <a key={p._id} href={`/du-an/${p.slug}`}
                    className={`${styles.card} ${i === 0 ? styles.cardFeatured : ''}`}>
                    <div className={styles.cardImg}>
                      {p.cover ? (
                        <Image src={p.cover} alt={p.title} fill
                          style={{ objectFit: 'cover', transition: 'transform 0.6s' }} sizes="(max-width:768px) 100vw, 50vw" />
                      ) : (
                        <div style={{ background: '#e8ddd5', width: '100%', height: '100%' }} />
                      )}
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
                <h2 className="display-3">Sắp ra mắt</h2>
                <p>Các dự án đang được cập nhật. Hãy theo dõi chúng tôi.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
