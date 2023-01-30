import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";
import { IoGameController } from 'react-icons/io5'
import { IoHomeSharp } from 'react-icons/io5'
import styles from './productsSwiper.module.scss'

export default function ProductsSwiper({ header, products, background }) {
  return (
    <div className={styles.wrapper}>
      {
        header && (
          <div className={styles.header} style={{background}}>
            {header}
            {
              header === 'For Gamers' 
              ? <span><IoGameController/></span>
              : header === 'Home Improvements'
              ? <span><IoHomeSharp/></span>
              : ''
            }
          </div>
        )
      }
      <Swiper
        slidesPerView={1}
        spaceBetween={8}
        navigation={true}
        modules={[Navigation]}
        className="productsSwiper"
        breakpoints={{
          450: {
            slidesPerView: 2
          },
          630: {
            slidesPerView: 3,
          },
          880: {
            slidesPerView: 4,
          },
          1100: {
            slidesPerView: 5,
          },
          1260: {
            slidesPerView: 6,
          }
        }}
      >
        {
          products.map((product, index) => {
            return (
              <SwiperSlide key={index}>
                <div className={styles.product}>
                  <div className={styles.product__img}>
                    <img src={product.image} alt="A product"/>
                  </div>
                  <div className={styles.product__info}>
                    <h1>
                      {
                        product.name.length > 30 
                        ? `${product.name.slice(0, 23)}...`
                        : product.name.length < 1 
                        ? ''
                        : product.name
                      }
                    </h1>
                    {product.price && <span>USD{product.price}$</span>}
                  </div>
                </div>
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </div>
  )
}

