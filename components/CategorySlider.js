'use client'
import { useRef, useState, useEffect } from 'react'
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
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)

  const base = categories.length > 0 ? categories : defaultCategories
  // Nhân 3 lần để tạo vòng lặp giả
  const items = [...base, ...base, ...base]
  const total = base.length

  // Set vị trí ban đầu ở giữa (bộ thứ 2)
  useEffect(() => {
    if (trackRef.current) {
      const cardWidth = trackRef.current.scrollWidth / 3
      trackRef.current.scrollLeft = cardWidth
    }
  }, [])

  const getCardWidth = () => {
    if (!trackRef.current) return 440
    return trackRef.current.querySelector('a')?.offsetWidth + 8 || 440
  }

  const scroll = (dir) => {
    const track = trackRef.current
    if (!track) return
    const cardW = getCardWidth()
    const next = currentIndex + dir

    track.scrollBy({ left: dir * cardW, behavior: 'smooth' })
    setCurrentIndex(next)

    // Reset về giữa khi đến đầu/cuối
    setTimeout(() => {
      const maxScroll = track.scrollWidth / 3
      if (track.scrollLeft < cardW) {
        track.scrollLeft += maxScroll
      } else if (track.scrollLeft > maxScroll * 2 - cardW) {
        track.scrollLeft -= maxScroll
      }
    }, 350)
  }

  // Drag to scroll
  const onMouseDown = (e) => {
    setIsDragging(true)
    setStartX(e.pageX - trackRef.current.offsetLeft)
    setScrollLeft(trackRef.current.scrollLeft)
  }

  const onMouseMove = (e) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - trackRef.current.offsetLeft
    const walk = (x - startX) * 1.5
    trackRef.current.scrollLeft = scrollLeft - walk
  }

  const onMouseUp = () => setIsDragging(false)

  // Touch support
  const onTouchStart = (e) => {
    setStartX(e.touches[0].pageX - trackRef.current.offsetLeft)
    setScrollLeft(trackRef.current.scrollLeft)
  }

  const onTouchMove = (e) => {
    const x = e.touches[0].pageX - trackRef.current.offsetLeft
    const walk = (x - startX) * 1.2
    trackRef.current.scrollLeft = scrollLeft - walk
  }

  return (
    <section className={styles.section}>
      <div
        className={`${styles.track} ${isDragging ? styles.dragging : ''}`}
        ref={trackRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
      >
        {items.map((cat, i) => (
          <Link
            key={`${cat._id}-${i}`}
            href={`/san-pham/${cat.slug?.current || cat.slug}`}
            className={styles.card}
            draggable={false}
            onClick={(e) => isDragging && e.preventDefault()}
          >
            <div className={styles.img}>
              {cat.image
                ? <Image src={cat.image} alt={cat.title} fill
                    style={{ objectFit: 'cover' }} sizes="432px" draggable={false} />
                : <div style={{ background: bgs[(i % total) % bgs.length], width: '100%', height: '100%' }} />
              }
            </div>
            <div className={styles.labelWrap}>
              <span className={styles.label}>
                <span className={styles.labelBg} />
                <span className={styles.labelText}>{cat.title}</span>
              </span>
            </div>
          </Link>
        ))}
      </div>

      <button className={`${styles.arrow} ${styles.arrowLeft}`}
        onClick={() => scroll(-1)} aria-label="Trước">
        <svg className={styles.arrowIcon} viewBox="0 0 12 20" fill="none">
          <path d="M9 17.12L1.5 9.62L9 2.12" stroke="black" strokeWidth="3" strokeLinecap="square" strokeLinejoin="round"/>
        </svg>
      </button>

      <button className={`${styles.arrow} ${styles.arrowRight}`}
        onClick={() => scroll(1)} aria-label="Sau">
        <svg className={styles.arrowIcon} viewBox="0 0 12 20" fill="none" style={{ transform: 'rotate(180deg)' }}>
          <path d="M9 17.12L1.5 9.62L9 2.12" stroke="black" strokeWidth="3" strokeLinecap="square" strokeLinejoin="round"/>
        </svg>
      </button>
    </section>
  )
}
