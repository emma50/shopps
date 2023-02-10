import { Rating } from '@mui/material'
import styles from './reviews.module.scss'

export default function Reviews({ product }) {
  console.log('PRODUCTTT', product)
  return (
    <div className={styles.reviews}>
      <div className={styles.reviews_container}>
        Customer reviews ({product.reviews.length})
        <div className={styles.reviews__stats}>
          <div className={styles.reviews__stats_overview}>
            <span>Average rating</span>
            <div className={styles.reviews__stats_overview_rating}>
              <Rating
                name='half-rating-read'
                value={product.rating}
                precision={0.5}
                defaultValue={0}
                readOnly
                style={{color: '#facf19'}}
              />
              {product.rating === 0 ? 'No reviews yet' : product.rating}
            </div>
          </div>
          <div className={styles.reviews__stats_reviews}>
            {
              product.ratings.map((rating, index) => {
                return (
                  <div 
                    className={styles.reviews__stats_reviews_review} 
                    key={index}
                  >
                    <Rating
                      name='half-rating-read'
                      // value={rating}
                      // precision={0.5}
                      defaultValue={`${5 - index}`}
                      readOnly
                      style={{color: '#facf19'}}
                    />
                    <div className={styles.bar}>
                      <div 
                        className={styles.bar_inner} 
                        style={{width: `${rating.percentage}%`}}
                      >

                      </div>
                    </div>
                    <span>{rating.percentage}%</span>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}
