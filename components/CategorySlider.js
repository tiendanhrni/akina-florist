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
  const dragRef = useRef({ isDragging: false, startX: 0, scrollLeft: 0, moved: false })
  const [dragging, setDragging] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const base = categories.length > 0 ? categories : defaultCategories
  const items = [...base, ...base, ...base]
  const total = base.length

  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.scrollLeft = trackRef.current.scrollWidth / 3
    }
  }, [])

  const getCardWidth = () => {
    if (!trackRef.current) return 440
    return (trackRef.current.querySelector('a')?.offsetWidth || 432) + 8
  }

  const scroll = (dir) => {
    const track = trackRef.current
    if (!track) return
    const cardW = getCardWidth()
    track.scrollBy({ left: dir * cardW, behavior: 'smooth' })
    setCurrentIndex(i => i + dir)
    setTimeout(() => {
      const third = track.scrollWidth / 3
      if (track.scrollLeft < cardW) track.scrollLeft += third
      else if (track.scrollLeft > third * 2 - cardW) track.scrollLeft -= third
    }, 350)
  }

  // Mouse drag
  const onMouseDown = (e) => {
    dragRef.current = {
      isDragging: true,
      startX: e.pageX,
      scrollLeft: trackRef.current.scrollLeft,
      moved: false,
    }
    setDragging(true)
  }

  const onMouseMove = (e) => {
    if (!dragRef.current.isDragging) return
    const walk = (e.pageX - dragRef.current.startX) * 1.2
    if (Math.abs(walk) > 5) dragRef.current.moved = true
    trackRef.current.scrollLeft = dragRef.current.scrollLeft - walk
  }

  const onMouseUp = () => {
    dragRef.current.isDragging = false
    setDragging(false)
  }

  // Touch drag
  const onTouchStart = (e) => {
    dragRef.current = {
      isDragging: true,
      startX: e.touches[0].pageX,
      scrollLeft: trackRef.current.scrollLeft,
      moved: false,
    }
  }

  const onTouchMove = (e) => {
    if (!dragRef.current.isDragging) return
    const walk = (e.touches[0].pageX - dragRef.current.startX) * 1.2
    dragRef.current.moved = true
    trackRef.current.scrollLeft = dragRef.current.scrollLeft - walk
  }

  const onTouchEnd = () => {
    dragRef.current.isDragging = false
  }

  return (
    <section className={styles.section}>
      <div
        ref={trackRef}
        className={styles.track}
        style={{ cursor: dragging ? 'grabbing' : 'grab' }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {items.map((cat, i) => (
          <Link
            key={`${cat._id}-${i}`}
            href={`/san-pham/${cat.slug?.current || cat.slug}`}
            className={styles.card}
            draggable={false}
            onClick={(e) => { if (dragRef.current.moved) e.preventDefault() }}
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

      <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={() => scroll(-1)} aria-label="Trước">
        <svg className={styles.arrowIcon} viewBox="0 0 12 20" fill="none">
          <path d="M9 17.12L1.5 9.62L9 2.12" stroke="black" strokeWidth="3" strokeLinecap="square" strokeLinejoin="round"/>
        </svg>
      </button>
      <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={() => scroll(1)} aria-label="Sau">
        <svg className={styles.arrowIcon} viewBox="0 0 12 20" fill="none" style={{ transform: 'rotate(180deg)' }}>
          <path d="M9 17.12L1.5 9.62L9 2.12" stroke="black" strokeWidth="3" strokeLinecap="square" strokeLinejoin="round"/>
        </svg>
      </button>
    </section>
  )
}
