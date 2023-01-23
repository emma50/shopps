// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Navigation } from "swiper";
import Link from 'next/link'

import styles from './main.module.scss'
import { offers } from "../../../data/home";

export default function Offers() {
  return (
    <div className={styles.offers}>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="offersSwiper"
      >
        {
          offers.map((offer, index) => {
            return (
              <SwiperSlide key={index}>
                {/* <img 
                    src={`${offer.image}`}
                    alt={'offer'}
                  /> */}
                <Link href={offer.image}>
                  <img 
                    src={`${offer.image}`}
                    alt={'offer'}
                  />
                </Link>
                <span>{offer.price}$</span>
                <span>-{offer.discount}%</span>
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </div>
  );
}

