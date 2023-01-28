import { MdFlashOn } from 'react-icons/md'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Navigation} from "swiper";
import styles from './flashDeals.module.scss'
import Countdown from '../../countdown'
import { flashDealsArray } from '../../../data/home';
import FlashCard from './Card';

export function FlashDealsSwiper() {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={5}
        navigation={true}
        modules={[Navigation]}
        className="flashDealsSwiper"
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
        <div className={styles.flashDeals__list}>
          {
            flashDealsArray.map((product, index) => {
              return (
                <SwiperSlide key={index}>
                  <FlashCard product={product}/>
                </SwiperSlide>
              )
            })
          }
        </div>
      </Swiper>
    </>
  );
}

export default function FlashDeals() {
  return (
    <div className={styles.flashDeals}>
      <div className={styles.flashDeals__header}>
        <h1>FLASH SALE <MdFlashOn/></h1>
        <Countdown date={new Date(2025, 0, 29)}/>
      </div>
      <FlashDealsSwiper/>
    </div>
  )
}
