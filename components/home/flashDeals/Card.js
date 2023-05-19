import Link from 'next/link'
import { MdFlashOn } from 'react-icons/md'
// import Image from 'next/image'
import styles from './flashDeals.module.scss'

export default function FlashCard({ product }) {
  const priceAfterDiscount = (product.price) - ((product.price * product.discount) / 100).toFixed(2)
  const amountSaved = (product.price - priceAfterDiscount).toFixed(2)
  return (
    <div className={styles.card}>
      <div className={styles.card__img}>
        <Link href={product.link} legacyBehavior>
          <img src={product.image} alt={'Some image'} />
          {/* <Image src={product.image} alt=''/> */}
        </Link>
        <div className={styles.flash}>
          <MdFlashOn/>
          <span>-{product.discount}%</span>
        </div>
      </div>
      <div className={styles.card__price}>
        <span>USD{priceAfterDiscount}</span>
        <span>-USD{amountSaved}</span>
      </div>
      <div className={styles.card__bar}>
        <div className={styles.card__bar_inner} style={{width: '75%'}}></div>
      </div>
      <div className={styles.card__percentage}>{product.sold}%</div>
    </div>
  )
}
