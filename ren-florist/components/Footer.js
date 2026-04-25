import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div className={styles.left}>
          <Link href="/" className={styles.logo}>REN FLORIST</Link>

          <div className={styles.hotline}>
            HOTLINE: <a href="tel:0933486388">0933 486 388</a>
          </div>

          <div className={styles.storeTitle}>Hệ thống cửa hàng</div>
          <div className={styles.stores}>
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
              99B Võ Thị Sáu, phường Xuân Hoà, HCM
            </a>
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
              87 Thạch Thị Thanh, phường Tân Định, HCM
            </a>
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
              160B Võ Thị Sáu, phường Xuân Hoà, HCM
            </a>
          </div>

          <div className={styles.socials}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={styles.socialIcon}>f</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={styles.socialIcon}>ig</a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className={styles.socialIcon}>tt</a>
          </div>

          <div className={styles.copy}>©REN FLORIST 2024. ALL RIGHT RESERVED.</div>
        </div>

        <div className={styles.links}>
          <Link href="/ve-ren-florist">VỀ REN FLORIST</Link>
          <Link href="/san-pham">ĐẶT HOA</Link>
          <Link href="/du-an">DỰ ÁN</Link>
          <Link href="/academy-va-workshop">WORKSHOP</Link>
          <Link href="/chinh-sach">CHÍNH SÁCH</Link>
        </div>
      </div>
    </footer>
  )
}
