import styles from './PreHeader.module.css'
export default function PreHeader({ data }) {
  return (
    <div className={styles.wrap}>
      <span>{data?.text || 'Miễn phí giao hàng nội thành HCM'}</span>
      <a href={data?.linkUrl || '/chinh-sach'}>{data?.linkText || 'XEM THÊM'}</a>
    </div>
  )
}
