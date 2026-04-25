import Image from 'next/image'
import styles from './GallerySection.module.css'

export default function GallerySection({ gallery }) {
  if (!gallery || gallery.length === 0) return null

  return (
    <section className={styles.section}>
      <div className={styles.track}>
        {gallery.map(item => (
          <a key={item._id} href={item.link || '#'} target="_blank" rel="noopener noreferrer"
            className={styles.card}>
            {item.image ? (
              <Image src={item.image} alt={item.title || ''} fill
                style={{ objectFit: 'cover', transition: 'transform 0.4s' }}
                sizes="286px" />
            ) : (
              <div style={{ background: '#e8ddd5', width: '100%', height: '100%' }} />
            )}
            <div className={styles.overlay}>
              <p>{item.title}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
