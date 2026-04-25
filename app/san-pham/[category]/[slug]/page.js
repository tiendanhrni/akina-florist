import PreHeader from '@/components/PreHeader'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import ProductGallery from '@/components/ProductGallery'
import { getProduct, getRelatedProducts } from '@/lib/queries'
import styles from './page.module.css'

export async function generateMetadata({ params }) {
  const product = await getProduct(params.category, params.slug)
  return {
    title: `${product?.name || 'Sản phẩm'} - Akina Florist`,
    description: product?.name ? `${product.name} tại Akina Florist. Giao hàng nhanh trong 2 giờ nội thành HCM.` : '',
  }
}

export default async function ProductDetailPage({ params }) {
  const [product, related] = await Promise.all([
    getProduct(params.category, params.slug),
    getRelatedProducts(params.category, params.slug),
  ])

  if (!product) {
    return (
      <>
        <PreHeader />
        <Header />
        <main style={{ padding: '8rem 2rem', textAlign: 'center' }}>
          <h1>Không tìm thấy sản phẩm</h1>
          <a href="/san-pham" className="btn-outline" style={{ marginTop: '2rem', display: 'inline-block' }}>Quay lại</a>
        </main>
        <Footer />
      </>
    )
  }

  const price = product.price
    ? new Intl.NumberFormat('vi-VN').format(product.price) + ' VND'
    : (product.priceNote || 'Liên hệ')

  return (
    <>
      <PreHeader />
      <Header />
      <main>
        <div className={styles.layout}>
          {/* Gallery */}
          <div className={styles.gallery}>
            <ProductGallery images={product.images || []} name={product.name} />
          </div>

          {/* Info */}
          <div className={styles.info}>
            <div className={styles.breadcrumb}>
              <a href="/san-pham">Đặt hoa</a>
              <span>/</span>
              <a href={`/san-pham/${params.category}`}>{product.category?.title}</a>
              <span>/</span>
              <span>{product.name}</span>
            </div>

            <div className={styles.code}>{product.code}</div>
            <h1 className={styles.name}>{product.name}</h1>
            <div className={styles.price}>{price}</div>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className={styles.tags}>
                {product.tags.map(tag => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
            )}

            {/* CTA */}
            <div className={styles.cta}>
              <a href="tel:0933486388" className="btn-green" style={{ display: 'block', textAlign: 'center', marginBottom: '0.75rem' }}>
                Đặt hàng ngay — 0933 486 388
              </a>
              <a href="https://m.me/akinaflorist" target="_blank" rel="noopener noreferrer"
                className="btn-outline" style={{ display: 'block', textAlign: 'center' }}>
                Nhắn tin tư vấn
              </a>
            </div>

            {/* Accordion */}
            {product.shipmentInfo && (
              <div className={styles.accordion}>
                <div className={styles.accTitle}>Thông tin giao hàng</div>
                <p className={styles.accContent}>{product.shipmentInfo}</p>
              </div>
            )}
            {product.usage && (
              <div className={styles.accordion}>
                <div className={styles.accTitle}>Cách sử dụng hoa nhà Akina</div>
                <p className={styles.accContent}>{product.usage}</p>
              </div>
            )}
            {product.note && (
              <div className={styles.accordion}>
                <div className={styles.accTitle}>Lưu ý</div>
                <p className={styles.accContent}>{product.note}</p>
              </div>
            )}
          </div>
        </div>

        {/* Related */}
        {related && related.length > 0 && (
          <section className={styles.related}>
            <div className="container">
              <div className={styles.relatedHead}>
                <div className="title-2" style={{ opacity: 0.45 }}>Những thiết kế</div>
                <h2 className="display-3">bạn sẽ thích</h2>
              </div>
              <div className={styles.relatedGrid}>
                {related.map(p => <ProductCard key={p._id} product={p} />)}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
