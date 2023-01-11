import Image from 'next/image'
import Link from 'next/link'
import { signOut, signIn } from 'next-auth/react'
import styles from './header.module.scss'

export default function UserMenu({session}) {
  return (
    <div className={styles.menu}>
      <h4>Welcome to Shopps!</h4>
      {session ? 
        <div className={styles.flex}>
          <Image
            src={session.user.image}
            alt="your image"
            width={100}
            height={100}
            className={styles.menu__img}
          />
          <div className={styles.col}>
            <span>Welcome back,</span>
            <h3>Emmanuel</h3>
            <span onClick={() => signOut()}>Signout</span>
          </div>
        </div> :
        <div className={styles.flex}>
          <button className={styles.btn_primary}>Register</button>
          <button
            className={styles.btn_outlined}
            onClick={() => signIn()}
          >
            Login
          </button>
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
