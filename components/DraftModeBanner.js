'use client'
// components/DraftModeBanner.js
// Thanh thông báo màu vàng xuất hiện ở trên cùng khi đang xem draft

import styles from './DraftModeBanner.module.css'

export default function DraftModeBanner() {
  return (
    <div className={styles.banner}>
      <span>🔍 Đang xem bản nháp (Draft Preview)</span>
      <a href="/api/disable-draft" className={styles.exit}>
        Thoát preview
      </a>
    </div>
  )
}
