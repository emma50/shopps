import { Navigation } from "swiper";
import Link from "next/link";
// import Image from 'next/image'
import { TbEdit } from "react-icons/tb";
import { AiOutlineEye } from "react-icons/ai";
import { RiDeleteBin2Line } from "react-icons/ri";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import styles from "./productsCard.module.scss";

export default function ProductCard({ product }) {
  return (
    <div className={styles.product}>
      <h1 className={styles.product__name}>{product.name}</h1>
      <h2 className={styles.product__category}>#{product.category.name}</h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="productsSwiper"
        style={{ padding: "5px 0 5px 5px" }}
        breakpoints={{
          450: {
            slidesPerView: 2,
          },
          630: {
            slidesPerView: 3,
          },
          920: {
            slidesPerView: 4,
          },
          1232: {
            slidesPerView: 5,
          },
          1520: {
            slidesPerView: 6,
          },
        }}
      >
        {product.subProducts.map((p, index) => (
          <SwiperSlide key={p._id}>
            <div className={styles.product__item}>
              <div className={styles.product__item_img}>
                <img src={p.images[0].url} alt="" />
                {/* <Image src={p.images[0].url} alt/> */}
              </div>
              <div className={styles.product__actions}>
                <Link href={`/admin/dashboard/product/${product._id}`}>
                  <TbEdit />
                </Link>
                <Link href={`/product/${product.slug}?style=${index}`}>
                  <AiOutlineEye style={{fill: '#6cc070'}}/>
                </Link>
                <Link href="">
                  <RiDeleteBin2Line style={{fill: '#ed4337'}}/>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
