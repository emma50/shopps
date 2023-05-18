import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './productCard.module.scss'
import ProductSwiper from './ProductSwiper'

export default function ProductCard({ product }) {
  const [active, setActive] = useState(0)
  const [images, setImages] = useState(product.subProducts[active]?.images)
  const [prices, setPrices] = useState(
    product.subProducts[active]?.sizes.map((size) => {
      return size.price
    }).sort((a, b) => a - b)
  )
  const [styless, setStyless] = useState(
    product.subProducts.map((subProduct) => {
      return subProduct.color
    })
  )  
  
  useEffect(() => {
    setImages(product.subProducts[active]?.images)
    setPrices(
      product.subProducts[active]?.sizes.map((size) => {
        return size.price
      }).sort((a, b) => a - b)
    )
    setStyless(
      product.subProducts.map((subProduct) => {
        return subProduct.color
      })
    )
  }, [active])
  return (
    <div className={styles.product}>
      <div className={styles.product__container}>
        <Link href={`/product/${product.slug}?style=${active}`}>
          <div>
            <ProductSwiper images={images}/>
          </div>
        </Link>
        {
          product.subProducts[active].discount 
          ? (
            <div className={styles.product__discount}>
              -{product.subProducts[active].discount}%
            </div>
          ) : ''
        }
        <div className={styles.product__info}>
          <h1>
            {
              product.name && product.name.length > 40
              ? `${product.name.slice(0, 38)}...`
              : product.name ? product.name : ''
            }
          </h1>
          <span>
            {
              prices.length === 1
              ? `USD${prices[0].toFixed(2)}$`
              : `USD${prices[0].toFixed(2)} - ${prices[prices.length - 1].toFixed(2)}$`
            }
          </span>
          <div className={styles.product__colors}>
            {
              styless &&
                styless.map((style, index) => {
                  return (
                    style.image ? (
                      <img 
                        src={style.image} 
                        alt="" 
                        key={index}
                        className={index === active ? `${styles.active}` : '' }
                        onMouseOver={() => {
                          setImages(product.subProducts[index].images)
                          setActive(index)
                        }}
                      /> 
                    ) : (
                      <span 
                        style={{background: `${style.color}`}}
                        onMouseOver={() => {
                          setImages(product.subProducts[index].images)
                          setActive(index)
                        }}
                      >
                      </span>
                    )
                  )
                })
            }
          </div>
        </div>
      </div>
    </div>
  )
}
