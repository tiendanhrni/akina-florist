import PreHeader from '@/components/PreHeader'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhySection from '@/components/WhySection'
import { getAboutPage, getWhySection } from '@/lib/queries'
import styles from './page.module.css'
import Image from 'next/image'

export const metadata = {
  title: 'Về Akina Florist - Câu chuyện thương hiệu',
  description: 'Akina Florist được lấy cảm hứng từ hoa. Chúng tôi tin rằng mỗi bó hoa là một tác phẩm nghệ thuật độc đáo.',
}

export default async function AboutPage() {
  const [about, whyItems] = await Promise.all([
    getAboutPage(),
    getWhySection(),
  ])

  return (
    <>
      <PreHeader />
      <Header />
      <main>
        {/* Hero */}
        <section className={styles.hero}>
          {about?.heroImageUrl ? (
            <Image src={about.heroImageUrl} alt="Akina Florist" fill style={{ objectFit: 'cover' }} priority sizes="100vw" />
          ) : (
            <div className={styles.heroBg} />
          )}
          <div className={styles.heroOverlay} />
        </section>

        {/* Intro */}
        <section className={styles.intro}>
          <div className="container">
            <div className={styles.introGrid}>
              <div className={styles.introLogo}>
                <div className={styles.logoText}>AKINA FLORIST</div>
              </div>
              <div className={styles.introText}>
                <p>Akina được lấy cảm hứng từ hoa sen trong tiếng Nhật, là điểm đến dành riêng cho bạn và những loài hoa.</p>
                <p>Với Akina Florist, hoa không chỉ là hoa, mà còn là ngôn ngữ của cảm xúc. Chúng tôi sử dụng màu sắc, hình dáng và hương thơm của hoa để tạo nên những tác phẩm nghệ thuật độc đáo. Mỗi thiết kế của chúng tôi đều là một câu chuyện, một cảm xúc được gửi gắm.</p>
                <p>Akina Florist mong muốn được biến những khoảnh khắc của cuộc sống, hay không gian sống và làm việc của bạn trở nên đặc biệt và ấn tượng hơn.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Founder */}
        <section className={styles.founder}>
          <div className="container">
            <div className={styles.founderGrid}>
              <div className={styles.founderImg}>
                {about?.founderImageUrl ? (
                  <Image src={about.founderImageUrl} alt={about.founderName || 'Founder'} fill style={{ objectFit: 'cover' }} sizes="50vw" />
                ) : (
                  <div className={styles.founderImgPlaceholder} />
                )}
              </div>
              <div className={styles.founderInfo}>
                <div className={styles.founderRole}>Founder of Akina Florist</div>
                <div className={styles.founderQuote}>
                  <p>Tôi luôn tin rằng, hoa có khả năng làm cho cuộc sống của chúng ta trở nên tươi đẹp hơn. Với Akina Florist, tôi muốn truyền cảm hứng cho mọi người yêu hoa hơn, trân trọng những vẻ đẹp nhỏ bé trong cuộc sống.</p>
                  <p>Mỗi ngày, tôi đều tìm kiếm những nguồn cảm hứng mới từ thiên nhiên, nghệ thuật và cuộc sống xung quanh. Tôi mong muốn mỗi thiết kế của mình đều mang đến một câu chuyện, một thông điệp ý nghĩa.</p>
                </div>
                <div className={styles.founderName}>{about?.founderName || 'Founder'}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Why */}
        <WhySection items={whyItems || []} />

        {/* Core Values */}
        <section className={styles.values}>
          <div className="container">
            <div className={styles.valuesHead}>
              <div className="title-2" style={{ color: '#577057', opacity: 0.7, marginBottom: '0.25rem' }}>Giá trị</div>
              <h2 className="display-3">Cốt Lõi</h2>
            </div>
            <div className={styles.valuesGrid}>
              {[
                { num: 1, title: 'Chuyên nghiệp', desc: 'Akina theo đuổi chuẩn mực cao trong nghệ thuật cắm hoa và dịch vụ, nơi kỹ thuật, thẩm mỹ và trải nghiệm khách hàng được đặt lên vị trí hàng đầu.' },
                { num: 2, title: 'Sáng tạo', desc: 'Mỗi thiết kế tại Akina là một ngôn ngữ thị giác riêng, được hình thành từ quá trình học hỏi, nghiên cứu, cảm xúc và sáng tạo không ngừng.' },
                { num: 3, title: 'Tận tâm', desc: 'Chúng tôi đặt trái tim vào từng bó hoa, từng thiết kế — để mỗi sản phẩm không chỉ đẹp mắt mà còn chứa đựng tình cảm chân thành.' },
                { num: 4, title: 'Bền vững', desc: 'Akina cam kết sử dụng nguồn hoa tươi chất lượng, thân thiện với môi trường và hỗ trợ người trồng hoa địa phương.' },
              ].map(v => (
                <div key={v.num} className={styles.valueCard}>
                  <div className={styles.valueNum}>{String(v.num).padStart(2, '0')}</div>
                  <h3 className={styles.valueTitle}>{v.title}</h3>
                  <p className={styles.valueDesc}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
