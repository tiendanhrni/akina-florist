import PreHeader from '@/components/PreHeader'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getBlog, getRelatedBlogs, getSiteSettings } from '@/lib/queries'
import Image from 'next/image'
import styles from './page.module.css'

export const revalidate = 60
export const dynamicParams = true

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = await getBlog(slug)
  const s = await getSiteSettings()
  return {
    title: post?.seoTitle || post?.title || 'Bài viết',
    description: post?.seoDescription || post?.excerpt || '',
    openGraph: {
      title: post?.title,
      description: post?.excerpt,
      images: post?.cover ? [{ url: post.cover }] : [],
      type: 'article',
      publishedTime: post?.publishedAt,
    },
  }
}

// Render portable text block đơn giản
function PortableText({ blocks }) {
  if (!blocks) return null
  return blocks.map((block, i) => {
    if (block._type === 'image') {
      return (
        <figure key={i} className={styles.blockImg}>
          <Image src={block.url} alt={block.alt || ''} width={800} height={500}
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      )
    }
    if (block._type === 'videoEmbed') {
      const videoId = block.url?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)?.[1]
      if (!videoId) return null
      return (
        <div key={i} className={styles.videoWrap}>
          <iframe src={`https://www.youtube.com/embed/${videoId}`}
            allowFullScreen title={block.caption || 'Video'} />
          {block.caption && <p className={styles.caption}>{block.caption}</p>}
        </div>
      )
    }
    if (block._type === 'callToAction') {
      return (
        <div key={i} className={styles.cta}>
          <a href={block.url} className={block.style === 'outline' ? 'btn-outline' : 'btn-green'}>
            {block.text}
          </a>
        </div>
      )
    }
    if (block._type !== 'block') return null

    const children = block.children?.map((child, j) => {
      let text = child.text
      if (child.marks?.includes('strong')) text = <strong key={j}>{text}</strong>
      if (child.marks?.includes('em')) text = <em key={j}>{text}</em>
      if (child.marks?.includes('underline')) text = <u key={j}>{text}</u>
      const link = block.markDefs?.find(m => child.marks?.includes(m._key) && m._type === 'link')
      if (link) text = <a key={j} href={link.href} target={link.blank ? '_blank' : '_self'} rel="noopener noreferrer">{text}</a>
      return text
    })

    const Tag = {
      h2: 'h2', h3: 'h3', h4: 'h4', blockquote: 'blockquote', normal: 'p',
    }[block.style] || 'p'

    if (block.listItem === 'bullet') return <li key={i} className={styles.li}>{children}</li>
    if (block.listItem === 'number') return <li key={i} className={styles.li}>{children}</li>

    return <Tag key={i} className={styles[Tag] || styles.p}>{children}</Tag>
  })
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params
  const [post, s] = await Promise.all([getBlog(slug), getSiteSettings()])

  if (!post) {
    return (
      <>
        <PreHeader s={s} /><Header />
        <main style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
          <h1 className="display-3">Bài viết không tồn tại</h1>
          <a href="/blog" className="btn-outline">Quay lại Blog</a>
        </main>
        <Footer s={s} />
      </>
    )
  }

  const related = await getRelatedBlogs(slug, post.categories || [])

  return (
    <>
      <PreHeader s={s} />
      <Header />
      <main>
        {/* Hero */}
        <div className={styles.hero}>
          {post.cover && (
            <Image src={post.cover} alt={post.title} fill priority
              style={{ objectFit: 'cover' }} sizes="100vw" />
          )}
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <div className="container">
              <div className={styles.breadcrumb}>
                <a href="/blog">Blog</a> <span>/</span> <span>{post.title}</span>
              </div>
              <h1 className={`${styles.heroTitle} display-3`}>{post.title}</h1>
              <div className={styles.heroMeta}>
                <span>{post.author || 'Akina Florist'}</span>
                <span>·</span>
                <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('vi-VN', { day: '2-digit', month: 'long', year: 'numeric' }) : ''}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className={styles.layout}>
          <div className="container">
            <div className={styles.inner}>
              {/* Article */}
              <article className={styles.article}>
                {post.excerpt && <p className={styles.lead}>{post.excerpt}</p>}
                <div className={styles.body}>
                  <PortableText blocks={post.body} />
                </div>
                {/* Tags */}
                {post.tags?.length > 0 && (
                  <div className={styles.tags}>
                    {post.tags.map(tag => (
                      <span key={tag} className={styles.tag}>#{tag}</span>
                    ))}
                  </div>
                )}
                {/* Share */}
                <div className={styles.share}>
                  <span>Chia sẻ:</span>
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://akina-florist.vercel.app/blog/${slug}`)}`}
                    target="_blank" rel="noopener noreferrer" className={styles.shareBtn}>Facebook</a>
                  <a href={`https://zalo.me/share/url?url=${encodeURIComponent(`https://akina-florist.vercel.app/blog/${slug}`)}`}
                    target="_blank" rel="noopener noreferrer" className={styles.shareBtn}>Zalo</a>
                </div>
              </article>

              {/* Sidebar */}
              <aside className={styles.sidebar}>
                <div className={styles.sideCard}>
                  <div className={styles.sideTitle}>Đặt hoa ngay</div>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.7 }}>
                    Liên hệ Akina Florist để được tư vấn và đặt hoa theo yêu cầu.
                  </p>
                  <a href={`tel:${(s?.hotline || '0933486388').replace(/\s/g, '')}`} className="btn-green" style={{ display: 'block', textAlign: 'center', marginBottom: '0.75rem' }}>
                    Gọi ngay — {s?.hotline || '0933 486 388'}
                  </a>
                  <a href="/san-pham" className="btn-outline" style={{ display: 'block', textAlign: 'center' }}>
                    Xem sản phẩm
                  </a>
                </div>
              </aside>
            </div>
          </div>
        </div>

        {/* Related posts */}
        {related?.length > 0 && (
          <section className={styles.related}>
            <div className="container">
              <div style={{ marginBottom: '2rem' }}>
                <div className="title-2" style={{ opacity: 0.45, marginBottom: '0.25rem' }}>Có thể bạn thích</div>
                <h2 className="display-3">Bài viết liên quan</h2>
              </div>
              <div className={styles.relatedGrid}>
                {related.map(r => (
                  <a key={r._id} href={`/blog/${r.slug}`} className={styles.relatedCard}>
                    <div className={styles.relatedImg}>
                      {r.cover && <Image src={r.cover} alt={r.title} fill style={{ objectFit: 'cover', transition: 'transform 0.4s' }} sizes="400px" />}
                    </div>
                    <div className={styles.relatedInfo}>
                      <h3 className={styles.relatedTitle}>{r.title}</h3>
                      <span className={styles.relatedDate}>{r.publishedAt ? new Date(r.publishedAt).toLocaleDateString('vi-VN') : ''}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer s={s} />
    </>
  )
}
