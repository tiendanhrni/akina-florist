import PreHeader from '@/components/PreHeader'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import { getProductsByCategory, getCategories, getSiteSettings, getNavPages } from '@/lib/queries'
import styles from './page.module.css'

export const dynamicParams = true
export const revalidate = 60

export async function generateStaticParams() {
  const categories = await getCategories()
  return (categories || []).map(cat => ({ category: cat.slug?.current || cat.slug }))
}

export async function generateMetadata({ params }) {
  const { category } = await params
  const [categories, s] = await Promise.all([getCategories(), getSiteSettings()])
  const cat = (categories || []).find(c => (c.slug?.current || c.slug) === category)
  return {
    title: `${cat?.title || 'Sản phẩm'} - ${s?.siteName || 'Akina Florist'}`,
    description: cat?.description || s?.seoDescription || '',
  }
}

export default async function CategoryPage({ params }) {
  const { category } = await params
  const [products, categories, s, navPages] = await Promise.all([
    getProductsByCategory(category),
    getCategories(),
    getSiteSettings(),
    getNavPages(),
  ])
  const cat = (categories || []).find(c => (c.slug?.current || c.slug) === category)
  const cp = s?.categoryPage || {}

  return (
    <>
      <PreHeader data={{ text: s?.preHeaderText, linkText: s?.preHeaderLinkText, linkUrl: s?.preHeaderLinkUrl }} />
      <Header siteName={s?.siteName} navLabels={s?.navLabels} navPages={navPages} />
      <main>
        <div className={styles.hero}>
          <div className={styles.overlay} />
          <div className={styles.content}>
            <h1 className="display-4" style={{ color: '#fff' }}>{cat?.title || 'Sản phẩm'}</h1>
            {cat?.description && <p className={styles.desc}>{cat.description}</p>}
          </div>
        </div>
        <nav className={styles.catNav}>
          <div className="container">
            <div className={styles.catNavInner}>
              {(categories || []).map(c => (
                <a key={c._id} href={`/san-pham/${c.slug?.current || c.slug}`}
                  className={`${styles.catTab} ${(c.slug?.current || c.slug) === category ? styles.active : ''}`}>
                  {c.title}
                </a>
              ))}
            </div>
          </div>
        </nav>
        <section className={styles.section}>
          <div className="container">
            {products?.length > 0 ? (
              <div className={styles.grid}>
                {products.map(p => <ProductCard key={p._id} product={p} />)}
              </div>
            ) : (
              <div className={styles.empty}>
                <p>{cp.emptyText || 'Chưa có sản phẩm trong danh mục này.'}</p>
                <p>{cp.emptySubtext || 'Vui lòng quay lại sau hoặc khám phá các danh mục khác.'}</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer data={{ hotline: s?.hotline, siteName: s?.siteName, copyright: s?.copyright, facebook: s?.facebook, instagram: s?.instagram, tiktok: s?.tiktok, zaloUrl: s?.zaloUrl, messengerUrl: s?.messengerUrl, stores: s?.stores || [], footerLinks: s?.footerLinks || {}, mobileNavLabels: s?.mobileNavLabels || {} }} />
    </>
  )
}
