'use client'
import { useState } from 'react'
import Link from 'next/link'
import styles from './Header.module.css'

export default function Header({ s, navPages = [] }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const nav = s?.navLabels || {}
  const siteName = s?.siteName || 'AKINA FLORIST'

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.left}>
          <Link href="/san-pham">{nav.shop || 'Đặt hoa'}</Link>
          <Link href="/ve-akina-florist">{nav.about || 'Giới thiệu'}</Link>
          <Link href="/academy-va-workshop">{nav.workshop || 'Workshop & Academy'}</Link>
          {navPages.map(p => (
            <Link key={p.slug} href={`/trang/${p.slug}`}>{p.navLabel || p.title}</Link>
          ))}
        </div>
        <Link href="/" className={styles.logo}>{siteName}</Link>
        <div className={styles.right}>
          <Link href="/blog">{nav.blog || 'Blog'}</Link>
          <Link href="/du-an">{nav.project || 'Dự án'}</Link>
          <Link href="/chinh-sach">{nav.policy || 'Chính sách'}</Link>
        </div>
        <button className={styles.burger} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>
      {menuOpen && (
        <div className={styles.mobileMenu}>
          <Link href="/san-pham" onClick={() => setMenuOpen(false)}>{nav.shop || 'Đặt hoa'}</Link>
          <Link href="/ve-akina-florist" onClick={() => setMenuOpen(false)}>{nav.about || 'Giới thiệu'}</Link>
          <Link href="/academy-va-workshop" onClick={() => setMenuOpen(false)}>{nav.workshop || 'Workshop & Academy'}</Link>
          {navPages.map(p => (
            <Link key={p.slug} href={`/trang/${p.slug}`} onClick={() => setMenuOpen(false)}>{p.navLabel || p.title}</Link>
          ))}
          <Link href="/blog" onClick={() => setMenuOpen(false)}>{nav.blog || 'Blog'}</Link>
          <Link href="/du-an" onClick={() => setMenuOpen(false)}>{nav.project || 'Dự án'}</Link>
          <Link href="/chinh-sach" onClick={() => setMenuOpen(false)}>{nav.policy || 'Chính sách'}</Link>
        </div>
      )}
    </header>
  )
}
