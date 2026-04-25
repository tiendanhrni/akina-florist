'use client'
import { useState } from 'react'
import Image from 'next/image'
import styles from './WhySection.module.css'

const defaultItems = [
  { _id: '1', title: 'Giao hàng nhanh trong 2 giờ', description: 'Quy trình sản xuất chuyên nghiệp, nguyên liệu luôn sẵn sàng — đảm bảo mỗi thiết kế được hoàn thiện và giao đến tay khách trong vòng 2 giờ.', image: null },
  { _id: '2', title: 'Gửi hình trước khi giao', description: 'Hình ảnh sản phẩm được gửi duyệt trước khi giao — để bạn an tâm rằng món quà được gửi đi đúng như mong đợi.', image: null },
  { _id: '3', title: 'Cam kết giống mẫu tối thiểu 80%', description: 'Mỗi thiết kế được thực hiện chuẩn xác, đồng đều, giữ trọn tinh thần của mẫu gốc — đảm bảo chất lượng và thẩm mỹ ở từng chi tiết.', image: null },
  { _id: '4', title: 'Nguồn nguyên liệu đa dạng & luôn sẵn sàng', description: 'Hoa tươi nội địa và nhập khẩu được cập nhật mỗi ngày — đảm bảo nguồn nguyên liệu phong phú, tươi mới và sẵn sàng cho mọi thiết kế.', image: null },
]

export default function WhySection({ items, s }) {
  const [active, setActive] = useState(0)
  const data = items?.length > 0 ? items : defaultItems
  const title = s?.whySectionTitle || 'Vì sao Akina được yêu thích?'

  return (
    <section className={styles.section}>
      <div className={styles.overlay} />
      {data[active]?.image && (
        <Image src={data[active].image} alt={data[active].title} fill style={{ objectFit: 'cover', zIndex: 0 }} sizes="100vw" />
      )}
      <div className={styles.fadeTop} />
      <div className={styles.fadeBot} />
      <h2 className={`${styles.title} display-3`}>{title}</h2>
      <div className={styles.layout}>
        <div className={styles.card}>
          <div className={styles.dotTR} /><div className={styles.dotBR} />
          <h3 className={`${styles.cardTitle} display-3`}>{data[active].title}</h3>
          <p className={`${styles.cardDesc} body-3`}>{data[active].description}</p>
        </div>
        <div className={styles.nums}>
          {data.map((_, i) => (
            <button key={i} onClick={() => setActive(i)}
              className={`${styles.numBtn} ${i === active ? styles.numActive : ''}`}>
              {String(i + 1).padStart(2, '0')}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
