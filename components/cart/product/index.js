import { BsHeart } from 'react-icons/bs'
import { AiOutlineDelete } from 'react-icons/ai'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react' 
import { updateCart } from '../../../store/cartSlice'
import styles from './product.module.scss'

export default function Product({ product, selected, setSelected }) {
  const cart = useSelector((state) => state.cart)
  const [active, setActive] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    let check = selected.find((item) => item._uid === product._uid)
    setActive(check)
  }, [selected])

  const updateQty = (type) => {
    let newCart = cart.cartItems.map((item) => {
      if (item._uid === product._uid) {
        return {
          ...item,
          qty: type === 'plus' ? product.qty + 1 : type === 'minus' ? product.qty - 1 : product.qty
        }
      }
      return item
    })
    dispatch(updateCart(newCart))
  }
  const removeProduct = (_uid) => {
    let newCart = cart.cartItems.filter((item) => {
      return item._uid !== _uid
    })
    dispatch(updateCart(newCart))
  }
  console.log('SELECTED', selected)
  const handleSelect = () => {
    if (active) {
      setSelected(selected.filter((item) => item._uid !== product._uid))
    }
    else {
      setSelected([...selected, product])
    }
  }

  return (
    <div className={`${styles.card} ${styles.product}`}>
      {product.quantity < 1 && <div className={styles.blur}></div>}
      <div className={styles.product__header}>
        <img src={'/images/store.webp'} alt="" />
        EMMANUELS OFFICIAL STORE
      </div>
      <div className={styles.product__image}>
        <div 
          className={`${styles.checkbox} ${active && styles.active}`} 
          onClick={() => handleSelect()}
        >
        </div>
        <img src={product.images[0].url} alt=""/>
        <div className={styles.col}>
          <div className={styles.grid}>
            <h1>
              {
                product.name.length > 30 
                ? `${product.name.slice(0, 30)}...`
                : product.name
              }
            </h1>
            <div style={{zIndex: '2'}}>
              <BsHeart/>
            </div>
            <div
              style={{zIndex: '2'}}
              onClick={() => removeProduct(product._uid)}
            >
              <AiOutlineDelete/>
            </div>
          </div>
          <div className={styles.product__style}>
            <img src={product.color.image} alt=""/>
            {product.size && <span>{product.size}</span>}
            {product.price && <span>{product.price}$</span>}
            <MdOutlineKeyboardArrowRight/>
          </div>
          <div className={styles.product__priceQty}>
            <div className={styles.product__priceQty_price}>
              <span className={styles.price}>
                USD{product.price * product.qty}
              </span>
              {
                product.price !== product.priceBefore &&
                <span className={styles.priceBefore}>
                  {product.priceBefore}
                </span>
              }
              {
                product.discount > 0 && 
                <span className={styles.discount}>
                  -{product.discount}%
                </span>
              }
            </div>
            <div className={styles.product__priceQty_qty}>
              <button 
                disabled={product.qty < 2}
                onClick={() => updateQty('minus')}
              >
                -
              </button>
              <span>{product.qty}</span>
              <button 
                disabled={product.qty === product.quantity}
                onClick={() => updateQty('plus')}
              >
                +
              </button>
            </div>
          </div>
          <div className={styles.product__shipping}>
            {
              product.shipping
              ? `+${product.shipping}$ Shipping fee`
              : 'Free Shipping'
            }
          </div>
          {
            product.quantity < 1 &&
            <div className={styles.notAvailable}>
              This product is out of stock. Add it to your wishlist it may get re-stocked
            </div>
          }
        </div>
      </div>
    </div>
  )
}
