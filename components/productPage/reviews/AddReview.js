import { Rating } from '@mui/material'
import { useState } from 'react'
import Images from './Images'
import styles from './reviews.module.scss'
import Select from './Select'

export default function AddReview({ product }) {
  const [size, setSize] = useState('')
  const [style, setStyle] = useState('')
  const [fit, setFit] = useState('')
  const [review, setReview] = useState('')
  const [rating, setRating] = useState()
  const [images, setImages] = useState([])
  return (
    <div className={styles.reviews__add}>
      <div className={styles.reviews__add_wrap}>
        <div className={`flex`} style={{gap: '10px'}}>
          <Select 
            property={size} 
            text='Size' 
            data={product.allSizes.filter((x) => x.size !== size )}
            handleChange={setSize}
          />
          <Select 
            property={style} 
            text='Style' 
            data={product.colors.filter((x) => x.color !== style )}
            handleChange={setStyle}
          />
          <Select 
            property={fit} 
            text='How does it fit' 
            data={fits.filter((x) => x !== fit )}
            handleChange={setFit}
          />
        </div>
        <Images images={images} setImages={setImages}/>
        <textarea 
          name="review" 
          id='' 
          value={review} 
          onChange={(e) => setReview(e.target.value)}
          placeholder='Write your review here'
        />
        <Rating
          name={'half-rating-read'}
          defaultValue={0}
          value={rating}
          precision={0.5}
          onChange={(e) => setRating(e.target.value)}
          style={{color: '#facf19', fontSize: '3rem'}}
        />
        <button className={styles.submit_btn}>
          Submit review
        </button>
      </div>
    </div>
  )
}

let fits = ['Small', 'True to size', 'Large']
