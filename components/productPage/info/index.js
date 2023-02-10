import { Rating } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { BsHandbagFill, BsHeart } from 'react-icons/bs'
import {TbMinus, TbPlus} from 'react-icons/tb'
import styles from './info.module.scss'
import Accordian from './Accordian'
import Share from './share'
import SimillarSwiper from './SimillarSwiper'

export default function Info({ product, setActiveImg }) {
  console.log(product)
  const router = useRouter()
  const [size, setSize] = useState(router.query.size)
  const [qty, setQty] = useState(1)

  useEffect(() => {
    setSize('')
    setQty(1)
  }, [router.query.style])
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
          >
            <BsHandbagFill/>
            <b>ADD TO CART</b>
          </button>
          <button>
            <BsHeart/>
            WISHLIST
          </button>
        </div>
        <Share/>
        <Accordian details={[product.description, ...product.details]}/>
        <SimillarSwiper/>
      </div>
    </div>
  )
}
