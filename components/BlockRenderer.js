import Image from 'next/image'
import styles from './BlockRenderer.module.css'

// ─── HERO BLOCK ───────────────────────────────────────

function HeroBlock({ block }) {
  const {
    heading, subheading, body,
    backgroundType = 'image', backgroundImage, backgroundVideo, backgroundColor = '#577057',
    overlay = 0.4, textColor = '#ffffff', textAlign = 'center', height = '80vh',
    buttons = [],
  } = block

  return (
    <section className={styles.hero} style={{ height, minHeight: 300 }}>
      {/* Background */}
      {backgroundType === 'image' && backgroundImage && (
        <Image src={backgroundImage} alt={heading || ''} fill priority
          style={{ objectFit: 'cover' }} sizes="100vw" />
      )}
      {backgroundType === 'video' && backgroundVideo && (
        <video autoPlay muted loop playsInline
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}>
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      )}
      {backgroundType === 'color' && (
        <div style={{ position: 'absolute', inset: 0, background: backgroundColor }} />
      )}

      {/* Overlay */}
      <div style={{ position: 'absolute', inset: 0, background: `rgba(0,0,0,${overlay})` }} />

      {/* Content */}
      <div className={styles.heroContent} style={{ textAlign, color: textColor }}>
        <div className="container">
          {subheading && <div className={`${styles.heroEyebrow} title-2`} style={{ color: textColor, opacity: 0.7 }}>{subheading}</div>}
          {heading && <h1 className={`${styles.heroHeading} display-4`} style={{ color: textColor }}>{heading}</h1>}
          {body && <p className={styles.heroBody} style={{ color: textColor }}>{body}</p>}
          {buttons.length > 0 && (
            <div className={styles.heroButtons}>
              {buttons.map((btn, i) => (
                <a key={i} href={btn.url}
                  className={btn.style === 'green' ? 'btn-green' : btn.style === 'outline' ? 'btn-outline' : 'btn-primary'}>
                  {btn.text}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

// ─── TEXT BLOCK ───────────────────────────────────────

function TextBlock({ block }) {
  const { eyebrow, heading, body, layout = 'center', maxWidth = '800px', paddingY = '4rem', background = '#ffffff' } = block
  const isCenter = layout === 'center'

  return (
    <section style={{ background, padding: `${paddingY} 0` }}>
      <div className="container">
        <div style={{ maxWidth, margin: isCenter ? '0 auto' : '0', textAlign: isCenter ? 'center' : 'left' }}>
          {eyebrow && <div className="title-2" style={{ color: '#577057', marginBottom: '0.5rem', opacity: 0.7 }}>{eyebrow}</div>}
          {heading && <h2 className="display-3" style={{ marginBottom: body ? '1.5rem' : 0 }}>{heading}</h2>}
          {body && (
            <div className={styles.prose}>
              {body.map((block, i) => {
                if (block._type !== 'block') return null
                const Tag = { h2: 'h2', h3: 'h3', blockquote: 'blockquote', normal: 'p' }[block.style] || 'p'
                const text = block.children?.map(c => c.text).join('') || ''
                return <Tag key={i}>{text}</Tag>
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

// ─── IMAGE BLOCK ───────────────────────────────────────

function ImageBlock({ block }) {
  const { layout = 'full', images = [], aspectRatio = '4/3', gap = '4px' } = block
  if (!images.length) return null

  const gridCols = { full: 1, centered: 1, two: 2, three: 3, four: 4, mosaic: 3 }[layout] || 1

  return (
    <section>
      <div className={layout === 'full' ? '' : 'container'} style={{ padding: layout === 'full' ? 0 : undefined }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: layout === 'mosaic' ? '2fr 1fr' : `repeat(${Math.min(gridCols, images.length)}, 1fr)`,
          gap,
        }}>
          {images.map((item, i) => (
            <a key={i} href={item.link || undefined} style={{ display: 'block', position: 'relative', aspectRatio: aspectRatio === 'auto' ? undefined : aspectRatio, overflow: 'hidden', background: '#e8ddd5' }}>
              {item.image && (
                <Image src={item.image} alt={item.alt || ''} fill style={{ objectFit: 'cover' }} sizes="(max-width:768px) 100vw, 50vw" />
              )}
              {item.caption && (
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.5)', color: '#fff', fontSize: 12, padding: '0.5rem 1rem' }}>{item.caption}</div>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── VIDEO BLOCK ───────────────────────────────────────

function VideoBlock({ block }) {
  const { heading, videoType, youtubeUrl, directUrl, videoFile, autoplay, loop, caption, maxWidth = '100%' } = block

  const getYouTubeId = url => url?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)?.[1]
  const videoFileUrl = videoFile?.asset?.url || videoFile

  return (
    <section style={{ padding: '4rem 0' }}>
      <div className="container">
        {heading && <h2 className="display-3" style={{ textAlign: 'center', marginBottom: '2rem' }}>{heading}</h2>}
        <div style={{ maxWidth, margin: '0 auto' }}>
          {videoType === 'youtube' && youtubeUrl && (
            <div style={{ aspectRatio: '16/9', background: '#000' }}>
              <iframe
                src={`https://www.youtube.com/embed/${getYouTubeId(youtubeUrl)}${autoplay ? '?autoplay=1&mute=1' : ''}`}
                style={{ width: '100%', height: '100%', border: 'none' }}
                allowFullScreen title={heading || 'Video'} />
            </div>
          )}
          {(videoType === 'direct' && directUrl) || (videoType === 'file' && videoFileUrl) ? (
            <video
              controls={!autoplay}
              autoPlay={autoplay} muted={autoplay} loop={loop} playsInline
              style={{ width: '100%', display: 'block' }}>
              <source src={videoType === 'direct' ? directUrl : videoFileUrl} type="video/mp4" />
            </video>
          ) : null}
          {caption && <p style={{ textAlign: 'center', fontSize: 12, color: 'rgba(0,0,0,0.4)', marginTop: '0.75rem' }}>{caption}</p>}
        </div>
      </div>
    </section>
  )
}

// ─── IMAGE + TEXT BLOCK ───────────────────────────────────────

function ImageTextBlock({ block }) {
  const { image, eyebrow, heading, body, buttons = [], imagePosition = 'left', imageAspect = '4/5', background = '#ffffff' } = block
  const isLeft = imagePosition === 'left'

  return (
    <section style={{ background, padding: '5rem 0' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'center',
          direction: isLeft ? 'ltr' : 'rtl',
        }}>
          <div style={{ position: 'relative', aspectRatio: imageAspect, overflow: 'hidden', background: '#e8ddd5' }}>
            {image && <Image src={image} alt={heading || ''} fill style={{ objectFit: 'cover' }} sizes="50vw" />}
          </div>
          <div style={{ direction: 'ltr' }}>
            {eyebrow && <div className="title-2" style={{ color: '#577057', marginBottom: '0.5rem', opacity: 0.7 }}>{eyebrow}</div>}
            {heading && <h2 className="display-3" style={{ marginBottom: '1.5rem' }}>{heading}</h2>}
            {body && (
              <div className={styles.prose}>
                {body.map((b, i) => {
                  if (b._type !== 'block') return null
                  const text = b.children?.map(c => c.text).join('') || ''
                  return <p key={i}>{text}</p>
                })}
              </div>
            )}
            {buttons.length > 0 && (
              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
                {buttons.map((btn, i) => (
                  <a key={i} href={btn.url} className={btn.style === 'green' ? 'btn-green' : 'btn-outline'}>{btn.text}</a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── PRODUCTS BLOCK ───────────────────────────────────────

function ProductsBlock({ block, products = [] }) {
  const { heading, subheading, columns = 4, showViewAll, viewAllUrl = '/san-pham' } = block

  return (
    <section style={{ padding: '4rem 0' }}>
      <div className="container">
        {(heading || subheading) && (
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            {subheading && <div className="title-2" style={{ opacity: 0.45, marginBottom: '0.25rem' }}>{subheading}</div>}
            {heading && <h2 className="display-3">{heading}</h2>}
          </div>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: '1.5rem' }}>
          {products.map(p => (
            <a key={p._id} href={`/san-pham/${p.categorySlug}/${p.slug}`} style={{ display: 'block' }}>
              <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', background: '#e8ddd5', marginBottom: '1rem' }}>
                {p.image && <Image src={p.image} alt={p.name} fill style={{ objectFit: 'cover' }} sizes="300px" />}
              </div>
              <div style={{ fontSize: 13, color: 'rgba(0,0,0,0.4)', marginBottom: '0.25rem' }}>{p.code}</div>
              <div style={{ fontSize: 15, marginBottom: '0.25rem' }}>{p.name}</div>
              <div style={{ fontSize: 13, color: '#577057' }}>
                {p.price ? new Intl.NumberFormat('vi-VN').format(p.price) + ' VND' : p.priceNote || 'Liên hệ'}
              </div>
            </a>
          ))}
        </div>
        {showViewAll && (
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <a href={viewAllUrl} className="btn-outline">Xem tất cả</a>
          </div>
        )}
      </div>
    </section>
  )
}

// ─── GALLERY BLOCK ───────────────────────────────────────

function GalleryBlock({ block }) {
  const { heading, images = [], columns = 3, gap = '4px' } = block

  return (
    <section style={{ padding: heading ? '4rem 0 0' : '0' }}>
      {heading && (
        <div className="container" style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 className="display-3">{heading}</h2>
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap }}>
        {images.map((item, i) => (
          <a key={i} href={item.link || undefined}
            style={{ display: 'block', position: 'relative', aspectRatio: '1/1', overflow: 'hidden', background: '#e8ddd5' }}>
            {item.image && <Image src={item.image} alt={item.alt || ''} fill style={{ objectFit: 'cover', transition: 'transform 0.4s' }} sizes="300px" />}
          </a>
        ))}
      </div>
    </section>
  )
}

// ─── CTA BLOCK ───────────────────────────────────────

function CTABlock({ block }) {
  const { heading, body, buttons = [], background = '#577057', textColor = '#ffffff', textAlign = 'center' } = block

  return (
    <section style={{ background, padding: '5rem 0' }}>
      <div className="container">
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign, color: textColor }}>
          {heading && <h2 className="display-3" style={{ color: textColor, marginBottom: body ? '1rem' : '2rem' }}>{heading}</h2>}
          {body && <p style={{ fontSize: 15, lineHeight: 1.8, marginBottom: '2rem', opacity: 0.85 }}>{body}</p>}
          {buttons.length > 0 && (
            <div style={{ display: 'flex', gap: '1rem', justifyContent: textAlign === 'center' ? 'center' : 'flex-start', flexWrap: 'wrap' }}>
              {buttons.map((btn, i) => (
                <a key={i} href={btn.url}
                  style={btn.style === 'white' ? { display: 'inline-block', padding: '12px 32px', background: '#fff', color: '#1a1a1a', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' } : undefined}
                  className={btn.style === 'green' ? 'btn-green' : btn.style === 'outline' ? 'btn-outline' : undefined}>
                  {btn.text}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

// ─── DIVIDER BLOCK ───────────────────────────────────────

function DividerBlock({ block }) {
  const { type = 'space', size = '4rem', lineColor = 'rgba(0,0,0,0.08)' } = block
  if (type === 'line') {
    return (
      <div className="container" style={{ padding: `${size} 0` }}>
        <hr style={{ border: 'none', borderTop: `0.5px solid ${lineColor}` }} />
      </div>
    )
  }
  return <div style={{ height: size }} />
}

// ─── CONTACT BLOCK ───────────────────────────────────────

function ContactBlock({ block, siteSettings }) {
  const { heading, body, showPhone, showZalo, showMessenger, showMap, mapEmbedUrl, background = '#faf8f5' } = block
  const hotline = siteSettings?.hotline || '0933 486 388'
  const hotlineClean = hotline.replace(/\s/g, '')

  return (
    <section style={{ background, padding: '5rem 0' }}>
      <div className="container">
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          {heading && <h2 className="display-3" style={{ marginBottom: body ? '1rem' : '2rem' }}>{heading}</h2>}
          {body && <p style={{ fontSize: 15, lineHeight: 1.8, color: 'rgba(0,0,0,0.6)', marginBottom: '2rem' }}>{body}</p>}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {showPhone && <a href={`tel:${hotlineClean}`} className="btn-green">📞 {hotline}</a>}
            {showZalo && <a href={siteSettings?.zaloUrl || `https://zalo.me/${hotlineClean}`} target="_blank" rel="noopener noreferrer" className="btn-outline">Zalo</a>}
            {showMessenger && <a href={siteSettings?.messengerUrl || '#'} target="_blank" rel="noopener noreferrer" className="btn-outline">Messenger</a>}
          </div>
          {showMap && mapEmbedUrl && (
            <div style={{ marginTop: '3rem', aspectRatio: '16/9' }}>
              <iframe src={mapEmbedUrl} style={{ width: '100%', height: '100%', border: 'none' }} allowFullScreen title="Bản đồ" />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

// ─── MAIN RENDERER ───────────────────────────────────────

export default function BlockRenderer({ blocks, siteSettings, products = [] }) {
  if (!blocks?.length) return null

  return (
    <>
      {blocks.map((block, i) => {
        switch (block._type) {
          case 'heroBlock': return <HeroBlock key={i} block={block} />
          case 'textBlock': return <TextBlock key={i} block={block} />
          case 'imageBlock': return <ImageBlock key={i} block={block} />
          case 'videoBlock': return <VideoBlock key={i} block={block} />
          case 'imageTextBlock': return <ImageTextBlock key={i} block={block} />
          case 'productsBlock': return <ProductsBlock key={i} block={block} products={products} />
          case 'galleryBlock': return <GalleryBlock key={i} block={block} />
          case 'ctaBlock': return <CTABlock key={i} block={block} />
          case 'dividerBlock': return <DividerBlock key={i} block={block} />
          case 'contactBlock': return <ContactBlock key={i} block={block} siteSettings={siteSettings} />
          default: return null
        }
      })}
    </>
  )
}
