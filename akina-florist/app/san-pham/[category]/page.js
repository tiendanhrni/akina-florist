import PreHeader from '@/components/PreHeader'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import { getProductsByCategory, getCategories } from '@/lib/queries'
import styles from './page.module.css'

export async function generateStaticParams() {
  const categories = await getCategories()
  return (categories || []).map(cat => ({
    category: cat.slug?.current || cat.slug
  }))
}

export async function generateMetadata({ params }) {
  const categories = await getCategories()
  const cat = (categories || []).find(c => (c.slug?.current || c.slug) === params.category)
  return {
    title: `${cat?.title || 'Sản phẩm'} - Akina Florist`,
    description: cat?.description || 'Khám phá các thiết kế hoa độc đáo tại Akina Florist.',
  }
}

export default async function CategoryPage({ params }) {
  const [products, categories] = await Promise.all([
    getProductsByCategory(params.category),
    getCategories(),
  ])

  const cat = (categories || []).find(c => (c.slug?.current || c.slug) === params.category)

  return (
    <>
      <PreHeader />
      <Header />
      <main>
        <div className={styles.hero}>
          <div className={styles.overlay} />
          <div className={styles.content}>
            <h1 className="display-4" style={{ color: '#fff' }}>{cat?.title || 'Sản phẩm'}</h1>
            {cat?.description && <p className={styles.desc}>{cat.description}</p>}
          </div>
        </div>

        {/* Category nav */}
        <nav className={styles.catNav}>
          <div className="container">
            <div className={styles.catNavInner}>
              {(categories || []).map(c => (
                <a key={c._id}
                  href={`/san-pham/${c.slug?.current || c.slug}`}
                  className={`${styles.catTab} ${(c.slug?.current || c.slug) === params.category ? styles.active : ''}`}>
                  {c.title}
                </a>
              ))}
            </div>
          </div>
        </nav>

        {/* Products grid */}
        <section className={styles.section}>
          <div className="container">
            {products && products.length > 0 ? (
              <div className={styles.grid}>
                {products.map(p => <ProductCard key={p._id} product={p} />)}
              </div>
            ) : (
              <div className={styles.empty}>
                <p>Chưa có sản phẩm trong danh mục này.</p>
                <p>Vui lòng quay lại sau hoặc khám phá các danh mục khác.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
