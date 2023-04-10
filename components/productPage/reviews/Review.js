import { Rating } from '@mui/material'
import { AiOutlineLike } from 'react-icons/ai'
import styles from './reviews.module.scss'

export default function Review({ review }) {
  const image = review.reviewBy?.image
  const name = review.reviewBy?.name

  return (
    <div className={styles.review}>
      <div className={styles.flex}>
        <div className={styles.review__user}>
          <h4>
            {name?.slice(0,1)}***{name?.slice(name.length - 1, name.length)}
          </h4>
          {image && <img src={image} alt=""/>}
        </div>
        <div className={styles.review__review}>
          <Rating
            name={'half-rating-read'}
            defaultValue={Number(review.rating)}
            value={Number(review.rating)}
            style={{color: '#facf19'}}
            readOnly
          />
          <p>{review.review}</p>
          <>
            <span>Overall fit:&nbsp;</span>{review.fit}&nbsp;&nbsp;
            <span>Size:&nbsp;</span>{review.size}&nbsp;&nbsp;
            <div className={styles.flex}>
              <img
                src={review.style.image} 
                alt=""
                className={styles.review__img}
              />
            </div>
          </>
          {/* </p> */}
        </div>
      </div>
      <div className={styles.flex}>
        <div className={styles.review__images}>
          {
            review.images.length > 0 &&
            review.images.map((img, index) => <img src={img?.url} alt="" key={index}/>)
          }
        </div>
        <div className={styles.review__extra}>
          <div className={styles.review__extra_likes}>
            {review.likes && review.likes?.likes}
            <AiOutlineLike/>
          </div>
          <div className={styles.review__extra_date}>
            {review?.reviewBy?.updatedAt?.slice(0, 10)}
          </div>
        </div>
      </div>
    </div>
  )
}
