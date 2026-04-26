import PreHeader from '@/components/PreHeader'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HeroBanner from '@/components/HeroBanner'
import CategorySlider from '@/components/CategorySlider'
import StorySection from '@/components/StorySection'
import WhySection from '@/components/WhySection'
import BrandsSection from '@/components/BrandsSection'
import GallerySection from '@/components/GallerySection'
import { getBanners, getCategories, getWhySection, getBrands, getGallery, getSiteSettings, getNavPages } from '@/lib/queries'

export const revalidate = 60

export default async function Home() {
  const [banners, categories, whyItems, brands, gallery, s, navPages] = await Promise.all([
    getBanners(), getCategories(), getWhySection(), getBrands(), getGallery(), getSiteSettings(), getNavPages(),
  ])

  const videoSrc = s?.homeVideo?.videoUrl || '/images/home/video-akinaflorist.mp4'
  const posterSrc = s?.homeVideo?.posterImage || undefined

  // Chỉ truyền primitive values vào components
  const preHeaderData = {
    text: s?.preHeaderText || 'Miễn phí giao hàng nội thành HCM',
    linkText: s?.preHeaderLinkText || 'XEM THÊM',
    linkUrl: s?.preHeaderLinkUrl || '/chinh-sach',
  }

  const storyData = {
    heading: s?.storyHeading || 'Câu chuyện',
    subheading: s?.storySubheading || 'Akina gửi đến bạn',
    paragraphs: s?.storyParagraphs || [],
  }

  const whyTitle = s?.whySectionTitle || 'Vì sao Akina được yêu thích?'

  const footerData = {
    hotline: s?.hotline || '0933 486 388',
    siteName: s?.siteName || 'AKINA FLORIST',
    copyright: s?.copyright || '©AKINA FLORIST 2025. ALL RIGHT RESERVED.',
    facebook: s?.facebook || '',
    instagram: s?.instagram || '',
    tiktok: s?.tiktok || '',
    zaloUrl: s?.zaloUrl || '',
    messengerUrl: s?.messengerUrl || '',
    stores: (s?.stores || []).map(st => ({ address: st.address || '', mapUrl: st.mapUrl || '' })),
    footerLinks: s?.footerLinks || {},
    mobileNavLabels: s?.mobileNavLabels || {},
  }

  return (
    <>
      <PreHeader data={preHeaderData} />
      <Header s={s} navPages={navPages} />
      <main>
        <h1 className="sr-only">{s?.seoTitle || 'Câu chuyện của hoa & lá - Akina Florist'}</h1>
        <HeroBanner banners={banners || []} />
        <CategorySlider categories={categories || []} />
        <section style={{ width: '100vw', height: '100vh', overflow: 'hidden', background: '#111', position: 'relative' }}>
          <video autoPlay muted loop playsInline preload="metadata" poster={posterSrc}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}>
            <source src={videoSrc} type="video/mp4" />
          </video>
        </section>
        <StorySection data={storyData} />
        <WhySection items={whyItems || []} title={whyTitle} />
        <BrandsSection brands={brands || []} />
        <GallerySection gallery={gallery || []} />
      </main>
      <Footer data={footerData} />
    </>
  )
}
