'use client'
import { useState } from 'react'
import Link from 'next/link'
import styles from './Header.module.css'

export default function Header({ navPages = [] }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.left}>
          <Link href="/san-pham">Đặt hoa</Link>
          <Link href="/ve-akina-florist">Giới thiệu</Link>
          <Link href="/academy-va-workshop">Workshop & Academy</Link>
          {/* Các trang tùy chỉnh có showInNav = true */}
          {navPages.map(p => (
            <Link key={p.slug} href={`/trang/${p.slug}`}>{p.navLabel || p.title}</Link>
          ))}
        </div>

        <Link href="/" className={styles.logo}>AKINA FLORIST</Link>

        <div className={styles.right}>
          <Link href="/blog">Blog</Link>
          <Link href="/du-an">Dự án</Link>
          <Link href="/chinh-sach">Chính sách</Link>
        </div>

        <button className={styles.burger} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          <Link href="/san-pham" onClick={() => setMenuOpen(false)}>Đặt hoa</Link>
          <Link href="/ve-akina-florist" onClick={() => setMenuOpen(false)}>Giới thiệu</Link>
          <Link href="/academy-va-workshop" onClick={() => setMenuOpen(false)}>Workshop & Academy</Link>
          {navPages.map(p => (
            <Link key={p.slug} href={`/trang/${p.slug}`} onClick={() => setMenuOpen(false)}>{p.navLabel || p.title}</Link>
          ))}
          <Link href="/blog" onClick={() => setMenuOpen(false)}>Blog</Link>
          <Link href="/du-an" onClick={() => setMenuOpen(false)}>Dự án</Link>
          <Link href="/chinh-sach" onClick={() => setMenuOpen(false)}>Chính sách</Link>
        </div>
      )}
    </header>
  )
}
