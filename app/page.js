import PreHeader from '@/components/PreHeader'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HeroBanner from '@/components/HeroBanner'
import CategorySlider from '@/components/CategorySlider'
import StorySection from '@/components/StorySection'
import WhySection from '@/components/WhySection'
import BrandsSection from '@/components/BrandsSection'
import GallerySection from '@/components/GallerySection'
import { getBanners, getCategories, getWhySection, getBrands, getGallery } from '@/lib/queries'

export default async function Home() {
  const [banners, categories, whyItems, brands, gallery] = await Promise.all([
    getBanners(),
    getCategories(),
    getWhySection(),
    getBrands(),
    getGallery(),
  ])

  return (
    <>
      <PreHeader />
      <Header />
      <main>
        <h1 className="sr-only">Câu chuyện của hoa & lá - Akina Florist</h1>
        <HeroBanner banners={banners || []} />
        <CategorySlider categories={categories || []} />
        <section style={{ maxHeight: 'calc(100vh - 72px)', overflow: 'hidden', background: '#111', aspectRatio: '16/9' }}>
          <video autoPlay muted loop playsInline preload="metadata" style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
            <source src="/images/home/video-akinaflorist.mp4" type="video/mp4" />
          </video>
        </section>
        <StorySection />
        <WhySection items={whyItems || []} />
        <BrandsSection brands={brands || []} />
        <GallerySection gallery={gallery || []} />
      </main>
      <Footer />
    </>
  )
}
