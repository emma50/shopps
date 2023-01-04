import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.scss'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <h1 className={styles.red}>Welcome</h1>
    </>
  )
}
