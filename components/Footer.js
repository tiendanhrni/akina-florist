import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div className={styles.left}>
          <Link href="/" className={styles.logo}>AKINA FLORIST</Link>
          <div className={styles.hotline}>HOTLINE: <a href="tel:0933486388">0933 486 388</a></div>
          <div className={styles.storeTitle}>Hệ thống cửa hàng</div>
          <div className={styles.stores}>
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">99B Võ Thị Sáu, phường Xuân Hoà, HCM</a>
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">87 Thạch Thị Thanh, phường Tân Định, HCM</a>
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">160B Võ Thị Sáu, phường Xuân Hoà, HCM</a>
          </div>
          <div className={styles.socials}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={styles.socialIcon}>f</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={styles.socialIcon}>ig</a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className={styles.socialIcon}>tt</a>
          </div>
          <div className={styles.copy}>©AKINA FLORIST 2025. ALL RIGHT RESERVED.</div>
        </div>
        <div className={styles.links}>
          <Link href="/ve-akina-florist">VỀ AKINA FLORIST</Link>
          <Link href="/san-pham">ĐẶT HOA</Link>
          <Link href="/du-an">DỰ ÁN</Link>
          <Link href="/academy-va-workshop">WORKSHOP</Link>
          <Link href="/chinh-sach">CHÍNH SÁCH</Link>
        </div>
      </div>

      {/* Mobile nav */}
      <div className={styles.mobileNav}>
        <Link href="/" className={styles.mobileTab}>
          <svg width="19" height="18" viewBox="0 0 19 18" fill="none"><path d="M17.75 13.2C17.75 15.09 17.75 16.03 17.16 16.62C16.58 17.2 15.64 17.2 13.75 17.2H4.75C2.86 17.2 1.92 17.2 1.34 16.62C0.75 16.03 0.75 15.09 0.75 13.2V8.85C0.75 7.9 0.75 7.43 0.95 7.01C1.15 6.6 1.52 6.31 2.27 5.72L6.77 2.16C7.96 1.22 8.56 0.75 9.25 0.75C9.94 0.75 10.54 1.22 11.73 2.16L16.23 5.72C16.98 6.31 17.35 6.6 17.55 7.01C17.75 7.43 17.75 7.9 17.75 8.85V13.2Z" stroke="#577057" strokeWidth="1.5"/></svg>
          <span>Trang chủ</span>
        </Link>
        <Link href="/san-pham" className={styles.mobileTab}>
          <svg width="20" height="22" viewBox="0 0 20 22" fill="none"><path d="M10 11V20M10 20V21H14C16.2 21 18 19.2 18 17V16C18 15.4 17.6 15 17 15H14C11.8 15 10 16.8 10 19Z" stroke="#555" strokeWidth="1.5" strokeLinecap="round"/><path d="M3 16V17C3 19.2 4.8 21 7 21H10V19C10 16.8 8.2 15 6 15H3.5C3.2 15 3 15.3 3 15.6V16Z" stroke="#555" strokeWidth="1.5" strokeLinecap="round"/><path d="M15 1L10 4L5 1V7C5 10 7.2 12 10 12C12.8 12 15 10 15 7V1Z" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span>Đặt hoa</span>
        </Link>
        <a href="tel:0933486388" className={styles.mobileTab}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M14 12.5C13.2 12.1 12.4 11.6 11.7 11C11 10.4 10.5 9.6 10.1 8.8C10 8.5 10 8.1 10.2 7.9L11 7.1C11.6 6.5 11.6 5.6 11.1 5L9.9 3.8C9.3 3.2 8.4 3.2 7.8 3.8L7.2 4.4C6.6 5 6.4 5.9 6.6 6.7C7.1 8.8 8.3 10.8 10 12.5C11.7 14.2 13.7 15.4 15.8 15.9C16.6 16.1 17.5 15.9 18.1 15.3L18.7 14.7C19.3 14.1 19.3 13.2 18.7 12.6L17.5 11.4C16.9 10.8 16 10.8 15.4 11.4L14.6 12.2C14.4 12.4 14.2 12.5 14 12.5Z" stroke="#555" strokeWidth="1.5"/></svg>
          <span>Liên hệ</span>
        </a>
        <Link href="/academy-va-workshop" className={styles.mobileTab}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8.5" stroke="#555" strokeWidth="1.5"/><path d="M7 10L9 12L13 8" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span>Workshop</span>
        </Link>
        <Link href="/ve-akina-florist" className={styles.mobileTab}>
          <svg width="18" height="7" viewBox="0 0 18 7" fill="none"><path d="M0 1H17.5" stroke="#555" strokeWidth="2" strokeLinecap="round"/><path d="M0 6H17.5" stroke="#555" strokeWidth="2" strokeLinecap="round"/></svg>
          <span>Menu</span>
        </Link>
      </div>
    </footer>
  )
}
