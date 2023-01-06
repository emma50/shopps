import Image from 'next/image'
import Link from 'next/link'
import styles from './header.module.scss'

export default function UserMenu({loggedIn}) {
  return (
    <div className={styles.menu}>
      <h4>Welcome to Shopps!</h4>
      {loggedIn ? 
        <div className={styles.flex}>
           <img
              src="/images/human.jpeg" 
              alt="person" 
              className={styles.menu__img}
            />
          <div className={styles.col}>
            <span>Welcome back,</span>
            <h3>Emmanuel</h3>
            <span>Signout</span>
          </div>
        </div> :
        <div className={styles.flex}>
          <button className={styles.btn_primary}>Signin</button>
          <button className={styles.btn_outlined}>Signout</button>
        </div>
      }
      <ul>
        <li>
          <Link href={'profile'}>Account</Link>
        </li>
        <li>
          <Link href={'profile/orders'}>Orders</Link>
        </li>
        <li>
          <Link href={'profile/messages'}>Message center</Link>
        </li>
        <li>
          <Link href={'profile/address'}>Address</Link>
        </li>
        <li>
          <Link href={'profile/wishlist'}>Wishlist</Link>
        </li>
      </ul>
    </div>
  )
}
