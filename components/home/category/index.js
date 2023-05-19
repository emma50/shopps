import { BsArrowRightCircle } from 'react-icons/bs'
import { useMediaQuery } from 'react-responsive'
// import Image from 'next/image'
import styles from './category.module.scss'

export default function Category({ header, products, background }) {
  const isMedium = useMediaQuery({ query: '(max-width: 1200px)' })
  const isMobile = useMediaQuery({ query: '(max-width: 550px)' })
  return (
    <div className={styles.category} style={{background}}>
      <div className={styles.category__header}>
        <h1>{header}</h1>
        <BsArrowRightCircle/>
      </div>
      <div className={styles.category__products}>
        {
          products.slice(0, isMobile ? 6 : isMedium ? 4 : 6 ).map((product, index) => {
            return (
              <div className={styles.product} key={index}>
                <img
                  src={product.image}
                  alt="product image"
                />
                {/* <Image 
                  src={product.image} 
                  alt='product image'
                /> */}
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
