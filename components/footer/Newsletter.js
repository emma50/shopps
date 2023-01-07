import Link from 'next/link'
import styles from './footer.module.scss'

export default function Newsletter() {
  return (
    <div className={styles.footer__newsletter}>
      <h3>SIGNUP FOR OUR NEWSLETTER</h3>
      <div className={styles.footer__flex}>
        <input type="text" placeholder='Your Email Address' />
        <button className={styles.btn_primary}>SUBSCRIBE</button>
      </div>
      <p>
        By clicking the subscribe button you are agreeing to {''}
        <Link href={''}>our Privacy & Cookie Policy</Link>
      </p>
    </div>
  )
}
