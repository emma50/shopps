import Image from 'next/image'
import styles from './footer.module.scss'

export default function Payment() {
  return (
    <div className={styles.footer__payment}>
      <h3>WE ACCEPT</h3>
      <div className={styles.footer__flexwrap}>
        <Image 
          src={'/images/payment/visa.webp'}
          alt='visa payment'
          width={20}
          height={20}
        />
        <Image
          src={'/images/payment/mastercard.webp'}
          alt='mastercard payment'
          width={20}
          height={20}
        />
        <Image
          src={'/images/payment/paypal.webp'} 
          alt='paypal payment'
          width={20}
          height={20}
        />
      </div>
    </div>
  )
}
