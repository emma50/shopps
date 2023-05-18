import { useSession, signIn } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './empty.module.scss'

export default function Empty() {
  const { data: session } = useSession()
  return (
    <div className={styles.empty}>
      {/* <img src={'/images/empty.png'} alt="" /> */}
      <Image src={'/images/empty.png'} alt=''/>
      <h1>Cart is empty</h1>
      {
        !session &&
        <button 
          className={styles.empty__btn}
          onClick={() => signIn()}
        >
          SIGN IN / REGISTER
        </button>
      }
      <Link href={'/browse'} legacyBehavior>
        <a>
          <button
            className={`${styles.empty__btn} ${styles.empty__btn_v2}`}
          >
            SHOP NOW
          </button>
        </a>
      </Link>
    </div>
  )
}
