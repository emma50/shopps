import styles from './main.module.scss'
import MainSwiper from './swiper'
import Offers from './offers'

export default function Main() {
  return (
    <div className={styles.main}>
      <div className={styles.header}>header</div>
      <div className={styles.menu}>menu</div>
      <MainSwiper/>
      <Offers/>
      <div className={styles.user}>user</div>
    </div>
  )
}
