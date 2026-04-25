'use client'
import { useState, useEffect } from 'react'
import styles from './FloatButtons.module.css'

export default function FloatButtons() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={styles.wrap}>
      <a href="tel:0933486388" className={styles.btn} aria-label="Gọi điện">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" fill="#ffffeb"/>
        </svg>
      </a>
      <a href="https://zalo.me/0933486388" target="_blank" rel="noopener noreferrer" className={styles.btn} aria-label="Zalo">
        <span style={{ color: '#ffffeb', fontSize: '12px', fontWeight: 600, letterSpacing: '-0.02em' }}>Zalo</span>
      </a>
      <a href="https://m.me/akinaflorist" target="_blank" rel="noopener noreferrer" className={styles.btn} aria-label="Messenger">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#ffffeb">
          <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.936 1.46 5.56 3.742 7.279V21l2.674-1.465c.713.196 1.47.302 2.25.302 5.523 0 10-4.145 10-9.243S17.523 2 12 2zm1.008 12.435l-2.549-2.718-4.972 2.718 5.471-5.808 2.612 2.718 4.909-2.718-5.471 5.808z"/>
        </svg>
      </a>
      {showTop && (
        <button className={`${styles.btn} ${styles.topBtn}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Lên đầu trang">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M18 15l-6-6-6 6" stroke="#577057" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
    </div>
  )
}
