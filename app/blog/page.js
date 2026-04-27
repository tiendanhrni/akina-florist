import PreHeader from '@/components/PreHeader'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getBlogs, getBlogCategories, getSiteSettings, getNavPages } from '@/lib/queries'
import Image from 'next/image'
import styles from './page.module.css'

export const revalidate = 60

export async function generateMetadata() {
  const s = await getSiteSettings()
  return { title: s?.navLabels?.blog || 'Blog', description: s?.blogPage?.heroEyebrow || s?.seoDescription || '' }
}

export default async function BlogPage() {
  const [blogs, blogCategories, s, navPages] = await Promise.all([getBlogs({ limit: 12 }), getBlogCategories(), getSiteSettings(), getNavPages()])
  const bp = s?.blogPage || {}

  return (
    <>
      <PreHeader data={{ text: s?.preHeaderText, linkText: s?.preHeaderLinkText, linkUrl: s?.preHeaderLinkUrl }} />
      <Header siteName={s?.siteName} navLabels={s?.navLabels} navPages={navPages || []} />
      <main>
        <div className={styles.hero}>
          <div className={styles.heroContent}>
            <div className="title-2" style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '0.5rem' }}>{bp.heroEyebrow || 'Câu chuyện'}</div>
            <h1 className="display-3" style={{ color: '#fff' }}>{bp.heroTitle || 'Nhật ký hoa'}</h1>
          </div>
        </div>
        <div className={styles.filter}>
          <div className="container">
            <div className={styles.filterInner}>
              <a href="/blog" className={styles.filterBtn}>{bp.filterAll || 'Tất cả'}</a>
              {(blogCategories || []).map(cat => (
                <a key={cat.slug} href={`/blog?cat=${cat.slug}`} className={styles.filterBtn}>
                  {cat.title}
                </a>
              ))}
            </div>
          </div>
        </div>
        <section className={styles.section}>
          <div className="container">
            {blogs?.length > 0 ? (
              <div className={styles.grid}>
                {blogs.map((post, i) => (
                  <a key={post._id} href={`/blog/${post.slug}`} className={`${styles.card} ${i === 0 ? styles.cardFeatured : ''}`}>
                    <div className={styles.cardImg}>
                      {post.cover
                        ? <Image src={post.cover} alt={post.title} fill style={{ objectFit: 'cover', transition: 'transform 0.5s' }} sizes="(max-width:768px) 100vw, 600px" />
                        : <div style={{ background: '#e8ddd5', width: '100%', height: '100%' }} />}
                      <div className={styles.cardOverlay} />
                    </div>
                    <div className={styles.cardInfo}>
                      {post.categories?.[0] && (
                        <div className={styles.cardCat}>
                          {(blogCategories || []).find(c => c.slug === post.categories?.[0]?.slug?.current)?.title || post.categories?.[0]?.title || ''}
                        </div>
                      )}
                      <h2 className={styles.cardTitle}>{post.title}</h2>
                      {post.excerpt && <p className={styles.cardExcerpt}>{post.excerpt}</p>}
                      <div className={styles.cardMeta}>
                        <span>{post.author || bp.defaultAuthor || 'Akina Florist'}</span>
                        <span>·</span>
                        <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('vi-VN') : ''}</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className={styles.empty}>
                <h2 className="display-3">{bp.comingSoon || 'Sắp ra mắt'}</h2>
                <p>{bp.comingSoonSub || 'Các bài viết đang được chuẩn bị. Hãy quay lại sau!'}</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer data={{ hotline: s?.hotline, siteName: s?.siteName, copyright: s?.copyright, facebook: s?.facebook, instagram: s?.instagram, tiktok: s?.tiktok, zaloUrl: s?.zaloUrl, messengerUrl: s?.messengerUrl, stores: s?.stores || [], footerLinks: s?.footerLinks || {}, mobileNavLabels: s?.mobileNavLabels || {} }} />
    </>
  )
}
