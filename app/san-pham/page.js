import PreHeader from '@/components/PreHeader'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import { getCategories, getBestSellers, getSiteSettings, getNavPages } from '@/lib/queries'
import styles from './page.module.css'

export const revalidate = 60

export async function generateMetadata() {
  const s = await getSiteSettings()
  return {
    title: s?.navLabels?.shop || 'Đặt hoa',
    description: s?.shopPageIntro || s?.seoDescription || '',
  }
}

export default async function SanPhamPage() {
  const [categories, bestSellers, s, navPages] = await Promise.all([
    getCategories(), getBestSellers(), getSiteSettings(), getNavPages(),
  ])
  return (
    <>
      <PreHeader s={s} />
      <Header s={s} navPages={navPages} />
      <main>
        <div className={styles.hero}>
          <div className={styles.heroBg} />
          <div className={styles.heroContent}>
            <h1 className="display-4" style={{ color: '#fff' }}>{s?.shopPageTitle || 'Thiết kế'}</h1>
            <div className={styles.heroSub}>{s?.shopPageSubtitle || 'Độc bản'}</div>
          </div>
        </div>
        {s?.shopPageIntro && (
          <section className={styles.intro}>
            <div className="container"><p>{s.shopPageIntro}</p></div>
          </section>
        )}
        <section className={styles.categories}>
          <div className="container">
            <div className={styles.catGrid}>
              {(categories || []).map((cat, i) => (
                <a key={cat._id} href={`/san-pham/${cat.slug?.current || cat.slug}`} className={styles.catCard}>
                  <div className={styles.catImg} style={{ background: ['#c8b8a8','#b8c8b8','#c0b0c0','#c8c0b0','#b0c0c0','#c0b0b8'][i % 6] }} />
                  <div className={styles.catLabel}>
                    <div className={styles.catLabelBg} />
                    <span className={styles.catLabelText}>{cat.title}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
        {bestSellers?.length > 0 && (
          <section className={styles.products}>
            <div className="container">
              <div className={styles.sectionHead}>
                <div className="title-2" style={{ opacity: 0.45 }}>Nổi bật</div>
                <h2 className="display-3">Bán chạy</h2>
              </div>
              <div className={styles.grid}>
                {bestSellers.map(p => <ProductCard key={p._id} product={p} />)}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer s={s} />
    </>
  )
}
