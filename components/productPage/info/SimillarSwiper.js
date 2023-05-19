import { Swiper, SwiperSlide } from "swiper/react";
import Link from 'next/link'
// import Image from 'next/image'

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";
import styles from './info.module.scss'
import { simillar_products } from "../../../data/products";

export default function SimillarSwiper() {
  return (
    <div className={styles.info__simillarSwiper}>
      <Swiper
        slidesPerView={4}
        spaceBetween={5}
        navigation={true}
        modules={[Navigation]}
        // slidesPerGroup={3}
        className='swiper simillarSwiper productsSwiper'
        breakpoints={{
          640: {
            width: 640,
            slidesPerView: 5,
          },
        }}
      >
        {
          simillar_products.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <Link href={''}>
                  <img src={item} alt="Images" />
                  {/* <Image src={item} alt=""/> */}
                </Link>
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </div>
  )
}
