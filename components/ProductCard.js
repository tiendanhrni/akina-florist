import Link from 'next/link'
import Image from 'next/image'
import styles from './ProductCard.module.css'

export default function ProductCard({ product }) {
  const href = `/san-pham/${product.categorySlug}/${product.slug}`
  const price = product.price
    ? new Intl.NumberFormat('vi-VN').format(product.price) + ' VND'
    : (product.priceNote || 'Liên hệ')

  return (
    <div className={styles.card}>
      <Link href={href} className={`${styles.imgWrap} product-img-wrap`}>
        {product.image ? (
          <>
            <Image
              src={product.image}
              alt={product.name}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            {product.hoverImage && (
              <Image
                src={product.hoverImage}
                alt={product.name}
                fill
                className="product-img-hover"
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            )}
          </>
        ) : (
          <div className={styles.placeholder} />
        )}
        <div className={styles.overlay}>
          <span className={styles.viewBtn}>XEM CHI TIẾT</span>
        </div>
      </Link>
      <div className={styles.info}>
        <div className={styles.code}>{product.code}</div>
        <Link href={href} className={styles.name}>{product.name}</Link>
        <div className={styles.price}>{price}</div>
      </div>
    </div>
  )
}
