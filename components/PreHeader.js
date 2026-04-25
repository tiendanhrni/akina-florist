import styles from './PreHeader.module.css'
export default function PreHeader({ s }) {
  return (
    <div className={styles.wrap}>
      <span>{s?.preHeaderText || 'Miễn phí giao hàng nội thành HCM'}</span>
      <a href={s?.preHeaderLinkUrl || '/chinh-sach'}>{s?.preHeaderLinkText || 'XEM THÊM'}</a>
    </div>
  )
}
