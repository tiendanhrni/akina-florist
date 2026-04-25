'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './HeroBanner.module.css'

const banners = [
  {
    id: 1,
    title: 'Hoa Bó',
    link: '/san-pham/hoa-bo',
    // Thay bằng ảnh thật: image: '/images/hero-hoa-bo.jpg'
    placeholder: '🌸',
    bg: '#c8b8a8',
  },
  {
    id: 2,
    title: 'Giỏ hoa / Bình hoa',
    link: '/san-pham/gio-hoabinh-hoa',
    placeholder: '🌿',
    bg: '#b8c8b8',
  },
  {
    id: 3,
    title: 'Các thiết kế Mica',
    link: '/san-pham/crystal-box-brystal-bag',
    placeholder: '❄',
    bg: '#c0b0c0',
  },
]

export default function HeroBanner() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % banners.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className={styles.hero}>
      <div
        className={styles.slides}
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {banners.map((banner, i) => (
          <div key={banner.id} className={styles.slide}>
            {/* Khi có ảnh thật, thay div.placeholder bằng <Image> */}
            <div
              className={styles.placeholder}
              style={{ background: banner.bg }}
            >
              <span>{banner.placeholder}</span>
            </div>
            <div className={styles.overlay} />
            <div className={styles.content}>
              <h2 className={`${styles.title} display-4`}>{banner.title}</h2>
              <Link href={banner.link} className={styles.btn}>
                Xem Thêm
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination bullets */}
      <div className={styles.pagination}>
        {banners.map((_, i) => (
          <button
            key={i}
            className={`${styles.bullet} ${i === current ? styles.bulletActive : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
