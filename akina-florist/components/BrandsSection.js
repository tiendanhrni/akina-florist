import Image from 'next/image'
import styles from './BrandsSection.module.css'

const defaultBrands = ['Zumwhere','Glam','Cộng','Trung Nguyên','Mahena','Shynh','Bliss','NARS','Shiseido','Dove','L\'Oreal','Maybelline','PNJ','Hilton','Sheraton','Tiffany','Techcombank','MB Bank','VP Bank','BNI','VCCI','Popmart','Nutifood','Sonkim']

export default function BrandsSection({ brands }) {
  return (
    <section className={styles.section}>
      <h2 className={`${styles.title} display-3`}>Thương hiệu đồng hành</h2>
      <div className={styles.grid}>
        {brands.length > 0 ? brands.map(b => (
          <div key={b._id} className={styles.item}>
            {b.logo ? (
              <Image src={b.logo} alt={b.name} width={120} height={50}
                style={{ objectFit: 'contain', filter: 'grayscale(1)', transition: 'filter 0.3s' }}
                onMouseEnter={e => e.target.style.filter = 'grayscale(0)'}
                onMouseLeave={e => e.target.style.filter = 'grayscale(1)'} />
            ) : (
              <span>{b.name}</span>
            )}
          </div>
        )) : defaultBrands.map(name => (
          <div key={name} className={styles.item}><span>{name}</span></div>
        ))}
      </div>
    </section>
  )
}
