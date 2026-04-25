'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './HeroBanner.module.css'

const defaultBanners = [
  { _id: '1', title: 'Hoa Bó', link: '/san-pham/hoa-bo', image: null },
  { _id: '2', title: 'Giỏ hoa / Bình hoa', link: '/san-pham/gio-hoabinh-hoa', image: null },
  { _id: '3', title: 'Các thiết kế Mica', link: '/san-pham/crystal-box-brystal-bag', image: null },
]

export default function HeroBanner({ banners }) {
  const [current, setCurrent] = useState(0)
  const items = banners.length > 0 ? banners : defaultBanners

  useEffect(() => {
    const t = setInterval(() => setCurrent(p => (p + 1) % items.length), 4500)
    return () => clearInterval(t)
  }, [items.length])

  return (
    <section className={styles.hero}>
      <div className={styles.slides} style={{ transform: `translateX(-${current * 100}%)` }}>
        {items.map((b, i) => (
          <div key={b._id} className={styles.slide}>
            {b.image ? (
              <Image src={b.image} alt={b.title} fill priority={i === 0}
                style={{ objectFit: 'cover', transform: 'scale(1.05)' }} sizes="100vw" />
            ) : (
              <div className={`${styles.placeholder} ${styles[`bg${i % 3}`]}`} />
            )}
            <div className={styles.overlay} />
            <div className={styles.content}>
              <div className={`${styles.title} display-4`} style={{ color: '#fff' }}>{b.title}</div>
              <Link href={b.link || '/san-pham'} className="btn-primary">Xem Thêm</Link>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.pagination}>
        {items.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            className={`${styles.bullet} ${i === current ? styles.active : ''}`}
            aria-label={`Slide ${i + 1}`} />
        ))}
      </div>
    </section>
  )
}
