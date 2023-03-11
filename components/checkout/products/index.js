import styles from './products.module.scss'

export default function Products({ cart }) {
  return (
    <div className={styles.products}>
      <div className={styles.products__header}>
        <h1>Cart</h1>
        <span>
          {
            cart.products.length === 1
            ? '1 item'
            : `${cart.products.length} items`
          }
        </span>
      </div>
      <div className={styles.products__wrap}>
        {
          cart.products.map((product, index) => (
            <div className={styles.product} key={index}>
              <div className={styles.product__img}>
                <img src={product.image} alt="" />
                <div className={styles.product__info}>
                  <img src={product.color.image} alt="" />
                  <span>{product.size}</span>
                  <span>x{product.qty}</span>
                </div>
              </div>
              <div className={styles.product__name}>
                {
                  product.name.length > 20
                  ? `${product.name.slice(0, 20)}...`
                  : product.name
                }
              </div>
              <div className={styles.product__price}>
                {product.price * product.qty}$
              </div>
            </div>
          ))
        }
      </div>
      <div className={styles.products__total}>
        SubTotal: <b>{cart.cartTotal}$</b>
      </div>
    </div>
  )
}
