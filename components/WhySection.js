'use client'
import { useState } from 'react'
import styles from './WhySection.module.css'

const items = [
  {
    num: '01',
    title: 'Giao hàng nhanh trong 2 giờ',
    desc: 'Quy trình sản xuất chuyên nghiệp, nguyên liệu luôn sẵn sàng — đảm bảo mỗi thiết kế được hoàn thiện và giao đến tay khách trong vòng 2 giờ.',
  },
  {
    num: '02',
    title: 'Gửi hình trước khi giao',
    desc: 'Hình ảnh sản phẩm được gửi duyệt trước khi giao — để bạn an tâm rằng món quà được gửi đi đúng như mong đợi.',
  },
  {
    num: '03',
    title: 'Cam kết giống mẫu tối thiểu 80%',
    desc: 'Mỗi thiết kế được thực hiện chuẩn xác, đồng đều, giữ trọn tinh thần của mẫu gốc — đảm bảo chất lượng và thẩm mỹ ở từng chi tiết.',
  },
  {
    num: '04',
    title: 'Nguồn nguyên liệu đa dạng & luôn sẵn sàng',
    desc: 'Hoa tươi nội địa và nhập khẩu được cập nhật mỗi ngày — đảm bảo nguồn nguyên liệu phong phú, tươi mới và sẵn sàng cho mọi thiết kế.',
  },
]

export default function WhySection() {
  const [active, setActive] = useState(0)

  return (
    <section className={styles.section}>
      <div className={styles.overlay} />
      <div className={styles.fadeTop} />
      <div className={styles.fadeBot} />

      <h2 className={`${styles.title} display-3`}>Vì sao Akina được yêu thích?</h2>

      <div className={styles.layout}>
        <div className={styles.card}>
          <div className={styles.dotTR} />
          <div className={styles.dotBR} />
          <h3 className={`${styles.cardTitle} display-3`}>{items[active].title}</h3>
          <p className={`${styles.cardDesc} body-3`}>{items[active].desc}</p>
        </div>

        <div className={styles.nums}>
          {items.map((item, i) => (
            <button
              key={i}
              className={`${styles.numBtn} ${i === active ? styles.numActive : ''}`}
              onClick={() => setActive(i)}
              aria-label={item.title}
            >
              {item.num}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
