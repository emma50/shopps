import Image from 'next/image'
import Link from 'next/link'
import { MdSecurity } from 'react-icons/md'
import { BsSuitHeart} from 'react-icons/bs'
import { RiAccountPinCircleLine, RiArrowDropDownFill } from 'react-icons/ri'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import styles from './header.module.scss'
import UserMenu from './UserMenu'

export default function Top({ country }) {
  const { data: session } = useSession()
  const [visible, setVisible] = useState(false)
  
  const flag = '/images/country__flag.jpg'
  return (
    <div className={styles.top}>
      <div className={styles.top__container}>
        <div></div>
        <ul className={styles.top__list}>
          <li className={styles.li}>
            <Image src={flag} alt="country" width={28} height={28}/>
            <span>{country.name} / {country.code}</span>
          </li>
          <li className={styles.li}>
            <MdSecurity/>
            <span>Buyer protection</span>
          </li>
          <li className={styles.li}>
            <span>Customer service</span>
          </li>
          <li className={styles.li}>
            <span>Help</span>
          </li>
          <li className={styles.li}>
            <BsSuitHeart/>
            <Link href={'/profile/wishlist'}>
              <span>Wishlist</span>
            </Link>
          </li>
          <li className={styles.li}
            onMouseOver={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
          >
            {session ? 
              <div className={styles.flex}>
                <Image src={session.user.image} alt="your image" width={28} height={28}/>
                <span>{session.user.name}</span>
                <RiArrowDropDownFill/>
              </div> : 
              <div className={styles.flex}>
                <RiAccountPinCircleLine/>
                <span>Account</span>
                <RiArrowDropDownFill/>
              </div>
            }
            {visible && <UserMenu session={session}/>}
          </li>
        </ul>
      </div>
    </div>
  )
}
