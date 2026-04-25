import PreHeader from '@/components/PreHeader'
import Header from '@/components/Header'
import HeroBanner from '@/components/HeroBanner'
import CategorySlider from '@/components/CategorySlider'
import StorySection from '@/components/StorySection'
import WhySection from '@/components/WhySection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <PreHeader />
      <Header />
      <main>
        <h1 className="sr-only">Câu chuyện của hoa & lá - Ren Florist</h1>
        <HeroBanner />
        <CategorySlider />

        {/* Video thương hiệu */}
        <section style={{
          maxHeight: 'calc(100vh - 72px)',
          overflow: 'hidden',
          background: '#111',
          aspectRatio: '16/9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {/* Thay bằng video thật khi có */}
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          >
            <source src="/images/home/video-renflorist.mp4" type="video/mp4" />
          </video>
        </section>

        <StorySection />
        <WhySection />
      </main>
      <Footer />
    </>
  )
}
