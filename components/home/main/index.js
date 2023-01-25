import styles from './main.module.scss'
import MainSwiper from './swiper'
import Offers from './offers'
import Menu from './menu'
import User from './user'
import Header from './header'

export default function Main() {
  return (
    <div className={styles.main}>
      <Header/>
      <Menu/>
      <MainSwiper/>
      <Offers/>
      <User/>
    </div>
  )
}
