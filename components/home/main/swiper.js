// import { useRef, useState } from "react";
// import Image from 'next/image'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from 'next/image'

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

export default function MainSwiper() {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className='mainSwiper'
      >
        {
          [1,2,3,4,5,6,7,8,9,10].map((item) => {
            return (
              <SwiperSlide key={item}>
                {/* <img 
                  src={`/images/swiper/${item}.jpg`}
                  alt={'flash sale'}
                /> */}
                <Image 
                  src={`/images/swiper/${item}.jpg`} 
                  alt="flash sale"
                />
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </>
  )
}
