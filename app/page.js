import PreHeader from '@/components/PreHeader'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HeroBanner from '@/components/HeroBanner'
import CategorySlider from '@/components/CategorySlider'
import StorySection from '@/components/StorySection'
import WhySection from '@/components/WhySection'
import BrandsSection from '@/components/BrandsSection'
import GallerySection from '@/components/GallerySection'
import { getBanners, getCategories, getWhySection, getBrands, getGallery, getSiteSettings } from '@/lib/queries'

export const revalidate = 60

export default async function Home() {
  const [banners, categories, whyItems, brands, gallery, s] = await Promise.all([
    getBanners(), getCategories(), getWhySection(), getBrands(), getGallery(), getSiteSettings(),
  ])

  const videoSrc = s?.homeVideo?.videoFile || s?.homeVideo?.videoUrl || '/images/home/video-akinaflorist.mp4'
  const posterSrc = s?.homeVideo?.posterImage || undefined

  return (
    <>
      <PreHeader s={s} />
      <Header />
      <main>
        <h1 className="sr-only">{s?.seoTitle || 'Câu chuyện của hoa & lá - Akina Florist'}</h1>
        <HeroBanner banners={banners || []} />
        <CategorySlider categories={categories || []} />
        <section style={{ maxHeight: 'calc(100vh - 72px)', overflow: 'hidden', background: '#111', aspectRatio: '16/9' }}>
          <video autoPlay muted loop playsInline preload="metadata" poster={posterSrc}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
            <source src={videoSrc} type="video/mp4" />
          </video>
        </section>
        <StorySection s={s} />
        <WhySection items={whyItems || []} s={s} />
        <BrandsSection brands={brands || []} />
        <GallerySection gallery={gallery || []} />
      </main>
      <Footer s={s} />
    </>
  )
}
