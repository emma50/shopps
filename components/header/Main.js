import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router";
import { useState } from "react";
import { RiSearch2Line } from "react-icons/ri"
import { FaOpencart } from 'react-icons/fa'
import { useSelector } from "react-redux"
import styles from './header.module.scss'

export default function Main({searchHandler}) {
  const router = useRouter();
  const [query, setQuery] = useState(router.query.search || "");

  const {cart} = useSelector((state) => ({...state}))

  const handleSearch = (e) => {
    e.preventDefault();
    if (router.pathname !== "/browse") {
      if (query.length > 1) {
        router.push(`/browse?search=${query}`);
      }
    } else {
      searchHandler(query);
    }
  }

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
        <form onSubmit={(e) => handleSearch(e)} className={styles.search}>
          <input 
            type="text" 
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className={styles.search__icon}>
            <RiSearch2Line/>
          </button>
        </form>
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
