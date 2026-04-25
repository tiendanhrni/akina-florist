import styles from './PreHeader.module.css'

export default function PreHeader({ s }) {
  const text = s?.preHeaderText || 'Miễn phí giao hàng nội thành HCM'
  const linkText = s?.preHeaderLinkText || 'XEM THÊM'
  const linkUrl = s?.preHeaderLinkUrl || '/chinh-sach'
  return (
    <div className={styles.wrap}>
      <span>{text}</span>
      <a href={linkUrl}>{linkText}</a>
    </div>
  )
}
