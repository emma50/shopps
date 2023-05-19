import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import Image from 'next/image'

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay } from "swiper";

import styles from './productCard.module.scss'
import { useEffect } from "react";

export default function ProductSwiper({ images }) {
  const swiperRef = useRef(null)
  useEffect(() => {
    swiperRef.current.swiper.autoplay.stop()
  })
  return (
    <div 
      className={styles.swiper}
      onMouseEnter={() => {
        swiperRef.current.swiper.autoplay.start()
      }}
      onMouseLeave={() => {
        swiperRef.current.swiper.slideTo(0)
        /* swiperRef.current.swiper.autoplay.stop() */
      }}
    >
      <Swiper
        centeredSlides={true}
        // loop={true}
        autoplay={{
          delay: 2500,
          stopOnLastSlide: false
        }}
        modules={[Autoplay]}
        className='productsSwiper'
        ref={swiperRef}
      >
        {
          images.map((image, index) => {
            return (
              <SwiperSlide key={index}>
                <img src={image.url} alt={'product image'} />
                {/* <Image src={image.url} alt='product image'/> */}
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </div>
  )
}
