import styles from './StorySection.module.css'

export default function StorySection({ s }) {
  const heading = s?.storyHeading || 'Câu chuyện'
  const subheading = s?.storySubheading || 'Akina gửi đến bạn'
  const paragraphs = s?.storyParagraphs?.length > 0 ? s.storyParagraphs : [
    'Cuộc sống là những khoảnh khắc nhỏ bé nhưng đủ khiến ta mỉm cười khi nhớ lại.',
    'Là buổi sáng bạn chợt nhận ra hôm nay là sinh nhật của người thương, là buổi chiều bạn muốn nói lời yêu, hay đơn giản chỉ là một ngày bạn muốn gửi chút dịu dàng cho ai đó.',
    'Giữa những cảm xúc không thể nói thành lời, hoa lại là cách biểu đạt tinh tế nhất, vừa mong manh, vừa chân thành. Và Akina ở đây, để giúp bạn trao gửi những yêu thương, bằng ngôn ngữ của hoa, nhẹ nhàng, duy mỹ, và đầy cảm xúc.',
  ]
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.heading}>
          <h2 className={`${styles.hw} hw-1`}>{heading}</h2>
          <div className="display-3">{subheading}</div>
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
