import Image from 'next/image'
import styles from './paymentMethods.module.scss'

export default function PaymentMethods() {
  return (
    <div className={`${styles.card} ${styles.cart__method}`}>
      <h2 className={styles.header}>Payment method</h2>
      <div className={styles.images}>
        {/* <img src={'/images/payment/visa.webp'} alt="" /> */}
        <Image src={'/images/payment/visa.webp'} alt=''/>
        {/* <img src={'/images/payment/mastercard.webp'} alt="" /> */}
        <Image src={'images/payment/mastercard.webp'} alt=''/>
        {/* <img src={'/images/payment/paypal.webp'} alt="" /> */}
        <Image src={'/images/payment/paypal.webp'} alt=''/>
      </div>
      <h2>Buyer protection</h2>
      <div className={styles.protection}>
        {/* <img src={'/images/protection.png'} alt="" /> */}
        <Image src={'/images/protection.png'} alt=''/>
        Get full refund if the item is not as described or if it is not delivered
      </div>
    </div>
  )
}
