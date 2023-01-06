import Link from "next/link"
import Image from "next/image"
import { RiSearch2Line } from "react-icons/ri"
import { FaOpencart } from 'react-icons/fa'
import styles from './header.module.scss'
import { useSelector } from "react-redux"

export default function Main() {
  const {cart} = useSelector((state) => ({...state}))
  return (
    <div className={styles.main}>
      <div className={styles.main__container}>
        <Link href={'/'} legacyBehavior>
          <a className={styles.logo}>
           <Image src='/vercel.svg' alt='logo' width={100} height={100}/>
          </a>
        </Link>
        <div className={styles.search}>
          <input type="text" placeholder="Search..."/>
          <div className={styles.search__icon}>
            <RiSearch2Line/>
          </div>
        </div>
        <Link href={'/carts'} legacyBehavior>
          <a className={styles.cart}>
           <FaOpencart/>
           <span>{cart.length}</span>
          </a>
        </Link>
      </div>
    </div>
  )
}
