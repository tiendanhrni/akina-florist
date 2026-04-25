'use client'
import { useState } from 'react'
import Image from 'next/image'
import styles from './ProductGallery.module.css'

export default function ProductGallery({ images, name }) {
  const [active, setActive] = useState(0)

  if (!images || images.length === 0) {
    return <div className={styles.placeholder} />
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.main}>
        <Image src={images[active]} alt={name} fill style={{ objectFit: 'cover' }} sizes="50vw" priority />
      </div>
      {images.length > 1 && (
        <div className={styles.thumbs}>
          {images.map((img, i) => (
            <button key={i} onClick={() => setActive(i)}
              className={`${styles.thumb} ${i === active ? styles.thumbActive : ''}`}>
              <Image src={img} alt={`${name} ${i + 1}`} fill style={{ objectFit: 'cover' }} sizes="80px" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
