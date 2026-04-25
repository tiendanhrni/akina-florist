'use client'
import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './CategorySlider.module.css'

const defaultCategories = [
  { _id: '1', title: 'Hoa Bó', slug: 'hoa-bo', image: null },
  { _id: '2', title: 'Giỏ hoa / Bình hoa', slug: 'gio-hoabinh-hoa', image: null },
  { _id: '3', title: 'Crystal box & Brystal Bag', slug: 'crystal-box-brystal-bag', image: null },
  { _id: '4', title: 'Lan Hồ Điệp', slug: 'lan-ho-diep', image: null },
  { _id: '5', title: '2026 Tết Collection', slug: '2026-tet-collection', image: null },
  { _id: '6', title: 'Valentine', slug: 'valentine', image: null },
]

const bgs = ['#c8b8a8','#b8c8b8','#c0b0c0','#c8c0b0','#b0c0c0','#c0b0b8']

export default function CategorySlider({ categories }) {
  const trackRef = useRef(null)
  const items = categories.length > 0 ? categories : defaultCategories

  const scroll = (dir) => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: dir * 420, behavior: 'smooth' })
    }
  }

  return (
    <section className={styles.section}>
      <div className={styles.track} ref={trackRef}>
        {items.map((cat, i) => (
          <Link key={cat._id}
            href={`/san-pham/${cat.slug?.current || cat.slug}`}
            className={styles.card}>
            <div className={styles.img}>
              {cat.image
                ? <Image src={cat.image} alt={cat.title} fill style={{ objectFit: 'cover', transition: 'transform 0.5s' }} sizes="400px" />
                : <div style={{ background: bgs[i % bgs.length], width: '100%', height: '100%' }} />
              }
              <div className={styles.overlay} />
            </div>
            <div className={styles.label}>{cat.title}</div>
          </Link>
        ))}
      </div>

      {/* Nút prev/next */}
      <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={() => scroll(-1)} aria-label="Trước">
        &#8592;
      </button>
      <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={() => scroll(1)} aria-label="Sau">
        &#8594;
      </button>
    </section>
  )
}
