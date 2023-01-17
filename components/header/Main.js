import Link from "next/link"
import Image from "next/image"
import { RiSearch2Line } from "react-icons/ri"
import { FaOpencart } from 'react-icons/fa'
import { useSelector } from "react-redux"
import styles from './header.module.scss'

export default function Main() {
  const {cart} = useSelector((state) => ({...state}))
  return (
    <div className={styles.main}>
      <div className={styles.main__container}>
        <Link href={'/'} legacyBehavior>
          <a className={styles.logo}>
           <Image 
            src='/logo.png' 
            alt='logo' 
            width={170} 
            height={70} 
            style={{borderRadius: '30%'}}
          />
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
