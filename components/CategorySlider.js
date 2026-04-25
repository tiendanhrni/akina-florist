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
  const items = categories.length > 0 ? categories : defaultCategories

  return (
    <section className={styles.section}>
      <div className={styles.track}>
        {items.map((cat, i) => (
          <div key={cat._id} className={`${styles.card} category-card`}>
            <Link href={`/san-pham/${cat.slug?.current || cat.slug}`} className={styles.imgLink}>
              {cat.image ? (
                <Image src={cat.image} alt={cat.title} fill style={{ objectFit: 'cover', transition: 'transform 0.5s' }}
                  sizes="280px" />
              ) : (
                <div style={{ background: bgs[i % bgs.length], width: '100%', height: '100%' }} />
              )}
            </Link>
            <div className={styles.labelWrap}>
              <Link href={`/san-pham/${cat.slug?.current || cat.slug}`} className={styles.label}>
                <div className="cat-label-bg" />
                <span className="cat-label-text">{cat.title}</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
