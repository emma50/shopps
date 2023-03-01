import { Rating } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { BsHandbagFill, BsHeart } from 'react-icons/bs'
import {TbMinus, TbPlus} from 'react-icons/tb'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import styles from './info.module.scss'
import Accordian from './Accordian'
import Share from './share'
import SimillarSwiper from './SimillarSwiper'
import { addToCart, updateCart } from '../../../store/cartSlice'

export default function Info({ product, setActiveImg }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const [size, setSize] = useState(router.query.size)
  const [qty, setQty] = useState(1)
  const [error, setError] = useState('')

  const cart = useSelector((state) => state.cart)

  useEffect(() => {
    setSize('')
    setQty(1)
  }, [router.query.style])

  const addToCartHandler = async () => {
    if (!router.query.size) {
      setError('Please select a size')
      return;
    }
    const { data } = await axios.get(
      `/api/product/${product._id}?style=${product.style}&size=${router.query.size}`
    )
    if (qty > data.quantity) {
      setError('The Quantity you have choosen is more than the quantity available in stock. Try a lower quantity.')
      return;
    }
    else if (data.quantity < 1) {
      setError('This product is out of stock.')
      return;
    }
    else {
      let _uid = `${data._id}_${product.style}_${router.query.size}`
      let exist = cart.cartItems.length > 0 && cart.cartItems.find((item) => item._uid === _uid)
      
      if (exist) {
        let newCart = cart.cartItems.map((item) => {
          console.log('CARTITEMMSSSSSSS', cart.cartItems)
          console.log('NEWWWWWWWWWWW', item._uid)
          if (item._uid === exist._uid) {
            return {...item, qty}
          }
          return;
        })
        dispatch(updateCart(newCart))
      } else {
        dispatch(addToCart({
          ...data,
          size: data.size,
          qty,
          _uid,
        }))
      }
    }
  }
  return (
    <div className={styles.info}>
      <div className={styles.info__container}>
        <h1 className={styles.info__name}>{product.name}</h1>
        <h2 className={styles.info__sku}>{product?.sku}</h2>
        <div className={styles.info__rating}>
          <Rating
            name="half-rating-read"
            value={product.rating}
            precision={0.5}
            readOnly
            style={{color: '#facf19'}}
          />
          ({product.numReviews}
          {product.numReviews <= 1 ? ' review' : ' reviews'})
        </div>
        <div className={styles.info__price}>
          {
            size >= 0
            ? <h1>{product.price}</h1>
            : <h2>{product.priceRange}</h2>
          } 
          {
            product.discount > 0
            ? <h3>
              <span>
                {
                  size >= 0
                  ? `${product.priceBefore}`
                  : `${product.sortLowestAndHighestPriceWithoutDiscount}`
                }$
              </span>
              <span>(-{product.discount}%)</span>
            </h3>
            : ''
          }
        </div>
        <span className={styles.info__shipping}>
          {
            product.shipping 
            ? `${product.shipping} ${product.shipping > 1 ? 'Shipping fees' : 'Shipping fee'}` 
            : 'Free Shipping'
          }
        </span>
        {' '}
        <span>
          {
            size >= 0
            ? product.quantity
            : `A total of ${product.sizes.reduce((start, next) => start + next.qty, 0)}`
          }{' '}pieces available.
        </span>
        <div className={styles.info__sizes}>
          <h4>Select a size</h4>
          <div className={styles.info__sizes__wrap}>
            {
              product.sizes.map((size, index) => {
                return (
                  <Link 
                    href={`/product/${product.slug}?style=${router.query.style}&size=${index}`} 
                    key={index}
                  >
                    <div 
                      className={`${styles.info__sizes_size} ${index === Number(router.query.size) ? styles.active_size : ''}`}
                      onClick={() => setSize(index)}
                    >
                      {size.size}
                    </div>
                  </Link>
                )
              })
            }
          </div>
        </div>
        <div className={styles.info__colors}>
          {
            product.color && product.color.map((item, index) => {
              return (
                <span 
                  key={index}
                  className={index === Number(router.query.style) ? styles.active_color : ''}
                  onMouseOver={() => setActiveImg(product.subProducts[index].images[0].url)}
                  onMouseLeave={() => setActiveImg('')}
                >
                  <Link href={`/product/${product.slug}?style=${index}`}>
                    <img 
                      src={item.image} 
                      alt="product image"
                    />
                  </Link>
                </span>
              )
            })
          }
        </div>
        <div className={styles.info__qty}>
          <button
            onClick={() => qty > 1 ? setQty((prev) => prev - 1) : setQty(1)}
          >
            <TbMinus/>
          </button>
          <span>{qty}</span>
          <button 
            onClick={() => qty < product.quantity ? setQty((prev) => prev + 1) : setQty(product.quantity)}>
            <TbPlus/>
          </button>
        </div>
        <div className={styles.info__actions}>
          <button
            disabled={product.quantity < 1}
            style={{cursor: `${product.quantity < 1 ? 'not-allowed' : 'pointer'}`}}
            onClick={() => addToCartHandler()}
          >
            <BsHandbagFill/>
            <b>ADD TO CART</b>
          </button>
          <button>
            <BsHeart/>
            WISHLIST
          </button>
        </div>
        {
          error && <span className={styles.error}>{error}</span>
        }
        <Share/>
        <Accordian details={[product.description, ...product.details]}/>
        <SimillarSwiper/>
      </div>
    </div>
  )
}
