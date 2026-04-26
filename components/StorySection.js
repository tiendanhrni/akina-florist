import styles from './StorySection.module.css'

export default function StorySection({ data }) {
  const paragraphs = data?.paragraphs?.length > 0 ? data.paragraphs : [
    'Cuộc sống là những khoảnh khắc nhỏ bé nhưng đủ khiến ta mỉm cười khi nhớ lại.',
    'Là buổi sáng bạn chợt nhận ra hôm nay là sinh nhật của người thương, là buổi chiều bạn muốn nói lời yêu, hay đơn giản chỉ là một ngày bạn muốn gửi chút dịu dàng cho ai đó.',
    'Giữa những cảm xúc không thể nói thành lời, hoa lại là cách biểu đạt tinh tế nhất, vừa mong manh, vừa chân thành. Và Akina ở đây, để giúp bạn trao gửi những yêu thương.',
  ]

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.heading}>
          <h2 className={`${styles.hw} hw-1`}>{data?.heading || 'Câu chuyện'}</h2>
          <div className="display-3">{data?.subheading || 'Akina gửi đến bạn'}</div>
        </div>
        <div className={styles.quote}>
          <div className={styles.quoteIcon} />
          <div className={styles.body}>
            {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
      </div>
    </section>
  )
}
