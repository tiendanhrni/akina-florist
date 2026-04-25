import PreHeader from '@/components/PreHeader'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getBlogs, getSiteSettings } from '@/lib/queries'
import Image from 'next/image'
import styles from './page.module.css'

export const revalidate = 60

export async function generateMetadata() {
  const s = await getSiteSettings()
  return {
    title: 'Blog',
    description: `Khám phá bài viết về hoa, nghệ thuật cắm hoa và câu chuyện từ ${s?.siteName || 'Akina Florist'}.`,
  }
}

const CATEGORIES = [
  { value: null, label: 'Tất cả' },
  { value: 'cam-hoa', label: '🌸 Nghệ thuật cắm hoa' },
  { value: 'y-nghia-hoa', label: '💐 Ý nghĩa các loài hoa' },
  { value: 'su-kien', label: '🎉 Trang trí sự kiện' },
  { value: 'cau-chuyen', label: '📖 Câu chuyện Akina' },
  { value: 'tips', label: '💡 Tips & Tricks' },
]

export default async function BlogPage() {
  const [blogs, s] = await Promise.all([getBlogs({ limit: 12 }), getSiteSettings()])

  return (
    <>
      <PreHeader s={s} />
      <Header />
      <main>
        {/* Hero */}
        <div className={styles.hero}>
          <div className={styles.heroContent}>
            <div className="title-2" style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '0.5rem' }}>Câu chuyện</div>
            <h1 className="display-3" style={{ color: '#fff' }}>Nhật ký hoa</h1>
          </div>
        </div>

        {/* Category filter */}
        <div className={styles.filter}>
          <div className="container">
            <div className={styles.filterInner}>
              {CATEGORIES.map(cat => (
                <a key={cat.value || 'all'} href={cat.value ? `/blog?cat=${cat.value}` : '/blog'}
                  className={styles.filterBtn}>
                  {cat.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Blog grid */}
        <section className={styles.section}>
          <div className="container">
            {blogs && blogs.length > 0 ? (
              <div className={styles.grid}>
                {blogs.map((post, i) => (
                  <a key={post._id} href={`/blog/${post.slug}`}
                    className={`${styles.card} ${i === 0 ? styles.cardFeatured : ''}`}>
                    <div className={styles.cardImg}>
                      {post.cover ? (
                        <Image src={post.cover} alt={post.title} fill
                          style={{ objectFit: 'cover', transition: 'transform 0.5s' }}
                          sizes="(max-width:768px) 100vw, 600px" />
                      ) : (
                        <div style={{ background: '#e8ddd5', width: '100%', height: '100%' }} />
                      )}
                      <div className={styles.cardOverlay} />
                    </div>
                    <div className={styles.cardInfo}>
                      {post.categories?.[0] && (
                        <div className={styles.cardCat}>
                          {CATEGORIES.find(c => c.value === post.categories[0])?.label || post.categories[0]}
                        </div>
                      )}
                      <h2 className={styles.cardTitle}>{post.title}</h2>
                      {post.excerpt && <p className={styles.cardExcerpt}>{post.excerpt}</p>}
                      <div className={styles.cardMeta}>
                        <span>{post.author || 'Akina Florist'}</span>
                        <span>·</span>
                        <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('vi-VN') : ''}</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className={styles.empty}>
                <h2 className="display-3">Sắp ra mắt</h2>
                <p>Các bài viết đang được chuẩn bị. Hãy quay lại sau!</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer s={s} />
    </>
  )
}
