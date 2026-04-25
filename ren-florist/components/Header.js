'use client'
import Link from 'next/link'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.navLeft}>
          <Link href="/san-pham">Đặt hoa</Link>
          <Link href="/ve-ren-florist">Giới thiệu</Link>
          <Link href="/academy-va-workshop">Workshop</Link>
        </div>

        <Link href="/" className={styles.logo}>
          REN FLORIST
        </Link>

        <div className={styles.navRight}>
          <Link href="/du-an">Dự án</Link>
          <Link href="/chinh-sach">Chính sách</Link>
          <div className={styles.lang}>VI | EN</div>
        </div>
      </nav>
    </header>
  )
}
