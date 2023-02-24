import styles from '../styles/cart.module.scss'
import Header from '../components/cart/header'
import Empty from '../components/cart/empty'

export default function cart() {
  const cart = []
  return (
    <>
      <Header/>
      <div className={styles.cart}>
        {
          cart.length >= 1 
          ? <div className={styles.cart__container}></div>
          : <Empty/>
        }
      </div>
    </>
  )
}
