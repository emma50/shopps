import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { IoSettingsOutline } from 'react-icons/io5'
import { HiOutlineClipboard } from 'react-icons/hi'
import { AiOutlineMessage } from 'react-icons/ai'
import { BsHeart } from 'react-icons/bs'
// import Image from 'next/image'
import styles from './main.module.scss'
import { userSwiperArray } from '../../../data/home'

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

// import required modules
import { EffectCards, Navigation } from "swiper";

export function UserMenuSwiper() {
  return (
    <>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        navigation={true}
        modules={[EffectCards, Navigation]}
        className="userMenuSwiper"
      >
        {
          userSwiperArray.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <Link href={''}>
                  <img src={item.image} alt="User image"/>
                  {/* <Image src={item.image} alt='User image'/> */}
                </Link>
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </>
  );
}



// -------------------------------------------------------
export default function User() {
  const { data: session } = useSession()
  // console.log(session, 'SESSION')
  return (
    <div className={styles.user}>
      <img 
        src={'./images/userheader.jpg'} 
        alt="User Header" 
        className={styles.user__header}
      />
      <div className={styles.user__container}>
        {
          session ? (
            <div className={styles.user__info}>
              <img src={session.user?.image} alt='User image'/>
              {/* <Image src={session.user?.image} alt='User image'/> */}
              <h4>{session.user?.name}</h4>
            </div>
          ) : (
            <div className={styles.user__info}>
              <img src={'./images/human.jpeg'} alt='User image'/>
              {/* <Image src={'/images/human.jpeg'} alt='User image'/> */}
              <div className={styles.user__info_btns}>
                <button>Register</button>
                <button>Login</button>
              </div>
            </div>
          )
        }
        <ul className={styles.user__link}>
          <li>
            <Link href={''} legacyBehavior>
              <a href=''>
                <IoSettingsOutline/>
              </a>
            </Link>
          </li>
          <li>
            <Link href={''} legacyBehavior>
              <a href="">
                <HiOutlineClipboard/>
              </a>
            </Link>
          </li>
          <li>
            <Link href={''} legacyBehavior>
              <a>
                <AiOutlineMessage/>
              </a> 
            </Link>
          </li>
          <li>
            <Link href={''} legacyBehavior>
              <a>
                <BsHeart/>
              </a>
            </Link>
          </li>
        </ul>
        <div className={styles.user__swiper}>
          <UserMenuSwiper/>
        </div>
      </div>
      <img 
        src={'./images/userheader.jpg'} 
        alt="User Header" 
        className={styles.user__footer}
      />
    </div>
  )
}
