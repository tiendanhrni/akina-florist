'use client'
import Link from 'next/link'
import styles from './CategorySlider.module.css'

const categories = [
  { id: 34, title: 'Hoa Bó',                    slug: 'hoa-bo',                      placeholder: '🌸', bg: '#c8b8a8' },
  { id: 35, title: 'Giỏ hoa / Bình hoa',        slug: 'gio-hoabinh-hoa',             placeholder: '🌿', bg: '#b8c8b8' },
  { id: 37, title: 'Crystal box & Brystal Bag', slug: 'crystal-box-brystal-bag',     placeholder: '💎', bg: '#c0b0c0' },
  { id: 40, title: 'Lan Hồ Điệp',               slug: 'lan-ho-diep',                 placeholder: '🌼', bg: '#c8c0b0' },
  { id: 31, title: '2026 Tết Collection',        slug: '2026-tet-collection-thuan-thien', placeholder: '🎋', bg: '#b0c0c0' },
  { id: 41, title: 'Valentine',                  slug: 'valentine',                   placeholder: '💝', bg: '#c0b0b8' },
]

export default function CategorySlider() {
  return (
    <section className={styles.section}>
      <div className={styles.track}>
        {categories.map(cat => (
          <div key={cat.id} className={styles.card}>
            <Link href={`/san-pham/${cat.slug}`} className={styles.imgWrap}>
              {/* Thay div.imgPlaceholder bằng <Image> khi có ảnh thật */}
              <div
                className={styles.imgPlaceholder}
                style={{ background: cat.bg }}
              >
                <span>{cat.placeholder}</span>
              </div>
            </Link>

            <div className={styles.labelWrap}>
              <Link href={`/san-pham/${cat.slug}`} className={styles.label}>
                <div className={styles.labelBg} />
                <span className={styles.labelText}>{cat.title}</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
