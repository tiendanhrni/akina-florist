import PreHeader from '@/components/PreHeader'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BlockRenderer from '@/components/BlockRenderer'
import { getPage, getPageSlugs, getSiteSettings, getBestSellers } from '@/lib/queries'

export const revalidate = 60
export const dynamicParams = true

export async function generateStaticParams() {
  const slugs = await getPageSlugs()
  return (slugs || []).map(s => ({ slug: s.slug?.current || s.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const [page, s] = await Promise.all([getPage(slug), getSiteSettings()])
  return {
    title: page?.seoTitle || page?.title || 'Trang',
    description: page?.seoDescription || s?.seoDescription || '',
    openGraph: {
      title: page?.seoTitle || page?.title,
      images: page?.ogImage ? [{ url: page.ogImage }] : [],
    },
  }
}

export default async function CustomPage({ params }) {
  const { slug } = await params
  const [page, s] = await Promise.all([getPage(slug), getSiteSettings()])

  if (!page || !page.isPublished) {
    return (
      <>
        <PreHeader data={{ text: s?.preHeaderText, linkText: s?.preHeaderLinkText, linkUrl: s?.preHeaderLinkUrl }} /><Header />
        <main style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem', textAlign: 'center', padding: '4rem 2rem' }}>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 120, fontWeight: 300, opacity: 0.06, lineHeight: 1 }}>404</div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 300, marginTop: '-2rem' }}>Trang không tồn tại</h1>
          <a href="/" className="btn-outline" style={{ marginTop: '1rem' }}>Về trang chủ</a>
        </main>
        <Footer data={{ hotline: s?.hotline, siteName: s?.siteName, copyright: s?.copyright, facebook: s?.facebook, instagram: s?.instagram, tiktok: s?.tiktok, zaloUrl: s?.zaloUrl, messengerUrl: s?.messengerUrl, stores: s?.stores || [], footerLinks: s?.footerLinks || {}, mobileNavLabels: s?.mobileNavLabels || {} }} />
      </>
    )
  }

  // Lấy products nếu có block sản phẩm
  const hasProductsBlock = page.blocks?.some(b => b._type === 'productsBlock')
  const products = hasProductsBlock ? await getBestSellers() : []

  return (
    <>
      <PreHeader data={{ text: s?.preHeaderText, linkText: s?.preHeaderLinkText, linkUrl: s?.preHeaderLinkUrl }} />
      <Header />
      <main>
        <BlockRenderer blocks={page.blocks} siteSettings={{}} products={products} />
      </main>
      <Footer data={{ hotline: s?.hotline, siteName: s?.siteName, copyright: s?.copyright, facebook: s?.facebook, instagram: s?.instagram, tiktok: s?.tiktok, zaloUrl: s?.zaloUrl, messengerUrl: s?.messengerUrl, stores: s?.stores || [], footerLinks: s?.footerLinks || {}, mobileNavLabels: s?.mobileNavLabels || {} }} />
    </>
  )
}
