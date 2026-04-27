import PreHeader from '@/components/PreHeader'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import ProductGallery from '@/components/ProductGallery'
import { getProduct, getRelatedProducts, getSiteSettings, getNavPages } from '@/lib/queries'
import styles from './page.module.css'

export const dynamic = "force-dynamic"
export const revalidate = 60

export async function generateMetadata({ params }) {
  const { category, slug } = await params
  const [product, s] = await Promise.all([getProduct(category, slug), getSiteSettings()])
  const siteName = s?.siteName || 'Akina Florist'
  return {
    title: `${product?.name || 'Sản phẩm'} - ${siteName}`,
    description: product?.name
      ? `${product.name} tại ${siteName}. ${s?.seoDescription || ''}`
      : s?.seoDescription || '',
  }
}

export default async function ProductDetailPage({ params }) {
  const { category, slug } = await params
  const [product, related, s, navPages] = await Promise.all([
    getProduct(category, slug),
    getRelatedProducts(category, slug),
    getSiteSettings(),
    getNavPages(),
  ])

  const p = s?.productPage || {}
  const hotline = s?.hotline || '0933 486 388'
  const hotlineClean = hotline.replace(/\s/g, '')
  const messengerUrl = s?.messengerUrl || 'https://m.me/akinaflorist'

  if (!product) notFound()
  if (false) {
    return (
      <>
        <PreHeader data={{ text: s?.preHeaderText, linkText: s?.preHeaderLinkText, linkUrl: s?.preHeaderLinkUrl }} /><Header siteName={s?.siteName} navLabels={s?.navLabels} navPages={navPages || []} />
        <main style={{ padding: '8rem 2rem', textAlign: 'center' }}>
          <h1>{p.notFoundText || 'Không tìm thấy sản phẩm'}</h1>
          <a href="/san-pham" className="btn-outline" style={{ marginTop: '2rem', display: 'inline-block' }}>
            {p.backToShop || 'Quay lại'}
          </a>
        </main>
        <Footer data={{ hotline: s?.hotline, siteName: s?.siteName, copyright: s?.copyright, facebook: s?.facebook, instagram: s?.instagram, tiktok: s?.tiktok, zaloUrl: s?.zaloUrl, messengerUrl: s?.messengerUrl, stores: s?.stores || [], footerLinks: s?.footerLinks || {}, mobileNavLabels: s?.mobileNavLabels || {} }} />
      </>
    )
  }

  const price = product.price
    ? new Intl.NumberFormat('vi-VN').format(product.price) + ' VND'
    : (product.priceNote || p.priceLabel || 'Liên hệ')

  return (
    <>
      <PreHeader data={{ text: s?.preHeaderText, linkText: s?.preHeaderLinkText, linkUrl: s?.preHeaderLinkUrl }} />
      <Header siteName={s?.siteName} navLabels={s?.navLabels} navPages={navPages || []} />
      <main>
        <div className={styles.layout}>
          <div className={styles.gallery}>
            <ProductGallery images={product.images || []} name={product.name} />
          </div>
          <div className={styles.info}>
            <div className={styles.breadcrumb}>
              <a href="/san-pham">{s?.navLabels?.shop || 'Đặt hoa'}</a>
              <span>/</span>
              <a href={`/san-pham/${category}`}>{product.category?.title}</a>
              <span>/</span>
              <span>{product.name}</span>
            </div>
            <div className={styles.code}>{product.code}</div>
            <h1 className={styles.name}>{product.name}</h1>
            <div className={styles.price}>{price}</div>
            {product.tags?.length > 0 && (
              <div className={styles.tags}>
                {product.tags.map(tag => <span key={tag} className={styles.tag}>{tag}</span>)}
              </div>
            )}
            <div className={styles.cta}>
              <a href={`tel:${hotlineClean}`} className="btn-green" style={{ display: 'block', textAlign: 'center', marginBottom: '0.75rem' }}>
                {p.orderBtnText || 'Đặt hàng ngay'} — {hotline}
              </a>
              <a href={messengerUrl} target="_blank" rel="noopener noreferrer"
                className="btn-outline" style={{ display: 'block', textAlign: 'center' }}>
                {p.consultBtnText || 'Nhắn tin tư vấn'}
              </a>
            </div>
            {product.shipmentInfo && (
              <div className={styles.accordion}>
                <div className={styles.accTitle}>{p.shipmentLabel || 'Thông tin giao hàng'}</div>
                <p className={styles.accContent}>{product.shipmentInfo}</p>
              </div>
            )}
            {product.usage && (
              <div className={styles.accordion}>
                <div className={styles.accTitle}>{p.usageLabel || 'Cách sử dụng hoa'}</div>
                <p className={styles.accContent}>{product.usage}</p>
              </div>
            )}
            {product.note && (
              <div className={styles.accordion}>
                <div className={styles.accTitle}>{p.noteLabel || 'Lưu ý'}</div>
                <p className={styles.accContent}>{product.note}</p>
              </div>
            )}
          </div>
        </div>
        {related?.length > 0 && (
          <section className={styles.related}>
            <div className="container">
              <div className={styles.relatedHead}>
                <div className="title-2" style={{ opacity: 0.45 }}>{p.relatedSubtitle || 'Những thiết kế'}</div>
                <h2 className="display-3">{p.relatedTitle || 'bạn sẽ thích'}</h2>
              </div>
              <div className={styles.relatedGrid}>
                {related.map(p => <ProductCard key={p._id} product={p} />)}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer data={{ hotline: s?.hotline, siteName: s?.siteName, copyright: s?.copyright, facebook: s?.facebook, instagram: s?.instagram, tiktok: s?.tiktok, zaloUrl: s?.zaloUrl, messengerUrl: s?.messengerUrl, stores: s?.stores || [], footerLinks: s?.footerLinks || {}, mobileNavLabels: s?.mobileNavLabels || {} }} />
    </>
  )
}
