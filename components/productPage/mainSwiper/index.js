import { useState } from 'react';
import ReactImageMagnify from 'react-image-magnify';
// import Image from 'next/image'
import styles from './mainSwiper.module.scss'

export default function MainSwiper({ images, activeImg }) {
  const [active, setActive] = useState(0)
  return (
    <div className={styles.swiper}>
      <div className={styles.swiper__active}>
        <ReactImageMagnify {...{
          smallImage: {
            alt: 'Wristwatch by Ted Baker London',
            isFluidWidth: true,
            src: activeImg || images[active].url
          },
          largeImage: {
            src: activeImg || images[active].url,
            width: 1200,
            height: 1800
          },
          enlargedImageContainerDimensions: {
            width: '150%',
            height: '140%'
          }
        }} />
      </div>
      <div className={styles.swiper__list}>
        {
          images.map((image, index) => {
            return (
              <div
                key={index}
                className={`${styles.swiper__list__item} ${index === active ? styles.active : ''}`}
                onMouseOver={() => setActive(index)}
              >
                <img src={image.url} alt={'Product image'} />
                {/* <Image src={image.url} alt='Product image'/> */}
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
