import Link from 'next/link'
import styles from './main.module.scss'

export default function Header() {
  return (
    <div className={styles.header}>
      <ul>
        <li>
          <Link href={''} legacyBehavior>
            <a href="">Store</a>
          </Link>
        </li>
        <li>
          <Link href={''} legacyBehavior>
            <a href="">Electronics</a>
          </Link>
        </li>
        <li>
          <Link href={''} legacyBehavior>
            <a href="">Watches</a>
          </Link>
        </li>
        <li>
          <Link href={''} legacyBehavior>
            <a href="">Computers</a>
          </Link>
        </li>
      </ul>
    </div>
  )
}
